<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, private');

require_once __DIR__ . '/session.php';
if (!startAppSession()) {
    http_response_code(500);
    echo json_encode(['errorCode' => 'session_start_failed']);
    exit;
}
requireAppRole(['Admin']);

function sendManagementResponse(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    exit;
}

function runManagementStatement(mysqli $conn, string $sql, string $types, array $values): mysqli_stmt
{
    $statement = $conn->prepare($sql);
    if (!$statement) {
        throw new RuntimeException($conn->error, $conn->errno);
    }

    if ($types !== '') {
        $parameters = [$types];
        foreach ($values as $index => &$value) {
            $parameters[] = &$value;
        }
        if (!call_user_func_array([$statement, 'bind_param'], $parameters)) {
            throw new RuntimeException($statement->error, $statement->errno);
        }
    }

    if (!$statement->execute()) {
        throw new RuntimeException($statement->error, $statement->errno);
    }

    return $statement;
}

function getManagementColumns(mysqli $conn, string $table): array
{
    $result = $conn->query("SHOW COLUMNS FROM `$table`");
    if (!$result) {
        throw new RuntimeException($conn->error, $conn->errno);
    }

    $columns = [];
    while ($column = $result->fetch_assoc()) {
        $columns[$column['Field']] = $column;
    }

    return $columns;
}

function managementLength(string $value): int
{
    if (function_exists('mb_strlen')) {
        return mb_strlen($value, 'UTF-8');
    }
    $length = preg_match_all('/./us', $value, $matches);
    return $length === false ? strlen($value) : $length;
}

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        header('Allow: POST');
        sendManagementResponse(405, ['errorCode' => 'method_not_allowed']);
    }

    $payload = json_decode(file_get_contents('php://input'), true);
    if (!is_array($payload) || !isset($payload['entity'], $payload['action']) || !is_string($payload['entity']) || !is_string($payload['action'])) {
        sendManagementResponse(400, ['errorCode' => 'invalid_request']);
    }

    require_once __DIR__ . '/db.konexioa.php';
    if (!$conn->set_charset('utf8mb4')) {
        throw new RuntimeException($conn->error, $conn->errno);
    }

    $entity = $payload['entity'];
    $action = $payload['action'];
    if (!in_array($entity, ['users', 'inventory'], true) || !in_array($action, ['create', 'update', 'delete'], true)) {
        sendManagementResponse(400, ['errorCode' => 'invalid_request']);
    }

    $table = $entity === 'users' ? 'usuarios' : 'inbentario';
    $columns = getManagementColumns($conn, $table);
    if (!isset($columns['id'])) {
        throw new RuntimeException("Falta la columna id en $table");
    }
    if ($entity === 'inventory' && $action === 'create' && stripos($columns['id']['Extra'], 'auto_increment') === false) {
        throw new RuntimeException("La columna id de $table debe generarse automáticamente");
    }

    $id = filter_var($payload['id'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
    if ($action !== 'create' && $id === false) {
        sendManagementResponse(400, ['errorCode' => 'invalid_request']);
    }

    if ($action === 'delete') {
        $statement = runManagementStatement($conn, "DELETE FROM `$table` WHERE id = ?", 'i', [$id]);
        if ($statement->affected_rows === 0) {
            sendManagementResponse(404, ['errorCode' => 'record_not_found']);
        }
        sendManagementResponse(200, ['success' => true]);
    }

    $data = $payload['data'] ?? null;
    if (!is_array($data)) {
        sendManagementResponse(400, ['errorCode' => 'invalid_request']);
    }

    $values = [];
    $types = '';
    if ($entity === 'users') {
        foreach (['izena', 'abizena', 'emaila'] as $requiredColumn) {
            if (!isset($columns[$requiredColumn])) {
                throw new RuntimeException("Falta la columna requerida $requiredColumn en usuarios");
            }
        }

        $firstName = trim((string) ($data['izena'] ?? ''));
        $lastName = trim((string) ($data['abizena'] ?? ''));
        $email = trim((string) ($data['emaila'] ?? ''));
        if ($firstName === '' || managementLength($firstName) > 50 || $lastName === '' || managementLength($lastName) > 50 || !filter_var($email, FILTER_VALIDATE_EMAIL) || managementLength($email) > 100) {
            sendManagementResponse(422, ['errorCode' => 'invalid_user_data']);
        }

        $values = ['izena' => $firstName, 'abizena' => $lastName, 'emaila' => $email];
        $types = 'sss';

        if (isset($columns['rol_id'])) {
            $roleId = filter_var($data['rol_id'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
            if ($roleId === false) {
                sendManagementResponse(422, ['errorCode' => 'invalid_role']);
            }
            $roleTableResult = $conn->query("SHOW TABLES LIKE 'rol'");
            if (!$roleTableResult) {
                throw new RuntimeException($conn->error, $conn->errno);
            }
            if ($roleTableResult->num_rows > 0) {
                $roleStatement = runManagementStatement($conn, 'SELECT id FROM rol WHERE id = ?', 'i', [$roleId]);
                if (!$roleStatement->store_result()) {
                    throw new RuntimeException($roleStatement->error, $roleStatement->errno);
                }
                if ($roleStatement->num_rows === 0) {
                    sendManagementResponse(422, ['errorCode' => 'invalid_role']);
                }
            }
            $values['rol_id'] = $roleId;
            $types .= 'i';
        }

        if (isset($columns['pasahitza'])) {
            $password = (string) ($data['pasahitza'] ?? '');
            if ($action === 'create' && $password === '') {
                sendManagementResponse(422, ['errorCode' => 'password_required']);
            }
            if ($password !== '') {
                if (managementLength($password) > 255) {
                    sendManagementResponse(422, ['errorCode' => 'invalid_user_data']);
                }
                $values['pasahitza'] = $password;
                $types .= 's';
            }
        }

    } else {
        foreach (['izena', 'kopurua', 'egoera'] as $requiredColumn) {
            if (!isset($columns[$requiredColumn])) {
                throw new RuntimeException("Falta la columna requerida $requiredColumn en inbentario");
            }
        }

        $name = trim((string) ($data['izena'] ?? ''));
        $quantity = filter_var($data['kopurua'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 0]]);
        $status = (string) ($data['egoera'] ?? '');
        $allowedStatuses = ['ONDO', 'ERABILI_EZINIK', 'MANTENIMENDUAN', 'GALDUTAKO'];
        if ($name === '' || managementLength($name) > 100 || $quantity === false || !in_array($status, $allowedStatuses, true)) {
            sendManagementResponse(422, ['errorCode' => 'invalid_inventory_data']);
        }

        $values = ['izena' => $name, 'kopurua' => $quantity, 'egoera' => $status];
        $types = 'sis';

        if ($action === 'create' && isset($columns['arduraduna_id'])) {
            $userId = filter_var($_SESSION['account']['userId'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
            $managerAssigned = false;
            if ($userId !== false) {
                $managerStatement = runManagementStatement($conn, 'SELECT id FROM usuarios WHERE id = ?', 'i', [$userId]);
                if (!$managerStatement->store_result()) {
                    throw new RuntimeException($managerStatement->error, $managerStatement->errno);
                }
                if ($managerStatement->num_rows > 0) {
                    $values['arduraduna_id'] = $userId;
                    $types .= 'i';
                    $managerAssigned = true;
                }
            }
            if (!$managerAssigned && $columns['arduraduna_id']['Null'] === 'NO' && $columns['arduraduna_id']['Default'] === null) {
                sendManagementResponse(422, ['errorCode' => 'inventory_manager_required']);
            }
        }

    }

    if ($action === 'create') {
        $insertColumns = array_keys($values);
        $quotedColumns = implode(', ', array_map(static fn(string $column): string => "`$column`", $insertColumns));
        $placeholders = implode(', ', array_fill(0, count($insertColumns), '?'));
        runManagementStatement($conn, "INSERT INTO `$table` ($quotedColumns) VALUES ($placeholders)", $types, array_values($values));
        sendManagementResponse(201, ['success' => true, 'id' => (int) $conn->insert_id]);
    }

    $existingStatement = runManagementStatement($conn, "SELECT id FROM `$table` WHERE id = ?", 'i', [$id]);
    if (!$existingStatement->store_result()) {
        throw new RuntimeException($existingStatement->error, $existingStatement->errno);
    }
    if ($existingStatement->num_rows === 0) {
        sendManagementResponse(404, ['errorCode' => 'record_not_found']);
    }

    $assignments = implode(', ', array_map(static fn(string $column): string => "`$column` = ?", array_keys($values)));
    $values[] = $id;
    $types .= 'i';
    runManagementStatement($conn, "UPDATE `$table` SET $assignments WHERE id = ?", $types, array_values($values));
    sendManagementResponse(200, ['success' => true]);
} catch (Throwable $error) {
    error_log('No se pudo gestionar el registro: ' . $error->getMessage());
    switch ($error->getCode()) {
        case 1062:
            $errorCode = 'duplicate_entry';
            break;
        case 1452:
            $errorCode = 'invalid_reference';
            break;
        case 1045:
            $errorCode = 'database_access_denied';
            break;
        case 1049:
            $errorCode = 'database_not_found';
            break;
        case 1146:
            $errorCode = 'table_not_found';
            break;
        case 2002:
        case 2003:
            $errorCode = 'database_connection_failed';
            break;
        default:
            $errorCode = 'management_failed';
    }
    sendManagementResponse(500, ['errorCode' => $errorCode]);
}

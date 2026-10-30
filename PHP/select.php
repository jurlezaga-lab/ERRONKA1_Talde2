<?php
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/session.php';
if (!startAppSession()) {
    http_response_code(500);
    echo json_encode(['errorCode' => 'session_start_failed']);
    exit;
}
requireAppRole(['Admin']);

try {
    require_once __DIR__ . '/db.konexioa.php';
    if (!$conn->set_charset('utf8mb4')) {
        throw new RuntimeException($conn->error, $conn->errno);
    }

    $userColumnsResult = $conn->query('SHOW COLUMNS FROM usuarios');
    if (!$userColumnsResult) {
        throw new RuntimeException($conn->error, $conn->errno);
    }

    $userColumns = [];
    while ($column = $userColumnsResult->fetch_assoc()) {
        $userColumns[$column['Field']] = true;
    }

    foreach (['id', 'izena', 'abizena', 'emaila'] as $requiredColumn) {
        if (!isset($userColumns[$requiredColumn])) {
            throw new RuntimeException('Falta la columna requerida en usuarios: ' . $requiredColumn);
        }
    }

    $roleSelect = 'NULL AS rol_id, NULL AS rol_izena';
    $roleJoin = '';
    if (isset($userColumns['rol_id'])) {
        $roleSelect = 'u.rol_id, NULL AS rol_izena';
        $roleTableResult = $conn->query("SHOW TABLES LIKE 'rol'");
        if (!$roleTableResult) {
            throw new RuntimeException($conn->error, $conn->errno);
        }

        if ($roleTableResult->num_rows > 0) {
            $roleSelect = 'u.rol_id, r.izena AS rol_izena';
            $roleJoin = 'LEFT JOIN rol r ON r.id = u.rol_id';
        }
    }

    $sql = "
        SELECT
            u.id,
            u.izena,
            u.abizena,
            u.emaila,
            $roleSelect
        FROM usuarios u
        $roleJoin
        ORDER BY u.abizena, u.izena, u.id
    ";
    $result = $conn->query($sql);

    if (!$result) {
        throw new RuntimeException($conn->error, $conn->errno);
    }

    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = [
            'id' => (int) $row['id'],
            'izena' => $row['izena'],
            'abizena' => $row['abizena'],
            'emaila' => $row['emaila'],
            'rol_id' => $row['rol_id'] === null ? null : (int) $row['rol_id'],
            'rol_izena' => $row['rol_izena']
        ];
    }

    $roles = [];
    $roleTableResult = $conn->query("SHOW TABLES LIKE 'rol'");
    if (!$roleTableResult) {
        throw new RuntimeException($conn->error, $conn->errno);
    }
    if ($roleTableResult->num_rows > 0) {
        $roleResult = $conn->query('SELECT id, izena FROM rol ORDER BY id');
        if (!$roleResult) {
            throw new RuntimeException($conn->error, $conn->errno);
        }
        while ($role = $roleResult->fetch_assoc()) {
            $roles[] = ['id' => (int) $role['id'], 'izena' => $role['izena']];
        }
    }

    echo json_encode([
        'users' => $users,
        'roles' => $roles
    ], JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
} catch (Throwable $error) {
    error_log('No se pudieron cargar los usuarios: ' . $error->getMessage());
    http_response_code(500);

    switch ($error->getCode()) {
        case 1045:
            $errorCode = 'database_access_denied';
            break;
        case 1049:
            $errorCode = 'database_not_found';
            break;
        case 1146:
            $errorCode = 'users_table_missing';
            break;
        case 2002:
        case 2003:
            $errorCode = 'database_connection_failed';
            break;
        default:
            $errorCode = 'users_load_failed';
    }

    echo json_encode(['errorCode' => $errorCode]);
}
?>

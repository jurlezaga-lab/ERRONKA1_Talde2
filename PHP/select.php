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
    require_once 'db.konexioa.php';
    if (!$conn->set_charset('utf8mb4')) {
        throw new RuntimeException($conn->error, $conn->errno);
    }

    $sql = "
        SELECT
            u.id,
            u.izena,
            u.abizena,
            u.emaila,
            u.rol_id,
            r.izena AS rol_izena,
            u.zentroa_id,
            z.izena AS zentroa_izena
        FROM usuarios u
        LEFT JOIN rol r ON r.id = u.rol_id
        LEFT JOIN zentroa z ON z.id = u.zentroa_id
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
            'rol_izena' => $row['rol_izena'],
            'zentroa_id' => $row['zentroa_id'] === null ? null : (int) $row['zentroa_id'],
            'zentroa_izena' => $row['zentroa_izena']
        ];
    }

    echo json_encode(['users' => $users], JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
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

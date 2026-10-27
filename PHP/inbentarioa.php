<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, private');

require_once __DIR__ . '/session.php';
if (!startAppSession()) {
    http_response_code(500);
    echo json_encode(['errorCode' => 'session_start_failed']);
    exit;
}
requireAppRole(['Admin', 'Inventory']);

try {
    require_once __DIR__ . '/db.konexioa.php';
    if (!$conn->set_charset('utf8mb4')) {
        throw new RuntimeException($conn->error, $conn->errno);
    }

    $columnsResult = $conn->query('SHOW COLUMNS FROM inbentario');
    if (!$columnsResult) {
        throw new RuntimeException($conn->error, $conn->errno);
    }

    $columns = [];
    while ($column = $columnsResult->fetch_assoc()) {
        $columns[$column['Field']] = true;
    }

    foreach (['id', 'izena', 'kopurua', 'egoera', 'azken_berrikuspena'] as $requiredColumn) {
        if (!isset($columns[$requiredColumn])) {
            throw new RuntimeException('Falta la columna requerida en inbentario: ' . $requiredColumn);
        }
    }

    $sql = "
        SELECT
            i.id,
            i.izena,
            i.kopurua,
            i.egoera,
            i.azken_berrikuspena
        FROM inbentario i
        ORDER BY i.izena, i.id
    ";
    $result = $conn->query($sql);

    if (!$result) {
        throw new RuntimeException($conn->error, $conn->errno);
    }

    $items = [];
    while ($row = $result->fetch_assoc()) {
        $items[] = [
            'id' => (int) $row['id'],
            'izena' => $row['izena'],
            'kopurua' => (int) $row['kopurua'],
            'egoera' => $row['egoera'],
            'azken_berrikuspena' => $row['azken_berrikuspena']
        ];
    }

    echo json_encode(['items' => $items], JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
} catch (Throwable $error) {
    error_log('No se pudo cargar el inventario: ' . $error->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'No se pudo cargar el inventario.']);
}
?>

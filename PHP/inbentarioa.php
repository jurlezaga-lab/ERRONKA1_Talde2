<?php
header('Content-Type: application/json; charset=utf-8');

try {
    require_once __DIR__ . '/db.konexioa.php';
    if (!$conn->set_charset('utf8mb4')) {
        throw new RuntimeException($conn->error, $conn->errno);
    }

    $sql = "
        SELECT
            i.id,
            i.izena,
            i.kopurua,
            i.egoera,
            i.zentroa_id,
            z.izena AS zentroa_izena,
            i.azken_berrikuspena
        FROM inbentario i
        LEFT JOIN zentroa z ON z.id = i.zentroa_id
        ORDER BY z.izena, i.izena, i.id
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
            'zentroa_id' => (int) $row['zentroa_id'],
            'zentroa_izena' => $row['zentroa_izena'],
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

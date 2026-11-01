<?php
// ERRUBRIKA: INBENTARIOA EXCEL-TIK INPORTATZEA ETA DOKUMENTUAREN PARSINGA
// Endpoint honek Excel liburua irakurtzen du eta errenkadak/zutabeak JSON-era
// bihurtzen ditu aplikazio barruan inbentarioaren panela kargatzeko.
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

function fail(string $message): never
{
    error_log('No se pudo leer el inventario Excel: ' . $message);
    http_response_code(500);
    echo json_encode(['error' => 'No se pudo leer InbentorioaE1T2.xlsx.']);
    exit;
}

function startsWith(string $haystack, string $needle): bool
{
    return $needle === '' || strpos($haystack, $needle) === 0;
}

function readEntryFromArchive($archive, string $path): string
{
    if ($archive instanceof PharData) {
        if (!isset($archive[$path])) {
            throw new RuntimeException('No existe la entrada ' . $path);
        }

        return $archive[$path]->getContent();
    }

    if ($archive instanceof ZipArchive) {
        $content = $archive->getFromName($path);
        if ($content === false) {
            throw new RuntimeException('No existe la entrada ' . $path);
        }

        return $content;
    }

    throw new RuntimeException('Tipo de archivo no soportado para leer el Excel.');
}

function parseXml(string $content, string $path): DOMDocument
{
    $document = new DOMDocument();
    $document->resolveExternals = false;
    $document->substituteEntities = false;

    if (!$document->loadXML($content, LIBXML_NONET)) {
        throw new RuntimeException('XML no válido en ' . $path);
    }

    return $document;
}

function cellColumn(string $reference): int
{
    if (!preg_match('/^([A-Z]+)/', $reference, $matches)) {
        throw new RuntimeException('Referencia de celda no válida: ' . $reference);
    }

    $column = 0;
    foreach (str_split($matches[1]) as $letter) {
        $column = ($column * 26) + ord($letter) - 64;
    }

    return $column;
}

function normalizeText(string $value): string
{
    return trim(preg_replace('/\s+/u', ' ', $value) ?? $value);
}

function cellText(DOMElement $cell, DOMXPath $xpath, array $sharedStrings): string
{
    $type = $cell->getAttribute('t');
    if ($type === 's') {
        $index = (int) $xpath->evaluate('string(m:v)', $cell);
        return $sharedStrings[$index] ?? '';
    }
    if ($type === 'inlineStr') {
        return $xpath->evaluate('string(m:is)', $cell) ?: implode('', array_map(
            static fn (DOMNode $node): string => $node->textContent,
            iterator_to_array($xpath->query('.//m:is//m:t', $cell))
        ));
    }

    return $xpath->evaluate('string(m:v)', $cell);
}

try {
    $file = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'InbentorioaE1T2.xlsx';
    if (!is_file($file)) {
        throw new RuntimeException('No se encuentra ' . $file);
    }

    $archive = null;
    if (class_exists('PharData')) {
        $archive = new PharData($file);
    } elseif (class_exists('ZipArchive')) {
        $zip = new ZipArchive();
        $opened = $zip->open($file);
        if ($opened !== true) {
            throw new RuntimeException('No se pudo abrir el archivo Excel con ZipArchive (código: ' . $opened . ').');
        }
        $archive = $zip;
    } else {
        throw new RuntimeException('La extensión Phar ni ZipArchive no está disponible. Habilita una de las dos para leer archivos XLSX.');
    }

    try {
        $workbookXml = parseXml(readEntryFromArchive($archive, 'xl/workbook.xml'), 'xl/workbook.xml');
        $workbookXPath = new DOMXPath($workbookXml);
        $workbookXPath->registerNamespace('m', 'http://schemas.openxmlformats.org/spreadsheetml/2006/main');
        $workbookXPath->registerNamespace('r', 'http://schemas.openxmlformats.org/officeDocument/2006/relationships');
        $sheet = $workbookXPath->query('/m:workbook/m:sheets/m:sheet')->item(0);
        if (!$sheet instanceof DOMElement) {
            throw new RuntimeException('El libro no contiene hojas.');
        }

        $relationshipId = $sheet->getAttributeNS(
            'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
            'id'
        );
        $relationshipsXml = parseXml(readEntryFromArchive($archive, 'xl/_rels/workbook.xml.rels'), 'xl/_rels/workbook.xml.rels');
        $relationshipsXPath = new DOMXPath($relationshipsXml);
        $relationshipsXPath->registerNamespace('rel', 'http://schemas.openxmlformats.org/package/2006/relationships');
        $relationship = $relationshipsXPath->query(
            '/rel:Relationships/rel:Relationship[@Id="' . htmlspecialchars($relationshipId, ENT_XML1) . '"]'
        )->item(0);
        if (!$relationship instanceof DOMElement) {
            throw new RuntimeException('No se encontró la relación de la hoja.');
        }

        $target = str_replace('\\', '/', $relationship->getAttribute('Target'));
        $sheetPath = startsWith($target, '/') ? ltrim($target, '/') : 'xl/' . $target;
        $pathParts = [];
        foreach (explode('/', $sheetPath) as $part) {
            if ($part === '' || $part === '.') {
                continue;
            }
            if ($part === '..') {
                array_pop($pathParts);
                continue;
            }
            $pathParts[] = $part;
        }
        $sheetPath = implode('/', $pathParts);

        $sharedStrings = [];
        if (method_exists($archive, 'locateName') && $archive->locateName('xl/sharedStrings.xml') !== false) {
            $sharedXml = parseXml(readEntryFromArchive($archive, 'xl/sharedStrings.xml'), 'xl/sharedStrings.xml');
            $sharedXPath = new DOMXPath($sharedXml);
            $sharedXPath->registerNamespace('m', 'http://schemas.openxmlformats.org/spreadsheetml/2006/main');
            foreach ($sharedXPath->query('/m:sst/m:si') as $string) {
                $sharedStrings[] = implode('', array_map(
                    static fn (DOMNode $node): string => $node->textContent,
                    iterator_to_array($sharedXPath->query('.//m:t', $string))
                ));
            }
        } elseif (isset($archive['xl/sharedStrings.xml'])) {
            $sharedXml = parseXml(readEntryFromArchive($archive, 'xl/sharedStrings.xml'), 'xl/sharedStrings.xml');
            $sharedXPath = new DOMXPath($sharedXml);
            $sharedXPath->registerNamespace('m', 'http://schemas.openxmlformats.org/spreadsheetml/2006/main');
            foreach ($sharedXPath->query('/m:sst/m:si') as $string) {
                $sharedStrings[] = implode('', array_map(
                    static fn (DOMNode $node): string => $node->textContent,
                    iterator_to_array($sharedXPath->query('.//m:t', $string))
                ));
            }
        }

        $sheetXml = parseXml(readEntryFromArchive($archive, $sheetPath), $sheetPath);
        $sheetXPath = new DOMXPath($sheetXml);
        $sheetXPath->registerNamespace('m', 'http://schemas.openxmlformats.org/spreadsheetml/2006/main');
        $rows = [];
        foreach ($sheetXPath->query('/m:worksheet/m:sheetData/m:row') as $row) {
            $cells = [];
            foreach ($sheetXPath->query('m:c', $row) as $cell) {
                if (!$cell instanceof DOMElement) {
                    continue;
                }
                $cells[cellColumn($cell->getAttribute('r'))] = normalizeText(cellText($cell, $sheetXPath, $sharedStrings));
            }
            $rows[] = $cells;
        }

        $groups = [];
        $headers = [];
        $activeGroup = null;
        $quantityColumn = null;
        foreach ($rows as $cells) {
            $hasComponentHeader = false;
            foreach ($cells as $value) {
                if (stripos($value, 'Osagaia') !== false || stripos($value, 'Componente') !== false) {
                    $hasComponentHeader = true;
                    break;
                }
            }

            if ($hasComponentHeader) {
                $headers = [];
                $headerColumns = array_filter(
                    array_keys($cells),
                    static fn (int $column): bool => $column >= 3 && $cells[$column] !== ''
                );
                if (!$headerColumns) {
                    throw new RuntimeException('La tabla no contiene encabezados.');
                }
                $firstHeaderColumn = min($headerColumns);
                $lastHeaderColumn = max($headerColumns);
                for ($column = $firstHeaderColumn; $column <= $lastHeaderColumn; $column++) {
                    $value = $cells[$column] ?? '';
                    $headers[$column] = $value !== '' ? $value : 'Columna ' . $column;
                }

                $groupTitle = normalizeText($cells[2] ?? '');
                if ($groupTitle === '') {
                    $groupTitle = 'Inventario';
                }
                $groups[] = ['title' => $groupTitle, 'items' => []];
                $activeGroup = count($groups) - 1;
                foreach ($headers as $column => $header) {
                    if (stripos($header, 'Kantitatea') !== false || stripos($header, 'Cantidad') !== false || stripos($header, 'Quantity') !== false) {
                        $quantityColumn = array_search($column, array_keys($headers), true);
                    }
                }
                continue;
            }

            if ($activeGroup === null || !$headers) {
                continue;
            }

            $values = [];
            $hasValue = false;
            foreach ($headers as $column => $_header) {
                $value = $cells[$column] ?? '';
                $values[] = $value;
                $hasValue = $hasValue || $value !== '';
            }
            if ($hasValue) {
                $groups[$activeGroup]['items'][] = $values;
            }
        }

        if (!$groups || !$headers) {
            throw new RuntimeException('No se encontraron tablas de componentes en el libro.');
        }

        echo json_encode([
            'source' => basename($file),
            'columns' => array_values($headers),
            'quantityColumn' => $quantityColumn,
            'groups' => $groups
        ], JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    } finally {
        if ($archive instanceof ZipArchive) {
            $archive->close();
        }
    }
} catch (Throwable $error) {
    fail($error->getMessage());
}

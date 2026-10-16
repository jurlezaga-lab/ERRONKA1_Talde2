<?php

$host = "localhost";
$usuario = "root";
$pasahitza = "";
$datuBasea = "empresa";

mysqli_report(MYSQLI_REPORT_OFF);

$conn = new mysqli($host, $usuario, $pasahitza, $datuBasea);

if ($conn->connect_error) {
    die("Errorea konexioan: " . $conn->connect_error);
}

// UPDATE kontsulta parametrizatua
$sql = "UPDATE emple
        SET salario = ?
        WHERE oficio = ? AND dept_no = ?";

// Balioak zehaztu
$salario = 1600;
$oficio = "EMPLEADO";
$dept_no = 20;

// Kontsulta prestatu
$stmt = $conn->prepare($sql);

// Parametroak lotu
$stmt->bind_param("dsi", $salario, $oficio, $dept_no);

// UPDATE exekutatu
if ($stmt->execute()) {
    echo "Datuak eguneratu dira.";
} else {
    echo "Errorea: " . $stmt->error;
}

// Prestatutako sententzia itxi
$stmt->close();

// Konexioa itxi
$conn->close();

?>

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

// DELETE kontsulta parametrizatua
$sql = "DELETE FROM depart
        WHERE dnombre = ? AND loc = ?";

// Balioak zehaztu
$dnombre = "MARKETING";
$loc = "SANTANDER";

// Kontsulta prestatu
$stmt = $conn->prepare($sql);

// Parametroak lotu
$stmt->bind_param("ss", $dnombre, $loc);

// DELETE exekutatu
if ($stmt->execute()) {
    echo "Ezabaketa arrakastatsua!";
} else {
    echo "Errorea ezabatzean: " . $stmt->error;
}

// Prestatutako sententzia itxi
$stmt->close();

// Konexioa itxi
$conn->close();

?>
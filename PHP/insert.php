<?php

$host = "localhost";
$usuario = "root";
$pasahitza = "1234";
$datuBasea = "kudeaketa_2";

mysqli_report(MYSQLI_REPORT_OFF);

$conn = @new mysqli($host, $usuario, $pasahitza, $datuBasea);

if ($conn->connect_error) {
    die("Errorea konexioan: " . $conn->connect_error);
}

// INSERT kontsulta parametrizatua
$sql = "INSERT INTO depart (dept_no, dnombre, loc) 
        VALUES (?, ?, ?)";

// Balioak zehaztu
$dept_no = 90;
$dnombre = "MARKETING";
$loc = "SANTANDER";

// Kontsulta prestatu
$stmt = $conn->prepare($sql);   

// Parametroak lotu
$stmt->bind_param("iss", $dept_no, $dnombre, $loc);

// INSERT exekutatu
if ($stmt->execute()) {
    echo "Departamentua arrakastaz txertatuta.";
} else {
    echo "Errorea: " . $stmt->error;
}

// Prestatutako sententzia itxi
$stmt->close();

$conn->close();
?>
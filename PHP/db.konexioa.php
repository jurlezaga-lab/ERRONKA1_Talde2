<?php
$host = "localhost";
$usuario = "root";
$pasahitza = "1234";
$datuBasea = "kudeaketa_7";

// mysqli-ren salbuespenak automatikoki jaurtitzea desgaitu
mysqli_report(MYSQLI_REPORT_OFF);

// Konexioa sortu
$conn = @new mysqli($host, $usuario, $pasahitza, $datuBasea);

// Konexioa egiaztatu
if ($conn->connect_error) {
    throw new RuntimeException("Errorea konexioan: " . $conn->connect_error, $conn->connect_errno);
}
?>

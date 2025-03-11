<?php
$host = "localhost";
$user = "root"; 
$password = "root";
$database = "Otsu2";

// Crear conexión
$conn = mysqli_connect($host, $user, $password, $database);

// Verificar conexión
if (!$conn) {
    die("Error de conexión: " . mysqli_connect_error());
}
?>

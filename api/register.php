<?php
require '../config/db.php';

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_DEFAULT); // Cifrar la contraseña

$query = "INSERT INTO usuarios (email, password) VALUES ('$email', '$password')";

if (mysqli_query($conn, $query)) {
    echo json_encode(["success" => true, "message" => "Usuario registrado"]);
} else {
    echo json_encode(["error" => "Error al registrar usuario: " . mysqli_error($conn)]);
}
?>

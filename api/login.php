<?php
require '../config/db.php';
session_start();

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password = $data['password'];

$query = "SELECT * FROM usuarios WHERE email = '$email' LIMIT 1";
$result = mysqli_query($conn, $query);
$user = mysqli_fetch_assoc($result);

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['email'] = $user['email'];
    echo json_encode(["success" => true, "message" => "Login exitoso"]);
} else {
    echo json_encode(["error" => "Credenciales incorrectas"]);
}
?>

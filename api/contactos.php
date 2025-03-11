<?php
require '../config/db.php';
session_start();

header("Content-Type: application/json");

// Verificar si el usuario está autenticado
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "Acceso no autorizado"]);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === "GET") {
    // Obtener un solo contacto si se pasa el id
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $query = "SELECT * FROM contactos WHERE id = $id";
        $result = mysqli_query($conn, $query);
        $contacto = mysqli_fetch_assoc($result);
        echo json_encode($contacto);
    } else {
        // Obtener todos los contactos si no se pasa el id
        $query = "SELECT * FROM contactos";
        $result = mysqli_query($conn, $query);
        $contactos = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($contactos);
    }
} elseif ($method === "POST") {
    // Crear un nuevo contacto
    $data = json_decode(file_get_contents("php://input"), true);
    $nombre = $data['nombre'];
    $telefono = $data['telefono'];
    $email = $data['email'];

    $query = "INSERT INTO contactos (nombre, telefono, email) VALUES ('$nombre', '$telefono', '$email')";
    if (mysqli_query($conn, $query)) {
        echo json_encode(["success" => true, "message" => "Contacto agregado"]);
    } else {
        echo json_encode(["error" => "Error al agregar contacto"]);
    }
} elseif ($method === "PUT") {
    // Editar un contacto
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'];
    $nombre = $data['nombre'];
    $telefono = $data['telefono'];
    $email = $data['email'];

    $query = "UPDATE contactos SET nombre='$nombre', telefono='$telefono', email='$email' WHERE id=$id";
    if (mysqli_query($conn, $query)) {
        echo json_encode(["success" => true, "message" => "Contacto actualizado"]);
    } else {
        echo json_encode(["error" => "Error al actualizar contacto"]);
    }
} elseif ($method === "DELETE") {
    // Eliminar un contacto
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'];

    $query = "DELETE FROM contactos WHERE id=$id";
    if (mysqli_query($conn, $query)) {
        echo json_encode(["success" => true, "message" => "Contacto eliminado"]);
    } else {
        echo json_encode(["error" => "Error al eliminar contacto"]);
    }
} else {
    echo json_encode(["error" => "Método no permitido"]);
}
?>

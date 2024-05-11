<?php
include('conn.php');

// Verificar si el ID existe en la tabla de usuarios
$id = $_GET['id']; // ID recibido a través de la URL

$sql = "SELECT * FROM usuarios WHERE id = $id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // El ID existe en la tabla de usuarios
    $row = $result->fetch_assoc();
    echo json_encode($row); // Devolver los datos del registro en formato JSON
} else {
    // El ID no existe en la tabla de usuarios
    $response = array("exists" => false);
    echo json_encode($response);
}

$conn->close();
?>

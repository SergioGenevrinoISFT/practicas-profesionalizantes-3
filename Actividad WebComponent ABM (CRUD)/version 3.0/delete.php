<?php
include('conn.php');

// RECIBIR PETICION JSON
$data = json_decode(file_get_contents("php://input"), true);
$idToDelete = $data['id'];

// CONSULTA MYSQL
$sql = "DELETE FROM usuarios WHERE id = $idToDelete";

if ($conn->query($sql) === TRUE) {
        echo json_encode(array("message" => "Registro eliminado correctamente."));
} else {
    
    echo json_encode(array("error" => "Error al eliminar el registro: " . $conn->error));
}

// CERRAR CONEXION
$conn->close();
?>

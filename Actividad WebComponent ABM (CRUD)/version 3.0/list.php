<?php
include('conn.php');

// Consulta SQL para obtener todos los registros de la tabla usuarios
$sql = "SELECT * FROM usuarios";
$result = $conn->query($sql);

// Verificar si hay resultados y generar la respuesta JSON
if ($result->num_rows > 0) {
    // Array para almacenar los datos
    $data = array();

    // Iterar sobre los resultados y agregarlos al array
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    // Enviar los datos como respuesta JSON
    header('Content-Type: application/json');
    echo json_encode($data);
} else {
    // Si no hay resultados, enviar un mensaje JSON vacío
    //echo json_encode(array());
}

// Cerrar la conexión con la base de datos
$conn->close();

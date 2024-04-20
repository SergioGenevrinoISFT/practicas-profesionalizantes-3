<?php

include('env.php');
include('conn.php');


// CONSULTA MYSQL
$sql = "SELECT * FROM provincia";
$result = $conn->query($sql);

// Verificar si hay resultados y construir un array
if ($result->num_rows > 0) {
    $provincias = array();
    while ($row = $result->fetch_assoc()) {
        $provincias[] = $row;
        
    }
    // Convertir el array a formato JSON y enviarlo
    header('Content-Type: application/json');
    echo json_encode($provincias);
} else {
    echo "0 results";
}
$conn->close();
?>



<?php

include('env.php');
include('conn.php');
include('json.php');

// CONSULTA MYSQL
$sql = "SELECT * FROM localidad WHERE idMunicipio=" . $parametro . " ORDER BY Municipio";
$result = $conn->query($sql);

//Verificar si hay resultados y construir un array
if ($result->num_rows > 0) {
    $localidades = array();
    while ($row = $result->fetch_assoc()) {
        $localidades[] = $row;
    }
    // Convertir el array a formato JSON y enviarlo
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($localidades);
} else {
    echo "0 results";
}
$conn->close();


?>
<?php

include('env.php');
include('conn.php');
include('json.php');

// CONSULTA MYSQL
$sql = "SELECT * FROM municipio WHERE idDepartamento=".$parametro;
$result = $conn->query($sql);

//Verificar si hay resultados y construir un array
if ($result->num_rows > 0) {
$municipios = array();
while ($row = $result->fetch_assoc()) {
$municipios[] = $row;

}
// Convertir el array a formato JSON y enviarlo
header('Content-Type: application/json');
echo json_encode($municipios);
} else {
echo "0 results";
}
$conn->close();

?>

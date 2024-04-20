<?php

include('env.php');
include('conn.php');
include('json.php');


// CONSULTA MYSQL
$sql = "SELECT * FROM departamento WHERE idProvincia=".$parametro." ORDER BY Departamento" ;
$result = $conn->query($sql);

//Verificar si hay resultados y construir un array
if ($result->num_rows > 0) {
$departamentos = array();
while ($row = $result->fetch_assoc()) {
$departamentos[] = $row;

}
// Convertir el array a formato JSON y enviarlo
header('Content-Type: application/json');
echo json_encode($departamentos);
} else {
echo "0 results";
}
$conn->close();

?>

<?php

include('conn.php');

try {
    // CONEXION PDO
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    
    // DEFINIR ERRORMODE
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  
    $sql = "SELECT concepto, enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre, anual FROM meteorologia";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    // OBTENER RESULTADOS COMO ARRAY ASOCIATIVO
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);

} catch(PDOException $e) {
       echo "Error: " . $e->getMessage();
}

// Cerrar la conexión
$conn = null;
?>

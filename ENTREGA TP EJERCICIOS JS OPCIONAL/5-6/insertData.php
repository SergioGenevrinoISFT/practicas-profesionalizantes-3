<?php

include ('datos.php');
include ('conn.php');

try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  
    foreach ($datos as $dato) {
        $concepto = $dato[0];
        // SEPARAR DATOS DEL ARRAY
        $meses = array_slice($dato, 1); 

        $sql = "INSERT INTO meteorologia (concepto, enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre, anual)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
       
        $stmt = $conn->prepare($sql);

        try {
            $stmt->execute(array_merge([$concepto], $meses));
            echo "Datos insertados correctamente para: $concepto <br>";
        } catch (PDOException $e) {
            echo "Error al insertar datos: " . $e->getMessage();
        }
    }

    // Cerrar la conexión
    $conn = null;

} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}



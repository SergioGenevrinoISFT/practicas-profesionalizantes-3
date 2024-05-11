<?php
include('conn.php');


// Verifica que la solicitud sea de tipo POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtiene los datos enviados en formato JSON y los convierte a un array asociativo
    $jsonData = json_decode(file_get_contents('php://input'), true);

    // Verifica si se recibieron los datos esperados (username y saldo)
    if (isset($jsonData['username']) && isset($jsonData['saldo'])) {
        // Obtiene los datos del usuario y el saldo
        $username = $jsonData['username'];
        $saldo = $jsonData['saldo'];
        
       // Prepara la consulta SQL con parámetros
       $sql = "INSERT INTO usuarios (username, saldo) VALUES ('$username', '$saldo')";

      // Cambio en la ejecución de la consulta
        $stmt = $conn->query($sql);

        if ($stmt) {
            // Verifica si la consulta fue exitosa
            if ($conn->affected_rows > 0) {
                // Envía una respuesta JSON indicando éxito
                echo json_encode(array("success" => true, "message" => "Usuario creado exitosamente"));
            } else {
                // Si no se afectó ninguna fila, probablemente haya ocurrido un error
                echo json_encode(array("success" => false, "message" => "Error al crear usuario"));
            }
        } else {
            // Si la ejecución de la consulta falla, envía un mensaje de error
            echo json_encode(array("success" => false, "message" => "Error al ejecutar la consulta"));
        }
    }}
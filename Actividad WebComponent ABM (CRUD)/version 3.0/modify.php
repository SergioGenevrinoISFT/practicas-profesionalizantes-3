<?php
include('conn.php');

// Verificar si la petición es del tipo POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Obtener los datos enviados en el cuerpo de la solicitud JSON
    $data = json_decode(file_get_contents('php://input'), true);

    // Verificar si se recibieron todos los datos necesarios
    if (isset($data['id']) && isset($data['username']) && isset($data['saldo'])) {
        
        
            // Escapar los datos para evitar inyección SQL
            $id = $conn->real_escape_string($data['id']);
            $username = $conn->real_escape_string($data['username']);
            $saldo = $conn->real_escape_string($data['saldo']);
            
            // Construir la consulta SQL para actualizar los datos en la tabla de usuarios
            $sql = "UPDATE usuarios SET username = '$username', saldo = '$saldo' WHERE id = '$id'";
            
            // Ejecutar la consulta SQL
            if ($conn->query($sql) === TRUE) {
                $response = [
                    'success' => true,
                    'message' => 'Los datos del usuario han sido modificados exitosamente.'
                ];
            } else {
                $response = [
                    'success' => false,
                    'message' => 'Error al modificar los datos del usuario: ' . $conn->error
                ];
            }
            
            // Cerrar la conexión a la base de datos
            $conn->close();
      

        // Devolver la respuesta como JSON
        header('Content-Type: application/json');
        echo json_encode($response);
    } else {
        // Si no se recibieron todos los datos necesarios, devolver una respuesta de error
        $response = [
            'success' => false,
            'message' => 'No se recibieron todos los datos necesarios para realizar la modificación.'
        ];

        // Devolver la respuesta como JSON
        header('Content-Type: application/json');
        echo json_encode($response);
    }
} else {
    // Si la petición no es del tipo POST, devolver una respuesta de error
    $response = [
        'success' => false,
        'message' => 'El método de solicitud no es válido. Se requiere una solicitud POST.'
    ];

    // Devolver la respuesta como JSON
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>

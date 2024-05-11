<?php
// Conexión a la base de datos MySQL
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cuentas";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Leer el archivo JSON
$json_data = file_get_contents('./cuentas.json');

// Convertir el JSON a un array asociativo
$data = json_decode($json_data, true);

// Insertar los datos en la tabla MySQL
foreach ($data['cuentas'] as $cuenta) {
    $id = $cuenta['id'];
    $username = $cuenta['username'];
    $saldo = $cuenta['saldo'];

    // Insertar la fila en la tabla
    $sql = "INSERT INTO usuarios (id, username, saldo) VALUES ('$id', '$username', '$saldo')";
    if ($conn->query($sql) !== TRUE) {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Cerrar la conexión
$conn->close();

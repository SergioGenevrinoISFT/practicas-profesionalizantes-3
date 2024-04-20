<?php

// Crear conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificar conexión
if ($conn->connect_error) {
die("Error de Conexion: " . $conn->connect_error);
}
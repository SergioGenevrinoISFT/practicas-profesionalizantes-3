<?php

header('Content-Type: text/plain; charset=utf-8');
$json = file_get_contents('php://input');
$data = json_decode($json, true);
$parametro = $data['parametro'];
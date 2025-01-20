<?php

require_once "config.php";

$id = $_GET['id'];

$connection = new mysqli(server_ip, user, password, db);

$response = $connection->query("SELECT * FROM regions WHERE id = $id LIMIT 1");

if ($response->fetch_assoc()) {
    echo 'true';
} else {
    echo 'false';
}

$connection->close();
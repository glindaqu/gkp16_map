<?php

require_once "config.php";

$street = $_GET['street'];
$house = $_GET['housenumber'];

$connection = new mysqli(server_ip, user, password, db);

$response = $connection->query("SELECT * FROM addresses WHERE Street = '$street' AND HouseNumber = '$house' LIMIT 1");

if ($response->fetch_assoc()) {
    echo 'true';
} else {
    echo 'false';
}

$connection->close();
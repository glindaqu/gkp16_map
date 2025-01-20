<?php

require_once "config.php";

$street = $_GET['street'];
$house = $_GET['house'];

$connection = new mysqli(server_ip, user, password, db);

$response = $connection->query("SELECT * FROM addresses WHERE Street = '$street' AND HouseNumber = '$house' AND Latitude IS NOT NULL LIMIT 1;");

if ($response->fetch_assoc()) {
	echo "true";
} else {
	echo "false";
}

$connection->close();



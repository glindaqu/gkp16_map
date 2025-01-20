<?php

require_once "config.php";

$street = $_GET['street'];
$prefix = $_GET['prefix'];
$longitude = $_GET['longitude'];
$latitude = $_GET['latitude'];
$house = $_GET['housenumber'];
$flatCount = $_GET['flatcount'];
$medicalDivision = $_GET['medicaldivision'];
$region = $_GET['region'];

file_put_contents("/var/www/html/m/api/v1/log.log", "$street $prefix $house $flatCount $medicalDivision $region $latitude $longitude\n", FILE_APPEND);

if ($street == "" || $house == "") {
    die("Address is not specified");
}

$query = "INSERT INTO addresses(Prefix, Street, Longitude, Latitude, HouseNumber, FlatCount, MedicalDivision, Region) VALUES
    ('$prefix', '$street', $longitude, $latitude, '$house', $flatCount, $medicalDivision, $region)";

$connection = new mysqli(server_ip, user, password, db);
$isSuccess = $connection->query($query);
$connection->close();
echo $query;
if ($isSuccess) {
	echo "true";
} else {
	echo "false";
}

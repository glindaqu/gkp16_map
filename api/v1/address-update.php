<?php

require_once "config.php";

$street = $_GET['street'];
$house = $_GET['housenumber'];
$flatCount = $_GET['flatcount'];
$medicalDivision = $_GET['medicaldivision'];
$region = $_GET['region'];

$lat = 0;
$lon = 0;

if (isset($_GET['lon']) && isset($_GET['lat'])) {
    $lat = $_GET['lat'];
    $lon = $_GET['lon'];
}

if ($street == "" || $house == "") {
    die("Address is not specified");
}

$query = "";

if ($lat == 0 && $lon == 0) {
    $query = "UPDATE addresses SET FlatCount = $flatCount, MedicalDivision = $medicalDivision, 
        Region = $region WHERE Street = '$street' AND HouseNumber = '$house'";
} else {
    $query = "UPDATE addresses SET FlatCount = $flatCount, MedicalDivision = $medicalDivision,
	Region = $region, Latitude = $lat, Longitude = $lon WHERE Street = '$street' AND HouseNumber = '$house'";
}

file_put_contents("/var/log/phplog.log", $query,  FILE_APPEND);

//$connection = new mysqli(server_ip, user, password, db);
//$connection->query($query);
//$connection->close();

echo true;

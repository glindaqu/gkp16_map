<?php

require_once "../api.php";

$id = $_POST['row-id'];
$street = $_POST['street'];
$pr = $_POST['prefix'];
$hn = $_POST['house-number'];
$reg = $_POST['region'];
$fc = $_POST['flat-count'];
$md = $_POST['medical-division'];
$lo = $_POST['longitude'];
$la = $_POST['latitude'];

API::UpdateRowById([
    'Street' => $street,
    'Prefix' => $pr,
    'HouseNumber' => $hn,
    'Region' => $reg,
    'MedicalDivision' => $md,
    'FlatCount' => $fc,
    'Longitude' => $lo,
    'Latitude' => $la,
], $id);

header("location: http://".API::SERVER_IP."/php/viewTable.php");
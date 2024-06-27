<?php

require_once "../api.php";

$id = $_POST['row-id'];
$an = $_POST['actual-name'];
$pc = $_POST['people-count'];
$md = $_POST['medical-division'];
$lo = $_POST['longitude'];
$la = $_POST['latitude'];

API::UpdateRowById([
    'actualName' => $an,
    'peopleCount' => $pc,
    'medicalDivision' => $md,
    'longitude' => $lo,
    'latitude' => $la,
], $id);

header("location: http://".API::SERVER_IP."/php/viewTable.php");
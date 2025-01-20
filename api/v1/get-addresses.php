<?php

require_once "config.php";

$connection = new mysqli(server_ip, user, password, db);
$connection->set_charset("UTF8");

$result = $connection->query("SELECT * FROM addresses");
$arr = [];

while ($el = $result->fetch_assoc()) {
    $arr[] = $el;
}

print_r(json_encode($arr, true));
$connection->close();
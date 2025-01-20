<?php

require_once "config.php";

$connection = new mysqli(server_ip, user, password, db);

$result = [];
$query_result = $connection->query("SELECT * FROM regions");

while ($row = $query_result->fetch_assoc()) {
    $result[] = $row;
}

print_r(json_encode($result));
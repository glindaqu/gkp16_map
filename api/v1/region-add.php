<?php

require_once "config.php";

$id = $_GET['id'];
$md = $_GET['md'];

if ($id == "" || $md == "") {
    die("Id or Md is not specified");
}

$connection = new mysqli(server_ip, user, password, db);

try {
    $connection->query("INSERT INTO regions(id, md, peopleCount) VALUES ($id, $md, 0)");
} catch(Throwable $err) {
    $connection->query("UPDATE regions SET md = $md WHERE id = $id");
}

$connection->close();
<?php

require_once "config.php";

$id = $_GET['id'];
$md = $_GET['md'];

if ($id == "" || $md == "") {
    die("Id or Md is not specified");
}

$query = "UPDATE regions SET md = $md WHERE id = $id";

$connection = new mysqli(server_ip, user, password, db);
$connection->query($query);
$connection->close();

echo true;
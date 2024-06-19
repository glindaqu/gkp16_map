<!DOCTYPE html>
<html lang="ru">

<?php

require_once "database.php";

if (isset($_POST['login']) && isset($_POST['password'])) {
    $db = new Database("localhost", "root", "", "leafletmap");
    $user = $db->query("SELECT * FROM users WHERE login = '".$_POST['login']."' AND password = '".$_POST['password']."'");
    if (isset($user[0])) header("location: http://leafletmap:81/php/viewTable.php") && die();
}
?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Войдите</title>
    <link rel="stylesheet" href="../css/login.css">
</head>

<body>
    <form action="" method="post">
        <div class="title">Leafletmap</div>
        <input type="text" name="login" id="login">
        <input type="password" name="password" id="password">
        <input type="submit" value="Войти">
    </form>
</body>

</html>
<!DOCTYPE html>
<html lang="ru">

<?php

require_once "api.php";

if (isset($_COOKIE['login'])) {
    header("location: http://leafletmap:81/php/viewTable.php") && die();
} 

if (isset($_POST['login']) && isset($_POST['password']) && API::CheckUser($_POST['login'], $_POST['password'])) {
    setcookie('login', $_POST['login'], time() + 12 * 60 * 60);
    header("location: http://leafletmap:81/php/viewTable.php") && die();
}
?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Войдите</title>
    <link rel="stylesheet" href="../css/login.css">
</head>

<body>
    <div class="back-btn">
        <img src="../svg/back.svg" alt="" class="image">
    </div>
    <form action="" method="post">
        <div class="title">Leafletmap</div>
        <input type="text" name="login" id="login">
        <input type="password" name="password" id="password">
        <input type="submit" value="Войти">
    </form>
</body>

<script>
document.querySelector(".back-btn").addEventListener("click", () => {
    window.location.replace("http://leafletmap:81/")
});
</script>

</html>
<?php

if (!isset($_GET['id']))
    die('Запись не выбрана');

if (!isset($_COOKIE['login'])) 
    die("Авторизуйтесь в системе");

require_once "api.php";

$id = $_GET['id'];
$row = API::GetRowById($id);
?>
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Редактирование</title>
    <link rel="stylesheet" href="../css/edit.css">
</head>

<body>
    <a class="back-btn" href="http://<?php echo API::SERVER_IP ?>/php/view-table.php" title="К таблице">
        <img src="http://<?php echo API::SERVER_IP ?>/svg/back.svg" alt="" class="image">
    </a>
    <form action="tools/save.php" method=post>
        <div class="controls">
            <div class="labels">
                <label>Идентификатор записи</label>
                <label>Улица</label>
                <label>Номер дома</label>
                <label>Тип объекта</label>
                <label>Терапевтическое отделение</label>
                <label>Участок</label>
                <label>Количество квартир</label>
                <label>Долгота</label>
                <label>Широта</label>
            </div>
            <div class="inputs">
                <input type="text" name="row-id" value="<?php echo $row['id'] ?>" readonly>
                <input type="text" name="street" value="<?php echo $row['Street'] ?>">
                <input type="text" name="house-number" value="<?php echo $row['HouseNumber'] ?>">
                <input type="text" name="prefix" value="<?php echo $row['Prefix'] ?>">
                <input type="text" name="medical-division" value="<?php echo $row['MedicalDivision'] ?>">
                <input type="text" name="region" value="<?php echo $row['Region'] ?>">
                <input type="text" name="flat-count" value="<?php echo $row['FlatCount'] ?>">
                <input type="text" name="longitude" value="<?php echo $row['Longitude'] ?>">
                <input type="text" name="latitude" value="<?php echo $row['Latitude'] ?>">
            </div>
        </div>

        <input type="submit" value="Редактировть">
    </form>
</body>

</html>
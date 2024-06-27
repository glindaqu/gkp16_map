<?php

if (!isset($_GET['id']))
    die('Запись не выбрана');

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
    <a class="back-btn" href="viewTable.php" title="К таблице">
        <img src="http://<?php echo API::SERVER_IP ?>/svg/back.svg" alt="" class="image">
    </a>
    <form action="tools/save.php" method=post>
        <div class="controls">
            <div class="labels">
                <label>Идентификатор записи</label>
                <label>Адрес</label>
                <label>Терапевтическое отделение</label>
                <label>Количество жильцов</label>
                <label>Долгота</label>
                <label>Широта</label>
            </div>
            <div class="inputs">
                <input type="text" name="row-id" value="<?php echo $row['id'] ?>" disabled readonly>
                <input type="text" name="actual-name" value="<?php echo $row['actualName'] ?>">
                <input type="text" name="medical-division" value="<?php echo $row['medicalDivision'] ?>">
                <input type="text" name="people-count" value="<?php echo $row['peopleCount'] ?>">
                <input type="text" name="longitude" value="<?php echo $row['longitude'] ?>">
                <input type="text" name="latitude" value="<?php echo $row['latitude'] ?>">
            </div>
        </div>

        <input type="submit" value="Редактировть">
    </form>
</body>

</html>
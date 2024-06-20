<?php

if (!isset($_GET['id'])) die('Запись не выбрана');

require_once "api.php";

$id = $_GET['id'];
$row = API::GetRowById($id);


?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Редактирование</title>
    <link rel="stylesheet" href="../css/edit.css">
</head>

<body>
    <form action="tools/save.php" method=post>
        <label>
            Идентификатор записи
            <input type="text" name="row-id" value="<?php echo $row['id']?>" readonly>
        </label>
        <label>
            Адрес
            <input type="text" name="actual-name" value="<?php echo $row['actualName']?>">
        </label>
        <label>
            Терапевтическое отделение
            <input type="text" name="medical-division" value="<?php echo $row['medicalDivision']?>">
        </label>
        <label>
            Количество жильцов
            <input type="text" name="people-count" value="<?php echo $row['peopleCount']?>">
        </label>
        <label>
            Долгота
            <input type="text" name="longitude" value="<?php echo $row['longitude']?>">
        </label>
        <label>
            Широта
            <input type="text" name="latitude" value="<?php echo $row['latitude']?>">
        </label>

        <input type="submit" value="Редактировть">
    </form>
</body>

</html>
<!DOCTYPE html>
<html lang="en">

<?php 
require_once "stringUtils.php";
require_once "database.php";

$jsonInText = file_get_contents("../data/withCoords.json");
$json = json_decode($jsonInText, true);
$maxLength = max(array_map('StringUtils::GetValueLengthByKey', $json));
?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Просмотр данных</title>
    <link rel="stylesheet" href="../css/view.css">
</head>

<body>
    <table>
        <thead>
            <tr class="row">
                <th class="address">Адрес</th>
                <th class="med-div">Терапевтическое отделение</th>
                <th class="people-count">Количество жильцов</th>
            </tr>
        </thead>
        <tbody>
            
            <?php
            foreach ($json as $index=>$item) { ?>
            <tr class="row" style="background-color: #<?php echo $index % 2 ? 'dadada' : 'efefef'?>">
                <td class="address">
                    <?php echo trim(str_replace(",", "", $item["name"])) ?>
                </td>
                <td class="med-div">
                    <?php echo trim($item["medDivision"]) ?>
                </td>
                <td class="people-count">
                    <?php echo $item["peopleCount"] ?>
                </td>
            </tr>
            <?php } ?>

        </tbody>
    </table>
</body>

</html>
<!DOCTYPE html>
<html lang="en">

<?php 
require_once "stringUtils.php";
require_once "api.php";

$json = API::GetAllAdresses();
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
            <tr class="row" id="<?php echo $item['id']; ?>" style="background-color: #<?php echo $index % 2 ? 'dadada' : 'efefef'?>">
                <td class="address" id="<?php echo $item['id']; ?>">
                    <?php echo trim(str_replace(",", "", $item["actualName"])) ?>
                </td>
                <td class="med-div" id="<?php echo $item['id']; ?>">
                    <?php echo trim($item["medicalDivision"]) ?>
                </td>
                <td class="people-count" id="<?php echo $item['id']; ?>">
                    <?php echo $item["peopleCount"] ?>
                </td>
            </tr>
            <?php } ?>

        </tbody>
    </table>

    <div class="menu hidden">
        <div class="item">Редактировать</div>
    </div>

</body>

<script src="../js/contextMenu.js"></script>

</html>
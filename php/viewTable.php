<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Просмотр данных</title>
    <link rel="stylesheet" href="../css/view.css">
</head>

<body>
    <table>
        <?php 

        require_once "stringUtils.php";
        require_once "database.php";

        $jsonInText = file_get_contents("../data/withCoords.json");
        $json = json_decode($jsonInText, true);
        $maxLength = max(array_map('StringUtils::GetValueLengthByKey', $json));

        foreach ($json as $index=>$item) { ?>
        <tr class="row" style="background-color: #<?php echo $index % 2 ? 'dadada' : 'efefef'?>">
            <td class="address" style="width: <?php echo $maxLength * 7?>px">
                <?php echo str_replace(",", "", $item["name"]) ?>
            </td>
            <td class="medDiv" style="width: 100px;">
                <?php echo $item["medDivision"] ?>
            </td>
            <td class="peopleCount" style="width: 20px;">
                <?php echo $item["peopleCount"] ?>
            </td>
        </tr>
        <?php } ?>
    </table>
</body>

</html>
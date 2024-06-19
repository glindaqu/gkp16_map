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
        $jsonInText = file_get_contents("../data/withCoords.json");
        $json = json_decode($jsonInText, true);

        foreach ($json as $item) { ?>
        <tr class="row">
            <td class="address"><?php echo $item["name"] ?></td>
            <td class="medDiv"><?php echo $item["medDivision"] ?></td>
            <td class="peopleCount"><?php echo $item["peopleCount"] ?></td>
            <td class="position"><?php echo $item["position"] ?></td>
        </tr>
        <?php } ?>
    </table>
</body>

</html>
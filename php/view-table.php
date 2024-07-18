<!DOCTYPE html>
<html lang="en">

<?php 
require_once "api.php";

if (!isset($_COOKIE['login'])) die("Авторизуйтесь в системе");
?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Просмотр данных</title>
    <link rel="stylesheet" href="../css/view.css">
</head>

<body>
    <a class="back-btn" href="http://<?php echo API::SERVER_IP?>" title="К карте">
        <img src="http://<?php echo API::SERVER_IP ?>/svg/map.svg" alt="" class="image">
    </a>
    <table>
        <thead>
            <tr class="row">
                <th class="address">
                    <div class="title">Адрес</div>
                    <button class="filter-options" id="address-opt">↓</button>
                </th>
                <th class="med-div">
                    <div class="title">Терапевтическое отделение</div>
                    <!-- <button class="filter-options" id="md-opt">↓</button> -->
                </th>
                <th class="people-count">
                    <div class="title">Количество квартир</div>
                    <!-- <button class="filter-options" id="fc-opt">↓</button> -->
                </th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>

    <div class="menu hidden">
        <div class="item">Редактировать</div>
    </div>

</body>

<script src="../js/components/admin/table-view-filters.js" type="module"></script>
<script src="../js/components/admin/context-menu.js" type="module"></script>
<script src="../js/pages/admin.js" type="module"></script>

</html>
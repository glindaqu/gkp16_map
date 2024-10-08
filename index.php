<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Карта</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
        crossorigin=""></script>
    <script src="https://unpkg.com/leaflet.markercluster@1.3.0/dist/leaflet.markercluster.js"></script>
    <link rel="stylesheet" href="css/style.css" />
</head>

<?php
require_once "php/api.php";
?>

<body>
    <div class="group-selection hidden"></div>
    <div id="map"></div>
    <a class="profile" title="Админ-панель" href="http://<?php echo API::SERVER_IP ?>/php/login.php">
        <img src="svg/avatar.svg" alt="" class="image">
    </a>
    <div class="legend">
        <div class="legend-row" id="lr1">
            <div class="legend-item" style="background-color: #ff2e39"></div> 
            <div class="legend-item-text">ТО №1 (домов <?php echo API::GetHousesCountByMD(1) ?>)</div>
            <img class="legend-item triangle" id="t1" src="svg/triangle.svg">
        </div>
        <div class="legend-row" id="lr2">
            <div class="legend-item" style="background-color: #3f48cc"></div> 
            <div class="legend-item-text">ТО №2 (домов <?php echo API::GetHousesCountByMD(2) ?>)</div>
            <img class="legend-item triangle" id="t2" src="svg/triangle.svg">
        </div>
        <div class="legend-row" id="lr3">
            <div class="legend-item" style="background-color: #000000"></div> 
            <div class="legend-item-text">ТО №3 (домов <?php echo API::GetHousesCountByMD(3) ?>)</div>
            <img class="legend-item triangle" id="t3" src="svg/triangle.svg">
        </div>
        <div class="legend-row" id="lr4">
            <div class="legend-item" style="background-color: #5d874e"></div> 
            <div class="legend-item-text">ТО №4 (домов <?php echo API::GetHousesCountByMD(4) ?>)</div>
            <img class="legend-item triangle" id="t4" src="svg/triangle.svg">
        </div>
        <div class="legend-row" id="lr5">
            <div class="legend-item" style="background-color: #6d436e"></div> 
            <div class="legend-item-text">ТО №5 (домов <?php echo API::GetHousesCountByMD(5) ?>)</div>
            <img class="legend-item triangle" id="t5" src="svg/triangle.svg">
        </div>
    </div>
    <div class="region-info">
        <ul class="region-info-body">

        </ul>
    </div>
    <div class="side-content">
        <div class="tab-control">
            <div id="info-control" class="selected tab-control-item">Поиск</div>
            <div id="stat-control" class="tab-control-item">Статистика</div>
        </div>
        <div class="side-content-container" id="info">
            <div class="info-panel">
                <div class="placeholder search">
                    <div class="label">Поиск</div>
                    <div class="address-input">
                        <input type="text" class="search-by-address" placeholder="Введите адрес">
                        <div class="addresses-items">

                        </div>
                    </div>
                </div>
                <div class="placeholders">
                    <div class="placeholder">
                        <div class="label">Адрес</div>
                        <div class="address">NULL</div>
                    </div>
                    <div class="placeholder">
                        <div class="label">Терапевтическое отделение</div>
                        <div class="medical-division">NULL</div>
                    </div>
                    <div class="placeholder">
                        <div class="label">Количество квартир</div>
                        <div class="people-count">NULL</div>
                    </div>
                    <div class="placeholder">
                        <div class="label">Участок</div>
                        <div class="region">NULL</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="side-content-container hidden" id="stat">
            <div class="total">
                <div class="total-selected">
                    <div class="total-selected-title">Выбрано домов:</div>
                    <div class="total-selected-data">0</div>
                </div>
                <div class="total-selected">
                    <div class="total-selected-title">Количество квартир:</div>
                    <div class="total-selected-data">0</div>
                </div>
                <div class="total-selected">
                    <div class="total-selected-title">Площадь области:</div>
                    <div class="total-selected-data">0</div>
                </div>
                <div class="total-selected">
                    <div class="total-selected-title">Количество населения:</div>
                    <div class="total-selected-data">0</div>
                </div>
                <div class="total-selected">
                    <div class="total-selected-title">Плотность населения:</div>
                    <div class="total-selected-data">0</div>
                </div>
            </div>
        </div>
        <div class="filters">
            <div class="label">Фильтры</div>
            <div class="filter-placeholder" title="Исключить/Включить ТО №1">
                <label for="f1" class="non-selectable">Терапевтическое отделение №1</label>
                <input id="f1" class="filter-item" type="checkbox" checked="true">
            </div>
            <div class="filter-placeholder" title="Исключить/Включить ТО №2">
                <label for="f2" class="non-selectable">Терапевтическое отделение №2</label>
                <input id="f2" class="filter-item" type="checkbox" checked="true">
            </div>
            <div class="filter-placeholder" title="Исключить/Включить ТО №2">
                <label for="f3" class="non-selectable">Терапевтическое отделение №3</label>
                <input id="f3" class="filter-item" type="checkbox" checked="true">
            </div>
            <div class="filter-placeholder" title="Исключить/Включить ТО №4">
                <label for="f4" class="non-selectable">Терапевтическое отделение №4</label>
                <input id="f4" class="filter-item" type="checkbox" checked="true">
            </div>
            <div class="filter-placeholder" title="Исключить/Включить ТО №5">
                <label for="f5" class="non-selectable">Терапевтическое отделение №5</label>
                <input id="f5" class="filter-item" type="checkbox" checked="true">
            </div>
        </div>
    </div>

    <script src="js/animejs/lib/anime.js"></script>
    <script src="js/pages/index.js" type="module"></script>
    <script src="js/components/index/selection.js" type="module"></script>
    <script src="js/components/index/index-filters.js" type="module"></script>
    <script src="js/components/index/input.js" type="module"></script>
    <script src="js/components/index/region-panel.js" type="module"></script>
</body>

</html>
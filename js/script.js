const address = document.querySelector(".address");
const medDiv = document.querySelector(".medical-division");
const peopleCount = document.querySelector(".people-count");
const avatar = document.querySelector(".profile");
const DEFAULT_TILE_PROVIDER = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

document.addEventListener("DOMContentLoaded", async () => {
    await fetch("../data/addresses.json")
        .then(response => response.json())
        .then(async items => {
            const apiKey = "409e7a2c-bae5-4f26-98ca-40a7cc3e4df4";
            let coordinates = [];
            for (let i = 1000; i < 2000; i++) {
                await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=Новосибирск+${items[i].name.replaceAll(",", "+")}&format=json`)
                    .then(async response => response.json())
                    .then(async json => {
                        coordinates.push({ "pos": json.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos });
                        console.log(json);
                    });
            }
            console.log(coordinates);
        })
});

let map = null;

const checkboxes = [
    document.getElementById("f1"),
    document.getElementById("f2"),
    document.getElementById("f3"),
    document.getElementById("f4"),
    document.getElementById("f5"),
    document.getElementById("f6")
];

const updateSidePanelData = feature => {
    address.innerHTML = feature.name.replaceAll(",", "").trim();
    medDiv.innerHTML = "№" + feature.medDivision.trim().split(" ")[0];
    peopleCount.innerHTML = feature.peopleCount;
};

const getFiltersValues = () => {
    let res = [];
    checkboxes.forEach(el => { res.push(el.checked) });
    return res;
};

const refreshMapWithAssignData = () => {
    if (!map) return;
    map.__refreshMap(document.querySelector(".search-by-address").value, getFiltersValues(), feature => { updateSidePanelData(feature) });
};

document.addEventListener("DOMContentLoaded", async () => {
    map = new MapManager([54.98356, 82.88706], 14, DEFAULT_TILE_PROVIDER);
    fetch("../data/withCoords.json")
        .then(response => response.json())
        .then(json => map.__drawGeoJson(json, true, () => { refreshMapWithAssignData() }));

    checkboxes.forEach(el => { el.addEventListener("change", () => { refreshMapWithAssignData() }) });
    avatar.addEventListener("click", () => { window.location.replace("http://leafletmap:81/php/login.php") });
});

document.querySelector(".search-by-address").addEventListener("input", () => { refreshMapWithAssignData(); });
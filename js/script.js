const address = document.querySelector(".address");
const medDiv = document.querySelector(".medical-division");
const peopleCount = document.querySelector(".people-count");
const DEFAULT_TILE_PROVIDER = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

let map = null;

const checkboxes = [
    document.getElementById("f1"),
    document.getElementById("f2"),
    document.getElementById("f3"),
    document.getElementById("f4"),
    document.getElementById("f5")
];

const updateSidePanelData = feature => {
    address.innerHTML = feature.actualName.replaceAll(",", "").trim();
    medDiv.innerHTML = "№" + feature.medicalDivision.trim().split(" ")[0];
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
    fetch("../php/tools/getAddresses.php")
        .then(response => response.json())
        .then(json => map.__drawGeoJson(json, true, () => { refreshMapWithAssignData() }));

    checkboxes.forEach(el => { el.addEventListener("change", () => { refreshMapWithAssignData() }) });
});

document.querySelector(".search-by-address").addEventListener("input", () => { refreshMapWithAssignData(); });
const address = document.querySelector(".address");
const medDiv = document.querySelector(".medical-division");
const peopleCount = document.querySelector(".people-count");
const dropdownItemsContainer = document.querySelector(".addresses-items");
const addressInput = document.querySelector(".search-by-address");

const DEFAULT_TILE_PROVIDER = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

let map = null;
let json = null;

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

const displayDropdown = () => {
    dropdownItemsContainer.innerHTML = "";
    if (addressInput.value == "") return;
    let filtered = json.filter(el => el.actualName.toLowerCase().includes(addressInput.value));
    for (let i = 0; i < 5 && filtered[i]; i++) 
        dropdownItemsContainer.innerHTML += `<div class="item" la="${filtered[i].latitude}" lo="${filtered[i].longitude}">${filtered[i].actualName}<div>`;
    document.querySelectorAll(".item").forEach(el => el.addEventListener("click", e => {
        map.map.flyTo([e.target.attributes.lo.nodeValue, e.target.attributes.la.nodeValue], 18);
    }));
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
        .then(j => {
            map.__drawGeoJson(j, true, () => { refreshMapWithAssignData() });
            json = j;
        });
    checkboxes.forEach(el => { el.addEventListener("change", () => { refreshMapWithAssignData(); }) });
    addressInput.addEventListener("input", () => { refreshMapWithAssignData(); displayDropdown(); });
});
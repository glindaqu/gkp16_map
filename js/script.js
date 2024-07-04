import { mapManager } from "./map.js";

const address = document.querySelector(".address");
const medDiv = document.querySelector(".medical-division");
const peopleCount = document.querySelector(".people-count");
const dropdownItemsContainer = document.querySelector(".addresses-items");
const addressInput = document.querySelector(".search-by-address");
const totalSelected = document.querySelectorAll(".total-selected-data")[0];
const totalArea = document.querySelectorAll(".total-selected-data")[2];
const totalPeopleCount = document.querySelectorAll(".total-selected-data")[1];
const populationDensity = document.querySelectorAll(".total-selected-data")[3];
const infoPanel = document.getElementById("info");
const statPanel = document.getElementById("stat");
const statControl = document.getElementById("stat-control");
const infoControl = document.getElementById("info-control");

let json = null;

const checkboxes = [
    document.getElementById("f1"),
    document.getElementById("f2"),
    document.getElementById("f3"),
    document.getElementById("f4"),
    document.getElementById("f5")
];

const enableInfo = () => {
    console.log("aboba");
    infoPanel.classList.remove("hidden");
    statPanel.classList.add("hidden");
    statControl.classList.remove("selected");
    infoControl.classList.add("selected");
};

const enableStat = () => {
    infoPanel.classList.add("hidden");
    statPanel.classList.remove("hidden");
    statControl.classList.add("selected");
    infoControl.classList.remove("selected");
};

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
        mapManager.map.flyTo([e.target.attributes.lo.nodeValue, e.target.attributes.la.nodeValue], 18);
    }));
};

const getFiltersValues = () => {
    let res = [];
    checkboxes.forEach(el => { res.push(el.checked) });
    return res;
};

const refreshMapWithAssignData = () => {
    enableInfo();
    mapManager.__refreshMap(document.querySelector(".search-by-address").value, getFiltersValues(), feature => { updateSidePanelData(feature); });
};

export const filterJsonWithSelection = (startLatlng, endLatlng) => {
    enableStat();
    let peopleAreaCount = 0;
    let addresses = json.filter(el => {
        return el.latitude >= endLatlng.lat &&
            el.latitude <= startLatlng.lat &&
            el.longitude >= startLatlng.lng &&
            el.longitude <= endLatlng.lng
    });
    for (let i in addresses) peopleAreaCount += parseInt(addresses[i].peopleCount);
    let t = area(startLatlng.lat, endLatlng.lat, startLatlng.lng, endLatlng.lng) / 1e+6;
    totalSelected.innerHTML = addresses.length;
    totalPeopleCount.innerHTML = peopleAreaCount;
    totalArea.innerHTML = t.toFixed(2) + " км²";
    populationDensity.innerHTML = (peopleAreaCount / t).toFixed(2) + " чел./км²";
};

document.addEventListener("DOMContentLoaded", async () => {
    await fetch(`http://${SERVER_IP}/php/tools/getAddresses.php`)
        .then(response => response.json())
        .then(j => json = j);
    refreshMapWithAssignData();
    checkboxes.forEach(el => { el.addEventListener("change", () => { refreshMapWithAssignData(); }) });
    addressInput.addEventListener("input", () => { refreshMapWithAssignData(); displayDropdown(); });
    document.getElementById("info-control").addEventListener("click", () => enableInfo());
    document.getElementById("stat-control").addEventListener("click", () => enableStat());
});
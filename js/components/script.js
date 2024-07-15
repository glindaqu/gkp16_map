import { mapManager } from "../core/Map.js";
const address = document.querySelector(".address");
const medDiv = document.querySelector(".medical-division");
const flatCount = document.querySelector(".people-count");
const dropdownItemsContainer = document.querySelector(".addresses-items");
const addressInput = document.querySelector(".search-by-address");
const totalSelected = document.querySelectorAll(".total-selected-data")[0];
const totalArea = document.querySelectorAll(".total-selected-data")[2];
const totalflatCount = document.querySelectorAll(".total-selected-data")[1];
const totalPeopleCount = document.querySelectorAll(".total-selected-data")[3];
const populationDensity = document.querySelectorAll(".total-selected-data")[4];
const infoPanel = document.getElementById("info");
const statPanel = document.getElementById("stat");
const statControl = document.getElementById("stat-control");
const infoControl = document.getElementById("info-control");
const region = document.querySelector(".region");

let json = null;

const checkboxes = [
    document.getElementById("f1"),
    document.getElementById("f2"),
    document.getElementById("f3"),
    document.getElementById("f4"),
    document.getElementById("f5")
];

const enableInfo = () => {
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
    address.innerHTML = `${feature.Prefix} ${feature.Street} ${feature.HouseNumber}`;
    medDiv.innerHTML = "№" + feature.MedicalDivision;
    flatCount.innerHTML = feature.FlatCount;
    region.innerHTML = "№" + feature.Region;
};

const displayDropdown = () => {
    dropdownItemsContainer.innerHTML = "";
    if (addressInput.value == "") return;
    let filtered = json.filter(el => (el.Street + el.HouseNumber).toLowerCase().includes(addressInput.value));
    for (let i = 0; i < 3 && filtered[i]; i++)
        dropdownItemsContainer.innerHTML += `<div class="item" la="${filtered[i].Latitude}" lo="${filtered[i].Longitude}">
                                            ${filtered[i].Prefix + " " + filtered[i].Street + " " + filtered[i].HouseNumber}
                                            <div>`;
    document.querySelectorAll(".item").forEach(el => el.addEventListener("click", e => {
        mapManager.map.flyTo([e.target.attributes.la.nodeValue, e.target.attributes.lo.nodeValue], 18);
    }));
};

const getFiltersValues = () => {
    let res = [];
    checkboxes.forEach(el => { res.push(el.checked) });
    return res;
};

const refreshMapWithAssignData = () => {
    mapManager.__refreshMap(document.querySelector(".search-by-address").value, getFiltersValues(), feature => { updateSidePanelData(feature); enableInfo(); });
};

export const filterJsonWithSelection = (startLatlng, endLatlng) => {
    enableStat();
    let filters = getFiltersValues();
    let flatAreaCount = 0;
    let addresses = json.filter(el => {
        return el.Latitude >= endLatlng.lat &&
            el.Latitude <= startLatlng.lat &&
            el.Longitude >= startLatlng.lng &&
            el.Longitude <= endLatlng.lng &&
            filters[el.MedicalDivision - 1]
    });
    for (let i in addresses) flatAreaCount += parseInt(addresses[i].FlatCount);
    let t = area(startLatlng.lat, endLatlng.lat, startLatlng.lng, endLatlng.lng) * 1e-6;
    totalSelected.innerHTML = addresses.length;
    totalflatCount.innerHTML = flatAreaCount;
    totalArea.innerHTML = t.toFixed(2) + " км²";
    totalPeopleCount.innerHTML = flatAreaCount * 2 + " чел."
    populationDensity.innerHTML = (flatAreaCount / t).toFixed(2) + " чел./км²";
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
import { mapManager } from "./map.js";

const address = document.querySelector(".address");
const medDiv = document.querySelector(".medical-division");
const peopleCount = document.querySelector(".people-count");
const dropdownItemsContainer = document.querySelector(".addresses-items");
const addressInput = document.querySelector(".search-by-address");

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
        mapManager.map.flyTo([e.target.attributes.lo.nodeValue, e.target.attributes.la.nodeValue], 18);
    }));
};

const getFiltersValues = () => {
    let res = [];
    checkboxes.forEach(el => { res.push(el.checked) });
    return res;
};

const refreshMapWithAssignData = () => {
    mapManager.__refreshMap(document.querySelector(".search-by-address").value, getFiltersValues(), feature => { updateSidePanelData(feature) });
};

export const filterJsonWithSelection = (startLatlng, endLatlng) => {
    console.log(json.filter(el => 
        el.latitude >= endLatlng.lat &&
        el.latitude <= startLatlng.lat &&
        el.longitude >= startLatlng.lng &&
        el.longitude <= endLatlng.lng
    ));
};

document.addEventListener("DOMContentLoaded", async () => {
    fetch(`http://${SERVER_IP}/php/tools/getAddresses.php`)
        .then(response => response.json())
        .then(j => {
            mapManager.__drawGeoJson(j, true, () => { refreshMapWithAssignData() });
            json = j;
        });
    checkboxes.forEach(el => { el.addEventListener("change", () => { refreshMapWithAssignData(); }) });
    addressInput.addEventListener("input", () => { refreshMapWithAssignData(); displayDropdown(); });
});
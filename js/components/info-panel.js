const container = document.getElementById("info");
const control = document.getElementById("info-control");

export const enableInfo = () => {
    container.classList.remove("hidden");
    control.classList.add("selected");
};

export const disableInfo = () => {
    container.classList.add("hidden");
    control.classList.remove("selected");
};

export const updateInfoPanel = feature => {
    document.querySelector(".address").innerHTML = `${feature.Prefix} ${feature.Street} ${feature.HouseNumber}`;
    document.querySelector(".medical-division").innerHTML = "№" + feature.MedicalDivision;
    document.querySelector(".people-count").innerHTML = feature.FlatCount;
    document.querySelector(".region").innerHTML = "№" + feature.Region;
};
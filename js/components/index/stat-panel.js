const container = document.getElementById("stat");
const control = document.getElementById("stat-control");

const totalSelected = document.querySelectorAll(".total-selected-data")[0];
const totalflatCount = document.querySelectorAll(".total-selected-data")[1];
const totalArea = document.querySelectorAll(".total-selected-data")[2];
const totalPeopleCount = document.querySelectorAll(".total-selected-data")[3];
const populationDensity = document.querySelectorAll(".total-selected-data")[4];

export const enableStat = () => {
    container.classList.remove("hidden");
    control.classList.add("selected");
};

export const disableStat = () => {
    container.classList.add("hidden");
    control.classList.remove("selected");
};

/**
 * 
 * @param {Number} t total selected rows
 * @param {Number} fc flat count
 * @param {Number} ta total area selected square
 */
export const updateStatPanel = (t, fc, ta) => {
    totalSelected.innerHTML = t;
    totalflatCount.innerHTML = fc;
    totalArea.innerHTML = ta.toFixed(2) + " км²";
    totalPeopleCount.innerHTML = fc * 2 + " чел."
    populationDensity.innerHTML = (fc * 2 / ta).toFixed(2) + " чел./км²";
};

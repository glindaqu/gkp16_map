const container = document.getElementById("stat");
const control = document.getElementById("stat-control");

export const enableStat = () => {
    container.classList.remove("hidden");
    control.classList.add("selected");
};

export const disableStat = () => {
    container.classList.add("hidden");
    control.classList.remove("selected");
};
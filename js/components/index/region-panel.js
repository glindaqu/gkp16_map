import { SERVER_IP } from "../../config.js";

const container = document.querySelector(".region-info-body");

let json = null;

document.addEventListener("DOMContentLoaded", async () => {
    await fetch("http://" + SERVER_IP + "/php/tools/getRegions.php")
        .then(response => response.json())
        .then(body => json = body);
});

const draw = md => {
    container.innerHTML = `ТО №${md}`;
    let filtered = json.filter(el => el.md == md);
    let pc = 0;
    if (filtered.length == 0) {
        container.innerHTML += "<br><div>Нет данных</div><br>";
        return;
    }
    for (let i in filtered) {
        container.innerHTML += `<div>Участок №${filtered[i].id}, ${filtered[i].peopleCount}</div>`;
        pc += parseInt(filtered[i].peopleCount);
    }
    container.innerHTML += `Всего: ${pc}`;
};

export const enableRegionPanel = md => { draw(md); document.querySelector('.region-info').style.display = 'flex' };
export const disableRegionPanel = () => { document.querySelector('.region-info').style.display = 'none' };
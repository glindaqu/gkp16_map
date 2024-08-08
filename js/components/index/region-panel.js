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
    if (filtered.length == 0) {
        container.innerHTML += "<br>Нет данных<br>";
        return;
    }
    for (let i in filtered) {
        container.innerHTML += `<div>Участок №${filtered[i].id}, ${filtered[i].peopleCount}</div>`;
    }
    container.innerHTML += `Всего: ${filtered.reduce((a, b) => {
        console.log(a, b);
        return parseInt(a.peopleCount) + parseInt(b.peopleCount); 
    })}`;
};

export const enableRegionPanel = md => { draw(md); document.querySelector('.region-info').style.display = 'flex' };
export const disableRegionPanel = () => { document.querySelector('.region-info').style.display = 'none' };
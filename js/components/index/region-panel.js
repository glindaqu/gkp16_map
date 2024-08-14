import { SERVER_IP } from "../../config.js";
import { app } from "../../main.js";

const container = document.querySelector(".region-info-body");
export let currentRegion = null;
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
        container.innerHTML += `<div class="region-list-item">Участок №${filtered[i].id}, ${filtered[i].peopleCount}</div>`;
        pc += parseInt(filtered[i].peopleCount);
    }
    container.innerHTML += `Всего: ${pc}`;
    document.querySelectorAll(".region-list-item").forEach(el => {
        el.addEventListener("click", e => {
            currentRegion = el.innerText.split('№')[1].split(',')[0];
            app.filterView(item => item.Region == currentRegion);
        });
    });
};

export const enableRegionPanel = md => { draw(md); document.querySelector('.region-info').style.display = 'flex' };
export const disableRegionPanel = () => { 
    document.querySelector('.region-info').style.display = 'none'; 
    app.filterView(i => true); 
    currentRegion = null; 
};
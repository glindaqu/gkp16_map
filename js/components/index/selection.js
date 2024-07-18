import { mapManager } from "../../core/Map.js";
import { app } from "../../main.js";
import { updateStatPanel, enableStat } from "./stat-panel.js";
import { getFiltersValues } from "./index-filters.js";
import { area } from "../../helpers/functions.js";
import { disableInfo } from "./info-panel.js";

const border = document.querySelector(".group-selection");
let display = false;

let startLatlng = null, endLatlng = null;

let x1 = 0, y1 = 0, x2 = 0, y2 = 0;

const redraw = () => {
    let x3 = Math.min(x1, x2);
    let x4 = Math.max(x1, x2);
    let y3 = Math.min(y1, y2);
    let y4 = Math.max(y1, y2);
    border.style.left = x3 + 'px';
    border.style.top = y3 + 'px';
    border.style.width = x4 - x3 + 'px';
    border.style.height = y4 - y3 + 'px';
};

document.addEventListener("DOMContentLoaded", () => {
    mapManager.map.on("mousedown", e => {
        startLatlng = e.latlng;
    });
    mapManager.map.on("mousemove", e => {
        endLatlng = e.latlng;
    });
});

document.addEventListener("contextmenu", e => e.preventDefault());

document.addEventListener("mousedown", e => {
    if (e.button != 2) return;
    display = true;
    x1 = e.clientX;
    y1 = e.clientY;
    mapManager.map.dragging.disable();
});

document.addEventListener("mouseup", e => {
    if (e.button != 2 || display == false) return;
    display = false;
    x1 = 0, x2 = 0;
    y1 = 0, y2 = 0;
    border.style.height = 0;
    border.style.width = 0;
    border.classList.add("hidden");
    mapManager.map.dragging.enable();
    let st = {
        lat: Math.max(startLatlng.lat, endLatlng.lat),
        lng: Math.min(startLatlng.lng, endLatlng.lng)
    };
    let ed = {
        lat: Math.min(startLatlng.lat, endLatlng.lat),
        lng: Math.max(startLatlng.lng, endLatlng.lng)
    };
    disableInfo();
    enableStat();
    filterJsonWithSelection(st, ed);
});

document.addEventListener("mousemove", e => {
    if (!display) return;
    border.classList.remove("hidden");
    x2 = e.clientX;
    y2 = e.clientY;
    redraw();
});

const isInCoordsRange = (el, s, e) => {
    return el.Latitude >= e.lat &&
        el.Latitude <= s.lat &&
        el.Longitude >= s.lng &&
        el.Longitude <= e.lng;
};

const filterJsonWithSelection = (startLatlng, endLatlng) => {
    let filters = getFiltersValues();
    let flatAreaCount = 0;
    let addresses = app.dataSource.filter(el => {
        return isInCoordsRange(el, startLatlng, endLatlng) && filters[el.MedicalDivision - 1];
    });
    for (let i in addresses) {
        flatAreaCount += parseInt(addresses[i].FlatCount);
    }
    let sq = area(startLatlng.lat, endLatlng.lat, startLatlng.lng, endLatlng.lng) * 1e-6;
    updateStatPanel(addresses.length, flatAreaCount, sq);
};


import { mapManager } from "./map.js";
import { filterJsonWithSelection } from "./script.js";

const border = document.querySelector(".group-selection");
let display = false;

let startLatlng = null, endLatlng = null;

let x1 = 0, y1 = 0, x2 = 0, y2 = 0;

const reCalc = () => {
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
    mapManager.map.on("mouseup", e => {
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
    if (e.button != 2) return;
    display = false;
    x1 = 0, x2 = 0;
    y1 = 0, y2 = 0;
    border.style.height = 0;
    border.style.width = 0;
    border.classList.add("hidden");
    mapManager.map.dragging.enable();
    // endLatlng = mapManager.map.layerPointToLatLng({x: e.x, y: e.y});
    let st = {lat: Math.max(startLatlng.lat, endLatlng.lat), lng: Math.min(startLatlng.lng, endLatlng.lng)};
    let ed = {lat: Math.min(startLatlng.lat, endLatlng.lat), lng: Math.max(startLatlng.lng, endLatlng.lng)};
    filterJsonWithSelection(st, ed);
});

document.addEventListener("mousemove", e => {
    if (!display) return;
    border.classList.remove("hidden");
    x2 = e.clientX;
    y2 = e.clientY;
    reCalc();
});

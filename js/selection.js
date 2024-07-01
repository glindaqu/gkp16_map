import { mapManager } from "./map.js";
import { filterJsonWithSelection } from "./script.js";

const border = document.querySelector(".group-selection");
let x = 0, y = 0;

let startLatlng = null, endLatlng = null;

document.addEventListener("DOMContentLoaded", () => {
    mapManager.map.on("mousedown", e => {
        startLatlng = e.latlng;
    });
    mapManager.map.on("mouseup", e => {
        endLatlng = e.latlng;
        filterJsonWithSelection(startLatlng, endLatlng);
    });
});

document.addEventListener("contextmenu", e => e.preventDefault());

document.addEventListener("mousedown", e => {
    if (e.button != 2) return;
    border.classList.remove("hidden");
    x = e.clientX;
    y = e.clientY;
    border.style.left = x + "px";
    border.style.top = y + "px";
    mapManager.map.dragging.disable();
});

document.addEventListener("mouseup", e => {
    if (e.button != 2) return;
    border.classList.add("hidden");
    mapManager.map.dragging.enable();
});

document.addEventListener("mousemove", e => {
    // if (e.button != 2) return;
    let minX = Math.min(x, e.clientX);
    let maxX = Math.max(x, e.clientX);
    let minY = Math.min(y, e.clientY);
    let maxY = Math.max(y, e.clientY);
    border.style.width = maxX - minX + "px";
    border.style.height = maxY - minY + "px";
});

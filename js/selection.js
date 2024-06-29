import { mapManager } from "./map.js";

const border = document.querySelector(".group-selection");
let x = 0, y = 0;

document.addEventListener("contextmenu", e => e.preventDefault());

document.addEventListener("mousedown", e => {
    assert(e.button == 2);
    border.classList.remove("hidden");
    x = e.clientX;
    y = e.clientY;
    border.style.left = x + "px";
    border.style.top = y + "px";
    mapManager.map.dragging.disable();
});

document.addEventListener("mouseup", () => {
    border.classList.add("hidden");
    mapManager.map.dragging.enable();
});

document.addEventListener("mousemove", e => {
    let minX = Math.min(x, e.clientX);
    let maxX = Math.max(x, e.clientX);
    let minY = Math.min(y, e.clientY);
    let maxY = Math.max(y, e.clientY);
    border.style.width = maxX - minX + "px";
    border.style.height = maxY - minY + "px";
});

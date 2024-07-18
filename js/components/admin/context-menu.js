import { SERVER_IP } from "../../config.js";

const menu = document.querySelector(".menu");

/**
 * however, request to api send from here, we need to
 * know which one of rows api should send as response
 * 
 * thats id of last clicked row in UI
 */
let lastClickedId = 0;

document.addEventListener('contextmenu', e => {
    /**
     * if user clicks to any other element, we need to abort
     * function execution 
     */
    if (e.target.tagName != 'TR' && e.target.tagName != 'TD') {
        menu.classList.add("hidden");
        return;
    }
    /**
     * draw context menu on click coords
     */
    drawContextMenu({ x: e.clientX, y: e.clientY });
    /**
     * changing last id to current clicked
     */
    lastClickedId = e.target.id;
    /**
     * aborting default handler
     */
    e.preventDefault();
});

/**
 * if user clicks on element, which out of table - hidding 
 * custom context menu
 */
document.addEventListener('click', () => { menu.classList.add("hidden"); })

/**
 * Function draws custom menu on specified coords
 * 
 * @param {Point} pos Coords of click
 * 
 * @returns void
 * 
 * @author glindaqu 
 */
const drawContextMenu = pos => {
    /**
     * make context menu appears
     */
    menu.classList.remove("hidden");
    /**
     * editiong css and set menu position in click coords
     */
    menu.setAttribute("style", `top: ${pos.y}px; left: ${pos.x}px;`);
};

/**
 * adding click listener to every table item 
 */
document.querySelector(".item").addEventListener("click", () => {
    /**
     * on click changing location to detail page and requesting 
     * row by specified id
     */
    window.location.replace(`http://${SERVER_IP}/php/edit.php?id=${lastClickedId}`)
});
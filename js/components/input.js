import { app } from "../main.js";
import { mapManager } from "../core/Map.js";

const dropdownItemsContainer = document.querySelector(".addresses-items");
const input = document.querySelector(".search-by-address");

const displayDropdown = () => {
    dropdownItemsContainer.innerHTML = "";
    if (input.value == "") {
        return;
    }
    let filtered = app.dataSource.filter(el => (el.Street + el.HouseNumber)
        .toLowerCase()
        .includes(input.value.toLowerCase())
    );
    for (let i = 0; i < 3 && filtered[i]; i++) {
        dropdownItemsContainer.innerHTML += `<div class="item" la="${filtered[i].Latitude}" lo="${filtered[i].Longitude}">
                                                ${filtered[i].Prefix + " " + filtered[i].Street + " " + filtered[i].HouseNumber}
                                            <div>`;
    }
    document.querySelectorAll(".item").forEach(el => el.addEventListener("click", e => {
        mapManager.map.flyTo([e.target.attributes.la.nodeValue, e.target.attributes.lo.nodeValue], 18);
    }));
};

document.addEventListener("click", () => {
    input.addEventListener("input", () => {
        app.updateView(el =>
            (el.Street + el.HouseNumber + el.Prefix)
                .toLowerCase()
                .includes(input.value.toLowerCase())
        );
        displayDropdown();
    });
});
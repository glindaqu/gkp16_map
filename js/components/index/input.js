import { app } from "../../main.js";
import { mapManager } from "../../core/Map.js";
import { updateInfoPanel } from "./info-panel.js";

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
        let dto = filtered[i];
        let element = document.createElement('div');
        element.classList.add('item');
        element.innerHTML = `${dto.Prefix} ${dto.Street}  ${dto.HouseNumber}`;
        element.addEventListener('click', () => {
            mapManager.map.flyTo([dto.Latitude, dto.Longitude], 18);
            updateInfoPanel(dto);
        });
        dropdownItemsContainer.appendChild(element);
        
    }
};

document.addEventListener("click", () => {
    input.addEventListener("input", () => {
        app.filterView(el =>
            (el.Street + el.HouseNumber + el.Prefix)
                .toLowerCase()
                .includes(input.value.toLowerCase())
        );
        displayDropdown();
    });
}); 

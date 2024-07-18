import { SERVER_IP } from "../../config.js";
import { app } from "../../main.js";

const ARR_UP = "↑";
const ARR_DOWN = "↓";

class FilterOption {

    #container = null;
    #filterDirection = true;

    constructor(container) {
        this.#container = container;
    }

    get target() {
        return this.#container
    }

    get direction() {
        return this.#filterDirection;
    }

    swap() {
        this.#filterDirection = !this.#filterDirection;
        this.#container.innerHTML = this.#filterDirection ? ARR_DOWN : ARR_UP;
    }

}

document.addEventListener("DOMContentLoaded", () => {
    const addressOption = new FilterOption(document.getElementById("address-opt"));
    addressOption.target.addEventListener("click", () => {
        app.sortView((a, b) => a.Street.localeCompare(b.Street), addressOption.direction);
        addressOption.swap();
    })
});

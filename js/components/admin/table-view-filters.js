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
    // const mdOption = new FilterOption(document.getElementById("md-opt"));
    // const fcOption = new FilterOption(document.getElementById("fc-opt"));

    const sortFunction = (a, b) => {
        /** implement */
    };

    addressOption.target.addEventListener("click", () => {
        app.sortView((a, b) => addressOption.direction ? b.Street.localeCompare(a.Street) : a.Street.localeCompare(b.Street));
        addressOption.swap();
    });

    // mdOption.target.addEventListener("click", () => {
    //     app.sortView((a, b) => mdOption.direction ? b.MedicalDivision > a.MedicalDivision : a.MedicalDivision > b.MedicalDivision);
    //     mdOption.swap();
    // });

    // fcOption.target.addEventListener("click", () => {
    //     app.sortView((a, b) => sortFunction(a, b));
    //     fcOption.swap();
    // });
});

import { mapManager } from "../core/Map.js";
import { View } from "../core/View.js";

export class IndexView extends View {

    #container = null;

    constructor(parent = null) {
        super();
        if (parent != null) {
            this.attachContainer(parent);
        }
    }

    attachContainer(container) {
        this.#container = container;
    }

    render(mapData) {
        if (this.#container == null) {
            throw new Error("Parent container is not attached");
        }
        mapManager.refreshMap(mapData);
    }
}
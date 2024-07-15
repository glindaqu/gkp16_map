import { mapManager } from "../core/Map.js";

class IndexView extends View {

    #container = null;

    attachContainer(container) {
        this.#container = container;
    }

    render(mapData) {
        if (this.#container == null) {
            throw new Error("Parent container is not attached");
        }
        mapManager.__refreshMap('', true, {});
    }
}
import { View } from "../core/View.js";
import { mapManager } from "../core/Map.js";

export class IndexView extends View {

    render(mapData) {
        super.render();
        mapManager.refreshMap(mapData);
    }

}
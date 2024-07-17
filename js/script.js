import { mapManager } from "./core/Map.js";
import { app } from "./main.js";
import { IndexView } from "./views/view-index.js";
import { SERVER_IP } from "./config.js";
import { enableInfo, disableInfo, updateInfoPanel } from "./components/info-panel.js";
import { enableStat, disableStat } from "./components/stat-panel.js";

const map = document.getElementById("map");

document.addEventListener("DOMContentLoaded", async () => {
    mapManager.markerClickCallback = el => {
        disableStat();
        enableInfo();
        updateInfoPanel(el);
    };

    await app.init(`http://${SERVER_IP}/php/tools/getAddresses.php`)
        .then(() => {
            app.setView(new IndexView(map));
            app.run();
        })
        .catch(() => {
            console.log("Data source is not avialable");
        });

    document.getElementById("info-control").addEventListener("click", () => {
        disableStat();
        enableInfo();
    });
    document.getElementById("stat-control").addEventListener("click", () => {
        disableInfo();
        enableStat();
    });
});
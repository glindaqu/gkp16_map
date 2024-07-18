import { mapManager } from "../core/Map.js";
import { app } from "../main.js";
import { IndexView } from "../views/view-index.js";
import { SERVER_IP } from "../config.js";
import { enableInfo, disableInfo, updateInfoPanel } from "../components/index/info-panel.js";
import { enableStat, disableStat } from "../components/index/stat-panel.js";

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
        .catch(e => {
            console.log("Failure when attempting to load data. Error: " + e);
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
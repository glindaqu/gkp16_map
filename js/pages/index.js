import { mapManager } from "../core/Map.js";
import { app } from "../main.js";
import { IndexView } from "../views/view-index.js";
import { SERVER_IP } from "../config.js";
import { enableInfo, disableInfo, updateInfoPanel } from "../components/index/info-panel.js";
import { enableStat, disableStat } from "../components/index/stat-panel.js";
import { disableRegionPanel, enableRegionPanel } from "../components/index/region-panel.js";

const map = document.getElementById("map");
let reverse = [true, true, true, true, true];

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

    let legendItems = document.querySelectorAll(".legend-row");
    for (let i = 0; i < legendItems.length; i++) {
        let el = legendItems[i];
        el.addEventListener("click", () => {
            closeAll(i);
            reverse[i] = !reverse[i];
            rotate(`#t${parseInt(i) + 1}`, reverse[i]);
            ease(reverse[i]);
            if (!reverse[i]) 
                enableRegionPanel(parseInt(i) + 1);
            else 
                disableRegionPanel();
        });
    }

    document.querySelector(".region-info").addEventListener("click", () => { disableRegionPanel(); closeAll(-1); });
});

const rotate = (selector, reverse) => {
    anime({
        targets: selector,
        rotate: reverse ? 0 : 180,
        loop: false,
        autoplay: false,
        easing: 'easeOutSine',
        duration: 500
    }).play();
};

const ease = (reverse) => {
    anime({
        targets: '.region-info',
        opacity: !reverse ? [0, 1] : [1, 0.0000001],
        loop: false,
        autoplay: false,
        easing: 'easeOutSine',
        duration: 500
    }).play();
};

const closeAll = (index) => {
    for (let i = 0; i < 5; i++) {
        if (i == index) continue;
        reverse[i] = true;
        rotate(`#t${i + 1}`, reverse[i]);
    }
};
import { app } from "../main.js";
import { AdminView } from "../views/view-admin-table.js";
import { SERVER_IP } from "../config.js";

document.addEventListener("DOMContentLoaded", async () => {
    await app.init(`http://${SERVER_IP}/php/tools/getAddresses.php`)
        .then(() => {
            app.setView(new AdminView(document.querySelector("tbody")));
            app.run();
        })
        .catch(e => {
            console.log("Failure when attempting to load data. Error: " + e);
        });
});
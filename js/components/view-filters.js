import { SERVER_IP } from "./config.js";
import { app } from "../main.js";

const ad = document.getElementById("address-opt");

ad.addEventListener("click", () => {
    let postfix = window.location.toString().split('?')[1].split('=');
    window.location.replace(`http://${SERVER_IP}/php/viewTable.php?
        ad=${postfix[1] == '' ? 'desc' : ''}
    `);
});
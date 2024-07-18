import { app } from "../../main.js";

let filtersList = [];

document.addEventListener("DOMContentLoaded", () => {
    filtersList = [
        document.getElementById("f1"),
        document.getElementById("f2"),
        document.getElementById("f3"),
        document.getElementById("f4"),
        document.getElementById("f5")
    ];

    filtersList.forEach(el => {
        el.addEventListener("change", () => {
            app.filterView(el =>
                getFiltersValues()[el.MedicalDivision - 1])
        })
    }); ``
});

export const getFiltersValues = () => {
    let res = [];
    filtersList.forEach(el => { res.push(el.checked) });
    return res;
};
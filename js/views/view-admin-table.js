import { View } from "../core/View.js";

export class AdminView extends View {

    async render(tableData) {
        super.render();
        let inner = '';
        for (let i in tableData) {
            const el = tableData[i];
            inner += `
                <tr class="row" id="${el.id}" style="background-color: #${i % 2 ? 'dadada' : 'efefef'}">
                    <td class="address" id="${el.id}">
                        ${el.Prefix} ${el.Street} ${el.HouseNumber}
                    </td>
                    <td class="med-div" id="${el.id}">
                        ${el.MedicalDivision}
                    </td>
                    <td class="people-count" id="${el.id}">
                        ${el.FlatCount}
                    </td>
                </tr>`;
        }
        this._container.innerHTML = inner;
    }

}
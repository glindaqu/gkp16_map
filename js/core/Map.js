import { SERVER_IP } from "../config.js";
import { isInArea, Point, getMDColor, hex2rgb } from "../helpers/functions.js";

const DEFAULT_TILE_PROVIDER = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

class MapManager {

    #map = null;
    #layers = [];
    #markerClickCallback = () => { };

    constructor(center, zoom, tileProvider) {
        this.#map = new L.Map('map', {
            center: new L.LatLng(...center),
            zoom: zoom,
            layers: new L.TileLayer(tileProvider),
        });
    }

    static get JSONFile() {
        return `http://${SERVER_IP}/php/tools/getAddresses.php`;
    }

    get map() {
        return this.#map;
    }

    /**
     * @param {() => void} callback
     */
    set markerClickCallback(callback) {
        if (!(callback instanceof Function)) {
            throw new Error("Callback must be a function");
        }
        this.#markerClickCallback = callback;
    }

    refreshMap(newMapData) {
        this.#deleteAllMarkers();
        this.#drawGeoJson(newMapData);
    }

    #deleteAllMarkers() {
        for (let i = 0; i < this.#layers.length; i++) {
            this.#map.removeLayer(this.#layers[i]);
        }
    }

    #drawGeoJson(addresses) {
        let medDivList = [[], [], [], [], []];

        for (let index in addresses) {
            const el = addresses[index];
            if (!isInArea(Point(el.Latitude, el.Longitude))) {
                continue;
            }
            medDivList[el.MedicalDivision - 1].push(this.#createCustomMarker(el, this.#markerClickCallback));
        }
        for (let i = 0; i < medDivList.length; i++) {
            let mDGroup = L.markerClusterGroup({
                iconCreateFunction: cluster => {
                    const bgcolor = getMDColor(i);
                    const rgbBgColor = hex2rgb(bgcolor);
                    return L.divIcon({
                        html: `
                            <div class="rounded-markers-count-0" style="
                                background-color: #${bgcolor} !important; 
                                box-shadow: 
                                    0 0 0 5px rgba(${rgbBgColor.r}, ${rgbBgColor.g}, ${rgbBgColor.b}, 0.4),
                                    0 0 2px 10px rgba(${rgbBgColor.r}, ${rgbBgColor.g}, ${rgbBgColor.b}, 0.3);
                                "
                            >
                                <span>${cluster.getChildCount()}</span>
                            </div
                        `,
                        className: 'custom-marker-cluster',
                        iconSize: L.point(50, 50, true),
                    });
                }
            });
            for (let j = 0; j < medDivList[i].length; j++) {
                medDivList[i][j].addTo(mDGroup);
            }
            mDGroup.addTo(this.#map);
            this.#layers.push(mDGroup);
        }
    };

    #createCustomMarker(model, onMarkerClick) {
        const myIcon = L.icon({
            iconUrl: `http://${SERVER_IP}/pointers/point_${model.MedicalDivision}.png`,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, 0],
        });
        return L.marker(
            new L.LatLng(model.Latitude, model.Longitude),
            {
                icon: myIcon,
                title: `${model.Prefix} ${model.Street} ${model.HouseNumber}`
            }
        ).on("click", () => { onMarkerClick(model) });
    }
}

export let mapManager = new MapManager([54.98356, 82.88706], 14, DEFAULT_TILE_PROVIDER);

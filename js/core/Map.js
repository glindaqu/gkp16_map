import { SERVER_IP } from "../config.js";
import { isInArea, Point, getMDColor, hex2rgb } from "../helpers/functions.js";

/**
 * default map tiles provider. By default - open street map
 */
const DEFAULT_TILE_PROVIDER = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

/**
 * Class represents map layer of application. 
 * 
 * @constructor Takes three arguments: center, zoom, tileProvider
 *  ** Center - float array, physical coordinates of center location on map
 *  ** Zoom - float number, initial map zooming
 *  ** tileProvider - link to tile server, open street map by default 
 * 
 * @member JSONFile Link to geoJson file for render it on map
 * 
 * @member map Accessor for leaflet map object
 * 
 * @member markerClickCallback Sets function for call everytime
 * when user clicks on marker on the map. Empty by default. If provided object not
 * an instance of function - throws new exception
 * 
 * 
 */
class MapManager {

    // private field, leaflet map object
    #map = null;
    // array of map layers. each medical division placed on isolated one
    #layers = [];
    // global marker click call back
    #markerClickCallback = () => { };

    constructor(center, zoom, tileProvider) {
        // ll (leaflet) map initialazing
        this.#map = new L.Map('map', {
            center: new L.LatLng(...center),
            zoom: zoom,
            layers: new L.TileLayer(tileProvider),
        });
    }

    // getter for json file with addresses. minds only path to it
    static get JSONFile() {
        return `http://${SERVER_IP}/php/tools/getAddresses.php`;
    }

    // getter for ll map
    get map() {
        return this.#map;
    }

    /**
     * Method sets click callback for every marker on the map
     * Throws exception, if provided object (callback) is not
     * instance of function class
     * 
     * @param {() => void} callback
     */
    set markerClickCallback(callback) {
        // if provided callback is not instance of
        // a function class, throw new exception
        if (!(callback instanceof Function)) {
            throw new Error("Callback must be a function");
        }
        // in other case setting callback in class variable
        this.#markerClickCallback = callback;
    }

    /**
     * Method removes all old markers and calls draw geoJson method
     * 
     * @param {Array} newMapData parsed geoJson object
     */
    refreshMap(newMapData) {
        this.#deleteAllMarkers();
        this.#drawGeoJson(newMapData);
    }

    /**
     * Methods removes all markers on the map
     */
    #deleteAllMarkers() {
        // just removing all layers with markers in it
        for (let i = 0; i < this.#layers.length; i++) {
            this.#map.removeLayer(this.#layers[i]);
        }
    }

    /**
     * Method fills map with markers by provided array with addresses data
     * 
     * @param {Array} addresses Array of addresses for markers lables creation
     */
    #drawGeoJson(addresses) {
        // pre initialize array for divide by medical division
        let medDivList = [[], [], [], [], []];
        // if address coordinates out of province range - skip it
        // else pushing address in asociated with it index 
        for (let index in addresses) {
            const el = addresses[index];
            if (!isInArea(Point(el.Latitude, el.Longitude))) {
                continue;
            }
            medDivList[el.MedicalDivision - 1].push(this.#createCustomMarker(el, this.#markerClickCallback));
        }
        for (let i = 0; i < medDivList.length; i++) {
            // for formed md divide creationg isolated cluster, for it zoom and 
            // remove overlap posibillity
            let mDGroup = L.markerClusterGroup({
                iconCreateFunction: cluster => {
                    const bgcolor = getMDColor(i);
                    const rgbBgColor = hex2rgb(bgcolor);
                    return L.divIcon({
                        // here we need an custom marker color (agreed with md)
                        // and destruct it into r g b pallete
                        // marker text is hosting by it inner markers
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
            // adding cluster group to layer
            this.#layers.push(mDGroup);
        }
    };

    /**
     * Method creates and returns new leaflet marker by provided data
     * 
     * @param {Array} model Object represents address
     *  
     * @param {Function} onMarkerClick marker click callback function
     *  
     * @returns Leaflet marker object 
     */
    #createCustomMarker(model, onMarkerClick) {
        const myIcon = L.icon({
            iconUrl: `http://${SERVER_IP}/pointers/point_${model.MedicalDivision}.png`,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, 0],
        });
        return L.marker(new L.LatLng(model.Latitude, model.Longitude), {
            icon: myIcon,
            title: `${model.Prefix} ${model.Street} ${model.HouseNumber}`
        }).on("click", () => { onMarkerClick(model) });
    }
}

export const mapManager = new MapManager([54.98356, 82.88706], 14, DEFAULT_TILE_PROVIDER);

class MapManager {

    #__map = null;
    #__layers = [];

    constructor(center, zoom, tileProvider) {
        this.#__map = new L.Map('map', {
            center: new L.LatLng(...center),
            zoom: zoom,
            layers: new L.TileLayer(tileProvider)
        });
    }

    static get JSON_FILE() {
        return "../php/tools/getAddresses.php";
    }

    get map() {
        return this.#__map;
    }

    __refreshMap(pattern, filters, onMarkerClick) {
        this.__deleteAllMarkers();
        fetch(MapManager.JSON_FILE)
            .then(response => response.json())
            .then(addresses => this.__drawGeoJson(addresses.filter(i => i.actualName.toLowerCase().includes(pattern)), filters, onMarkerClick));
    }

    __deleteAllMarkers() {
        for (let i = 0; i < this.#__layers.length; i++) this.#__map.removeLayer(this.#__layers[i]);
    }

    __drawGeoJson(addresses, filters, onMarkerClick) {
        let groupedByMD = [[], [], [], [], []];
        for (let i = 0; i < addresses.length; i++) {
            let element = addresses[i];
            let md = element.medicalDivision.trim().split(" ")[0];
            if ((typeof (filters) != "boolean" && !filters[md - 1]) || !isInArea(point(element.longitude, element.latitude))) continue;
            groupedByMD[md - 1].push(this.#__createCustomMarker(element, [element.longitude, element.latitude], md, onMarkerClick));
        }
        for (let i = 0; i < groupedByMD.length; i++) {
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
            for (let j = 0; j < groupedByMD[i].length; j++) groupedByMD[i][j].addTo(mDGroup);
            mDGroup.addTo(this.#__map);
            this.#__layers.push(mDGroup);
        }
    };

    #__createCustomMarker(feature, latlng, colorIndex, onMarkerClick) {
        const myIcon = L.icon({
            iconUrl: `../pointers/point_${colorIndex}.png`,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, 0],
        });
        return L.marker(new L.LatLng(...latlng), { icon: myIcon, title: feature.actualName.replaceAll(",", "") })
            .on("click", () => { onMarkerClick(feature) });
    }
}
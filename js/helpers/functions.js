// destrucs hex color into rgb pallete
export const hex2rgb = hex => {
    // if hex got in short-form, adding 0 to it starts
    hex = hex.length == 6 ? hex : '0' + hex;
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return { r, g, b };
}

// function generates random dark color
export const getDarkColor = () => {
    let color = '';
    for (let i = 0; i < 6; i++) {
        color += Math.floor(Math.random() * 10);
    }
    return color;
}

// function storing each md cluster color
export const getMDColor = index => {
    switch (index) {
        case 0: return "ff2e39";
        case 1: return "3f48cc";
        case 2: return "000000";
        case 3: return "5d874e";
        case 4: return "6d436e";
    }
};

// computing area of given rect by it physical coordinates
export const area = (lat1, lat2, lng1, lng2, R) => {
    R = R || 6_371_228;
    var k = Math.PI / 180;
    return k * R * R
        * Math.abs(Math.sin(lat1 * k) - Math.sin(lat2 * k))
        * Math.abs(lng1 - lng2);
}

// point object 
export const Point = (x, y) => ({ x, y });

const minX = 54;
const maxX = 56;
const minY = 82;
const maxY = 83;

// function checks if the given point is entire of province
export const isInArea = E => E.x <= maxX && E.x >= minX && E.y >= minY && E.y <= maxY;

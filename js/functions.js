const hex2rgb = hex => {
    hex = hex.length == 6 ? hex : '0' + hex;
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return { r, g, b };
}

const getDarkColor = () => {
    let color = '';
    for (let i = 0; i < 6; i++) {
        color += Math.floor(Math.random() * 10);
    }
    return color;
}

const getMDColor = index => {
    switch (index) {
        case 0: return "ff2e39";
        case 1: return "3f48cc";
        case 2: return "000000";
        case 3: return "5d874e";
        case 4: return "6d436e";
    }
};

const point = (x, y) => ({ x, y });

const minX = 54;
const maxX = 56;
const minY = 82;
const maxY = 83;

const isInArea = E => E.x <= maxX && E.x >= minX && E.y > minY && E.y <= maxY;

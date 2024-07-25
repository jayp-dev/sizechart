import { useState, useCallback } from 'react';

const hslToRgb = (h, s, l) => {
    s /= 100;
    l /= 100;

    // Adjust brightness for dark mode
    l = l < 0.5 ? l * 1.2 : l * 0.8; // Make colors slightly lighter in dark mode

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }

    return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255),
    };
};

const rgbToHex = (r, g, b) => {
    const toHex = (value) => {
        const hex = value.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// Custom Hook
const useColorConverter = (initialColor) => {
    const [color, setColor] = useState(initialColor);

    const getColorValueHex = useCallback(() => {
        const { hue, saturation, brightness } = color;
        const adjustedBrightness = brightness < 0.5 ? brightness * 1.2 : brightness * 0.8;
        const { r, g, b } = hslToRgb(hue, saturation * 100, adjustedBrightness * 100);
        return rgbToHex(r, g, b);
    }, [color]);

    return [color, setColor, getColorValueHex];
};

export default useColorConverter;

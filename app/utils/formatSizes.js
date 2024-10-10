
// Function to format sizes and apply rounding
export async function formatSizes(data, decimalPlaces, roundingValue) {
    const formattedData = await Promise.all(data.map(async item => {
        const newItem = { ...item }; // Create a new object to avoid mutating the original
        await Promise.all(Object.keys(newItem).map(async key => {
            if (key !== 'Size') {
                const value = newItem[key];
                if (await isNumeric(value)) {
                    newItem[key] = await roundToNearest(value, roundingValue, decimalPlaces);
                } else if (value.includes('-')) {
                    newItem[key] = await formatRange(value, decimalPlaces, roundingValue);
                }
            }
        }));
        return newItem;
    }));
    return formattedData;
}

// Function to format range values (e.g., "34-36")
export async function formatRange(value, decimalPlaces, roundingValue) {
    const [start, end] = value.split('-').map(v => parseFloat(v.trim()));
    const formattedStart = await roundToNearest(start, roundingValue, decimalPlaces);
    const formattedEnd = await roundToNearest(end, roundingValue, decimalPlaces);
    return `${formattedStart} - ${formattedEnd}`;
}

// Function to round to the nearest specified value
export async function roundToNearest(value, roundingValue, decimalPlaces) {
    const roundedValue = Math.round(value / roundingValue) * roundingValue;
    return roundedValue.toFixed(decimalPlaces);
}


// Utility function to check if a value is numeric
export async function isNumeric(value) {
    return !isNaN(value) && !isNaN(parseFloat(value));
}

// Utility function to round numbers based on the specified mode
export const roundNumber = (value, step, precision) => {
    return (Math.round(value / step) * step).toFixed(precision);
};

// Utility function to convert a range from inches to centimeters
const convertRange = (range, toCm, step, precision) => {
    if (!range.includes('-')) return range; // Return if it's not a range
    const [min, max] = range.split('-').map(value => {
        let num = parseFloat(value);
        if (toCm) {
            num = num * 2.54; // Convert to cm
        } else {
            num = num / 2.54; // Convert to inches
        }
        return roundNumber(num, step, precision);
    });
    return `${min.toFixed(precision)}-${max.toFixed(precision)}`;
};

// Utility function to convert the entire chart data
export const convertSizeChart = (sizeChart, toCm, step, precision) => {
    return sizeChart.map((item) => {
        const convertedItem = {};
        for (const key in item) {
            // Apply conversion to only numeric range values
            convertedItem[key] = (key !== "") ? convertRange(item[key], toCm, step, precision) : item[key];
        }
        return convertedItem;
    });
};


export async function convertRowData(row, currentUnit, decimalPrecision) {

    const newRow = {};
    for (const key in row) {
        if (row.hasOwnProperty(key)) {
            newRow[key] = await convertValue(row[key], currentUnit, decimalPrecision);
        }
    }
    return newRow;
}


export async function convertValue(value, currentUnit, decimalPrecision) {
    if (typeof value === 'string' && value.includes('-')) {
        const [minValue, maxValue] = await Promise.all(
            value.split('-').map(async (num) => convertNumericValue(num.trim(), currentUnit, decimalPrecision))
        );
        return `${minValue}-${maxValue}`;
    }
    return await convertNumericValue(value, currentUnit, decimalPrecision);
}


export async function convertNumericValue(value, currentUnit, decimalPrecision) {
    let numericValue = parseFloat(value);
    if (isNaN(numericValue)) return value; // Keep original if not a number
    return currentUnit === 'inch'
        ? (numericValue / 2.54).toFixed(decimalPrecision)
        : (numericValue * 2.54).toFixed(decimalPrecision);
}


export function convertColor(color) {
    // console.log(color)
    const { hue, saturation, brightness, alpha } = color;
    return hslToCss(hue, saturation, brightness, alpha !== undefined ? alpha : 1); // Use default alpha if not provided
}

function hslToCss(hue, saturation, brightness, alpha = 1) {
    const lightness = brightness * 100; // convert to percentage
    return `hsla(${hue}, ${saturation * 100}%, ${lightness}%, ${alpha})`;
}
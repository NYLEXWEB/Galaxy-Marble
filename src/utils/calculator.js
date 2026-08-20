/**
 * Area Requirement Calculator Helpers
 */

/**
 * Calculate rectangle area (Length x Width)
 */
export const calculateArea = (lengthFt, widthFt) => {
    const l = parseFloat(lengthFt) || 0;
    const w = parseFloat(widthFt) || 0;
    return Math.round((l * w) * 100) / 100;
};

/**
 * Calculate staircase area (Step Tread Length x Step Width x Number of Steps)
 */
export const calculateStaircaseArea = (treadLengthFt, treadWidthFt, numberOfSteps) => {
    const l = parseFloat(treadLengthFt) || 0;
    const w = parseFloat(treadWidthFt) || 0;
    const steps = parseInt(numberOfSteps, 10) || 0;
    return Math.round((l * w * steps) * 100) / 100;
};

/**
 * Apply percentage buffer for cutting/wastage margin
 */
export const calculateWithWastage = (baseArea, wastagePercent = 5) => {
    const area = parseFloat(baseArea) || 0;
    const margin = (area * wastagePercent) / 100;
    return Math.ceil(area + margin);
};

export const CALCULATOR_DISCLAIMER = "Approximate calculation only. Final on-site measurement should be confirmed before purchase.";

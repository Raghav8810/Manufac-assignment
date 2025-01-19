import { AgricultureData } from '../config/AgriculterData';

/**
 * Utility function to calculate the average yield for a given array of crops.
 * 
 * @param {AgricultureData[]} crops - An array of agriculture data objects.
 * @returns {number} The average yield of the crops.
 */
export const calculateAverageYield = (crops: AgricultureData[]): number => {
    // Calculate the total yield by summing up the yield of each crop
    const totalYield = crops.reduce((sum, crop) => sum + crop["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"], 0);
    // Return the average yield by dividing total yield by the number of crops
    return totalYield / crops.length;
};


/**
 * Utility function to find the crops with maximum and minimum production for a given array of crops.
 * 
 * @param {AgricultureData[]} crops - An array of agriculture data objects.
 * @returns {{ maxCrop: string; minCrop: string }} An object containing the names of the max and min crops.
 */
export const getMaxMinCropByProduction = (crops: AgricultureData[]): { maxCrop: string; minCrop: string } => {
    // Find the crop with the maximum production using reduce
    const maxCrop = crops.reduce((max, current) =>
        current["Crop Production (UOM:t(Tonnes))"] > max["Crop Production (UOM:t(Tonnes))"] ? current : max
    );
    //Find the crop with the minimum production using reduce
    const minCrop = crops.reduce((min, current) =>
        current["Crop Production (UOM:t(Tonnes))"] < min["Crop Production (UOM:t(Tonnes))"] ? current : min
    );
    // Return the names of the crops with maximum and minimum production
    return {
        maxCrop: maxCrop["Crop Name"],
        minCrop: minCrop["Crop Name"]
    };
};


/**
 * Function to calculate average yields for each crop from the provided data.
 * 
 * @param {AgricultureData[]} data - An array of agriculture data objects.
 * @returns {cropYields[]} An array of objects containing crop names and their average yields.
 */
export const getCropYields = (data: AgricultureData[]): cropYields[] => {
    return data.reduce((acc: cropYields[], item) => {
        // Check if the crop already exists in the accumulator
        const existingCrop = acc.find(crop => crop.crop === item["Crop Name"]);
        if (existingCrop) {
            // If it exists, update the average yield
            existingCrop.averageYield = (existingCrop.averageYield + item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) / 2;
        } else {
            // If it doesn't exist, add a new crop entry
            acc.push({
                crop: item["Crop Name"],
                averageYield: item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]
            });
        }
        return acc;
    }, []);
};



/**
 * Function to calculate yearly data, including the crops with maximum and minimum production.
 * 
 * @param {AgricultureData[]} data - An array of agriculture data objects.
 * @returns {YearlyData[]} An array of objects containing year, max crop, and min crop.
 */
export const getYearlyData = (data: AgricultureData[]): YearlyData[] => {
    return data.reduce((acc: YearlyData[], item) => {
        const year = item.Year; // Extract the year from the current item
        // Check if the year already exists in the accumulator
        const existingYear = acc.find(y => y.year === year);


        if (!existingYear) {
            // If the year does not exist, filter crops for that year
            const cropsInYear = data.filter(d => d.Year === year);
            // Get the max and min crops for the filtered crops
            const { maxCrop, minCrop } = getMaxMinCropByProduction(cropsInYear);
            // Push the new year data into the accumulator  
            acc.push({ year, maxCrop, minCrop });
        }
        return acc;
    }, []);
};

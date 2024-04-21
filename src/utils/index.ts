import { WineDataGammaType, WineDataType } from '../types';

/**
 * @description function used to calculate gamma value
 * @param data Wine Data object
 * @returns gamma value
 */
const calculateGamma = (data: WineDataType) => {
  const { Ash, Hue, Magnesium } = data;
  const gamma = (Ash * Hue) / Magnesium;
  return gamma;
};

/**
 * @description function used to app gamma property in wine data
 * @param wineData wine data array
 * @returns wine data with gama property
 */
const getGammaData = (wineData: WineDataType[]) => {
  const gammaData: WineDataGammaType[] = [];
  wineData.forEach((data) => {
    const formattedData: WineDataGammaType = {
      ...data,
      Gamma: calculateGamma(data),
    };
    gammaData.push(formattedData);
  });
  return gammaData;
};

/**
 * @description function used to divide the dataset based on alcohol class
 * @param wineData wine data array
 * @returns data grouped based on classes
 */
const getClassWiseData = (wineData: WineDataType[]) => {
  const class1Data = wineData
    .filter((item) => item.Alcohol === 1)
    .sort((a, b) => a.Flavanoids - b.Flavanoids);
  const class2Data = wineData
    .filter((item) => item.Alcohol === 2)
    .sort((a, b) => a.Flavanoids - b.Flavanoids);
  const class3Data = wineData
    .filter((item) => item.Alcohol === 3)
    .sort((a, b) => a.Flavanoids - b.Flavanoids);
  return { class1Data, class2Data, class3Data };
};

/**
 * @description function used to divide the dataset based on alcohol class with gamma property
 * @param wineData wine data array with gamma property
 * @returns data grouped based on classes
 */
const getGammaClassWiseData = (wineData: WineDataGammaType[]) => {
  const class1Data = wineData
    .filter((item) => item.Alcohol === 1)
    .sort((a, b) => a.Gamma - b.Gamma);
  const class2Data = wineData
    .filter((item) => item.Alcohol === 2)
    .sort((a, b) => a.Gamma - b.Gamma);
  const class3Data = wineData
    .filter((item) => item.Alcohol === 3)
    .sort((a, b) => a.Gamma - b.Gamma);
  return { class1Data, class2Data, class3Data };
};

/**
 * @description function used to calculate mean
 * @param wineData  wine data array
 * @param wineGammaData wine data array with gamma property
 * @param mode stat type to calculate
 * @returns mean
 */
const calculateMean = (
  wineData: WineDataType[] | null,
  wineGammaData: WineDataGammaType[] | null,
  mode: 'typeA' | 'typeB'
) => {
  let sum = 0;
  let total = 0;
  if (wineData?.length && mode === 'typeA') {
    wineData.forEach((item) => {
      sum =
        sum +
        (typeof item.Flavanoids === 'string'
          ? parseFloat(item.Flavanoids)
          : item.Flavanoids);

      total++;
    });
  } else if (wineGammaData?.length && mode === 'typeB') {
    wineGammaData.forEach((item) => {
      sum =
        sum +
        (typeof item.Gamma === 'string' ? parseFloat(item.Gamma) : item.Gamma);

      total++;
    });
  }
  return sum / total;
};

/**
 * @description function used to calculate median
 * @param wineData  wine data array
 * @param wineGammaData wine data array with gamma property
 * @param mode stat type to calculate
 * @returns median
 */
const calculateMedian = (
  wineData: WineDataType[] | null,
  wineGammaData: WineDataGammaType[] | null,
  mode: 'typeA' | 'typeB'
) => {
  if (mode === 'typeA' && wineData?.length) {
    const middleIndex = Math.floor(wineData?.length / 2);
    if (wineData.length % 2 === 0) {
      return (
        (wineData[middleIndex - 1]?.Flavanoids +
          wineData[middleIndex]?.Flavanoids) /
        2
      );
    } else {
      return wineData[middleIndex]?.Flavanoids;
    }
  } else if (mode === 'typeB' && wineGammaData?.length) {
    const middleIndex = Math.floor(wineGammaData.length / 2);
    if (wineGammaData?.length % 2 === 0) {
      return (
        (wineGammaData[middleIndex - 1]?.Gamma +
          wineGammaData[middleIndex]?.Gamma) /
        2
      );
    } else {
      return wineGammaData[middleIndex]?.Gamma;
    }
  }
};

/**
 * @description function used to calculate mode
 * @param wineData  wine data array
 * @param wineGammaData wine data array with gamma property
 * @param mode stat type to calculate
 * @returns mode
 */
const calculateMode = (
  wineData: WineDataType[] | null,
  wineGammaData: WineDataGammaType[] | null,
  mode: 'typeA' | 'typeB'
) => {
  const frequencyMap = new Map();
  if (mode === 'typeA' && wineData?.length) {
    wineData.forEach((num) => {
      if (frequencyMap.get(num.Flavanoids)) {
        frequencyMap.set(num.Flavanoids, frequencyMap.get(num.Flavanoids) + 1);
      } else {
        frequencyMap.set(num.Flavanoids, 1);
      }
    });
  } else if (mode === 'typeB' && wineGammaData?.length) {
    wineGammaData.forEach((num) => {
      if (frequencyMap.get(num.Gamma)) {
        frequencyMap.set(num.Gamma, frequencyMap.get(num.Gamma) + 1);
      } else {
        frequencyMap.set(num.Gamma, 1);
      }
    });
  }
  let modeValue = '';
  let maxFrequency = 0;
  frequencyMap.forEach((_, key) => {
    if (frequencyMap.get(key) > maxFrequency) {
      modeValue = key;
      maxFrequency = frequencyMap.get(key);
    }
  });
  return parseFloat(modeValue);
};

/**
 * @description function used to mean value of the data set
 * @param wineData wine data array
 * @param mode stat type to calculate
 * @returns mean values
 */
export const getMean = (wineData: WineDataType[], mode: 'typeA' | 'typeB') => {
  if (mode === 'typeA') {
    const { class1Data, class2Data, class3Data } = getClassWiseData(wineData);
    const mean = {
      meanClass1: calculateMean(class1Data, null, 'typeA').toFixed(3),
      meanClass2: calculateMean(class2Data, null, 'typeA').toFixed(3),
      meanClass3: calculateMean(class3Data, null, 'typeA').toFixed(3),
    };
    return mean;
  } else {
    const { class1Data, class2Data, class3Data } = getGammaClassWiseData(
      getGammaData(wineData)
    );
    const mean = {
      meanClass1: calculateMean(null, class1Data, 'typeB').toFixed(3),
      meanClass2: calculateMean(null, class2Data, 'typeB').toFixed(3),
      meanClass3: calculateMean(null, class3Data, 'typeB').toFixed(3),
    };
    return mean;
  }
};

/**
 * @description function used to median value of the data set
 * @param wineData wine data array
 * @param mode stat type to calculate
 * @returns median values
 */
export const getMedian = (
  wineData: WineDataType[],
  mode: 'typeA' | 'typeB'
) => {
  if (mode === 'typeA') {
    const { class1Data, class2Data, class3Data } = getClassWiseData(wineData);
    const median = {
      medianClass1: calculateMedian(class1Data, null, 'typeA')?.toFixed(3),
      medianClass2: calculateMedian(class2Data, null, 'typeA')?.toFixed(3),
      medianClass3: calculateMedian(class3Data, null, 'typeA')?.toFixed(3),
    };
    return median;
  } else {
    const { class1Data, class2Data, class3Data } = getGammaClassWiseData(
      getGammaData(wineData)
    );
    const median = {
      medianClass1: calculateMedian(null, class1Data, 'typeB')?.toFixed(3),
      medianClass2: calculateMedian(null, class2Data, 'typeB')?.toFixed(3),
      medianClass3: calculateMedian(null, class3Data, 'typeB')?.toFixed(3),
    };
    return median;
  }
};

/**
 * @description function used to mode value of the data set
 * @param wineData wine data array
 * @param mode stat type to calculate
 * @returns mode values
 */
export const getMode = (wineData: WineDataType[], mode: 'typeA' | 'typeB') => {
  if (mode === 'typeA') {
    const { class1Data, class2Data, class3Data } = getClassWiseData(wineData);
    const mode = {
      modeClass1: calculateMode(class1Data, null, 'typeA').toFixed(3),
      modeClass2: calculateMode(class2Data, null, 'typeA').toFixed(3),
      modeClass3: calculateMode(class3Data, null, 'typeA').toFixed(3),
    };
    return mode;
  } else {
    const { class1Data, class2Data, class3Data } = getGammaClassWiseData(
      getGammaData(wineData)
    );
    const mode = {
      modeClass1: calculateMode(null, class1Data, 'typeB').toFixed(3),
      modeClass2: calculateMode(null, class2Data, 'typeB').toFixed(3),
      modeClass3: calculateMode(null, class3Data, 'typeB').toFixed(3),
    };
    return mode;
  }
};

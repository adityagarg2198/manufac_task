import { useEffect, useState } from 'react';
import { WineDataType } from '../types';
import wineData from '../data/wineData.json';

/**
 * @description custom hook to get data set
 */
const useGetWineData = () => {
  const [formattedWineData, setFormattedWineData] = useState<WineDataType[]>(
    []
  );
  useEffect(() => {
    wineData.forEach((data) => {
      const mappedData = {
        Alcalinity_of_ash: data['Alcalinity of ash'],
        Alcohol: data.Alcohol,
        Ash: data.Ash as number,
        Color_intensity: data['Color intensity'] as number,
        Flavanoids: data.Flavanoids as number,
        Hue: data.Hue,
        Magnesium: data.Magnesium,
        Malic_Acid: data['Malic Acid'],
        Nonflavanoid_phenols: data['Nonflavanoid phenols'] as number,
        Proanthocyanins: data.Proanthocyanins,
        Total_phenols: data['Total phenols'],
        Unknown: data.Unknown,
        Value_diluted_wines: data['OD280/OD315 of diluted wines'] as number,
      };
      setFormattedWineData((prev) => {
        return [...prev, mappedData];
      });
    });
  }, []);

  return { formattedWineData };
};

export default useGetWineData;

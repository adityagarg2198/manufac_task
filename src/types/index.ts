export interface WineDataType {
  Alcohol: number;
  Malic_Acid: number;
  Ash: number;
  Alcalinity_of_ash: number;
  Magnesium: number;
  Total_phenols: number;
  Flavanoids: number;
  Nonflavanoid_phenols: number;
  Proanthocyanins: string;
  Color_intensity: number;
  Hue: number;
  Value_diluted_wines: number;
  Unknown: number;
}

export interface WineDataGammaType extends WineDataType {
  Gamma: number;
}

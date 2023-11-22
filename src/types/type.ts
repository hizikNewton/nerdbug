/* eslint-disable @typescript-eslint/no-explicit-any */
export type populationCountType ={
  year: string;
  value: string;
  sex: string;
  reliabilty: string;
}

interface dataType {
  city: string;
  country: string;
  populationCounts: Array<populationCountType>;
  weatherInfo: any;
  favourite?: boolean;
}

export interface citiesAndWeatherStateType {
  default: Array<dataType>;
  favorites: Array<dataType>;
}

export default dataType;

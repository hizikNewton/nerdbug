/* eslint-disable @typescript-eslint/no-explicit-any */
interface dataType {
  city: string;
  country: string;
  populationCounts: [
    {
      year: string;
      value: string;
      sex: string;
      reliabilty: string;
    }
  ];
  weatherInfo: any;
  favourite?:boolean
}

export interface citiesAndWeatherStateType{
  default:Array<dataType>
  favorites:Array<dataType>
}

export default dataType;

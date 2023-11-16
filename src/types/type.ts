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
  weatherInfo: object;
}

export default dataType;

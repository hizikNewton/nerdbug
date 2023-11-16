export interface dataType {
    code: string
    country:string
    populationCounts:{ 
        value:number
        year:number
    }
}

const sortByPopulation = (a: dataType, b: dataType): number => {
    return  b.populationCounts.value - a.populationCounts.value;
  };

export default sortByPopulation
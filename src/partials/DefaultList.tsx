import { useEffect, useState } from "react";
import Section from "src/components/Section";
import makeRequest from "src/utils/api";
import sortByPopulation, { dataType } from "src/utils/sort";

const DefaultList = () => {
  const [data, setData] = useState<Array<dataType>>();
  console.log(data, "datum");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: { data: Array<dataType> } = await makeRequest({
          type: "country",
          method: "post",
          url: "population/filter",
          data: `{}`,
        });
        const filteredArray = res.data.filter(
          (item) =>
            item.country.split(" ").length == 1 ||
            item.code == "USA" ||
            item.code == "COD"
        );
        const country = filteredArray.sort(sortByPopulation).slice(1, 16);
        setData(country);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return <Section></Section>;
};

export default DefaultList;

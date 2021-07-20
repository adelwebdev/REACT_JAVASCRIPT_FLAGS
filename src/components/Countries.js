import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const Countries = () => {
  const [data, setData] = useState([]);
  const [sotredData, setSortedData] = useState([]);
  const [playOnce, SetPlayOnce] = useState(true);

  useEffect(() => {
    if (playOnce) {
      axios
        .get(
          "https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag"
        )
        .then((res) => {
          setData(res.data);
          SetPlayOnce(false);
        });
    }

    const sortedCountry = () => {
      const countryObj = Object.keys(data).map((i) => data[i]);
      const sortedArray = countryObj.sort((a, b) => {
        return b.population - a.population;
      });
      console.log(sortedArray);
    };
    sortedCountry();
  }, [data]);

  return (
    <div className="countries">
      <ul className="countries-list">
        {data.map((country) => (
          <Card country={country} key={country.name} />
          // <li>{country.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Countries;

// Card est un sous-component de Countries
// données passent de Countries à Card (et non inverse) du plus haut au plus bas
// donc le fetch (axios) doit se faire dans Countries

import React from "react";

// on fait props pr vérifier ce qui a été passé avec la props (ici country) dans Card
// on peut aussi l'appeler country (à la place de props)
// console.log(props); pr loger la props, console.log(props.country.name); pr + details (de la props donc de Data "qui est en amont")
// const { country } = props; c le DESTRUCTURING, on peut écrire: const country = props.country;

const Card = (props) => {
  //   console.log(props.country.name);
  const { country } = props;
  console.log(country);

  // on fait un REGEX pr avoir le séparateur de millier (dans les nombres)
  const numberFormat = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  // on inser la REGEX, plus bas, à la place de x c'est country.population

  //là on prend se qu'on veut de la props (du tableau data dans Countries) (voir img et li en bàs)
  return (
    <li className="card">
      <img src={country.flag} alt="flag of the country" />
      <div className="data-container">
        <ul>
          <li>{country.name}</li>
          <li>{country.capital}</li>
          {/* <li>Pop: {country.population}</li> */}
          <li>Pop: {numberFormat(country.population)}</li>
        </ul>
      </div>
    </li>
  );
};

export default Card;

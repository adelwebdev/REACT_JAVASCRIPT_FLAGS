import React, { useState, useEffect } from "react";
// on a importé les HOOK; useState et UseEffect;
import axios from "axios";
import Card from "./Card";

const Countries = () => {
  // ici déclaration du HOOK de react
  // les Hook de react!!!! avec useState!!
  // data est la vatriable, setData c pr stocker; mettre en place; dans data
  const [data, setData] = useState([]);
  // on veut classer les pays par population, on crée dabord la variable sortedData (par les HOOK => useSate([]) )
  const [sortedData, setSortedData] = useState([]);
  // voila comment on fait un playOnce (pr que fetch se joue une fois)
  const [playOnce, setPlayOnce] = useState(true);

  // axios pr appelle vers les API, axios s'appelle à l'éxtérieur de Return
  // avec Get pour prendre les données de l'API
  // then: la promesse, le résultat du axios (ce que axios a apporté avec Get)

  // useEffect c pr que le axios se joue une seule fois
  // pr jouer une seule fois le fetch; on fait des IF ensuite on met setPlayOnce sur false!
  useEffect(() => {
    if (playOnce) {
      axios
        .get(
          "https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag"
        )
        .then((res) => {
          setData(res.data);
          setPlayOnce(false);
        });

      // on fait res.data car on veut que la "data" et non pas tout le get (avec axios)
      console.log(data);
      // .then((res) => console.log(res)); ici on affiche dans Console le résultat de Get
    }

    const sortedCountry = () => {
      // d'abord transformer l'array data en Objet!!! voir ci-dessous!!!!! pr la façon de faire
      const countryObj = Object.keys(data).map((i) => data[i]);
      // maintenant on peut appliquer la méthode "sort"!!
      // c du JS de base, c la façon de faire pr trier un tableau!
      const sortedArray = countryObj.sort((a, b) => {
        return b.population - a.population;
      });
      // pr prendre uniquement 30 valeurs
      sortedArray.length = 30;
      // pour passer sortedArray à sortedData
      setSortedData(sortedArray);
      // console.log(sortedArray);
    };
    sortedCountry();
    // il faut ajouter playOnce à la fin du useEffect (voir juste en-bàs)
  }, [data, playOnce]);
  // si dans les crochets (à la fin de useEffect) il y a data [data], se sera une boucle infinit, car à chaque fois que data se mets à jour, on rejoue axios et Get
  // pour régler se problème, il faut faire setPlayOnce (voir plus haut)
  // si il y a rien entres rochets (dans crochets = "call back"), axios et Get vont se jouer une seuls fois

  // pr afficher!! un array en js classique => utiliser map
  // aprés map c des () et non {} (comme dans les fct; "ex: () => {}")
  //data.map: pr "mapper"; afficher les éléments de data (ici tableau data,incrémenté avec setData)
  // country c juste un nom (faut ajouter avec map), country.name; on veut exactement "name" dans tableau "data"
  // on peut faire country.name ou directement importer le composant Card (voir Card)
  // pr passer les données à un component: utilise PROPS!!! ici la props s'appelle "country" (props de Card) on map country et on le transmet à la props "country", on transmet à Card
  // il faut une CLE unique à chaque élément qu'on map; ici key = {country.name}
  // on map sortedData (et non data) car on veut afficher notre tableau data avec les modifications
  return (
    <div className="countries">
      <ul className="countries-list">
        {sortedData.map((country) => (
          <Card country={country} key={country.name} />
          // <li>{country.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Countries;

//   const [data, setData] = useState("hello");
//   const sayGoodbye = () => {
//     setData("Goodbye");
//   };

//   <p>Countries</p>
//pour afficher le contenu de data, on met la variable entre accolades {}
//   {data}
//   <button onClick={sayGoodbye}>Dire byebye</button>

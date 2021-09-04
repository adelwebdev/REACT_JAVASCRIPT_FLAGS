import React, { useState, useEffect } from "react";
// on a importé les HOOK; useState et UseEffect;
import axios from "axios";
import Card from "./Card";

const Countries = () => {
  // ici déclaration du HOOK de react
  // les Hook de react!!!! avec useState!!
  // data est la vatriable, setData c pr stocker; mettre en place; dans var data
  const [data, setData] = useState([]);
  // on veut classer les pays par population, on crée dabord la variable sortedData (par les HOOK => useSate([]) )
  const [sortedData, setSortedData] = useState([]);
  // voila comment on fait un playOnce (pr que fetch se joue une fois)
  const [playOnce, setPlayOnce] = useState(true);
  // on veut intégrer de la recherche! pour dynamiser la recherche on fait un Range! avec une valeur stocker de base (voir en-bàs)
  const [rangeValue, setRangeValue] = useState(40);
  // création du tri avec input radio (pr les 5 continents)! pas besoin de coder 5 inputs avec 5 labels radio
  // on crée une logique une fois et on va la maper (maper le array des 5 continents et à chaque fois créer inputs et labels)
  const [selectedRadio, setSelectedRadio] = useState("");
  // on crée une var JS classique; pas besoin de faire useState à chaque fois
  const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];

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
      // pr prendre uniquement 30 valeurs => sortedArray.length = 30 ou rangeValue pour nombre dynamique
      sortedArray.length = rangeValue;
      // pour passer sortedArray à sortedData
      setSortedData(sortedArray);
      // console.log(sortedArray);
    };
    sortedCountry();
    // il faut ajouter playOnce à la fin du useEffect (voir juste en-bàs)
    // on ajoute aussi rangeValue pour que le useEffect se rejoue à chaque fois que "range" change
  }, [data, rangeValue, playOnce]);
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
  // on crée un input de type range avec pr valeur {rangeValue}; valeur de base de range
  // pr dynamiser range on fait: onChange={(e) => setRangeValue(e.target.value)}, on récupère le event e
  // on se place aprés input range pour intégrer l'input radio, on map le array radios et pr chaque élément maper; un input type radio avec son label!
  // l'input et le label sont reliés par le id; alors même en cliquant sur le label on séléctionne l'input
  // pr le radio checké c'est "checked", de base: radio === selectedRadio
  // pour changer la val de checked (radio checké); onChange={(e) => setSelectedRadio(e.target.value)} ; c comme ça qu'on fait les radio checké en react
  // pr appliquer le tri (ici juste le contient séléctionné); faut faire dans map! c la méthode Filter de JS (filtrer un tableau)
  // on filtre sortedData par country.region (par rapport à la forme de nos données) et: includes(selectedRadio)
  // avec check box on peut tout décocher mais avec radio non! (si on veut revenir à la séléction de base, c à d tout!! comme avant de cocher les radios!)
  // pr ça faut créer un button! on veut qu'il se déclanche juste que si on coche un radio et pas avant
  // on react c comme ça: {selectedRadio && <h5>Annuler recherche</h5>}; veut dire si selectedRadio sur true & "et" affiche <h5>
  // pr annuler la recherche; on met de la logique à <h5>; si on te clicke dessus: onClick
  // comme ça: <h5 onclick={() => setSelectedRadio("")}>Annuler recherche</h5>; insertion de script JS dans balise HTML

  return (
    <div className="countries">
      <div className="sort-container">
        <input
          type="range"
          name=""
          id=""
          min="1"
          max="250"
          value={rangeValue}
          onChange={(e) => setRangeValue(e.target.value)}
        />
        <ul>
          {radios.map((radio) => {
            return (
              <li key={radio}>
                <input
                  type="radio"
                  name=""
                  id={radio}
                  value={radio}
                  checked={radio === selectedRadio}
                  onChange={(e) => setSelectedRadio(e.target.value)}
                />
                <label htmlFor={radio}>{radio}</label>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="cancel">
        {selectedRadio && (
          <button onClick={() => setSelectedRadio("")}>
            Annuler recherche
          </button>
        )}
      </div>
      <ul className="countries-list">
        {sortedData
          .filter((country) => country.region.includes(selectedRadio))
          .map((country) => (
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

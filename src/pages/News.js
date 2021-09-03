import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
import axios from "axios";
import Article from "../components/Article";

// un Tred; ou file d'actulité (comme dans les Blog, pr publier du contenu)
// faut installer json server: npm i -g json-server (dans npm) pour simuler un server!
// pr faire tourner le server (le back ): json-server --w src/assets/db.json --port 3001
// on demande à jason server de watch (surveiller) le fichier qui est dans assets/db.json au port 3001
// on faisant des requetes au 3001, on communique avec le port 3001 comme avec une base de données (db) sur MySQL

const News = () => {
  // pr faire un appel vers API (ou DB ou Json) faut passer par axios (dans react)
  // creer un fct getData et faire axios.get (en dehore de return)
  // use Effect, comme fct =>, mais avec un callback [],
  // callback veut dire relance useEffect à chaque fois que la varible dans callback est appélé
  // si le callback est vide, ça veut dire: joue ce qu'il y a à l'intérieur de useEffect, ici getData[]
  const [newsData, setNewsData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("http://localhost:3001/articles")
      .then((res) => setNewsData(res.data));
  };

  // {} entre accolade veut dire: je me prépare à écrire du JS,
  // A chaque tour de boucle (map du tableau newsData), on joue le composant <Article/>
  // il faut une clé unique quand on crée un map (tjrs)!!!!! voir ci-bàs comment insérer un clé dans map
  return (
    <div className="news-container">
      <Navigation />
      <Logo />
      <h1>Ici les News</h1>
      <form action="">
        <input type="text" placeholder="Nom" />
        <textarea placeholder="Message"></textarea>
        <input type="submit" value="Envoyer" />
        <ul>
          {newsData.map((article) => (
            <Article key={article.id} />
          ))}
        </ul>
      </form>
    </div>
  );
};

export default News;

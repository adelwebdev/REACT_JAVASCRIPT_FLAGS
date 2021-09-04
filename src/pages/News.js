import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
import axios from "axios";
import Article from "../components/Article";

// un Tred; ou file d'actulité (comme dans les Blog, pr publier du contenu)
// faut installer json server: npm i -g json-server (dans npm) pour simuler un server!!!
// pr faire tourner le server (le back ): json-server --w src/assets/db.json --port 3001
// on demande à json server de watch (surveiller) le fichier qui est dans assets/db.json au port 3001
// on faisant des requetes au 3001, on communique avec le port 3001 comme avec une base de données (db) sur MySQL

const News = () => {
  // pr faire un appel vers API (ou DB ou Json) faut passer par axios (dans react) (c comme Fetch avec JS)
  // creer un fct getData et faire axios.get (en dehore de return)
  // useEffect, c comme une fct =>, mais avec un callback [],
  // callback veut dire relance useEffect à chaque fois que la varible qui est dans callback est appélé
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

  // on veut récuperer ce qui est soumis dans le form (ce qui est tapé); on crée fct handleSubmit
  // e.preventDefault(); pour que la page ne se recharge pas aprés soulission du formulaire!
  // pour envoyer des données la méthode c POST (GET c pour récuperer
  // c avec un lien que l'on communique avec notre db (ex : "http://localhost:3001/articles" )
  // date: Date.now(), pour enregistrer; sauvegarder la data au temps présent
  // avec axios.post (pour poster des nouvelles données) mais cela se fera d'abord dans db.json

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit!");
    axios.post("http://localhost:3001/articles", {
      author: "denis",
      content: "hello les gars",
      date: Date.now(),
    });
  };
  // {} entre accolade veut dire: je me prépare à écrire du JS,
  // A chaque tour de boucle (map du tableau newsData), on joue le composant <Article/>
  // il faut une clé unique quand on crée un map (tjrs)!!!!! voir ci-bàs comment insérer un clé dans map
  // attention: faut affecter {article} (variable qu'on a nommé aléatoirement pour mapper) dans une var; ici article (même nom)
  // c dans map pour changer les ordres d'apparition, faire un TRI (à faire avant le map), méthode Sort; sort((a, b) => b.date - a.date) "du plus récent au plus ancien"
  // Partie: Create; càd Poster un msg, lors de soumission du formulaire; faire onSubmit dans balise form
  // onSubmit={(e) => handleSubmit(e)} / ceci equivaut à faire un addEventLister (sur event "submit") pour la balise "form" et on se récupe l'évenement e !!
  return (
    <div className="news-container">
      <Navigation />
      <Logo />
      <h1>Ici les News</h1>

      <form onSubmit={(e) => handleSubmit(e)} action="">
        <input type="text" placeholder="Nom" />
        <textarea placeholder="Message"></textarea>
        <input type="submit" value="Envoyer" />
        <ul>
          {newsData
            .sort((a, b) => b.date - a.date)
            .map((article) => (
              <Article key={article.id} article={article} />
            ))}
        </ul>
      </form>
    </div>
  );
};

export default News;

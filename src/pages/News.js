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
  // pr afficher ce qui est tapé en dynamique (pas seulement dans la db) faut d'abord créer une var  et stocker dedans ce qui est écrit dans les inputs
  // on met des guillemets "" pr dire; on attend une var string, on peut changer la var author que on passant par setAuthor ou setContent (pr le contenu du msg de l'author)
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  // on fait un booléen pr nous dire si on n'est dans l'erreur ou pas (pr mettre sécurité dans input)
  const [error, setError] = useState(false);

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

    // cette partie c pr l'envoi du formulaire
    // mettre logique de If/Else pour insertion d'une sécu sur input
    // si on veut erreur (ex ici < 20 cara) on met setError(true); on peut montrer dynamiquement à l'auteur (dans balise: textarea)
    if (content.length < 20) {
      setError(true);
    } else {
      axios
        .post("http://localhost:3001/articles", {
          // pr mettre de la data en brute (non dynamique; ou data qui ne change pas)
          //   author: "denis",
          //   content: "hello les gars",
          //   date: Date.now(),
          // pr mettre data en dynamique!
          author: author,
          content: content,
          date: Date.now(),
          // en JS on peut aussi écrire juste: author, à la place de : author: author,
          // pour remettre à zéro une fois le poste fait, on fait un "then". voir en-bàs
          // les var (par HOOK) s'affectent dans des (parenthèses) () et non avec = "égal"
          // là on a juste initialisé author et content à zéro! mais le contenu des inputs; avec react on fait comme suite:
          //  .then(() => {setAuthor(""); setContent("");}); attention! aprés then... ce sont des ; et non des , comme aprés axios et les Objets en JS.
          // mais faut tjrs actualiser la page pr voir des nouveaux postes! pr faire sans (en 100% dynamique) il faut rejouer getData() (dans le then.  "voir en bàs")
          // mettre sécurtité dans input: ex min 40 caractères
          // remettre setError(false) dans le "then" qui est aprés le "axios.post" pour enlever le style aux erreurs à chaque initialisation du formulaire
        })
        .then(() => {
          setAuthor("");
          setContent("");
          getData();
          setError(false);
        });
    }
  };
  // {} entre accolade veut dire: je me prépare à écrire du JS,
  // A chaque tour de boucle (map du tableau newsData), on joue le composant <Article/>
  // il faut une clé unique quand on crée un map (tjrs)!!!!! voir ci-bàs comment insérer un clé dans map
  // attention: faut affecter {article} (variable qu'on a nommé aléatoirement pour mapper) dans une var; ici article (même nom)
  // c dans map pour changer les ordres d'apparition, faire un TRI (à faire avant le map), méthode Sort; sort((a, b) => b.date - a.date) "du plus récent au plus ancien"
  // Partie: Create; càd Poster un msg, lors de soumission du formulaire; faire onSubmit dans balise form
  // onSubmit={(e) => handleSubmit(e)} / ceci equivaut à faire un addEventLister (sur balise "form" avec event "submit") et on se récupe l'évenement e !!
  // pr récupérer la val des inputs:  <input onChange={(e) => setAuthor(e.target.value)}/> c un addEventLister sur balise input; la var author prend la val de l'input par e.target.value en passant par setAuthor
  // on met "style" de border pr exprimer des erreurs, en react avec double accolades, voir ci-bàs
  // on insère un text <p> pour éxpliquer l'érreur, FAUT CONDITIONNER SON APPARITION
  // en react comme suit: {error && <p>} ; veut dire: si error est true alors fait ça: ici <p>
  return (
    <div className="news-container">
      <Navigation />
      <Logo />
      <h1>Ici les News</h1>

      <form onSubmit={(e) => handleSubmit(e)} action="">
        <input
          onChange={(e) => setAuthor(e.target.value)}
          type="text"
          placeholder="Nom"
          value={author}
        />
        <textarea
          style={{ border: error ? "1px solid red" : "1px solid #61dafb" }}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Message"
          value={content}
        ></textarea>
        {error && <p>Veuiller écrire un text de 20 caractères</p>}

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

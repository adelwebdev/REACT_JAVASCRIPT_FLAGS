import React from "react";

// on va récuperer les données; avec Props (données du composant News vers Article avec props)
// le destructuring: en écrivant : ({article}); on vient de destructurer le terme; (props)
// React apport les composants, les Hooks, les Props ect...
// mettre les dates au bon format, faut créer une variable! on utilise Parser et la méthode Date()
// pour format des dates: on fait { et à l'intérieur month, year, day:"numeric"..même heure et minute voir ci-bàs}
// pour inverser les ordres d'apparition: du plus récent au plus ancien; ça se fait dans le map
const Article = ({ article }) => {
  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return newDate;
  };
  dateParser();

  console.log(article);
  return (
    <div className="article">
      <div className="card-header">
        <h3>{article.author}</h3>
        <em>Posté le {dateParser(article.date)}</em>
        <p>{article.content}</p>
        <div className="btn-container">
          <button>Edit</button>
          <button>Supprimer</button>
        </div>
      </div>
    </div>
  );
};

export default Article;

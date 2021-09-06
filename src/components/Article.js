import React, { useState } from "react";
import axios from "axios";

// on va récuperer les données; avec Props (données du composant News vers Article avec props)
// le destructuring: en écrivant : ({article}); on vient de destructurer le terme; (props)
// React apport les composants, les Hooks, les Props ect...
// mettre les dates au bon format, faut créer une variable! on utilise Parser et la méthode Date()
// pour format des dates: on fait { et à l'intérieur month, year, day:"numeric"..même heure et minute voir ci-bàs}
// pour inverser les ordres d'apparition: du plus récent au plus ancien; ça se fait dans le map
// pour Edition de text (en crud); on crée d'abord une var: isEditing

const Article = ({ article }) => {
  // isEditing c pr si oui ou non (true or false) on veut editer le text (càd le changer)
  // pr afficher le nouveau texte aprés édition; il faut se récuperer se qui à été tapé dans l'input
  // on crée une nouvelle var avec Hook; editedContent
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditContent] = useState("");

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

  // fct handleEdit; on met setEditing(false) ainsi lorqu'on valide; btn valider redevient edit
  // pr la logique d'édition, faut appeller axios
  // pr envoyer les données à la DB c'est axios.put
  // on prépare un objet (ici "data") pour passer les nouvelles data (aprés modification)
  // avec data on passe les modification à la db (ici json file) mais faut recharger la page pr voir les modifs sur l'appli
  // ici on touche une limite de react, car le composant Article (qui est enfant de News) ne peut pas passer des props à News
  // le contenu édité ne pourra jamais être transmis à News (faut utiliser Redux) pr afficher les modifs fois soit forcer un rechargement de page
  const handleEdit = () => {
    const data = {
      article: article.author,
      content: editedContent,
      // si on met date: Date.now() l'article sera reaffiché avec la date de sa modification!, si on veut garder la date de création alors c date: article.date,
      //   date: Date.now(),
      date: article.date,
    };
    // on peut aussi sans .then(()) ; on fait direct aprés: axios.put ; setEditing(false)
    axios.put("http://localhost:3001/articles/" + article.id, data).then(() => {
      setIsEditing(false);
    });
  };

  console.log(article);

  // on insert la logique du editing dans composant Article car c ici (dans un article) qu'il y a Edit et Delete
  //pr inserer la logique du Editing; d'abord on insere onClick (JS) dans balise <button> avec setIsEditing(true)
  // isEditing ? (); veut dire si true on fait, ici <textarea autoFocus defaultValue={article.content}> ensuite; : (); si faux: <p>{article.content}</p> (on garde article.content)
  // <button onClick={() => setIsEditing(true)}>Edit</button>; si on click sur Edit; setIsEditing(true); on change le state de la var isEditing qui passe sur true
  // isEditing ? ( <button>Valider</valider>): si isEditing est true; alors le btn edit devient valider!
  // faut mettre au button valider une logique pr gerer l'édition; une fct
  // pr récupérer le nouveau texte edité c avec onChange = {(e)} (on se récupère l'événement)
  // on récupère l'événement avec (e) => setEditContent(e.target.value)
  // pr aficher en temps réel le nouveu text sur le DOM (sans recharger);  <p>{editedContent ? editedContent : article.content}</p> !!
  // mais faut également changer la default value (de notre texte); defaultValue={editedContent ? editedContent : article.content}
  // faut mettre du style aussi lorsqu'on est en mode édition; on insère: {{background: isEditing ? "#f3feff" : "white"}}
  return (
    <div
      className="article"
      style={{ background: isEditing ? "#f3feff" : "white" }}
    >
      <div className="card-header">
        <h3>{article.author}</h3>
        <em>Posté le {dateParser(article.date)}</em>
      </div>
      {isEditing ? (
        <textarea
          onChange={(e) => setEditContent(e.target.value)}
          autoFocus
          defaultValue={editedContent ? editedContent : article.content}
        ></textarea>
      ) : (
        <p>{editedContent ? editedContent : article.content}</p>
      )}

      <div className="btn-container">
        {isEditing ? (
          <button onClick={handleEdit}>Valider</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button>Supprimer</button>
      </div>
    </div>
  );
};

export default Article;

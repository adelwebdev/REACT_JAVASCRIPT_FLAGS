import React from "react";
import axios from "axios";

// le plus important c le ID de l'élément qu'on veut suprimer!
// (props.id) = ({ id }) ; le destructuring!

const DeleteArticle = ({ id }) => {
  //on crée une fct handleDelete (qui se chargera d'éffacer)

  const handleDelete = () => {
    console.log("ça delete!");
    axios.delete("http://localhost:3001/articles" + id);
    //window.location.reload; pr recharger la page et afficher les modifications!
    window.location.reload();
  };

  // on demande la confirmation de l'utilisateur avant supression! comme suit en JS:  if (window.confirm("vous supprimer?")) {handleDelete();}
  return (
    <button
      onClick={() => {
        if (window.confirm("vous supprimez?")) {
          handleDelete();
        }
      }}
    >
      Supprimer
    </button>
  );
};

export default DeleteArticle;

import React from "react";

// on va se récuperer les données; avec Props (données du composant News vers Article avec props)
// le destructuring: ({article}); on vient de destructurer le terme; props
const Article = (props) => {
  console.log(props);
  return (
    <div className="article">
      <div className="card-header">
        <h3>{props.author}</h3>
        <em>Posté le {props.date}</em>
      </div>
    </div>
  );
};

export default Article;

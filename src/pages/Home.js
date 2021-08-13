// const Home = () => {
//   // apres return() c'est ce que le composant doit rendre!
//   return (
//     <div className="home">
//       <h1>Accueil</h1>
//     </div>
//   );
// };
// export default Home;

// avec rsc on import un statless component (ci-dessous)
import React from "react";

const Home = () => {
  return (
    <div>
      <h1>Accueil</h1>
    </div>
  );
};

export default Home;

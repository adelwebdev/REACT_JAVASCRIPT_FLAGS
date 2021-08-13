// apres return() c'est ce que le composant doit rendre!

// avec rsc on import un statless component (ci-dessous)
import React from "react";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";

const Home = () => {
  return (
    <div>
      <Logo />
      <Navigation />
      <h1>Accueil</h1>
    </div>
  );
};

export default Home;

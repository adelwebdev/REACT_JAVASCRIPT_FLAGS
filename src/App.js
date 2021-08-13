// App: c le composant de base; on y insere toutes les pages

import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

// un composant est une fonction
// ceci est la procédure pour faire des pages web pr notre site
const App = () => {
  return (
    // ici on fait les liens url vers les pages
    //pour faire des liens clickable, il faut créer un composant navigation (voir dans src)
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navigation">
      <NavLink exact to="/" activeClassname="nav-active">
        Acceuil
      </NavLink>
      <NavLink exact to=" a-propos" activeClassname="nav-active">
        A propos
      </NavLink>
    </div>
  );
};

export default Navigation;

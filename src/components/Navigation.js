import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navigation" activeClassName="nav-active">
      <NavLink exact to="/">
        Acceuil
      </NavLink>
      <NavLink exact to="/about" activeClassName="nav-active">
        About
      </NavLink>
    </div>
  );
};

export default Navigation;

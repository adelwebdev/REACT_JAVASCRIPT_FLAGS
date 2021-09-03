import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  // activeClassName pr faire des liens clickable, il suit le "patch", exact to = "path"
  return (
    <div className="navigation">
      <NavLink exact to="/" activeClassName="nav-active">
        Acceuil
      </NavLink>
      <NavLink exact to="/about" activeClassName="nav-active">
        About
      </NavLink>
      <NavLink exact to="/news" activeClassName="nav-active">
        News
      </NavLink>
    </div>
  );
};

export default Navigation;

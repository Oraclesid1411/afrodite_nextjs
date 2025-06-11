// src/components/Navbar.jsx
import React from "react";

const Navbar = ({ adminName }) => {
  return (
    <div className="admin_navbar"
      
    >
      <h4>bienvenue, {adminName}</h4>
    </div>
  );
};

export default Navbar;

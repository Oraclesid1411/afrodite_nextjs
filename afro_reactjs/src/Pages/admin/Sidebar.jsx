// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { useAdmin } from "../../Context/AdminContext";
import { useNavigate } from "react-router-dom"



const Sidebar = () => {
  const { logout } = useAdmin();
  const navigate = useNavigate();

  function Logout(){
    logout();
    location.reload()
  }
  return (
    <div
     
      className="admin_sidebar"
    >
      <h2>Admin Panel</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li>
          <NavLink
            to="/admin"
            style={{
              color: "#ecf0f1",
              textDecoration: "none",
              padding: "10px 20px",
              display: "block",
            }}
            activeStyle={{ backgroundColor: "#34495e", fontWeight: "bold" }}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/manage-users"
            style={{
              color: "#ecf0f1",
              textDecoration: "none",
              padding: "10px 20px",
              display: "block",
            }}
            activeStyle={{ backgroundColor: "#34495e", fontWeight: "bold" }}
          >
           les utilisateurs
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/fashionmodelsmngt"
            style={{
              color: "#ecf0f1",
              textDecoration: "none",
              padding: "10px 20px",
              display: "block",
            }}
            activeStyle={{ backgroundColor: "#34495e", fontWeight: "bold" }}
          >
          les mannequins
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/hotesses"
            style={{
              color: "#ecf0f1",
              textDecoration: "none",
              padding: "10px 20px",
              display: "block",
            }}
            activeStyle={{ backgroundColor: "#34495e", fontWeight: "bold" }}
          >
          les hotesses d'accueil
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/influenceurs"
            style={{
              color: "#ecf0f1",
              textDecoration: "none",
              padding: "10px 20px",
              display: "block",
            }}
            activeStyle={{ backgroundColor: "#34495e", fontWeight: "bold" }}
          >
          les influenceurs
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/collabs"
            style={{
              color: "#ecf0f1",
              textDecoration: "none",
              padding: "10px 20px",
              display: "block",
            }}
            activeStyle={{ backgroundColor: "#34495e", fontWeight: "bold" }}
          >
          les collabs
          </NavLink>
        </li>
        
        <li>
          <NavLink
            to="/admin/events"
            style={{
              color: "#ecf0f1",
              textDecoration: "none",
              padding: "10px 20px",
              display: "block",
            }}
            activeStyle={{ backgroundColor: "#34495e", fontWeight: "bold" }}
          >
          events
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/register"
            style={{
              color: "#ecf0f1",
              textDecoration: "none",
              padding: "10px 20px",
              display: "block",
            }}
            activeStyle={{ backgroundColor: "#34495e", fontWeight: "bold" }}
          >
          Nouveau Admin
          </NavLink>
        </li>
        <li>
          <NavLink
            style={{
              color: "#ecf0f1",
              textDecoration: "none",
              padding: "10px 20px",
              display: "block",
            }}
            activeStyle={{ backgroundColor: "#34495e", fontWeight: "bold" }}
            onClick={Logout}
          >
          Déconnexion
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

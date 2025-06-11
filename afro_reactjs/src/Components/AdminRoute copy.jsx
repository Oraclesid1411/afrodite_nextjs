import React from 'react';
import { Navigate ,useLocation} from 'react-router-dom'; 
import { useAdmin } from '../Context/AdminContext';  // Importez le contexte admin
const AdminRoute = ({ children }) => {
  
  const { isAdmin, isAuthenticated ,currentAdmin } = useAdmin();
 
  const location = useLocation();
  // Si l'utilisateur n'est pas connecté ou n'est pas admin
   // Affiche une phase de chargement si les états ne sont pas encore synchronisés
   if (isAuthenticated === null || isAdmin === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/adminlogin" replace state={{ from: location.pathname }} />;
  }
 

  return children;
};

export default AdminRoute;

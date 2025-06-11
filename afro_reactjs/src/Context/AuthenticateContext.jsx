import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import AdminAuthenticateContext from "../Context/AdminAuthenticateContext.jsx";
const AuthContext = createContext();

    const apiUrl = 'https://apiafro.aafrodites.com/'
    axios.defaults.withCredentials = true;
    


const AuthProvider = ({ children }) => {

   const [isAdmin, setIsAdmin] = useState(
      localStorage.getItem("isAdmin") === "true"
    );
  
//  localStorage.clear();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("site") // Vérifie si un token existe
  );

  const [isAuthenticatedA, setIsAuthenticatedA] = useState(
      localStorage.getItem("isAuthenticated") === "true"
    );
    
  const [currentUser, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [currentAdmin, setAdmin] = useState(
      JSON.parse(localStorage.getItem("admin")) || null
    );
  const [token, setToken] = useState(localStorage.getItem("site") || "");
    const [tokenA, setTokenA] = useState(localStorage.getItem("adminToken") || "");
  

  const saveToLocalStorageA = (adminData, adminToken) => {
    if (adminData && adminToken) {
      setIsAuthenticatedA(true);
      localStorage.setItem("adminToken", adminToken);
      localStorage.setItem("admin", JSON.stringify(adminData));

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isAdmin", "true");

      setAdmin(adminData);
      setTokenA(adminToken);
    }
  };
  const navigate = useNavigate();
   // Fonction pour sauvegarder les données dans le localStorage
   const saveToLocalStorage = (userData, userToken) => {
    if (userData && userToken) {
      // Sauvegarder dans le localStorage
       setIsAuthenticated(true);
      localStorage.setItem("site", userToken);
      localStorage.setItem("user", JSON.stringify(userData));

     // Mettre à jour les états
      setUser(userData);
      setTokenA(userToken);
    }
  };
  const login = async (inputs, redirectTo = "/") => {

    console.log("redirectTo")
    console.log(redirectTo)
    // return false;
    try {

    if(redirectTo === "/manager"){
          console.log('manager')
          var res = await axios.post(`${apiUrl}/auth/login_manager`, inputs);
          // console.log(res)
          // return false;
    }
    else{
        res = await axios.post(`${apiUrl}/auth/login`, inputs)
    
    }
   

    if (res?.data) {
      const { token, user, loginStatus } = res.data;

      
      if (res.data?.loginStatus !== false) {


        if(user?.role !== 1){

          const token = res.data?.token;

          setUser(res.data.user);
          setToken(token);
          setIsAuthenticated(true);
  
          localStorage.setItem("site", token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
                    
           // On exclut le mot de passe avant de stocker les données de l'utilisateur
             const { password, ...userWithoutPassword } = res.data.user;
          return { data: userWithoutPassword ,
            loginStatus : true,
             redirect_path : redirectTo }; // Retourne l'erreur du backend

        }else{
            // Enregistrer l'administrateur et le token
            saveToLocalStorageA(user, token);
            setIsAuthenticatedA(true);
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("isAdmin", "true");
            setIsAdmin(true);
            navigate("/admin");
        }



        // Enregistrer l'utilisateur et le token
       
      } else {
        return { data: res.data ,loginStatus : false }; // Retourne l'erreur du backend
      }
    // }, 3500); // Délai de 3 secondes


    }
        
     
    } catch (err) {
      console.error(err);
      return { error: err.response?.data || "An error occurred" };
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    setIsAuthenticated(false);

    // Nettoyer le localStorage
    localStorage.removeItem("site");
    localStorage.removeItem("user");

    navigate("/login");
  };



  // Synchroniser `currentUser` avec `localStorage`
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        token,
        currentUser,
        login,
        logout,
        saveToLocalStorage,
        isAdmin,
        isAuthenticatedA,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
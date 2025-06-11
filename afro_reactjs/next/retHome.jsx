import React from 'react'
// import Announcement from "../Components/Announcement"
import { useState, useEffect ,Suspense  } from "react";

import Header_menu from "../Components/Header_menu"
const MainContent = React.lazy(() => import('../Components/MainContent'));

// import MainContent from "../Components/MainContent"
import Footer from "../Components/Footer"
import FixedMenu from "../Components/FixedMenu"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
const Home = () => {
  const location = useLocation();
  useEffect(() => {
    // Récupérer les données passées via `state` lors de la navigation
    const userData = location.state?.data;
    const locationdata = location.state;

    // console.log("locationdata")
    console.log(locationdata?.currentpage)
    if(locationdata?.currentpage ==="/register"){
      if (userData) {
        // console.log(location)
        const redirectTo = location.state?.from || "/";
        // console.log("from " + redirectTo)
        // console.log("Données de l'utilisateur:", userData);
          toast.success('bienvenue ' + userData?.pseudo + '! votre compte afrodite vient d\'être crée avec succès', {
                    position: "top-center",
                    autoClose: false,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    // transition: Bounce,
                });
        // Vous pouvez utiliser ces données dans votre page, par exemple afficher le nom de l'utilisateur
      }

    }
    else if(locationdata?.currentpage ==="/login"){
      if (userData) {
        // console.log(location)
        const redirectTo = location.state?.from || "/";
        // console.log("from " + redirectTo)
        // console.log("Données de l'utilisateur:", userData);
          toast.success('bienvenue ' + userData?.pseudo + '!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    // transition: Bounce,
                });
        // Vous pouvez utiliser ces données dans votre page, par exemple afficher le nom de l'utilisateur
      }

    }
    else{
      if (userData) {
        // console.log(location)
        const redirectTo = location.state?.from || "/";
        // console.log("from " + redirectTo)
        // console.log("Données de l'utilisateur:", userData);
          toast.success('bienvenue ' + userData?.pseudo + '!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    // transition: Bounce,
                });
        // Vous pouvez utiliser ces données dans votre page, par exemple afficher le nom de l'utilisateur
      }

    }
   
  }, [location]); // `location` va changer lors de la redirection

  return (

 
   <>
      {/* <Announcement /> */}
      <Header_menu data ={{ link : 'home' }} />
      <ToastContainer className="toast_style"/>
      <Suspense fallback={<div>Chargement...</div>}>
      <MainContent />
    </Suspense>
      {/* <MainContent /> */}
      {/* <Footer /> */}
      <FixedMenu />
    
   
   </>
  )
}

export default Home

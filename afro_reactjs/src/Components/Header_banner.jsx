// import React , { Component, useContext }  from 'react'
import {useEffect, useState, useRef } from "react";

import { useNavigate } from 'react-router-dom'
import { useAuth } from "../Context/AuthenticateContext.jsx";
// import $ from 'jquery';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
// import { Return_back } from './Back_btn';
 
import axios from 'axios'
import {
    Link,
    NavLink,
  } from "react-router-dom";

  import { useLocation  } from 'react-router-dom'; 
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css'; 

  import CountrySelect from "./countrySeclected.jsx";

  import Footer from "./Footer.jsx";
 

const Header_banner = (props) => {

    const auth = useAuth(); 
    const user_info = auth.currentUser 

    console.log(user_info)
  
    const [activeIndex, setActiveIndex] = useState(null);
        // Gestion du clic sur un élément de menu
                const handleOpenMenu = (index) => {
                    // Active le sous-menu en ajoutant la classe 'active' au bon élément
                    setActiveIndex(index);
                };
       
                const location = useLocation(); 
                // const apiUrl = 'https://apiafro.aafrodites.com/'
                axios.defaults.withCredentials = true;
                
                const navigate = useNavigate()
                  
        console.log(props?.data)
    const [searchTerm, setSearchTerm] = useState([]);
    const [current_link, setCurrentLink] = useState("");
    // const [message , setMessage]  = useState("");

    console.log('link ' + current_link)
    
  useEffect(() => {
      
    const fetchData = async () => {
     
        // if(location?.state != null || location?.state != undefined){
            setCurrentLink(props?.data?.link)
        // }
    };
    fetchData();
  });
    
    const [message_type , setMessageType]  = useState("");
 
  useEffect(() => {
      
    const fetchData = async () => {
     
        if(location?.state != null || location?.state != undefined){
            if(location?.state?.notification != undefined || location?.state?.notification != null){
                console.log('location?.state?.notification')
                console.log(location?.state)
                console.log(location?.state?.notification)
                // setMessage(location?.state?.notification)
                // setMessageType(location?.state?.etat)

            }
        }
    };
    fetchData();
  });
  function go_back() {
    console.log('back')
    window.history.back();
}

  return (
  
    <>
         <header className="sticky-header border-btm-black header-1">
            <div className="header-bottom header_banner" >
                <div className="container">
                    <div className="row  container_h">
                        <div className="col-lg-2 col-md-4 col-4 logo_box start_zone">
                            <div className="header-logo">
                                <a href="/" className="logo-main">
                                    <img src={"/assets/models/logo.png"} loading="lazy" alt="afrodites"/>
                                </a>
                                <label className="location_selector" style={{display: "none"}}>
                                     {/* Sélecteur de pays avec drapeaux */}
                                    <CountrySelect />
                                </label>
                            </div>
                        </div>
                        <div className="inline_cstmb sm_view middle_zone">
                            <div className="col_cst ">
                                <h2>{props.data?.link}</h2>
                            </div>
                      </div>
                        <div className="col-lg-8 d-lg-block d-none">
                            <nav className="site-navigation">
                                <ul className="main-menu list-unstyled justify-content-center">

                                    {current_link === "" ?
                                    (
                                        <>
                                        <li className="menu-list-item nav-item active" >
                                           <a 
                                           className="nav-link" 
                                           href="/"
                                           >Accueil</a>
                                       </li>


                                       <li className="menu-list-item nav-item" >
                                           <a 
                                           className="nav-link" 
                                           href="/about"
                                           >Nous</a>
                                       </li>

                                       <li className="menu-list-item nav-item has-dropdown">
                                            <div className="mega-menu-header">
                                                <a className="nav-link" href="/mannequins">
                                                    Nos Models
                                                </a>
                                                <span className="open-submenu">
                                                    <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                        width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                        strokeLinejoin="round">
                                                        <polyline points="6 9 12 15 18 9"></polyline>
                                                    </svg>
                                                </span>
                                            </div>
                                            <div className="submenu-transform submenu-transform-desktop">
                                                <ul className="submenu list-unstyled"
                                                    style={
                                                        {width :'600px',
                                                        height :'230px'}
                                                    }
                                                    >
                                                    
                                                    <div className="dropdowFlex">

                                                        <div className="">
                                                            <h6>Intégrer Afrodites</h6>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerMannequin">Devenir une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerInfluenceur">Devenir une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerHotesse">Devenir une host modele</a>
                                                            </li>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerFranchise">Devenir une franchise d'Afrodite</a>
                                                            </li>


                                                        </div>

                                                        <hr className="vertical-line"/>


                                                        <div className="">
                                                            <h6>Trouver un modèle</h6>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/mannequins">Trouver une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/influenceur">Trouver une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/hodesse_accueil">Trouver une host modele</a>
                                                            </li>

                                                        </div>

                                                    </div>
                                                        
                                                        
                                                                                                    
                                                </ul>
                                            </div>
                                        </li>

                                        <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/evenements">
                                                        Events
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/franchises">
                                                        Nos Franchises
                                                    </a>
                                       </li>
                                           
                                        <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/vlog">Vlog</a>
                                       </li>

                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/parteners">Collabs</a>
                                       </li>



                                       


                                       {(user_info === undefined) || (user_info === null) ?
                                       
                                       (
                                        <>
                                            <li className="menu-list-item nav-item">
                                                <a className="nav-link" href="/login">connexion</a>
                                            </li>
                                        </>

                                       )

                                       :

                                       (
                                        <>

                                          <li className="menu-list-item nav-item has-dropdown">
                                          <li className="menu-list-item nav-item">
                                               
                                            </li>
                                                <div className="mega-menu-header">
                                                <a className="nav-link" href="#">{user_info?.pseudo}</a>
                                                    
                                                    <span className="open-submenu">
                                                        <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                            strokeLinejoin="round">
                                                            <polyline points="6 9 12 15 18 9"></polyline>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div className="submenu-transform submenu-transform-desktop">
                                                    <ul className="submenu list-unstyled">
                                                        <li className="menu-list-item nav-item-sub">
                                                            <a className="nav-link-sub nav-text-sub" href="/profile">Mon profil
                                                            </a>
                                                        </li>
                                                        <li className="menu-list-item nav-item-sub">
                                                        <a className="nav-link-sub nav-text-sub" href="#" onClick={auth.logout}>Déconnexion</a>
                                                        </li>
                                                         
                                                    </ul>
                                                </div>
                                            </li>
                                          

                                        </>
                                       )
                                    
                                    
                                    }
                                           
                                       </>
                                    )

                                    :
                                    current_link === "home" ?
                                    ( 
                                        <>
                                        <li className="menu-list-item nav-item active" >
                                           <a className="nav-link" href="/">Accueil</a>
                                       </li>
                                       <li className="menu-list-item nav-item" >
                                           <a 
                                           className="nav-link" 
                                           href="/about"
                                           >Nous</a>
                                       </li>
                                       <li className="menu-list-item nav-item has-dropdown">
                                 <div className="mega-menu-header">
                                    <a className="nav-link" href="/mannequins">
                                       Nos Models
                                    </a>
                                    <span className="open-submenu" onClick={() => handleOpenMenu(0)}>
                                                 <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                    </span>
                                </div>

                                <div className="submenu-transform submenu-transform-desktop">
                                <ul className="submenu list-unstyled"
                                                    style={
                                                        {width :'600px',
                                                        height :'230px'}
                                                    }
                                                    >
                                                    
                                                    <div className="dropdowFlex">

                                                        <div className="">
                                                            <h6>Intégrer Afrodites</h6>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerMannequin">Devenir une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerInfluenceur">Devenir une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerHotesse">Devenir une host modele</a>
                                                            </li>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerFranchise">Devenir une franchise d'Afrodite</a>
                                                            </li>


                                                        </div>

                                                        <hr className="vertical-line"/>


                                                        <div className="">
                                                            <h6>Trouver un modèle</h6>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/mannequins">Trouver une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/influenceur">Trouver une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/hodesse_accueil">Trouver une host modele</a>
                                                            </li>

                                                        </div>

                                                    </div>
                                                        
                                                        
                                                                                                    
                                                </ul>
                                            </div>
                            </li>
                            
                            <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/evenements">
                                                        Events
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/franchises">
                                                        Nos Franchises
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/vlog">Vlog</a>
                                       </li>

                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/parteners">Collabs</a>
                                       </li>

                             {(user_info === undefined) || (user_info === null) ?
                                       
                                       (
                                        <>
                                            <li className="menu-list-item nav-item">
                                                <a className="nav-link" href="/login">connexion</a>
                                            </li>
                                        </>

                                       )

                                       :

                                       (
                                        <>

                                        <li className="menu-list-item nav-item has-dropdown">
                                        <li className="menu-list-item nav-item">
                                             
                                          </li>
                                              <div className="mega-menu-header">
                                              <a className="nav-link" href="#">{user_info?.pseudo}</a>
                                                  
                                                  <span className="open-submenu">
                                                      <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                          width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                          strokeLinejoin="round">
                                                          <polyline points="6 9 12 15 18 9"></polyline>
                                                      </svg>
                                                  </span>
                                              </div>
                                              <div className="submenu-transform submenu-transform-desktop">
                                                  <ul className="submenu list-unstyled">
                                                      <li className="menu-list-item nav-item-sub">
                                                          <a className="nav-link-sub nav-text-sub" href="/profile">Mon profil
                                                          </a>
                                                      </li>
                                                      <li className="menu-list-item nav-item-sub">
                                                      <a className="nav-link-sub nav-text-sub" href="#" onClick={auth.logout}>Déconnexion</a>
                                                      </li>
                                                       
                                                  </ul>
                                              </div>
                                          </li>
                                        

                                      </>
                                       )
                                    }
                                        </>

                                    )

                                    :
                                    current_link === "mannequin" ?
                                    ( 
                                       
                                        <>
                                        <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/">Accueil</a>
                                       </li>


                                       <li className="menu-list-item nav-item" >
                                           <a 
                                           className="nav-link" 
                                           href="/about"
                                           >Nous</a>
                                       </li>

                                       <li className="menu-list-item nav-item has-dropdown active">
                                            <div className="mega-menu-header">
                                                <a className="nav-link active" href="/mannequins">
                                                    Nos Models
                                                </a>
                                                <span className="open-submenu">
                                                    <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                        width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                        strokeLinejoin="round">
                                                        <polyline points="6 9 12 15 18 9"></polyline>
                                                    </svg>
                                                </span>
                                            </div>
                                            <div className="submenu-transform submenu-transform-desktop">
                                            <ul className="submenu list-unstyled"
                                                    style={
                                                        {width :'600px',
                                                        height :'230px'}
                                                    }
                                                    >
                                                    
                                                    <div className="dropdowFlex">

                                                        <div className="">
                                                            <h6>Intégrer Afrodites</h6>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerMannequin">Devenir une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerInfluenceur">Devenir une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerHotesse">Devenir une host modele</a>
                                                            </li>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerFranchise">Devenir une franchise d'Afrodite</a>
                                                            </li>


                                                        </div>

                                                        <hr className="vertical-line"/>


                                                        <div className="">
                                                            <h6>Trouver un modèle</h6>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/mannequins">Trouver une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/influenceur">Trouver une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/hodesse_accueil">Trouver une host modele</a>
                                                            </li>

                                                        </div>

                                                    </div>
                                                        
                                                        
                                                                                                    
                                                </ul>
                                            </div>
                                        </li>

                                     
                                        <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/evenements">
                                                        Events
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/franchises">
                                                        Nos Franchises
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/vlog">Vlog</a>
                                       </li>

                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/parteners">Collabs</a>
                                       </li>


                                       {(user_info === undefined) || (user_info === null) ?
                                       
                                       (
                                        <>
                                            <li className="menu-list-item nav-item">
                                                <a className="nav-link" href="/login">connexion</a>
                                            </li>
                                        </>

                                       )

                                       :

                                       (
                                        <>

                                        <li className="menu-list-item nav-item has-dropdown">
                                        <li className="menu-list-item nav-item">
                                             
                                          </li>
                                              <div className="mega-menu-header">
                                              <a className="nav-link" href="#">{user_info?.pseudo}</a>
                                                  
                                                  <span className="open-submenu">
                                                      <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                          width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                          strokeLinejoin="round">
                                                          <polyline points="6 9 12 15 18 9"></polyline>
                                                      </svg>
                                                  </span>
                                              </div>
                                              <div className="submenu-transform submenu-transform-desktop">
                                                  <ul className="submenu list-unstyled">
                                                      <li className="menu-list-item nav-item-sub">
                                                          <a className="nav-link-sub nav-text-sub" href="/profile">Mon profil
                                                          </a>
                                                      </li>
                                                      <li className="menu-list-item nav-item-sub">
                                                      <a className="nav-link-sub nav-text-sub" href="#" onClick={auth.logout}>Déconnexion</a>
                                                      </li>
                                                       
                                                  </ul>
                                              </div>
                                          </li>
                                        

                                      </>
                                       )
                                    }
                                     
                                       </>

                                    )

                                    :
                                    current_link === "hottesse" ?
                                    ( 
                                        <>
                                        <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/">Accueil</a>
                                       </li>

                                       <li className="menu-list-item nav-item" >
                                           <a 
                                           className="nav-link" 
                                           href="/about"
                                           >Nous</a>
                                       </li>

                                       <li className="menu-list-item nav-item has-dropdown active">
                                            <div className="mega-menu-header">
                                                <a className="nav-link" href="/mannequins">
                                                    Nos Models
                                                </a>
                                                <span className="open-submenu">
                                                    <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                        width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                        strokeLinejoin="round">
                                                        <polyline points="6 9 12 15 18 9"></polyline>
                                                    </svg>
                                                </span>
                                            </div>
                                            <div className="submenu-transform submenu-transform-desktop">
                                            <ul className="submenu list-unstyled"
                                                    style={
                                                        {width :'600px',
                                                        height :'230px'}
                                                    }
                                                    >
                                                    
                                                    <div className="dropdowFlex">

                                                        <div className="">
                                                            <h6>Intégrer Afrodites</h6>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerMannequin">Devenir une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerInfluenceur">Devenir une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerHotesse">Devenir une host modele</a>
                                                            </li>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerFranchise">Devenir une franchise d'Afrodite</a>
                                                            </li>


                                                        </div>

                                                        <hr className="vertical-line"/>


                                                        <div className="">
                                                            <h6>Trouver un modèle</h6>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/mannequins">Trouver une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/influenceur">Trouver une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/hodesse_accueil">Trouver une host modele</a>
                                                            </li>

                                                        </div>

                                                    </div>
                                                        
                                                        
                                                                                                    
                                                </ul>
                                            </div>
                                        </li>

                                     
                                        <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/evenements">
                                                        Events
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/franchises">
                                                        Nos Franchises
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/vlog">Vlog</a>
                                       </li>

                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/parteners">Collabs</a>
                                       </li>


                                       {(user_info === undefined) || (user_info === null) ?
                                       
                                       (
                                        <>
                                            <li className="menu-list-item nav-item">
                                                <a className="nav-link" href="/login">connexion</a>
                                            </li>
                                        </>

                                       )

                                       :

                                       (
                                        <>

                                          <li className="menu-list-item nav-item has-dropdown">
                                          <li className="menu-list-item nav-item">
                                               
                                            </li>
                                                <div className="mega-menu-header">
                                                <a className="nav-link" href="#">{user_info?.pseudo}</a>
                                                    
                                                    <span className="open-submenu">
                                                        <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                            strokeLinejoin="round">
                                                            <polyline points="6 9 12 15 18 9"></polyline>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div className="submenu-transform submenu-transform-desktop">
                                                    <ul className="submenu list-unstyled">
                                                        <li className="menu-list-item nav-item-sub">
                                                            <a className="nav-link-sub nav-text-sub" href="/profile">Mon profil
                                                            </a>
                                                        </li>
                                                        <li className="menu-list-item nav-item-sub">
                                                        <a className="nav-link-sub nav-text-sub" href="#" onClick={auth.logout}>Déconnexion</a>
                                                        </li>
                                                         
                                                    </ul>
                                                </div>
                                            </li>
                                          

                                        </>
                                       )
                                    }
                                       </>

                                    )

                                    :
                                    current_link === "events" ?
                                    ( 
                                      
                                        <>
                                        <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/">Accueil</a>
                                       </li>

                                       <li className="menu-list-item nav-item" >
                                           <a 
                                           className="nav-link" 
                                           href="/about"
                                           >Nous</a>
                                       </li>

                                       <li className="menu-list-item nav-item has-dropdown">
                                            <div className="mega-menu-header">
                                                <a className="nav-link" href="/mannequins">
                                                    Nos Models
                                                </a>
                                                <span className="open-submenu">
                                                    <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                        width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                        strokeLinejoin="round">
                                                        <polyline points="6 9 12 15 18 9"></polyline>
                                                    </svg>
                                                </span>
                                            </div>
                                            <div className="submenu-transform submenu-transform-desktop">
                                            <ul className="submenu list-unstyled"
                                                    style={
                                                        {width :'600px',
                                                        height :'230px'}
                                                    }
                                                    >
                                                    
                                                    <div className="dropdowFlex">

                                                        <div className="">
                                                            <h6>Intégrer Afrodites</h6>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerMannequin">Devenir une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerInfluenceur">Devenir une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerHotesse">Devenir une host modele</a>
                                                            </li>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerFranchise">Devenir une franchise d'Afrodite</a>
                                                            </li>


                                                        </div>

                                                        <hr className="vertical-line"/>


                                                        <div className="">
                                                            <h6>Trouver un modèle</h6>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/mannequins">Trouver une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/influenceur">Trouver une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/hodesse_accueil">Trouver une host modele</a>
                                                            </li>

                                                        </div>

                                                    </div>
                                                        
                                                        
                                                                                                    
                                                </ul>
                                            </div>
                                        </li>

                                     
                                        <li className="menu-list-item nav-item active" >
                                              <a className="nav-link" href="/evenements">
                                                        Events
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/franchises">
                                                        Nos Franchises
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/vlog">Vlog</a>
                                       </li>

                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/parteners">Collabs</a>
                                       </li>

                                       {(user_info === undefined) || (user_info === null) ?
                                       
                                       (
                                        <>
                                            <li className="menu-list-item nav-item">
                                                <a className="nav-link" href="/login">connexion</a>
                                            </li>
                                        </>

                                       )

                                       :

                                       (
                                        <>

                                        <li className="menu-list-item nav-item has-dropdown">
                                        <li className="menu-list-item nav-item">
                                             
                                          </li>
                                              <div className="mega-menu-header">
                                              <a className="nav-link" href="#">{user_info?.pseudo}</a>
                                                  
                                                  <span className="open-submenu">
                                                      <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                          width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                          strokeLinejoin="round">
                                                          <polyline points="6 9 12 15 18 9"></polyline>
                                                      </svg>
                                                  </span>
                                              </div>
                                              <div className="submenu-transform submenu-transform-desktop">
                                                  <ul className="submenu list-unstyled">
                                                      <li className="menu-list-item nav-item-sub">
                                                          <a className="nav-link-sub nav-text-sub" href="/profile">Mon profil
                                                          </a>
                                                      </li>
                                                      <li className="menu-list-item nav-item-sub">
                                                          <a className="nav-link-sub nav-text-sub" href="#" onClick={auth.logout}>Déconnexion</a>
                                                      </li>
                                                       
                                                  </ul>
                                              </div>
                                          </li>
                                        

                                      </>
                                       )
                                    }
                                       </>

                                    )

                                    :
                                    current_link === "about" ?
                                    ( 

                                        <>
                                        <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/">Accueil</a>
                                       </li>

                                       <li className="menu-list-item nav-item active" >
                                           <a 
                                           className="nav-link" 
                                           href="/about"
                                           >Nous</a>
                                       </li>

                                       <li className="menu-list-item nav-item has-dropdown">
                                            <div className="mega-menu-header">
                                                <a className="nav-link" href="/mannequins">
                                                    Nos Models
                                                </a>
                                                <span className="open-submenu">
                                                    <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                        width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                        strokeLinejoin="round">
                                                        <polyline points="6 9 12 15 18 9"></polyline>
                                                    </svg>
                                                </span>
                                            </div>
                                            <div className="submenu-transform submenu-transform-desktop">
                                            <ul className="submenu list-unstyled"
                                                    style={
                                                        {width :'600px',
                                                        height :'230px'}
                                                    }
                                                    >
                                                    
                                                    <div className="dropdowFlex">

                                                        <div className="">
                                                            <h6>Intégrer Afrodites</h6>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerMannequin">Devenir une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerInfluenceur">Devenir une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerHotesse">Devenir une host modele</a>
                                                            </li>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerFranchise">Devenir une franchise d'Afrodite</a>
                                                            </li>


                                                        </div>

                                                        <hr className="vertical-line"/>


                                                        <div className="">
                                                            <h6>Trouver un modèle</h6>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/mannequins">Trouver une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/influenceur">Trouver une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/hodesse_accueil">Trouver une host modele</a>
                                                            </li>

                                                        </div>

                                                    </div>
                                                        
                                                        
                                                                                                    
                                                </ul>
                                            </div>
                                        </li>

                                     
                                        <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/evenements">
                                                        Events
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/franchises">
                                                        Nos Franchises
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/vlog">Vlog</a>
                                       </li>

                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/parteners">Collabs</a>
                                       </li>


                                       {(user_info === undefined) || (user_info === null) ?
                                       
                                       (
                                        <>
                                            <li className="menu-list-item nav-item">
                                                <a className="nav-link" href="/login">connexion</a>
                                            </li>
                                        </>

                                       )

                                       :

                                       (
                                        <>

                                          <li className="menu-list-item nav-item has-dropdown">
                                          <li className="menu-list-item nav-item">
                                               
                                            </li>
                                                <div className="mega-menu-header">
                                                <a className="nav-link" href="#">{user_info?.pseudo}</a>
                                                    
                                                    <span className="open-submenu">
                                                        <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                            strokeLinejoin="round">
                                                            <polyline points="6 9 12 15 18 9"></polyline>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div className="submenu-transform submenu-transform-desktop">
                                                    <ul className="submenu list-unstyled">
                                                        <li className="menu-list-item nav-item-sub">
                                                            <a className="nav-link-sub nav-text-sub" href="/profile">Mon profil
                                                            </a>
                                                        </li>
                                                        <li className="menu-list-item nav-item-sub">
                                                        <a className="nav-link-sub nav-text-sub" href="#" onClick={auth.logout}>Déconnexion</a>
                                                        </li>
                                                         
                                                    </ul>
                                                </div>
                                            </li>
                                          

                                        </>
                                       )
                                    }
                                       </>

                                    )

                                    :

                                    (
                                        <>
                                        <li className="menu-list-item nav-item active" >
                                           <a 
                                           className="nav-link" 
                                           href="/"
                                           >Accueil</a>
                                       </li>

                                       <li className="menu-list-item nav-item" >
                                           <a 
                                           className="nav-link" 
                                           href="/about"
                                           >Nous</a>
                                       </li>

                                       <li className="menu-list-item nav-item has-dropdown">
                                            <div className="mega-menu-header">
                                                <a className="nav-link" href="/mannequins">
                                                    Nos Models
                                                </a>
                                                <span className="open-submenu">
                                                    <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                        width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                        strokeLinejoin="round">
                                                        <polyline points="6 9 12 15 18 9"></polyline>
                                                    </svg>
                                                </span>
                                            </div>
                                            <div className="submenu-transform submenu-transform-desktop">
                                                <ul className="submenu list-unstyled"
                                                    style={
                                                        {width :'600px',
                                                        height :'230px'}
                                                    }
                                                    >
                                                    
                                                    <div className="dropdowFlex">

                                                        <div className="">
                                                            <h6>Intégrer Afrodites</h6>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerMannequin">Devenir une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerInfluenceur">Devenir une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerHotesse">Devenir une host modele</a>
                                                            </li>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerFranchise">Devenir une franchise d'Afrodite</a>
                                                            </li>


                                                        </div>

                                                        <hr className="vertical-line"/>


                                                        <div className="">
                                                            <h6>Trouver un modèle</h6>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/mannequins">Trouver une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/influenceur">Trouver une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/hodesse_accueil">Trouver une host modele</a>
                                                            </li>

                                                        </div>

                                                    </div>
                                                        
                                                        
                                                                                                    
                                                </ul>
                                            </div>
                                        </li>

                                        <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/evenements">
                                                        Events
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/franchises">
                                                        Nos Franchises
                                                    </a>
                                       </li>
                                           
                                        <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/vlog">Vlog</a>
                                       </li>

                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/parteners">Collabs</a>
                                       </li>



                                       


                                       {(user_info === undefined) || (user_info === null) ?
                                       
                                       (
                                        <>
                                            <li className="menu-list-item nav-item">
                                                <a className="nav-link" href="/login">connexion</a>
                                            </li>
                                        </>

                                       )

                                       :

                                       (
                                        <>

                                          <li className="menu-list-item nav-item has-dropdown">
                                          <li className="menu-list-item nav-item">
                                               
                                            </li>
                                                <div className="mega-menu-header">
                                                <a className="nav-link" href="#">{user_info?.pseudo}</a>
                                                    
                                                    <span className="open-submenu">
                                                        <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                            strokeLinejoin="round">
                                                            <polyline points="6 9 12 15 18 9"></polyline>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div className="submenu-transform submenu-transform-desktop">
                                                    <ul className="submenu list-unstyled">
                                                        <li className="menu-list-item nav-item-sub">
                                                            <a className="nav-link-sub nav-text-sub" href="/profile">Mon profil
                                                            </a>
                                                        </li>
                                                        <li className="menu-list-item nav-item-sub">
                                                        <a className="nav-link-sub nav-text-sub" href="#" onClick={auth.logout}>Déconnexion</a>
                                                        </li>
                                                         
                                                    </ul>
                                                </div>
                                            </li>
                                          

                                        </>
                                       )
                                    
                                    
                                    }
                                           
                                       </>
                                    )

                                    }
                                   

                                  
                                  
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-2 col-md-8 col-8 endzone">
                            <div className="header-action d-flex align-items-center justify-content-end">
                                <a className="header-action-item header-search" href="javascript:void(0)">
                                    <svg className="icon icon-search" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7.75 0.250183C11.8838 0.250183 15.25 3.61639 15.25 7.75018C15.25 9.54608 14.6201 11.1926 13.5625 12.4846L19.5391 18.4611L18.4609 19.5392L12.4844 13.5627C11.1924 14.6203 9.5459 15.2502 7.75 15.2502C3.61621 15.2502 0.25 11.884 0.25 7.75018C0.25 3.61639 3.61621 0.250183 7.75 0.250183ZM7.75 1.75018C4.42773 1.75018 1.75 4.42792 1.75 7.75018C1.75 11.0724 4.42773 13.7502 7.75 13.7502C11.0723 13.7502 13.75 11.0724 13.75 7.75018C13.75 4.42792 11.0723 1.75018 7.75 1.75018Z"
                                            fill="black" />
                                    </svg>
                                </a>
                               
                                <a className="header-action-item header-hamburger ms-4 d-lg-none" href="#drawer-menu"
                                    data-bs-toggle="offcanvas">
                                    <svg className="icon icon-hamburger" xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="3" y1="12" x2="21" y2="12"></line>
                                        <line x1="3" y1="6" x2="21" y2="6"></line>
                                        <line x1="3" y1="18" x2="21" y2="18"></line>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="search-wrapper">
                    <div className="container">
                        <form action="#" className="search-form d-flex align-items-center">
                            <button type="submit" className="search-submit bg-transparent pl-0 text-start">
                                <svg className="icon icon-search" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.75 0.250183C11.8838 0.250183 15.25 3.61639 15.25 7.75018C15.25 9.54608 14.6201 11.1926 13.5625 12.4846L19.5391 18.4611L18.4609 19.5392L12.4844 13.5627C11.1924 14.6203 9.5459 15.2502 7.75 15.2502C3.61621 15.2502 0.25 11.884 0.25 7.75018C0.25 3.61639 3.61621 0.250183 7.75 0.250183ZM7.75 1.75018C4.42773 1.75018 1.75 4.42792 1.75 7.75018C1.75 11.0724 4.42773 13.7502 7.75 13.7502C11.0723 13.7502 13.75 11.0724 13.75 7.75018C13.75 4.42792 11.0723 1.75018 7.75 1.75018Z"
                                        fill="black" />
                                </svg>
                            </button>
                            <div className="search-input mr-4">
                                <input type="text" placeholder="Search your products..." autoComplete="off"/>
                            </div>
                            <div className="search-close">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round" className="icon icon-close">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </header>

        {/* mobile menu */}
        <div className="offcanvas offcanvas-start d-flex d-lg-none" tabIndex="-1" id="drawer-menu">
            <div className="offcanvas-wrapper">
                <div className="offcanvas-header border-btm-black">
                    <h5 className="drawer-heading">Menu</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
                </div>
                <div className="offcanvas-body p-0 d-flex flex-column justify-content-between">
                    <nav className="site-navigation">
                        <ul className="main-menu list-unstyled">
                        {/* <li>{current_link}</li> */}

                        {current_link === "" ?
                                    (
                                        <>
                                        <li className="menu-list-item nav-item active" >
                                           <a className="nav-link" href="/">Accueil</a>
                                       </li>
                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/about">Nous</a>
                                       </li>
                                       <li className="menu-list-item nav-item has-dropdown">
                                 <div className="mega-menu-header">
                                    <a className="nav-link" href="/mannequins">
                                       Nos Models
                                    </a>
                                    <span className="open-submenu" onClick={() => handleOpenMenu(0)}>
                                                 <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                    </span>
                                </div>

                                <div className={`submenu-transform submenu-transform-desktop ${activeIndex === 0 ? 'active' : ''}`}>
                                    
                                        <div className="offcanvas-header border-btm-black">
                                            <h5 className="drawer-heading btn-menu-back d-flex align-items-center" onClick={() => handleOpenMenu(null)}>
                                                <svg className="icon icon-menu-back" xmlns="http://www.w3.org/2000/svg"
                                                    width="40" height="40" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round" >
                                                    <polyline points="15 18 9 12 15 6"></polyline>
                                                </svg>
                                                <span className="menu-back-text"> Nos Models</span>
                                            </h5>
                                        </div>
                                        <ul className="submenu list-unstyled">
                                        
                                                    <div className="">

                                                        <div className="">
                                                            <h6>Intégrer Afrodites</h6>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerMannequin">Devenir une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/postulerInfluenceur">Devenir une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/postulerHotesse">Devenir une host modele</a>
                                                            </li>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/postulerFranchise">Devenir une franchise d'Afrodite</a>
                                                            </li>


                                                        </div>

                                                        <div className="">
                                                            <h6>Trouver un modèle</h6>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/mannequins">Trouver une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/influenceur">Trouver une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/hodesse_accueil">Trouver une host modele</a>
                                                            </li>

                                                        </div>

                                                    </div>

                                        
                                       
                                                                                    
                                        </ul>
                                     
                                </div>
                               
                            </li>
                            
                            <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/evenements">
                                                        Events
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/franchises">
                                                        Nos Franchises
                                                    </a>
                                       </li>
                            <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/vlog">Vlog</a>
                             </li>
                             <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/parteners">Collabs</a>
                             </li>
                             {(user_info === undefined) || (user_info === null) ?
                                       
                                       (
                                        <>
                                            <li className="menu-list-item nav-item">
                                                <a className="nav-link" href="/login">connexion</a>
                                            </li>
                                        </>

                                       )

                                       :

                                       (
                                        <>
                                           <li className="menu-list-item nav-item has-dropdown">
                                            <div className="mega-menu-header">
                                            <a className="nav-link" href="#">{user_info?.pseudo}</a>
                                                        
                                                <span className="open-submenu" onClick={() => handleOpenMenu(3)}>
                                                            <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                                width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                                strokeLinejoin="round">
                                                                <polyline points="6 9 12 15 18 9"></polyline>
                                                            </svg>
                                                </span>
                                            </div>

                                            <div className={`submenu-transform submenu-transform-desktop ${activeIndex === 3 ? 'active' : ''}`}>
                                                
                                                    <div className="offcanvas-header border-btm-black">
                                                        <h5 className="drawer-heading btn-menu-back d-flex align-items-center" onClick={() => handleOpenMenu(null)}>
                                                            <svg className="icon icon-menu-back" xmlns="http://www.w3.org/2000/svg"
                                                                width="40" height="40" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                                strokeLinejoin="round" >
                                                                <polyline points="15 18 9 12 15 6"></polyline>
                                                            </svg>
                                                            <span className="menu-back-text">{user_info?.pseudo}</span>
                                                        </h5>
                                                    </div>
                                                    <ul className="submenu list-unstyled">
                                                        <li className="menu-list-item nav-item-sub">
                                                        <a className="nav-link-sub nav-text-sub" href="/profile">Mon profil
                                                        </a>
                                                            </li>
                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="#" onClick={auth.logout}>Déconnexion</a>
                                                                
                                                            </li>
                                                            

                                                
                                                    </ul>
                                                
                                            </div>
                                        
                                        </li>

                                        </>
                                       )
                                    }
                                        </>
                                    )

                                    :
                                    current_link === "home" ?
                                    ( 
                                        <>
                                        <li className="menu-list-item nav-item active" >
                                           <a className="nav-link" href="/">Accueil</a>
                                       </li>
                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/about">Nous</a>
                                       </li>
                                       <li className="menu-list-item nav-item has-dropdown">
                                 <div className="mega-menu-header">
                                    <a className="nav-link" href="/mannequins">
                                       Nos Models
                                    </a>
                                    <span className="open-submenu" onClick={() => handleOpenMenu(0)}>
                                                 <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                    </span>
                                </div>

                                <div className={`submenu-transform submenu-transform-desktop ${activeIndex === 0 ? 'active' : ''}`}>
                                    
                                        <div className="offcanvas-header border-btm-black">
                                            <h5 className="drawer-heading btn-menu-back d-flex align-items-center" onClick={() => handleOpenMenu(null)}>
                                                <svg className="icon icon-menu-back" xmlns="http://www.w3.org/2000/svg"
                                                    width="40" height="40" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round" >
                                                    <polyline points="15 18 9 12 15 6"></polyline>
                                                </svg>
                                                <span className="menu-back-text"> Nos Models</span>
                                            </h5>
                                        </div>
                                        <ul className="submenu list-unstyled">
                                        
                                                    <div className="">

                                                        <div className="">
                                                            <h6>Intégrer Afrodites</h6>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerMannequin">Devenir une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/postulerInfluenceur">Devenir une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/postulerHotesse">Devenir une host modele</a>
                                                            </li>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/postulerFranchise">Devenir une franchise d'Afrodite</a>
                                                            </li>


                                                        </div>

                                                        <div className="">
                                                            <h6>Trouver un modèle</h6>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/mannequins">Trouver une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/influenceur">Trouver une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/hodesse_accueil">Trouver une host modele</a>
                                                            </li>

                                                        </div>

                                                    </div>

                                        
                                       
                                                                                    
                                        </ul>
                                     
                                </div>
                               
                            </li>
                            
                            <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/evenements">
                                                        Events
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/franchises">
                                                        Nos Franchises
                                                    </a>
                                       </li>
                            <li className="menu-list-item nav-item" >
                                <a className="nav-link" href="/vlog">Vlog</a>
                             </li>
                             <li className="menu-list-item nav-item" >
                                    <a className="nav-link" href="/parteners">Collabs</a>
                             </li>
                             {(user_info === undefined) || (user_info === null) ?
                                       
                                       (
                                        <>
                                            <li className="menu-list-item nav-item">
                                                <a className="nav-link" href="/login">connexion</a>
                                            </li>
                                        </>

                                       )

                                       :

                                       (
                                        <>
                                           <li className="menu-list-item nav-item has-dropdown">
                                            <div className="mega-menu-header">
                                            <a className="nav-link" href="#">{user_info?.pseudo}</a>
                                                        
                                                <span className="open-submenu" onClick={() => handleOpenMenu(3)}>
                                                            <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                                width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                                strokeLinejoin="round">
                                                                <polyline points="6 9 12 15 18 9"></polyline>
                                                            </svg>
                                                </span>
                                            </div>

                                            <div className={`submenu-transform submenu-transform-desktop ${activeIndex === 3 ? 'active' : ''}`}>
                                                
                                                    <div className="offcanvas-header border-btm-black">
                                                        <h5 className="drawer-heading btn-menu-back d-flex align-items-center" onClick={() => handleOpenMenu(null)}>
                                                            <svg className="icon icon-menu-back" xmlns="http://www.w3.org/2000/svg"
                                                                width="40" height="40" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                                strokeLinejoin="round" >
                                                                <polyline points="15 18 9 12 15 6"></polyline>
                                                            </svg>
                                                            <span className="menu-back-text">{user_info?.pseudo}</span>
                                                        </h5>
                                                    </div>
                                                    <ul className="submenu list-unstyled">
                                                        <li className="menu-list-item nav-item-sub">
                                                        <a className="nav-link-sub nav-text-sub" href="/profile">Mon profil
                                                        </a>
                                                            </li>
                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="#" onClick={auth.logout}>Déconnexion</a>
                                                                
                                                            </li>
                                                            

                                                
                                                    </ul>
                                                
                                            </div>
                                        
                                        </li>

                                        </>
                                       )
                                    }
                                        </>

                                    )

                                    :
                                    current_link === "fashion models" ?
                                    ( 
                                        <>
                                        <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/">Accueil</a>
                                       </li>
                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/about">Nous</a>
                                       </li>
                                       <li className="menu-list-item nav-item has-dropdown active">
                                 <div className="mega-menu-header">
                                    <a className="nav-link" href="/mannequins">
                                       Nos Models
                                    </a>
                                    <span className="open-submenu" onClick={() => handleOpenMenu(0)}>
                                                 <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                    </span>
                                </div>

                                <div className={`submenu-transform submenu-transform-desktop ${activeIndex === 0 ? 'active' : ''}`}>
                                    
                                        <div className="offcanvas-header border-btm-black">
                                            <h5 className="drawer-heading btn-menu-back d-flex align-items-center" onClick={() => handleOpenMenu(null)}>
                                                <svg className="icon icon-menu-back" xmlns="http://www.w3.org/2000/svg"
                                                    width="40" height="40" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round" >
                                                    <polyline points="15 18 9 12 15 6"></polyline>
                                                </svg>
                                                <span className="menu-back-text"> Nos Models</span>
                                            </h5>
                                        </div>
                                        <ul className="submenu list-unstyled">
                                        
                                                    <div className="">

                                                        <div className="">
                                                            <h6>Intégrer Afrodites</h6>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerMannequin">Devenir une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/postulerInfluenceur">Devenir une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/postulerHotesse">Devenir une host modele</a>
                                                            </li>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/postulerFranchise">Devenir une franchise d'Afrodite</a>
                                                            </li>


                                                        </div>

                                                        <div className="">
                                                            <h6>Trouver un modèle</h6>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/mannequins">Trouver une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/influenceur">Trouver une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/hodesse_accueil">Trouver une host modele</a>
                                                            </li>

                                                        </div>

                                                    </div>

                                        
                                       
                                                                                    
                                        </ul>
                                     
                                </div>
                               
                            </li>
                            
                            <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/evenements">
                                                        Events
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/franchises">
                                                        Nos Franchises
                                                    </a>
                                       </li>
                            <li className="menu-list-item nav-item" >
                                <a className="nav-link" href="/vlog">Vlog</a>
                             </li>
                             <li className="menu-list-item nav-item" >
                                    <a className="nav-link" href="/parteners">Collabs</a>
                             </li>
                             {(user_info === undefined) || (user_info === null) ?
                                       
                                       (
                                        <>
                                            <li className="menu-list-item nav-item">
                                                <a className="nav-link" href="/login">connexion</a>
                                            </li>
                                        </>

                                       )

                                       :

                                       (
                                        <>
                                           <li className="menu-list-item nav-item has-dropdown">
                                            <div className="mega-menu-header">
                                            <a className="nav-link" href="#">{user_info?.pseudo}</a>
                                                        
                                                <span className="open-submenu" onClick={() => handleOpenMenu(3)}>
                                                            <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                                width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                                strokeLinejoin="round">
                                                                <polyline points="6 9 12 15 18 9"></polyline>
                                                            </svg>
                                                </span>
                                            </div>

                                            <div className={`submenu-transform submenu-transform-desktop ${activeIndex === 3 ? 'active' : ''}`}>
                                                
                                                    <div className="offcanvas-header border-btm-black">
                                                        <h5 className="drawer-heading btn-menu-back d-flex align-items-center" onClick={() => handleOpenMenu(null)}>
                                                            <svg className="icon icon-menu-back" xmlns="http://www.w3.org/2000/svg"
                                                                width="40" height="40" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                                strokeLinejoin="round" >
                                                                <polyline points="15 18 9 12 15 6"></polyline>
                                                            </svg>
                                                            <span className="menu-back-text">{user_info?.pseudo}</span>
                                                        </h5>
                                                    </div>
                                                    <ul className="submenu list-unstyled">
                                                        <li className="menu-list-item nav-item-sub">
                                                        <a className="nav-link-sub nav-text-sub" href="/profile">Mon profil
                                                        </a>
                                                            </li>
                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="#" onClick={auth.logout}>Déconnexion</a>
                                                                
                                                            </li>
                                                            

                                                
                                                    </ul>
                                                
                                            </div>
                                        
                                        </li>

                                        </>
                                       )
                                    }
                                        </>

                                    )

                                    :
                                    current_link === "host models" ?
                                    ( 
                                        <>
                                        <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/">Accueil</a>
                                       </li>

                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/about">Nous</a>
                                       </li>

                                       <li className="menu-list-item nav-item has-dropdown active">
                                 <div className="mega-menu-header">
                                    <a className="nav-link" href="/mannequins">
                                       Nos Models
                                    </a>
                                    <span className="open-submenu" onClick={() => handleOpenMenu(0)}>
                                                 <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                    </span>
                                </div>

                                <div className={`submenu-transform submenu-transform-desktop ${activeIndex === 0 ? 'active' : ''}`}>
                                    
                                        <div className="offcanvas-header border-btm-black">
                                            <h5 className="drawer-heading btn-menu-back d-flex align-items-center" onClick={() => handleOpenMenu(null)}>
                                                <svg className="icon icon-menu-back" xmlns="http://www.w3.org/2000/svg"
                                                    width="40" height="40" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round" >
                                                    <polyline points="15 18 9 12 15 6"></polyline>
                                                </svg>
                                                <span className="menu-back-text"> Nos Models</span>
                                            </h5>
                                        </div>
                                        <ul className="submenu list-unstyled">
                                        
                                        <div className="">

                                            <div className="">
                                                <h6>Intégrer Afrodites</h6>

                                                <li className="menu-list-item nav-item-sub">
                                                    <a className="nav-link-sub nav-text-sub drop" href="/postulerMannequin">Devenir une fashion modèle</a>
                                                </li>

                                                <li className="menu-list-item nav-item-sub">
                                                    <a className="nav-link-sub nav-text-sub" href="/postulerInfluenceur">Devenir une role modele</a>
                                                </li>
                                                

                                                <li className="menu-list-item nav-item-sub">
                                                    <a className="nav-link-sub nav-text-sub" href="/postulerHotesse">Devenir une host modele</a>
                                                </li>


                                                <li className="menu-list-item nav-item-sub">
                                                    <a className="nav-link-sub nav-text-sub" href="/postulerFranchise">Devenir une franchise d'Afrodite</a>
                                                </li>


                                            </div>

                                            <div className="">
                                                <h6>Trouver un modèle</h6>


                                                <li className="menu-list-item nav-item-sub">
                                                    <a className="nav-link-sub nav-text-sub" href="/mannequins">Trouver une fashion modèle</a>
                                                </li>

                                                <li className="menu-list-item nav-item-sub">
                                                    <a className="nav-link-sub nav-text-sub" href="/influenceur">Trouver une role modele</a>
                                                </li>
                                                

                                                <li className="menu-list-item nav-item-sub">
                                                    <a className="nav-link-sub nav-text-sub" href="/hodesse_accueil">Trouver une host modele</a>
                                                </li>

                                            </div>

                                        </div>

                            
                           
                                                                        
                            </ul>
                                     
                                </div>
                               
                            </li>
                            
                            <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/evenements">
                                                        Events
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/franchises">
                                                        Nos Franchises
                                                    </a>
                                       </li>
                            <li className="menu-list-item nav-item" >
                                    <a className="nav-link" href="/vlog">Vlog</a>
                             </li>
                             <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/parteners">Collabs</a>
                             </li>
                             {(user_info === undefined) || (user_info === null) ?
                                       
                                       (
                                        <>
                                            <li className="menu-list-item nav-item">
                                                <a className="nav-link" href="/login">connexion</a>
                                            </li>
                                        </>

                                       )

                                       :

                                       (
                                        <>
                                           <li className="menu-list-item nav-item has-dropdown">
                                            <div className="mega-menu-header">
                                            <a className="nav-link" href="#">{user_info?.pseudo}</a>
                                                        
                                                <span className="open-submenu" onClick={() => handleOpenMenu(3)}>
                                                            <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                                width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                                strokeLinejoin="round">
                                                                <polyline points="6 9 12 15 18 9"></polyline>
                                                            </svg>
                                                </span>
                                            </div>

                                            <div className={`submenu-transform submenu-transform-desktop ${activeIndex === 3 ? 'active' : ''}`}>
                                                
                                                    <div className="offcanvas-header border-btm-black">
                                                        <h5 className="drawer-heading btn-menu-back d-flex align-items-center" onClick={() => handleOpenMenu(null)}>
                                                            <svg className="icon icon-menu-back" xmlns="http://www.w3.org/2000/svg"
                                                                width="40" height="40" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                                strokeLinejoin="round" >
                                                                <polyline points="15 18 9 12 15 6"></polyline>
                                                            </svg>
                                                            <span className="menu-back-text">{user_info?.pseudo}</span>
                                                        </h5>
                                                    </div>
                                                    <ul className="submenu list-unstyled">
                                                        <li className="menu-list-item nav-item-sub">
                                                        <a className="nav-link-sub nav-text-sub" href="/profile">Mon profil
                                                        </a>
                                                            </li>
                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="#" onClick={auth.logout}>Déconnexion</a>
                                                                
                                                            </li>
                                                            

                                                
                                                    </ul>
                                                
                                            </div>
                                        
                                        </li>

                                        </>
                                       )
                                    }
                                        </>

                                    )

                                     :
                                    current_link === "role models" ?
                                    ( 
                                        <>
                                        <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/">Accueil</a>
                                       </li>
                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/about">Nous</a>
                                       </li>

                                       <li className="menu-list-item nav-item has-dropdown active">
                                 <div className="mega-menu-header">
                                    <a className="nav-link" href="/mannequins">
                                       Nos Models
                                    </a>
                                    <span className="open-submenu" onClick={() => handleOpenMenu(0)}>
                                                 <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                    </span>
                                </div>

                                <div className={`submenu-transform submenu-transform-desktop ${activeIndex === 0 ? 'active' : ''}`}>
                                    
                                        <div className="offcanvas-header border-btm-black">
                                            <h5 className="drawer-heading btn-menu-back d-flex align-items-center" onClick={() => handleOpenMenu(null)}>
                                                <svg className="icon icon-menu-back" xmlns="http://www.w3.org/2000/svg"
                                                    width="40" height="40" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round" >
                                                    <polyline points="15 18 9 12 15 6"></polyline>
                                                </svg>
                                                <span className="menu-back-text"> Nos Models</span>
                                            </h5>
                                        </div>
                                        <ul className="submenu list-unstyled">
                                        
                                        <div className="">

                                            <div className="">
                                                <h6>Intégrer Afrodites</h6>

                                                <li className="menu-list-item nav-item-sub">
                                                    <a className="nav-link-sub nav-text-sub drop" href="/postulerMannequin">Devenir une fashion modèle</a>
                                                </li>

                                                <li className="menu-list-item nav-item-sub">
                                                    <a className="nav-link-sub nav-text-sub" href="/postulerInfluenceur">Devenir une role modele</a>
                                                </li>
                                                

                                                <li className="menu-list-item nav-item-sub">
                                                    <a className="nav-link-sub nav-text-sub" href="/postulerHotesse">Devenir une host modele</a>
                                                </li>


                                                <li className="menu-list-item nav-item-sub">
                                                    <a className="nav-link-sub nav-text-sub" href="/postulerFranchise">Devenir une franchise d'Afrodite</a>
                                                </li>


                                            </div>

                                            <div className="">
                                                <h6>Trouver un modèle</h6>


                                                <li className="menu-list-item nav-item-sub">
                                                    <a className="nav-link-sub nav-text-sub" href="/mannequins">Trouver une fashion modèle</a>
                                                </li>

                                                <li className="menu-list-item nav-item-sub active">
                                                    <a className="nav-link-sub nav-text-sub" href="/influenceur">Trouver une role modele</a>
                                                </li>
                                                

                                                <li className="menu-list-item nav-item-sub">
                                                    <a className="nav-link-sub nav-text-sub" href="/hodesse_accueil">Trouver une host modele</a>
                                                </li>

                                            </div>

                                        </div>

                            
                           
                                                                        
                            </ul>
                                     
                                </div>
                               
                            </li>
                            
                            <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/evenements">
                                                        Events
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/franchises">
                                                        Nos Franchises
                                                    </a>
                                       </li>
                            <li className="menu-list-item nav-item" >
                                    <a className="nav-link" href="/vlog">Vlog</a>
                             </li>
                             <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/parteners">Collabs</a>
                             </li>
                             {(user_info === undefined) || (user_info === null) ?
                                       
                                       (
                                        <>
                                            <li className="menu-list-item nav-item">
                                                <a className="nav-link" href="/login">connexion</a>
                                            </li>
                                        </>

                                       )

                                       :

                                       (
                                        <>
                                           <li className="menu-list-item nav-item has-dropdown">
                                            <div className="mega-menu-header">
                                            <a className="nav-link" href="#">{user_info?.pseudo}</a>
                                                        
                                                <span className="open-submenu" onClick={() => handleOpenMenu(3)}>
                                                            <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                                width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                                strokeLinejoin="round">
                                                                <polyline points="6 9 12 15 18 9"></polyline>
                                                            </svg>
                                                </span>
                                            </div>

                                            <div className={`submenu-transform submenu-transform-desktop ${activeIndex === 3 ? 'active' : ''}`}>
                                                
                                                    <div className="offcanvas-header border-btm-black">
                                                        <h5 className="drawer-heading btn-menu-back d-flex align-items-center" onClick={() => handleOpenMenu(null)}>
                                                            <svg className="icon icon-menu-back" xmlns="http://www.w3.org/2000/svg"
                                                                width="40" height="40" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                                strokeLinejoin="round" >
                                                                <polyline points="15 18 9 12 15 6"></polyline>
                                                            </svg>
                                                            <span className="menu-back-text">{user_info?.pseudo}</span>
                                                        </h5>
                                                    </div>
                                                    <ul className="submenu list-unstyled">
                                                        <li className="menu-list-item nav-item-sub">
                                                        <a className="nav-link-sub nav-text-sub" href="/profile">Mon profil
                                                        </a>
                                                            </li>
                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="#" onClick={auth.logout}>Déconnexion</a>
                                                                
                                                            </li>
                                                            

                                                
                                                    </ul>
                                                
                                            </div>
                                        
                                        </li>

                                        </>
                                       )
                                    }
                                        </>

                                    )

                                    :
                                    current_link === "events" ?
                                    ( 
                                      
                                        <>
                                        <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/">Accueil</a>
                                       </li>
                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/about">Nous</a>
                                       </li>
                                       <li className="menu-list-item nav-item has-dropdown">
                                 <div className="mega-menu-header">
                                    <a className="nav-link" href="/mannequins">
                                       Nos Models
                                    </a>
                                    <span className="open-submenu" onClick={() => handleOpenMenu(0)}>
                                                 <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                    </span>
                                </div>

                                <div className={`submenu-transform submenu-transform-desktop ${activeIndex === 0 ? 'active' : ''}`}>
                                    
                                        <div className="offcanvas-header border-btm-black">
                                            <h5 className="drawer-heading btn-menu-back d-flex align-items-center" onClick={() => handleOpenMenu(null)}>
                                                <svg className="icon icon-menu-back" xmlns="http://www.w3.org/2000/svg"
                                                    width="40" height="40" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round" >
                                                    <polyline points="15 18 9 12 15 6"></polyline>
                                                </svg>
                                                <span className="menu-back-text"> Nos Models</span>
                                            </h5>
                                        </div>
                                        <ul className="submenu list-unstyled">
                                        
                                                    <div className="">

                                                        <div className="">
                                                            <h6>Intégrer Afrodites</h6>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerMannequin">Devenir une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/postulerInfluenceur">Devenir une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/postulerHotesse">Devenir une host modele</a>
                                                            </li>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/postulerFranchise">Devenir une franchise d'Afrodite</a>
                                                            </li>


                                                        </div>

                                                        <div className="">
                                                            <h6>Trouver un modèle</h6>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/mannequins">Trouver une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/influenceur">Trouver une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/hodesse_accueil">Trouver une host modele</a>
                                                            </li>

                                                        </div>

                                                    </div>

                                        
                                       
                                                                                    
                                        </ul>
                                     
                                </div>
                               
                            </li>
                            
                            <li className="menu-list-item nav-item active" >
                                              <a className="nav-link" href="/evenements">
                                                        Events
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/franchises">
                                                        Nos Franchises
                                                    </a>
                                       </li>
                            <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/vlog">Vlog</a>
                             </li>
                             <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/parteners">Collabs</a>
                             </li>
                             {(user_info === undefined) || (user_info === null) ?
                                       
                                       (
                                        <>
                                            <li className="menu-list-item nav-item">
                                                <a className="nav-link" href="/login">connexion</a>
                                            </li>
                                        </>

                                       )

                                       :

                                       (
                                        <>
                                        <li className="menu-list-item nav-item has-dropdown">
                                         <div className="mega-menu-header">
                                         <a className="nav-link" href="#">{user_info?.pseudo}</a>
                                                     
                                             <span className="open-submenu" onClick={() => handleOpenMenu(3)}>
                                                         <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                             width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                             stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                             strokeLinejoin="round">
                                                             <polyline points="6 9 12 15 18 9"></polyline>
                                                         </svg>
                                             </span>
                                         </div>

                                         <div className={`submenu-transform submenu-transform-desktop ${activeIndex === 3 ? 'active' : ''}`}>
                                             
                                                 <div className="offcanvas-header border-btm-black">
                                                     <h5 className="drawer-heading btn-menu-back d-flex align-items-center" onClick={() => handleOpenMenu(null)}>
                                                         <svg className="icon icon-menu-back" xmlns="http://www.w3.org/2000/svg"
                                                             width="40" height="40" viewBox="0 0 24 24" fill="none"
                                                             stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                             strokeLinejoin="round" >
                                                             <polyline points="15 18 9 12 15 6"></polyline>
                                                         </svg>
                                                         <span className="menu-back-text">{user_info?.pseudo}</span>
                                                     </h5>
                                                 </div>
                                                 <ul className="submenu list-unstyled">
                                                     <li className="menu-list-item nav-item-sub">
                                                     <a className="nav-link-sub nav-text-sub" href="/profile">Mon profil
                                                     </a>
                                                         </li>
                                                         <li className="menu-list-item nav-item-sub">
                                                             <a className="nav-link-sub nav-text-sub" href="#" onClick={auth.logout}>Déconnexion</a>
                                                             
                                                         </li>
                                                         

                                             
                                                 </ul>
                                             
                                         </div>
                                     
                                     </li>

                                     </>
                                       )

                                    }
                                        </>

                                    )

                                      :
                                    current_link === "collabs" ?
                                    ( 
                                      
                                        <>
                                        <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/">Accueil</a>
                                       </li>
                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/about">Nous</a>
                                       </li>
                                       <li className="menu-list-item nav-item has-dropdown">
                                 <div className="mega-menu-header">
                                    <a className="nav-link" href="/mannequins">
                                       Nos Models
                                    </a>
                                    <span className="open-submenu" onClick={() => handleOpenMenu(0)}>
                                                 <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                    </span>
                                </div>

                                <div className={`submenu-transform submenu-transform-desktop ${activeIndex === 0 ? 'active' : ''}`}>
                                    
                                        <div className="offcanvas-header border-btm-black">
                                            <h5 className="drawer-heading btn-menu-back d-flex align-items-center" onClick={() => handleOpenMenu(null)}>
                                                <svg className="icon icon-menu-back" xmlns="http://www.w3.org/2000/svg"
                                                    width="40" height="40" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round" >
                                                    <polyline points="15 18 9 12 15 6"></polyline>
                                                </svg>
                                                <span className="menu-back-text"> Nos Models</span>
                                            </h5>
                                        </div>
                                        <ul className="submenu list-unstyled">
                                        
                                                    <div className="">

                                                        <div className="">
                                                            <h6>Intégrer Afrodites</h6>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerMannequin">Devenir une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/postulerInfluenceur">Devenir une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/postulerHotesse">Devenir une host modele</a>
                                                            </li>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/postulerFranchise">Devenir une franchise d'Afrodite</a>
                                                            </li>


                                                        </div>

                                                        <div className="">
                                                            <h6>Trouver un modèle</h6>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/mannequins">Trouver une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/influenceur">Trouver une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/hodesse_accueil">Trouver une host modele</a>
                                                            </li>

                                                        </div>

                                                    </div>

                                        
                                       
                                                                                    
                                        </ul>
                                     
                                </div>
                               
                            </li>
                            
                            <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/evenements">
                                                        Events
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/franchises">
                                                        Nos Franchises
                                                    </a>
                                       </li>
                            <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/vlog">Vlog</a>
                             </li>
                             <li className="menu-list-item nav-item active" >
                                           <a className="nav-link" href="/parteners">Collabs</a>
                             </li>
                             {(user_info === undefined) || (user_info === null) ?
                                       
                                       (
                                        <>
                                            <li className="menu-list-item nav-item">
                                                <a className="nav-link" href="/login">connexion</a>
                                            </li>
                                        </>

                                       )
                                       
                                       :

                                       (
                                        <>
                                        <li className="menu-list-item nav-item has-dropdown">
                                         <div className="mega-menu-header">
                                         <a className="nav-link" href="#">{user_info?.pseudo}</a>
                                                     
                                             <span className="open-submenu" onClick={() => handleOpenMenu(3)}>
                                                         <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                             width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                             stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                             strokeLinejoin="round">
                                                             <polyline points="6 9 12 15 18 9"></polyline>
                                                         </svg>
                                             </span>
                                         </div>

                                         <div className={`submenu-transform submenu-transform-desktop ${activeIndex === 3 ? 'active' : ''}`}>
                                             
                                                 <div className="offcanvas-header border-btm-black">
                                                     <h5 className="drawer-heading btn-menu-back d-flex align-items-center" onClick={() => handleOpenMenu(null)}>
                                                         <svg className="icon icon-menu-back" xmlns="http://www.w3.org/2000/svg"
                                                             width="40" height="40" viewBox="0 0 24 24" fill="none"
                                                             stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                             strokeLinejoin="round" >
                                                             <polyline points="15 18 9 12 15 6"></polyline>
                                                         </svg>
                                                         <span className="menu-back-text">{user_info?.pseudo}</span>
                                                     </h5>
                                                 </div>
                                                 <ul className="submenu list-unstyled">
                                                     <li className="menu-list-item nav-item-sub">
                                                     <a className="nav-link-sub nav-text-sub" href="/profile">Mon profil
                                                     </a>
                                                         </li>
                                                         <li className="menu-list-item nav-item-sub">
                                                             <a className="nav-link-sub nav-text-sub" href="#" onClick={auth.logout}>Déconnexion</a>
                                                             
                                                         </li>
                                                         

                                             
                                                 </ul>
                                             
                                         </div>
                                     
                                     </li>

                                     </>
                                       )

                                    }
                                        </>

                                    ) : current_link === 'vlogs' ?(

                                        
                                          
                                        <>
                                        <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/">Accueil</a>
                                       </li>
                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/about">Nous</a>
                                       </li>
                                       <li className="menu-list-item nav-item has-dropdown">
                                 <div className="mega-menu-header">
                                    <a className="nav-link" href="/mannequins">
                                       Nos Models
                                    </a>
                                    <span className="open-submenu" onClick={() => handleOpenMenu(0)}>
                                                 <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                    </span>
                                </div>

                                <div className={`submenu-transform submenu-transform-desktop ${activeIndex === 0 ? 'active' : ''}`}>
                                    
                                        <div className="offcanvas-header border-btm-black">
                                            <h5 className="drawer-heading btn-menu-back d-flex align-items-center" onClick={() => handleOpenMenu(null)}>
                                                <svg className="icon icon-menu-back" xmlns="http://www.w3.org/2000/svg"
                                                    width="40" height="40" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round" >
                                                    <polyline points="15 18 9 12 15 6"></polyline>
                                                </svg>
                                                <span className="menu-back-text"> Nos Models</span>
                                            </h5>
                                        </div>
                                        <ul className="submenu list-unstyled">
                                        
                                                    <div className="">

                                                        <div className="">
                                                            <h6>Intégrer Afrodites</h6>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerMannequin">Devenir une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/postulerInfluenceur">Devenir une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/postulerHotesse">Devenir une host modele</a>
                                                            </li>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/postulerFranchise">Devenir une franchise d'Afrodite</a>
                                                            </li>


                                                        </div>

                                                        <div className="">
                                                            <h6>Trouver un modèle</h6>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/mannequins">Trouver une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/influenceur">Trouver une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/hodesse_accueil">Trouver une host modele</a>
                                                            </li>

                                                        </div>

                                                    </div>

                                        
                                       
                                                                                    
                                        </ul>
                                     
                                </div>
                               
                            </li>
                            
                            <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/evenements">
                                                        Events
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/franchises">
                                                        Nos Franchises
                                                    </a>
                                       </li>
                            <li className="menu-list-item nav-item active" >
                                           <a className="nav-link" href="/vlog">Vlog</a>
                             </li>
                             <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/parteners">Collabs</a>
                             </li>
                             {(user_info === undefined) || (user_info === null) ?
                                       
                                       (
                                        <>
                                            <li className="menu-list-item nav-item">
                                                <a className="nav-link" href="/login">connexion</a>
                                            </li>
                                        </>

                                       )
                                       
                                       :

                                       (
                                        <>
                                        <li className="menu-list-item nav-item has-dropdown">
                                         <div className="mega-menu-header">
                                         <a className="nav-link" href="#">{user_info?.pseudo}</a>
                                                     
                                             <span className="open-submenu" onClick={() => handleOpenMenu(3)}>
                                                         <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                             width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                             stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                             strokeLinejoin="round">
                                                             <polyline points="6 9 12 15 18 9"></polyline>
                                                         </svg>
                                             </span>
                                         </div>

                                         <div className={`submenu-transform submenu-transform-desktop ${activeIndex === 3 ? 'active' : ''}`}>
                                             
                                                 <div className="offcanvas-header border-btm-black">
                                                     <h5 className="drawer-heading btn-menu-back d-flex align-items-center" onClick={() => handleOpenMenu(null)}>
                                                         <svg className="icon icon-menu-back" xmlns="http://www.w3.org/2000/svg"
                                                             width="40" height="40" viewBox="0 0 24 24" fill="none"
                                                             stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                             strokeLinejoin="round" >
                                                             <polyline points="15 18 9 12 15 6"></polyline>
                                                         </svg>
                                                         <span className="menu-back-text">{user_info?.pseudo}</span>
                                                     </h5>
                                                 </div>
                                                 <ul className="submenu list-unstyled">
                                                     <li className="menu-list-item nav-item-sub">
                                                     <a className="nav-link-sub nav-text-sub" href="/profile">Mon profil
                                                     </a>
                                                         </li>
                                                         <li className="menu-list-item nav-item-sub">
                                                             <a className="nav-link-sub nav-text-sub" href="#" onClick={auth.logout}>Déconnexion</a>
                                                             
                                                         </li>
                                                         

                                             
                                                 </ul>
                                             
                                         </div>
                                     
                                     </li>

                                     </>
                                       )

                                    }
                                        </>

                                    )

                                    : current_link === 'about' ?
                                    (

                                        <>
                                        <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/">Accueil</a>
                                       </li>
                                       <li className="menu-list-item nav-item active" >
                                           <a className="nav-link" href="/about">Nous</a>
                                       </li>
                                       <li className="menu-list-item nav-item has-dropdown">
                                 <div className="mega-menu-header">
                                    <a className="nav-link" href="/mannequins">
                                       Nos Models
                                    </a>
                                    <span className="open-submenu" onClick={() => handleOpenMenu(0)}>
                                                 <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                    </span>
                                </div>

                                <div className={`submenu-transform submenu-transform-desktop ${activeIndex === 0 ? 'active' : ''}`}>
                                    
                                        <div className="offcanvas-header border-btm-black">
                                            <h5 className="drawer-heading btn-menu-back d-flex align-items-center" onClick={() => handleOpenMenu(null)}>
                                                <svg className="icon icon-menu-back" xmlns="http://www.w3.org/2000/svg"
                                                    width="40" height="40" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round" >
                                                    <polyline points="15 18 9 12 15 6"></polyline>
                                                </svg>
                                                <span className="menu-back-text"> Nos Models</span>
                                            </h5>
                                        </div>
                                        <ul className="submenu list-unstyled">
                                        
                                                    <div className="">

                                                        <div className="">
                                                            <h6>Intégrer Afrodites</h6>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerMannequin">Devenir une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/postulerInfluenceur">Devenir une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/postulerHotesse">Devenir une host modele</a>
                                                            </li>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/postulerFranchise">Devenir une franchise d'Afrodite</a>
                                                            </li>


                                                        </div>

                                                        <div className="">
                                                            <h6>Trouver un modèle</h6>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/mannequins">Trouver une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/influenceur">Trouver une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/hodesse_accueil">Trouver une host modele</a>
                                                            </li>

                                                        </div>

                                                    </div>

                                        
                                       
                                                                                    
                                        </ul>
                                     
                                </div>
                               
                            </li>
                            
                            <li className="menu-list-item nav-item" >
                                              <a className="nav-link" href="/evenements">
                                                        Events
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item" >
                                              <a className="nav-link" href="/franchises">
                                                        Nos Franchises
                                                    </a>
                                       </li>
                            <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/vlog">Vlog</a>
                             </li>
                             <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/parteners">Collabs</a>
                             </li>
                             {(user_info === undefined) || (user_info === null) ?
                                       
                                       (
                                        <>
                                            <li className="menu-list-item nav-item">
                                                <a className="nav-link" href="/login">connexion</a>
                                            </li>
                                        </>

                                       )
                                       
                                       :

                                       (
                                        <>
                                        <li className="menu-list-item nav-item has-dropdown">
                                         <div className="mega-menu-header">
                                         <a className="nav-link" href="#">{user_info?.pseudo}</a>
                                                     
                                             <span className="open-submenu" onClick={() => handleOpenMenu(3)}>
                                                         <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                             width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                             stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                             strokeLinejoin="round">
                                                             <polyline points="6 9 12 15 18 9"></polyline>
                                                         </svg>
                                             </span>
                                         </div>

                                         <div className={`submenu-transform submenu-transform-desktop ${activeIndex === 3 ? 'active' : ''}`}>
                                             
                                                 <div className="offcanvas-header border-btm-black">
                                                     <h5 className="drawer-heading btn-menu-back d-flex align-items-center" onClick={() => handleOpenMenu(null)}>
                                                         <svg className="icon icon-menu-back" xmlns="http://www.w3.org/2000/svg"
                                                             width="40" height="40" viewBox="0 0 24 24" fill="none"
                                                             stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                             strokeLinejoin="round" >
                                                             <polyline points="15 18 9 12 15 6"></polyline>
                                                         </svg>
                                                         <span className="menu-back-text">{user_info?.pseudo}</span>
                                                     </h5>
                                                 </div>
                                                 <ul className="submenu list-unstyled">
                                                     <li className="menu-list-item nav-item-sub">
                                                     <a className="nav-link-sub nav-text-sub" href="/profile">Mon profil
                                                     </a>
                                                         </li>
                                                         <li className="menu-list-item nav-item-sub">
                                                             <a className="nav-link-sub nav-text-sub" href="#" onClick={auth.logout}>Déconnexion</a>
                                                             
                                                         </li>
                                                         

                                             
                                                 </ul>
                                             
                                         </div>
                                     
                                     </li>

                                     </>
                                       )

                                    }
                                        </>


                                    )
                                    
                                    :
                                    (
                                        <>
                                        <li className="menu-list-item nav-item active" >
                                           <a className="nav-link" href="/">Accueil</a>
                                       </li>
                                       <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/about">Nous</a>
                                       </li>
                                       <li className="menu-list-item nav-item has-dropdown">
                                 <div className="mega-menu-header">
                                    <a className="nav-link" href="/mannequins">
                                       Nos Models
                                    </a>
                                    <span className="open-submenu" onClick={() => handleOpenMenu(0)}>
                                                 <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                    </span>
                                </div>

                                <div className={`submenu-transform submenu-transform-desktop ${activeIndex === 0 ? 'active' : ''}`}>
                                    
                                        <div className="offcanvas-header border-btm-black">
                                            <h5 className="drawer-heading btn-menu-back d-flex align-items-center" onClick={() => handleOpenMenu(null)}>
                                                <svg className="icon icon-menu-back" xmlns="http://www.w3.org/2000/svg"
                                                    width="40" height="40" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round" >
                                                    <polyline points="15 18 9 12 15 6"></polyline>
                                                </svg>
                                                <span className="menu-back-text"> Nos Models</span>
                                            </h5>
                                        </div>
                                        <ul className="submenu list-unstyled">
                                        
                                                    <div className="">

                                                        <div className="">
                                                            <h6>Intégrer Afrodites</h6>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub drop" href="/postulerMannequin">Devenir une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/postulerInfluenceur">Devenir une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/postulerHotesse">Devenir une host modele</a>
                                                            </li>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/postulerFranchise">Devenir une franchise d'Afrodite</a>
                                                            </li>


                                                        </div>

                                                        <div className="">
                                                            <h6>Trouver un modèle</h6>


                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/mannequins">Trouver une fashion modèle</a>
                                                            </li>

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/influenceur">Trouver une role modele</a>
                                                            </li>
                                                            

                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="/hodesse_accueil">Trouver une host modele</a>
                                                            </li>

                                                        </div>

                                                    </div>

                                        
                                       
                                                                                    
                                        </ul>
                                     
                                </div>
                               
                            </li>
                            
                            <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/evenements">
                                                        Events
                                                    </a>
                                       </li>
                                       <li className="menu-list-item nav-item " >
                                              <a className="nav-link" href="/franchises">
                                                        Nos Franchises
                                                    </a>
                                       </li>
                            <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/vlog">Vlog</a>
                             </li>
                             <li className="menu-list-item nav-item" >
                                           <a className="nav-link" href="/parteners">Collabs</a>
                             </li>
                             {(user_info === undefined) || (user_info === null) ?
                                       
                                       (
                                        <>
                                            <li className="menu-list-item nav-item">
                                                <a className="nav-link" href="/login">connexion</a>
                                            </li>
                                        </>

                                       )

                                       :

                                       (
                                        <>
                                           <li className="menu-list-item nav-item has-dropdown">
                                            <div className="mega-menu-header">
                                            <a className="nav-link" href="#">{user_info?.pseudo}</a>
                                                        
                                                <span className="open-submenu" onClick={() => handleOpenMenu(3)}>
                                                            <svg className="icon icon-dropdown" xmlns="http://www.w3.org/2000/svg"
                                                                width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                                strokeLinejoin="round">
                                                                <polyline points="6 9 12 15 18 9"></polyline>
                                                            </svg>
                                                </span>
                                            </div>

                                            <div className={`submenu-transform submenu-transform-desktop ${activeIndex === 3 ? 'active' : ''}`}>
                                                
                                                    <div className="offcanvas-header border-btm-black">
                                                        <h5 className="drawer-heading btn-menu-back d-flex align-items-center" onClick={() => handleOpenMenu(null)}>
                                                            <svg className="icon icon-menu-back" xmlns="http://www.w3.org/2000/svg"
                                                                width="40" height="40" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                                strokeLinejoin="round" >
                                                                <polyline points="15 18 9 12 15 6"></polyline>
                                                            </svg>
                                                            <span className="menu-back-text">{user_info?.pseudo}</span>
                                                        </h5>
                                                    </div>
                                                    <ul className="submenu list-unstyled">
                                                        <li className="menu-list-item nav-item-sub">
                                                        <a className="nav-link-sub nav-text-sub" href="/profile">Mon profil
                                                        </a>
                                                            </li>
                                                            <li className="menu-list-item nav-item-sub">
                                                                <a className="nav-link-sub nav-text-sub" href="#" onClick={auth.logout}>Déconnexion</a>
                                                                
                                                            </li>
                                                            

                                                
                                                    </ul>
                                                
                                            </div>
                                        
                                        </li>

                                        </>
                                       )
                                    }
                                        </>
                                    )
                                    }


                             
                        </ul>

                        <div className="footer-nav">

                        </div>

                        <Footer/>
                    </nav>

              
                </div>
            </div>
        </div>

    
    </>
  )
}

export default Header_banner

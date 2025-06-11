// import React from 'react'
import Hero from './Hero'

import axios from "axios";
// import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import  { useEffect, useState  } from 'react'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronLeft, faChevronRight, faL } from '@fortawesome/free-solid-svg-icons';
// import Parteners from './Parteners';
import { Link } from 'react-router-dom';

import { FaChevronUp, FaChevronRight, FaChevronDown } from 'react-icons/fa';

// import { Link } from 'react-router-dom';

function MainContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const location = useLocation();

  // Fonction pour ouvrir un modal
  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
    // Ajouter un hash dans l'URL
    window.history.pushState(null, '', `#${content}`);
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
    // Supprimer le hash dans l'URL
    window.history.pushState(null, '', location.pathname);
  };

  // Surveillance du changement d'URL (pour détecter le bouton retour du navigateur)
  useEffect(() => {
    const handlePopState = () => {
      if (isModalOpen) {
        closeModal();
      }
    };
    
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isModalOpen, location]);

   
    const [fashion_models , setfashion_models] = useState([]);
    const [role_models , setrole_models] = useState([]);
    const [host_models , sethost_models] = useState([]);
    const [parteners , setParteners] = useState([]);
    const apiUrl = 'https://apiafro.aafrodites.com'

    const [mannequins_data , setmannequins_data] = useState([]);
    const [hotesses_data , sethotesses_data] = useState([]);
    const [infs_data , setinfs_data] = useState([]);
    const [collabs_data , setcollabs_data] = useState([]);

    const [maquilleurs_data , setmaquilleurs_data] = useState([]);
    const [photographes_data , setphotographes_data] = useState([]);
    const [stylistes_data , setstylistes_data] = useState([]);
    const [coiffeurs_data , setcoiffeurs_data] = useState([]);
    const [boutique_data , setboutique_data] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const [rep1, rep2, rep3, rep4] = await Promise.all([
                axios.post(`${apiUrl}/fashion_model/list_mannequin`),
                axios.post(`${apiUrl}/role_model/liste_influenceur`),
                axios.post(`${apiUrl}/host_model/liste_hotesses`),
                axios.post(`${apiUrl}/collabs/liste_collabs`),
            ]);
            setmannequins_data(rep1.data);
            setinfs_data(rep2.data);
            sethotesses_data(rep3.data);
            setcollabs_data(rep4.data);
          } catch (err) {
            console.error("Erreur lors de la récupération des données :", err);
          }
        };
        fetchData();
      }, []);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const [rep1, rep2, rep3, rep4] = await Promise.all([
                axios.post(`${apiUrl}/collabs/all_maquilleurs`),
                axios.post(`${apiUrl}/collabs/all_photographes`),
                axios.post(`${apiUrl}/collabs/all_stylistes`),
                axios.post(`${apiUrl}/collabs/all_coiffeur`),
            ]);
            setmaquilleurs_data(rep1.data);
            setphotographes_data(rep2.data);
            setstylistes_data(rep3.data);
            setcoiffeurs_data(rep4.data);
          } catch (err) {
            console.error("Erreur lors de la récupération des données :", err);
          }
        };
        fetchData();
      }, []);
    
      
  // organiser les données des mannequins

const groupedResults = mannequins_data.reduce((acc, row) => {
    // Vérifie si le mannequin existe déjà dans l'accumulateur
    let mannequin = acc.find(item => item.id_mannequin === row.idmannequin);
    
    if (!mannequin) {
      // Si non, crée une nouvelle entrée pour ce mannequin
      mannequin = {
         id_mannequin: row.idmannequin,
        nom: row.nom,
        prenom: row.prenom,
        pseudo: row.pseudo,
        type_image: row.type_image,
        type_model: row.type_model,
        userclient: row.userclient,
        id_image: row.id_image,
        image_name: row.image_name,
         paths: {} };
      acc.push(mannequin);
    }
    
    // Ajoute le path_image correspondant au type_resolution
    switch (row.type_resolution) {
      // case 1:
      //   mannequin.paths.path_od = row.path_resolution;
      //   break;
      // case 2:
      //   mannequin.paths.path_om = row.path_resolution;
      //   break;
      // case 3:
      //   mannequin.paths.path_hrd = row.path_resolution;
      //   break;
      // case 4:
      //   mannequin.paths.path_hrm = row.path_resolution;
      //   break;
      case 5:
        mannequin.paths.path_md = row.path_resolution;
        break;
      case 6:
        mannequin.paths.path_mm = row.path_resolution;
        break;
      default:
        // Si un type inconnu est trouvé, le traiter ou ignorer
        // console.warn(`Type de résolution inconnu : ${row.type_resolution}`);
        break;
    }
  
    return acc;
  }, []);

 
const groupedResults_b = hotesses_data.reduce((acc, row) => {
    // Vérifie si le mannequin existe déjà dans l'accumulateur
    let model = acc.find(item => item.model_id === row.idhotesse);
    
    if (!model) {
      // Si non, crée une nouvelle entrée pour ce mannequin
      model = {
        model_id: row.idhotesse,
        nom: row.nom,
        prenom: row.prenom,
        pseudo: row.pseudo,
        type_image: row.type_image,
        type_model: row.type_model,
        userclient: row.userclient,
        id_image: row.id_image,
        image_name: row.image_name,
         paths: {} };
      acc.push(model);
    }
    
    // Ajoute le path_image correspondant au type_resolution
    switch (row.type_resolution) {
      // case 1:
      //   mannequin.paths.path_od = row.path_resolution;
      //   break;
      // case 2:
      //   mannequin.paths.path_om = row.path_resolution;
      //   break;
      // case 3:
      //   mannequin.paths.path_hrd = row.path_resolution;
      //   break;
      // case 4:
      //   mannequin.paths.path_hrm = row.path_resolution;
      //   break;
      case 5:
        model.paths.path_md = row.path_resolution;
        break;
      case 6:
        model.paths.path_mm = row.path_resolution;
        break;
      default:
        // Si un type inconnu est trouvé, le traiter ou ignorer
        // console.warn(`Type de résolution inconnu : ${row.type_resolution}`);
        break;
    }
  
    return acc;
  }, []);
  

  
const groupedResults_c = infs_data.reduce((acc, row) => {
    // Vérifie si le mannequin existe déjà dans l'accumulateur
    let model = acc.find(item => item.model_id === row.idinfluenceur);
      
    if (!model) {
      // Si non, crée une nouvelle entrée pour ce mannequin
      model = {
        model_id: row.idinfluenceur,
        nom: row.nom,
        prenom: row.prenom,
        pseudo: row.pseudo,
        type_image: row.type_image,
        type_model: row.type_model,
        userclient: row.userclient,
        id_image: row.id_image,
        image_name: row.image_name,
         paths: {} };
      acc.push(model);
    }
    
    // Ajoute le path_image correspondant au type_resolution
    switch (row.type_resolution) {
      // case 1:
      //   mannequin.paths.path_od = row.path_resolution;
      //   break;
      // case 2:
      //   mannequin.paths.path_om = row.path_resolution;
      //   break;
      // case 3:
      //   mannequin.paths.path_hrd = row.path_resolution;
      //   break;
      // case 4:
      //   mannequin.paths.path_hrm = row.path_resolution;
      //   break;
      case 5:
        model.paths.path_md = row.path_resolution;
        break;
      case 6:
        model.paths.path_mm = row.path_resolution;
        break;
      default:
        // Si un type inconnu est trouvé, le traiter ou ignorer
        // console.warn(`Type de résolution inconnu : ${row.type_resolution}`);
        break;
    }
  
    return acc;
  }, []);

  // les collabs
  const groupedResults_d = collabs_data.reduce((acc, row) => {
    // Vérifie si le mannequin existe déjà dans l'accumulateur
    let model = acc.find(item => item.model_id === row.idcontributeur);
  
    // console.log("row")
    // console.log(row)
    // console.log( row.idcontributeur)
    // console.log("model")
      
    if (!model) {
      // Si non, crée une nouvelle entrée pour ce mannequin
      model = {
        model_id: row.idcontributeur,
        nom: row.nom,
        prenom: row.prenom,
        pseudo: row.pseudo,
        type_image: row.type_image,
        type_model: row.type_model,
        userclient: row.userclient,
        id_image: row.id_image,
        image_name: row.image_name,
         paths: {} };
      acc.push(model);
  
      
    console.log("model")
    console.log(model)
    }
    
    // Ajoute le path_image correspondant au type_resolution
    switch (row.type_resolution) {
      // case 1:
      //   mannequin.paths.path_od = row.path_resolution;
      //   break;
      // case 2:
      //   mannequin.paths.path_om = row.path_resolution;
      //   break;
      // case 3:
      //   mannequin.paths.path_hrd = row.path_resolution;
      //   break;
      // case 4:
      //   mannequin.paths.path_hrm = row.path_resolution;
      //   break;
      case 5:
        model.paths.path_md = row.path_resolution;
        break;
      case 6:
        model.paths.path_mm = row.path_resolution;
        break;
      default:
        // Si un type inconnu est trouvé, le traiter ou ignorer
        // console.warn(`Type de résolution inconnu : ${row.type_resolution}`);
        break;
    }
  
    return acc;
  }, []);

  // photographes
  const groupedResults_e = photographes_data.reduce((acc, row) => {
    // Vérifie si le mannequin existe déjà dans l'accumulateur
    let model = acc.find(item => item.model_id === row.idcontributeur);
  
    // console.log("row")
    // console.log(row)
    // console.log( row.idcontributeur)
    // console.log("model")
      
    if (!model) {
      // Si non, crée une nouvelle entrée pour ce mannequin
      model = {
        model_id: row.idcontributeur,
        nom: row.nom,
        prenom: row.prenom,
        pseudo: row.pseudo,
        type_image: row.type_image,
        type_model: row.type_model,
        userclient: row.userclient,
        id_image: row.id_image,
        image_name: row.image_name,
         paths: {} };
      acc.push(model);
  
      
    console.log("model")
    console.log(model)
    }
    
    // Ajoute le path_image correspondant au type_resolution
    switch (row.type_resolution) {
      // case 1:
      //   mannequin.paths.path_od = row.path_resolution;
      //   break;
      // case 2:
      //   mannequin.paths.path_om = row.path_resolution;
      //   break;
      // case 3:
      //   mannequin.paths.path_hrd = row.path_resolution;
      //   break;
      // case 4:
      //   mannequin.paths.path_hrm = row.path_resolution;
      //   break;
      case 5:
        model.paths.path_md = row.path_resolution;
        break;
      case 6:
        model.paths.path_mm = row.path_resolution;
        break;
      default:
        // Si un type inconnu est trouvé, le traiter ou ignorer
        // console.warn(`Type de résolution inconnu : ${row.type_resolution}`);
        break;
    }
  
    return acc;
  }, []);


  // maquilleurs
  const groupedResults_f = maquilleurs_data.reduce((acc, row) => {
    // Vérifie si le mannequin existe déjà dans l'accumulateur
    let model = acc.find(item => item.model_id === row.idcontributeur);
  
    // console.log("row")
    // console.log(row)
    // console.log( row.idcontributeur)
    // console.log("model")
      
    if (!model) {
      // Si non, crée une nouvelle entrée pour ce mannequin
      model = {
        model_id: row.idcontributeur,
        nom: row.nom,
        prenom: row.prenom,
        pseudo: row.pseudo,
        type_image: row.type_image,
        type_model: row.type_model,
        userclient: row.userclient,
        id_image: row.id_image,
        image_name: row.image_name,
         paths: {} };
      acc.push(model);
  
      
    console.log("model")
    console.log(model)
    }
    
    // Ajoute le path_image correspondant au type_resolution
    switch (row.type_resolution) {
      // case 1:
      //   mannequin.paths.path_od = row.path_resolution;
      //   break;
      // case 2:
      //   mannequin.paths.path_om = row.path_resolution;
      //   break;
      // case 3:
      //   mannequin.paths.path_hrd = row.path_resolution;
      //   break;
      // case 4:
      //   mannequin.paths.path_hrm = row.path_resolution;
      //   break;
      case 5:
        model.paths.path_md = row.path_resolution;
        break;
      case 6:
        model.paths.path_mm = row.path_resolution;
        break;
      default:
        // Si un type inconnu est trouvé, le traiter ou ignorer
        // console.warn(`Type de résolution inconnu : ${row.type_resolution}`);
        break;
    }
  
    return acc;
  }, []);

  // stylistes
  const groupedResults_g = stylistes_data.reduce((acc, row) => {
    // Vérifie si le mannequin existe déjà dans l'accumulateur
    let model = acc.find(item => item.model_id === row.idcontributeur);
  
    // console.log("row")
    // console.log(row)
    // console.log( row.idcontributeur)
    // console.log("model")
      
    if (!model) {
      // Si non, crée une nouvelle entrée pour ce mannequin
      model = {
        model_id: row.idcontributeur,
        nom: row.nom,
        prenom: row.prenom,
        pseudo: row.pseudo,
        type_image: row.type_image,
        type_model: row.type_model,
        userclient: row.userclient,
        id_image: row.id_image,
        image_name: row.image_name,
         paths: {} };
      acc.push(model);
  
      
    console.log("model")
    console.log(model)
    }
    
    // Ajoute le path_image correspondant au type_resolution
    switch (row.type_resolution) {
      // case 1:
      //   mannequin.paths.path_od = row.path_resolution;
      //   break;
      // case 2:
      //   mannequin.paths.path_om = row.path_resolution;
      //   break;
      // case 3:
      //   mannequin.paths.path_hrd = row.path_resolution;
      //   break;
      // case 4:
      //   mannequin.paths.path_hrm = row.path_resolution;
      //   break;
      case 5:
        model.paths.path_md = row.path_resolution;
        break;
      case 6:
        model.paths.path_mm = row.path_resolution;
        break;
      default:
        // Si un type inconnu est trouvé, le traiter ou ignorer
        // console.warn(`Type de résolution inconnu : ${row.type_resolution}`);
        break;
    }
  
    return acc;
  }, []);

  // coiffeurs
  const groupedResults_h = coiffeurs_data.reduce((acc, row) => {
    // Vérifie si le mannequin existe déjà dans l'accumulateur
    let model = acc.find(item => item.model_id === row.idcontributeur);
  
    // console.log("row")
    // console.log(row)
    // console.log( row.idcontributeur)
    // console.log("model")
      
    if (!model) {
      // Si non, crée une nouvelle entrée pour ce mannequin
      model = {
        model_id: row.idcontributeur,
        nom: row.nom,
        prenom: row.prenom,
        pseudo: row.pseudo,
        type_image: row.type_image,
        type_model: row.type_model,
        userclient: row.userclient,
        id_image: row.id_image,
        image_name: row.image_name,
         paths: {} };
      acc.push(model);
  
      
    console.log("model")
    console.log(model)
    }
    
    // Ajoute le path_image correspondant au type_resolution
    switch (row.type_resolution) {
      // case 1:
      //   mannequin.paths.path_od = row.path_resolution;
      //   break;
      // case 2:
      //   mannequin.paths.path_om = row.path_resolution;
      //   break;
      // case 3:
      //   mannequin.paths.path_hrd = row.path_resolution;
      //   break;
      // case 4:
      //   mannequin.paths.path_hrm = row.path_resolution;
      //   break;
      case 5:
        model.paths.path_md = row.path_resolution;
        break;
      case 6:
        model.paths.path_mm = row.path_resolution;
        break;
      default:
        // Si un type inconnu est trouvé, le traiter ou ignorer
        // console.warn(`Type de résolution inconnu : ${row.type_resolution}`);
        break;
    }
  
    return acc;
  }, []);
  // console.log("groupedResults");
  // console.log(groupedResults);
  
  // console.log('liste data')
  //  console.log(groupedResults_e)
  //  console.log(groupedResults_f)
  //  console.log(groupedResults_g)
  //  console.log(groupedResults_h)
  // console.log('findata')
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

  // Détecter les changements de taille de l'écran
  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

   // Fonction pour obtenir le chemin de l'image adapté à la largeur de l'appareil
   const getPathForResolution = (paths) => {
   
    if (deviceWidth <= 720) {
      return paths.path_mm; // Résolution miniature
    } else if (deviceWidth <= 1080) {
      return paths.path_md; // Résolution moyenne
    } else {
      return paths.path_md; // Résolution haute
    }
  };

    // useEffect(() => {
    // console.log('use effect')
    //   const fetchData = async () => {
       
    //     try {
         
    //       console.log('request send')
                 
          

    //          const rep1 = await axios.get(`${apiUrl}/fashion_model/all`);
         
    //      console.log(rep1)
    //      setfashion_models(rep1.data);
        
         
    //     } catch (err) {
    //       console.log(err);
        
    //     }
    //   };
    //   fetchData();
    // } , []);

    const settings2 = {
        arrows: false,
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,

        responsive: [
            {
                breakpoint : 1024,
                settings:{
                    arrows: false,
                    slidesToShow:1,
                    slidesToScroll:1,
                     dots: false,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 5000,
                }
            },
            {
                breakpoint : 776,
                settings:{
                    arrows: false,
                    slidesToShow:1,
                    slidesToScroll:1,
                    autoplay: true,
                    infinite: true,
                    autoplaySpeed: 5000,
                }
            },
            
            {
                breakpoint : 576,
                settings:{
                    arrows: false,
                    slidesToShow:1,
                    slidesToScroll:1,
                    autoplay: true,
                    infinite: true,
                    autoplaySpeed: 5000,
                }
            },

        ],
     
    
       
      };
  

    const settings = {
        arrows: true,
        dots: false,
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
//         prevArrow:  <button className='slick-prev custom-prev'>
//         <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="white"
//     >
//         <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         d="M15 19l-7-7 7-7"
//         />
//     </svg> 
// </button>,
// nextArrow: <button   className='slick-next custom-next'>    
                    
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="white"
//                     >
//                         <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M9 5l7 7-7 7"
//                         />
//                     </svg>
// </button>,
        responsive: [
            {
                breakpoint : 1024,
                settings:{
                    arrows: true,
                    slidesToShow:4,
                    slidesToScroll:1,
                     dots: false,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 5000,
                }
            },
            {
                breakpoint : 776,
                settings:{
                    arrows: true,
                    slidesToShow:3,
                    slidesToScroll:1,
                    autoplay: true,
                    infinite: true,
                    autoplaySpeed: 5000,
                }
            },
            
            {
                breakpoint : 576,
                settings:{
                    arrows: true,
                    slidesToShow:2,
                    slidesToScroll:1,
                    autoplay: true,
                    infinite: true,
                    autoplaySpeed: 5000,
                }
            },

        ],
     
    
       
      };
  
      const [isOpen , setIsOpen] = useState(false);
    const [isOpen2 , setIsOpen2] = useState(false);
    const [isOpen3 , setIsOpen3] = useState(false);

    
    const toggleDropdown = () =>{
        setIsOpen(!isOpen)
    }
    const toggleDropdown2 = () =>{
        setIsOpen2(!isOpen2)
    }
    const toggleDropdown3 = () =>{
        setIsOpen3(!isOpen3)
    }


  return (
    <>
      <main id="MainContent" className="content-for-layout">

        <Hero/>
       
 
       
       
            <div className='col-lg-12 col-md-12 col-12 box_container'>
                     {/* <div className="title_hg center_title fs_gh">
                        <Link className='custom_title' to={"/mannequins"}>  nos afrodites</Link>
                  
                            
                     </div> */}
               <div className=" col-lg-12 col-md-12 col-12 left_box pt-2 row">
                        
                  {/* <div className="col-4 item_box"> */}
                  <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                  <div className="content data_containerbox">
                    <div className="center_title fs">
                      <Link className='custom_title' to={"/mannequins"}>Mannequins</Link>
                     
                   </div>
                   <div className="slider text-center">
               <Slider {...settings2}>
               
               {groupedResults.map((item) => (
                   <div key={item?.id_mannequin}  className="product-card listing">
                      <div className="product-card-img">
                      <a className="hover-switch" href={`mannequins/${item?.id_mannequin}`}>
                           <img 
                           // src={`${apiUrl}/${item?.path_image}`} 
                           className="img-fluid thumbnail" 
                           src={`${apiUrl}/${getPathForResolution(item.paths)}`

                       }
                           alt="model"/>
                           
                       </a>


                      </div>
                     
                   </div>
               ))}
                 
               
               
               </Slider>
                  </div>
                </div>

                 </div>
                 <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                {/* <div className="col-4 item_box "> */}
                <div className="content data_containerbox">
                    <div className="center_title fs_mh mb-1">
                    <Link className='custom_title' to={"/hotesse_accueil"}>hotesses</Link>
                     
                     
                    {/* d&apos;accueil  */}
                   </div>
                   <div className="slider text-center">
               <Slider {...settings2}>
               
               {groupedResults_b.map((item) => (
                   <div key={item?.model_id}  className="product-card listing">
                      <div className="product-card-img">
                      <a className="hover-switch" href={`single_viewH/3/${item?.model_id}`}>
                           <img 
                           // src={`${apiUrl}/${item?.path_image}`} 
                           src={`${apiUrl}/${getPathForResolution(item.paths)}`

                       }
                           alt="model"  className="img-fluid thumbnail" />
                           
                       </a>
 


                      </div>
                 </div>
               ))}
               
               
               </Slider>
                  </div>
                </div>
                 </div>
                 <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                 {/* <div className="col-4 item_box "> */}
                 <div className="content data_containerbox">
               
                    <div className="center_title fs_mh mb-1">
                    <Link className='custom_title' to={"/influenceur"}>influenceurs</Link>
                  
                     
                   </div>
                   <div className="slider text-center ">
               <Slider {...settings2} className=''>
               
               {groupedResults_c.map((item) => (
                   <div key={item?.idinfluenceur}  className="product-card listing">
                      <div className="product-card-img">
                      <a className="hover-switch" href={`singleViewI/2/${item?.idinfluenceur}`}>
                           <img 
                           // src={`${apiUrl}/${item?.path_image}`} 
                           src={`${apiUrl}/${getPathForResolution(item.paths)}`

                       }
                           alt="influenceur"  className="img-fluid thumbnail" 
                           />
                           
                       </a>

                      </div>
                      
                   </div>
               ))}
               
               
               </Slider>
                  </div>
                  </div>
                </div>
                 </div>

            </div>

            {/* les services afrodites */}
            <div className="col-12 section_box">
                <div className="center_title fs_gh mb-2">
                            les offres Afrodites
               </div>
             
                       
                 <div className="services_listing">
                       
                 <div className="row px-3">
        <div className="col-4 item">
          <button className="custom-dropdown-link" 
          
          >
              <Link className='custom_title' to={"/services_afro"}>
              Devenir un modèle et Cie
              </Link>
                              
           
          </button>
        </div>
        
       
        <div className="col-4 item">
          <button className="custom-dropdown-link" 
          onClick={() => openModal('engager-un-modele')}
          >
            Engager un modèle
          </button>
        </div>

        <div className="col-4 item">
          <button className="custom-dropdown-link"
           onClick={() => openModal('creer-une-franchise')}
           >
            Créer une franchise
          </button>
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && (
        <div className="modal_customs">
          <div className="modal_customs-content">
            <button className="close_cstom-btn" onClick={closeModal}>
              ×
            </button>
            <h2>{modalContent.replace(/-/g, ' ').toUpperCase()}</h2>
            <ul>
              {modalContent === 'devenir-un-modèle' && (
                <>
                
                  <li>Mannequin</li>
                  <li>Hôtesse</li>
                  <li>Influenceur</li>
                </>
              )}
              {modalContent === 'services-afrodites' && (
                <>
                  <li>Se former à poser</li>
                  <li>Se former à marcher</li>
                  <li>Faire un book</li>
                </>
              )}
              {modalContent === 'engager-un-modele' && (
                <>
                  <li>Mannequins</li>
                  <li>Hôtesses d'accueil</li>
                  <li>Influenceurs</li>
                </>
              )}
              {modalContent === 'creer-une-franchise' && (
                <>
                  <li>Au Togo</li>
                  <li>À l&apos;international</li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
                        
                </div>

            </div>
                       
         



 

      

        
          
      </main>
        

    </>
  )
}

export default MainContent
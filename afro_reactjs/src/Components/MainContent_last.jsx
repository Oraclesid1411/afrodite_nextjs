// import React from 'react'
import Hero from './Hero'
import { useNavigate } from 'react-router-dom';

import axios from "axios";
// import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import  { useEffect, useState  } from 'react'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import { Link } from 'react-router-dom';

const apiUrl = 'https://apiafro.aafrodites.com' 


function MainContent() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const location = useLocation();

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
    navigate(`#${content}`, { replace: true });
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
    navigate(location.pathname, { replace: true });
  };
  // // Fonction pour ouvrir un modal
  // const openModal = (content) => {
  //   setModalContent(content);
  //   setIsModalOpen(true);
  //   // Ajouter un hash dans l'URL
  //   window.history.pushState(null, '', `#${content}`);
  // };

  // // Fonction pour fermer le modal
  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setModalContent('');
  //   // Supprimer le hash dans l'URL
  //   window.history.pushState(null, '', location.pathname);
  // };

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

   
    

    const [mannequins_data , setmannequins_data] = useState([]);
    const [hotesses_data , sethotesses_data] = useState([]);
    const [infs_data , setinfs_data] = useState([]);
    

    useEffect(() => {
      const fetchData = async () => {
        try {
          const responses = await Promise.allSettled([
            axios.post(`${apiUrl}/fashion_model/list_mannequin`),
            axios.post(`${apiUrl}/role_model/liste_influenceur`),
            axios.post(`${apiUrl}/host_model/liste_hotesses`),
          ]);
    
          if (responses[0].status === 'fulfilled') setmannequins_data(responses[0].value.data);
          if (responses[1].status === 'fulfilled') setinfs_data(responses[1].value.data);
          if (responses[2].status === 'fulfilled') sethotesses_data(responses[2].value.data);
          
        } catch (err) {
          console.error("Erreur lors de la récupération des données :", err);
        }
      };
    
      fetchData();
    }, []);
    
    
    
      
  // organiser les données des mannequins
  const groupData = (data, idField) => {
    return data.reduce((acc, row) => {
      let model = acc.find(item => item.model_id === row[idField]);
  
      if (!model) {
        model = {
          model_id: row[idField],
          nom: row.nom,
          prenom: row.prenom,
          pseudo: row.pseudo,
          type_image: row.type_image,
          type_model: row.type_model,
          userclient: row.userclient,
          id_image: row.id_image,
          image_name: row.image_name,
          paths: {}
        };
        acc.push(model);
      }
  
      if (row.type_resolution === 5) {
        model.paths.path_md = row.path_resolution;
      } else if (row.type_resolution === 6) {
        model.paths.path_mm = row.path_resolution;
      }
  
      return acc;
    }, []);
  };
  
  // Utilisation :
  const groupedResults = groupData(mannequins_data, 'idmannequin');
  const groupedResults_b = groupData(hotesses_data, 'idhotesse');
  const groupedResults_c = groupData(infs_data, 'idinfluenceur');
  
  console.log(groupedResults)
  console.log(groupedResults_b)
  console.log(groupedResults_c)
  

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
    const resolutions = {
      mobile: paths.path_mm, // Pour les petits écrans
      tablet: paths.path_md, // Pour les écrans moyens
      desktop: paths.path_md, // Pour les grands écrans
    };
  
    if (deviceWidth <= 720) return resolutions.mobile;
    if (deviceWidth <= 1080) return resolutions.tablet;
    return resolutions.desktop;
  };

   
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
                      <Link className='custom_title' to={"/mannequins"}
                        >
                        Mannequins
                        
                      </Link>
                     
                   </div>
                   <div className="slider text-center">
               <Slider {...settings2}>
               
               {groupedResults.map((item) => (
                   <div key={item?.model_id}  className="product-card listing">
                      <div className="product-card-img">
                      <a className="hover-switch" href={`mannequins/${item?.model_id}`}>
                           <img 
                           // src={`${apiUrl}/${item?.path_image}`} 
                           className="img-fluid thumbnail" 
                           loading="lazy"
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
                           loading="lazy"
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
                   <div key={item?.model_id}  className="product-card listing">
                      <div className="product-card-img">
                      <a className="hover-switch" href={`singleViewI/2/${item?.model_id}`}>
                           <img 
                           // src={`${apiUrl}/${item?.path_image}`} 
                           loading="lazy"
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
            <div className="section_box">
                <div className="center_title fs_gh mt-1 mb-2 white_title">
                            Nos offres
               </div>
             
                       
                 <div className="services_listing">
                       
                 <div className="row px-2">
        <div className="col-4 item">
          <button className="custom-dropdown-link" 
          
          >
              <Link className='custom_title' to={"/postuler"}
               state={{ demande: "devenir afrodite" }} 
               
               >
              Devenez
              <br/>
              une
              <br/>
               Afrodite
              </Link>
                              
           
          </button>
        </div>
        
       
        <div className="col-4 item">
          <button className="custom-dropdown-link" 
          // onClick={() => openModal('engager-des-Afrodites')}
          >
               <Link className='custom_title' to={"/creercomptebusiness"}
               state={{ demande: "engager une afrodite" }} 
               
               >
              Mettez de   <br/> l'Afrodites dans <br/> votre Com.

              </Link>
           
           
           
          </button>
        </div>

        <div className="col-4 item">
          <button className="custom-dropdown-link"
        
          //  onClick={() => openModal('creer-une-franchise-Afrodite')}
           >
             <Link className='custom_title' to={"/creerfranchise"}
               state={{ demande: "creer franchise" }} 
               
               >
               Créez une 
            <br/>
             franchise
             <br/> Afrodite
              </Link>
           
          
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
              {modalContent === 'devenir-une-Afrodite' && (
                <>
                
                  <li>Mannequin</li>
                  <li>Hôtesse</li>
                  <li>Influenceur</li>
                </>
              )}
              {modalContent === 'services-Afrodites' && (
                <>
                  <li>bientôt disponible</li>
                 
                </>
              )}
              {modalContent === 'engager-des-Afrodites' && (
                <>
                  <li>bientôt disponible</li>
                </>
              )}
              {modalContent === 'creer-une-franchise-Afrodite' && (
                <>
                  <li>bientôt disponible</li>
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
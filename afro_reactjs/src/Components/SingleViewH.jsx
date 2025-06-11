// import React from 'react'
import React, { useState, useEffect } from 'react';
import { Link , useLocation } from 'react-router-dom';
import axios from 'axios'
import Header_menu from './Header_menu'
// import Footer from './Footer'
import Modal from 'react-modal';

// import MannequinNavigation from './MannequinNavigator';

// import { useParams } from 'react-router-dom';


import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';

// import ImageModal from './ImageModal';

import Calendar_view from '../Pages/Calendar_view';
import Timeline_view from '../Pages/Timeline_view';
import FixedMenu from '../Components/FixedMenu';

// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faFacebook, faLinkedin, faYoutube, faWhatsapp, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {faShare,faCalendar,faIdCard, faImage,faFilm ,faList ,faThumbsUp,faHeart,faComment, faInfo} from '@fortawesome/free-solid-svg-icons';
// import { map } from 'jquery';
// import Influenceur from '../Pages/infuenceur'; 
function SingleViewH() {


   // list link param
   let current_location = useLocation();
   const link_url = current_location?.pathname.split('/');
 
   console.log(link_url)
  
   axios.defaults.withCredentials = true;
 
   
   const type_model = link_url[2];
   const id_model =  link_url[3];
 
   const [isFixed, setIsFixed] = useState(false);
   const [this_model, setthis_model] = useState([]); 
   const [this_modelNew, setthis_modelNew] = useState([]); 
   const [isEnriched, setIsEnriched] = useState(false);
   const [principal_data, setprincipal_data] = useState([]);

  //  const [constributeurs, setContributeurs] = useState([]);
  //  const [Photographe, setPhotographe] = useState("");
  //  const [styliste, setStyliste] = useState("");
  //  const [maquilleur, setMaquilleur] = useState("")
  //  const [coiffeur, setCoiffeur] = useState("");
 
 
    const apiUrl = 'https://apiafro.aafrodites.com'
    // const apiUrl = 'http://localhost:5000'

 
   const param = {type_model, id_model}

  //  Fancybox.bind("[data-fancybox]", {
  //   // baseClass: "my-fancybox", // Classe personnalisée
  //   on: {
  //     ready: (fancybox) => {
  //       // Ajouter un bouton personnalisé pour basculer la légende
  //       const toggleCaptionButton = document.createElement("button");
  //       toggleCaptionButton.textContent = "Afficher/Masquer la légende";
  //       toggleCaptionButton.className = "toggle-caption-btn";
  //       toggleCaptionButton.style.cssText = `
  //         position: fixed;
  //         bottom: 10px;
  //         left: 10px;
  //         z-index: 9999;
  //         background: #333;
  //         color: #fff;
  //         border: none;
  //         padding: 10px 15px;
  //         border-radius: 5px;
  //         cursor: pointer;
  //       `;
  //       toggleCaptionButton.addEventListener("click", () => {
  //         // Basculer la classe `show-caption` sur le conteneur Fancybox
  //         const container = document.querySelector(".fancybox-container");
  //         container.classList.toggle("show-caption");
  //       });
  
  //       // Ajouter le bouton à la page
  //       document.body.appendChild(toggleCaptionButton);
  //     },
  //     destroy: () => {
  //       // Supprimer le bouton après la fermeture de Fancybox
  //       const toggleCaptionButton = document.querySelector(".toggle-caption-btn");
  //       if (toggleCaptionButton) {
  //         toggleCaptionButton.remove();
  //       }
  //     },
  //   },
  // });

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  //   setSelectedImage(null);
  // };
   useEffect(() => {
  
      const fetchData = async () => {
       
        try {
            
         const rep1 = await axios.post(`${apiUrl}/host_model/this_model`, param );
        //  const res = await axios.post(`${apiUrl}/auth/login` , inputs);
         console.log(rep1)
         setthis_model(rep1.data);
  
         const principal_image =  rep1.data.filter(li => li.type_image === 1);
         
         if(principal_image.length === 1){
          setprincipal_data(principal_image)
         }
        
         console.log("principal_image")
         console.log(principal_image)
                   
         
        } catch (err) {
          console.log(err);
        
        }
      };
      fetchData();
    } , []);
  
   

  useEffect(() => {
    const handleScroll = () => {
      const secondaryNavbar = document.querySelector('.title_nav');
      const stickyPosition = secondaryNavbar.offsetTop;
 
      if (window.pageYOffset >= stickyPosition) {
        // setIsFixed(true);
      } else {
        // setIsFixed(false);
      }
    };
 
    window.addEventListener('scroll', handleScroll);
 
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
    const [nav1, setNav1] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slider1, setSlider1] = useState(null);
   
     
const fetchContributeurs = async (id) => {
  
  const response = await axios.post(`${apiUrl}/fashion_model/contrib`, {
    id_image: id,
  }); 
 
  return response; // Exemple : { name: "John Doe" }
};
   
useEffect(() => {
  const enrichImages = async () => {
    // Clone des images pour enrichissement
    const updatedList = await Promise.all(
      this_model.map(async (item) => {
        var list_photograph = {};
        var list_maquilleur = {};
        var list_styliste = {};
        var list_coiffeur = {};
        const contribu = await fetchContributeurs(item?.id_image);
       
      if(contribu?.data != null){
          list_photograph = contribu?.data[0];
          list_maquilleur = contribu?.data[1];
          list_styliste = contribu?.data[2];
          list_coiffeur = contribu?.data[3];
        
        return {
            ...item,
            list_photograph,
            list_maquilleur,
            list_styliste,
            list_coiffeur,
          };
      }
      else{ 
          list_photograph ={photographes: []};
          list_maquilleur = {maquilleurs: []};
          list_styliste = {stylistes: []};
          list_coiffeur = {coiffeurs: []};
        
        return {
        ...item, 
        list_photograph,
            list_maquilleur,
            list_styliste,
            list_coiffeur,
      };}
     
      })
    );
  
    setthis_modelNew(updatedList);
    setIsEnriched(true); // Marque les données comme enrichies
 
  };
 
  if (this_model.length > 0 && !isEnriched) {
    enrichImages();
  }
}, [this_model ,isEnriched]);
 
      useEffect(() => {
        setNav1(slider1);
      }, [slider1]);

      
 
      // Fonction pour ouvrir et fermer le modal
      const openModal = () => setModalIsOpen(true);
      const closeModal = () => setModalIsOpen(false);

      const [contactModalOpen, setContactModalOpen] = useState(false);
      const openContactModal = () => setContactModalOpen(true);
      const closeContactModal = () => setContactModalOpen(false);

      

      const [TypeView, setTypeView] = useState("calendar");

      const handleView = (event) => {
        setTypeView(event.currentTarget.dataset.mode);
      };
       
     
 

      // another images settings
  const [images, setimages] = useState([]); 
  useEffect(() => {

    
if(this_modelNew.length > 0){
  
  const list = [
    ...new Set(
      this_modelNew.map((p) => ({
        id: p?.id,
        location: "Lomé",
          thumb: p?.path_image,
        src: p?.path_image,
        title:p?.pseudo,
        caption: `
        <div class="captiondata">
          <h4>${p?.pseudo || "Sans nom"}</h4>
            <div class='item_li'><label>Photographes:</label> ${
            p?.list_photograph?.photographes
              ?.map((photographe) => `<a href="/singleViewP/4/${photographe[0]?.id}" style="margin-right: 5px;">${photographe[0]?.pseudo}</a>`)
              .join(' ') || "-"
          }</div>
             <div class='item_li'><label>Stylistes:</label> ${
            p?.list_styliste?.stylistes
              ?.map((styliste) => `<a href="/singleViewP/7/${styliste[0]?.id}" style="margin-right: 5px;">${styliste[0]?.pseudo}</a>`)
              .join(' ') || "-"
        
          }</div>
            <div class='item_li'><label>coiffeurs:</label> ${
              p?.list_coiffeur?.coiffeurs
              ?.map((coiffeurs) => `<a href="/singleViewP/5/${coiffeurs[0]?.id}" style="margin-right: 5px;">${coiffeurs[0]?.pseudo}</a>`)
              .join(' ') || "-"
          }</div>
          
          <div class='item_li'><label>Maquilleurs:</label> ${
            p?.list_maquilleur?.maquilleurs
              ?.map((maquilleur) => `<a href="/singleViewP/6/${maquilleur[0]?.id}" style="margin-right: 5px;">${maquilleur[0]?.pseudo}</a>`)
              .join(' ') || "-"
          }</div>
       
        </div>
      `,

        }))
    ),
  ];
   setimages(list)
}
  
  
 } , [this_modelNew]);


 console.log(images)
  return (
    <>
        <Header_menu data ={{ link : 'mannequin' }}/>
        <div className="main_container">
          <div className="agent_description col-12 col-sm-12">

          {principal_data.map((p) => (
                                  <>

              <div className="row description_content">
              {/* <MannequinNavigation className="custom-MnavigationMobile"/> */}

                <div className="col-12 col-lg-3 col-md-3 col-sm-12 img_box">
                      <div className="product-card desc_picture">


                      {/* <MannequinNavigation className="custom-MnavigationDesktop"/> */}
                <div className="imgpart">
                      <div className="photoRx">
                            
                             <div className="product-card-img">
                                  <a className="hover-switch" href={`${apiUrl}/${p?.path_image}`}>
                                   <img src={`${apiUrl}/${p?.path_image}`} alt={`${apiUrl}/${p?.path_image}`} className='img profile-image'/>                                                                      
                                    </a>

                            </div>
                            <div className="name">
                            <label className='modelname'>{p?.nom} {p?.pseudo}</label>
                              <div className="categorie_agent">
                                <label htmlFor="">
                                  Host 
                                  <span className='flag'>
                                    <img src="/assets/img/flags/tg.jpeg" alt="" />
                                  </span>
                                </label>
                              </div>
                            </div>
                           

                            <div className="agent_rxsx">
                         
                              <ul className='list_rxsx'>
                                  <li className='rxsx_item'>

                              
                                    <a href="/">
                                    <FontAwesomeIcon icon={faInstagram} size="sm" />

                                    </a>

                                
                                  </li>
                                  <li className='rxsx_item'>
                                  <a href="/">
                                    <FontAwesomeIcon icon={faYoutube} size="sm" />

                                    </a>
                                  

                                </li>
                                <li className='rxsx_item'>
                                <a href="/">
                                    <FontAwesomeIcon icon={faTiktok} size="sm" />

                                    </a>
                                
                                  </li>
                                  <li className='rxsx_item'>
                                  <a href="/">
                                    <FontAwesomeIcon icon={faLinkedin} size="sm" />

                                    </a>
                                

                                </li>
                                <li className='rxsx_item'>
                                <a href="/">
                                    <FontAwesomeIcon icon={faFacebook} size="sm" />

                                    </a>
                              

                                  </li>
                                
                              </ul>
                              
                            
                  
                            </div>

                      </div>
                          
                </div>
                <div className="detailspart ">
                        
 
                          <div className="personalInformation">

                            <div className="model_data">
                              <div className="data">
                                <label className="label">
                                  Spécialité :
                                </label>
                                <label className='value'>
                                  Reception, Service
                                </label>
                              </div>
                                <button className='btn_more'>
                                  ...
                              </button>
                            </div>

                           
                         
                            
                          </div>

                          <div className="btn_list">
                          <button className='btn_like'>
                                <FontAwesomeIcon className='icon' icon={faThumbsUp} size="sm" />
                          </button>
                          <button className='btn_share'>
                              <FontAwesomeIcon className='icon' icon={faShare} size="sm" />
                          </button>
                        <button className='btn_contact' onClick={openContactModal}>
                        <FontAwesomeIcon icon={faIdCard} className='icon'/>
                         contacts
                        </button>
                       
                           
                          </div>
                         
                       

                         
                </div>
                     
                      
                     </div>
                </div>


                <div className="col-12 col-lg-9 col-md-9 col-sm-12 details_zone">
                  
                <div className="container tab_list_box">
                    <div className="tab-list product-tab-list sticky_nav">
                          <nav className= {`nav title_nav ${isFixed ? 'fixed_nav' : ''}`}>
                              
                            
                            <a className="product-tab-link tab-link active" href="#photos" data-bs-toggle="tab">
                                <FontAwesomeIcon className="mr-3" size="lg" icon={faImage} />
                                    Photos
                            </a>
                            <a className="product-tab-link tab-link" href="#videos" data-bs-toggle="tab">
                                <FontAwesomeIcon className="mr-3" size="lg" icon={faFilm} />
                                    Vidéos
                            </a>
                            <a className="product-tab-link tab-link" href="#events" data-bs-toggle="tab">
                              <FontAwesomeIcon  className=" mr-3"  size="lg" icon={faCalendar}/>
                            Events
                            </a>
                          </nav>
                    </div>

                    {/* Section Events */}

                    <div className="tab-content col-12 ">
                        
                        <div id="events" className="tab-pane fade">
                          <div className="row">
                               
                                                      {
                                      // affichage type calendrier
                                      TypeView === "calendar" ? (
                                        <div className="calendar_view">
                                          <Calendar_view />
                                        </div>
                                      ) : (
                                        // affichage type timeline
                                        <Timeline_view />
                                      )
                                    }

                                    <div className="mode_affichage_container">
                                      <div className="btn_box">
                                        {TypeView === "calendar" ? (
                                          <>
                                            <button className="view_btn active">
                                              <FontAwesomeIcon icon={faCalendar} />
                                            </button>
                                            <button className="view_btn" data-mode="timelines" onClick={handleView}>
                                              <FontAwesomeIcon icon={faList} />
                                            </button>
                                          </>
                                        ) : (
                                          <>
                                            <button className="view_btn" data-mode="calendar" onClick={handleView}>
                                              <FontAwesomeIcon icon={faCalendar} />
                                            </button>
                                            <button className="view_btn active">
                                              <FontAwesomeIcon icon={faList} />
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    </div>

                           </div>
                        </div>

                        {/* Section Photos */}
                          <div id="photos" className="tab-pane fade show active">
                            <div className="row gallery-container">
                                

                                  {images.map((item ,index) => (
                                  <>
                                  {images.length > 0 &&
                                  
                                  (
                                    <>
                               <div  key={item?.id} data-id={item.id} className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">
                                <div className="product-card">
                                  <div className="product-card-img">
                                    
                                
                                  <a
                                   
                                      data-fancybox="gallery"
                                    href={`${apiUrl}/${item.src}`}
                                    data-caption={item.caption}
                                         
                                  >
                                      <img src={`${apiUrl}/${item.thumb}`} alt={item.title} />
                                    </a>
                                        

                                    
                                  </div>

                                 
                                  
                                </div>
                              </div>

                                    </>
                                  )}
                                
                                  </>
                                 ))}
                               
                              
                              
                            </div>
                          </div> 

                        {/* Section Vidéos */}

                          <div id="videos" className="tab-pane fade">
                              <div className="row">
                                <div className="box col-lg-4 col-md-6 col-6 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">
                                  <div className="product-card video_card">
                                    <div className="product-card-img">
                                        <a className="hover-switch" data-fancybox="video-gallery" href="https://www.youtube.com/watch?v=5zV2tKuwNdA" data-caption="Video 1">
                                          <img src="/assets/videos/video_1.PNG" alt="video" className="img" />
                                          <button className="play-button">▶</button>
                                        </a>
                                    </div>
                                    <div className="interaction_buttons">
                                        <button className="like-button">
                                            <FontAwesomeIcon icon={faHeart} /> 32
                                        </button>
                                        <button className="comment-button">
                                          <FontAwesomeIcon icon={faComment} /> 40
                                        </button>

                                       
                                      <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip id="tooltip-top">Contributeurs</Tooltip>}
                                      >
                                         <button className='comment-button'  onClick={openModal}> 
                                        <FontAwesomeIcon icon={faInfo} />
                                      </button>
                                      </OverlayTrigger>
                                    </div>
                                  </div>
                                </div>
                              </div>
                          </div>   
                       
                    </div>
                </div>

                </div>
              </div>  
              </>
               ))}
             
          </div>        
        </div>


        {/* Modal */}
    


      <Modal
        isOpen={contactModalOpen}
        onRequestClose={closeContactModal}
        contentLabel="Contributeurs"
        overlayClassName="custom-overlay"
        className="custom-modal"
        ariaHideApp={false} 
      >

        <h3>
          Contact Info
        </h3>
         
        
        

        <button onClick={closeContactModal}>Retour</button>
      </Modal>

      <FixedMenu/>
    </>
  )
}

export default SingleViewH
// import React from 'react'
import React, { useState, useEffect } from 'react';
import { Link , useLocation } from 'react-router-dom';
import axios from 'axios'
import Header_menu from './Header_menu'
import Footer from './Footer'
import Modal from 'react-modal';
import FixedMenu from '../Components/FixedMenu';
import MannequinNavigation from './MannequinNavigator';

import { useParams } from 'react-router-dom';

import Calendar_view from '../Pages/Calendar_view';
import Timeline_view from '../Pages/Timeline_view'; 

import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faFacebook, faLinkedin, faYoutube, faWhatsapp, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {faUser,faCalendar,faRetweet,faVideo,faPlayCircle, faImage,faFilm ,faList ,faContactCard,faHeart,faComment, faInfo, faShare, faEllipsisH, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import { map } from 'jquery';
import Influenceur from '../Pages/infuenceur';


function SingleViewI() {


   // list link param
   let current_location = useLocation();
   const link_url = current_location?.pathname.split('/');
 
   console.log(link_url)
 
   console.log('param')
   axios.defaults.withCredentials = true;
 
   
   const type_model = link_url[2];
   const id_model =  link_url[3];
 
   const [isFixed, setIsFixed] = useState(false);
   const [this_model, setthis_model] = useState([]);
   const [principal_data, setprincipal_data] = useState([]);
   const [videos, setVideos] = useState([]);
 
 
  //  const apiUrl = 'https://apiafro.aafrodites.com'
   const apiUrl = 'http://localhost:5000'

 
   const param = {type_model, id_model}

   useEffect(() => {
    const fetchData = async () => {
      try {
        const [rep1, rep2] = await Promise.all([
          axios.post(`${apiUrl}/role_model/this_model`, param),
          axios.post(`${apiUrl}/role_model/videos`, {id_model : id_model}),
        ]);
  
        // Traitement des données du modèle
        setthis_model(rep1.data);
  
        const principal_image = rep1.data.filter(li => li.type_image === 1);
        if (principal_image.length === 1) {
          setprincipal_data(principal_image);
        }
  
        // Traitement des vidéos
        setVideos(rep2.data);
  
        console.log("principal_image", principal_image);
        console.log("videos", rep2.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des données :", err);
      }
    };
  
    fetchData();
  }, [param, id_model]); // Ajouter les dépendances dynamiques si nécessaire
  

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
   

    useEffect(() => {
        setNav1(slider1);
      }, [slider1]);

        const settings = {
        //   dots: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: false,
          autoplaySpeed: 1000,
          onReInit: () => setCurrentSlide(slider1?.innerSlider.state.currentSlide),
          lazyLoad: true,
          asNavFor: ".slider-nav",
          focusOnSelect: true,
          nextArrow: (
            <div>
              <div className="next-slick-arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" stroke="black" height="24" viewBox="0 -960 960 960" width="24"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/></svg>
              </div>
            </div>
          ),
      
          prevArrow: (
            <div>
              <div className="next-slick-arrow rotate-180">
                <svg xmlns="http://www.w3.org/2000/svg" stroke="black" height="24" viewBox="0 -960 960 960" width="24"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/></svg>
              </div>
            </div>
          ),
       };


      const [modalIsOpen, setModalIsOpen] = useState(false);

      // Fonction pour ouvrir et fermer le modal
      const openModal = () => setModalIsOpen(true);
      const closeModal = () => setModalIsOpen(false);

      const [contactModalOpen, setContactModalOpen] = useState(false);
      const openContactModal = () => setContactModalOpen(true);
      const closeContactModal = () => setContactModalOpen(false);

      // Exemple d'event pour affichage dans le modal
      const contributor = [
        {name : "Koffi John", Role : "Photographe"},
        {name : "Ama Diyou", Role : "Coiffeuse"},
        {name : "Yao Danti", Role : "Styliste"},
        {name : "Vermaille Conte", Role : "Maquilleur"},
        {name : "Koffi John", Role : "Photographe"},
        {name : "Koffi John", Role : "Photographe"},
        {name : "Koffi John", Role : "Photographe"},
        {name : "Koffi John", Role : "Photographe"},
      ]

       
      // useEffect(() => {
      //   // Bind Fancybox to elements with [data-fancybox] attribute
      //   Fancybox.bind("[data-fancybox]", {
      //     infinite: false, // Example of configuration option
      //     buttons: ["zoom", "close"], // Customize buttons
      //   });

      //   // Cleanup on component unmount
      //   return () => {
      //     Fancybox.destroy();
      //   };
      // }, []);



      const [TypeView, setTypeView] = useState("calendar");

      const handleView = (event) => {
        setTypeView(event.currentTarget.dataset.mode);
      };
 
  return (
    <>
        <Header_menu data ={{ link : 'mannequin' }}/>
        <div className="main_container">
          <div className="agent_description col-12 col-sm-12">

         

              <div className="row description_content">

              {principal_data.map((p) => (
                                  <>

                <div className="col-12 col-lg-3 col-md-3 col-sm-12 img_box">
                      <div className="product-card desc_picture">

                      <div className="imgpart">

                        <div className="photoRx">
                              <div className="product-card-img">
                                  <a className="hover-switch" href={`${apiUrl}/${p?.path_image}`} data-fancybox="gallery">
                                   <img src={`${apiUrl}/${p?.path_image}`} alt={`${apiUrl}/${p?.path_image}`} className='img'/>                                                                      
                                    </a>

                            </div>


                             
                        </div>
                         

                        


                      <div className="agent_name">
                        <h6>{p?.nom} {p?.pseudo}</h6>
                          <div className="categorie_agent">
                            <label htmlFor="">
                              Comédien 
                            </label>
                          </div>

                        </div>

                        <div className="detailspart ">
                            <div className="personalInformation">

                            <div className="item">
                              <div className="label">
                                <p>
                                  1367
                                </p>
                              </div>
                              <div className="value">
                                <p>
                                  Suivi
                                </p>
                              </div>
                            </div>

                            <div className="item">
                              <div className="label">
                                <p>
                                  578 K
                                </p>
                              </div>
                              <div className="value">
                                <p>
                                  Followers
                                </p>
                              </div>
                            </div>

                            <div className="item">
                              <div className="label">
                                <p>
                                  56 M
                                </p>
                              </div>
                              <div className="value">
                                <p>
                                  J'aime
                                </p>
                              </div>
                            </div>
                            
                          </div>

                          

                          <div className="buttons">
                                    <button className='btn btn-light btn-sm share me-2'>
                                        <FontAwesomeIcon icon={faThumbsUp} size="sm" />
                                    </button>
                                    <button className='btn btn-danger btn-sm me-2'>Suivre</button>
                                    <button className='btn btn-light btn-sm share me-2'>
                                        <FontAwesomeIcon icon={faShare} size="sm" />
                                    </button>
                                    {/* <button className='btn btn-light btn-sm share'>
                                        <FontAwesomeIcon icon={faEllipsisH} size="sm" />
                                    </button> */}
                            </div>

                        </div>
                      </div>

                     </div>
                </div>

                </>
               ))}
                <div className="col-12 col-lg-9 col-md-9 col-sm-12 details_zone">
                  
                <div className="container tab_list_box">
                    <div className="tab-list product-tab-list sticky_nav">
                          <nav className= {`nav title_nav ${isFixed ? 'fixed_nav' : ''}`}>
                              
                            
                            <a className="product-tab-link tab-link active" href="#videos" data-bs-toggle="tab">
                                <FontAwesomeIcon className="mr-3" size="lg" icon={faPlayCircle} />
                                    Vidéos
                            </a>
                            <a className="product-tab-link tab-link" href="#republications" data-bs-toggle="tab">
                                <FontAwesomeIcon className="mr-3" size="lg" icon={faRetweet} />
                                    Republications
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
                        <div id="republications" className="tab-pane fade">
                            <div className="row">
                               
                            <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">
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

                        {/* Section Vidéos */}

                          <div id="videos" className="tab-pane fade show active">
                            <div className="row">

                          
                              {videos.map((item) => (
                                                        <>
                                                            <div className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" key={item?.id} data-aos="fade-up" data-aos-duration="700">
                                                              

                                                            <div className="product-card video_card">
                                                                <div className="product-card-img">
                                                                    <a className="hover-switch"
                                                                      data-fancybox="video-gallery"
                                                                      href={item?.path}
                                                                      data-caption="Video 1">
                                                                        
                                                                    <img src={item?.thumbnail} alt="video" className='img'/>
                                                                    <button className="play-button">▶</button>
                                                                        
                                                                    </a>
                                                                
                                                                </div>

                                                            </div>
                                                            </div>
                                                            </>
                                                      ))}

                                        </div>
                                

                        </div>
 
                       
                    </div>
                </div>

                </div>
              </div>  
             
             
          </div>        
        </div>


        {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Contributeurs"
        overlayClassName="custom-overlay"
        className="custom-modal"
        ariaHideApp={false} 
      >

        <h3>
          Contributeurs
        </h3>
         
        {contributor.map((value, keys) =>{
          return(
          <p className="post">
              <p to={Influenceur}>{value.name} --- {value.Role}</p>
          </p>)
        })}
        

        <button onClick={closeModal}>Retour</button>
      </Modal>



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

export default SingleViewI
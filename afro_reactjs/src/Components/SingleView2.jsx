// import React from 'react'
import React, { useState, useEffect } from 'react';
import { Link , useLocation } from 'react-router-dom';
import axios from 'axios'
import Header_menu from './Header_menu'
import Footer from './Footer'
import Modal from 'react-modal';


import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';


// import image_a from "/assets/img/products/bags/1.jpg"
// import image_t from "/assets/img/products/bags/2.jpg"
// import image_s from "/assets/img/products/bags/3.jpg"
// import image_k from "/assets/img/products/bags/4.jpg"
// import image_f from "/assets/img/products/bags/5.jpg"
// import image_b from "/assets/img/products/shoe/1.jpg"
// import image_o from "/assets/img/products/shoe/2.jpg"
// import image_x from "/assets/img/products/shoe/3.jpg"
// import image_r from "/assets/img/products/shoe/4.jpg"
// import Genre_links from './Genre_links'
// import test from "../../public/assets/img/products/shoe/1.jpg"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faFacebook, faLinkedin, faYoutube, faWhatsapp, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {faUser,faCalendar, faImage,faFilm ,faList ,faContactCard,faHeart,faComment, faInfo} from '@fortawesome/free-solid-svg-icons';
import { map } from 'jquery';
import Influenceur from '../Pages/infuenceur';


function SingleView() {



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
 
 
   const apiUrl = 'https://apiafro.aafrodites.com'
 
   const param = {type_model, id_model}

   useEffect(() => {
    console.log('use effect')
    console.log(param)
  
      const fetchData = async () => {
       
        try {
         
          console.log('request send')
          
           
         const rep1 = await axios.post(`${apiUrl}/fashion_model/this_model`, param );
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
  
    console.log(this_model)
 

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
 
  return (
    <>
        <Header_menu data ={{ link : 'mannequin' }}/>
        <div className="main_container">
          <div className="agent_description col-12 col-sm-12">

          {principal_data.map((p) => (
                                  <>

              <div className="row description_content">
                <div className="col-12 col-lg-3 col-md-3 col-sm-12 img_box">
                      <div className="product-card desc_picture">

                        <div className="photoRx">
                              <div className="product-card-img">
                                  <a className="hover-switch" href={`${apiUrl}/${p?.path_image}`} data-fancybox="gallery">
                                   <img src={`${apiUrl}/${p?.path_image}`} alt={`${apiUrl}/${p?.path_image}`} className='img'/>                                                                      
                              </a>

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
                                <button className='contactInfo contactInfo1 d-none' onClick={openContactModal}>
                                  Contact Info
                                </button>

                              </div>

                        </div>
                         

                        


                        <div className="agent_name">
                        <h6>{p?.nom} {p?.pseudo}</h6>
                          <div className="categorie_agent">
                            <label htmlFor="">
                              Mannequin 
                              <span className='flag'>
                                <img src="/assets/img/flags/tg.jpeg" alt="" />
                              </span>
                            </label>
                          </div>

                            <hr className='bg-white' />
                          <div className="personalInformation">

                            <div className="item">
                              <div className="label">
                                <p>
                                  Taille
                                </p>
                              </div>
                              <div className="value">
                                <p>
                                  1.70m
                                </p>
                              </div>
                            </div>

                            <div className="item">
                              <div className="label">
                                <p>
                                  Robe
                                </p>
                              </div>
                              <div className="value">
                                <p>
                                  34
                                </p>
                              </div>
                            </div>

                            <div className="item">
                              <div className="label">
                                <p>
                                  Chaussures
                                </p>
                              </div>
                              <div className="value">
                                <p>
                                  45
                                </p>
                              </div>
                            </div>
                            
                          </div>

                          <div className="personalInformation">
                          <div className="item">
                              <div className="label">
                                <p>
                                  Poitrine
                                </p>
                              </div>
                              <div className="value">
                                <p>
                                  75
                                </p>
                              </div>
                            </div>

                            <div className="item">
                              <div className="label">
                                <p>
                                  Hanche
                                </p>
                              </div>
                              <div className="value">
                                <p>
                                  88
                                </p>
                              </div>
                            </div>

                            <div className="item">
                              <div className="label">
                                <p>
                                  Waist
                                </p>
                              </div>
                              <div className="value">
                                <p>
                                  60
                                </p>
                              </div>
                            </div>

                          </div>

                          <hr className='bg-white'/>

                        <button className='contactInfo contactInfo2' onClick={openContactModal}>
                          Contact Info
                        </button>

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
                               
                              Calendrier de l'agent
                           </div>
                        </div>

                        {/* Section Photos */}
                        <div id="photos" className="tab-pane fade show active">
                            <div className="row">
                            {this_model.map((item) => (
                                  <>
                                  {item?.type_image === 2 &&
                                  
                                  (
                                    <>
                               <div  key={item?.id_image} className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">
                                <div className="product-card">
                                  <div className="product-card-img">
                                  <a className="hover-switch" data-fancybox="gallery"  href={`${apiUrl}/${item?.path_image}`}>
                                          <img src={`${apiUrl}/${item?.path_image}`} alt={`${apiUrl}/${item?.path_image}`} className="img" />
                                        </a>
                                  </div>
                                  <div className="interaction_buttons">
                                      <button className="like-button">
                                        <FontAwesomeIcon icon={faHeart} /> <span>31</span>
                                      </button>
                                        
                                      <button className="comment-button">
                                        <FontAwesomeIcon icon={faComment} /> <span>30</span>
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


  <Footer /> 
    </>
  )
}

export default SingleView
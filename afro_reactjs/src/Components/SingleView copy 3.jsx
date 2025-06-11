// import React from 'react'
import React, { useState, useEffect } from 'react';
import { Link , useLocation } from 'react-router-dom';
import axios from 'axios'
import Header_menu from './Header_menu' 
import Modal from 'react-modal';
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import Calendar_view from '../Pages/Calendar_view';
import Timeline_view from '../Pages/Timeline_view';
import FixedMenu from '../Components/FixedMenu';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faFacebook, faLinkedin, faYoutube, faWhatsapp, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {faShare,faCalendar, faUserPlus,faIdCard, faImage,faFilm ,faList ,faThumbsUp,faHeart,faComment, faInfo} from '@fortawesome/free-solid-svg-icons';
 import ImageModal from './ImageModal'; 

 const apiUrl = 'https://apiafro.aafrodites.com'

 
function SingleView() {
  let current_location = useLocation();
  const link_url = current_location?.pathname.split('/');
 const [loading, setLoading] = useState(true); // Loader state
  const [loading_img, setLoading_img] = useState(false); // Loader state
 
 axios.defaults.withCredentials = true;
 const type_model = link_url[2];
 const id_model =  link_url[3];
 // const apiUrl = 'http://localhost:5000'
const param = {type_model, id_model}
  // zone de détail sur le model
 // afficher les détail en partie ou all
  const [showAll, setShowAll] = useState(false); // Etat pour contrôler l'affichage des données
  
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  
  const modelData = [
    { label: 'Popularité', value: '56K' },
    { label: 'Taille', value: '1.70m' },
    { label: 'Hanche', value: '88' },
    { label: 'Robe', value: '34' },
    { label: 'Chaussures', value: '45' },
    { label: 'Poitrine', value: '75' },
    { label: 'age', value: '19 ans' },
    
  ];
 
   const [principal_data, setprincipal_data] = useState([]);

     const [secondary_data, setsecondary_data] = useState([]);
       
      // récupération des données
      useEffect(() => {
  
        const fetchData = async () => {
         
          try {
              
            // setLoading(true); // Active le loader
          //  const rep1 = await axios.post(`${apiUrl}/fashion_model/this_model`, param );
    
           const rep2 = await axios.post(`${apiUrl}/fashion_model/this_model_data`, param );
         

         
        
              const groupedResults = rep2?.data?.list_rep.reduce((acc, row) => {
                // Vérifie si le mannequin existe déjà dans l'accumulateur
                let listimg = acc.find(item => item.id_image === row.id_image);
                
                if (!listimg) {
                
                  // Si non, crée une nouvelle entrée pour ce mannequin
                  listimg = {
                    id_image: row.id_image,
                    image_name: row.image_name,
                    nom: row.nom,
                    pseudo: row.pseudo,
                    type_image: row.type_image,
                    type_model: row.type_model,
                    userclient: row.userclient,
                    paths: {} };
                  acc.push(listimg);
                }
                
                
                // Ajoute le path_image correspondant au type_resolution
                switch (row.type_resolution) {
                  
                  case 3:
                    listimg.paths.path_hrd = row.path_resolution;
                    break;
                  case 4:
                    listimg.paths.path_hrm = row.path_resolution;
                    break;
                  case 5:
                    listimg.paths.path_md = row.path_resolution;
                    break;
                  case 6:
                    listimg.paths.path_mm = row.path_resolution;
                    break;
                  default:
                    // Si un type inconnu est trouvé, le traiter ou ignorer
                    // console.warn(`Type de résolution inconnu : ${row.type_resolution}`);
                    break;
                }
    
                return acc;
              }, []);
    
              
              // Separate images by type
                  const type1Images = groupedResults.filter(image => image.type_image === 1);
                  const type2Images = groupedResults.filter(image => image.type_image === 2);
                  setprincipal_data(type1Images)
                  setsecondary_data(type2Images)
                
    
          } catch (err) {
            console.log(err);
          
          }
          finally {
            setLoading(false); // Désactive le loader
          }
        };
        fetchData();
      } , []);
    
    
//fin zone de détail sur le model
 
//  data de second zone de la page(renfermantimages, video,event, etc=)


//  gestion des nav de//  set image by resolution
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

     

  //  nav des onglets
const [isFixed, setIsFixed] = useState(false);
useEffect(() => {
  const handleScroll = () => {
    const secondaryNavbar = document.querySelector('.title_nav');
    const stickyPosition = secondaryNavbar.offsetTop;

    if (window.pageYOffset >= stickyPosition) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);

// end gestion de second navbar

// les images des models
const [selectedImage, setSelectedImage] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);

const openModal = () => setModalIsOpen(true);

// const closeModal = () => setModalIsOpen(false);

const handleImageClick = (image) => {
  setLoading_img(true);
  setSelectedImage(image);
  setIsModalOpen(true);

  // Update the URL to include the image ID when the modal opens
  const imageUrl = `#${image.id_image}`; // Example URL: #123
  window.history.pushState({ modal: true }, '', imageUrl);
};

const handleDataLoaded = (isLoaded) => {
  if (isLoaded) {
    setLoading_img(false);
    console.log("Data has been loaded successfully.");
    // Optionally update any other state or trigger side effects
  }
};

const handleCloseModal = () => {
  setIsModalOpen(false);
  setSelectedImage(null);
  console.log("Modal closed");

  // Revert the URL to the original one when the modal closes
  window.history.replaceState({}, '', window.location.pathname);
};

// Listen for browser back/forward navigation events
useEffect(() => {
  const handlePopState = () => {
    if (window.location.hash) {
      const imageId = window.location.hash.substring(1); // Extract the ID from #id_image
      // Check if the ID corresponds to an image and handle reopening the modal
      const image = findImageById(imageId); // Replace with your logic to find the image by ID
      if (image) {
        setSelectedImage(image);
        setIsModalOpen(true);
      }
    } else {
      // If there's no hash, ensure the modal is closed
      setIsModalOpen(false);
      setSelectedImage(null);
    }
  };

  // Attach the event listener
  window.addEventListener('popstate', handlePopState);

  // Cleanup the event listener on component unmount
  return () => {
    window.removeEventListener('popstate', handlePopState);
  };
}, []);
 
// end images des models
 
// events
const [TypeView, setTypeView] = useState("calendar");

const handleView = (event) => {
  setTypeView(event.currentTarget.dataset.mode);
};
// end events
// fin data de second zone de la page(renfermantimages, video,event, etc=)
     
// Afficher un loader si la page est en cours de chargement
  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Chargement en cours...</p>
      </div>
    );
  }
 
  
  return (
    <>

    {(loading === true) || (loading_img === true) &&

      (
        <div className="loader-container">
        <div className="spinner"></div>
        <p>Chargement en cours...</p>
      </div>

      )
    }
        <Header_menu data ={{ link : 'mannequin' }}/>
        <div className="main_container">
          <div className="agent_description col-12 col-sm-12">

        
                                 
              <div className="row description_content">
              {/* <MannequinNavigation className="custom-MnavigationMobile"/> */}
              {principal_data.map((p) => (
                <div key={p.id} className="col-12 col-lg-3 col-md-3 col-sm-12 img_box">
                        <div className="product-card desc_picture container_primary">
      <div className="start_box">
        <div className="model_identity">
          <div className="product-card-img">
            <a className="hover-switch" href={`${apiUrl}/${getPathForResolution(p.paths)}`} data-fancybox="gallery">
              <img
                src={`${apiUrl}/${getPathForResolution(p.paths)}`}
                alt="image"
                className="img profile-image"
              />
            </a>

            
          </div>
          <div className="name">
            <label className="modelname">{p?.pseudo}</label>
            <div className="categorie_agent">
              <a href="/mannequins" className="cstm_link_w">
                mannequin
              </a>
            </div>
          </div>
        </div>

        <div className="rs_box">
          <ul className="list_rxsx">
            <li className="rxsx_item">
              <a href="/">
                <FontAwesomeIcon icon={faInstagram} size="sm" />
              </a>
            </li>
            <li className="rxsx_item">
              <a href="/">
                <FontAwesomeIcon icon={faYoutube} size="sm" />
              </a>
            </li>
            <li className="rxsx_item">
              <a href="/">
                <FontAwesomeIcon icon={faTiktok} size="sm" />
              </a>
            </li>
            <li className="rxsx_item">
              <a href="/">
                <FontAwesomeIcon icon={faLinkedin} size="sm" />
              </a>
            </li>
            <li className="rxsx_item">
              <a href="/">
                <FontAwesomeIcon icon={faFacebook} size="sm" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="center_box">
        <div className="top_box">
          
        </div>
        <div className="bottom_box">
        <div className="image_zone">

        <img src={"/assets/img/morpho/morpho_h.jpg"} loading="lazy" alt="morpho" />
      
        </div>
          </div>
         <div className="under_box">
                                     <a className='btn_like'>
                                          <FontAwesomeIcon className='icon' icon={faThumbsUp} />
                                    </a>
                                  
                                    <a className='btn_follow'>
                                        <FontAwesomeIcon className='icon' icon={faUserPlus} />
                                    </a>
                                    <a className='btn_like'>
                                          <FontAwesomeIcon className='icon' icon={faShare} />
                                    </a>

        </div>
      </div>

      <div className="end_box">
        <div className="personalInformation">
        
<div className="list">
<div className="dropdown-container">
      <div className="dropdown">
        <ul className="dropdown-list">
          {modelData.slice(0, showAll ? modelData.length : 4).map((item, index) => (
            <li key={index} className="dropdown-item">
              <strong>{item.label}:</strong> {item.value}
            </li>
          ))}
        </ul>
        <button className="dropdown-toggle" onClick={toggleShowAll}>
          {showAll ? '-' : '+'}
        </button>
      </div>
    </div>
</div>
         
        </div>
         
      </div>
                     </div>
                </div>
              ))}

                <div className="col-12 col-lg-9 col-md-9 col-sm-12 details_zone">
                  
                <div className="container tab_list_box">
                    <div className="tab-list product-tab-list sticky_nav">
                          <nav className= {`nav title_nav ${isFixed ? 'fixed_navb' : ''}`}>
                              
                            
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
                        
                      
                        {/* Section Photos */}
                          <div id="photos" className="tab-pane fade show active">
                            <div className="row gallery-container">
                                

                            {secondary_data.map((item ,index) => (
                                  <>
                                  {secondary_data.length > 0 &&
                                  
                                  (
                                    <>
                               <div  key={item?.id_image} data-id={item.id_image} className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">
                                <div className="product-card">
                                  <div className="product-card-img">
                                    
                                
                                     <label className="hover-switch">                                  
                                        <img
                                      key={item.id_image}
                                      src={`${apiUrl}/${getPathForResolution(item.paths)}` }
                                      alt={getPathForResolution(item.paths)} 
                                   
                                       className="thumbnail"
                                      onClick={() => handleImageClick(item)}
                                    /> 
                                      </label>  

                                  
                                    
                                  </div>

                                  {/* {getPathForResolution(item.paths)} */}
                                  
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

                    </div>
                </div>

                </div>
              </div>  
                         
          </div>        
        </div>


        {/* Modal */}
                     {isModalOpen && selectedImage && (
                                <ImageModal 
                                    image={selectedImage}
                                    data = {secondary_data}
                                    onDataLoaded={handleDataLoaded} // Pass callback to the child
                                    onClose={handleCloseModal} 
                                 />
                      )}

      <FixedMenu/>
    </>
  )

}

export default SingleView
// import React from 'react'
import { useState, useEffect } from 'react';
import {useLocation } from 'react-router-dom';
import axios from 'axios'
import Header_menu from './Header_menu'
// import Footer from './Footer'
import Modal from 'react-modal';


import { Tooltip, OverlayTrigger} from 'react-bootstrap';

// import ImageModal from './ImageModal';

import Calendar_view from '../Pages/Calendar_view';
import Timeline_view from '../Pages/Timeline_view';
import FixedMenu from '../Components/FixedMenu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faYoutube, faWhatsapp, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {faShare,faCalendar, faUserPlus,faIdCard, faImage,faFilm ,faList ,faThumbsUp,faHeart,faComment, faInfo} from '@fortawesome/free-solid-svg-icons';
import ImageModal from './ImageModal';
import { useAuth } from "../Context/AuthenticateContext.jsx";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SingleView() {
  const auth = useAuth();
  const user_info = auth.currentUser;


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

   // list link param
   let current_location = useLocation();
   const link_url = current_location?.pathname.split('/');
  const [loading, setLoading] = useState(true); // Loader state
  
    const [loading_img, setLoading_img] = useState(false); // Loader state
  
   axios.defaults.withCredentials = true;
  
   const type_model = link_url[2];
   const id_model =  link_url[3];
 
   const [isFixed, setIsFixed] = useState(false);
   const [this_model, setthis_model] = useState([]); 
   const [this_modelNew, setthis_modelNew] = useState([]); 
   const [isEnriched, setIsEnriched] = useState(false);
   const [principal_data, setprincipal_data] = useState([]);

     const [secondary_data, setsecondary_data] = useState([]);
      

 
  const apiUrl = 'https://apiafro.aafrodites.com'
    // const apiUrl = 'http://localhost:5000'

    const [hasLiked, setHasLiked] = useState(false);
   
   
    const [pageId, setPageId] = useState(null);
    const param = {type_model, id_model}
  
  const [likeCount, setLikeCount] = useState(0);
 
     // Fetch stats for a specific image
  const fetchStats = async (id) => {
    console.log('sent id' + id)
    try {
      const rep_posts = await axios.post(`${apiUrl}/posts/stats`, {
        id: id,
        categorie: 2,
        type: 1,
        url : current_location?.pathname
      });

      if (rep_posts?.data) {

       
        // return false;
        const info_post = rep_posts?.data?.stats;
        setLikeCount(info_post?.likes_count);
        // setShareCount(info_post?.shares_count);
        setPageId(rep_posts?.data?.id);

        
      }
      return rep_posts.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques', error);
    }
  };
    // Fetch stats for a specific image
  const fetchhasLiked = async (id) => {
    try {

     
      const rep_hasliked = await axios.post(`${apiUrl}/posts/hasLike_page`, {
        id: id,
           user: user_info?.id, //
      });

            return rep_hasliked?.data;
      
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques', error);
    }
  };
  
   const handleLike = async (id) => {

     
    if (hasLiked) {
      // alert('Vous avez déjà aimé cette page');
      toast.info('Vous avez déjà aimé cette page !');
    } else {
      try {
        const like_post = await axios.post(`${apiUrl}/posts/like_page`, {
          id: id,
          // id_post: postId,
          user: user_info?.id,
        });

         console.log("like_post.data")
          console.log(like_post.data)
        //  return false;
        if (like_post) {
          if(like_post.data?.value === 1)
          setLikeCount(likeCount + 1);
          setHasLiked(true);
            // Afficher un message de succès avec Toastify
            toast.success('Page aimée avec succès !');
        }
        else{
            // Afficher un message de succès avec Toastify
            toast.success('erreur lors de l\'action !');
        }
      } catch (error) {
        console.error('Erreur lors du like', error);
      }
    }
  };  

  useEffect(() => {
  
    const fetchData = async () => {
     
      try {
          
        setLoading(true); // Active le loader
   
       const rep1 = await axios.post(`${apiUrl}/fashion_model/this_model`, param );

       const rep2 = await axios.post(`${apiUrl}/fashion_model/this_model_data`, param );
     
    
     
       setthis_model(rep1.data);

       const principal_image =  rep1.data.filter(li => li.type_image === 1);
       
       if(principal_image.length === 1){
        setprincipal_data(principal_image)
       }
      
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
                pseudo_model: row.pseudo_model,
                idmannequin: row.idmannequin,
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
                console.warn(`Type de résolution inconnu : ${row.type_resolution}`);
                break;
            }

            return acc;
          }, []);

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

 useEffect(() => {
  
    const fetchData_b = async () => {
     
      try {
  
     if(principal_data[0]?.userclient){
     
         setLoading(true); // Active le loader
        //  const stats_info = await fetchStats(principal_data[0]?.userclient); // Fetch stats for the image
         const like_state = await fetchhasLiked(principal_data[0]?.userclient); // Fetch stats for the image
 
             
        setHasLiked(like_state.success)
        setLoading(false); // Active le loader
           

     }
      
      
      } catch (err) {
        console.log(err);
      
      }
      finally {
        setLoading(false); // Désactive le loader
      }
    };
    fetchData_b();
  } , [principal_data]);
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
    const [selectedImage, setSelectedImage] = useState(null);
     const [isModalOpen, setIsModalOpen] = useState(false);

     
  const handleDataLoaded = (isLoaded) => {
    
    if (isLoaded) {
       setLoading_img(false)

      // console.log("Data has been loaded successfully.");
      // Optionally update any other state or trigger side effects
    }
  };
    
  const handleImageClick = (image) => {
   
    setSelectedImage(image);
    setIsModalOpen(true);
    console.log(image)
   
    
    setLoading_img(true)

    // Construire le lien de l'image avec un format hash
 const imageUrl = `#image_${image.id_image}`;  // Exemple : #image_123

 // Ajouter l'ID de l'image au hash sans modifier le reste de l'URL
 window.location.hash = imageUrl;  // Ajoute le hash à l'URL actuelle
 
 };
 
  const handleCloseModal = () => {
    // alert('close modal');
    setIsModalOpen(false);
    setSelectedImage(null);
    // Revert the URL to the original one (i.e., without the modal's image ID)
    window.history.replaceState({}, '', window.location.pathname);
  };

  useEffect(() => {
    // Function to handle popstate event, which fires on back button press
    const handlePopState = (e) => {
     
      if (isModalOpen === true) {
        handleCloseModal(); // Close modal if state indicates it's open
      }
    };

    // Listen for popstate event
    window.addEventListener('popstate', handlePopState);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isModalOpen]);
  

     
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

      // const [contactModalOpen, setContactModalOpen] = useState(false);
      // const openContactModal = () => setContactModalOpen(true);
      // const closeContactModal = () => setContactModalOpen(false);

      

      const [TypeView, setTypeView] = useState("calendar");

      const handleView = (event) => {
        setTypeView(event.currentTarget.dataset.mode);
      };
       
      
//  set image by resolution
   const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

      // Détecter les changements de taille de l'écran
      useEffect(() => {
        const handleResize = () => {
          setDeviceWidth(window.innerWidth);
        };
    
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    
        const getPathForResolution = (paths) => {
            if (deviceWidth <= 720) {
          return paths.path_mm; // Résolution miniature
        } else if (deviceWidth <= 1080) {
          return paths.path_md; // Résolution moyenne
        } else {
          return paths.path_md; // Résolution haute
        }
      };

    

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

    {loading_img === true &&

      (
        <div className="loader-container">
        <div className="spinner"></div>
        <p>Chargement en cours...</p>
      </div>

      )
    }
        <Header_menu data ={{ link : 'mannequin' }}/>
        <div className="main_container">
        <ToastContainer />
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

       
      </div>

      <div className="center_box">
        <div className="top_box">
        <div className="name">
            <label className="model_name">{p?.pseudo}</label>
           
          </div>
        </div>
        <div className="under_box">
                                     <a href="#"
                                       onClick={() => handleLike(p?.userclient)}
                                       className={`btn_like ${hasLiked === true ? 'active' : ''}`} 
                                     
                                       disabled={hasLiked === true}  // Désactive le bouton si l'utilisateur a déjà aimé
                                     

                                       >
                                          <FontAwesomeIcon className='icon' icon={faThumbsUp} />
                                          <span className="stat">{likeCount}</span>
                                    </a>
                                  
                                    <a className='btn_follow'>
                                        <FontAwesomeIcon className='icon' icon={faUserPlus} />
                                    </a>
                                    <a className='btn_like'>
                                          <FontAwesomeIcon className='icon' icon={faShare} />
                                    </a>

        </div>
        <div className="bottom_box">
        <div className="image_zone">

        <img src={"/assets/img/morpho/morpho_h.jpg"} loading="lazy" alt="morpho" />
      
        </div>
          </div>
        
      </div>

      <div className="end_box">
          
<div className="data_detail">
<div className="dropdown-container">
  <div className="dropdown_data">
    <ul className="dropdown-list">
      {modelData.slice(0, showAll ? modelData.length : 4).map((item, index) => (
        <li key={index} className="dropdown-item">
          <strong>{item.label}:</strong> {item.value}
        </li>
      ))}
    </ul>
    <button className="dropdown-toggle_b" onClick={toggleShowAll}>
      {showAll ? '-' : '+'}
    </button>
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
                            <div className="row gallery-container models_gallery">
                                

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


      {/* <Modal
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
      </Modal> */}

      <FixedMenu/>
    </>
  )
}

export default SingleView
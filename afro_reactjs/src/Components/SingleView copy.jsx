// import React from 'react'
import React, { useState, useEffect } from 'react';
import { Link , useLocation } from 'react-router-dom';
import axios from 'axios'
import Header_menu from './Header_menu'
// import Footer from './Footer'
import Modal from 'react-modal';
// import morpho_O from 'assets/'
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
import {faShare,faCalendar, faUserPlus,faIdCard, faImage,faFilm ,faList ,faThumbsUp,faHeart,faComment, faInfo} from '@fortawesome/free-solid-svg-icons';
// import ImageModal from '../../admin templ/src/Components/ImageModalO';
import ImageModal from './ImageModal';
import AvatarCanvas from './AvatarCanvas';
// import { map } from 'jquery';
// import Influenceur from '../Pages/infuenceur'; 
function SingleView() {

  // const [dropdownOpen, setDropdownOpen] = useState(false); // Etat pour ouvrir/fermer le dropdown

  // const [showAll, setShowAll] = useState(false); // État pour contrôler l'affichage

  // const mannequinData = {
  //   pseudo: "John Doe",
  //   paths: "path/to/image.jpg",
  //   taille: 1.80, // Taille en mètres
  //   poids: 75,    // Poids en kg
  //   sexe: "homme",
  //   visage: "ovale", // Forme du visage
  //   cheveux: "brun", // Couleur des cheveux
  //   yeux: "marrons", // Couleur des yeux
  // };

  const [showAll, setShowAll] = useState(false); // Etat pour contrôler l'affichage des données
  // const [dropdownOpen, setDropdownOpen] = useState(false); // Etat pour ouvrir/fermer le dropdown
  // const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  // const handleToggle = () => {
  //   setShowAll(!showAll);

  //   console.log("showAll")
  //   console.log(showAll)
  //   // setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
  // };
  const modelData = [
    { label: 'Popularité', value: '56K' },
    { label: 'Taille', value: '1.70m' },
    { label: 'Hanche', value: '88' },
    { label: 'Robe', value: '34' },
    { label: 'Chaussures', value: '45' },
    { label: 'Poitrine', value: '75' },
    { label: 'age', value: '19 ans' },
    // { label: 'Waist', value: '60' },
  ];

  

   // list link param
   let current_location = useLocation();
   const link_url = current_location?.pathname.split('/');
  const [loading, setLoading] = useState(true); // Loader state
  
    const [loading_img, setLoading_img] = useState(false); // Loader state
  //  console.log(link_url)
  
   axios.defaults.withCredentials = true;
 
   
   const type_model = link_url[2];
   const id_model =  link_url[3];
 
   const [isFixed, setIsFixed] = useState(false);
   const [this_model, setthis_model] = useState([]); 
   const [this_modelNew, setthis_modelNew] = useState([]); 
   const [isEnriched, setIsEnriched] = useState(false);
   const [principal_data, setprincipal_data] = useState([]);

     const [secondary_data, setsecondary_data] = useState([]);
      const [list_photgraphes, setlist_photgraphes] = useState([]);
      const [list_maquilleurs, setlist_maquilleurs] = useState([]);
      const [list_coiffeurs, setlist_coiffeurs] = useState([]);
      const [list_stylistes, setlist_stylistes] = useState([]);
   

      // console.log("principal_data")
      // console.log(principal_data)
  //  const [constributeurs, setContributeurs] = useState([]);
  //  const [Photographe, setPhotographe] = useState("");
  //  const [styliste, setStyliste] = useState("");
  //  const [maquilleur, setMaquilleur] = useState("")
  //  const [coiffeur, setCoiffeur] = useState("");
 
 
  const apiUrl = 'https://apiafro.aafrodites.com'
    // const apiUrl = 'http://localhost:5000'

 
   const param = {type_model, id_model}

   
  useEffect(() => {
  
    const fetchData = async () => {
     
      try {
          
        setLoading(true); // Active le loader
       const rep1 = await axios.post(`${apiUrl}/fashion_model/this_model`, param );

       const rep2 = await axios.post(`${apiUrl}/fashion_model/this_model_data`, param );
     
       const photogr = await axios.get(`${apiUrl}/photographer/all` );
       const coif = await axios.get(`${apiUrl}/coiffeur/all` );
       const styl = await axios.get(`${apiUrl}/styliste/all` );
       const maqui = await axios.get(`${apiUrl}/maquilleur/all`);
     
      //  console.log(rep1)
      setlist_photgraphes(photogr?.data)
      setlist_maquilleurs(maqui?.data)
      setlist_coiffeurs(coif?.data)
      setlist_stylistes(styl?.data)
     
       setthis_model(rep1.data);

       const principal_image =  rep1.data.filter(li => li.type_image === 1);
       
       if(principal_image.length === 1){
        setprincipal_data(principal_image)
       }
      
      //  console.log("principal_image")
      //  console.log(principal_image)
                 
      //  console.log("rep2")
      //  console.log(rep2)

          const groupedResults = rep2?.data?.list_rep.reduce((acc, row) => {
            // Vérifie si le mannequin existe déjà dans l'accumulateur
            let listimg = acc.find(item => item.id_image === row.id_image);
            // console.log("row")
            //   console.log(row)
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
              // case 1:
              //   mannequin.paths.path_od = row.path_resolution;
              //   break;
              // case 2:
              //   mannequin.paths.path_om = row.path_resolution;
              //   break;
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

          // console.log("groupedResults")
          // console.log(groupedResults)

          // Separate images by type
              const type1Images = groupedResults.filter(image => image.type_image === 1);
              const type2Images = groupedResults.filter(image => image.type_image === 2);
              setprincipal_data(type1Images)
              setsecondary_data(type2Images)
              // console.log(type1Images);
              // console.log(type2Images);

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

      console.log("Data has been loaded successfully.");
      // Optionally update any other state or trigger side effects
    }
  };
    
  const handleImageClick = (image) => {
    // setSelectedImage(image);
    // setIsModalOpen(true);

    // setLoading(true)
   setSelectedImage(image);
    setIsModalOpen(true);
    console.log(image)
    // setLoading(true)
    setLoading_img(true)

     // Update the URL to include the image ID, reflecting that the modal is open
     const imageUrl = `/image/${image.id_image}`;  // Example URL: /image/123
     window.history.pushState({ modal: true }, '', imageUrl);
 
    // setLoading_img(false)
  };

  // Handle the browser back button or native back button to close the modal
  useEffect(() => {
    // Function to handle popstate event, which fires on back button press
    const handlePopState = (e) => {
      if (e.state?.modal) {
        handleCloseModal(); // Close modal if state indicates it's open
      }
    };

    // Listen for popstate event
    window.addEventListener('popstate', handlePopState);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
     // Revert the URL to the original one (i.e., without the modal's image ID)
     window.history.replaceState({}, '', window.location.pathname);
  };
     
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
//   const [images, setimages] = useState([]); 
// //   useEffect(() => {
// // if(this_modelNew.length > 0){
  
// //   const list = [
// //     ...new Set(
// //       this_modelNew.map((p) => ({
// //         id: p?.id,
// //         location: "Lomé",
// //           thumb: p?.path_image,
// //         src: p?.path_image,
// //         title:p?.pseudo,
// //         caption: `
// //         <div class="captiondata">
// //           <h4>${p?.pseudo || "Sans nom"}</h4>
// //             <div class='item_li'><label>Photographes:</label> ${
// //             p?.list_photograph?.photographes
// //               ?.map((photographe) => `<a href="/singleViewP/4/${photographe[0]?.id}" style="margin-right: 5px;">${photographe[0]?.pseudo}</a>`)
// //               .join(' ') || "-"
// //           }</div>
// //              <div class='item_li'><label>Stylistes:</label> ${
// //             p?.list_styliste?.stylistes
// //               ?.map((styliste) => `<a href="/singleViewP/7/${styliste[0]?.id}" style="margin-right: 5px;">${styliste[0]?.pseudo}</a>`)
// //               .join(' ') || "-"
        
// //           }</div>
// //             <div class='item_li'><label>coiffeurs:</label> ${
// //               p?.list_coiffeur?.coiffeurs
// //               ?.map((coiffeurs) => `<a href="/singleViewP/5/${coiffeurs[0]?.id}" style="margin-right: 5px;">${coiffeurs[0]?.pseudo}</a>`)
// //               .join(' ') || "-"
// //           }</div>
          
// //           <div class='item_li'><label>Maquilleurs:</label> ${
// //             p?.list_maquilleur?.maquilleurs
// //               ?.map((maquilleur) => `<a href="/singleViewP/6/${maquilleur[0]?.id}" style="margin-right: 5px;">${maquilleur[0]?.pseudo}</a>`)
// //               .join(' ') || "-"
// //           }</div>
       
// //         </div>
// //       `,

// //         }))
// //     ),
// //   ];
// //    setimages(list)
// // }
// //  } , [this_modelNew]);


//  console.log(images)

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
    
      // console.log("deviceWidth")
      // console.log(deviceWidth)
       // Fonction pour obtenir le chemin de l'image adapté à la largeur de l'appareil
       const getPathForResolution = (paths) => {
        // console.log("paths")
        // console.log(paths)
        if (deviceWidth <= 720) {
          return paths.path_mm; // Résolution miniature
        } else if (deviceWidth <= 1080) {
          return paths.path_md; // Résolution moyenne
        } else {
          return paths.path_md; // Résolution haute
        }
      };

      const getPathForResolution_b = (paths) => {
        // console.log("paths")
        // console.log(paths)
        if (deviceWidth <= 720) {
          return paths.path_hrm; // Résolution miniature
        } else if (deviceWidth <= 1080) {
          return paths.path_hrd; // Résolution moyenne
        } else {
          return paths.path_hrd; // Résolution haute
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
  // if (loading_img) {
  //   return (
  //     <div className="loader-container">
  //       <div className="spinner"></div>
  //       <p>Chargement en cours...</p>
  //     </div>
  //   );
  // }
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
          {/* <div className="model_data">
            <div className={`data-container ${dropdownOpen ? 'open' : ''}`}>
              {modelData.slice(0, showAll ? modelData.length : 5).map((item, index) => (
                <div className="data" key={index}>
                  <label className="label">{item.label}:</label>
                  <label className="value">{item.value}</label>
                </div>
              ))}
            </div>
            <div className="more_btn_container">
              <button className="btn_more" onClick={handleToggle}>
                {showAll ? '-' : '+'}
              </button>
            </div>
          </div> */}
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
          {showAll ? 'Show Less' : 'Show More'}
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

export default SingleView
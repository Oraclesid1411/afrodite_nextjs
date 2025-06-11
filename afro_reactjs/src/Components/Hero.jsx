
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect ,useRef  } from "react"; 
// import Loader from '../../Components/Loader';
import axios from 'axios' 


import Slider from "react-slick";

// import { useNavigate, Link } from 'react-router-dom'
// style

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../style.scss";

function Hero() {

    const settings = {
        arrows: false,
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
        // prevArrow:  <button className='slick-prev custom-prev'>
        //             <svg
        //             xmlns="http://www.w3.org/2000/svg"
        //             width="24"
        //             height="24"
        //             fill="none"
        //             viewBox="0 0 24 24"
        //             stroke="white"
        //         >
        //             <path
        //             strokeLinecap="round"
        //             strokeLinejoin="round"
        //             strokeWidth="2"
        //             d="M15 19l-7-7 7-7"
        //             />
        //         </svg> 
        //     </button>,
        //   nextArrow: <button   className='slick-next custom-next'>    
                                
        //                         <svg
        //                             xmlns="http://www.w3.org/2000/svg"
        //                             width="24"
        //                             height="24"
        //                             fill="none"
        //                             viewBox="0 0 24 24"
        //                             stroke="white"
        //                         >
        //                             <path
        //                             strokeLinecap="round"
        //                             strokeLinejoin="round"
        //                             strokeWidth="2"
        //                             d="M9 5l7 7-7 7"
        //                             />
        //                         </svg>
        //     </button>,
      };

  const apiUrl = 'https://apiafro.aafrodites.com'
      
  const [mannequins_data , setmannequins_data] = useState([]);

  const [isloaded, setIsloaded] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rep1] = await Promise.all([
          axios.post(`${apiUrl}/fashion_model/list_mannequin`),
        
        ]);
       
        setmannequins_data(rep1.data);
        // setIsloaded(false)
      } catch (err) {
        console.error("Erreur lors de la récupération des données :", err);
      }
    };
   
    // N'exécuter fetchData que si isloaded est true
      if (isloaded) {
        fetchData();
      }
  }, [isloaded]);


  
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
      case 1:
        mannequin.paths.path_od = row.path_resolution;
        break;
      // case 2:
      //   mannequin.paths.path_om = row.path_resolution;
      //   break;
      case 3:
        mannequin.paths.path_hrd = row.path_resolution;
        break;
      case 4:
        mannequin.paths.path_hrm = row.path_resolution;
        break;
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
        return paths.path_hrm; // Résolution miniature
      } else if (deviceWidth <= 1080) {
        return paths.path_hrd; // Résolution moyenne
      } else {
        return paths.path_hrd; // Résolution haute
      }
    };
    const getPathForResolution_hg = (paths) => {
      // console.log("paths")
      // console.log(paths)
      if (deviceWidth <= 720) {
        return paths.path_hrm; // Résolution miniature
      } else if (deviceWidth <= 1080) {
        return paths.path_od; // Résolution moyenne
      } else {
        return paths.path_od; // Résolution haute
      }
    };
  return (
    <>
        <div className="slideshow-section position-relative">
                 <Slider {...settings} className="">  
                 {groupedResults.map((item , index) => (                      
                    <div key={item?.id_mannequin}  className="slide-item slide-item-bag position-relative imageJ">
                         <img 
                           // src={`${apiUrl}/${item?.path_image}`} 
                           loading="lazy"
                           className="img-fluid  d-md-none" 
                           src={`${apiUrl}/${getPathForResolution_hg(item.paths)}`

                       }
                           alt="model"/>
                        {/* <img className=" full slide-img d-none d-md-block imgJ" src="/assets/models/real/real6.webp" alt="slide-1"/>
                        <img className="sm slide-img d-md-none" src="/assets/models/real/real6.webp" alt="slide-1"/> */}
                        <div className="content-absolute content-slide">
                            <div className="height-inherit d-flex align-items-center justify-content-end jj">
                             {index % 2 === 0 ?
                             (
                                <>
                                  <div className="content-box slide-content slide-content-1 py-4 text-center hero-slides-text">
                                    <h2 className="slide-heading heading_72 animate__animated animate__fadeInUp"
                                        data-animation="animate__animated animate__fadeInUp">
                                       site  en 
                                    </h2>
                                    <p className="slide-subheading heading_24 animate__animated animate__fadeInUp"
                                        data-animation="animate__animated animate__fadeInUp">
                                     construction
                                    </p>
                                    {/* <a className="btn-primary slide-btn animate__animated animate__fadeInUp incription-callToAction"
                                        href="/postuler"
                                        data-animation="animate__animated animate__fadeInUp">Inscription</a> */}
                                </div>
                                
                                </>
                             )
                            
                            :
                            
                            (

                                <>
                                  <div className="content-box slide-content slide-content-1 py-4 text-center hero-slides-text">
                                    <h2 className="slide-heading heading_72 animate__animated animate__fadeInUp"
                                        data-animation="animate__animated animate__fadeInUp">
                                       Rejoignez
                                    </h2>
                                    <p className="slide-subheading heading_24 animate__animated animate__fadeInUp"
                                        data-animation="animate__animated animate__fadeInUp">
                                      notre agence !
                                    </p>
                                    <a className="btn-primary slide-btn animate__animated animate__fadeInUp incription-callToAction"
                                        href="/postuler"
                                        data-animation="animate__animated animate__fadeInUp">Inscription</a>
                                </div>
                                
                                </>
                            )}
                             
                              
                            </div>
                        </div>
                    </div>
                    // <div className="slide-item slide-item-bag position-relative">
                    //     <img className=" full slide-img d-none d-md-block" src="/assets/models/munachimso/2.jpg" alt="slide-1"/>
                    //     <img className="sm slide-img d-md-none" src="/assets/models/munachimso/2.jpg" alt="slide-1"/>
                    //     <div className="content-absolute content-slide">
                    //         <div className="height-inherit d-flex align-items-center justify-content-end">
                    //             <div className="content-box slide-content slide-content-1 py-4 text-center hero-slides-text">
                    //                 <h2 className="slide-heading heading_72 animate__animated animate__fadeInUp"
                    //                     data-animation="animate__animated animate__fadeInUp">
                    //                    Rejoignez
                    //                 </h2>
                    //                 <p className="slide-subheading heading_24 animate__animated animate__fadeInUp"
                    //                     data-animation="animate__animated animate__fadeInUp">
                    //                   notre agence !
                    //                 </p>
                    //                 <a className="btn-primary slide-btn animate__animated animate__fadeInUp incription-callToAction"
                    //                    href="/postuler"
                    //                     data-animation="animate__animated animate__fadeInUp">Inscription</a>
                    //             </div>
                    //         </div>
                    //     </div>
                    // </div>
                    // <div className="slide-item slide-item-bag position-relative">
                    //     <img className=" full slide-img d-none d-md-block" src="/assets/models/mariam/mariam6.jpg" alt="slide-1"/>
                    //     <img className="sm slide-img d-md-none" src="/assets/models/mariam/mariam6.jpg" alt="slide-1"/>
                    //     <div className="content-absolute content-slide">
                    //         <div className="height-inherit d-flex align-items-center justify-content-end">
                    //             <div className="content-box slide-content slide-content-1 py-4 text-center hero-slides-text">
                    //                 <h2 className="slide-heading heading_72 animate__animated animate__fadeInUp"
                    //                     data-animation="animate__animated animate__fadeInUp">
                    //                    Rejoignez
                    //                 </h2>
                    //                 <p className="slide-subheading heading_24 animate__animated animate__fadeInUp"
                    //                     data-animation="animate__animated animate__fadeInUp">
                    //                   notre agence !
                    //                 </p>
                    //                 <a className="btn-primary slide-btn animate__animated animate__fadeInUp incription-callToAction"
                    //                   href="/postuler"
                    //                     data-animation="animate__animated animate__fadeInUp">Inscription</a>
                    //             </div>
                    //         </div>
                    //     </div>
                    // </div>

                      ))}

                 </Slider>
             

        </div>

    </>
  )
}

export default Hero
import React from 'react'
import Hero from './Hero'

import axios from "axios";
import  { useEffect, useState  } from 'react'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Parteners from './Parteners';
import { Link } from 'react-router-dom';

function MainContent() {

    const [fashion_models , setfashion_models] = useState([]);
    const [role_models , setrole_models] = useState([]);
    const [host_models , sethost_models] = useState([]);
    const [parteners , setParteners] = useState([]);
    const apiUrl = 'https://apiafro.aafrodites.com'

    const [mannequins_data , setmannequins_data] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const [rep1, rep2, rep3, rep4] = await Promise.all([
                axios.post(`${apiUrl}/fashion_model/list_mannequin`),
              axios.get(`${apiUrl}/role_model/all`),
              axios.get(`${apiUrl}/host_model/all`),
              axios.get(`${apiUrl}/styliste/all`),
            ]);
            setmannequins_data(rep1.data);
            setrole_models(rep2.data);
            sethost_models(rep3.data);
            setParteners(rep4.data);
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
        console.warn(`Type de résolution inconnu : ${row.type_resolution}`);
        break;
    }
  
    return acc;
  }, []);
  
  console.log("groupedResults");
  console.log(groupedResults);
  
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

  // Détecter les changements de taille de l'écran
  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log("deviceWidth")
  console.log(deviceWidth)
   // Fonction pour obtenir le chemin de l'image adapté à la largeur de l'appareil
   const getPathForResolution = (paths) => {
    console.log("paths")
    console.log(paths)
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
                    slidesToShow:2,
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
    console.log("fashion_models")
    console.log(fashion_models)

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
  
    

  return (
    <>
      <main id="MainContent" className="content-for-layout">

        <Hero/>
       

       

        <div className="row mb-2">
            <div className="col-12 bg-white text-center m-auto">
               
                     <div className="col_9">
                        <div className="center_title">
                            nos afrodites
                        </div>
                       
                        <div className="col_3">

{/*session des mannequins */}

   <div className='bg-dark mannequins-section'>

       <div className="content">
           <div className="title">
           <label htmlFor="">Mannequins</label>
           </div>
           <div className="slider text-center">
               <Slider {...settings2}>
               
               {groupedResults.map((item) => (
                   <div key={item?.idmannequin}  className='sliderContainer'>
                       <Link  to={`single_view/1/${item?.idmannequin}`}>
                           <img 
                           // src={`${apiUrl}/${item?.path_image}`} 
                           src={`${apiUrl}/${getPathForResolution(item.paths)}`

                       }
                           alt="mannequin" className='img'/>
                           
                       </Link>
                   </div>
               ))}
               
               
               </Slider>
           </div>
       </div>
   
       <div className="plusMannequin">
           {/* voir plus */}
           <a href="/mannequins"> voir
           <img src="/assets/models/add.png" alt=""/>
           </a>
       
       </div>
       
   </div>

</div>

<div className="col_3">

{/*session des hotesses d'accueil */}

   <div className='bg-dark mannequins-section'>

       <div className="content">
           <div className="title">
               <label htmlFor=""> Hotesses d'accueil </label>
           </div>
           <div className="slider text-center">
               <Slider {...settings2}>
               
               {host_models.map((item) => (
                   <div key={item?.idmannequin}  className='sliderContainer'>
                       <Link  to={`single_viewH/3/${item?.idhotesse}`}>
                           <img src={`${apiUrl}/${item?.path_image}`} alt="mannequin" className='img'/>
                       </Link>
                   </div>
               ))}
               
               
               </Slider>
           </div>
       </div>
   
       <div className="plusMannequin">
           {/* voir plus */}
           <a href="/hodesse_accueil"> voir
           <img src="/assets/models/add.png" alt=""/>
           </a>
       
       </div>
       
   </div>

</div>

<div className="col_3">

{/*session des influenceurs */}

   <div className='bg-dark mannequins-section'>

       <div className="content">
           <div className="title">
           <label htmlFor="">Influenceurs</label>
           </div>
           <div className="slider text-center">
               <Slider {...settings2}>
               
               {role_models.map((item) => (
                   <div key={item?.idmannequin}  className='sliderContainer'>
                       <Link  to={`singleViewI/2/${item?.idinfluenceur}`}>
                           <img src={`${apiUrl}/${item?.path_image}`} alt="mannequin" className='img'/>
                       </Link>
                   </div>
               ))}
               
               
               </Slider>
           </div>
       </div>
   
       <div className="plusMannequin">
           {/* voir plus */}
           <a href="/influenceur"> voir
           <img src="/assets/models/add.png" alt=""/>
           </a>
       
       </div>
       
   </div>

</div>

                      

                    </div>
                   
                    <div className="col-3 block hide">

                         {/*session des influenceurs */}

                            <div className='bg-dark mannequins-section'>

                                <div className="content">
                                    <div className="title">
                                    <label htmlFor="">Influenceurs</label>
                                    </div>
                                    <div className="slider text-center">
                                        <Slider {...settings2}>
                                        
                                        {role_models.map((item) => (
                                            <div key={item?.idmannequin}  className='sliderContainer'>
                                                <Link  to={`singleViewI/2/${item?.idinfluenceur}`}>
                                                    <img src={`${apiUrl}/${item?.path_image}`} alt="mannequin" className='img'/>
                                                </Link>
                                            </div>
                                        ))}
                                        
                                        
                                        </Slider>
                                    </div>
                                </div>
                            
                                <div className="plusMannequin">
                                    {/* voir plus */}
                                    <a href="/influenceur"> voir
                                    <img src="/assets/models/add.png" alt=""/>
                                    </a>
                                
                                </div>
                                
                            </div>

                    </div>


                 
            </div>
         
        </div>
       
   <div className='col-lg-3 col-12'>

            <div className="title text-center  pt-3">
                  <h4 className='text-white'>Découvrez nos Collabs</h4>
                </div>

                                            {/*session des mannequins */}

                            <div className='bg-dark mannequins-section'>

                                <div className="content">
                                    <div className="title">
                                    <label htmlFor="">Collabs</label>
                                    </div>
                                    <div className="slider text-center">
                                        <Slider {...settings2}>
                                        
                                        {parteners.map((item) => (
                                            <div key={item?.idstyliste}  className='sliderContainer'>
                                                <Link  to={`singleViewP/7/${item?.idstyliste}`}>
                                                    <img src={`${apiUrl}/${item?.path}`} alt="mannequin" className='img'/>
                                                    <a className="plus"  href={`singleViewP/7/${item?.idstyliste}`}>
                                                        <div>
                                                            VOIR
                                                        </div>
                                                        <div>
                                                            <img src="/assets/models/89.png" alt=""/>
                                                        </div>
                                                    </a>
                                                </Link>
                                            </div>
                                        ))}
                                        
                                        </Slider>
                                    </div>
                                </div>
                            
                                <div className="plusMannequin">
                                    {/* voir plus */}
                                    <a href="/parteners"> voir
                                    <img src="/assets/models/add.png" alt=""/>
                                    </a>
                                
                                </div>
                                
                            </div>

            </div>



 

      

        
          
      </main>
        

    </>
  )
}

export default MainContent
import React from 'react'
import Hero from './Hero'

import axios from "axios";
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

    console.log("maquilleurs_data")
    console.log(maquilleurs_data)
    console.log(photographes_data)
    console.log(stylistes_data)
    console.log(coiffeurs_data)
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
       
 
       
       
            <div className='col-12 box_container'>

               <div className="col-9 left_box">
                        <div className="title_hg center_title fs_gh">
                        <Link className='custom_title' to={"/mannequins"}>  nos afrodites</Link>
                  
                            
                        </div>
                  <div className="col-4 item_box">
                  <div className="content data_containerbox">
                    <div className="center_title fs_mh">
                      <Link className='custom_title' to={"/mannequins"}>Mannequins</Link>
                     
                   </div>
                   <div className="slider text-center">
               <Slider {...settings2}>
               
               {groupedResults.map((item) => (
                   <div key={item?.id_mannequin}  className='sliderContainer'>
                       <Link  to={`single_view/1/${item?.id_mannequin}`}>
                           <img 
                           // src={`${apiUrl}/${item?.path_image}`} 
                           className="img-fluid" 
                           src={`${apiUrl}/${getPathForResolution(item.paths)}`

                       }
                           alt="model"/>
                           
                       </Link>
                   </div>
               ))}
               
               
               </Slider>
                  </div>
                </div>

                 </div>
                <div className="col-4 item_box">
                <div className="content data_containerbox">
                    <div className="center_title fs_mh">
                    <Link className='custom_title' to={"/hodesse_accueil"}>hotesses</Link>
                     
                     
                    {/* d&apos;accueil  */}
                   </div>
                   <div className="slider text-center">
               <Slider {...settings2}>
               
               {groupedResults_b.map((item) => (
                   <div key={item?.model_id}  className='sliderContainer'>
                       <Link  to={`single_view/1/${item?.model_id}`}>
                           <img 
                           // src={`${apiUrl}/${item?.path_image}`} 
                           src={`${apiUrl}/${getPathForResolution(item.paths)}`

                       }
                           alt="model" className="img-fluid"/>
                           
                       </Link>
                   </div>
               ))}
               
               
               </Slider>
                  </div>
                </div>
                 </div>
                 <div className="col-4 item_box">
                 <div className="content data_containerbox">
                    <div className="center_title fs_mh">
                    <Link className='custom_title' to={"/influenceur"}>influenceurs</Link>
                  
                     
                   </div>
                   <div className="slider text-center ">
               <Slider {...settings2} className=''>
               
               {groupedResults_c.map((item) => (
                   <div key={item?.idinfluenceur}  className='sliderContainer'>
                       <Link  to={`single_view/1/${item?.idinfluenceur}`}>
                           <img 
                           // src={`${apiUrl}/${item?.path_image}`} 
                           src={`${apiUrl}/${getPathForResolution(item.paths)}`

                       }
                           alt="influenceur" className="img-fluid" />
                           
                       </Link>
                   </div>
               ))}
               
               
               </Slider>
                  </div>
                </div>
                 </div>

               </div>
               <div className="col-3 right_box">
                  <div className="col-12 item_box">
                       <div className=" title_hg center_title fs_gh">
                       <Link className='custom_title' to={"/parteners"}>  nos collabs</Link>
                  
                          
                        </div>
                        <div className="data_containerbox">
                       
                        <>
                            {groupedResults_e.length === 0 ?
                            (
                              null
                            )

                            :

                            groupedResults_e.length === 1 ?

                            (
                              <>
                             
               {groupedResults_e.map((item) => (

                <div key={item?.idcontributeur} >
                     <div className="center_title fs_mh">
                    
                          photographes 
                       </div>
                  <div  className="content">
                    
                      <div  className="slider text-center">
                     
                       <div className="sliderContainer">
                       <Link  to={`singleViewP/1/${item?.idcontributeur}`}>
                           <img 
                           // src={`${apiUrl}/${item?.path_image}`} 
                           src={`${apiUrl}/${getPathForResolution(item.paths)}`

                       }
                           alt="mannequin" className='img'/>
                           
                       </Link>

                       </div>
                      
                   </div>

                </div>
                
                </div>
                
               ))}
               
               
                       
                              </>

                            )

                            :

                            groupedResults_e.length > 1 &&
                            (
                              <>
                                <Slider {...settings2} className=''>
               
               {groupedResults_e.map((item) => (

                <div key={item?.idcontributeur} >
                     <div className="center_title fs_mh">
                    
                          photographes 
                       </div>
                  <div  className="content">
                    
                      <div  className="slider text-center">
                     
                       <div className="sliderContainer">
                       <Link  to={`singleViewP/1/${item?.idcontributeur}`}>
                           <img 
                           // src={`${apiUrl}/${item?.path_image}`} 
                           src={`${apiUrl}/${getPathForResolution(item.paths)}`

                       }
                           alt="mannequin" className='img'/>
                           
                       </Link>

                       </div>
                      
                   </div>

                </div>
                
                </div>
              
                 
               ))}
               
               
                         </Slider>
                              </>
                            )
                          }

                       {groupedResults_f.length === 0 ?
                            (
                              null
                            )

                            :

                            groupedResults_f.length === 1 ?

                            (
                              <>
                             
               {groupedResults_f.map((item) => (

                <div key={item?.idcontributeur} >
                     <div className="center_title fs_mh">
                    
                          photographes 
                       </div>
                  <div  className="content">
                    
                      <div  className="slider text-center">
                     
                       <div className="sliderContainer">
                       <Link  to={`singleViewP/1/${item?.idcontributeur}`}>
                           <img 
                           // src={`${apiUrl}/${item?.path_image}`} 
                           src={`${apiUrl}/${getPathForResolution(item.paths)}`

                       }
                           alt="mannequin" className='img'/>
                           
                       </Link>

                       </div>
                      
                   </div>

                </div>
                
                </div>
                
               ))}
               
               
                       
                              </>

                            )

                            :

                            groupedResults_f.length > 1 &&
                            (
                              <>
                                <Slider {...settings2} className=''>
               
               {groupedResults_f.map((item) => (

                <div key={item?.idcontributeur} >
                     <div className="center_title fs_mh">
                    
                          maquilleurs 
                       </div>
                  <div  className="content">
                    
                      <div  className="slider text-center">
                     
                       <div className="sliderContainer">
                       <Link  to={`singleViewP/1/${item?.idcontributeur}`}>
                           <img 
                           // src={`${apiUrl}/${item?.path_image}`} 
                           src={`${apiUrl}/${getPathForResolution(item.paths)}`

                       }
                           alt="mannequin" className='img'/>
                           
                       </Link>

                       </div>
                      
                   </div>

                </div>
                
                </div>
              
                 
               ))}
               
               
                         </Slider>
                              </>
                            )
                          }

{groupedResults_g.length === 0 ?
                            (
                              null
                            )

                            :

                            groupedResults_g.length === 1 ?

                            (
                              <>
                             
               {groupedResults_g.map((item) => (

                <div key={item?.idcontributeur} >
                     <div className="center_title fs_mh">
                    
                          stylistes 
                       </div>
                  <div  className="content">
                    
                      <div  className="slider text-center">
                     
                       <div className="sliderContainer">
                       <Link  to={`singleViewP/1/${item?.idcontributeur}`}>
                           <img 
                           // src={`${apiUrl}/${item?.path_image}`} 
                           src={`${apiUrl}/${getPathForResolution(item.paths)}`

                       }
                           alt="mannequin" className='img'/>
                           
                       </Link>

                       </div>
                      
                   </div>

                </div>
                
                </div>
                
               ))}
               
               
                       
                              </>

                            )

                            :

                            groupedResults_g.length > 1 &&
                            (
                              <>
                                <Slider {...settings2} className=''>
               
               {groupedResults_g.map((item) => (

                <div key={item?.idcontributeur} >
                     <div className="center_title fs_mh">
                    
                          stylistes 
                       </div>
                  <div  className="content">
                    
                      <div  className="slider text-center">
                     
                       <div className="sliderContainer">
                       <Link  to={`singleViewP/1/${item?.idcontributeur}`}>
                           <img 
                           // src={`${apiUrl}/${item?.path_image}`} 
                           src={`${apiUrl}/${getPathForResolution(item.paths)}`

                       }
                           alt="mannequin" className='img'/>
                           
                       </Link>

                       </div>
                      
                   </div>

                </div>
                
                </div>
              
                 
               ))}
               
               
                         </Slider>
                              </>
                            )
                          }

{groupedResults_h.length === 0 ?
                            (
                              null
                            )

                            :

                            groupedResults_h.length === 1 ?

                            (
                              <>
                             
               {groupedResults_h.map((item) => (

                <div key={item?.idcontributeur} >
                     <div className="center_title fs_mh">
                    
                          coiffeurs 
                       </div>
                  <div  className="content">
                    
                      <div  className="slider text-center">
                     
                       <div className="sliderContainer">
                       <Link  to={`singleViewP/1/${item?.idcontributeur}`}>
                           <img 
                           // src={`${apiUrl}/${item?.path_image}`} 
                           src={`${apiUrl}/${getPathForResolution(item.paths)}`

                       }
                           alt="mannequin" className='img'/>
                           
                       </Link>

                       </div>
                      
                   </div>

                </div>
                
                </div>
                
               ))}
               
               
                       
                              </>

                            )

                            :

                            groupedResults_h.length > 1 &&
                            (
                              <>
                                <Slider {...settings2} className=''>
               
               {groupedResults_h.map((item) => (

                <div key={item?.idcontributeur} >
                     <div className="center_title fs_mh">
                    
                          coiffeurs 
                       </div>
                  <div  className="content">
                    
                      <div  className="slider text-center">
                     
                       <div className="sliderContainer">
                       <Link  to={`singleViewP/1/${item?.idcontributeur}`}>
                           <img 
                           // src={`${apiUrl}/${item?.path_image}`} 
                           src={`${apiUrl}/${getPathForResolution(item.paths)}`

                       }
                           alt="mannequin" className='img'/>
                           
                       </Link>

                       </div>
                      
                   </div>

                </div>
                
                </div>
              
                 
               ))}
               
               
                         </Slider>
                              </>
                            )
                          }

                            
                

                            </>

                        </div>

                     
                       
             
                 </div>

               </div>

            

            </div>

            {/* les services afrodites */}
            <div className="section_box">
                        <div className="center_title fs_gh">
                            nos offres
                        </div>
                        <div className="custom-dropdown-wrapper">
                       
                       <div className="custom-dropdown-container">
                         <div className="custom-dropdown-item">
                           <button className="custom-dropdown-toggle" onClick={toggleDropdown}>
                             Devenir un modèle 
                             <span className="ms-2">
                               {isOpen ? <FaChevronDown size={10} /> : <FaChevronRight size={10} />}
                             </span>
                           </button>
                           {isOpen && (
                             <div className="custom-dropdown-menu">
                               <Link to={"/postuler/1"}>
                                 <button className="custom-dropdown-link">Mannequin</button>
                               </Link>
                            
                               <Link to={"/postuler/2"}>
                                 <button className="custom-dropdown-link">Hôtesse d'accueil</button>
                               </Link>
                 
                               <Link to={"/postuler/3"}>
                                 <button className="custom-dropdown-link">Influenceur</button>
                               </Link>
                             </div>
                           )}
                         </div>
                 
                         <div className="custom-dropdown-item">
                           <button className="custom-dropdown-toggle" onClick={toggleDropdown2}>
                             Engager un modèle 
                             <span className="ms-2">
                               {isOpen2 ? <FaChevronDown size={10} /> : <FaChevronRight size={10} />}
                             </span>
                           </button>
                           {isOpen2 && (
                             <div className="custom-dropdown-menu">
                               <Link to={"/mannequins"}>
                                 <button className="custom-dropdown-link">Mannequin</button>
                               </Link>
                               <Link to={"/influenceur"}>
                                 <button className="custom-dropdown-link">Influenceur</button>
                               </Link>
                               <Link to={"/hodesse_accueil"}>
                                 <button className="custom-dropdown-link">Hôtesse d'accueil</button>
                               </Link>
                             </div>
                           )}
                         </div>
                 
                         <div className="custom-dropdown-item">
                           <Link to={"/franchises"}>
                             <button className="custom-dropdown-link">Créer une franchise</button>
                           </Link>
                         </div>
                       </div>
                     </div>

            </div>
                       
         



 

      

        
          
      </main>
        

    </>
  )
}

export default MainContent
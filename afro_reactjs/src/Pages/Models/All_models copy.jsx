import React from 'react'
import  { useEffect, useState  } from 'react'

import axios from "axios";
import { useLocation } from 'react-router-dom'; 

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
  
//    const apiUrl = 'http://localhost:5000'
const apiUrl = 'https://apiafro.aafrodites.com'

function All_models() {
 // list link param
 
   let current_location = useLocation();
   const link_url = current_location?.pathname.split('/');
 
   const id_model = link_url[2];
  const [loading, setLoading] = useState(true); // Loader state
  
     const [mannequins_data , setmannequins_data] = useState([]);
    const [podiums , setPodiums] = useState([]);
    const [details , setDetails] = useState([]);
   


      useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
          try {
            const [rep1, rep2, rep3] = await Promise.all([
              axios.post(`${apiUrl}/fashion_model/list_mannequin`),
              axios.get(`${apiUrl}/fashion_model/podiums`),
              axios.get(`${apiUrl}/fashion_model/details`),
            ]);
            setmannequins_data(rep1.data);
            setPodiums(rep2.data);
            setDetails(rep3.data);

            
            setLoading(false)
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
     
function filterByMannequinId(groupedResults, id_mannequin) {
  // Trier le tableau en mettant l'élément avec le `id_mannequin` spécifié en premier
  return groupedResults.sort((a, b) => {
      if (a.id_mannequin === id_mannequin) {
          return -1; // `a` va en premier
      } else if (b.id_mannequin === id_mannequin) {
          return 1; // `b` va en premier
      } else {
          return 0; // Aucun changement
      }
  });
}

// const idToPositionFirst = id_model; // Par exemple, mettre l'élément avec id_mannequin 8 en première ligne
const order_data = filterByMannequinId(groupedResults, parseInt(id_model));

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

  
  
 console.log('model data test')
  return (
    <>  
      {loading === true &&

(
  <div className="loader-container">
  <div className="spinner"></div>
  <p>Chargement en cours...</p>
</div>

)
}
                <div className=" tab_list_box">
                    <div className="tab-list product-tab-list sticky_nav_b">
                        <nav className="nav product-tab-nav">
                            <a className="product-tab-link tab-link active" href="#All" data-bs-toggle="tab">Tous</a>
                            <a className="product-tab-link tab-link" href="#top" data-bs-toggle="tab">podium</a>
                            <a className="product-tab-link tab-link " href="#new" data-bs-toggle="tab">détails</a>
                            <a className="product-tab-link tab-link" href="#top" data-bs-toggle="photo">photo</a>
                            <a className="product-tab-link tab-link " href="#new" data-bs-toggle="vidéo">vidéo</a>
                           {/* <a className="product-tab-link tab-link " href="#pstyle" data-bs-toggle="tab">nouveaux</a> */}
                      </nav>
                    </div>


                    <div className="tab-content product-tab-content col-12">
                        <div id="All" className="tab-pane fade active show">
                        <div className="row bg-white">
                               
                               <div className="col-lg-12 col-md-12 col-12">
                                     <div className='bg-white data_section'>

                                       <div className="content p-0">
                                         
                                            
                                               
                                               <div className="row p-0">

                                                    {order_data.map((item) => (
                                                        <>
                                                            <div key={item?.id_mannequin} className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                            <div className="product-card listing">
                                                                <div className="product-card-img">
                                                                    <a className="hover-switch" href={`/single_view/1/${item?.id_mannequin}`}>
                                                                      <img className="img-fluid thumbnail" 
                                                                        src={`${apiUrl}/${getPathForResolution(item.paths)}`}
                                                                        loading="lazy"
                                                                         alt="mannequin"
                                                                        />
                                                                       
                                                                    </a>  
                                                                  

                                                                   
                                                                  
                                                                </div>
                                                                <a className="text-dark hover-switch" href={`/single_view/1/${item?.id_mannequin}`}>
                                                                    <label className=''> {item?.pseudo}</label>
                                                                    
                                                                    </a>  
                                                               
                                                            </div>
                                                           
                                                            </div>

                                                        </>
                                                    ))}
 
                                                  

                                               </div>
                                                   

                                                   
                                               {/* </Slider> */}
                                          
                                       </div>
                                   
                                       <div className="plusMannequin">
                                           {/* voir plus */}
                                           <a href="/mannequins">
                                           <img src="/assets/models/add.png" loading="lazy" alt=""/>
                                           </a>
                                       
                                       </div>
                                       
                                   </div>
                               </div>
                           </div>
                        </div>
                        <div id="top" className="tab-pane fade">
                        <div className="row">
                               
                        {podiums.map((item) => (
                                                        <>
                                                            <div key={item?.idmannequin} className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                            <div className="product-card">
                                                                <div className="product-card-img">
                                                                    <a className="hover-switch" href={`single_view/1/${item?.idmannequin}`}>
                                                                      <img 
                                                                      loading="lazy"
                                                                      src={`${apiUrl}/${item?.path_image}`} 
                                                                      alt="mannequin" className='img'/>
                                                                       
                                                                    </a>  
                                                                  

                                                                   
                                                                  
                                                                </div>
                                                               
                                                            </div>
                                                            <a className="text-dark hover-switch" href={`single_view/1/${item?.idmannequin}`}>
                                                                    <label className=''> {item?.pseudo}</label>
                                                                    
                                                                    </a>  
                                                            </div>

                                                        </>
                                                    ))}
                            </div>
                        </div>
                        <div id="new" className="tab-pane fade ">
                        <div className="row">

                        {details.map((item) => (
                                                        <>
                                                            <div key={item?.idmannequin} className="box col-lg-2 col-md-4 col-4 aos-init aos-animate" data-aos="fade-up" data-aos-duration="700">

                                                            <div className="product-card">
                                                                <div className="product-card-img">
                                                                    <a className="hover-switch" href={`single_view/1/${item?.idmannequin}`}>
                                                                      <img 
                                                                      src={`${apiUrl}/${item?.path_image}`} 
                                                                      loading="lazy"
                                                                      alt="mannequin" className='img'/>
                                                                       
                                                                    </a>  
                                                                  

                                                                   
                                                                  
                                                                </div>
                                                               
                                                            </div>
                                                            <a className="text-dark hover-switch" href={`single_view/1/${item?.idmannequin}`}>
                                                                    <label className=''> {item?.pseudo}</label>
                                                                    
                                                                    </a>  
                                                            </div>

                                                        </>
                                                    ))}
                               
                        </div>
                        </div>
                       
                    </div>
                </div>
    </>
  )
}

export default All_models
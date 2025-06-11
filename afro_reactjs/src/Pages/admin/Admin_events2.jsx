
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect ,useRef  } from "react"; 
import Loader from '../../Components/Loader';
import axios from 'axios' 

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaEye,FaFilter, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import imageCompression from 'browser-image-compression';
import DeleteHotesseButton from "../../Components/DeleteHotesseButton";
import Locations from "../../Components/Locations";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";


const Admin_events2 = () => {

  
  const [hotesses_data , sethotesses_data] = useState([]);

  const [events, setEvents] = useState([]);

  
  
  console.log("hotesses_data")
  console.log(events)
  const apiUrl = 'https://apiafro.aafrodites.com'
    //  const apiUrl = 'http://localhost:5000'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [images, setImages] = useState([]);
  const [isnotification, setIsNotification] = useState(false);
const [imagespath, setImagespath] = useState([]);
  // Fonction pour ouvrir le modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
    setIsNotification(false);
    setImagePreview(null);
  };
  

  // Fonction pour gérer le changement de l'image
   // Fonction pour gérer le changement d'image
   
 
      const [isloaded, setIsloaded] = useState(true);
        useEffect(() => {
          const fetchData = async () => {
            try {
              const [rep1] = await Promise.all([
                axios.get(`${apiUrl}/events/all`),              
              ]);
              setEvents(rep1.data);
              
              setIsloaded(false)
            } catch (err) {
              console.error("Erreur lors de la récupération des données :", err);
            }
          };
         
          // N'exécuter fetchData que si isloaded est true
            if (isloaded) {
              fetchData();
            }
        }, [isloaded]);
  
     
  const [models, setModels] = useState([]); // Liste des modèles
  const [search, setSearch] = useState(""); // Barre de recherche
  const [sortOrder, setSortOrder] = useState(null); // Ordre de tri
  const [currentPage, setCurrentPage] = useState(0); // Page actuelle
  const [itemsPerPage] = useState(7); // Nombre d'éléments par page

  // organiser les données des mannequins

const groupedResults = events.reduce((acc, row) => {
  // Vérifie si le mannequin existe déjà dans l'accumulateur
  let event = acc.find(item => item.idEvent === row.idEvent);
    
  if (!event) {
    // Si non, crée une nouvelle entrée pour ce mannequin
    event = {
      idEvent: row.idEvent || '',
      id_image : row.id_image || '',
      name: row.nom_event || '',
      startDate: row.date_debut || '',
      endDate: row.date_fin || '',
      startTime : row.heure_debut || '',
      endTime : row.heure_fin || '',
      country : row.pays || '',
      city : row.ville || '',
      quarter : row.quartier || '',
      locationDescription : row.indication_lieu || '',
      organizer : row.organisateur || '',
      expectedParticipants : row.participants_attendus || '',
      status : row.statut || '',
      visibility : row.visibility || '',
      categories : [row.id_typemodel] || '',
       paths: {} };
    acc.push(event);
  }else {
    // Si l'event existe déjà, ajoute le nouvel id_typemodel au tableau
    if (!event.categories.includes(row.id_typemodel)) {
      event.categories.push(row.id_typemodel);
    }
  }

  
  // Ajoute le path_image correspondant au type_resolution
  switch (row.type_resolution) {
    case 1:
      event.paths.path_od = row.path_resolution;
      break;
    case 2:
      event.paths.path_om = row.path_resolution;
      break;
    case 3:
      event.paths.path_hrd = row.path_resolution;
      break;
    case 4:
      event.paths.path_hrm = row.path_resolution;
      break;
    case 5:
      event.paths.path_md = row.path_image;
      break;
    case 6:
      event.paths.path_mm = row.path_image;
      break;
    default:
      // Si un type inconnu est trouvé, le traiter ou ignorer
      console.warn(`Type de résolution inconnu : ${row.path_image}`);
      break;
  }

  return acc;
}, []);

console.log("groupedResults");
console.log(groupedResults);
  // Simulation de données
  useEffect(() => {
    const fetchData = () => {
      const sampleData = [
        { id: 1, nom: "John Doe", image: "https://via.placeholder.com/50", etat: "Actif" },
        { id: 2, nom: "Jane Smith", image: "https://via.placeholder.com/50", etat: "Inactif" },
        { id: 3, nom: "Alice Brown", image: "https://via.placeholder.com/50", etat: "Actif" },
        // Ajoutez plus de données ici
      ];
      setModels(sampleData);
    };
    fetchData();
  }, []);

  // Filtrer les données par recherche
  const filteredModels = groupedResults.filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

  // Trier les données
  const sortedModels = [...filteredModels].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });
 
  // Pagination
  const offset = currentPage * itemsPerPage;
  const paginatedModels = sortedModels.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

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
  // form params
  
  
  const [locationData, setLocationData] = useState({
    pays: '',
    ville: '',
    quartier: '',
  });



        const navigate = useNavigate();
      
        
        
      const [formData, setFormData] = useState({
        name: '',
        description: '',
        eventType: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        country: '',
        city: '',
        quarter : '',
        locationDescription: '',
        organizer: '',
        expectedParticipants: '',
        status: '',
        visibility: '',
        categories: [],
        times: {}, // { '2025-04-22': { startTime: '10:00', endTime: '18:00' }, ... }
      });

      const [eventDays, setEventDays] = useState([]);

      const handleDateChange = (e) => {
        const { name, value } = e.target;
        let newFormData = { ...formData, [name]: value, times: {} }; // ← reset times ici
      
        // Vérifie cohérence des dates
        if (name === 'startDate' && formData.endDate && new Date(value) > new Date(formData.endDate)) {
          newFormData.endDate = ''; // Reset endDate si elle devient invalide
          setEventDays([]);
        }
      
        if (newFormData.startDate && newFormData.endDate && new Date(newFormData.startDate) <= new Date(newFormData.endDate)) {
          const start = new Date(newFormData.startDate);
          const end = new Date(newFormData.endDate);
          const days = [];
      
          for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            days.push(new Date(d).toISOString().split('T')[0]);
          }
          setEventDays(days);
        } else {
          setEventDays([]);
        }
      
        setFormData(newFormData);
      };
      
    
      const handleTimeChange = (e, day) => {
        const { name, value } = e.target;
        const dayTimes = formData.times[day] || {};
    
        // Vérifie cohérence des heures si nécessaire
        if (name === 'startTime' && dayTimes.endTime && value > dayTimes.endTime) {
          // Reset endTime si startTime devient > endTime
          dayTimes.endTime = '';
        }
        if (name === 'endTime' && dayTimes.startTime && value < dayTimes.startTime) {
          // Force endTime à startTime si < startTime
          e.target.value = dayTimes.startTime;
        }
    
        setFormData((prevState) => ({
          ...prevState,
          times: {
            ...prevState.times,
            [day]: {
              ...prevState.times[day],
              [name]: value,
            },
          },
        }));
      };
      
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
          setFormData(prevState => ({
            ...prevState,
            categories: checked
              ? [...new Set([...prevState.categories, value])]  // Utiliser Set pour supprimer les doublons
              : prevState.categories.filter(cat => cat !== value),
          }));    
          console.log(formData)
        } else {
          setFormData(prevState => ({ ...prevState, [name]: value }));
          console.log(formData)
      
        }
      };
      
      const handleLocationChange = (data) => {
        setFormData(prevState => ({
          ...prevState,
          country: data.pays || '',
          city: data.ville || '',
          quarter : data.quartier || '',
        }));
        console.log(formData)
      };

      const handleLocationChangeU = (newLocation) => {
        if(newLocation.pays != "" && newLocation.ville != ""){
        setSelectedEvent((prevState) => ({
          ...prevState,
          country : newLocation.pays, 
          city : newLocation.ville, 
        }));
      }
      };
      
      
      
      
      const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
      
          reader.onload = () => {
            const newImagePath = reader.result; // Chemin de la nouvelle image
      
            
            // Mettre à jour les aperçus
            setImagePreview(newImagePath);
            
       
            // Sauvegarder le chemin dans l'état images
            setImages((prev) => {
              const updatedImages = { ...prev };
              if (!updatedImages.path) {
                updatedImages.path = [];
              }
              updatedImages.path.push(newImagePath); // Ajoute le nouveau chemin
              console.log(updatedImages)
              return updatedImages;
            });
          };
          reader.readAsDataURL(file); // Lit l'image comme DataURL
        }
      
      };
      
      
      function base64ToFile(base64String, filename) {
          const arr = base64String.split(',');
          const mime = arr[0].match(/:(.*?);/)[1];
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
        
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
        
          return new File([u8arr], filename, { type: mime });
        }
        const compressImage = async (file, maxWidth, maxHeight) => {
          const options = {
            maxWidthOrHeight: Math.max(maxWidth, maxHeight),
            useWebWorker: true,
          };
          return await imageCompression(file, options);
        };
      
        
      
        const next_option = async () => {
          console.log("Envoi au serveur...");
      
          
        
          if (!images?.path || images.path.length === 0) {
            console.error("Aucune image à télécharger");
            return;
          }
      
          const loadingToastId = toast.info('Traitement de l\'image en cours...', {
            position: "top-center",
            autoClose: false, 
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
        
          const formData = new FormData();
      
      for (let index = 0; index < images.path.length; index++) {
        const base64Image = images.path[index];
        const originalFileName = `image-${index + 1}.jpeg`;
      
        // Ajouter un timestamp pour rendre le nom unique
        const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
        const uniqueFileName = `${originalFileName.split(".")[0]}_${timestamp}.jpeg`;
      
        const file = base64ToFile(base64Image, uniqueFileName);
      
        // Compression et redimensionnement
        const desktopImage = await compressImage(file, 1920, 1080); // Desktop haute qualité
        const mobileImage = await compressImage(file, 1280, 729); // Mobile haute qualité
        const thumbnailDesktop = await compressImage(file, 600, 400); // Miniature Desktop
        const thumbnailMobile = await compressImage(file, 400, 250); // Miniature Mobile
        
      
        console.log(desktopImage)
        console.log(mobileImage)
        console.log(thumbnailMobile)
        // Ajout des fichiers compressés avec dossier et type dans FormData
        formData.append("files", file, `${uniqueFileName}_original_desktop`);
        formData.append("folder", "original_resolution");
        formData.append("type", "desktop");
      
        formData.append("files", desktopImage, `${uniqueFileName}_desktop`);
        formData.append("folder", "haute_resolution");
        formData.append("type", "desktop");
      
        formData.append("files", mobileImage, `${uniqueFileName}_mobile`);
        formData.append("folder", "haute_resolution");
        formData.append("type", "mobile");
      
        formData.append("files", thumbnailDesktop, `${uniqueFileName}_thumbnail_desktop`);
        formData.append("folder", "miniatures");
        formData.append("type", "desktop");
      
        formData.append("files", thumbnailMobile, `${uniqueFileName}_thumbnail_mobile`);
        formData.append("folder", "miniatures");
        formData.append("type", "mobile");
        
      }
      
          try {
           
            const response = await axios.post(`${apiUrl}/uploadfiles/saveFile`, formData, {
              headers: { "Content-Type": "multipart/form-data" },
              withCredentials: true,
            });
      
            toast.dismiss(loadingToastId);
            toast.success('Image chargée avec succès !', {
              position: "top-center",
              autoClose: 3000,
              theme: "light",
            });
            
            return response.data?.files;
      
          } catch (error) {
            toast.dismiss(loadingToastId);
            toast.error('Erreur lors de la mise à jour !', {
            position: "top-center",
            autoClose: 3000,
            theme: "light",
          });
            console.error("Erreur lors de l'upload :", error.response?.data || error.message);
          }
        };
         
      
      
        const handleSubmit = async (e) => {
        
            e.preventDefault();
        
         
            const imgs_upld = await next_option(); // Attend que la fonction résolve la promesse
           
            console.log("imgs_upld")
            const all_images = []
               all_images.push({
                                    o_desktop : imgs_upld[0] ,
                                    hr_desktop : imgs_upld[1] ,
                                    hr_mobile : imgs_upld[2] ,
                                    m_desktop : imgs_upld[3] ,
                                    m_mobile : imgs_upld[4] ,
        
                           });
        
              console.log(all_images)
            // return false;
        
          
        
        
        
            console.log(formData)
        
            
           
            const param = {all_images, formData}
        
          // return false;
                toast.info('sauvegarde en cours' , {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  // transition: Bounce,
                });
        
                try {
        
                  console.log(param)
        
                  // return false;
                  await axios
                    .post(`${apiUrl}/events/add_event`,
                      param
                      )
                    .then((result) => {
                
                    console.log("result.data")
                      console.log(result)
      
      
                      
                    //   console.log(result.data?.user)
        
                    //  return false;
        
                    
                        if(result){
                          setTimeout(() => {
                          
                            toast.success('Evènement ajouté avec Succès' , {
                              position: "top-center",
                              autoClose: 3000,
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                              // transition: Bounce,
                          });
                            
                          setImages([])
                          
                            setIsloaded(true)
                          
                        }, 3500); // Délai de 3 secondes
        
                        
              
                        }
                      }); 
                      
                } catch (err) {
                  console.log("erreur");
                  // setError(err.response.data);
                }
          };
        
      

  


  
  
 

  const [selectedEvent, setSelectedEvent] = useState(null); // Pour gérer le modal
  const [isDetailModalOpen, setDetailModalOpen] = useState(false); // Modal pour détail
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false); // Modal pour mise à jour




 
  // Supprimer un modèle
  const handleDelete = (eventId) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce modèle ?")) {
      // Appeler l'API pour supprimer
      axios.post(`${apiUrl}/events/deleteEvent`
        , {eventId} )
        .then((response) => {
          if (response.status === 200) {
            alert("Evènement supprimé avec succès !");
            // Mettre à jour l'affichage
            window.location.reload();
          } else {
            alert("Échec de la suppression !");
          }
        })
        .catch((error) => console.error("Erreur :", error));
    }
  };

  // Voir les détails
  const handleViewDetails = (model) => {
    setSelectedModel(model);
    setDetailModalOpen(true);
  };

 

  // Modifier (Update)
  const handleUpdate = async (event) => {
    setSelectedEvent(event);

    try {

      setLocationData(prevState => ({
        ...prevState,       
        pays: event.pays || "",
        ville: event.ville || "",
        quartier: event.quartier || "",
 
      }));

      setUpdateModalOpen(true);

      // Sélectionner l'image en fonction de la largeur de l'écran
      if (deviceWidth <= 720) {
        setImagePreview(`${apiUrl}/${event.paths.path_mm}`);
      } else if (deviceWidth <= 1080) {
        setImagePreview(`${apiUrl}/${event.paths.path_md}`);
      } else {
        setImagePreview(`${apiUrl}/${event.paths.path_md}`);
      }

    } catch (error) {
      console.error('Échec des requêtes', error);
    }
};

const ModalUpdateClose = () => {
  setImagePreview('');
  setUpdateModalOpen(false);
}




  return (

    <div className='admin_datacontent'>
       <ToastContainer className="toast_style"/>
      <h1>Evènements</h1>
      <div className="models-table-container">
      {/* Barre de recherche et options */}
      <div className="table-options">
        <input
          type="text"
          placeholder="Rechercher un Evènement..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
         <div className="filters">
          <FaFilter style={{ marginRight: "5px" }} />
          <select>
            <option value="all">Tous les types</option>
            <option value="actif">podium</option>
            <option value="inactif">détail</option>
          </select>
        </div>
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="asc">Trier par nom (A-Z)</option>
          <option value="desc">Trier par nom (Z-A)</option>
        </select>
        <div>
          <label className="add_new mx-3" onClick={openModal} > + nouveau</label>        
        </div>
      </div>

      {/* Tableau */}
      <table className="models-table">
        <thead>
          <tr>
            <th>#</th>
            <th>
              <input type="checkbox" />
            </th>
            <th>Affiche</th>
            <th>Nom</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            {/* <th>État</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedModels.map((event) => (
            <tr key={event.idEvent}>
              <td>{event.idEvent}</td>
              <td>
                <input type="checkbox" />
              </td>
              <td>
              <a href={`/event/${event?.idEvent}`}>
                
                <img 
                
                src={`${apiUrl}/${getPathForResolution(event.paths)}`
                  
                }

                alt={event.name} />
            </a>
              </td>
              <td>{event.name}</td>
              <td>{event.startDate
              .split('T')[0].split('-')
              .reverse().join('-')}
              </td>
              <td>{event.endDate
              .split('T')[0].split('-')
              .reverse().join('-')}
              </td>
              {/* <td>{model.etat}</td> */}
              <td>
                <button title="Modifier" onClick={() => handleUpdate(event)}>
                  <FaEdit />
                </button>
                
                <button title="Supprimer" onClick={() => handleDelete(event?.idEvent)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={"Précédent"}
        nextLabel={"Suivant"}
        breakLabel={"..."}
        pageCount={Math.ceil(filteredModels.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
      {/* Modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
            {/* Bouton Fermer */}
          
          <div style={styles.modalContent}>
          <button onClick={closeModal} style={styles.closeButton}>
              X
            </button>
            <h2 style={{fontSize : "18px" , textAlign : "center"}}>Création d'un Evènement</h2>
           
            {isnotification ?
          (
            <>
            <div className="">
            {/* Accordion for Model */}
              <div className="resume_box">
              <div style={{ marginBottom: "20px" }}>
                      
            
                <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
              
              
                
                      <>
                        <div className="text-center"> 
                      <span className='title_label'>
                          hotesse ajouté avec succès.
                          les identifiants de son compte afrodites sont:
                          
                      </span>
                      <p>pseudo : {newuserdata[0]}</p>
                      <p>mot de passe : {newuserdata[1]}</p>
                      </div> 
                      </>
                  
                  
                </div>
            
            </div>

              </div>

            </div>
            </>)

            :

            (
              <>
              {/* Formulaire */}
              <form onSubmit={handleSubmit}>

                <div className="row">
                  <div className="col-6">
                    <div style={styles.formGroup}>
                        <label>Nom :</label>

                        <input className="input_value" type="text" placeholder="Nom / Titre de l'événement" name='name' style={styles.input}
                          onChange={handleChange}/>

                      </div>
                  </div>

                  <div className="col-6">
                    <div style={styles.formGroup}>
                        <label>Type Evènement :</label>
                        <fieldset>
                          <select className="form-control form-control-md" style={styles.input} name='eventType' onChange={handleChange}
                          >
                            <option value="1">Interne</option>
                            <option value="2">Externe</option>
                          </select>
                      </fieldset>
                        
                      </div>
                  </div>

                </div>

                <div className="row">
                <div className="col-12">
                    <div style={styles.formGroup}>
                      <label>Description :</label>
                      <textarea
                        className="input_value"
                        placeholder="Décrivez votre événement ici..."
                        name="description"
                        style={{ ...styles.input, height: '100px' }} // height pour une belle zone d'édition
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

              <div className="row">
                <div className="col-12">
                  <div style={styles.formGroup}>
                    <label>Nombre de participants attendus :</label>
                    <input
                      className="input_value"
                      type="number"
                      placeholder="Exemple: 100"
                      min="1"
                      name="expectedParticipants"
                      style={styles.input}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
                      
                      
                <div className="row">
                <div className="row">
        <div className="col-6">
          <label>Date Début :</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleDateChange}
            className="form-control"
          />
        </div>
        <div className="col-6">
          <label>Date Fin :</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleDateChange}
            className="form-control"
            min={formData.startDate}
          />
        </div>
      </div>

      <hr />

      {eventDays.length > 0 && (
        <div>
          <h6 className="text-center fw-light">Plages horaires par jour :</h6>
          {eventDays.map((day, index) => (
            <div key={index} className="row mb-2">
              <div className="col-12 text-center">
                <i>Jour {index + 1} ({day})</i>
              </div>
              <div className="col-6">
                <label>Heure Début :</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.times[day]?.startTime || ''}
                  onChange={(e) => handleTimeChange(e, day)}
                  className="form-control"
                />
              </div>
              <div className="col-6">
                <label>Heure Fin :</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.times[day]?.endTime || ''}
                  onChange={(e) => handleTimeChange(e, day)}
                  className="form-control"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <hr />

</div>
                      
                      
                      <div className="line_data locationbox text-center">
                     <Locations className="inline_zone"
                              inputdata ={{ 
                                          
                                              pays_name : 'pays',

                                              ville_name: 'ville',
                                            //  quartier_name: 'quartier'
                              }} 
                              onChange={handleLocationChange}
                                                                                          
                            />
                      </div>



                      <div className="row">
                            <div className="col-6">
                                <div style={styles.formGroup}>
                                    <label>Description du lieu :</label>

                                    <input className="input_value" type="text" placeholder="Description du lieu" name='locationDescription' onChange={handleChange} style={styles.input}/>

                                </div>
                            </div>

                            <div className="col-6">
                                <label>Organisateur :</label>

                                <fieldset>
                                    <select className="form-control form-control-md" onChange={handleChange} name='organizer' style={styles.input}>
                                        <option value="interne">Interne</option>
                                        <option value="externe">Externe</option>
                                    </select>
                                </fieldset>
                            </div>
                    
                      </div>

                      <div className="row">
                        <div className="col-6">
                            <label htmlFor="">Status : </label>
                            <fieldset>
                            <select className="form-control form-control-md" onChange={handleChange} name='status' style={styles.input}>
                                <option value="1">A venir</option>
                                <option value="2">En cours</option>
                                <option value="3">Terminé</option>
                                <option value="4">Annulé</option>
                            </select>
                        </fieldset>
                        </div>

                        <div className="col-6">
                            <label htmlFor="">Visibilité : </label>
                            <fieldset>
                                <select className="form-control form-control-md" onChange={handleChange} name='visibility'>
                                    <option value="1">Public</option>
                                    <option value="2">Privé</option>
                                </select>
                            </fieldset>
                        </div>
                      </div>


                      <div className="line_data text-center mt-3 mb-5">
                            <label className="fw-bold mb-2">Modèles concernés :</label> <br />
                            <label><input type="checkbox" name="categories" value="1" onChange={handleChange} /> Mannequin</label>
                            <label><input type="checkbox" name="categories" value="2" onChange={handleChange} /> Vlogueuse</label>
                            <label><input type="checkbox" name="categories" value="3" onChange={handleChange} /> Hotesse </label>

                      </div>

         
                        
                        

                      <div style={styles.formGroup}>
                        <label style={styles.imageLabel}>
                          {/* Zone de prévisualisation de l'image */}
                          {imagePreview ? (
                            <img
                              src={imagePreview}
                              alt="Prévisualisation"
                              style={styles.imagePreview}
                            />
                          ) : (
                            <span> + image </span>
                          )} 
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={styles.fileInput}
                          />
                        </label>
                      </div>

                      {/* <div style={styles.formGroup}>
                        <label>Description :</label>
                        <textarea placeholder="Entrer une description" style={styles.textarea}></textarea>
                      </div> */}
                      <div className="text-center">
                      <button type="submit" style={styles.submitButton}>Créer</button>
                  
                      </div>
                      </form>
              </>
            )
          
          
          }
           

          
          </div>
        </div>
      )}
 {/* Modal pour Détails */}
 {isDetailModalOpen && (
        <div className="modal">
          <h3>Détails du modèle</h3>
          <p>Nom : {selectedModel.nom}</p>
          <p>Prénom : {selectedModel.prenom}</p>
          <p>Pseudo : {selectedModel.pseudo}</p>
          <p>Image :</p>
          <img src={`${apiUrl}/${selectedModel?.path_image}`} alt={selectedModel.nom} />
          <button onClick={() => setDetailModalOpen(false)}>Fermer</button>
        </div>
      )}

      {/* Modal pour Mise à jour */}
      {isUpdateModalOpen && (
        <>
        <div style={styles.modalOverlay}>
         {/* Bouton Fermer */}
       
        <div style={styles.modalContent}>
          <button onClick={ModalUpdateClose} style={styles.closeButton}>
           X
         </button>
         <h2 style={{fontSize : "18px" , textAlign : "center"}}>Modifier Evènement</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              const all_images = []

              
              
              if(imagePreview != `${apiUrl}/${selectedEvent.paths.path_mm}` && imagePreview != `${apiUrl}/${selectedEvent.paths.path_md}` ){
                const imgs_upld = await next_option(); // Attend que la fonction résolve la promesse
   
                  all_images.push({
                                        o_desktop : imgs_upld[0] ,
                                        hr_desktop : imgs_upld[1] ,
                                        hr_mobile : imgs_upld[2] ,
                                        m_desktop : imgs_upld[3] ,
                                        m_mobile : imgs_upld[4] ,

                              });

                  console.log(all_images)
                  
              }

              toast.info('Mise à jour en cours...', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });

              try {      
                const response = await axios.post(`${apiUrl}/events/updateEvent/`, { selectedEvent, all_images });
            
                if (response.status === 200) {
                  toast.success('Modèle mis à jour avec succès !', {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "light",
                  });
            
                  setTimeout(() => {
                    ModalUpdateClose();
                    window.location.reload();
                  }, 3000); 
                } else {
                  toast.error('Échec de la mise à jour !', {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "light",
                  });
                }
              } catch (error) {
                toast.error('Erreur lors de la mise à jour !', {
                  position: "top-center",
                  autoClose: 3000,
                  theme: "light",
                });
                console.error("Erreur :", error);
              }
              
              // Appeler l'API pour mettre à jour
            }}
          >

<div className="row">
          <div className="col-6">
            <div style={styles.formGroup}>
              <label>Nom :</label>
              <input 
                type="text"
                value={selectedEvent.name || ''}
                onChange={(e) => setSelectedEvent({...selectedEvent, name: e.target.value})}
                placeholder="Nom de l'événement" 
                style={styles.input}
              />
            </div>
          </div>

          <div className="col-6">
            <div style={styles.formGroup}>
              <label>Type Évènement :</label>
              <fieldset>
                <select 
                  className="form-control form-control-md" 
                  style={styles.input} 
                  value={selectedEvent.eventType || '1'}
                  onChange={(e) => setSelectedEvent({...selectedEvent, eventType: e.target.value})}
                >
                  <option value="1">Interne</option>
                  <option value="2">Externe</option>
                </select>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div style={styles.formGroup}>
              <label>Date Début :</label>
              <input 
                type="date"
                value={selectedEvent.startDate ? selectedEvent.startDate.split('T')[0] : ''}
                onChange={(e) => setSelectedEvent({...selectedEvent, startDate: e.target.value})}
                style={styles.input}
              />
            </div>
          </div>
          <div className="col-6">
            <div style={styles.formGroup}>
              <label>Date de fin :</label>
              <input 
                type="date"
                value={selectedEvent.endDate ? selectedEvent.endDate.split('T')[0] : ''}
                onChange={(e) => setSelectedEvent({...selectedEvent, endDate: e.target.value})}
                style={styles.input}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div style={styles.formGroup}>
              <label>Heure Début :</label>
              <input 
                type="time"
                value={selectedEvent.startTime || ''}
                onChange={(e) => setSelectedEvent({...selectedEvent, startTime: e.target.value})}
                style={styles.input}
              />
            </div>
          </div>
          <div className="col-6">
            <div style={styles.formGroup}>
              <label>Heure fin :</label>
              <input 
                type="time"
                value={selectedEvent.endTime || ''}
                onChange={(e) => setSelectedEvent({...selectedEvent, endTime: e.target.value})}
                style={styles.input}
              />
            </div>
          </div>
        </div>

        <div className="line_data locationbox text-center">
           {selectedEvent && <>
                                  <Locations
                                     inputdata ={{ 
                                      pays_name : locationData?.pays,
                                      ville_name: locationData?.ville,
                                      quartier_name: locationData?.quartier
                                    }} 
                                    
                                    onChange={handleLocationChangeU}
                                  />
                                </>}
        </div>

        <div className="row">
          <div className="col-6">
            <div style={styles.formGroup}>
              <label>Description du lieu :</label>
              <input 
                type="text" 
                value={selectedEvent.locationDescription || ''}
                onChange={(e) => setSelectedEvent({...selectedEvent, locationDescription: e.target.value})}
                placeholder="Description du lieu" 
                style={styles.input}
              />
            </div>
          </div>

          <div className="col-6">
            <label>Organisateur :</label>
            <fieldset>
              <select 
                className="form-control form-control-md" 
                value={selectedEvent.organizer || 'interne'}
                onChange={(e) => setSelectedEvent({...selectedEvent, organizer: e.target.value})}
                style={styles.input}
              >
                <option value="interne">Interne</option>
                <option value="externe">Externe</option>
              </select>
            </fieldset>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <label>Status :</label>
            <fieldset>
              <select 
                className="form-control form-control-md" 
                value={selectedEvent.status || '1'}
                onChange={(e) => setSelectedEvent({...selectedEvent, status: e.target.value})}
                style={styles.input}
              >
                <option value="1">A venir</option>
                <option value="2">En cours</option>
                <option value="3">Terminé</option>
                <option value="4">Annulé</option>
              </select>
            </fieldset>
          </div>

          <div className="col-6">
            <label>Visibilité :</label>
            <fieldset>
              <select 
                className="form-control form-control-md" 
                value={selectedEvent.visibility || '1'}
                onChange={(e) => setSelectedEvent({...selectedEvent, visibility: e.target.value})}
              >
                <option value="1">Public</option>
                <option value="2">Privé</option>
              </select>
            </fieldset>
          </div>
        </div>

        {/* <div className="line_data text-center mt-3 mb-5">
          <label className="fw-bold mb-2">Modèles concernés :</label> {selectedEvent.categories}<br />
          <label>
            <input 
              type="checkbox" 
              checked={selectedEvent.categories?.includes(1) || false}
              onChange={(e) => {
                const categories = selectedEvent.categories || [];
                if(e.target.checked) {
                  setSelectedEvent({...selectedEvent, categories: [...categories, 1]});
                } else {
                  setSelectedEvent({...selectedEvent, categories: categories.filter(cat => cat !== 1)});
                }
              }} 
            /> Mannequin
            
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={selectedEvent.categories?.includes(2) || false}
              onChange={(e) => {
                const categories = selectedEvent.categories || [];
                if(e.target.checked) {
                  setSelectedEvent({...selectedEvent, categories: [...categories, 2]});
                } else {
                  setSelectedEvent({...selectedEvent, categories: categories.filter(cat => cat !== 2)});
                }
              }} 
            /> Vlogueuse
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={selectedEvent.categories?.includes(3) || false}
              onChange={(e) => {
                const categories = selectedEvent.categories || [];
                if(e.target.checked) {
                  setSelectedEvent({...selectedEvent, categories: [...categories, 3]});
                } else {
                  setSelectedEvent({...selectedEvent, categories: categories.filter(cat => cat !== 3)});
                }
              }} 
            /> Hotesse
          </label>
        </div> */}

        <div style={styles.formGroup} className="mt-4">
          <label style={styles.imageLabel}>
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Prévisualisation"
                style={styles.imagePreview}
              />
            ) : selectedEvent.paths ? (
              <img
                src={`${apiUrl}/${selectedEvent.paths.path_md || selectedEvent.paths.path_mm}`}
                alt="Image actuelle"
                style={styles.imagePreview}
              />
            ) : (
              <span>+ image</span>
            )} 
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.fileInput}
            />
          </label>
        </div>

                      <div className="text-center">
                        <button type="submit" style={styles.submitButton}>Modifier</button>
                      </div>
                  
                    </form>

                  </div>
                </div>
                  
                      
                {/* </div>

            <button type="submit">Sauvegarder</button>
            <button type="button" onClick={() => setUpdateModalOpen(false)}>
              Annuler
            </button>
        </div> */}
        </>
      )}
      
    </div>
  );
};


// Styles pour le modal et les boutons
const styles = {
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    zIndex: 999,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    width: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxHeight: '80vh', 
    overflowY: 'auto'
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  submitButton: {
    padding: '4px 8px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display : 'inline-block'
  },
  closeButton: {
    marginTop: '10px',
    padding: '5px 8px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    float: "right",
    // marginRight: "1em",
    display : 'inline-block'
  },
  imageLabel: {
    display: 'block',
    cursor: 'pointer',
    textAlign: 'center',
    padding: '10px',
    border: '1px dashed #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    position: 'relative',
  },
  fileInput: {
    display: 'none',
  },
  imagePreview: {
    maxWidth: '100%',
    maxHeight: '150px',
    marginBottom: '10px',
  },
};

export default Admin_events2;

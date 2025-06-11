
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect ,useRef  } from "react"; 
import Loader from '../../Components/Loader';
import axios from 'axios' 

import { motion, AnimatePresence } from "framer-motion";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaEye,FaFilter, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import imageCompression from 'browser-image-compression';
// import DeleteHotesseButton from "../Components/DeleteHotesseButton";
import Locations from "../../Components/Locations";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import model_1 from "/assets/models/manneq.jpeg"
import model_2 from "/assets/models/mannequ_2.jpeg"
import model_3 from "/assets/models/manneq_3.jpeg"

const Admin_events = () => {

  
  const [hotesses_data , sethotesses_data] = useState([]);

  const [events, setEvents] = useState([]);

  
  
  console.log("hotesses_data")
  console.log(events)
  const apiUrl = 'https://apiafro.aafrodites.com'
    //  const apiUrl = 'http://localhost:5000'
  const [isModalOpen, setIsModalOpen] = useState(false);
  
    const [isModalOpen_joinmodel, setIsModalOpen_joinmodel] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [images, setImages] = useState([]);
  const [isnotification, setIsNotification] = useState(false);
const [imagespath, setImagespath] = useState([]);
  // Fonction pour ouvrir le modal
  
  const toggleModal_joinmodel = () => setIsModalOpen_joinmodel(!isModalOpen_joinmodel);
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
      

// les organisateurs
const [isAfrodite, setIsAfrodite] = useState(false);
const [selectedOrganizer, setSelectedOrganizer] = useState('');
const [showNewOrganizerInput, setShowNewOrganizerInput] = useState(false);
const [newOrganizerName, setNewOrganizerName] = useState('');

const organizers = [
  { id: 4, name: 'Olga Agency' },
  { id: 2, name: 'Becca Fashion' },
  { id: 3, name: 'Top Event' },
];
 

const handleCheckboxChange_organiser = (e) => {
  const checked = e.target.checked;
  setIsAfrodite(checked);

  if (checked) {
    setFormData((prev) => ({
      ...prev,
      organizer: 1, // id de Afrodite
    }));
    setSelectedOrganizer('');
    setShowNewOrganizerInput(false);
  } else {
    setFormData((prev) => ({
      ...prev,
      organizer: '', // reset organiser
    }));
  }
};

const handleSelectChange_organiser = (e) => {
  const value = e.target.value;

  console.log("value")
  console.log(value)
  setSelectedOrganizer(value);

  if (value === 'new') {
    setShowNewOrganizerInput(true);
    setFormData((prev) => ({
      ...prev,
      organizer: '', // pas encore d'id pour nouveau organisateur
    }));
  } else {
    setShowNewOrganizerInput(false);
    setFormData((prev) => ({
      ...prev,
      organizer: Number(value), // on met l'id de l'organisateur existant
    }));
  }
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
        console.log(formData)
        //  return false;
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
              
const loadingToast_a =  toast.info('sauvegarde en cours' , {
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
      
      // return false;
                      
                    //   console.log(result.data?.user)
        
                    //  return false;
        
                    
                        if(result){
                          
toast.dismiss(loadingToast_a);
                           
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
                          
                       closeModal();
                        }
                      }); 
                      
                } catch (err) {
                  console.log("erreur");
                  // setError(err.response.data);
                }
          };
        
       
 
// CRUD D'EVENT
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



// join event and models


   const [loading, setLoading] = useState(true); // Loader state
const [allevents, setAllevents] = useState([]);
const [allmannequin, setAllmannequin] = useState([]);
console.log("allevents")
console.log(allevents)
useEffect(() => {
const fetchData = async () => {
 
  try {
    setLoading(true); // Active le loader
   
       const rep1 = await axios.get(`${apiUrl}/events/all`);
    
        const grouped_event = rep1?.data.reduce((acc, row) => {
        // Vérifie si le mannequin existe déjà dans l'accumulateur

         const convdb = new Date(row?.date_debut).toISOString().split('T')[0];
      
        const convdf = new Date(row?.date_fin).toISOString().split('T')[0];
        
        let listevent = acc.find(item => (item.id === row.id_event));
        
        if (!listevent) {
        // console.log("row")
        // console.log(row)
          // Si non, crée une nouvelle entrée pour ce mannequin
          listevent = {
            id: row.id_event,
            title: row.nom_event,
            detail: row.details,
           image: row.path_image,
            // type_model: row.id_typemodel, 
            date_debut : convdb,
            date_ffin : convdf,
            pays : row.pays,
            ville : row.ville,
            quartier : row.quartier,
            indication_lieu : row.indication_lieu,
            statut : row.statut,
            id_typeevent : row.id_typeevent,
            // statut : row.statut,
            heure_debut : row?.heure_debut,
            heure_fin : row?.heure_fin,
            paths: {} };
          acc.push(listevent);
        }
        
         
        // Ajoute le path_image correspondant au type_resolution
        switch (row.type_resolution) {
           
          case 3:
            listevent.paths.path_hrd = row.path_image;
            break;
          case 4:
            listevent.paths.path_hrm = row.path_image;
            break;
          case 5:
            listevent.paths.path_md = row.path_image;
            break;
          case 6:
            listevent.paths.path_mm = row.path_image;
            break;
          default:
            // Si un type inconnu est trouvé, le traiter ou ignorer
            // console.warn(`Type de résolution inconnu : ${row.type_resolution}`);
            break;
        }

         return acc;
      }, []);

  
      setAllevents(grouped_event);
   
  } catch (err) {
    console.log(err);
  
  }finally {
    setLoading(false); // Désactive le loader
  }
};
fetchData();
} , []);


useEffect(() => {
const fetchData = async () => {
 
  try {
    setLoading(true); // Active le loader
    const rest = await axios.post(`${apiUrl}/fashion_model/list_mannequin`);
  
      console.log("rest")
      
      console.log(rest)
        const grouped_data = rest?.data.reduce((acc, row) => {
        // Vérifie si le mannequin existe déjà dans l'accumulateur

         
        let mannequin = acc.find((item) => item.id_mannequin === row.idmannequin);
        if (!mannequin) {
          mannequin = {
            id_mannequin: row.idmannequin,
            id: row.idmannequin,
            name: row.nom,
            nom: row.nom,
            prenom: row.prenom,
            pseudo: row.pseudo,
            type_image: row.type_image,
            type_model: row.type_model,
            userclient: row.userclient,
            id_image: row.id_image,
            image_name: row.image_name,
            categorie_model : [],
            paths: {},
          };
          acc.push(mannequin);
        }
  
        if(row.id_categorie){

          switch (row.id_categorie) {
            case 1:
              if (!mannequin.categorie_model.includes(row.id_categorie)) {
                mannequin.categorie_model.push(row.id_categorie);
              }
              // mannequin.categorie_model.push(row.id_categorie);
              break;
      
            case 2:
              if (!mannequin.categorie_model.includes(row.id_categorie)) {
                mannequin.categorie_model.push(row.id_categorie);
              }
              
              break;
      
              case 3:
                if (!mannequin.categorie_model.includes(row.id_categorie)) {
                  mannequin.categorie_model.push(row.id_categorie);
                }
                
                break;
            default:
              // Si un type inconnu est trouvé, le traiter ou ignorer
                break;
          }
        }
      
        switch (row.type_resolution) {
          case 5:
            mannequin.paths.path_md = row.path_resolution;
            break;
          case 6:
            mannequin.paths.path_mm = row.path_resolution;
            break;
          default:
            console.warn(`Type de résolution inconnu : ${row.type_resolution}`);
        }
  
         return acc;
      }, []);

  
      setAllmannequin(grouped_data);
   
  } catch (err) {
    console.log(err);
  
  }finally {
    setLoading(false); // Désactive le loader
  }
};
fetchData();
} , []);

console.log('allevents')
console.log(allevents)

const list_all_events = [
  { id: 1, title: 'Salon de la Mode', image: model_1 },
  { id: 2, title: 'Concours Beauté', image: model_2 },
  { id: 3, title: 'Casting Hôtesses', image: model_3 },
];

const [selectedEventId, setSelectedEventId] = useState(null);
// const selectedEvent = list_all_events.find(event => event.id === Number(selectedEventId));

const [selectedEvent_b, setSelectedEvent_b] = useState([
  list_all_events.find(event => event.id === Number(selectedEventId))

]);


 
  const categories_models = ['mannequin', 'hotesse', 'vlogueuse'];
const [selectedCategories, setSelectedCategories] = useState([]);
const [selectedModels, setSelectedModels] = useState({});
const [flyers, setFlyers] = useState({});
const [dropdownOpen_models, setDropdownOpen_models] = useState({});
console.log("dropdownOpen_models")
console.log(dropdownOpen_models)
const dropdownRefs_models = useRef({});
const formData_b = useRef({
eventId: '',
categories: [],
models: {},
flyers: {}
});


// Exemple de data mock (à remplacer par tes données réelles)
const modelsByCategory = {
mannequin: allmannequin,
hotesse: [{ id: 3, name: 'Eva' }, { id: 4, name: 'Lina' }],
vlogueuse: [{ id: 5, name: 'Nina' }, { id: 6, name: 'Zoé' }],
};
 

const flyers_send = async () => {
  console.log("Envoi au serveur...");

  const flyers = formData_b?.current?.flyers;
  if (!flyers || Object.keys(flyers).length === 0) {
    console.error("Aucun flyer à envoyer.");
    return {};
  }

  const loadingToastId = toast.info("Téléversement des flyers en cours...", {
    position: "top-center",
    autoClose: false,
    theme: "light",
  });

  const formData = new FormData();

  for (const modelId in flyers) {
    const file = flyers[modelId];

    const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    const baseName = file.name.split(".")[0];
    const ext = file.name.split(".").pop();

    // Compression des variantes
    const desktopImage = await compressImage(file, 1920, 1080);
    const mobileImage = await compressImage(file, 1280, 729);
    const thumbnailDesktop = await compressImage(file, 600, 400);
    const thumbnailMobile = await compressImage(file, 400, 250);

    // Liste des fichiers à envoyer
    const imagesToUpload = [
      { blob: file, type: "original", folder: "original_resolution" },
      { blob: desktopImage, type: "desktop", folder: "haute_resolution" },
      { blob: mobileImage, type: "mobile", folder: "haute_resolution" },
      { blob: thumbnailDesktop, type: "thumbnail_desktop", folder: "miniatures" },
      { blob: thumbnailMobile, type: "thumbnail_mobile", folder: "miniatures" },
    ];

    imagesToUpload.forEach(({ blob, type, folder }) => {
      const filename = `${baseName}_${timestamp}_${type}.${ext}`;
      formData.append("files", blob, filename);
      formData.append("modelId", modelId);
      formData.append("type", type);
      formData.append("folder", folder);
    });
  }

  try {

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
    const response = await axios.post(`${apiUrl}/uploadfiles/save_flyers`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    toast.dismiss(loadingToastId);
    toast.success("Flyers envoyés avec succès !", {
      position: "top-center",
      autoClose: 3000,
      theme: "light",
    });

    console.log("Réponse du serveur :", response.data);
    return response.data?.files;

  } catch (error) {
    toast.dismiss(loadingToastId);
    toast.error("Erreur lors de l'envoi des flyers", {
      position: "top-center",
      autoClose: 3000,
      theme: "light",
    });
    console.error("Erreur lors de l'upload :", error.response?.data || error.message);
  }
};


const handleEventChange = (e) => {
console.log("e.target.value")
   console.log(e.target.value)
   const eventId = Number(e.target.value);

  setSelectedEventId(Number(e.target.value));

  const selected = allevents.find(ev => ev.id == eventId);
  setSelectedEvent_b(selected);

    formData_b.current.eventId = eventId;
};

const handleCategoryChange_event = (category) => {
let newCategories;
if (selectedCategories.includes(category)) {
newCategories = selectedCategories.filter(cat => cat !== category);
} else {
newCategories = [...selectedCategories, category];
}
setSelectedCategories(newCategories);

formData_b.current.categories = newCategories;
};

// const handleModelSelection = (cat, modelId) => {
//   setSelectedModels(prev => {
//     const alreadySelected = prev[cat] || [];
//     const newSelection = alreadySelected.includes(modelId)
//       ? alreadySelected.filter(id => id !== modelId)
//       : [...alreadySelected, modelId];
//     return { ...prev, [cat]: newSelection };
//   });
// };

const handleModelSelection = (category, modelId) => {
const current = selectedModels[category] || [];
let updated;

if (current.includes(modelId)) {
updated = current.filter(id => id !== modelId);
} else {
updated = [...current, modelId];
}

setSelectedModels(prev => ({
...prev,
[category]: updated
}));

formData_b.current.models = {
...formData_b.current.models,
[category]: updated
};
};

const handleFlyerUpload = (modelId, file) => {
setFlyers(prev => ({
...prev,
[modelId]: file
}));

formData_b.current.flyers = {
...formData_b.current.flyers,
[modelId]: file
};
};

// const handleFlyerUpload = (modelId, file) => {
//   setFlyers(prev => ({ ...prev, [modelId]: file }));
// };

// Fermer dropdown quand on clique à l’extérieur
useEffect(() => {
const handleClickOutside_bis = (e) => {
  Object.keys(dropdownRefs_models.current).forEach(cat => {
    if (dropdownRefs_models.current[cat] && !dropdownRefs_models.current[cat].contains(e.target)) {
      setDropdownOpen_models(prev => ({ ...prev, [cat]: false }));
    }
  });
};
document.addEventListener('mousedown', handleClickOutside_bis);
return () => document.removeEventListener('mousedown', handleClickOutside_bis);
}, []);   

const handleSubmit_b = async (e) => {
e.preventDefault();

const loadingToast_b = toast.info('Sauvegarde des données...', {
position: "top-center",
autoClose: false,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
theme: "light",
});

try {
// Envoie les flyers et récupère les données sauvegardées (ex: chemin image + type)
const flyers_sv = await flyers_send(); 
// console.log("flyers_sv :", flyers_sv);
// console.log("formData_b")
// console.log(formData_b)
var send_data = {};
send_data = {
event : formData_b?.current?.eventId,
models: formData_b?.current?.models,
images: flyers_sv
}

console.log(send_data)
// return false;

// const finalData = new FormData();

// Ajoute l'eventId
// finalData.append('eventId', formData_b.current.eventId);

// Ajoute les catégories
// formData_b.current.categories.forEach(cat => {
//   finalData.append('categories[]', cat);
// });

// Ajoute les modèles sélectionnés par catégorie
// Object.keys(formData_b.current.models).forEach(cat => {
//   formData_b.current.models[cat].forEach(modelId => {
//     finalData.append(`models[${cat}][]`, modelId);
//   });
// });

// Ajoute les flyers statiques (si envoyés par formData initial)
// Object.keys(formData_b.current.flyers).forEach(modelId => {
//   finalData.append(`flyers[${modelId}]`, formData_b.current.flyers[modelId]);
// });

// Ajoute les flyers uploadés (avec type + chemin)
// Object.keys(flyers_sv).forEach(modelId => {
//   flyers_sv[modelId].forEach(flyer => {
//     finalData.append(`flyers[${modelId}][${flyer.type}]`, flyer.path);
//   });
// });

// ✅ Pour afficher réellement les données FormData :
// console.log("Contenu de finalData :");
// for (let [key, value] of finalData.entries()) {
//   console.log(`${key}:`, value);
// }

// Envoi vers l’API
const response = await axios.post(`${apiUrl}/events/join_event_model`, send_data);

toast.dismiss(loadingToast_b);

if (response?.data) {
  console.log("response?.data")
  console.log(response?.data)

  // return false;
  toast.update(loadingToast_b, {
    render: 'modeles ajoutés avec succès ✅',
    type: 'success',
    isLoading: false,
    autoClose: 3000,
  });

  toggleModal_joinmodel();
}

} catch (err) {
console.error("Erreur:", err);
toast.update(loadingToast_b, {
  render: 'Erreur lors de l’envoi ❌',
  type: 'error',
  isLoading: false,
  autoClose: 4000,
});
}
};


  return (

    <div className='admin_datacontent'>
       <ToastContainer className="toast_style"/>
      <h1>Evènements</h1>
      <div className="models-table-container">
      {/* Barre de recherche et options */}
      <div className="table-options">
        <input
        className="search_bar"
          type="text"
          placeholder="Rechercher un Evènement..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
         <div className="filters">
          <FaFilter style={{ marginRight: "5px" }} />
          <select>
            <option value="all">Tous les types</option>
            <option value="actif">interne</option>
            <option value="inactif">externe</option>
          </select>
        </div>
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="asc">Trier par nom (A-Z)</option>
          <option value="desc">Trier par nom (Z-A)</option>
        </select>
        <div>
          <label className="add_new mx-3" onClick={openModal} > + nouveau</label>  
          <button className='add_event_btn' onClick={toggleModal_joinmodel}>joindre des modèles</button>
              
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
              <form onSubmit={handleSubmit}  className="event_form">

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
                      
                      
                      <div className="row line_data locationbox text-center">
                     <Locations className="inline_zone"
                              inputdata ={{ 
                                          
                                              pays_name : 'pays',

                                              ville_name: 'ville',
                                            //  quartier_name: 'quartier'
                              }} 
                              onChange={handleLocationChange} />

                              <div className="col-6 indication_lieu">                               
                                    <input className="input_value" type="text" placeholder="Description du lieu" name='locationDescription' onChange={handleChange} style={styles.input}/>

                              </div>

                      </div>



                      <div className="row">
                           
                            <div className=" organiser_container">
                                <label className="label">Organisateur :</label>
                            
                    <div className="checkbox-group">
                        <input type="checkbox" id="afrodite" className="chk"
                               checked={isAfrodite} onChange={handleCheckboxChange_organiser} />
                       <label htmlFor="afrodite">Afrodite</label>
                  </div>
              <label className="intermed"> ou </label>
      {!isAfrodite && (
        <div className="select-group">
          <select
            className="custom-select"
            value={selectedOrganizer}
            onChange={handleSelectChange_organiser}
          >
            <option value="">-- Sélectionner  --</option>
            {organizers.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
            <option value="new">+ Nouveau organisateur</option>
          </select>
        </div>
      )}

      {showNewOrganizerInput && (
        <div className="new-organizer-input">
          <input
            type="text"
            placeholder="Nom du nouvel organisateur"
            value={newOrganizerName}
            onChange={(e) => setNewOrganizerName(e.target.value)}
          />
        </div>
      )}

                                {/* <fieldset>
                                    <select className="form-control form-control-md" onChange={handleChange} name='organizer' style={styles.input}>
                                        <option value="interne">Interne</option>
                                        <option value="externe">Externe</option>
                                    </select>
                                </fieldset> */}
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


                      <div className="line_data text-center mt-3 mb-5" style={{display : "none"}}>
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
      
      <AnimatePresence>
          {isModalOpen_joinmodel && (
            <motion.div className="modal-overlay" onClick={toggleModal_joinmodel} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="modal-content" 
                style={{ maxHeight: "80vh", overflowY: "auto", padding: "20px" }} 
                onClick={(e) => e.stopPropagation()} 
                initial={{ scale: 0.8, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0.8, opacity: 0 }} 
                transition={{ duration: 0.3, ease: "easeOut" }}>

                <label className='title'>ajouter des modèles à l'evènement</label>
                <form onSubmit={handleSubmit_b} className='event_form'>
                  <div className="line_data">
                    <div className="half_col">
        <label>event</label>            
                    <select
        className="w-full border p-2 mb-2"
        value={selectedEventId}
        onChange={handleEventChange}
      >
        <option value=""  >-- Choisir un événement --</option>
        {allevents.map(event => (
          <option key={event.id} value={event.id}>
            {event.title}
          </option>
        ))}
      </select>

      {selectedEvent_b.image && (
        <div className="event_img_show border rounded">
         
          <img 
             src={`${apiUrl}/${selectedEvent_b.image}`
                  
            }

            // src={selectedEvent_b.image} 
            alt={selectedEvent_b.title} 
          className="" />

        </div>
      )}

                     </div>

                    <div className="half_col">
     <label className='mr-3'>Type modèle: </label>            
               {categories_models.map(cat => (
        <label key={cat} className="block mb-2">
          <input
            type="checkbox"
            value={cat}
            checked={selectedCategories.includes(cat)}
            onChange={() => handleCategoryChange_event(cat)}
            className="mr-2"
          />
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </label>
                    ))
               }

      {selectedCategories.map(cat => (
        <div key={cat} className="mt-4">
          <label className="font-bold mb-1">Sélectionner des modèles pour {cat}</label>

          <div className="dropdown_bis-wrapper" ref={el => dropdownRefs_models.current[cat] = el}>
            <div
              className="dropdown_bis-trigger"
              onClick={() => setDropdownOpen_models(prev => ({ ...prev, [cat]: !prev[cat] }))}
            >
              {selectedModels[cat]?.length
                ? selectedModels[cat].map(id => {
                    const model = modelsByCategory[cat].find(m => m.id === id);
                    return model?.name;
                  }).join(', ')
                : 'Choisir des modèles...'}
            </div>

            {dropdownOpen_models[cat] && (
              <div className="dropdown_bis-menu">
                {modelsByCategory[cat].map(model => (
                  <label key={model.id} className="dropdown_bis-item">
                    
                    <input     
                            type="checkbox" className="label_input"

                            checked={selectedModels[cat]?.includes(model.id) || false}

                            onChange={() => handleModelSelection(cat, model.id)}
                    />

                    {model.name}

                  </label>
                ))}
              </div>
            )}
          </div>

          {selectedModels[cat]?.map(modelId => {
             const model = modelsByCategory[cat].find(m => m.id === modelId);
             const flyer = flyers[modelId];
   console.log("modelId")
   console.log(modelId)
  return (
     <div key={modelId} className="model-flyer-container flex items-center gap-4 mt-2 p-2 border rounded">
       
        <span className="model-name">{model.name}</span>
      
        <div className="flyer-upload-wrapper relative">
        <label htmlFor={`upload_${modelId}`}  className="">
          {flyer ? (
            <img
              src={URL.createObjectURL(flyer)}
              alt="Flyer preview"
              className="flyer-preview"
            />
            ) : (
            <div className="upload-placeholder flex items-center justify-center">
              <i className="fas fa-image text-gray-500 text-2xl"></i>
            </div>
          )}
       </label>
    
        <input  
              id={`upload_${modelId}`}
              type="file"
              accept="image/*"
              className="hid den"
              onChange={(e) => handleFlyerUpload(modelId, e.target.files[0])}
      
       />
  
       </div>

    </div>
  );
})}

      </div>
      ))}
   
    </div>

                     
                  </div>

                  

                  

              
                  <div className="modal-actions flex-center justify-content-center">
                    <button type="submit" className="btn-save">Enregistrer</button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
     
        {/* <button className='add_event_btn' onClick={toggleModal_joinmodel}>joindre des modèles</button> */}
        
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

export default Admin_events;

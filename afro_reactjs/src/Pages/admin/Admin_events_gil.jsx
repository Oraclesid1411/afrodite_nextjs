import React, { useState, useEffect , useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import Calendar_view from '../Calendar_view';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faList } from '@fortawesome/free-solid-svg-icons';
import Locations from '../../Components/Locations';
import imageCompression from 'browser-image-compression';
import model_1 from "/assets/models/manneq.jpeg"
import model_2 from "/assets/models/mannequ_2.jpeg"
import model_3 from "/assets/models/manneq_3.jpeg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Admin_events() {
  const [events, setEvents] = useState([]);
  const apiUrl = 'https://apiafro.aafrodites.com';
  const navigate = useNavigate();

   const [loading, setLoading] = useState(true); // Loader state
   
  const [isloaded, setIsloaded] = useState(true);

  const [imagePreview, setImagePreview] = useState(null);
  const [images, setImages] = useState([]);
  const [imagesBoutique, setImagesBoutique] = useState([]);
  const [isnotification, setIsNotification] = useState(false);
  const [imagespath, setImagespath] = useState([]);
  
  

  useEffect(() => {
    const fetchData = async () => {
     
      try {
        setLoading(true); // Active le loader
       
           const rep1 = await axios.get(`${apiUrl}/events/all`);
        
            const grouped_event = rep1?.data.reduce((acc, row) => {
            // Vérifie si le mannequin existe déjà dans l'accumulateur

             const convdb = new Date(row?.date_debut).toISOString().split('T')[0];
          
            const convdf = new Date(row?.date_fin).toISOString().split('T')[0];
            
            let listevent = acc.find(item => (item.id_event === row.id_event) &&
                                              (item.type_model === row.id_typemodel));
            
            if (!listevent) {
            
              // Si non, crée une nouvelle entrée pour ce mannequin
              listevent = {
                id_event: row.id_event,
                nom_event: row.nom_event,
                detail: row.details,
                type_model: row.id_typemodel, 
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

      
          setEvents(grouped_event);
       
      } catch (err) {
        console.log(err);
      
      }finally {
        setLoading(false); // Désactive le loader
      }
    };
    fetchData();
  } , []);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen_joinmodel, setIsModalOpen_joinmodel] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleModal_joinmodel = () => setIsModalOpen_joinmodel(!isModalOpen_joinmodel);
  const [TypeView, setTypeView] = useState("calendar");

  const handleView = (event) => {
                
    setTypeView(event.currentTarget.dataset.mode);
               
  };

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
});

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
    // console.log("Envoi au serveur...");

    
  
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
  console.log("files")
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
     
      const response = await axios.post(`${apiUrl}/uploadfiles/saveEvent_File`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.dismiss(loadingToastId);
      toast.success('Image chargée avec succès !', {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
      });
      
      console.log("response.data")
      console.log(response.data)
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
   

//   const flyers_send = async () => {
//     console.log("Envoi au serveur...");

//     const flyers  = formData_b?.current?.flyers; 
//     console.log("flyers")
//     console.log(flyers)
//     if (!flyers || Object.keys(flyers).length === 0) {
//       console.error("Aucun flyer à envoyer.");
//       return {};
//     }

    
//   const loadingToastId = toast.info("Téléversement des flyers en cours...", {
//     position: "top-center",
//     autoClose: false,
//     hideProgressBar: false,
//     closeOnClick: false,
//     pauseOnHover: false,
//     draggable: false,
//     theme: "light",
//   });

//    const formData = new FormData();
//     for (const modelId in flyers) {
//       const files = flyers[modelId];

//       // Génération d’un nom unique
//       for (let i = 0; i < files.length; i++) {
//         const file = files[i];
//         const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
//         const baseName = file.name.split(".")[0];
//         const ext = file.name.split(".").pop();
//         const uniqueName = `${baseName}_${timestamp}.${ext}`;
  
//         // Compresser les images
//         const desktopImage = await compressImage(file, 1920, 1080);
//         const mobileImage = await compressImage(file, 1280, 729);
//         const thumbnailDesktop = await compressImage(file, 600, 400);
//         const thumbnailMobile = await compressImage(file, 400, 250);
  
//         // Append toutes les variantes + original avec infos
//         const imagesToUpload = [
//           { blob: file, type: "original", folder: "original_resolution" },
//           { blob: desktopImage, type: "desktop", folder: "haute_resolution" },
//           { blob: mobileImage, type: "mobile", folder: "haute_resolution" },
//           { blob: thumbnailDesktop, type: "desktop", folder: "miniatures" },
//           { blob: thumbnailMobile, type: "mobile", folder: "miniatures" },
//         ];
  
//         imagesToUpload.forEach(({ blob, type, folder }) => {
//           const filename = `${baseName}_${timestamp}_${type}.${ext}`;
//           formData.append("files", blob, filename);
//           formData.append("modelId", modelId);
//           formData.append("type", type);
//           formData.append("folder", folder);
//         });
//       }
//     }
   
//   try {
//     const response = await axios.post(`${apiUrl}/uploadfiles/save_flyers`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//       withCredentials: true,
//     });

//     toast.dismiss(loadingToastId);
//     toast.success("Flyers envoyés avec succès !", {
//       position: "top-center",
//       autoClose: 3000,
//       theme: "light",
//     });

//     console.log("Réponse du serveur :", response.data);
//     return response.data?.files; // { 56: [...], 57: [...] }

//   } catch (error) {
//     toast.dismiss(loadingToastId);
//     toast.error("Erreur lors de l'envoi des flyers", {
//       position: "top-center",
//       autoClose: 3000,
//       theme: "light",
//     });
//     console.error("Erreur lors de l'upload :", error.response?.data || error.message);
//   }
// };

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
  
      const loadingToast = toast.info('demande en cours...', {
        position: "top-center",
        autoClose: false, // Ne ferme pas la notification automatiquement
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
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

                    toast.dismiss(loadingToast);
             
                     
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
                    toggleModal()
                      // setIsloaded(true)
                  
                  
        
                  }
                }); 
                
          } catch (err) {
            console.log("erreur");
            // setError(err.response.data);
          }
    };

    // joindre modele et event
    // récupération de données


    const [allevents, setAllevents] = useState([]);
    const [allmannequin, setAllmannequin] = useState([]);
    console.log("allmannequin")
    console.log(allmannequin)
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
            
              // Si non, crée une nouvelle entrée pour ce mannequin
              listevent = {
                id: row.id_event,
                title: row.nom_event,
                detail: row.details,
               image: model_1,
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
    const [selectedEvent, setSelectedEvent] = useState([
      list_all_events.find(event => event.id === Number(selectedEventId))
   
    ]);
   
    
    // const [selectedCategories, setSelectedCategories] = useState([]);
    // const [selectedModels, setSelectedModels] = useState({});
    // const [flyers, setFlyers] = useState({});
  

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

  // const handleCategoryChange_event = (cat) => {
  //   setSelectedCategories(prev =>
  //     prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
  //   );
  // };


   const handleEventChange = (e) => {
    console.log("e.target.value")
       console.log(e.target.value)
       const eventId = Number(e.target.value);
 
      setSelectedEventId(Number(e.target.value));

      const selected = allevents.find(ev => ev.id == eventId);
           setSelectedEvent(selected);

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
    // end joindre modele et event
  

    
// const handleSubmit_b = async (e) => {
//   e.preventDefault();


//   console.log(formData_b)
//   // le loader

//   const loadingToast_b = toast.info('sauvegarde de données...', {
//     position: "top-center",
//     autoClose: false, // Ne ferme pas la notification automatiquement
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "light",
//     // toastClassName: 'custom-toast' // <-- classe personnalisée

//   });

//   // send and saves flyers
  
//   const flyers_sv = await flyers_send(); // Attend que la fonction résolve la promesse
     
// console.log(flyers_sv)
//   // send form data
//   // return false;
//   const finalData = new FormData();

//   finalData.append('eventId', formData_b.current.eventId);

//   formData_b.current.categories.forEach(cat => {
//     finalData.append('categories[]', cat);
//   });

//   Object.keys(formData_b.current.models).forEach(cat => {
//     formData_b.current.models[cat].forEach(modelId => {
//       finalData.append(`models[${cat}][]`, modelId);
//     });
//   });

//   Object.keys(formData_b.current.flyers).forEach(modelId => {
//     finalData.append(`flyers[${modelId}]`, formData_b.current.flyers[modelId]);
//   });
//   // Ajout des flyers (URL)
//   Object.keys(flyers_sv).forEach(modelId => {
//     flyers_sv[modelId].forEach(flyer => {
//       // Ex: flyers[123][original] = /uploads/events_flyers/...
//       finalData.append(`flyers[${modelId}][${flyer.type}]`, flyer.path);
//     });
//   });

//   try {
  
//     console.log("finalData")
//     console.log(finalData)

//     // return false;
//     await axios
//       .post(`${apiUrl}/events/join_event_model`,
//         finalData
//         )
//       .then((result) => {
  
//       console.log("result.data")
//         console.log(result)


        
//       //   console.log(result.data?.user)

//       //  return false;

      
//           if(result){

//             toast.dismiss(loadingToast_b);
     
//             console.log('Succès:', data);
//             toast.update(loadingToast_b, {
//               render: 'Données sauvegardées avec succès ✅',
//               type: 'success',
//               isLoading: false,
//               autoClose: 3000,
//             });
   
//           }
//         }); 
        
//   } catch (err) {
//     console.log("erreur");
//     console.error('Erreur:', err);
//     toast.update(loadingToast_b, {
//       render: 'Erreur lors de l’envoi ❌',
//       type: 'error',
//       isLoading: false,
//       autoClose: 4000,
//     });
 
//     // setError(err.response.data);
//   } 
// };

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

      return false;
      toast.update(loadingToast_b, {
        render: 'Données sauvegardées avec succès ✅',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
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
      <div className="admin_datacontent">
          <ToastContainer className="toast_style"/>
          {/* <div className="mode_affichage_container">
          <div className="btn_box">
            {TypeView === "calendar" ? (
              <>
                <button className="view_btn calendar active">
                  <FontAwesomeIcon icon={faCalendar} size='xl' />
                </button>
                <button className="view_btn timeline" data-mode="timelines" onClick={handleView}>
                  <FontAwesomeIcon icon={faList} size='xl' />
                </button>
              </>
            ) : (
              <>
                <button className="view_btn calendar" data-mode="calendar" onClick={handleView}>
                  <FontAwesomeIcon icon={faCalendar} size='xl' />
                </button>
                <button className="view_btn active timeline">
                  <FontAwesomeIcon icon={faList} size='xl' />
                </button>
              </>
            )}
          </div>
        </div>
    */}

           <div className="add_event">
             
             <button className='add_event_btn mx-3' onClick={toggleModal}>+ ajouter</button>
       
             <button className='add_event_btn' onClick={toggleModal_joinmodel}>joindre des modèles</button>
        
          </div>
        
        {TypeView === "calendar" ? (
          <div className="calendar_view">
            <Calendar_view 
           events_tab = {events} 
        />
    </div>
        ) : (
          <> 
          </>
        )}

     
        <AnimatePresence>
          {isModalOpen && (
            <motion.div className="modal-overlay" onClick={toggleModal} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="modal-content" 
                style={{ maxHeight: "80vh", overflowY: "auto", padding: "20px" }} 
                onClick={(e) => e.stopPropagation()} 
                initial={{ scale: 0.8, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0.8, opacity: 0 }} 
                transition={{ duration: 0.3, ease: "easeOut" }}>

                <label className='title'>Créer un événement</label>
                <form onSubmit={handleSubmit}>
                  <div className="line_data">
                    <div className="half_col">
                      <input className="input_value" type="text" placeholder="Nom / Titre de l'événement" onChange={handleChange} name='name'/>
                    </div>

                    <div className="half_col">
                      <input className="input_value" type="text" placeholder="description" onChange={handleChange} name='description'/>
                    </div>
                    <div className="half_col item_list location_input col-12">
                      <fieldset>
                          <select className="form-control form-control-lg" onChange={handleChange} name='eventType'>
                            <option value="">Type d'événement</option>
                            <option value="1">Interne</option>
                            <option value="2">Externe</option>
                          </select>
                      </fieldset>
                    </div>

                    <div className="half_col">
                    <input 
                        className="input_value" 
                        type="text" 
                        placeholder="Date Début"
                        onFocus={(e) => e.target.type = "date"} 
                        onBlur={(e) => e.target.type = "text"} 
                        onChange={handleChange}
                        name='startDate'
                      />
                    </div>
                    <div className="half_col">
                    <input 
                        className="input_value" 
                        type="text" 
                        placeholder="Date Fin"
                        onFocus={(e) => e.target.type = "date"} 
                        onBlur={(e) => e.target.type = "text"} 
                        onChange={handleChange}
                        name='endDate'
                      />
                    </div>

                    <div className="half_col">

                    <input 
                      className="input_value" 
                      type="text" 
                      placeholder="Heure Début"
                      onFocus={(e) => e.target.type = "time"} 
                      onBlur={(e) => e.target.type = "text"} 
                      onChange={handleChange}
                      name='startTime'
                    />
                    </div>

                    <div className="half_col">
                    <input 
                      className="input_value" 
                      type="text" 
                      placeholder="Heure Fin"
                      onFocus={(e) => e.target.type = "time"} 
                      onBlur={(e) => e.target.type = "text"} 
                      onChange={handleChange}
                      name='endTime'
                    />
                    </div>

                     <div className="line_data locationbox">
                     <Locations className="inline_zone"
                              inputdata ={{ 
                                          
                                              pays_name : 'pays',

                                              ville_name: 'ville',
                                            //  quartier_name: 'quartier'
                              }} 
                              onChange={handleLocationChange}
                                                                                          
                            />
                      </div>

                    <div className="half_col">
                      <input className="input_value" type="text" placeholder="Description du lieu" name='locationDescription' onChange={handleChange}/>
                    </div>

                     <div className="half_col item_list location_input col-12">
                      <fieldset>
                          <select className="form-control form-control-lg" onChange={handleChange} name='organizer'>
                            <option value="">Organisateur</option>
                            <option value="interne">Interne</option>
                            <option value="externe">Externe</option>
                          </select>
                      </fieldset>
                    </div>

                    <div className="half_col">
                      <input className="input_value" type="text" placeholder="Nombre de participant attendus" onChange={handleChange} name='expectedParticipants'/>
                    </div>

                    <div className="half_col item_list location_input col-12">
                      <fieldset>
                          <select className="form-control form-control-lg" onChange={handleChange} name='status'>
                            <option value="">Status</option>
                            <option value="1">A venir</option>
                            <option value="2">En cours</option>
                            <option value="3">Terminé</option>
                            <option value="4">Annulé</option>
                          </select>
                      </fieldset>
                    </div>

                    <div className="half_col item_list location_input col-12">
                      <fieldset>
                          <select className="form-control form-control-lg" onChange={handleChange} name='visibility'>
                            <option value="">Visibilité</option>
                            <option value="1">Public</option>
                            <option value="2">Privé</option>
                          </select>
                      </fieldset>
                    </div>
                    
                  </div>

                  

                  

                  <div className="line_data">
                  <label>Modèles concernés :</label> <br />
                    <label><input type="checkbox" name="categories" value="1" onChange={handleChange} /> Mannequin</label>
                    <label><input type="checkbox" name="categories" value="2" onChange={handleChange} /> Vlogueuse</label>
                    <label><input type="checkbox" name="categories" value="3" onChange={handleChange} /> Hotesse </label>

                  </div>

                  <div style={styles.formGroup} className='mt-5'>
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

                  <div className="modal-actions flex-center">
                    <button type="submit" className="btn-save">Enregistrer</button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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

      {selectedEvent && (
        <div className="event_img_show border rounded">
          {/* <h3 className="text-lg font-bold mb-2">{selectedEvent.title}</h3> */}

          <img src={selectedEvent.image} alt={selectedEvent.title} 
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
     
      </div>
    </>
  );
}

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
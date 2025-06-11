
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect ,useRef  } from "react"; 
import Loader from '../../Components/Loader';
import axios from 'axios' 

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaEye,FaFilter, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import imageCompression from 'browser-image-compression';
import CheckboxGroup from "../../Components/CheckboxGroup ";
// import zIndex from "@mui/material/styles/zIndex";
import LocationsB from "../../Components/LocationsB";
import Locations from "../../Components/Locations";
import { PhoneInput } from "react-international-phone";
import moment from 'moment';
const Collabs_Mgt = () => {

// déclaration
const apiUrl = 'https://apiafro.aafrodites.com'
const [collabs_data , setcollabs_data] = useState([]); 
const [liste_boutique , setliste_boutique] = useState([]); 
const [collabs_categorie , setcollabs_categorie] = useState([]); 
const [newuserdata , setnewuserdata] = useState([]);
const [isloaded, setIsloaded] = useState(true);
const [selectedModel, setSelectedModel] = useState(null); // Pour gérer le modal
const [isDetailModalOpen, setDetailModalOpen] = useState(false); // Modal pour détail
const [isUpdateModalOpen, setUpdateModalOpen] = useState(false); // Modal pour mise à jour

//    const apiUrl = 'http://localhost:5000'
const [isModalOpen, setIsModalOpen] = useState(false);
const [imagePreview, setImagePreview] = useState(null);
const [imagePreviewBoutique, setImagePreviewBoutique] = useState(null);
const [images, setImages] = useState([]);
const [imagesBoutique, setImagesBoutique] = useState([]);
const [isnotification, setIsNotification] = useState(false);
const [imagespath, setImagespath] = useState([]);


const [models, setModels] = useState([]); // Liste des modèles
const [search, setSearch] = useState(""); // Barre de recherche
const [sortOrder, setSortOrder] = useState(null); // Ordre de tri
const [currentPage, setCurrentPage] = useState(0); // Page actuelle
const [itemsPerPage] = useState(7); // Nombre d'éléments par page

  

const [dataToUpdate, setdataToUpdate] = useState({
  pays: '',
  ville: '',
  quartier: ''
}); // Liste des modèles

const [locationDataA, setLocationDataA] = useState({
    
  // pour les personne
  pays: '',
  ville: '',
  quartier: '',
});

const [locationData, setLocationData] = useState({
  // pour les boutiques
  pays: '',
  ville: '',
  quartier: '',

});
 // form params
  
 const [formData, setFormData] = useState({
  model: {
    nom: "",
    prenom: "",
    pseudo: "",
    nom_boutique : "",
    email: "",
    indication_adr:"",
    //   taille: "",
    // poids: "",
    // indication: "",
   
  }
  
});

const handleInputChange = (type, field, value) => {
  setFormData((prev) => ({
    ...prev,
    [type]: {
      ...prev[type],
      [field]: value,
    },
  }));
};



const handleLocationChange = (data) => {
setLocationData(data);
// console.log('Valeurs sélectionnées:', data);
};

const handleLocationChange_A = (data) => {
setLocationDataA(data);
// setdataToUpdate(prevState => ({
//   ...prevState,
//   pays: data.pays,
//   ville: data.ville,
//   quartier: data.quartier
// }));
// console.log('Valeurs sélectionnées:', data);
};

    console.log("locationDataA")
    console.log(locationDataA)

const [phone1 , setPhone1] = useState("");
const [phone2 , setPhone2] = useState("");
const [phone_a, setPhone_a] = useState("");
const [phone_b, setPhone_b] = useState("");
const [nom_boutique, setNomBoutique] = useState("");
const [localisation, setLocalisation] = useState("");
const [email, setEmail] = useState("");

// fin des déclarations

  

  // code de selection: view
       useEffect(() => {
          const fetchData = async () => {
            try {
              const [rep1 , rep2 , rep3] = await Promise.all([
               
                axios.post(`${apiUrl}/Collabs/liste_collabs`), 
                axios.get(`${apiUrl}/Collabs/collabs_categorie`), 
                axios.post(`${apiUrl}/Collabs/liste_boutiques`), 
               
              ]);
              setcollabs_data(rep1.data);
              setcollabs_categorie(rep2.data);
              setliste_boutique(rep3.data);
              
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
  
  const groupedResults = collabs_data.reduce((acc, row) => {
    // Vérifie si le mannequin existe déjà dans l'accumulateur
    let model = acc.find(item => item.model_id === row.idcontributeur);
  
    // console.log("model")
    // console.log(model)
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
  
      
    // console.log("model")
    // console.log(model)
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
  const groupedboutique = liste_boutique.reduce((acc, row) => {
    // Vérifie si le mannequin existe déjà dans l'accumulateur
    // console.log(row)
    let model = acc.find(item => item.model_id === row.collab_id);
  
    // console.log("model")
    // console.log(model)
    // console.log( row.idcontributeur)
    // console.log("model")
      
    if (!model) {
      // Si non, crée une nouvelle entrée pour ce mannequin
      model = {
        model_id: row.collab_id,
        nom: row.nom,
        prenom: row.prenom,
        pseudo: row.pseudo,
        type_image: 1,
        type_model: row.type_model,
        userclient: row.userclient,
        id_image: row.id_image,
        image_name: row.image_name,
        
        type_contributeur: row.type_contributeur,
         paths: {} };
      acc.push(model);
  
      
    // console.log("model")
    // console.log(model)
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

  const mergedList = [...groupedResults, ...groupedboutique];
 
    // Filtrer les données par recherche
    const filteredModels = mergedList.filter((model) =>
      model.nom.toLowerCase().includes(search.toLowerCase()) ||
       model.prenom.toLowerCase().includes(search.toLowerCase()) ||
       model.pseudo.toLowerCase().includes(search.toLowerCase())
    );
  
    // Trier les données
    const sortedModels = [...filteredModels].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.nom.localeCompare(b.nom);
      } else {
        return b.nom.localeCompare(a.nom);
      }
    });
   
    // Pagination
    const offset = currentPage * itemsPerPage;
    const paginatedModels = sortedModels.slice(offset, offset + itemsPerPage);
    
  // fin code de selection


  
  // code creation: insertion, update, delete


  
  //fin code creation: insertion, update, delete

  // Fonction pour ouvrir le modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
    setIsNotification(false)
    setImagePreview(null)
  };
  


    
  // Fonction pour gérer les catégories
   const [selectedOptions, setSelectedOptions] = useState([]);
   const handleSelection_Change = (newSelection) => {
  
     setSelectedOptions(newSelection);
      
   };
 
    // Vérification si la catégorie "boutique" est sélectionnée
  const isBoutiqueChecked = selectedOptions.includes('boutique');


  // Vérification si "boutique" est dans les catégories sélectionnées


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
          return updatedImages;
        });
      };
      reader.readAsDataURL(file); // Lit l'image comme DataURL
    }

  };
 
    
  const handleImageChangeBoutique = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const newImagePath = reader.result; // Chemin de la nouvelle image

        
        // Mettre à jour les aperçus
        setImagePreviewBoutique(newImagePath);
        
   
        // Sauvegarder le chemin dans l'état images
        setImagesBoutique((prev) => {
          const updatedImagesBoutique = { ...prev };
          if (!updatedImagesBoutique.path) {
            updatedImagesBoutique.path = [];
          }
          updatedImagesBoutique.path.push(newImagePath); // Ajoute le nouveau chemin
          return updatedImagesBoutique;
        });
      };
      reader.readAsDataURL(file); // Lit l'image comme DataURL
    }

  };
   

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
      return [];
    }
  
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
   
  // Ajout des fichiers compressés avec dossier et type dans FormData
  formData.append("images", file, `${originalFileName.split(".")[0]}_${timestamp}_original_desktop.jpeg`);
  formData.append("folder", "original_resolution");
  formData.append("type", "desktop");

  formData.append("images", desktopImage, `${originalFileName.split(".")[0]}_${timestamp}_desktop.jpeg`);
  formData.append("folder", "haute_resolution");
  formData.append("type", "desktop");

  formData.append("images", mobileImage, `${originalFileName.split(".")[0]}_${timestamp}_mobile.jpeg`);
  formData.append("folder", "haute_resolution");
  formData.append("type", "mobile");

  formData.append("images", thumbnailDesktop, `${originalFileName.split(".")[0]}_${timestamp}_thumbnail_desktop.jpeg`);
  formData.append("folder", "miniatures");
  formData.append("type", "desktop");

  formData.append("images", thumbnailMobile, `${originalFileName.split(".")[0]}_${timestamp}_thumbnail_mobile.jpeg`);
  formData.append("folder", "miniatures");
  formData.append("type", "mobile");
  
}
 
  
    try {
      // Envoi des fichiers 
     
      const response = await axios.post(`${apiUrl}/Collabs/saveFile`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
  
      console.log("Fichiers uploadés avec succès :", response.data);
      return response.data?.files;
    } catch (error) {
      console.error("Erreur lors de l'upload :", error.response?.data || error.message);
    }
  };
  const next_optionBoutique = async () => {
    console.log("Envoi au serveur...");     
  
    if (!imagesBoutique?.path || imagesBoutique.path.length === 0) {
      console.error("Aucune image à télécharger");
      return [];
    }
  
    const formData = new FormData();

for (let index = 0; index < imagesBoutique.path.length; index++) {
  const base64Image = imagesBoutique.path[index];
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
   
 
  // Ajout des fichiers compressés avec dossier et type dans FormData
  formData.append("images", file, `${originalFileName.split(".")[0]}_${timestamp}_original_desktop.jpeg`);
  formData.append("folder", "original_resolution");
  formData.append("type", "desktop");

  formData.append("images", desktopImage, `${originalFileName.split(".")[0]}_${timestamp}_desktop.jpeg`);
  formData.append("folder", "haute_resolution");
  formData.append("type", "desktop");

  formData.append("images", mobileImage, `${originalFileName.split(".")[0]}_${timestamp}_mobile.jpeg`);
  formData.append("folder", "haute_resolution");
  formData.append("type", "mobile");

  formData.append("images", thumbnailDesktop, `${originalFileName.split(".")[0]}_${timestamp}_thumbnail_desktop.jpeg`);
  formData.append("folder", "miniatures");
  formData.append("type", "desktop");

  formData.append("images", thumbnailMobile, `${originalFileName.split(".")[0]}_${timestamp}_thumbnail_mobile.jpeg`);
  formData.append("folder", "miniatures");
  formData.append("type", "mobile");
  
}
  
    try {
      // Envoi des fichiers
     
      const response = await axios.post(`${apiUrl}/Collabs/saveFile`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
  
      console.log("Fichiers uploadés avec succès :", response.data);
      return response.data?.files;
    } catch (error) {
      console.error("Erreur lors de l'upload :", error.response?.data || error.message);
    }
  };
   
const handleSubmit = async (e) => {

  e.preventDefault();
const formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');

// console.log(formattedDate); // Exemple : 2025-01-14 15:45:30

  const loadingToast = toast.info('sauvegarde en cours...', {
      position: "top-center",
      autoClose: false, // Ne ferme pas la notification automatiquement
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });

// Filtrer le tableau collabs_categorie en fonction des libelles dans selectedOptions
const filteredCategories = collabs_categorie.filter(option =>
selectedOptions.includes(option.libelle)
);

// Affichage des résultats filtrés
// console.log(filteredCategories);

  const imgs_upld = await next_option(); // Attend que la fonction résolve la promesse
  const all_images = []

if(imgs_upld.length > 0){
  all_images.push({
    o_desktop : imgs_upld[0] ,
    hr_desktop : imgs_upld[1] ,
    hr_mobile : imgs_upld[2] ,
    m_desktop : imgs_upld[3] ,
    m_mobile : imgs_upld[4] ,

});
}
   

const all_imagesBoutique = [];
  
  var param = [];
  const data_model = {
    data : formData?.model,
    categories: filteredCategories,
  }

  console.log("data_model")
  console.log(data_model)
// return false;
  if(isBoutiqueChecked){
    const imgs_upldBoutique = await next_optionBoutique(); // Attend que la fonction résolve la promesse
    console.log("boutique image")
    console.log(imgs_upldBoutique)

    if(imgs_upldBoutique.length > 0){
      all_imagesBoutique.push({
        o_desktop : imgs_upldBoutique[0] ,
        hr_desktop : imgs_upldBoutique[1] ,
        hr_mobile : imgs_upldBoutique[2] ,
        m_desktop : imgs_upldBoutique[3] ,
        m_mobile : imgs_upldBoutique[4] ,

});

    }
    const telnum1 = document.querySelector(".react-international-phone-input[name='phone1']" ).value;
    const number1 = telnum1.split(" ");
    const telnum2 = document.querySelector(".react-international-phone-input[name='phone2']" ).value;
    const number2 = telnum2.split(" ");
    
    console.log(number1)
    const code_1 = number1[0]; 
     const tel_1 = number1[1]; 
     const code_2 = number2[0]; 
     const tel_2 = number2[1]; 
  // return false;
    param = {all_images ,all_imagesBoutique,
      date : formattedDate,data_model, nom_boutique, 
      code_1,tel_1 , code_2 ,tel_2, locationData, localisation, 
    email}
  }
  else{
    const tel_a = document.querySelector(".react-international-phone-input[name='phone_a']" ).value;
    const number_a = tel_a.split(" ");
    const tel_b = document.querySelector(".react-international-phone-input[name='phone_b']" ).value;
    const number_b = tel_b.split(" ");
    
    console.log("number_a")
    console.log(number_a)
    const person_code_a = number_a[0]; 
    const person_num_a = number_a[1]; 
    const person_code_b = number_b[0]; 
    const person_num_b = number_b[1]; 

    param = {all_images ,data_model ,    date : formattedDate,
      person_code_a,person_num_a , person_code_b ,person_num_b, locationDataA}
    
  }
 
  
    console.log("param")
    console.log(param)
    
    
  // return false;
 

  
 
 
      console.log(param)

// return false;
     

      try {

        console.log(param)

        // return false;
        await axios
          .post(`${apiUrl}/Collabs/add`,
            param
            )
          .then((result) => {
      
          console.log("result.data")
            console.log(result)
            // console.log(result.data?.user)

          //  return false;

              toast.dismiss(loadingToast);
              if(result){
                // setTimeout(() => {
                
                //   toast.success('collab ajouté avec succès' , {
                //     position: "top-center",
                //     autoClose: 3000,
                //     hideProgressBar: true,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     theme: "light",
                //     // transition: Bounce,
                // });
                  
                setImages([])
                setnewuserdata([result.data?.new_pseudo , result.data?.new_pass])
                  // affciher une notif
                  setIsNotification(true)
                  setIsloaded(true)
                  window.location.relaod();
                  // setIsModalOpen(false);
                  

                // arreter le loader

                // afficher le recap
              // }, 3500); // Délai de 3 secondes

              
    
              }
            }); 
            
      } catch (err) {
        console.log("erreur");
        // setError(err.response.data);
      }
};

 
    // Supprimer un collab
    const handleDelete = (modelId) => {
      if (window.confirm("Voulez-vous vraiment supprimer ce modèle ?")) {
        // Appeler l'API pour supprimer
        axios.post(`${apiUrl}/Collabs/deleteModel`
          , {modelId} )
          .then((response) => {
            if (response.status === 200) {
              alert("Modèle supprimé avec succès !");
              // Mettre à jour l'affichage
              window.location.reload();
            } else {
              alert("Échec de la suppression !");
            }
          })
          .catch((error) => console.error("Erreur :", error));
      }
    };

    
  // const handleDelete = (id) => {
  //   if (window.confirm("Voulez-vous vraiment supprimer ce modèle ?")) {
  //     // Appeler l'API pour supprimer
  //     fetch(`${apiUrl}/models/${id}`, {
  //       method: "DELETE",
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //           alert("Modèle supprimé avec succès !");
  //           // Mettre à jour l'affichage
  //           window.location.reload();
  //         } else {
  //           alert("Échec de la suppression !");
  //         }
  //       })
  //       .catch((error) => console.error("Erreur :", error));
  //   }
  // };

  // Voir les détails
  // const handleViewDetails = (model) => {
  //   setSelectedModel(model);
  //   setDetailModalOpen(true);
  // };

  // Fonction pour récupérer le code ISO2 en fonction de l'indicatif
const getCountryFromPhone = (phone_code) => {
  const countryCodes = {
    "+228": "tg",  // Togo
    // Ajoutez d'autres indicatifs si nécessaire
  };

  const indicatif = phone_code ? phone_code : "";  // Récupère l'indicatif du téléphone
  return countryCodes[indicatif] || 'tg';  // Renvoie le code ISO2 ou 'tg' par défaut
};
 

// console.log("dataToUpdate")
// console.log(dataToUpdate)

 // Modifier (Update)
 const handleUpdate_data = async (id) => {

  event.preventDefault();
  // console.log('id')
  // console.log(id)
  
  try {
       const collab_data = await axios.post(`${apiUrl}/Collabs/retrieveCollab`, {id :id} );

       const setData = collab_data?.data[0]
       setFormData(prevState => ({
        ...prevState,
        model: {
          ...prevState.model,
          nom: setData.nom || "",
          prenom: setData.prenom || "",
          pseudo: setData.pseudo || "",
          nom_boutique: setData.nom_boutique || "",
          email: setData.adresse_email || "",
          indication_adr: setData.indication || "",
        }
      }));


      
    
      setLocationDataA(prevState => ({
        ...prevState,
       
        pays: setData.pays || "",
        ville: setData.ville || "",
        quartier: setData.quartier || "",
        
          
       
      }));
  //     console.log("setData")
  //     console.log(setData.pays)
  //     console.log(setData.ville)
  //     console.log(setData.quartier)
  // console.log("locationDataA ref")

  // console.log(locationDataA)

  setdataToUpdate(collab_data.data[0]) 
  setPhone_a(collab_data.data[0]?.indicatif +""+collab_data.data[0]?.num_tel)
  setPhone_b(collab_data.data[0]?.indicatif_2 +""+collab_data.data[0]?.num_tel_2)
 
// // console.log("phone_a.substring(0, 2).toLowerCase()")

// // console.log(collab_data.data[0]?.indicatif.substring(0, 2).toLowerCase())
//   // return false;
//   // setSelectedModel(model);
  setUpdateModalOpen(true);
} catch (err) {
  console.log("erreur");
  // setError(err.response.data);
}
};

const closeUpdateModal = () => {
  setUpdateModalOpen(false);
 
};
  const handleUpdate = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
  //  console.log("dataToUpdate")
  //  console.log(dataToUpdate)
const collab_id = dataToUpdate?.collab_id;
const formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');

// console.log(formattedDate); // Exemple : 2025-01-14 15:45:30

  const loadingToast = toast.info('sauvegarde en cours...', {
      position: "top-center",
      autoClose: false, // Ne ferme pas la notification automatiquement
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
    var param = [];
    const data_model = {
      data : formData?.model,
      // categories: filteredCategories,
    }
    if(isBoutiqueChecked){
      const imgs_upldBoutique = await next_optionBoutique(); // Attend que la fonction résolve la promesse
      console.log("boutique image")
      console.log(imgs_upldBoutique)
  
      if(imgs_upldBoutique.length > 0){
        all_imagesBoutique.push({
          o_desktop : imgs_upldBoutique[0] ,
          hr_desktop : imgs_upldBoutique[1] ,
          hr_mobile : imgs_upldBoutique[2] ,
          m_desktop : imgs_upldBoutique[3] ,
          m_mobile : imgs_upldBoutique[4] ,
  
  });
  
      }
      const telnum1 = document.querySelector(".react-international-phone-input[name='phone1']" ).value;
      const number1 = telnum1.split(" ");
      const telnum2 = document.querySelector(".react-international-phone-input[name='phone2']" ).value;
      const number2 = telnum2.split(" ");
      
      // console.log(number1)
      const code_1 = number1[0]; 
       const tel_1 = number1[1]; 
       const code_2 = number2[0]; 
       const tel_2 = number2[1]; 
    // return false;
      param = {all_images ,all_imagesBoutique,
        date : formattedDate,data_model, nom_boutique, 
        code_1,tel_1 , code_2 ,tel_2, locationData, localisation, collab_id,
      email}
    }
    else{
      const tel_a = document.querySelector(".react-international-phone-input[name='phone_a']" ).value;
      const number_a = tel_a.split(" ");
      const tel_b = document.querySelector(".react-international-phone-input[name='phone_b']" ).value;
      const number_b = tel_b.split(" ");
      
      // console.log("number_a")
      // console.log(number_a)
      const person_code_a = number_a[0]; 
      const person_num_a = number_a[1]; 
      const person_code_b = number_b[0]; 
      const person_num_b = number_b[1]; 
  
      param = {data_model ,    date : formattedDate,collab_id,
        person_code_a,person_num_a , person_code_b ,person_num_b, locationDataA}
      
    }

    console.log("param")
    console.log(param)

    try {

      
      await axios.post(`${apiUrl}/Collabs/updateModel`, param )
        .then((result) => {
    
          console.log("result.data")
          console.log(result)
           
    // return false;
            toast.dismiss(loadingToast);
           
  setUpdateModalOpen(false);
            // if(result){
            //   // setTimeout(() => {
              
            //   //   toast.success('collab ajouté avec succès' , {
            //   //     position: "top-center",
            //   //     autoClose: 3000,
            //   //     hideProgressBar: true,
            //   //     closeOnClick: true,
            //   //     pauseOnHover: true,
            //   //     draggable: true,
            //   //     progress: undefined,
            //   //     theme: "light",
            //   //     // transition: Bounce,
            //   // });
                
            //   setImages([])
            //   setnewuserdata([result.data?.new_pseudo , result.data?.new_pass])
            //     // affciher une notif
            //     setIsNotification(true)
            //     setIsloaded(true)
            //     window.location.relaod();
            //     // setIsModalOpen(false);
                

            //   // arreter le loader

            //   // afficher le recap
            // // }, 3500); // Délai de 3 secondes

            
  
            // }
          }); 
          
    } catch (err) {
      console.log("erreur");
      // setError(err.response.data);
    }
  };
  // console.log("formData")
  // console.log(formData)

// updates

// setUpdateModalOpen(false);

  return (


    <div className='admin_datacontent'>
       <ToastContainer className="toast_style"/>
      <h1>collabs Management</h1>
      <div className="models-table-container">
      {/* Barre de recherche et options */}
      <div className="table-options">
        <input
          type="text"
          placeholder="Rechercher un collab..."
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
          {/* <label className="add_new mx-3" onClick={openModal} > valider postulant</label> */}
        
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
            <th>Image</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Pseudo</th>
            {/* <th>État</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedModels.map((model) => (
            <tr key={model.model_id}>
              <td>{model.model_id}</td>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <img 
               
                 src={`${apiUrl}/${getPathForResolution(model.paths)} `}
                 alt={model.nom} />
              </td>
              <td>{model.nom}</td>
              <td>{model.prenom}</td>
              <td>{model.pseudo}</td>
              {/* <td>{model.etat}</td> */}
              <td>
                <button title="Modifier" onClick={() => handleUpdate_data(model.model_id)}>
                  <FaEdit />
                </button>
                {/* <Link title="Voir"  to={`/admin/detail_mannequin/1/${model?.model_id}`}>
                  <FaEye />
                </Link> */}
                <button title="Supprimer" onClick={() => handleDelete(model.model_id)}>
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
            <h2 style={{fontSize : "18px" , textAlign : "center"}}>nouveau collab</h2>
           
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
                          collab ajouté avec succès.
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
              <form onSubmit={handleSubmit} className="over_scroll">
                      
                      <div style={styles.formGroup}>
                        <label>Nom :</label>
                        <input type="text"
                          onChange={(e) => handleInputChange("model", "nom", e.target.value)}
                        placeholder="nom" style={styles.input} />
                      </div>
                      <div style={styles.formGroup}>
                        <label>prenom :</label>
                        <input type="text"
                          onChange={(e) => handleInputChange("model", "prenom", e.target.value)}
                    
                        placeholder="prénom" style={styles.input} />
                      </div>
                      <div style={styles.formGroup}>
                        <label>pseudo :</label>
                        <input type="text"
                          onChange={(e) => handleInputChange("model", "pseudo", e.target.value)}
                    
                        placeholder="pseudo " style={styles.input} />
                      </div>
                      <div style={styles.formGroup}>
          <label>Téléphone : </label>
          <PhoneInput
                                     className="input_value"
                                                                              id="phone_a"
                                                                                          defaultCountry="tg"
                                                                                          name="phone_a"
                                                                                          value={phone_a}
                 onChange={(phone_a) => setPhone_a(phone_a)}
         />
                        
        </div>

        <div style={styles.formGroup}>
          <label>Whatsapp : </label>
         <PhoneInput
                                       className="input_value"
                                                                          id="phone_b"
                                                                                         defaultCountry="tg"
                                                                                         name="phone_b"
                                                                                         value={phone_b}
                                                                                         onChange={(phone_b) => setPhone_b(phone_b)}
                                                                                       />
        </div>

        <div style={styles.formGroup}>
          <label>Email :</label>
          <input
            type="email"
            // value={email}
            onChange={(e) => handleInputChange("model", "email", e.target.value)}
                    
            // onChange={(e) => setEmail(e.target.value)}
            placeholder="votre email"
            style={styles.input}
          />
        </div>
              <Locations
                  inputdata ={{ 
                    pays_name : 'pays_b',
                    ville_name: 'ville_b',
                    quartier_name: 'quartier_b'
                  }} 
                    onChange={handleLocationChange_A}
                                                                                                                                              
             />
               <div style={styles.formGroup}>
          <label>Indication du lieu :</label>
          <input
            type="text"
            onChange={(e) => handleInputChange("model", "indication_adr", e.target.value)}
                    
            // value={localisation}
            // onChange={(e) => setLocalisation(e.target.value)}
            placeholder="Indication de l'emplacement de la boutique"
            style={styles.input}
          />
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

     


                      <div style={styles.formGroup}>
                        <label style={styles.imageLabel}>
                              <span>catégories</span>
                              <CheckboxGroup
                    
                               options={collabs_categorie}
                               onSelectionChange={handleSelection_Change}
                             />
                        </label>
                     
                      </div>

                       {/* Champ "Nom de la boutique" visible uniquement si "boutique" est sélectionnée */}
      {isBoutiqueChecked && (
        <>

        <div style={styles.formGroup}>
          <label>Nom de la boutique :</label>
          <input
            type="text"
            value={nom_boutique}
            onChange={(e) => setNomBoutique(e.target.value)}
            placeholder="Nom de la boutique"
            style={styles.input}
            autoComplete="off"
          />
        </div>

        <LocationsB
                  inputdata ={{ 
                                 pays_name : 'pays',
                                 ville_name: 'ville',
                                 quartier_name: 'quartier'
                  }} 
                    onChange={handleLocationChange}
                                                                                    
                                                                              
             />


        

        <div style={styles.formGroup}>
          <label>Indication du lieu :</label>
          <input
            type="text"
            value={localisation}
            onChange={(e) => setLocalisation(e.target.value)}
            placeholder="Indication de l'emplacement de la boutique"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Téléphone de la boutique : </label>
          <PhoneInput
                                     className="input_value"
                                                                              id="phone1"
                                                                                          defaultCountry="tg"
                                                                                          name="phone1"
                                                                                          value={phone1}
                                                                                          onChange={(phone1) => setPhone1(phone1)}
                                                                                        />
                        
        </div>

        <div style={styles.formGroup}>
          <label>Whatsapp de la boutique : </label>
         <PhoneInput
                                       className="input_value"
                                                                          id="phone2"
                                                                                         defaultCountry="tg"
                                                                                         name="phone2"
                                                                                         value={phone2}
                                                                                         onChange={(phone2) => setPhone2(phone2)}
                                                                                       />
        </div>

        <div style={styles.formGroup}>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email de la boutique"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
                        <label style={styles.imageLabel}>
                          {/* Zone de prévisualisation de l'image */}
                          {imagePreviewBoutique ? (
                            <img
                              src={imagePreviewBoutique}
                              alt="Prévisualisation"
                              style={styles.imagePreview}
                            />
                          ) : (
                            <span> + image de la boutique </span>
                          )} 
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChangeBoutique}
                            style={styles.fileInput}
                          />
                        </label>
                      </div>


        </>
      
        
        
      )}
                     

                      {/* <div style={styles.formGroup}>
                        <label>Description :</label>
                        <textarea placeholder="Entrer une description" style={styles.textarea}></textarea>
                      </div> */}
                      <div className="text-center">
                      <button type="submit" style={styles.submitButton}>Enregistrer</button>
                  
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
        <div className="modal" >
              <div style={styles.modalContent}>
      <button className="close_btn" onClick={closeUpdateModal}> X </button>
          <h3>Modifier le collab</h3>
           {/* Formulaire */}
           <form onSubmit={handleUpdate} className="over_scroll">
                      
                      <div style={styles.formGroup}>
                        <label>Nom :</label>
                        <input type="text"
                          value={formData?.model?.nom || ''}
                          onChange={(e) => handleInputChange("model", "nom", e.target.value)}
                        placeholder="nom" style={styles.input} />
                      </div>
                      <div style={styles.formGroup}>
                        <label>prenom :</label>

                        <input type="text"
                          //  value={dataToUpdate.prenom || ''}
                           value={formData?.model?.prenom || ''}
                          onChange={(e) => handleInputChange("model", "prenom", e.target.value)}
                    
                        placeholder="prénom" style={styles.input} />
                      </div>
                      <div style={styles.formGroup}>
                        <label>pseudo :</label>
                        <input type="text"
                         value={formData?.model?.pseudo || ''}
                         
                          //  value={dataToUpdate.pseudo || ''}
                          onChange={(e) => handleInputChange("model", "pseudo", e.target.value)}
                    
                        placeholder="pseudo " style={styles.input} />
                      </div>
                      <div style={styles.formGroup}>
          <label>Téléphone : </label>
          {/* <PhoneInput
                                     className="input_value"
                                   id="phone_a"
                                    defaultCountry="tg"
                                     name="phone_a"
                                   value={phone_a}
                 onChange={(phone_a) => setPhone_a(phone_a)}
         />
          */}
          <PhoneInput  
    className="input_value"  
    id="phone_a"  
    // defaultCountry="tg"  
    name="phone_a"  
    defaultCountry={dataToUpdate ? getCountryFromPhone(dataToUpdate?.indicatif) : 'tg'}  // Utilisez une fonction pour récupérer le code ISO2 du pays
  
    value={phone_a || "+228" + "98212121"}  // Valeur par défaut avec l'indicatif et le numéro  
    defaultValue={"+228" + "98212121"}      // Valeur par défaut initiale  
    onChange={(phone_a) => setPhone_a(phone_a)}  
  /> 
                        
        </div>

        <div style={styles.formGroup}>
          <label>Whatsapp : </label>
         <PhoneInput
                                       className="input_value"
                                                                          id="phone_b"
                                                                                        //  defaultCountry="tg"
                                                                                        defaultCountry={dataToUpdate ? getCountryFromPhone(dataToUpdate?.indicatif_2) : 'gh'}  // Utilisez une fonction pour récupérer le code ISO2 du pays
  
                                                                                         name="phone_b"
                                                                                         value={phone_b}
                                                                                         onChange={(phone_b) => setPhone_b(phone_b)}
                                                                                       />
        </div>

        <div style={styles.formGroup}>
          <label>Email :</label>
          <input
            type="email"
            // value={dataToUpdate?.adresse_email}
            value={formData?.model?.email || ''}
                        
            onChange={(e) => handleInputChange("model", "email", e.target.value)}
                    
            // onChange={(e) => setEmail(e.target.value)}
            placeholder="votre email"
            style={styles.input}
          />
        </div>
        <Locations
                  inputdata ={{ 
                    pays_name : locationDataA?.pays,
                    ville_name: locationDataA?.ville,
                    quartier_name: locationDataA?.quartier
                  }} 
                    onChange={handleLocationChange_A}
                                                                                    
                                                                              
             />
               <div style={styles.formGroup}>
          <label>Indication du lieu :</label>
          <input
            type="text"
            onChange={(e) => handleInputChange("model", "indication_adr", e.target.value)}
            value={formData?.model?.indication_adr || ''}
          
            // value={dataToUpdate?.indication}
            // onChange={(e) => setLocalisation(e.target.value)}
            placeholder="Indication de l'emplacement de la boutique"
            style={styles.input}
          />
        </div>
                     
     


                     
                       {/* Champ "Nom de la boutique" visible uniquement si "boutique" est sélectionnée */}
      {isBoutiqueChecked && (
        <>

        <div style={styles.formGroup}>
          <label>Nom de la boutique :</label>
          <input
            type="text"
            value={nom_boutique}
            onChange={(e) => setNomBoutique(e.target.value)}
            placeholder="Nom de la boutique"
            style={styles.input}
            autoComplete="off"
          />
        </div>

        <LocationsB
                  inputdata ={{ 
                                 pays_name : 'pays',
                                 ville_name: 'ville',
                                 quartier_name: 'quartier'
                  }} 
                    onChange={handleLocationChange}
                                                                                    
                                                                              
             />


        

        <div style={styles.formGroup}>
          <label>Indication du lieu :</label>
          <input
            type="text"
            value={localisation}
            onChange={(e) => setLocalisation(e.target.value)}
            placeholder="Indication de l'emplacement de la boutique"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Téléphone de la boutique : </label>
          <PhoneInput
                                     className="input_value"
                                                                              id="phone1"
                                                                                          defaultCountry="tg"
                                                                                          name="phone1"
                                                                                          value={phone1}
                                                                                          onChange={(phone1) => setPhone1(phone1)}
                                                                                        />
                        
        </div>

        <div style={styles.formGroup}>
          <label>Whatsapp de la boutique : </label>
         <PhoneInput
                                       className="input_value"
                                                                          id="phone2"
                                                                                         defaultCountry="tg"
                                                                                         name="phone2"
                                                                                         value={phone2}
                                                                                         onChange={(phone2) => setPhone2(phone2)}
                                                                                       />
        </div>

        <div style={styles.formGroup}>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email de la boutique"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
                        <label style={styles.imageLabel}>
                          {/* Zone de prévisualisation de l'image */}
                          {imagePreviewBoutique ? (
                            <img
                              src={imagePreviewBoutique}
                              alt="Prévisualisation"
                              style={styles.imagePreview}
                            />
                          ) : (
                            <span> + image de la boutique </span>
                          )} 
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChangeBoutique}
                            style={styles.fileInput}
                          />
                        </label>
                      </div>


        </>
      
        
        
      )}
                     

                      {/* <div style={styles.formGroup}>
                        <label>Description :</label>
                        <textarea placeholder="Entrer une description" style={styles.textarea}></textarea>
                      </div> */}
                      <div className="text-center">
                      <button type="submit" style={styles.submitButton}>Enregistrer</button>
                  
                      </div>
           </form>
        </div>
        </div>
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
    zIndex: 9999,
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

export default Collabs_Mgt;

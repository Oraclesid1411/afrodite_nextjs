import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect ,useRef  } from "react"; 
// import Header_banner from '../Components/Header_banner';   
import { FaChevronLeft, FaChevronRight, FaChevronDown } from 'react-icons/fa';

// import Locations from '../../Components/Locations.jsx';
import { useAuth } from "../Context/AuthenticateContext.jsx";
import face_image from  "/assets/icone_person/face.webp";

import plain_pied_image from  "/assets/icone_person/pp.webp";

import profil_image from  "/assets/icone_person/profil.webp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faCamera,faCheckDouble, faImage,faRepeat, faPlus, faTimes, faEdit, faTrash, faKitchenSet } from '@fortawesome/free-solid-svg-icons'

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faXTwitter, faFacebook, faLinkedin, faYoutube, faWhatsapp, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';

import imageCompression from 'browser-image-compression';

import moment from 'moment';
import requestPermission from '../sevices/NotificationService.js';

import {
  faInstagram,
  faFacebook,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import parsePhoneNumber from "libphonenumber-js";
import { motion } from "framer-motion";
import Locations from "./Locations.jsx";

const ModalForm = ({ data ,isOpen,form_type, onClose,category, handlePhoneChange,  isSubmitting }) => {
 
    const navigate = useNavigate();
    const location = useLocation();
    const apiUrl = "https://apiafro.aafrodites.com";
    

    const auth = useAuth(); 
    const user_info = auth.currentUser ;
    const [selectedTypes, setSelectedTypes] = useState({});
   // const [selectedTypes, setSelectedTypes] = useState({
//     mannequin: false,
//     hotesse: false,
//     influenceur: false,
//   });
    // const [openAccordion, setOpenAccordion] = useState(null);
      // Ouvre l'accordéon correspondant à la catégorie dès l'ouverture du modal
//   useEffect(() => {
//     if (isOpen && category) {
//       setOpenAccordion(category);
//     }
//   }, [isOpen, category]);

console.log("data")
console.log(data)
useEffect(() => {
    if (isOpen && category) {
      setSelectedTypes({ [category]: true });
    //   modifier la valeur dans etat de la candidature

     // Mettre à jour etat_candidature dans la catégorie sélectionnée
     setFormData((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          etat_candidature: true, // Mettre à jour l'état de la candidature
        },
      }));
    }
  }, [isOpen, category]);

  const [formData, setFormData] = useState({
    postulant: {
      nom: "",
      prenom: "",
      pseudo: "",
      date_naissance: "",
      age: "",
      nationalite: "",
      pays: "",
      ville: "",
      indication: "",
      indicatif_phone: "",
      telephone: "",
      indicatif_whatsapp: "",
      whatsapp: "", 
       indicatif_telegram: "",
       telegram: "",
      email: "",
      disponible: "",
      disponibilites: "",
      soirsWeekends: "",
      experience: "",
      pathimage_face : "",
      pathimage_profil : "",
      pathmage_plainpied : "",
     
    }
    ,
    mannequin: {
      // postuler: 0,
      etat_candidature: false,
      taille: "",
      tatouagePiercing: null,
      old_mannequin: null,
      // poids: "",
      // tourPoitrine: "",
      // tourTaille: "",
      // tourHanches: "",
      // pointure: "",
      // couleurYeux: "",
      // couleurCheveux: "",
      // typeCheveux: "",
      // teint: "",
      // particularites: "",
      // experience: "",
      // formationPose: "",
      // langues: "",
      photos: null,
      videoPresentation: null,
      reseauxSociaux: "",
       
    },
   
    hotesse: {
      etat_candidature: false,
      taille: "",
      couleurCheveux: "",
      couleurYeux: "",
      poids: "",
      uniforme: "",
      dernierDiplome: "",
      formationAccueil: "",
      langues: "",
      outilsInformatique: "",
      experiences: "",
      qualites: "",
      motivation: "",
      stress: "",
      photoRecente: null,
      cv: null,
      oldhotesse: null,
      lettreMotivation: null,
      certificats: null,
     
    },
    influenceur: {
      etat_candidature: false,
      oldinfluenceur : null,
      instagram: {
        lien: "",
        abonnés: "",
        tauxEngagement: "",
      },
      tiktok: {
        lien: "",
        abonnés: "",
        tauxEngagement: "",
      },
      youtube: {
        lien: "",
        abonnés: "",
        tauxEngagement: "",
      },
      facebook: {
        lien: "",
        abonnés: "",
        tauxEngagement: "",
      },
      // autresReseaux: "",
      style: "",
      specialisation: "",
      collaborations: "",
      audience: "",
      meilleursPosts: "",
      videoPresentation: "",
      statistiques: "",
      motivation: "",
      disponibiliteCollaboration: "",
    },
  });
  const handleCheckboxChangeAccordion = (type) => {
    setSelectedTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));

    console.log("type")
    console.log(type)
    setFormData((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          etat_candidature: true, // Mettre à jour l'état de la candidature
        },
      }));
  };
  const handleInputChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };
    console.log("form_type")
    console.log(form_type)


    
  useEffect(() => {
    if (data) {
        const formatDate = (dateString) => {
            if (!dateString) return "";
            const date = new Date(dateString);
            return date.toLocaleDateString("fr-FR"); // Format jj/mm/aaaa
          };
    
        

        const formattedPhone = data.indicatif && data.num_tel ? `${data.indicatif}${data.num_tel}` : "";
        const formattedPhone_whatsapp = data.indicatif_whatsapp && data.whatsapp ? `${data.indicatif_whatsapp}${data.whatsapp}` : "";
        const formattedPhone_telegram = data.indicatif_telegram && data.telegram ? `${data.indicatif_telegram}${data.telegram}` : "";
  
  
      
      setFormData((prevState) => ({
        ...prevState,
        postulant: {
          ...prevState.postulant,
          nom: data.nom || "",
          prenom: data.prenom || "",
          pseudo: data.pseudo || "",
          date_naissance: formatDate(data.date_naissance) || "",
          age: data.age || "",
          nationalite: data.nationalite || "",
          pays: data.pays || "",
          ville: data.ville || "",
          indication: data.indication || "",
          indicatif_phone: data.indicatif || "",
          telephone: data.num_tel || "",
          taille: data.taille && data.taille !== "" ? data.taille : "1.00",
        //   taille:  data.taille || "",
          indicatif_whatsapp: data.indicatif_whatsapp || "",
          whatsapp: data.whatsapp || "", 
          indicatif_telegram: data.indicatif_telegram || "",
          telegram: data.telegram || "",
          email: data.adresse_email || "",
          disponible: data.disponible || "",
          disponibilites: data.disponibilites || "",
          soirsWeekends: data.soirsWeekends || "",
          experience: data.experience || "",
          pathimage_face: data.pathimage_face || "",
          pathmage_plainpied: data.pathmage_plainpied || "",
          pathimage_profil: data.pathimage_autre_1 || "",
        },
        mannequin: {
          ...prevState.mannequin,
          taille: data.taille || "",
          poids: data.poids || "",
        },
        hotesse: {
          ...prevState.hotesse,
          taille: data.taille || "",
          poids: data.poids || "",
        },
        influenceur: {
          ...prevState.influenceur,
          instagram: {
            ...prevState.influenceur.instagram,
            lien: data.instagram || "",
            abonnés: data.followers_instagram || "",
          },
          tiktok: {
            ...prevState.influenceur.tiktok,
            lien: data.tiktok || "",
            abonnés: data.followers_tiktok || "",
          },
          youtube: {
            ...prevState.influenceur.youtube,
            lien: data.youtube || "",
            abonnés: data.followers_youtube || "",
          },
          facebook: {
            ...prevState.influenceur.facebook,
            lien: data.facebook || "",
            abonnés: data.followers_facebook || "",
          },
        },
      }));

      setPhone1(formattedPhone); // Mise à jour du champ téléphone
      setPhone2(formattedPhone_whatsapp); // Mise à jour du champ téléphone
      setPhone3(formattedPhone_telegram); // Mise à jour du champ téléphone
    }
  }, [data]);
  

      useEffect(() => {
 
      const userid = user_info?.id;
        const params = { userid };
    
        const fetchData = async () => {
          try {
              if (userid != undefined) {

               
                // récupérer les infos de postulant
  const dataPostulant = await axios.post(`${apiUrl}/postulant/etatcandidature`, params);
  console.log("dataPostulant")                  
  console.log(dataPostulant)
          if(dataPostulant.data.length > 0){
                 navigate("/etatcandidature"); // Redirection si aucune donnée
           
           }

                // return false;
             
            } 
            // setLoading(false);
          } catch (err) {
            console.error("Erreur lors de la récupération des données :", err);
            setLoading(false);
          }
        };
    
        fetchData();
      }, [user_info]);
const link_url = location?.pathname.split("/");
const categoryMap = {
  1: "mannequin",
  2: "hoteHotesse",
  3: "influenceur",
};

const [isModalOpen, setIsModalOpen] = useState(false);

 const [newuser, setNewUser] = useState(0);
      
       const [newuserdata, setNewUserData] = useState(0); 
    

  const [auth_Ids, setAuth_ids] = useState({
    auth: {
      pseudo: "",
      pass: "",
     
    }   }); 
  
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");
  
  const [taille_m, settaille_m] = useState("1");
  const [taille_cm, settaille_cm] = useState("00");

  const [add_img, setAddimg] = useState(0); 
  const [add_img_b , setAddimg_b] = useState(0); 


  // declaration des parametres pour les images
  const [upload_img, setUpload_img] = useState([]);   
  const [images_gallery_boxshow, setimages_gallery_boxshow] = useState(false);   
   
  
  // declaration des parametres pour les videos
  const [upload_video, setUpload_video] = useState(null);
  const [videos_gallery_boxshow, setVideos_gallery_boxshow] = useState(false);
  
  // options caméra
  const videoRef = useRef(null);
  const canvasRef = useRef(null); 
  
    // State pour gérer les images
    
  const [images, setImages] = useState([]);
  const [imagespath, setImagespath] = useState([]);
  
  const [video, setvideo] = useState([]);
        const zones = ["face", 
    
     "profile",
     "entier",
      // "buste",
      //  "pied", 
       ]
    const [imagesModels, setImagesModel] = useState({
      face: null,
      dos: null,
      profile: null,
      entier: null,
      buste: null,
      pied: null,
    }); // Stocke les images pour chaque zone
  const [currentZone, setCurrentZone] = useState(null); // Zone en cours d'édition
  
  const [dropdownZone, setDropdownZone] = useState(null); // Stocke la zone du dropdown
  const [longPressTimeout, setLongPressTimeout] = useState(null); // Gère le timer pour l'appui long
    
  // locations listes
  const [locationData, setLocationData] = useState({
    pays: '',
    ville: '',
    quartier: '',
  });

  // Gérer les changements de sélection

  const handleBackClick = () => {
    navigate(-1);  // Retourne à la page précédente  // Retourne à la page précédente
  };

  // const handleLocationChange = (data) => {
  //   setLocationData(data);
  //   console.log('Valeurs sélectionnées:', data);
  // };

  const handleLocationChange = (data) => {
    setLocationData(data);
    setFormData((prevFormData) => ({
      ...prevFormData,
      postulant: {
        ...prevFormData.postulant,
        pays: data.pays || "",
        ville: data.ville || "",
      },
    }));
  
    console.log("Valeurs sélectionnées:", data);
  };

  const handleCountrySelect = (country) => {
    console.log("Pays sélectionné :", country);
  };
  

useEffect(() => {
  const category = categoryMap[link_url[2]];
  if (category) {
    setSelectedTypes((prevState) => ({
      ...prevState,
      [category]: true,
    }));
  }
}, []);

useEffect(() => {
  const fetchData = async () => {
    const category = parseInt(link_url[2], 10);
    const userid = 1; // Replace with actual user ID
    const params = { userid, categ: category };

    try {
      const response = await axios.post(`${apiUrl}/postulant/info`, params);
      if (response.data?.length > 0) {
        navigate("/etatcandidature");
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des données :", err);
    }
  };

  fetchData();
}, []);

const handleCheckboxChange = (type, field, value) => {
  setSelectedTypes((prevState) => ({
    ...prevState,
    [type]: !prevState[type],
  }));


  setFormData((prevFormData) => ({
    ...prevFormData,
    [type]: {
      ...prevFormData[type],
      etat_candidature: !selectedTypes[type], // Ajoute ou met à jour le champ
    },
  }));
};
const handleCheckboxChange_b = (type, field, value) => {
  setFormData((prevState) => ({
    ...prevState,
    [type]: {
      ...prevState[type],
      [field]: prevState[type][field] === value ? null : value, // Basculer entre la valeur sélectionnée et null
    },
  }));
};

  
  const [cameraActive, setCameraActive] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(true); // Exemple avec un hook d'état

  const [capturedImage, setCapturedImage] = useState(null);
    const [mediaStream, setMediaStream] = useState(null);
   
    // console.log(isFrontCamera)
  // Fonction pour démarrer la caméra
  const startCamera = async () => {
    
  // e.preventDefault(); // Empêche le comportement par défaut
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
      // setimages_gallery_boxshow(false);
      closeModal()
    } catch (error) {
      console.error("Erreur lors de l'accès à la caméra :", error);
    }
  };
  
  // Fonction pour arrêter la caméra
  const stopCamera = () => {
    
  // e.preventDefault(); // Empêche le comportement par défaut
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
      setCameraActive(false);
    }
  };

  
// Fonction pour capturer l'image
const captureImage = (e) => {
  e.preventDefault(); // Empêche le comportement par défaut

  if (canvasRef.current && videoRef.current) {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Convertir en base64
    const image = canvas.toDataURL("image/png");
    setCapturedImage(image);
    stopCamera(); // Stopper la caméra après capture
  }
};

// Fonction pour réinitialiser (reprendre la caméra)
const resetCapture = (e) => {
  // alert('reset')
  e.preventDefault(); // Empêche le comportement par défaut

  setCapturedImage(null);
  startCamera();
};

// Fonction pour passer à l'étape suivante
const proceed = (e) => {
  e.preventDefault(); // Empêche le comportement par défaut

  // console.log("Image capturée :", capturedImage);


  // alert("Image sauvegardée !");
  // Implémentez la logique pour l'étape suivante
  // setCapturedFiles(capturedImage)
  setCapturedImage(null);
  setCameraActive(false);

  setImagesModel((prev) => ({
    ...prev,
    [currentZone]:capturedImage, // Associe l'image choisie à la zone actuelle
  }));

  setImages((prev) => {
    // Copie l'état précédent pour modification
    const updatedImages = { ...prev };

    // Remplace uniquement le path de currentZone
  
// Vérifie si `path` existe déjà
if (updatedImages.path) {

// Vérifie si l'indice correspondant à la zone actuelle existe déjà
if (zones.indexOf(currentZone) < updatedImages.path.length) {
  // Remplace uniquement le path pour l'index correspondant
  updatedImages.path = updatedImages.path.map((imgPath, index) => {
    if (index === zones.indexOf(currentZone)) {
     
      return capturedImage; // Remplace par la nouvelle image
    }
    return imgPath; // Conserve les autres images
  });
} else {
  // Ajoute un nouveau path si l'indice n'existe pas encore
  console.log("Ajout d'un nouveau path pour currentZone:", currentZone);
  updatedImages.path[zones.indexOf(currentZone)] = capturedImage;
}
} else {
// Si `path` n'existe pas, initialise avec l'image actuelle
console.log("Initialisation de updatedImages.path avec la première image");
updatedImages.path = [];
updatedImages.path[zones.indexOf(currentZone)] = capturedImage;
}

    return updatedImages; // Retourne le tableau mis à jour
  });
};

  // Démarrage automatique de la caméra lorsque l'interface s'ouvre
  useEffect(() => {
    if (cameraActive) {
      startCamera();
    }

    // Arrêter la caméra lorsque l'interface est fermée
    return () => stopCamera();
  }, [cameraActive ]);

const closeModal = () => setAddimg(0);

const closeModal_notif = () => {
  navigate("/etatcandidature")
};
const Addimgs = (zone) => {

  // e.preventDefault(); // Empêche le comportement par défaut
  console.log(zone);
  
setCurrentZone(zone);
  setAddimg(1);
  // if(images_gallery_boxshow === true){
  //   setimages_gallery_boxshow(false)

  // }

};
const slidetozone = (zone , e) => {

  console.log(zone);
  e.preventDefault(); // Empêche le comportement par défaut


};
const compressImage = async (file, maxWidth, maxHeight) => {
  const options = {
    maxWidthOrHeight: Math.max(maxWidth, maxHeight),
    useWebWorker: true,
  };
  return await imageCompression(file, options);
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
 const next_option = async () => {
  
  //  const formData_b = new FormData();
console.log('next')
setimages_gallery_boxshow(false)

console.log("images")
console.log(images)
if (!images?.path || images.path.length === 0) {
console.error("Aucune image à télécharger");
return;
}

const formData = new FormData();
const tab_file = [];
// Parcourir toutes les images
for (let index = 0; index < images.path.length; index++) {
const base64Image = images.path[index];
const originalFileName = `image-${index + 1}.jpeg`;

// Ajouter un timestamp pour rendre le nom unique
const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
const uniqueFileName = `${originalFileName.split(".")[0]}_${timestamp}.jpeg`;

try {
  // Convertir l'image Base64 en fichier
  const file = base64ToFile(base64Image, uniqueFileName);
  // console.log(file)
  tab_file.push(file)
  if (file.size > 350000) {
    // Compresser les images avec des tailles max spécifiques
    const [desktopImage] = await Promise.all([
      compressImage(file, 1920, 1080), // Desktop haute qualité
     ]);

    formData.append("files", desktopImage, uniqueFileName); // Original
     } else {

    
    
    // Ne pas compresser si la taille est déjà inférieure à 500 Ko
    formData.append("files", file, uniqueFileName); // Original
   
    // formData.append("files", file, `${uniqueFileName}_thumbnail_desktop`);
    // formData.append("files", file, `${uniqueFileName}_thumbnail_mobile`);
  }

} catch (compressionError) {
  console.error(`Erreur lors de la compression de l'image ${uniqueFileName} :`, compressionError);
  continue; // Continuer avec les autres images même en cas d'erreur
}
}

// images?.path.forEach((file) => formData_b.append('images', file));

      // console.log(tab_file)

      // return false;
      try {
        const response = await axios.post(`${apiUrl}/uploadfiles/savefiles_postulant`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Important
          },
          withCredentials: true, // Si nécessaire
        });
        console.log("response.data");
        console.log(response.data);
        setImagespath(response.data?.files)
        return response.data?.files;
      } catch (error) {
        console.error("Erreur lors de l'upload :", error.response?.data || error.message);
      }

 };
const cancel_action  = async () => {
  
  //  const formData_b = new FormData();
console.log('next')
setimages_gallery_boxshow(false)

console.log(images) 
};
// Gérer l'import depuis la galerie
const handleFileInput = (e) => {
  
  e.preventDefault(); // Empêche le comportement par défaut
  const file = e.target.files[0];
  if (file) {

   
    console.log("imagesModels")
    console.log(imagesModels)
  
    const reader = new FileReader();
    reader.onload = () => {
      const newImagePath = reader.result; // Le path de la nouvelle image
      setImagesModel((prev) => ({
        ...prev,
        [currentZone]: reader.result, // Associe l'image choisie à la zone actuelle
      }));
        // Mise à jour de l'image dans le tableau images (remplacement)
    setImages((prev) => {
      // Copie l'état précédent pour modification
      const updatedImages = { ...prev };

      // Remplace uniquement le path de currentZone
    
// Vérifie si `path` existe déjà
if (updatedImages.path) {
  console.log("updatedImages.path avant modification:", updatedImages.path);

  // Vérifie si l'indice correspondant à la zone actuelle existe déjà
  if (zones.indexOf(currentZone) < updatedImages.path.length) {
    // Remplace uniquement le path pour l'index correspondant
    updatedImages.path = updatedImages.path.map((imgPath, index) => {
      if (index === zones.indexOf(currentZone)) {
        console.log('les indexes')
        console.log(index)
        console.log(zones.indexOf(currentZone))
        console.log('les indexes')
     
        console.log("Remplacement du path pour currentZone:", currentZone);
        return newImagePath; // Remplace par la nouvelle image
      }
      return imgPath; // Conserve les autres images
    });
  } else {
    // Ajoute un nouveau path si l'indice n'existe pas encore
    console.log("Ajout d'un nouveau path pour currentZone:", currentZone);
    updatedImages.path[zones.indexOf(currentZone)] = newImagePath;
  }
} else {
  // Si `path` n'existe pas, initialise avec l'image actuelle
  console.log("Initialisation de updatedImages.path avec la première image");
  updatedImages.path = [];
  updatedImages.path[zones.indexOf(currentZone)] = newImagePath;
}

      return updatedImages; // Retourne le tableau mis à jour
    });
   
      // setImages((prev) => ({
      //   ...prev,
      //   path: [...(prev.path || []), reader.result], // Ajoute l'image à la liste des images sans écraser les anciennes
      // }));
    };
    reader.readAsDataURL(file);
  }
  closeModal();
};

const switchCamera = () => {
  // stopCamera();
  setIsFrontCamera((prev) => !prev);
  setTimeout(() => startCamera(), 500); // Relancer la caméra après basculement
};

// Fonction pour modifier une image
const EditImage = (zone) => {
console.log(event)
  // e.preventDefault(); // Empêche le comportement par défaut

  console.log(zone)
  setCurrentZone(zone);
  setAddimg(1);
 
};

// Fonction pour supprimer une image
const DeleteImage = (zone) => {

  // e.preventDefault(); // Empêche le comportement par défaut
  // Vérifie si la zone existe dans `imagesModels`
  setImagesModel((prev) => {
    const updatedModels = { ...prev };
    delete updatedModels[zone]; // Supprime l'entrée pour la zone
    return updatedModels;
  });

  // Mise à jour de `images`
  setImages((prev) => {
    const updatedImages = { ...prev };

    if (updatedImages.path) {
      console.log("Images avant suppression :", updatedImages.path);

      // Supprime l'image associée à l'indice de la zone actuelle
      const zoneIndex = zones.indexOf(zone);

      if (zoneIndex > -1 && zoneIndex < updatedImages.path.length) {
        updatedImages.path = updatedImages.path.filter(
          (_, index) => index !== zoneIndex
        );
      }

      console.log("Images après suppression :", updatedImages.path);
    }

    return updatedImages;
  });
};

const handleLongPressStart = (zone) => {

  // e.preventDefault(); // Empêche le comportement par défaut
 
  const timeout = setTimeout(() => {
    setDropdownZone(zone); // Affiche le dropdown après une seconde
  }, 1000); // 1 seconde
  setLongPressTimeout(timeout);
};

const handleLongPressEnd = () => {

  // e.preventDefault(); // Empêche le comportement par défaut
  clearTimeout(longPressTimeout); // Annule si le bouton est relâché avant 1 seconde
};

const handleDropdownAction = (action, zone) => {

  // e.preventDefault(); // Empêche le comportement par défaut
  if (action === "edit") {
    EditImage(zone);
  } else if (action === "delete") {
    DeleteImage(zone);
  }
  setDropdownZone(null); // Ferme le dropdown
};


const handleTailleChange = (field, value) => {
    let newTaille_m = field === "m" ? value : taille_m;
    let newTaille_cm = field === "cm" ? value : taille_cm;
  
    // Si la taille devient vide, elle revient à "1.00"
    if (!newTaille_m || newTaille_m === "") newTaille_m = "1";
    if (!newTaille_cm || newTaille_cm === "") newTaille_cm = "00";
  
    settaille_m(newTaille_m);
    settaille_cm(newTaille_cm);
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      mannequin: {
        ...prevFormData.mannequin,
        taille: `${newTaille_m}.${newTaille_cm}`,
      },
      hotesse: {
        ...prevFormData.hotesse,
        taille: `${newTaille_m}.${newTaille_cm}`,
      },
    }));
  };
 
    if (!isOpen) return null; // Cache la modal si elle n'est pas ouverte

    
      const renderForm = (type) => {
        switch (type) {
          case "mannequin":
            return (
               <form>
               
               <label
               className="input_label"
               >
                   <span>
                       déja mannequin?
                 </span>
                 <div className="float_data">
                 <label className="option_data">
                <input
                  type="checkbox"
                  checked={formData.mannequin.old_mannequin === "Oui"}
                  onChange={() => handleCheckboxChange_b("mannequin", "old_mannequin", "Oui")}
                />
                Oui
              </label>
              <label className="option_data">
                <input
                  type="checkbox"
                  checked={formData.mannequin.old_mannequin === "Non"}
                  onChange={() => handleCheckboxChange_b("mannequin", "old_mannequin", "Non")}
                />
                Non
              </label>
    
                 </div>
              
               </label>
               
              </form>
            );
          case "hotesse":
            return (
              <form>
                 <div className="mb-4">
                
                <label
               className="input_label"
               >
                   <span>
                      déja hôtesse
                 </span>
                 <div className="float_data">
                 <label className="option_data">
                <input
                  type="checkbox"
                  checked={formData.hotesse.oldhotesse === "Oui"}
                  onChange={() => handleCheckboxChange_b("hotesse", "oldhotesse", "Oui")}
                />
                Oui
              </label>
              <label className="option_data">
                <input
                  type="checkbox"
                  checked={formData.hotesse.oldhotesse === "Non"}
                  onChange={() => handleCheckboxChange_b("hotesse", "oldhotesse", "Non")}
                />
                Non
              </label>
    
                 </div>
              
               </label>
    
                </div>
               
                
               
              </form>
            );
          case "influenceur":
            return (
              <form>
                 <label
               className="input_label"
               >
                   <span>
                      déja vlogueuse?
                 </span>
                 <div className="float_data">
                 <label className="option_data">
                <input
                  type="checkbox"
                  checked={formData.influenceur.oldinfluenceur === "Oui"}
                  onChange={() => handleCheckboxChange_b("influenceur", "oldinfluenceur", "Oui")}
                />
                Oui
              </label>
              <label className="option_data">
                <input
                  type="checkbox"
                  checked={formData.influenceur.oldinfluenceur === "Non"}
                  onChange={() => handleCheckboxChange_b("influenceur", "oldinfluenceur", "Non")}
                />
                Non
              </label>
    
                 </div>
              
               </label>
              <div className="mb-4 input_group">
    
                
              <label
               className="input_label"
               >
                   <span>
                   {/* <label className="block mb-2 flex items-center"> */}
                  <FontAwesomeIcon icon={faInstagram} className="text-pink-500 mr-3" />
                  Instagram
                {/* </label> */}
                 </span>
                 <div className="float_data">
    
                 <input
                  type="url"
                    className="input_value"
                  placeholder="Lien Instagram"
                  value={formData.influenceur.instagram.lien}
                  onChange={(e) =>
                    handleInputChange("influenceur", "instagram", {
                      ...formData.influenceur.instagram,
                      lien: e.target.value,
                    })
                  }
                  // className="w-full border p-2 rounded"
                />
    
             </div>
              
                 {/* <label className="float_msg"> (optionnel)</label> */}
             </label>
             <label
               className="input_label"
               >
                   <span>
                 nbr. abonnés
                 </span>
                 <div className="float_data">
    
                 <input
                  type="number"
                  placeholder="Nombre d'abonnés Instagram"
                  value={formData.influenceur.instagram.abonnés}
                  onChange={(e) =>
                    handleInputChange("influenceur", "instagram", {
                      ...formData.influenceur.instagram,
                      abonnés: e.target.value,
                    })
                  }
                   className="input_value"
                />
    
                </div>
              
                 {/* <label className="float_msg"> (optionnel)</label> */}
             </label>
               
              
               
              </div>
        
              <div className="mb-4 input_group">
              <label
               className="input_label"
               >
                   <span>
                   <FontAwesomeIcon icon={faFacebook} className="text-blue-500 mr-2" />
                  Facebook
                 </span>
                 <div className="float_data">
    
                 <input
                     className="input_value"
                     type="url"
                     placeholder="Lien Facebook"
                     value={formData.influenceur.facebook.lien}
                     onChange={(e) =>
                       handleInputChange("influenceur", "facebook", {
                         ...formData.influenceur.facebook,
                         lien: e.target.value,
                       })
                     }
                />
    
             </div>
              
                 {/* <label className="float_msg"> (optionnel)</label> */}
             </label>
             <label
               className="input_label"
               >
                   <span>
                 nbr. abonnés
                 </span>
                 <div className="float_data">
    
                 <input
                 type="number"
                 placeholder="Nombre d'abonnés Facebook"
                 value={formData.influenceur.facebook.abonnés}
                 onChange={(e) =>
                   handleInputChange("influenceur", "facebook", {
                     ...formData.influenceur.facebook,
                     abonnés: e.target.value,
                   })
                 }
                   className="input_value"
                />
    
                </div>
              
                 {/* <label className="float_msg"> (optionnel)</label> */}
             </label>
               
              
               
              </div>
             
        
              <div className="mb-4 input_group">
              <label
               className="input_label"
               >
                   <span>
                   <FontAwesomeIcon icon={faYoutube} className="text-red-500 mr-2" />
                  YouTube
                 </span>
                 <div className="float_data">
    
                 <input
                  
                    className="input_value"
                    type="url"
                    placeholder="Lien YouTube"
                    value={formData.influenceur.youtube.lien}
                    onChange={(e) =>
                      handleInputChange("influenceur", "youtube", {
                        ...formData.influenceur.youtube,
                        lien: e.target.value,
                      })
                    }
                  // className="w-full border p-2 rounded"
                />
    
             </div>
              
                 {/* <label className="float_msg"> (optionnel)</label> */}
             </label>
             <label
               className="input_label"
               >
                   <span>
                 nbr. abonnés
                 </span>
                 <div className="float_data">
    
                 <input
                   type="number"
                   placeholder="Nombre d'abonnés YouTube"
                   value={formData.influenceur.youtube.abonnés}
                   onChange={(e) =>
                     handleInputChange("influenceur", "youtube", {
                       ...formData.influenceur.youtube,
                       abonnés: e.target.value,
                     })
                   }
                   className="input_value"
                />
    
                </div>
              
                 {/* <label className="float_msg"> (optionnel)</label> */}
             </label>
               
              
               
              </div>
              
        
              <div className="mb-4 input_group">
              <label
               className="input_label"
               >
                   <span>
                   <FontAwesomeIcon icon={faTiktok} className="text-black mr-2" />
                   TikTok
                 </span>
                 <div className="float_data">
    
                 <input
                 
                    className="input_value"
                    type="url"
                    placeholder="Lien TikTok"
                    value={formData.influenceur.tiktok.lien}
                    onChange={(e) =>
                      handleInputChange("influenceur", "tiktok", {
                        ...formData.influenceur.tiktok,
                        lien: e.target.value,
                      })
                    }
                />
    
             </div>
              
                 {/* <label className="float_msg"> (optionnel)</label> */}
             </label>
             <label
               className="input_label"
               >
                   <span>
                 nbr. abonnés
                 </span>
                 <div className="float_data">
    
                 <input
                  type="number"
                  placeholder="Nombre d'abonnés TikTok"
                  value={formData.influenceur.tiktok.abonnés}
                  onChange={(e) =>
                    handleInputChange("influenceur", "tiktok", {
                      ...formData.influenceur.tiktok,
                      abonnés: e.target.value,
                    })
                  }
                   className="input_value"
                />
    
                </div>
              
                 {/* <label className="float_msg"> (optionnel)</label> */}
             </label>
               
              
               
              </div>
             
            </form>
            );
          default:
            return null;
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(data?.postulant_id)
        console.log(form_type);
        console.log(formData);
// return false;

        var hotesse = [] , mannequin = [] , influenceur = [];
     
        const data_postulant = {
          data : formData?.postulant
        
        }
    
        if(formData?.influenceur?.etat_candidature){
          // console.log("role model")
          influenceur = {
            fonction: "on",
            data : formData?.influenceur
          }
        }
    
        if(formData?.mannequin?.etat_candidature){
          
            mannequin = {
            fonction: "on",
            data : formData?.mannequin,
            // experimented : experiencedstate,
          }
        }
        if(formData?.hotesse?.etat_candidature){
         
            hotesse = {
            fonction: "on",
            data : formData?.hotesse
          }
        }
    
        const param = {
              postuland_id : data?.postulant_id,
              data_postulant, 
              formattedDate, 
              influenceur ,
              mannequin ,
              hotesse }
 
        console.log("param")
        console.log(param)
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
        // return false;
        try {
            await axios
              .post(`${apiUrl}/postulant/add_devenir_afrodite`,
                param
                )
              .then((result) => {
          
              console.log("result.data")
                console.log(result)
               
                  // Vérifie si la requête a réussi avant de recharger
    if (result && result.status === 200) {
        window.location.reload();
    }
                // return false;
             
                //   if(result){
                //     setTimeout(() => {
                    
                //       toast.success('candidature soumis avec succès' , {
                //         position: "top-center",
                //         autoClose: 3000,
                //         hideProgressBar: true,
                //         closeOnClick: true,
                //         pauseOnHover: true,
                //         draggable: true,
                //         progress: undefined,
                //         theme: "light",
                //         // transition: Bounce,
                //     });
                      
  
                //       // affciher une notif
                //       setIsNotification(true)
                //       if(result.data?.user != null && result.data?.token != null){
                //         // Sauvegarder les données du user dans le localStorage
                //         const   user   = result.data?.user; // Assurez-vous que `response.data.user` contient l'ID, le pseudo et le password
                //         const  token = result.data?.token; // Assurez-vous que `response.data.user` contient l'ID, le pseudo et le password
                       
                //         console.log("result.data")
                //         console.log(token)
                //         console.log(user)
                //         setNewUserData([user , result.data?.pass])
                //          auth.saveToLocalStorage(user ,token);
                //       setNewUser(1)
                //         // console.log(auth)
                //         // localStorage.setItem("site", token);
                //         // localStorage.setItem("user", JSON.stringify(user));
                //     }
                      
  
                //     // arreter le loader
  
                //     // afficher le recap
                //   }, 3500); // Délai de 3 secondes
  
                  
        
                //   }
                }); 
                
          } catch (err) {
            console.log("erreur");
            // setError(err.response.data);
          }
        // setIsModalOpen(false); // Fermer la modal après soumission
      };
    
  return (
    <div className="fixed_form inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-lg relative">
        
        {/* Bouton de fermeture */}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
          ✖
        </button>

        <div className="container form_bg pt-3 mx-auto p-4">
          <button onClick={onClose} className='back_cmoponent'>
            <FaChevronLeft size={20} />
          </button>

          <form autoComplete='off' className='candidature_form' style={{ maxWidth: "600px", margin: "auto" }}>
   
   <div className="mb-6 border rounded px-0">
     
    
       <div className="tab-content text-center">
    

      <div className="input_group">

       <div className="line_data">
       <div className="half_col">
         

         <input className="input_value readonly" type="text"
         placeholder="votre nom"
         value={formData.postulant.nom}

         onChange={(e) => handleInputChange("postulant", "nom", e.target.value)}
       />
     
 </div>
     
        <div className="half_col">
        
           <input
       className="input_value readonly"
         type="text"
           placeholder="votre prénom"
         value={formData.postulant.prenom}
         onChange={(e) => handleInputChange("postulant", "prenom", e.target.value)}
       />
        
      
      
   
        </div>
       </div>
     
       <div className="line_data">
       <div className="half_col">
       <input
className="input_value readonly"
type="text"
placeholder="Né(e) le jj/mm/aaaa"
value={formData.postulant.date_naissance}
onFocus={(e) => (e.target.type = "date")}
onBlur={(e) => (e.target.type = "text")}
onChange={(e) => handleInputChange("postulant", "date_naissance", e.target.value)}
/>

       {/* <input
       className="input_value"
        placeholder="né(e) le jj/mm/aaaa"
        type="date"
        value={formData.postulant.date_naissance}
        onChange={(e) => handleInputChange("postulant", "date_naissance", e.target.value)}
      /> */}
       
         
     
    </div>
     
        <div className="half_col">
        
        <PhoneInput

          className="phone_input readonly"
          id="phone1"
          autoComplete='off'
          defaultCountry="tg"
          name="phone1"
          value={phone1}
          onChange={(value) => handlePhoneChange(value, "phone")}
              
       />
      {/* <input
       className="input_value"
         type="text"
           placeholder="votre prénom"
         value={formData.postulant.prenom}
         onChange={(e) => handleInputChange("postulant", "prenom", e.target.value)}
       /> */}
        </div>
       </div>

       <div className="line_data">
       <div className="half_col">
         

       <PhoneInput
                     className="phone_input readonly"
                                                         id="phone2"
                                                         autoComplete='off'
                                                                        defaultCountry="tg"
                                                                        name="phone2"
                                                                        value={phone2}
                                                                       //  value={`${formData.postulant.indicatif_whatsapp} ${formData.postulant.whatsapp}`.trim()}
                                                                        onChange={(value) => handlePhoneChange(value, "whatsapp")}
                                                                   
                                                                       //  onChange={(phone2) => setPhone2(phone2)}
                                                                      />
       
         
     
      </div>
     
        <div className="half_col">
        
          <PhoneInput
                      className="phone_input readonly"
                                                         id="phone3"
                                                         autoComplete='off'
                                                                        defaultCountry="tg"
                                                                        name="phone3"
                                                                        value={phone3}
                                                                       //  value={`${formData.postulant.indicatif_whatsapp} ${formData.postulant.whatsapp}`.trim()}
                                                                        onChange={(value) => handlePhoneChange(value, "telegram")}
                                                                   
                                                                       //  onChange={(phone2) => setPhone2(phone2)}
         />
        </div>
       </div>

       <div className="line_data">
       <div className="half_col">
         

       <input
       className="input_value readonly"
     
        type="email"
        placeholder='votre adresse email'
        value={formData.postulant.email}
        onChange={(e) => handleInputChange("postulant", "email", e.target.value)}
      />
       
         
     
      </div>
     
        <div className="half_col">
        
        <div className="input-taille ">
         <div className="dim_zone">
         {/* <input type="number" id="taille_m"
             value={taille_m}
             // onChange={(e) => settaille_m(e.target.value)}
             onChange={(e) => handleTailleChange("m", e.target.value)}
              name="taille_m" min="0" max = "2" placeholder="m"
               required/> */}
               <input className="readonly" type="number" id="taille_m"
  value={taille_m}
  onChange={(e) => handleTailleChange("m", e.target.value)}
  name="taille_m" min="0" max="2" placeholder="m"
  required
  defaultValue="1"
/>
           <span className="readonly"> m </span>
         
         </div>
         <div className="dim_zone">
         {/* <input type="number" id="taille_cm"
             value={taille_cm}
             onChange={(e) => handleTailleChange("cm", e.target.value)}
             // onChange={(e) => settaille_cm(e.target.value)}
              name="taille_cm" min="0" max="99" placeholder="cm" required/> */}
              <input className="readonly" type="number" id="taille_cm"
  value={taille_cm}
  onChange={(e) => handleTailleChange("cm", e.target.value)}
  name="taille_cm" min="0" max="99" placeholder="cm"
  required
  defaultValue="00"
/>
           <span className="readonly"> cm </span>


         </div>
         
       </div>
        </div>
       </div>
   
       <div className="line_data locationbox">
    <Locations className="inline_zone readonly"
          inputdata ={{ 
                      
                         pays_name : 'pays',

                         ville_name: 'ville',
                        //  quartier_name: 'quartier'
          }} 
        //   className = "readonly"
      onChange={handleLocationChange}
                                                                            
                                                                      
     />
  </div>
    
  

       <div className="image_box">
         
                   {/* Zones de photos */}
                  
                   {(add_img === 1) &&
                     (
                       <>
                         <div
                           className="modal_overlay_img"
                           onClick={closeModal} // Ferme le modal si on clique à l'extérieur
                         >
                           <div
                       className="modal_content"
                       onClick={(e) => e.stopPropagation()} // Empêche la fermeture du modal si on clique à l'intérieur
                     >
                       <div className="option_image">
                         <div className="row">
                         <div className="col-lg-6 col-md-6 col-6 inline_box">
                             <div className="trusted-badge rounded p-0">
                             <label onClick={() => setCameraActive(true)}>
                               {/* <label
                                 onClick={(e) => {
                                   setShowCamera(true);
                                   e.stopPropagation(); // Évite la propagation non désirée
                                 }}
       
                               
                               data-box="camera_box"
                                 // onClick={Show_camerabox} data-box="camera_box"
                                 > */}
                                 <div className="trusted-icon">
                                   <FontAwesomeIcon size="sm" icon={faCamera} className="icon-trusted" />
                                 </div>
                                 <div className="trusted-content">
                                   <h2 className="heading_18 trusted-heading">Caméra</h2>
                                 </div>
                               </label>
                             </div>
                           </div>
                           <div className="col-lg-6 col-md-6 col-6 inline_box">
                             <div className="trusted-badge rounded p-0">
       
                               
                                       <label >
                                           <input
                                             type="file"
                                             accept="image/*"
                                             style={{ display: "none" }}
                                             onChange={handleFileInput}
                                           />
                                 <div className="trusted-icon">
                                   <FontAwesomeIcon size="sm" icon={faImage} className="icon-trusted" />
                                 </div>
                                 <div className="trusted-content">
                                   <h2 className="heading_18 trusted-heading">Galerie</h2>
                                 </div>
                                   </label>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
                       </div>
                       </>
                     ) }
       
                     <div>
                                                   {cameraActive && !capturedImage && (
                                                     <div className="camera_view">
                                                       <div className="return_btn">
                                                         <label htmlFor="" onClick={stopCamera}>
                                                           <svg
                                                             className="icon icon-menu-back"
                                                             xmlns="http://www.w3.org/2000/svg"
                                                             width="40"
                                                             height="40"
                                                             viewBox="0 0 24 24"
                                                             fill="none"
                                                             stroke="currentColor"
                                                             strokeWidth="2"
                                                             strokeLinecap="round"
                                                             strokeLinejoin="round"
                                                           >
                                                             <polyline points="15 18 9 12 15 6"></polyline>
                                                           </svg>
                                                         </label>
                                                       </div>
                                                       <video ref={videoRef} autoPlay playsInline></video>
                                                       <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
       
                                                       <div className="button_list text-center">
                                                         <label className="mode_btn" onClick={switchCamera}>
                                                           <FontAwesomeIcon size="sm" icon={faRepeat} className="icon-trusted" />
                                                         </label>
                                                         <label className="shots_btn"
                                                           
                                                            onClick={captureImage}
                                                            >
                                                           <FontAwesomeIcon size="sm" icon={faCamera} className="icon-trusted" />
                                                         </label>
                                                       </div>
                                                     </div>
                                                   )}
       
                                                   {capturedImage && (
                                                     <div className="image_preview">
                                                       <img src={capturedImage} alt="Preview" style={{ width: "100%" }} />
                                                       <div className="button_list text-center">
                                                         <button className="cancel_btn" onClick={resetCapture}>
                                                           Annuler
                                                         </button>
                                                         <button className="confirm_btn" onClick={proceed}>
                                                           Suivant
                                                         </button>
                                                       </div>
                                                     </div>
                                                   )}
       
                                                   {/* {!cameraActive && !capturedImage && (
                                                     <button onClick={startCamera}>Activer la Caméra</button>
                                                   )} */}
                                                 </div>   
                  <label
                    className="input_label"
                    >
                     {/* <div className="text-center w-100"> */}
                       <label className="title_dg">
                         ajouter vos images
                          <span>
                          (* récentes)
                           </span>

                       </label>
                     {/* </div> */}
                        <div className="zone_img_new">
                           
                           {/* <div className="row"> */}
                           {/* <div className="text-center w-100"> */}
                             
                                             {zones.map((zone) => (
                                               <>
                                               <div key={zone}
                                                 onMouseDown={() => handleLongPressStart(zone)} // Desktop
                                                 onMouseUp={handleLongPressEnd} // Desktop
                                                 onTouchStart={() => handleLongPressStart(zone)} // Mobile
                                                 onTouchEnd={handleLongPressEnd} // Mobile
                                             
                                             className="div_img col-4 col-lg-3 col-md-3 col-sm-4 img_item">
       
                                                     {imagesModels[zone] ? (
                                                               <>
                                                        
                                                         <label className='img_container'>
                                                         <img
                                                            onClick={(e) => {
                                                             Addimgs(zone);
                                                           // e.preventDefault();
                                                           // setCurrentZone(zone); // Ouvre uniquement la modale
                                                           // e.stopPropagation(); // Évite la propagation non désirée
                                                         }}
                                                         src={typeof imagesModels[zone] === "string" ? imagesModels[zone] : URL.createObjectURL(imagesModels[zone])}
                                                           // src={imagesModels[zone]}
                                                           alt={zone}
                                                           // style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                         />
                                                        </label>
                                                             </>
       
                                                       ) : (
                                                           <>
                                                         
                                                                           <label
                                                                            //    onClick={form_type != 1 && (e) => {
                                                                            //      Addimgs(zone); // Ouvre uniquement la modale
                                                                            //      e.stopPropagation(); // Évite la propagation non désirée
                                                                            //    }}
                                                                               //  onClick={Addimgs} 
                                                                               onClick={form_type != 1 ? (e) => {
                                                                                Addimgs(zone);
                                                                                e.stopPropagation();
                                                                              } : null}
                                                                              
                                                                               className='input_label'>
                                                                                 {/* <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/> */}
       
                                                                                 {zone === "face" ?
                                                                                 (
                                                                                   <span className="person_icon"> 
                                                                                   {}
                                                                                        <img 
                                                                                        //   src={`${apiUrl}/${getPathForResolution(item.paths)}` }
                                                                                        src= {formData.postulant?.pathimage_face ? `${apiUrl}/${formData.postulant?.pathimage_face}`  :  face_image}
                                                                                         alt={formData.postulant?.pathimage_face ? formData.postulant?.pathimage_face : zone} 
                                                                                         />
                                                                                 </span>
       
                                                                                 )
                                                                                 :
                                                                                 zone === "profile" ?
                                                                                 (
                                                                                   <span className="person_icon"> 
                                                                                     <img 
                                                                                      src= {formData.postulant?.pathimage_profil ? `${apiUrl}/${formData.postulant?.pathimage_profil}`  :  profil_image}
                                                                                      
                                                                                    //   src= {profil_image}
                                                                                       alt={zone} />
                                                                                   </span>
                                                                                   
                                                                                 )
                                                                                 :
                                                                                 zone === "entier" &&
                                                                                 (
                                                                                   <span className="person_icon">  
                                                                                      <img  

                                                                                      src= {formData.postulant?.pathmage_plainpied ? `${apiUrl}/${formData.postulant?.pathmage_plainpied}`  :  plain_pied_image }
                                                                                      
                                                                                    //   src= {formData.postulant?.pathimage_face ? `${apiUrl}/${formData.postulant?.pathimage_face}`  :  face_image}
                                                                                    //   src= {plain_pied_image}
                                                                                       alt={zone} 
                                                                                       className="illustrate" />
                                                                                  
                                                                                     </span>
                                                                                  
                                                                                 )
                                                                                
                                                                                 
                                                                                 
                                                                                 }
                                                                               
                                                                             </label> 
                                                                             
                                                                             {/* <label className='libel'>
                                                                               {zone}
                                                                             </label> */}
                                                           </>
                                                     )
                                                     
                                                     
                                                     }
       
                                                         
                             
                                               </div>
                                               
                                               </>
                                             
                                             ))}
                                           
                              
                            {/* </div> */}
                          
        
              {/* preview */}
              {!images_gallery_boxshow  
                ?
       
                (
                  null
                )
       
                : 
       
                (
                  <>
                   <div className="image_preview">
                    
                  {upload_img.length === 0 &&
       
                    (
                      <>
                         <div id="gal_mask" className="mask_gal">  
                                  <div className="container_cst">
                                            
                                             
                                              
                                                {imagesModels[currentZone] ? (
                                                  <div  className='full_img_box'>
                                                <div className="img-body expand_img ">
                                               <img
                                               onClick={(e) => {
                                                 slidetozone(currentZone); // Ouvre uniquement la modale
                                                 e.stopPropagation(); // Évite la propagation non désirée
                                               }}
                                                 src={imagesModels[currentZone]}
                                                 alt={currentZone}
                                                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                               />
                                                 </div>
                                                
                                                </div>
                                                   ) 
       
                                                   :
       
                                                   (
                                                     <div  className='full_img_box'>
                                                     <div className="img-body expand_img ">
                                                   
                                                      </div>
                                                     
                                                     </div>
                                                   )
       
                                                }
                                                  
                                              
                                              
                                      <div className="thumb-wrapper">
                                             {zones.map((zone) => (
                                               <>
                                               <div key={zone}
                                                 onMouseDown={() => handleLongPressStart(zone)} // Desktop
                                                 onMouseUp={handleLongPressEnd} // Desktop
                                                 onTouchStart={() => handleLongPressStart(zone)} // Mobile
                                                 onTouchEnd={handleLongPressEnd} // Mobile
                                             
                                             className="div_img col-4 col-lg-3 col-md-3 col-sm-4 img_item">
       
                                                     {imagesModels[zone] ? (
                                                     <>
                                                     
                                                   
                                                         <img
                                                         onClick={(e) => {
                                                           e.preventDefault();
                                                           setCurrentZone(zone); // Ouvre uniquement la modale
                                                           e.stopPropagation(); // Évite la propagation non désirée
                                                         }}
                                                         src={typeof imagesModels[zone] === "string" ? imagesModels[zone] : URL.createObjectURL(imagesModels[zone])}
                                                           // src={imagesModels[zone]}
                                                           alt={zone}
                                                           style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                         />
                                                         <label className='libel'>
                                                                               {zone}
                                                                             </label>
                                                                             </>
       
                                                       ) : (
                                                           <>
                                                                           <label
                                                                               onClick={(e) => {
                                                                                 Addimgs(zone); // Ouvre uniquement la modale
                                                                                 e.stopPropagation(); // Évite la propagation non désirée
                                                                               }}
                                                                               //  onClick={Addimgs} 
                                                                               className='input_label'>
                                                                                 <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/>
                                                                               
                                                                             </label> 
                                                                             <label className='libel'>
                                                                               {zone}
                                                                             </label>
                                                           </>
                                                     )
                                                     
                                                     
                                                     }
       
                                                         {/* Dropdown */}
                                                           {dropdownZone === zone && (
                                                             <div className="dropdown">
                                                               <button
                                                                 className="dropdown-item"
                                                                   onClick={(e) => {
                                                           e.preventDefault();
                                                         handleDropdownAction("edit", zone)// Ouvre uniquement la modale
                                                           e.stopPropagation(); // Évite la propagation non désirée
                                                         }}
                                                                 // onClick={() => handleDropdownAction("edit", zone)}
                                                               >
                                                                 <FontAwesomeIcon icon={faEdit} /> mod.
                                                               </button>
                                                               <button
                                                                 className="dropdown-item"
                                                                     onClick={(e) => {
                                                           e.preventDefault();
                                                         handleDropdownAction("delete", zone)// Ouvre uniquement la modale
                                                           e.stopPropagation(); // Évite la propagation non désirée
                                                         }}
                                                                 // onClick={() => handleDropdownAction("delete", zone)}
                                                               >
                                                                 <FontAwesomeIcon icon={faTrash} /> sup.
                                                               </button>
                                                             </div>
                                                           )}
       
                               
       
                             
                                               </div>
                                               
                                               </>
                                             
                                             ))}
                                                 
                                                                   
                                                    
                                           {/* Affichage de la vidéo de la caméra */}
                    
                                               
                                      </div>
                                  </div>
                                    
                                  <div className="fixedbtn_box">
                                  <div className="col-6 col-sm-6 col-md-6">
                                       {/* <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/> */}
                                              {/* <a href="#"> */}
                                             <label   onClick={(e) => {
                                                         e.preventDefault();
                                                         cancel_action(); // Ouvre uniquement la modale
                                                         e.stopPropagation(); // Évite la propagation non désirée
                                                       }}
                                                        className="link_cst cancel_btn">
                                                  annuler
                                              </label>
                                                {/* </a>      */}
                                                                                      
                                  
                                  </div>
                                  <div className="col-6 col-sm-6 col-md-6">
                                   
                                          {/* <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/> */}
                                              {/* <a href="#"> */}
                                              <label   onClick={(e) => {
                                                         e.preventDefault();
                                                         next_option(); // Ouvre uniquement la modale
                                                         e.stopPropagation(); // Évite la propagation non désirée
                                                       }}
                                                        className="link_cst confirm_btn">
                                                  suivant
                                              </label>
                                                {/* </a>      */}
                                                                                      
                                   
                                  </div>
                              
                              </div>                     
                                      
                              </div>
       
                      </>
       
                    )
       
                    
                  }
       
       
       
                    </div>
                  </>
       
                )
              }
       
                           {/* </div> */}
                         </div>
                         </label>
                   {/* fin photo */}
                
                     
                 </div>
         

    
</div>
       
       </div>
    
   </div>

 {/* Render each type with its checkbox and form */}
 {["mannequin", "hotesse", "influenceur"].map((type) => (
   <div key={type} className="model_categorie border rounded">
     <label className="accordion_title flex items-center space-x-2">
       <input
         type="checkbox"
         name={type}
         checked={!!selectedTypes[type]}
         onChange={() => handleCheckboxChangeAccordion(type)}
       
        //  checked={selectedTypes[type]}
        //  onChange={() => handleCheckboxChange(type)}
         className="cursor-pointer"
       />
       <span className="capitalize text-lg font-semibold">
         {type.replace(/([A-Z])/g, " $1")}
       </span>
     </label>

     {selectedTypes[type] && (
                <div className="tab-content">
                  {renderForm(type, formData, handleInputChange, handleCheckboxChange)}
                </div>
              )}
     {/* {selectedTypes[type] && (
       <div className="tab-content">
        
         {renderForm(type)}
       </div>
     )} */}
   </div>
 ))}

 {/* Submit Button */}
 <div className="mt-6 text-center">
 {/* <button 
   onClick={handleSave}
 disabled={} // Bloque le bouton pendant le traitement
 className="bg-success mx-2 text-white py-2 px-2 rounded hover:bg-success">
      Sauvegarder
   </button> */}
   <button 
     onClick={handleSubmit}
   disabled={false} // Bloque le bouton pendant le traitement
   className="bg-primary text-white py-2 px-2 rounded hover:bg-primary">
    Soumettre la candidature
   </button>
 </div>

 </form>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;

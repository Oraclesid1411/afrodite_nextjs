import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect ,useRef  } from "react"; 
// import Header_banner from '../Components/Header_banner';   
import { FaChevronLeft, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import parsePhoneNumber from "libphonenumber-js";

import Locations from '../../Components/Locations.jsx';
import { useAuth } from "../../Context/AuthenticateContext.jsx";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faCamera,faCheckDouble, faImage,faRepeat, faPlus, faTimes, faEdit, faTrash, faKitchenSet } from '@fortawesome/free-solid-svg-icons'

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faXTwitter, faFacebook, faLinkedin, faYoutube, faWhatsapp, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import requestPermission from '../../sevices/NotificationService.js';

import moment from 'moment';
import {
  faInstagram,
  faFacebook,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; 
import { motion } from "framer-motion";


import CountrySelector from "../../Components/CountrySelector.jsx";
function CreerbusinessCompte() {

  const auth = useAuth(); 
  const user_info = auth.currentUser 
  const [newSave, setNewSave] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const apiUrl = "https://apiafro.aafrodites.com";

  const link_url = location?.pathname.split("/");


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
      const closeModal_notif = () => {
        navigate("/profile")
      };

    const [images, setImages] = useState([]);
    const [imagespath, setImagespath] = useState([]);
    
    const [formData, setFormData] = useState({
      person: {
        nom: "",
        prenom: "",
        quartier: "",
        // date_naissance: "",
        cni: "",
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
       
      }
       
    });
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
  
    const handleLocationChange = (data) => {
      setLocationData(data);
      setFormData((prevFormData) => ({
        ...prevFormData,
        person: {
          ...prevFormData.person,
          pays: data.pays || "",
          ville: data.ville || "",
          quartier: data.quartier || "",
        },
      }));
    
      console.log('Valeurs sélectionnées:', data);
    };
  
    const handleCountrySelect = (country) => {
      console.log("Pays sélectionné :", country);
    };
    


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

  // Fonction pour gérer les changements dans PhoneInput
  const handlePhoneChange = (value, type) => {
 
    if (!value) {
      // Si aucun numéro n'est fourni
    

      setFormData((prev) => ({
        ...prev,
        person: {
          ...prev.person,
          [`indicatif_${type}`]: "",
          [type]: "",
         
        },
      }));
      
      return;
    }

    try {
      // Extraction de l'indicatif et du numéro (par ex. via libphonenumber-js)
       const phoneNumber = parsePhoneNumber(value); // Parser le numéro
          if (!phoneNumber) throw new Error("Numéro invalide");
      
          const indicatif = `+${phoneNumber.countryCallingCode}`; // Ex: "+228"
          const numero = phoneNumber.nationalNumber; // Ex: "90123456"
      
      setFormData((prev) => ({
        ...prev,
        person: {
          ...prev.person,
          [type === "phone"
            ? "indicatif_phone"
            : type === "whatsapp"
            ? "indicatif_whatsapp"
            : "indicatif_telegram"]: indicatif,
          [type === "phone"
            ? "telephone"
            : type === "whatsapp"
            ? "whatsapp"
            : "telegram"]: numero,
        },
      }));
    } catch (error) {
      console.error("Erreur lors de la mise à jour du numéro :", error);
    }
  };

  const handleInputChange = (type, field, value) => {
    // Fonction pour calculer l'âge
    const calculateAge = (dateString) => {
      const today = new Date();
      const birthDate = new Date(dateString);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
  
      // Vérifier si l'anniversaire est passé cette année
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
  
      return age;
    };
  
    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [type]: {
          ...prev[type],
          [field]: value,
        },
      };
  
      // Si le champ modifié est la date de naissance, calculer et mettre à jour l'âge
      if (field === "date_naissance") {
        updatedData[type].age = value ? calculateAge(value) : "";
      }
  
      return updatedData;
    });
  };
  
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fonction pour gérer la soumission (Postuler)
  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche le comportement par défaut du bouton
    if (isSubmitting) return; // Bloque l'exécution si déjà en cours de soumission
    console.log(formData)

    
    const loadingToast = toast.info('demande en cours...', {
      position: "top-center",
      autoClose: false, // Ne ferme pas la notification automatiquement
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
    setNewSave(1)
    if (isSubmitting) return; // Bloque l'exécution si déjà en cours de soumission
    // console.log(formData)
    const data_token = await requestPermission();

     const formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');

console.log(formattedDate); // Exemple : 2025-01-14 15:45:30
const userid = user_info?.id;
console.log(userid)


const param = {
  user : userid,
  data: formData,
  // files : imgs_save,
  date : formattedDate,
  FCMtoken : data_token
};

console.log("param")
console.log(param)
    // return false;
    try {

      await axios
       .post(`${apiUrl}/business/devenir_business`,
        param
         )
       .then((result) => {
   
     
       console.log(result)
      //  return false;
           if(result){
              // Dismiss la notification de "sauvegarde en cours"
               toast.dismiss(loadingToast);
             
                if(result?.data?.old_user != ""){
                  toast.error(result?.data?.msg, {
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
                  
                  setIsSubmitting(false); 
 
                }
                else{
                  toast.success('compte crée avec succès' , {
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
                  
                 //  setIsModalOpen(true)
                 setIsModalOpen(true)

                  if(result.data?.user != null && result.data?.token != null){
                    // Sauvegarder les données du user dans le localStorage
                    const   user   = result.data?.user; // Assurez-vous que `response.data.user` contient l'ID, le pseudo et le password
                    const  token = result.data?.token; // Assurez-vous que `response.data.user` contient l'ID, le pseudo et le password
                   
                    setAuth_ids((prevState) => ({
                      ...prevState,
                      auth: {
                       
                        pseudo: result.data?.pseudo || "", // Si phone1 est vide, on met une chaîne vide pour éviter les erreurs
                        pass: result.data?.pass || "-",
                        
                      },
                    }));
                 
                    // setNewUserData([user , result.data?.pass])
                     auth.saveToLocalStorage(user ,token);
                  // setNewUser(1)
                  setIsModalOpen(true)

                  setIsSubmitting(false); 
 
                        }
 
                }

              //  }

               return false;
               // affciher une notif
               // setIsNotification(true)
           
             
               

              
           
 
           }
         }); 
         
   } catch (err) {
     console.log("erreur");
     // setError(err.response.data);
   }  
  
};

// sur les images

// console.log(listImages)
     const Show_gallerybox = (e) => {
    
        e.preventDefault(); // Empêche le comportement par défaut
    // console.log("gallery")
      if(images_gallery_boxshow === true){
      
          setimages_gallery_boxshow(false)
          // open gallery
        
      }
      else{
          setimages_gallery_boxshow(true)
          // var select_img = document.querySelector('#select_img');
          // // console.log(select_img)
          // select_img.click();

      }
    
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

return images;
const formData_b = new FormData();
images?.path.forEach((base64Image, index) => {
  const file = base64ToFile(base64Image, `image-${index + 1}.jpeg`);
  console.log("file" + index)
  console.log(file)
  
  // formData_b.append('files', file);
  formData_b.append('images', file);

}); 

// images?.path.forEach((file) => formData_b.append('images', file));

        console.log(formData_b)
        try {
          const response = await axios.post(`${apiUrl}/upload/saveImage`, formData_b, {
            headers: {
              'Content-Type': 'multipart/form-data', // Important
            },
            withCredentials: true, // Si nécessaire
          });
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
  
// fin de traitements des images 


  // Fonction pour uploader la vidéo vers le backend
  // const next_optionVideo = async () => {
  //   const formData = new FormData();
  //   formData.append('video', upload_video);

  //   try {
  //     const response = await axios.post(`${apiUrl}/upload/saveFile`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     console.log('Vidéo uploadée :', response.data);
  //   } catch (error) {
  //     console.error("Erreur lors de l'upload de la vidéo :", error);
  //   }
  // };
 
  // const handleTailleChange = (field, value) => {
  //   // Met à jour la taille en mètres ou centimètres
  //   if (field === "m") settaille_m(value);
  //   if (field === "cm") settaille_cm(value);

  //   // Met à jour la taille dans formData
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     mannequin: {
  //       ...prevFormData.mannequin,
  //       taille: `${field === "m" ? value : taille_m}.${field === "cm" ? value : taille_cm}`,
  //     },
  //     hotesse: {
  //       ...prevFormData.hotesse,
  //       taille: `${field === "m" ? value : taille_m}.${field === "cm" ? value : taille_cm}`,
  //     },
  //   }));
  // };

  // const renderForm = (type) => {
  //   switch (type) {
  //     case "mannequin":
  //       return (
  //          <form>
           
  //          <label
  //          className="input_label"
  //          >
  //              <span>
  //                  déja mannequin?
  //            </span>
  //            <div className="float_data">
  //            <label className="option_data">
  //           <input
  //             type="checkbox"
  //             checked={formData.mannequin.old_mannequin === "Oui"}
  //             onChange={() => handleCheckboxChange_b("mannequin", "old_mannequin", "Oui")}
  //           />
  //           Oui
  //         </label>
  //         <label className="option_data">
  //           <input
  //             type="checkbox"
  //             checked={formData.mannequin.old_mannequin === "Non"}
  //             onChange={() => handleCheckboxChange_b("mannequin", "old_mannequin", "Non")}
  //           />
  //           Non
  //         </label>

  //            </div>
          
  //          </label>
           
  //         </form>
  //       );
  //     case "hotesse":
  //       return (
  //         <form>
  //            <div className="mb-4">
            
  //           <label
  //          className="input_label"
  //          >
  //              <span>
  //                 déja hôtesse
  //            </span>
  //            <div className="float_data">
  //            <label className="option_data">
  //           <input
  //             type="checkbox"
  //             checked={formData.hotesse.oldhotesse === "Oui"}
  //             onChange={() => handleCheckboxChange_b("hotesse", "oldhotesse", "Oui")}
  //           />
  //           Oui
  //         </label>
  //         <label className="option_data">
  //           <input
  //             type="checkbox"
  //             checked={formData.hotesse.oldhotesse === "Non"}
  //             onChange={() => handleCheckboxChange_b("hotesse", "oldhotesse", "Non")}
  //           />
  //           Non
  //         </label>

  //            </div>
          
  //          </label>

  //           </div>
           
            
           
  //         </form>
  //       );
  //     case "influenceur":
  //       return (
  //         <form>
  //            <label
  //          className="input_label"
  //          >
  //              <span>
  //                 déja vlogueuse?
  //            </span>
  //            <div className="float_data">
  //            <label className="option_data">
  //           <input
  //             type="checkbox"
  //             checked={formData.influenceur.oldinfluenceur === "Oui"}
  //             onChange={() => handleCheckboxChange_b("influenceur", "oldinfluenceur", "Oui")}
  //           />
  //           Oui
  //         </label>
  //         <label className="option_data">
  //           <input
  //             type="checkbox"
  //             checked={formData.influenceur.oldinfluenceur === "Non"}
  //             onChange={() => handleCheckboxChange_b("influenceur", "oldinfluenceur", "Non")}
  //           />
  //           Non
  //         </label>

  //            </div>
          
  //          </label>
  //         <div className="mb-4 input_group">

            
  //         <label
  //          className="input_label"
  //          >
  //              <span>
  //              {/* <label className="block mb-2 flex items-center"> */}
  //             <FontAwesomeIcon icon={faInstagram} className="text-pink-500 mr-3" />
  //             Instagram
  //           {/* </label> */}
  //            </span>
  //            <div className="float_data">

  //            <input
  //             type="url"
  //               className="input_value"
  //             placeholder="Lien Instagram"
  //             value={formData.influenceur.instagram.lien}
  //             onChange={(e) =>
  //               handleInputChange("influenceur", "instagram", {
  //                 ...formData.influenceur.instagram,
  //                 lien: e.target.value,
  //               })
  //             }
  //             // className="w-full border p-2 rounded"
  //           />

  //        </div>
          
  //            {/* <label className="float_msg"> (optionnel)</label> */}
  //        </label>
  //        <label
  //          className="input_label"
  //          >
  //              <span>
  //            nbr. abonnés
  //            </span>
  //            <div className="float_data">

  //            <input
  //             type="number"
  //             placeholder="Nombre d'abonnés Instagram"
  //             value={formData.influenceur.instagram.abonnés}
  //             onChange={(e) =>
  //               handleInputChange("influenceur", "instagram", {
  //                 ...formData.influenceur.instagram,
  //                 abonnés: e.target.value,
  //               })
  //             }
  //              className="input_value"
  //           />

  //           </div>
          
  //            {/* <label className="float_msg"> (optionnel)</label> */}
  //        </label>
           
          
           
  //         </div>
    
  //         <div className="mb-4 input_group">
  //         <label
  //          className="input_label"
  //          >
  //              <span>
  //              <FontAwesomeIcon icon={faFacebook} className="text-blue-500 mr-2" />
  //             Facebook
  //            </span>
  //            <div className="float_data">

  //            <input
  //                className="input_value"
  //                type="url"
  //                placeholder="Lien Facebook"
  //                value={formData.influenceur.facebook.lien}
  //                onChange={(e) =>
  //                  handleInputChange("influenceur", "facebook", {
  //                    ...formData.influenceur.facebook,
  //                    lien: e.target.value,
  //                  })
  //                }
  //           />

  //        </div>
          
  //            {/* <label className="float_msg"> (optionnel)</label> */}
  //        </label>
  //        <label
  //          className="input_label"
  //          >
  //              <span>
  //            nbr. abonnés
  //            </span>
  //            <div className="float_data">

  //            <input
  //            type="number"
  //            placeholder="Nombre d'abonnés Facebook"
  //            value={formData.influenceur.facebook.abonnés}
  //            onChange={(e) =>
  //              handleInputChange("influenceur", "facebook", {
  //                ...formData.influenceur.facebook,
  //                abonnés: e.target.value,
  //              })
  //            }
  //              className="input_value"
  //           />

  //           </div>
          
  //            {/* <label className="float_msg"> (optionnel)</label> */}
  //        </label>
           
          
           
  //         </div>
         
    
  //         <div className="mb-4 input_group">
  //         <label
  //          className="input_label"
  //          >
  //              <span>
  //              <FontAwesomeIcon icon={faYoutube} className="text-red-500 mr-2" />
  //             YouTube
  //            </span>
  //            <div className="float_data">

  //            <input
              
  //               className="input_value"
  //               type="url"
  //               placeholder="Lien YouTube"
  //               value={formData.influenceur.youtube.lien}
  //               onChange={(e) =>
  //                 handleInputChange("influenceur", "youtube", {
  //                   ...formData.influenceur.youtube,
  //                   lien: e.target.value,
  //                 })
  //               }
  //             // className="w-full border p-2 rounded"
  //           />

  //        </div>
          
  //            {/* <label className="float_msg"> (optionnel)</label> */}
  //        </label>
  //        <label
  //          className="input_label"
  //          >
  //              <span>
  //            nbr. abonnés
  //            </span>
  //            <div className="float_data">

  //            <input
  //              type="number"
  //              placeholder="Nombre d'abonnés YouTube"
  //              value={formData.influenceur.youtube.abonnés}
  //              onChange={(e) =>
  //                handleInputChange("influenceur", "youtube", {
  //                  ...formData.influenceur.youtube,
  //                  abonnés: e.target.value,
  //                })
  //              }
  //              className="input_value"
  //           />

  //           </div>
          
  //            {/* <label className="float_msg"> (optionnel)</label> */}
  //        </label>
           
          
           
  //         </div>
          
    
  //         <div className="mb-4 input_group">
  //         <label
  //          className="input_label"
  //          >
  //              <span>
  //              <FontAwesomeIcon icon={faTiktok} className="text-black mr-2" />
  //              TikTok
  //            </span>
  //            <div className="float_data">

  //            <input
             
  //               className="input_value"
  //               type="url"
  //               placeholder="Lien TikTok"
  //               value={formData.influenceur.tiktok.lien}
  //               onChange={(e) =>
  //                 handleInputChange("influenceur", "tiktok", {
  //                   ...formData.influenceur.tiktok,
  //                   lien: e.target.value,
  //                 })
  //               }
  //           />

  //        </div>
          
  //            {/* <label className="float_msg"> (optionnel)</label> */}
  //        </label>
  //        <label
  //          className="input_label"
  //          >
  //              <span>
  //            nbr. abonnés
  //            </span>
  //            <div className="float_data">

  //            <input
  //             type="number"
  //             placeholder="Nombre d'abonnés TikTok"
  //             value={formData.influenceur.tiktok.abonnés}
  //             onChange={(e) =>
  //               handleInputChange("influenceur", "tiktok", {
  //                 ...formData.influenceur.tiktok,
  //                 abonnés: e.target.value,
  //               })
  //             }
  //              className="input_value"
  //           />

  //           </div>
          
  //            {/* <label className="float_msg"> (optionnel)</label> */}
  //        </label>
           
          
           
  //         </div>
         
  //       </form>
  //       );
  //     default:
  //       return null;
  //   }
  // };
 
  return (

    <>
    <ToastContainer className="toast_style"/>
      
     <div className="container form_bg pt-3 mx-auto p-4 bg-white">
            <button 
              onClick={handleBackClick} 
              // style={backButtonStyle}
              className='back_cmoponent'>
               <FaChevronLeft size={10} />
            </button>
     
      <form autoComplete='off' className='business_form' style={{ maxWidth: "600px", margin: "auto" }}>
   
      <div className="mb-6 border rounded px-0">
          
         
            <div className="tab-content text-center my-3">
           
           <div className="input_group">
         
         <label className="input_label">
            <div className="line_data">
                <div className="half_col">
              

              <input className="input_value" type="text"
              placeholder="votre nom"
              value={formData.person.nom}

              onChange={(e) => handleInputChange("person", "nom", e.target.value)}
              // value={formData.postulant.nom}
 
              // onChange={(e) => handleInputChange("postulant", "nom", e.target.value)}
            />
            
              
          
               </div>
          
              <div className="half_col">
             
                <input
            className="input_value"
              type="text"
                placeholder="votre prénom"
                value={formData.person.prenom}
             onChange={(e) => handleInputChange("person", "prenom", e.target.value)}
            />
             
           
           
        
             </div>
            </div>
          
         </label>

        
         <label className="input_label">
            <div className="line_data">
            <div className="half_col">
              

              <input className="input_value" type="text"
              placeholder=" n° carte d'identité "
              value={formData.person.cni}
              onChange={(e) => handleInputChange("person", "cni", e.target.value)}
              
            />
            
              
          
               </div>
               <div className="half_col">
             
             <PhoneInput

               className="phone_input"
               id="phone1"
               autoComplete='off'
               defaultCountry="tg"
               name="phone1"
               value={phone1}
               onChange={(value) => handlePhoneChange(value, "phone")}
 
            />
          
             </div>
          
             
            </div>
          
         </label>
         
         <div className="line_data">
            <div className="half_col">
              

            <PhoneInput
                          className="phone_input"
                         id="phone2"
                         autoComplete='off'
                         defaultCountry="tg"
                         name="phone2"
                         value={phone2}
                                                                            //  value={`${formData.postulant.indicatif_whatsapp} ${formData.postulant.whatsapp}`.trim()}
                        onChange={(value) => handlePhoneChange(value, "whatsapp")}

                       />
            
              
          
           </div>
          
             <div className="half_col">
             
               <PhoneInput
                           className="phone_input"
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

        <div className="line_data locationbox">
           <Locations className="inline_zone"
               inputdata ={{ 
                           
                              pays_name : 'pays',

                              ville_name: 'ville',
                             //  quartier_name: 'quartier'
               }} 
              onChange={handleLocationChange}
                                                                           
             />

       <div className="half_col">
             
             <input
               className="input_value"
           
              type="email"
              placeholder='votre adresse email'
              value={formData.person.email}
              onChange={(e) => handleInputChange("person", "email", e.target.value)}
           />
             
        </div>
       </div>
      

         {/* <Locations 
               inputdata ={{ 
                           
                              pays_name : 'pays',

                              ville_name: 'ville',
                              quartier_name: 'quartier'
               }} 
                 onChange={handleLocationChange}
                                                                                 
                                                                           
          /> */}

       <div className=" hide flex justify-center items-center h-screen">
      <CountrySelector onSelect={handleCountrySelect} />
    </div>                                                                   
      
       
         
           
         
</div>
            
            </div>
         
        </div>

    

      {/* Submit Button */}
      <div className="mt-3 text-center">
    
        <button 
          onClick={handleSubmit}
        disabled={isSubmitting} // Bloque le bouton pendant le traitement
        className="bg-primary text-white py-2 px-2 rounded hover:bg-primary">
        valider
        </button>
      </div>

      </form>
    </div>

    
    {isModalOpen && (
          <div className="modal-overlay upper_box" style={{backgroundColor : "rgba(12,12,12,.9)"}} onClick={closeModal_notif}>
          <motion.div
            className="modal-content_b"
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100vh", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn modal_content_close" onClick={closeModal_notif}>&times;</button>
            
            <div>
            <p className='data_info'>
               vous avez créer votre compte afrodites business avec succès!
                <br/>
               vous disposez désormais le droit de: .........!
               <br/>
              
            </p>
              <div className='auth_box'>
                <label>vous disposez d'un compte afrodites</label>
                <label className='danger_msg'>(*) sauvegarder vos identifiants</label>
                <label className='id_auth'>pseudo: <span>{auth_Ids?.auth?.pseudo}</span></label>
                <label  className='id_auth'>mot de passe: <span>{auth_Ids?.auth?.pass}</span> </label>

              </div>

            <p>

               {/* les identifiants */}
               Merci!!!
            </p>

            {/* <button className="close-btn modal_content_close" onClick={closeModal}>&times;</button> */}
          
            </div>
          </motion.div>
        </div>
      )}
    
    </>
   
  );
}

export default CreerbusinessCompte;

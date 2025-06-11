
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect ,useRef  } from "react"; 
import Loader from '../../Components/Loader';
import axios from 'axios' 

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaEye,FaFilter, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import imageCompression from 'browser-image-compression';
import DeleteMannequinButton from "../../Components/DeleteMannequinButton";
import Locations from "../../Components/Locations";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const FashionModelMgt = () => {

  const [fashion_models , setfashion_models] = useState([]);
  const [mannequins_data , setmannequins_data] = useState([]);

  const categoryMap = {
    1: "podium",
    2: "photo",
    3: "clip"
  };

  // Mapping label => ID (pour enregistrer ensuite)
const reverseCategoryMap = {
  podium: 1,
  photo: 2,
  clip: 3
};

  const [categories, setCategories] = useState({
    podium: false,
    photo: false,
    clip: false
  });

  const handlemannequin_CategoryChange = (e) => {
    const { value, checked } = e.target;
    const idValue = reverseCategoryMap[value]; // Ex: "podium" => 1

    // return false;
    setFormData((prev) => {
      const updated = prev.model.categories_mannequin.includes(value)
        ? prev.model.categories_mannequin.filter((cat) => cat !== value)
        : [...prev.model.categories_mannequin, value];

      return {
        ...prev,
        model: {
          ...prev.model,
          categories_mannequin: updated
        }
      };
    });

    // Mise à jour de selectedModel
    setSelectedModel(prev => {
      if (!prev) return prev;
  
      // Mise à jour des noms (labels)
      // let updatedLabels = [...(prev.categories_mannequin || [])];
      // if (checked) {
      //   if (!updatedLabels.includes(value)) {
      //     updatedLabels.push(value);
      //   }
      // } else {
      //   updatedLabels = updatedLabels.filter(c => c !== value);
      // }
  
      // Mise à jour des IDs
      let updatedIDs = [...(prev.categorie_model || [])];
      if (checked) {
        if (!updatedIDs.includes(idValue)) {
          updatedIDs.push(idValue);
        }
      } else {
        updatedIDs = updatedIDs.filter(id => id !== idValue);
      }
  
      return {
        ...prev,
        // categories_mannequin: updatedLabels,
        categorie_model: updatedIDs
      };
    });
  
  
    // setFormData(prev => {
    //   const currentCategories = prev.model.categories_mannequin;
    //   let updatedCategories;
  
    //   if (checked) {
    //     updatedCategories = [...currentCategories, value];
    //   } else {
    //     updatedCategories = currentCategories.filter(cat => cat !== value);
    //   }
  
    //   return {
    //     ...prev,
    //     model: {
    //       ...prev.model,
    //       categories_mannequin: updatedCategories
    //     }
    //   };
    // });
  };

  const [podiums , setPodiums] = useState([]);
  const [details , setDetails] = useState([]);
  const [newuserdata , setnewuserdata] = useState([]);
  
  console.log("mannequins_data")
  console.log(mannequins_data)
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
    setIsNotification(false)
    setImagePreview(null)
  };
  

  // Fonction pour gérer le changement de l'image
   // Fonction pour gérer le changement d'image
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
 
      const [isloaded, setIsloaded] = useState(true);
        useEffect(() => {
          const fetchData = async () => {
            try {
              const [rep1, rep2, rep3 , rep4] = await Promise.all([
                axios.post(`${apiUrl}/fashion_model/list_mannequin`),
                  axios.get(`${apiUrl}/fashion_model/podiums`),
                axios.get(`${apiUrl}/fashion_model/details`),
                axios.get(`${apiUrl}/fashion_model/list_mannequin_admin`),
              
              ]);
              setfashion_models(rep1.data);
              setPodiums(rep2.data);
              setDetails(rep3.data);
              setmannequins_data(rep4.data);
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

  console.log("mannequins_data")
  // console.log(fashion_models)
  console.log(mannequins_data)

const groupedResults = mannequins_data.reduce((acc, row) => {
  // Vérifie si le mannequin existe déjà dans l'accumulateur
  let mannequin = acc.find(item => item.id_mannequin === row.idmannequin);
  
  if (!mannequin) {
    // Si non, crée une nouvelle entrée pour ce mannequin
    mannequin = {
       id_mannequin: row.idmannequin || '',
       personne : row.personne_id || '' ,
      nom: row.nom || '' ,
      prenom: row.prenom || '' ,
      pseudo: row.pseudo || '' ,
      type_image: row.type_image || '' ,
      type_model: row.type_model || '' ,
      userclient: row.userclient || '' ,
      id_image: row.id_image || '' ,
      image_name: row.image_name || '',
      cdi : row.cdi || '' ,
      taille : row.taille || '',
      indication : row.indication || '',
      poids : row.poids || '' ,
      date_naissance : row.date_naissance || '' ,
      adresse_email : row.adresse_email || '' ,
      pays : row.pays || '' ,
      ville : row.ville || '' ,
      quartier : row.quartier || '' ,
      code_1 : row.indicatif || '' ,
      code_2 : row.indicatif_2 || '' ,
      tel1 : row.num_tel || '' ,
      tel2 : row.num_tel_2 || '' ,
      categorie_model : [],
   
       paths: {} };
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

  // Ajoute le path_image correspondant au type_resolution
  switch (row.type_resolution) {
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


useEffect(() => {
  if (groupedResults) {
    const categories_mnq = (groupedResults.categorie_model || [])
      .map(id => categoryMap[id])
      .filter(Boolean); // enlève les "undefined" au cas où

    setFormData(prev => ({
      ...prev,
      model: {
        ...prev.model,
        categories_mannequin: categories_mnq
      }
    }));
  }
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
  const filteredModels = groupedResults.filter((model) =>
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
 
  const handleDeleteSuccess = (mannequinId) => {
    // Mettre à jour la liste des mannequins après suppression
    // console.log('delete')
    // console.log(mannequinId)
    // console.log(mannequins_data)
    // return false;
    setmannequins_data(mannequins_data.filter(model => model.id_mannequin !== mannequinId));
  };
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

  // console.log("deviceWidth")
  // console.log(deviceWidth)
   const getPathForResolution = (paths) => {
    // console.log("paths")
    // console.log(paths)
    if (deviceWidth <= 720) {
      return paths.path_mm; // Résolution miniature
    } else if (deviceWidth <= 1080) {
      return paths.path_md; // Résolution moyenne
    } else {
      return paths.path_md; // Résolution haute
    }
  };
  // form params
  
  const [formData, setFormData] = useState({
    model: {
      nom: "",
      prenom: "",
      pseudo: "",
      code_1: "",
      code_2: "",
      tel1: "",
      tel2: "",
      email: "",
      cdi: "",
      date_naissance: "",
      pays: "",
      ville: "",
      taille: "",
      poids: "",
      indication: "",
      categories_mannequin: [] // <- ici on ajoute la liste des catégories sélectionnées
 
    }
    
  });

  const [locationData, setLocationData] = useState({
    pays: '',
    ville: '',
    quartier: '',
  });

  console.log("locationData")
  console.log(locationData)
  const handleLocationChange = (data) => {
    setLocationData(data);
    setFormData((prevState) => ({
      ...prevState,
      model: {
        ...prevState.model,
        pays: data.pays,
        ville: data.ville,
      },
    }));
  };

  const elementRef = useRef(null);

    const [phone1, setPhone1] = useState("");
    const [phone2, setPhone2] = useState("");

    
   const [taille_m, settaille_m] = useState("1");
   const [taille_cm, settaille_cm] = useState("00");

  const updatePhoneNumbersTaille = () => {
    const this_taille = taille_m + ","+  taille_cm

      const telnum1 = document.querySelector(".react-international-phone-input[name='phone1']" ).value;
      const number1 = telnum1.split(" ");
      const telnum2 = document.querySelector(".react-international-phone-input[name='phone2']" ).value;
      const number2 = telnum2.split(" ");

      setFormData((prevState) => ({
        ...prevState,
        model: {
          ...prevState.model,
          code_1: number1[0] || "", 
        tel1: number1.slice(1).join(" ") || "",
        code_2: number2[0] || "",
        tel2: number2.slice(1).join(" ") || "",
        taille: this_taille,
        },
      }));
      // console.log(formData)
    };
  
    // Utilisation de useEffect pour mettre à jour formData quand phone1 ou phone2 change
    useEffect(() => {
      if(elementRef.current){
      updatePhoneNumbersTaille();
      }
    }, [phone1, phone2, taille_cm, taille_m]);  


  const handleInputChange = (type, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
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

  
    const compressImageWithMaxSize = async (file, maxWidth, maxHeight, maxSize) => {
      let options = {
        maxWidthOrHeight: Math.max(maxWidth, maxHeight),
        useWebWorker: true,
      };
    
      let compressedFile = await imageCompression(file, options);
      
      // Vérifier si la taille du fichier est inférieure à la taille maximale
      if (compressedFile.size > maxSize) {
        // Réduire la qualité de l'image pour respecter la taille
        const quality = Math.max(0.1, maxSize / compressedFile.size); // Calculer un facteur de qualité basé sur la taille
        options = { maxWidthOrHeight: Math.max(maxWidth, maxHeight), maxSize: maxSize, useWebWorker: true, initialQuality: quality };
        compressedFile = await imageCompression(file, options);
      }
    
      return compressedFile;
    };
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
  try {
    // Convertir l'image Base64 en fichier
    const file = base64ToFile(base64Image, uniqueFileName);
    console.log(file)

    if (file.size > 500000) {
      // Compresser les images avec des tailles max spécifiques
      const [desktopImage, mobileImage, thumbnailDesktop, thumbnailMobile] = await Promise.all([
        // compressImage(file, 1920, 1080),
        compressImageWithMaxSize(file, 1280, 720, 700000), // Mobile haute qualité, 300 Ko max
        // Desktop haute qualité
        compressImageWithMaxSize(file, 1280, 720, 400000), // Mobile haute qualité, 300 Ko max
        compressImage(file, 600, 400),  // Miniature Desktop
        compressImageWithMaxSize(file, 400, 250, 100000),  // Miniature Mobile, 40 Ko max
      ]);

      
      console.log(thumbnailMobile)
      console.log(mobileImage)
      console.log(uniqueFileName.split(".")[0])
// return false;
      formData.append("files", desktopImage, uniqueFileName); // Original
      formData.append("files", mobileImage, `${uniqueFileName.split(".")[0]}_desktop.${uniqueFileName.split(".")[1]}`);
      // formData.append("files", mobileImage, `${uniqueFileName.split(".")[0]}_desktop.${uniqueFileName.split(".")[1]}`);
      formData.append("files", mobileImage, `${uniqueFileName.split(".")[0]}_mobile.${uniqueFileName.split(".")[1]}`);
      formData.append("files", thumbnailMobile, `${uniqueFileName.split(".")[0]}_thumbnail_desktop.${uniqueFileName.split(".")[1]}`);
      formData.append("files", thumbnailMobile, `${uniqueFileName.split(".")[0]}_thumbnail_mobile.${uniqueFileName.split(".")[1]}`);
      // formData.append("files", mobileImage, `${uniqueFileName}_mobile`);
      // formData.append("files", thumbnailMobile, `${uniqueFileName}_thumbnail_desktop`);
      // formData.append("files", thumbnailMobile, `${uniqueFileName}_thumbnail_mobile`);
    } else {
      // Ne pas compresser si la taille est déjà inférieure à 500 Ko
      formData.append("files", file, uniqueFileName); // Original
      formData.append("files", file, `${uniqueFileName.split(".")[0]}_desktop.${uniqueFileName.split(".")[1]}`);
      formData.append("files", file, `${uniqueFileName.split(".")[0]}_mobile.${uniqueFileName.split(".")[1]}`);
      formData.append("files", file, `${uniqueFileName.split(".")[0]}_thumbnail_desktop.${uniqueFileName.split(".")[1]}`);
      formData.append("files", file, `${uniqueFileName.split(".")[0]}_thumbnail_mobile.${uniqueFileName.split(".")[1]}`);
    
      
    }

  } catch (compressionError) {
    console.error(`Erreur lors de la compression de l'image ${uniqueFileName} :`, compressionError);
    continue; // Continuer avec les autres images même en cas d'erreur
  }


  
}

  
    try {
      // Envoi des fichiers
     
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
    // return false;
  
    const imgs_upld = await next_option(); // Attend que la fonction résolve la promesse
    
    const all_images = []
       all_images.push({
                            o_desktop : imgs_upld[0] ,
                            hr_desktop : imgs_upld[1],
                            hr_mobile : imgs_upld[2],
                            m_desktop : imgs_upld[3],
                            m_mobile : imgs_upld[4],

                   });

      console.log(all_images)
    // return false;
    const data_model = {
      data : formData?.model
    }
   
    const param = {all_images ,data_model}
  
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
            .post(`${apiUrl}/fashion_model/addfashionmodel`,
              param
              )
            .then((result) => {
        
            console.log("result.data")
              console.log(result)
            //   console.log(result.data?.user)

            //  return false;

            
                if(result){
                  setTimeout(() => {
                  
                    toast.success('mannequin ajouté avec succès' , {
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
                  setnewuserdata([result.data?.new_pseudo , result.data?.new_pass])
                    // affciher une notif
                    setIsNotification(true)
                    setIsloaded(true)
                    // setIsModalOpen(false);
                    

                  // arreter le loader

                  // afficher le recap
                }, 3500); // Délai de 3 secondes

                
      
                }
              }); 
              
        } catch (err) {
          console.log("erreur");
          // setError(err.response.data);
        }
  };
 console.log("formData")
 console.log(formData)

  const [selectedModel, setSelectedModel] = useState(null); // Pour gérer le modal
  const [isDetailModalOpen, setDetailModalOpen] = useState(false); // Modal pour détail
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false); // Modal pour mise à jour

  
  const handleLocationChangeU = (newLocation) => {
    if(newLocation.pays != "" && newLocation.ville != ""){
    setSelectedModel((prevModel) => ({
      ...prevModel,
      pays : parseInt(newLocation.pays), // Mettre à jour pays, ville, quartier selon ce qui est passé
      ville : parseInt(newLocation.ville), // Mettre à jour pays, ville, quartier selon ce qui est passé
      quartier : parseInt(newLocation.quartier), // Mettre à jour pays, ville, quartier selon ce qui est passé
    }));
  }
  };

  // Supprimer un modèle
  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce modèle ?")) {
      // Appeler l'API pour supprimer
      fetch(`${apiUrl}/models/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
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

  // Voir les détails
  const handleViewDetails = (model) => {
    setSelectedModel(model);
    setDetailModalOpen(true);
  };

  const [tailleMSelect, setTailleMSelect] = useState(null);
  const [tailleCmSelect, setTailleCmSelect] = useState(null);

  const [paysSelected, setPaysSelected] = useState(null);
  const [villeSelected, setVilleSelected] = useState(null);
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");

  // Modifier (Update)
  const handleUpdate = async (model) => {

    setSelectedModel(model);


    console.log("model")
    console.log(model)
    try {
      // Attendre que les deux requêtes soient résolues
      // const [response1, response2] = await Promise.all([
      //   axios.post(`${apiUrl}/locations/getThisPays`, { id: model.pays }),
      //   axios.post(`${apiUrl}/locations/getThisVille`, { id: model.ville })
      // ]);

      // // Mettre à jour les états après avoir reçu les réponses des requêtes
      // setPaysSelected(response1.data); 
      // setVilleSelected(response2.data);
      setLocationData(prevState => ({
        ...prevState,       
        pays: model.pays || "",
        ville: model.ville || "",
        quartier: model.quartier || "",
        
          
       
      }));
      const taille = model.taille;

      setNum1(model.code_1 + "" + model.tel1);
      setNum2(model.code_2 + "" + model.tel2);


      // Vérifier que la taille n'est pas vide et contient une virgule
      if (taille && taille.includes(",")) {
        const [m, cm] = taille.split(",");  // Décomposer directement en deux variables

        setTailleMSelect(m);  // Assigner à la variable m (mètres)
        setTailleCmSelect(cm);  // Assigner à la variable cm (centimètres)
      } else {
        // Gestion des cas où la taille ne contient pas de virgule ou est vide
        console.error("Format incorrect de la taille:", taille);
        // Définir des valeurs par défaut ou gérer l'erreur
        setTailleMSelect("1");  
        setTailleCmSelect("00");
      }
      setSelectedModel(prevState => ({
        ...prevState,
       
        pays: model.pays || "",
        ville: model.ville || "",
        quartier: model.quartier || "",
        
          
       
      }));

      const categoryMap = { 1: "podium", 2: "photo", 3: "clip" };
      const categories_mannequin = (model.categorie_model || [])
        .map(id => categoryMap[id])
        .filter(Boolean);
  
      setFormData(prev => ({
        ...prev,
        model: {
          ...prev.model,
          categories_mannequin
        }
      }));

      
      setUpdateModalOpen(true);

      // Sélectionner l'image en fonction de la largeur de l'écran
      if (deviceWidth <= 720) {
        setImagePreview(`${apiUrl}/${model.paths.path_mm}`);
      } else if (deviceWidth <= 1080) {
        setImagePreview(`${apiUrl}/${model.paths.path_md}`);
      } else {
        setImagePreview(`${apiUrl}/${model.paths.path_md}`);
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
      <h1>mannequins Management</h1>
      <div className="models-table-container">
      {/* Barre de recherche et options */}
      <div className="table-options">
        <input
          type="text"
          placeholder="Rechercher un modèle..."
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
          <label className="add_new mx-3" onClick={openModal} > valider postulant</label>
        
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
            <tr key={model.id_mannequin}>
              <td>{model.id_mannequin}</td>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <img 
                // src={model.image}
                // src={getPathForResolution(model.paths)}
          
                 src={`${apiUrl}/${getPathForResolution(model.paths)}`
                  
                 }
                 alt={model.nom} />
              </td>
              <td>{model.nom}</td>
              <td>{model.prenom}</td>
              <td>{model.pseudo}</td>
              {/* <td>{model.etat}</td> */}
              <td>
                <button title="Modifier" onClick={() => handleUpdate(model)}>
                  <FaEdit />
                </button>
                <Link title="Voir"  to={`/admin/detail_mannequin/1/${model?.id_mannequin}`}>
                  <FaEye />
                </Link>
                <DeleteMannequinButton 
                mannequinId={model.id_mannequin}
                imageId={parseInt(model?.id_image)}
                onDeleteSuccess={handleDeleteSuccess} />

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
            <h2 style={{fontSize : "18px" , textAlign : "center"}}>nouveau mannequin</h2>
           
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
                          vous venez d'enrégitrer un mannequin avec succès.
                          les identifiants de son comptes afrodites sont:
                          
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

                <div className="row" style={{margin : 0, padding : 0}}>
                  <div className="col-6">
                    <div style={styles.formGroup}>
                        <label>Nom :</label>
                        <input type="text"
                          onChange={(e) => handleInputChange("model", "nom", e.target.value)}
                        placeholder="nom" style={styles.input} />
                      </div>
                  </div>

                  <div className="col-6">
                    <div style={styles.formGroup}>
                        <label>prenom :</label>
                        <input type="text"
                          onChange={(e) => handleInputChange("model", "prenom", e.target.value)}
                    
                        placeholder="prénom" style={styles.input} />
                      </div>
                  </div>

                </div>
                      
                      
                      <div className="row">
                        <div className="col-6">
                            <div style={styles.formGroup}>
                              <label>pseudo :</label>
                              <input type="text"
                                onChange={(e) => handleInputChange("model", "pseudo", e.target.value)}
                          
                              placeholder="pseudo " style={styles.input} />
                          </div>
                        </div>
                        <div className="col-6">
                          <div style={styles.formGroup}>
                            <label>Date de naissance :</label>
                            <input type="date"
                              onChange={(e) => handleInputChange("model", "date_naissance", e.target.value)}
                            placeholder="Date de naissance" style={styles.input} />
                          </div>
                        </div>
                      </div>
                      
                      
                      <div style={styles.formGroup}>
                        <label>Email :</label>
                        <input type="email"
                          onChange={(e) => handleInputChange("model", "email", e.target.value)}
                        placeholder="Email" style={styles.input} />
                      </div>
                      <div style={styles.formGroup}>
                        <label>Numéro de carte d'identité :</label>
                        <input type="text"
                          onChange={(e) => handleInputChange("model", "cdi", e.target.value)}
                        placeholder="cdi" style={styles.input} />
                      </div>
                      <Locations
                                inputdata ={{ 
                                              pays_name : 'pays',
                                              ville_name: 'ville',
                                              quartier_name: 'quartier'
                                }} 
                                  onChange={handleLocationChange}
                                                                                                  
                                                                                            
                          />
                           <div ref={elementRef}>
                                                           <div style={styles.formGroup}>
                                                               <label>Téléphone 1 : </label>
                                                               <PhoneInput
                                                                                                      className="input_value"
                                                                                                                                                                                     id="phone1"
                                                                                                                                                                                        defaultCountry="tg"
                                                                                                                                                                                           autoComplete = "off"
                                                                                                                                                                                           name="phone1"
                                                                                                                                                                                           value={phone1}
                                                                                                                                                                                           onChange={(phone1) => setPhone1(phone1)}
                                                                                                                                                                                         />
                                                             </div>
                                                              <div style={styles.formGroup}>
                                                                       <label>Téléphone 2 : </label>
                                                                    <PhoneInput
                                                                                                                 className="input_value"
                                                                                                                                                                                         id="phone2"
                                                                                                                                                                                               defaultCountry="tg"
                                                                                                                                                                                               autoComplete = "off"
                                                                                                                                                                                               name="phone2"
                                                                                                                                                                                               value={phone2}
                                                                                                                                                                                               onChange={(phone2) => setPhone2(phone2)}
                                                                                                                                                                                             />
                                                                                     
                                                                     </div>
                           
                                                     </div>
                      <div style={styles.formGroup}>
                        <label>Indication :</label>
                        <input type="text"
                          onChange={(e) => handleInputChange("model", "indication", e.target.value)}
                        placeholder="Indication" style={styles.input} />
                      </div>
                      <label
             className="input_label"
             >
                <span>
                Taille  
                </span>
                <div className="float_data input-taille ">
                <input type="number" id="taille_m"
                  value={taille_m}
                  onChange={(e) => settaille_m(e.target.value)}
                   name="taille_m" min="0" max = "2" placeholder="m" required/>
                <span>m</span>
                <input type="number" id="taille_cm"
                  value={taille_cm}
                  onChange={(e) => settaille_cm(e.target.value)}
                   name="taille_cm" min="0" max="99" placeholder="cm" required/>
                <span>cm</span>

            </div>
            
            
            </label>

            <div className="mannequin_category_container">
      <label className="mr-3">Catégories du mannequin</label>
      <label>
    <input
      type="checkbox"
      value="podium"
      checked={formData.model.categories_mannequin.includes("podium")}
      onChange={handlemannequin_CategoryChange}
    />
    Podium
  </label>
  <br />
  <label>
    <input
      type="checkbox"
      value="photo"
      checked={formData.model.categories_mannequin.includes("photo")}
      onChange={handlemannequin_CategoryChange}
    />
    Photo
  </label>
  <br />
  <label>
    <input
      type="checkbox"
      value="clip"
      checked={formData.model.categories_mannequin.includes("clip")}
      onChange={handlemannequin_CategoryChange}
    />
    Clip
  </label>
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
        <>
        <div style={styles.modalOverlay}>
         {/* Bouton Fermer */}
       
        <div style={styles.modalContent}>
          <button onClick={ModalUpdateClose} style={styles.closeButton}>
           X
         </button>
         <h2 style={{fontSize : "18px" , textAlign : "center"}}>Modifier mannequin </h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();


              console.log("selectedModel")
              console.log(selectedModel)

              // return false;
              const all_images = []

              selectedModel.taille = tailleMSelect + "," + tailleCmSelect;
              selectedModel.poids = 0;

              const telnum1 = document.querySelector(".react-international-phone-input[name='num1']").value.trim();
              const telnum2 = document.querySelector(".react-international-phone-input[name='num2']").value.trim();
              
              const number1 = telnum1.split(" ");
              const number2 = telnum2.split(" ");
              
              selectedModel.code_1 = number1[0];
              selectedModel.tel1 = number1.slice(1).join(" ");
              
              selectedModel.code_2 = number2[0];
              selectedModel.tel2 = number2.slice(1).join(" ");
              
              if(imagePreview != `${apiUrl}/${selectedModel.paths.path_mm}` && imagePreview != `${apiUrl}/${selectedModel.paths.path_md}` ){
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
              
        //  console.log('param')
        //         console.log(selectedModel, all_images,locationData)
        //         return false;
                const response = await axios.post(
                  `${apiUrl}/fashion_model/updateModel`,
                  { selectedModel, all_images,locationData }
                );
            
                console.log(response)
                // return false;
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

            <div className="row" style={{margin : 0, padding : 0}}>
                    <div style={styles.formGroup}>
                        <label>Nom :</label>
                        <input type="text"
                          value={selectedModel.nom}
                          onChange={(e) => setSelectedModel({ ...selectedModel, nom: e.target.value })}                        placeholder="nom" 
                        style={styles.input} />
                  </div>

                    <div style={styles.formGroup}>
                        <label>prenom :</label>
                        <input type="text"
                          value={selectedModel.prenom}
                          onChange={(e) => setSelectedModel({ ...selectedModel, prenom: e.target.value })}                      
                        placeholder="prénom" style={styles.input} />
                  </div>

                  
                </div>


                <div className="row">
                        <div className="col-6">
                            <div style={styles.formGroup}>
                              <label>pseudo :</label>
                              <input type="text"
                                value={selectedModel.pseudo}
                                onChange={(e) => setSelectedModel({ ...selectedModel, pseudo: e.target.value })}  
                          
                              placeholder="pseudo " style={styles.input} />
                          </div>
                        </div>
                        <div className="col-6">
                          <div style={styles.formGroup}>
                            <label>Date de naissance : </label>
                            <input type="date"
                              value={selectedModel.date_naissance?selectedModel.date_naissance.split('T')[0]:""}
                              onChange={(e) => setSelectedModel({ ...selectedModel, date_naissance: e.target.value })}  
                            placeholder="Date de naissance" style={styles.input} />
                          </div>
                        </div>
                      </div>
                      
                      
                      <div style={styles.formGroup}>
                        <label>Email : </label>

                        <input type="email"
                         value={selectedModel.adresse_email}
                         onChange={(e) => setSelectedModel({ ...selectedModel, adresse_email: e.target.value })}  
                        placeholder="Email" style={styles.input} />
                      </div>
                      <div style={styles.formGroup}>
                        <label>Numéro de carte d'identité :</label>
                        <input type="text"
                         value={selectedModel.cdi}
                         onChange={(e) => setSelectedModel({ ...selectedModel, cdi: e.target.value })}  
                        placeholder="cdi" style={styles.input} />
                      </div>

                      <div ref={elementRef}>
                                                      <div style={styles.formGroup}>
                                                          <label>Téléphone 1 : </label>
                                                          <PhoneInput
                                                                                                 className="input_value"
                                                                                                                                                                                id="num1"
                                                                                                                                                                                   defaultCountry="tg"
                                                                                                                                                                                      autoComplete = "off"
                                                                                                                                                                                      name="num1"
                                                                                                                                                                                      value={num1}
                                                                                                                                                                                      onChange={(num1) => setNum1(num1)}
                                                                                                                                                                                    />
                                                        </div>
                                                         <div style={styles.formGroup}>
                                                                  <label>Téléphone 2 : </label>
                                                               <PhoneInput
                                                                                                            className="input_value"
                                                                                                                                                                                    id="num2"
                                                                                                                                                                                          defaultCountry="tg"
                                                                                                                                                                                          autoComplete = "off"
                                                                                                                                                                                          name="num2"
                                                                                                                                                                                          value={num2}
                                                                                                                                                                                          onChange={(num2) => setNum2(num2)}
                                                                                                                                                                                        />
                                                                                
                                                                </div>
                      
                                                </div>


                                                {paysSelected && villeSelected && paysSelected[0] && villeSelected[0] ? (
                          <div className="text-center">
                            <p className="text-danger">
                              {paysSelected[0].nom} --- {villeSelected[0].nomville}
                            </p>
                          </div>
                        ) : (
                          <></>
                        )}
                      
                      {selectedModel && <>
                        <Locations
                           inputdata ={{ 
                            pays_name : locationData?.pays,
                            ville_name: locationData?.ville,
                            quartier_name: locationData?.quartier
                          }} 
                          
                          onChange={handleLocationChangeU}
                        />
                      </>}
                            
                      <div style={styles.formGroup}>
                        <label>Indication :</label>
                        <input type="text"
                          value={selectedModel.indication}
                          onChange={(e) => setSelectedModel({ ...selectedModel, indication: e.target.value })} 
                        placeholder="Indication" style={styles.input} />
                      </div>

                      <label
                          className="input_label"
                          >
                              <span>
                              Taille  
                              </span>
                              <div className="float_data input-taille ">
                                <input type="number" id="taille_m"
                                  value={tailleMSelect}
                                  onChange={(e) => setTailleMSelect(e.target.value)}
                                  name="taille_m" min="0" max = "2" placeholder="m" required/>
                                <span>m</span>
                                <input type="number" id="taille_cm"
                                  value={tailleCmSelect}
                                  onChange={(e) => setTailleCmSelect(e.target.value)}
                                  name="taille_cm" min="0" max="99" placeholder="cm" required/>
                                <span>cm</span>
                            </div>            
                     </label>

                     <div className="mannequin_category_container">
      <label className="mr-3">Catégories du mannequin</label>
      <label>
    <input
      type="checkbox"
      value="podium"
      checked={formData.model.categories_mannequin.includes("podium")}
      onChange={handlemannequin_CategoryChange}
    />
    Podium
  </label>
  <br />
  <label>
    <input
      type="checkbox"
      value="photo"
      checked={formData.model.categories_mannequin.includes("photo")}
      onChange={handlemannequin_CategoryChange}
    />
    Photo
  </label>
  <br />
  <label>
    <input
      type="checkbox"
      value="clip"
      checked={formData.model.categories_mannequin.includes("clip")}
      onChange={handlemannequin_CategoryChange}
    />
    Clip
  </label>
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

export default FashionModelMgt;
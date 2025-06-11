import React, { useState ,useRef,useEffect } from 'react';

import moment from 'moment';
import requestPermission from '../../sevices/NotificationService.js';
import { useAuth } from "../../Context/AuthenticateContext.jsx";
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate , useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FaWhatsapp, FaTelegram } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Locations from '../../Components/Locations_models';
// import Locations from './Components/Locations_models';
import axios from 'axios' 
import { motion } from "framer-motion";

function Business() {
  const navigate = useNavigate();
     const location = useLocation();
         const auth = useAuth(); 
           const user_info = auth.currentUser; 
           const [auth_Ids, setAuth_ids] = useState({
            auth: {
              pseudo: "",
              pass: "",
             
            }   }); 
               
    const [code_pays, setcode_pays] = useState("+228");
    const [code_pays_b, setcode_pays_b] = useState("+228");
    const [isSucess, setisSucess] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumber_b, setPhoneNumber_b] = useState("");
  const [afrodites_services, setAfrodites_services] = useState("");
//   const [code_pays, setcode_pays] = useState("+228");
    //  const [selectedCategories_rx, setSelectedCategories_rx] = useState([]); // Liste des catégories sélectionnées
       const [isOpen_rx, setIsOpen_rx] = useState(false); // Etat pour gérer l'ouverture/fermeture du dropdown
       const dropdownRef_rx = useRef(null);
       const [isOpen_rx_b, setIsOpen_rx_b] = useState(false); // Etat pour gérer l'ouverture/fermeture du dropdown
       const dropdownRef_rx_b = useRef(null);

       const apiUrl = 'https://apiafro.aafrodites.com'
  
      //  const formatServiceData = (rawData) => {
      //   const result = {};
      //   rawData.forEach(item => {
      //     const id = item.id_services;
      //     if (!result[id]) {
      //       result[id] = {
      //         libelle: item.libelle,
      //         subcategories: []
      //       };
      //     }
      //     result[id].subcategories.push(item.sous_serv_libelle);
      //   });
      //   return result;
      // };

      const formatServiceData = (rawData) => {
        const result = {};
        rawData.forEach(item => {
          const id = item.id_services;
          if (!result[id]) {
            result[id] = {
              libelle: item.libelle,
              subcategories: []
            };
          }
          result[id].subcategories.push({
            id: item.sous_serv_afro,
            libelle: item.sous_serv_libelle
          });
        });
        return result;
      };
      
      // const closeMsg = () => setisSucess(false);
      const closeMsg = () => {
        setisSucess(false);
        navigate("/profile"); // remplace par le chemin voulu
      };
       useEffect(() => {
        const fetchData = async () => {
         
          try {
            // setLoading(true); // Active le loader
           
                const rep1 = await axios.get(`${apiUrl}/afrodites_services/all_sous_services`);
                   console.log("rep1")
                   console.log(rep1)

                  
                 setAfrodites_services(formatServiceData(rep1.data));
           
          } catch (err) {
            console.log(err);
          
          }finally {
            console.log("end of operation")
            // setLoading(false); // Désactive le loader
          }
        };
        fetchData();
      } , []);
    //    récupérer liste des services d'afrodites
    const initServices = (formatted) => {
        const state = {};
        Object.keys(formatted).forEach((id) => {
          state[id] = {
            active: false,
            selected: []
          };
        });
        return state;
      };
      

       const [formData, setFormData] = useState({
        representative: {
          firstName: "",
          lastName: "",
          position: "",
          email: "",
          telephone: "",
          indicatif_phone: "",
          whatsapp: "", 
          for_whatsapp: false,
          indicatif_telegram: "",
          telegram: "",
          for_telegram: false,
          pays: "",
          ville: "",
          indication: ""  
        },
        business: {
          companyName: "",
          registrationNumber: "",
          type: "",
          taxId: "",
          email: "",
          telephone: "",
          indicatif_phone: "",
          whatsapp: "", 
          for_whatsapp: false,
          indicatif_telegram: "",
          telegram: "",
          for_telegram: false,
          website: "",
          pays: "",
          ville: "",
          indication: "",
          address: {
            pays: "",
            ville: ""
          }
        },
        services: {
            1: { active: false, selected: [] },
            2: { active: false, selected: [] },
            3: { active: false, selected: [] },
            4: { active: false, selected: [] },
          }
          
      });
      
//   const [formData, setFormData] = useState({
//     representative: {
//       firstName: "",
//       lastName: "",
//       position: "",
//       email: "",
//       telephone: "",
//       indicatif_phone: "",
//       whatsapp: "", 
      
//       for_whatsapp : false,
//        indicatif_telegram: "",
//        telegram: "",
//        for_telegram : false,
//        pays: "",
//        ville: "",
//       indication:"",  
//     },
//     business: {
//       companyName: "",
//       registrationNumber: "",
//       type : "",
//       taxId: "",
//       email: "",
//       telephone: "",
//       indicatif_phone: "",
//       whatsapp: "", 
//       for_whatsapp : false,
//        indicatif_telegram: "",
//        telegram: "",
//        for_telegram : false,
    
//       website: "",
//       pays: "",
//        ville: "",
//       indication:"",
//       address: {
//         pays: "",
//         ville: "",
//       }
//     },
//     services: {
//       modelCasting: false,
//       photoShooting: false,
//       eventHosting: false,
//       influencerMarketing: false,
//       brandAmbassador: false,
//       fashionShow: false,
//     }
//   });
//   const serviceOptions = {
//     modelCasting: {
//       label: "Casting de mannequins",
//       subcategories: ["Débutant", "Professionnel", "Enfants"]
//     },
//     photoShooting: {
//       label: "Séances photo professionnelles",
//       subcategories: ["Mode", "Produit", "Corporate"]
//     },
//     eventHosting: {
//       label: "Hôtesses pour événements",
//       subcategories: ["Salon", "Mariage", "Soirée VIP"]
//     },
//     influencerMarketing: {
//       label: "Marketing d'influence",
//       subcategories: ["Instagram", "TikTok", "YouTube"]
//     },
//     brandAmbassador: {
//       label: "Ambassadeurs de marque",
//       subcategories: ["Cosmétiques", "Mode", "Technologie"]
//     },
//     fashionShow: {
//       label: "Organisation de défilés",
//       subcategories: ["Haute couture", "Prêt-à-porter", "Streetwear"]
//     }
//   };

console.log("afrodites_services")
console.log(afrodites_services)
const serviceOptions = {
    modelCasting: {
      label: "Casting de mannequins",
      subcategories: ["Débutant", "Professionnel", "Enfants"]
    },
    photoShooting: {
      label: "Séances photo professionnelles",
      subcategories: ["Mode", "Produit", "Corporate"]
    },
    eventHosting: {
      label: "Hôtesses pour événements",
      subcategories: ["Salon", "Mariage", "Soirée VIP"]
    },
    influencerMarketing: {
      label: "Marketing d'influence",
      subcategories: ["Instagram", "TikTok", "YouTube"]
    },
    brandAmbassador: {
      label: "Ambassadeurs de marque",
      subcategories: ["Cosmétiques", "Mode", "Technologie"]
    },
    fashionShow: {
      label: "Organisation de défilés",
      subcategories: ["Haute couture", "Prêt-à-porter", "Streetwear"]
    }
  };
  
//   const handleSubcategoryToggle = (categoryKey, subcategory) => {
//     setFormData((prev) => {
//       const current = prev.services[categoryKey] || [];
//       const updated = current.includes(subcategory)
//         ? current.filter((item) => item !== subcategory)
//         : [...current, subcategory];
  
//       return {
//         ...prev,
//         services: {
//           ...prev.services,
//           [categoryKey]: updated
//         }
//       };
//     });
//   };
    
// const toggleService = (id) => {
//     setFormData(prev => ({
//       ...prev,
//       services: {
//         ...prev.services,
//         [id]: {
//           ...prev.services[id],
//           active: !prev.services[id].active,
//           selected: !prev.services[id].active ? prev.services[id].selected : []
//         }
//       }
//     }));
//   };
  
//   const toggleSubcategory = (id, sub) => {
//     setFormData(prev => {
//       const selected = prev.services[id].selected;
//       const updated = selected.includes(sub)
//         ? selected.filter(s => s !== sub)
//         : [...selected, sub];
//       return {
//         ...prev,
//         services: {
//           ...prev.services,
//           [id]: {
//             ...prev.services[id],
//             selected: updated
//           }
//         }
//       };
//     });
//   };
  
const toggleService = (id) => {
  setFormData(prev => ({
    ...prev,
    services: {
      ...prev.services,
      [id]: {
        ...prev.services[id],
        active: !prev.services[id]?.active,
        selected: !prev.services[id]?.active ? prev.services[id]?.selected : []
      }
    }
  }));
};

const toggleSubcategory = (serviceId, subId) => {
  setFormData(prev => {
    const selected = prev.services[serviceId].selected;
    const updated = selected.includes(subId)
      ? selected.filter(id => id !== subId)
      : [...selected, subId];
    return {
      ...prev,
      services: {
        ...prev.services,
        [serviceId]: {
          ...prev.services[serviceId],
          selected: updated
        }
      }
    };
  });
};

    useEffect(() => {
     
      const handleClickOutside_rx = (event) => {
        if (dropdownRef_rx.current && !dropdownRef_rx.current.contains(event.target)) {
          setIsOpen_rx(false);
        }
        
      };
  
      document.addEventListener("mousedown", handleClickOutside_rx);
   
       return () => document.removeEventListener("mousedown", handleClickOutside_rx);
    }, []);
  
    useEffect(() => {
      
     
        const handleClickOutside_rx_b = (event) => {
          if (dropdownRef_rx_b.current && !dropdownRef_rx_b.current.contains(event.target)) {
            setIsOpen_rx_b(false);
          }
          
        };
    
        document.addEventListener("mousedown", handleClickOutside_rx_b);
        return () => document.removeEventListener("mousedown", handleClickOutside_rx_b);
      }, []);
    
      const prepareServicesForSubmission = () => {
        const result = [];
        Object.entries(formData.services).forEach(([serviceId, { active, selected }]) => {
          if (active) {
            selected.forEach(subId => {
              result.push({
                serviceId: parseInt(serviceId),
                subServiceId: subId
              });
            });
          }
        });
        return result;
      };
      
   // Gestion du changement de téléphone
   const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setFormData((prev) => ({
      ...prev,
      representative: {
        ...prev.representative,
        // indicatif_phone: "00" + phone_ind,
        telephone: value,
      },
    }));
  };

  const handlePhoneChange_b = (e) => {
    const value = e.target.value;
    setPhoneNumber_b(value);
    setFormData((prev) => ({
      ...prev,
      business: {
        ...prev.business,
        // indicatif_phone: "00" + phone_ind,
        telephone: value,
      },
    }));
  };


// Liste des catégories d'options disponibles
const categoriesList_rx = [
  { id: "whatsapp",ids: "whatsapp_id", label: "WhatsApp", icon: <FaWhatsapp className="text-green-500 ml-2" /> },
  { id: "telegram",ids: "telegram_id", label: "Telegram", icon: <FaTelegram className="text-blue-500 ml-2" /> },
  { id: "signal",ids: "signal_id", label: "Signal", icon: <img src="/assets/img/msg/signal.jpeg" className="brand_icon" alt="Signal" /> },
  { id: "viber",ids: "viber_id", label: "Viber", icon: <img src="/assets/img/msg/viber.jpeg" className="brand_icon" alt="Viber" /> }

];

const [selectedOptions_rx, setSelectedOptions_rx] = useState([]);
const [dropdownDirection, setDropdownDirection] = useState("right");
 
useEffect(() => {
  setSelectedOptions_rx([]);
}, []);


const categoriesList_rx_b = [
    { id: "whatsapp",ids: "whatsapp_id", label: "WhatsApp", icon: <FaWhatsapp className="text-green-500 ml-2" /> },
    { id: "telegram",ids: "telegram_id", label: "Telegram", icon: <FaTelegram className="text-blue-500 ml-2" /> },
    { id: "signal",ids: "signal_id", label: "Signal", icon: <img src="/assets/img/msg/signal.jpeg" className="brand_icon" alt="Signal" /> },
    { id: "viber",ids: "viber_id", label: "Viber", icon: <img src="/assets/img/msg/viber.jpeg" className="brand_icon" alt="Viber" /> }
  
  ];
  
  const [selectedOptions_rx_b, setSelectedOptions_rx_b] = useState([]);
  const [dropdownDirection_b, setDropdownDirection_b] = useState("right");
   
  useEffect(() => {
    setSelectedOptions_rx_b([]);
  }, []);

  
const handleCheckboxChange_R = (id, network) => {
    console.log("handledata");
  console.log(id)
  console.log(network)
  console.log(selectedOptions_rx)
    if (selectedOptions_rx.includes(network)) {
      // Désélectionner l'option
      setSelectedOptions_rx([]);
      setFormData((prevData) => {
        const updatedFormData = { ...prevData };
        if (network === "whatsapp") {
          updatedFormData.representative.for_whatsapp = false;
        } else if (network === "telegram") {
          updatedFormData.representative.for_telegram = false;
        } else {
          updatedFormData.representative.for_other = {
            ...updatedFormData.representative.for_other,
            [network]: false,
          };
        }
        return updatedFormData;
      });
    } else {
      // Sélectionner uniquement cette option
      setSelectedOptions_rx([network]);
      setFormData((prevData) => {
        const updatedFormData = { ...prevData };
        if (network === "whatsapp") {
          updatedFormData.representative.for_whatsapp = true;
        } else if (network === "telegram") {
          updatedFormData.representative.for_telegram = true;
        } else {
          updatedFormData.representative.for_other = {
            ...updatedFormData.representative.for_other,
            [network]: true,
          };
        }
        return updatedFormData;
      });
    }
  };
  
  const handlePlusClick_rx = (e) => {
  
    e.preventDefault(); // Empêche la soumission du formulaire
  
    setIsOpen_rx(!isOpen_rx);
  
    if (dropdownRef_rx.current) {
  
      
    // alert('test')
  
      const dropdownRect = dropdownRef_rx.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      // alert(windowWidth)
      console.log("Dropdown position:", dropdownRect.right);
    
      console.log("Window width:", windowWidth);
   
      if (dropdownRect.right + 80 > windowWidth) {
        console.log("Switching to left");
        setDropdownDirection("left");
      } else {
        console.log("Keeping right");
        setDropdownDirection("right");
      }
    }
  };
  

  
const handleCheckboxChange_B = (id, network) => {
    console.log("handledata");
  console.log(id)
  console.log(network)
  console.log(selectedOptions_rx_b)
    if (selectedOptions_rx_b.includes(network)) {
      // Désélectionner l'option
      setSelectedOptions_rx_b([]);
      setFormData((prevData) => {
        const updatedFormData = { ...prevData };
        if (network === "whatsapp") {
          updatedFormData.business.for_whatsapp = false;
        } else if (network === "telegram") {
          updatedFormData.business.for_telegram = false;
        } else {
          updatedFormData.business.for_other = {
            ...updatedFormData.business.for_other,
            [network]: false,
          };
        }
        return updatedFormData;
      });
    } else {
      // Sélectionner uniquement cette option
      setSelectedOptions_rx_b([network]);
      setFormData((prevData) => {
        const updatedFormData = { ...prevData };
        if (network === "whatsapp") {
          updatedFormData.business.for_whatsapp = true;
        } else if (network === "telegram") {
          updatedFormData.business.for_telegram = true;
        } else {
          updatedFormData.business.for_other = {
            ...updatedFormData.business.for_other,
            [network]: true,
          };
        }
        return updatedFormData;
      });
    }
  };
  
  const handlePlusClick_rx_B = (e) => {
  
    e.preventDefault(); // Empêche la soumission du formulaire
  
    setIsOpen_rx_b(!isOpen_rx_b);
  
    if (dropdownRef_rx_b.current) {
  
      
    // alert('test')
  
      const dropdownRect = dropdownRef_rx_b.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      // alert(windowWidth)
      console.log("Dropdown position:", dropdownRect.right);
    
      console.log("Window width:", windowWidth);
   
      if (dropdownRect.right + 80 > windowWidth) {
        console.log("Switching to left");
        setDropdownDirection_b("left");
      } else {
        console.log("Keeping right");
        setDropdownDirection_b("right");
      }
    }
  };
  
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };
  const handleLocationChange = (data) => {
    setcode_pays(data?.code_pays);
    setFormData(prev => ({
      ...prev,
      representative: {
        ...prev.representative,
        pays: data.pays || "",
        ville: data.ville || "",
        indicatif_phone: data?.code_pays,
      
      } 
    }));
  };
  const handleLocationChange_b = (data) => {
    setcode_pays_b(data?.code_pays);
    setFormData(prev => ({
      ...prev,
      business: {
        ...prev.business,
        pays: data.pays || "",
        ville: data.ville || "",
        indicatif_phone: data?.code_pays,
     
        address: {
          pays: data.pays || "",
          ville: data.ville || "",
        }
      } 
    }));
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [service]: !prev.services[service]
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)

    // return false;
    const loadingToast = toast.info('Création du compte en cours...', {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });

    try {
      // Add your API call here
      const data_token = await requestPermission();
console.log("data_token")
console.log(data_token)

console.log(user_info)
const formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');

console.log("formattedDate"); 
console.log(formattedDate); // Exemple : 2025-01-14 15:45:30
const userid = user_info?.id;
console.log("userid")
console.log(userid)
// return false;


const list_services = prepareServicesForSubmission();

  // console.log(list_services)
  // return false;
const data_param = {
    user : userid,
    data: formData,
    list_services : list_services,
    // files : imgs_save,
    date : formattedDate,
    FCMtoken : data_token
  };

  console.log("data_param")
  console.log(data_param)
  await axios
  .post(`${apiUrl}/business/devenir_business`,
    data_param
    )
  .then((result) => {

// const list_services = prepareServicesForSubmission();
  console.log(result)
  // console.log(list_services)
  // return false;
      if(result){
         // Dismiss la notification de "sauvegarde en cours"
          toast.dismiss(loadingToast);
        
           if(result?.data?.old_user != ""){
             toast.info("votre compte business vient d'être activé avec succès", {
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
             
            //  setIsSubmitting(false); 

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
            // setIsModalOpen(true)

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
            //  setIsModalOpen(true)
            setisSucess(true)
            //  setIsSubmitting(false); 

                   }

           }

         //  }

        //   return false;
          // affciher une notif
          // setIsNotification(true)
      
        
          

         
      

      }
    }); 
  } catch (error) {
      toast.error('Une erreur est survenue', {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <>
      <ToastContainer className="toast_style"/>
      <div className="form_bg bg-white business_ihm">
        <button onClick={handleBackClick} className='back_cmoponent'>
          <FaChevronLeft size={20} />
        </button>

        <form autoComplete='off' className='candidature_form'>
          <div className="input_group first_zone">
            <div className="lbl_title w-100">vous êtes:</div>
            
            {/* Representative Information */}
            <div className="line_data_a">
              <div className="label_ttl">
                <label className="ext_label">vos</label>
              </div>
              <div className="inputs_container_a">
                <div className="half_col_a">
                  <input 
                    className="input_padding"
                    type="text"
                    placeholder="nom"
                    value={formData.representative.lastName}
                    onChange={(e) => handleInputChange("representative", "lastName", e.target.value)}
                  />
                </div>
                <div className="half_col_a">
                  <input
                    className="input_padding"
                    type="text"
                    placeholder="prénom(s)"
                    value={formData.representative.firstName}
                    onChange={(e) => handleInputChange("representative", "firstName", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="line_data_a">
              <div className="inputs_container_a">
                <div className="half_col_a">
                  <input 
                    className="input_padding"
                    type="email"
                    placeholder="votre email"
                    value={formData.representative.email}
                    onChange={(e) => handleInputChange("representative", "email", e.target.value)}
                  />
                </div>
                <div className="half_col_a">
                  <input 
                    className="input_padding"
                    type="text"
                    placeholder="fonction dans l'entreprise"
                    value={formData.representative.position}
                    onChange={(e) => handleInputChange("representative", "position", e.target.value)}
                  />
                </div>
            
              </div>
            </div>

            
            <div className="line_data_a">
              <Locations 
                className="inline_zone"
                inputdata={{ 
                  pays_name: 'pays',
                  ville_name: 'ville',
                }} 
                onChange={handleLocationChange} 
              />
            </div>

              <div className="line_data_a">
                     <div className="label_ttl">
                              <label className="ext_label">
                              <FontAwesomeIcon icon={faPhone} />
            
                              </label>
                          </div>
                         <div className="full_col">
                      
                      <div className="half_col_a number_container">
                      <div className="number_zone ">
            
            <div className="indicatif">
            
            <input type="text" 
            className="indicatif input_padding" 
            placeholder="code"
            value={code_pays} 
            onChange={(e) => setcode_pays(e.target.value)} />
            
            </div>
            
            <div className="tel_number">
            
            <input type="tel" className="contact input_padding" placeholder="numéro"
                value={phoneNumber} onChange={handlePhoneChange}  />
               
            </div>
            
             </div>
                      </div>
                        <div className="half_col_a number_uses_container">
                        <div className="n_label sm_height">
                          <label className="ext_label ">
                            utilisé sur
                          </label>
                        
                        </div>
                  <div className="number_uses_zone sm_height">
                   
            
                   <div className="bottom_data">
                   <div className="icon_zone">
                {/* WhatsApp checkbox */}
                {selectedOptions_rx.length === 0 || selectedOptions_rx.includes("whatsapp") ? (
                  <div className="rxsx_chk">
                    <input
                      type="checkbox"
                      checked={selectedOptions_rx.includes("whatsapp")}
                      onChange={() => handleCheckboxChange_R("whatsapp_id", "whatsapp")}
                      className="mr-2"
                    />
                    <FaWhatsapp className="text-green-500 ml-2" />
                  </div>
                ) : null}
            
                {/* Autres catégories */}
                {selectedOptions_rx
                  .filter((id) => id !== "whatsapp")
                  .map((id) => {
                    const category = categoriesList_rx.find((cat) => cat.id === id);
                    return (
                      <div key={category.id} className="rxsx_chk">
                        <input
                          type="checkbox"
                          checked
                          onChange={() => handleCheckboxChange_R(category.ids , category.id)}
                          className="mr-2"
                        />
                        {category.icon} 
                      </div>
                    );
                  })}
            
                {/* Bouton dropdown visible SEULEMENT si rien n'est coché */}
                {selectedOptions_rx.length === 0 && (
                  <div className="dropdown_box">
                    <div className="dropdown" ref={dropdownRef_rx}>
                      <button className="dropdown-toggle" onClick={handlePlusClick_rx}>
                       <span>autres</span>  
                      </button>
            
                      {isOpen_rx && (
                        <div className={`dropdown-menu ${dropdownDirection === "left" ? "left-align" : "right-align"}`}>
                          {categoriesList_rx.map((category) => (
                            <div key={category.id} className="dropdown-item">
                              <label>
                                <input
                                  type="checkbox"
                                  checked={selectedOptions_rx.includes(category.id)}
                                  onChange={() => handleCheckboxChange_R(category.ids , category.id)}
                                  // onChange={() => handleCheckboxChange_R(category.id)}
                                />
                                {category.icon} {category.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            
                   </div>
              
                       </div>
                      
                        </div>
                   
            
             
              
                        </div>
                        </div>
                   
          </div>

          <div className="input_group first_zone">
            <div className="lbl_title w-100">votre business:</div>
            
            {/* Representative Information */}
            <div className="line_data_a">
               <div className="inputs_container_a">
                <div className="half_col_a">
                  <input 
                    className="input_padding"
                    type="text"
                    placeholder="nom"
                    value={formData.business.companyName}
                    onChange={(e) => handleInputChange("business", "companyName", e.target.value)}
                  />
                </div>
                <div className="half_col_a">
                  <input
                    className="input_padding"
                    type="text"
                    placeholder="numéro d'enrégistrement"
                    value={formData.business.registrationNumber}
                    onChange={(e) => handleInputChange("business", "registrationNumber", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="line_data_a">
               <div className="inputs_container_a">
                <div className="half_col_a">
                <input 
                    className="input_padding"
                    type="text"
                    placeholder="type de business(sarl, sarlu,etc)"
                    value={formData.business.type}
                    onChange={(e) => handleInputChange("business", "type", e.target.value)}
                  />
               
                </div>
                <div className="half_col_a">
                  <input
                    className="input_padding"
                    type="text"
                    placeholder="email"
                    value={formData.business.email}
                    onChange={(e) => handleInputChange("business", "email", e.target.value)}
                  />
                </div>
              </div>
            </div>
 
            <div className="line_data_a">
              <Locations 
                className="inline_zone"
                inputdata={{ 
                  pays_name: 'pays',
                  ville_name: 'ville',
                }} 
                onChange={handleLocationChange_b} 
              />
            </div>

            <div className="line_data_a">
                     <div className="label_ttl">
                              <label className="ext_label">
                              <FontAwesomeIcon icon={faPhone} />
            
                              </label>
                          </div>
                         <div className="full_col">
                      
                      <div className="half_col_a number_container">
                      <div className="number_zone ">
            
            <div className="indicatif">
            
            <input type="text" 
            className="indicatif input_padding" 
            placeholder="code"
            value={code_pays_b} 
            onChange={(e) => setcode_pays_b(e.target.value)} />
            
            </div>
            
            <div className="tel_number">
            
            <input type="tel" className="contact input_padding" placeholder="numéro"
                value={phoneNumber_b} onChange={handlePhoneChange_b}  />
               
            </div>
            
             </div>
                      </div>
                        <div className="half_col_a number_uses_container">
                        <div className="n_label sm_height">
                          <label className="ext_label ">
                            utilisé sur
                          </label>
                        
                        </div>
                  <div className="number_uses_zone sm_height">
                   
            
                   <div className="bottom_data">
                   <div className="icon_zone">
                {/* WhatsApp checkbox */}
                {selectedOptions_rx_b.length === 0 || selectedOptions_rx_b.includes("whatsapp") ? (
                  <div className="rxsx_chk">
                    <input
                      type="checkbox"
                      checked={selectedOptions_rx_b.includes("whatsapp")}
                      onChange={() => handleCheckboxChange_B("whatsapp_id", "whatsapp")}
                      className="mr-2"
                    />
                    <FaWhatsapp className="text-green-500 ml-2" />
                  </div>
                ) : null}
            
                {/* Autres catégories */}
                {selectedOptions_rx_b
                  .filter((id) => id !== "whatsapp")
                  .map((id) => {
                    const category = categoriesList_rx_b.find((cat) => cat.id === id);
                    return (
                      <div key={category.id} className="rxsx_chk">
                        <input
                          type="checkbox"
                          checked
                          onChange={() => handleCheckboxChange_B(category.ids , category.id)}
                          className="mr-2"
                        />
                        {category.icon} 
                      </div>
                    );
                  })}
            
                {/* Bouton dropdown visible SEULEMENT si rien n'est coché */}
                {selectedOptions_rx_b.length === 0 && (
                  <div className="dropdown_box">
                    <div className="dropdown" ref={dropdownRef_rx_b}>
                      <button className="dropdown-toggle" onClick={handlePlusClick_rx_B}>
                       <span>autres</span>  
                      </button>
            
                      {isOpen_rx_b && (
                        <div className={`dropdown-menu ${dropdownDirection_b === "left" ? "left-align" : "right-align"}`}>
                          {categoriesList_rx_b.map((category) => (
                            <div key={category.id} className="dropdown-item">
                              <label>
                                <input
                                  type="checkbox"
                                  checked={selectedOptions_rx_b.includes(category.id)}
                                  onChange={() => handleCheckboxChange_B(category.ids , category.id)}
                                  // onChange={() => handleCheckboxChange_R(category.id)}
                                />
                                {category.icon} {category.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            
                   </div>
              
                       </div>
                      
                        </div>
                   
            
             
              
                        </div>
                        </div>
             
          </div>

          {/* Services Section */}
          <div className="mb-3 input_group snd_zone">
            <div className="lbl_title w-100">
              vous désirez
              <span className="mini_txt">(sélectionnez vos besoins)</span>
            </div>

            <div className="services_grid">
           
{Object.entries(afrodites_services).map(([id, { libelle, subcategories }]) => (
  <div key={id} className="service_item">
    <label className="flex items-center">
      <input
        type="checkbox"
        checked={formData.services[id]?.active}
        onChange={() => toggleService(id)}
        className="cursor-pointer"
      />
      <span className="font-medium label">{libelle}</span>
    </label>

    {formData.services[id]?.active && (
      <div className=" sub_zone">
        {subcategories.map(({ id: subId, libelle: subLabel }) => (
          <label key={subId} className="sub_label flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.services[id].selected.includes(subId)}
              onChange={() => toggleSubcategory(id, subId)}
              className="cursor-pointer"
            />
            <span>{subLabel}</span>
          </label>
        ))}
      </div>
    )}
  </div>
))}

</div>

            
            
          </div>

          <div className="my-3 pb-4 text-center">
            <button 
              onClick={handleSubmit}
              className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark"
            >
              Créer le compte
            </button>
          </div>
        </form>
      </div>

      {isSucess && (
        <div className="modal-overlay welcome_msg" style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }} onClick={closeMsg}>
          <motion.div
            className="modal-content_b"
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100vh", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >

            {/* <h3 className="mb-3"> vous voulez devenir une Afrodite...</h3> */}
             <h2 className="mb-3 text-center">
                 <label>Bravo!</label>
             </h2>
            <p className="text-center">votre compte business fut crée avec succès</p>

            <p className="text-center"> désormais vous pouvez:</p>
         
         <button onClick={closeMsg}>continuer<FontAwesomeIcon icon={faAnglesRight} /></button>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default Business;
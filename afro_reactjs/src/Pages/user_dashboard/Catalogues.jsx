// import React from 'react'
import  { useEffect, useState , useRef} from 'react'
import Tab from 'react-bootstrap/Tab';
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../../Context/AuthenticateContext";
import Tabs from 'react-bootstrap/Tabs';
import Header_banner from "../../Components/Header_banner"
import Footer from "../../Components/Footer"

import { Link , useLocation } from 'react-router-dom';
import image_a from "/assets/img/fs/vetements_default.jpeg"

import axios from 'axios'

import { format, addDays, subDays } from "date-fns";
import { fr } from "date-fns/locale"; // Importer la locale française
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faPlus  } from '@fortawesome/free-solid-svg-icons'

import { faTimes, faEdit , faVenusMars , faEye, faImage, faCalendar, faList,faPalette , faSortUp , faSortDown , faSort} from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dropdown, DropdownButton, Form } from "react-bootstrap";

// import Dropdown from 'react-bootstrap/Dropdown';
//  import MultiSelectDropdown from '../../Components/MultiSelectDropdown';
 // test de filtres


// Multi-select dropdown component with checkboxes
const MultiSelectDropdown = ({ title, options, selectedOptions, setSelectedOptions }) => {
 
  const handleOptionChange = (option) => {
    console.log("option")
    console.log(option)
    setSelectedOptions((prevSelected) => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter((item) => item !== option);
      } else {
        return [...prevSelected, option];
      }
    });
  };

  return (
    <DropdownButton  id = {`dropbtn_${title}`} title={title} className="custom_filter_label">
      <div style={{ padding: "3px" }}>
        {options.map((option) => (
          <Form.Check
            key={option?.id}
            type="checkbox"
            id={`${option?.label}-${option?.id}`}
            label={option?.label}
            checked={selectedOptions.includes(option.id)}
            onChange={() => handleOptionChange(option.id)}
          />
        ))}
      </div>
    </DropdownButton>
  );
};

// fin test de filtre

function Catalogues() {
 
    const apiUrl = 'https://fsapi.fashionecos.com'  
  
    axios.defaults.withCredentials = true;
        
    const auth = useAuth();
    const user_info = auth.currentUser 
    const userid = user_info?.id;
    const navigate = useNavigate() 

  
    const [isModalOpen, setModalOpen] = useState(false);

    const [selectedProducts, setSelectedProducts] = useState([]); 
    const [isMultiDeleted, setMultiDeleted] = useState(0);
    const [delete_id , setDelete_id] = useState([]); 
    const [list_descripteurs , setListdescripteurs] =  useState([]);
    
// descripteurs
 
const [AllColors, setAllColors] = useState([]);
 
const [AllEtats, setAllEtats] = useState([]);
const [AllMarquevet, setAllMarquevet] = useState([]);
const [AllMarqueacc, setAllMarqueacc] = useState([]);
const [AllMarquecosm, setAllMarquecosm] = useState([]);
const [AllMarquechev, setAllMarquechev] = useState([]);
const [AllClassevet, setAllClassevet] = useState([]);
const [AllClasseacc, setAllClasseacc] = useState([]);
const [AllClassecosm, setAllClassecosm] = useState([]);
const [AllClassechev, setAllClassechev] = useState([]);
 
// les tris et leurs paramètres
const [date_sortup , setdate_sortup] =  useState(null);
const [prix_sortup , setprix_sortup] =  useState(null);
const [qte_sortup , setqte_sortup] =  useState(null);
  

// les filteres

  // listes des filtres
  
  const [public_filter, setpublic_filter] = useState([]);
  const [categories_filter, setcategories_filter] = useState([]);
  const [genre_filter, setgenre_filter] = useState([]);
  const [couleur_filter, setcouleur_filter] = useState([]);
  const [age_filter, setage_filter] = useState([]);
  const [etat_filter, setetat_filter] = useState([]);

  // marques et classe=> désignations
  const [marqvetement_filter, setmarqvetement_filter] = useState([]); 
  const [marqaccessoire_filter, setmarqaccessoire_filter] = useState([]);
  const [marqchev_filter, setmarqchev_filter] = useState([]);
  const [marqcosm_filter, setmarqcosm_filter] = useState([]);

  const [classvetement_filter, setclassvetement_filter] = useState([]); 
  const [classaccessoire_filter, setclassaccessoire_filter] = useState([]);
  const [classchev_filter, setclasschev_filter] = useState([]);
  const [classcosm_filter, setclasscosm_filter] = useState([]);


  
const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="container_msg">
        <p>{message}</p>
        <div className="btn_list">

            <button onClick={onConfirm}>Confirmer</button>
            <button onClick={onCancel}>Annuler</button>
        </div>
       
      </div>
    </div>
  );
};
const Checkbox = ({ label, isChecked, onChange, id }) => {
  return (
    <div className="my_chk">
      <input
        type="checkbox"
        // id={id}
        checked={isChecked}
        onChange={onChange}
      />
     
      {/* <label htmlFor={id}>{label}</label> */}
    </div>
  );
};
 // liste des produits
 useEffect(() => {
          const params = {
            userid : userid 
          }
      
      const fetchData = async () => {
    
            try {
                // marqes

                 // vetement
                 if(AllMarquevet.length === 0){
                        
                  axios.post(`${apiUrl}/descripteurs/getMarque` , {
                    params: {
                    id: 1,

                    }
                    })
                    .then(response => {


                    // console.log(response.data);
                    var tab_data = [];
                    for(let i = 0; i < response.data.length; i++){ 
                    tab_data.push(
                    { value: response.data[i].idmarqvet, label: response.data[i].nommarqvet }
                    )

                    }
                    setAllMarquevet(tab_data)

                    })
                    .catch(error => console.error('echec de récupération de données', error));

               }
                // accessoire
                if(AllMarqueacc.length === 0){
                  axios.post(`${apiUrl}/descripteurs/getMarque` , {
                    params: {
                    id: 2,

                    }
                    })
                    .then(response => {


                    // console.log(response.data);
                    var tab_data = [];
                    for(let i = 0; i < response.data.length; i++){ 
                    tab_data.push(
                    { value: response.data[i].idmarqaccess , label: response.data[i].nommarqaccess }
                    )

                    }
                    setAllMarqueacc(tab_data)

                    })
                    .catch(error => console.error('echec de récupération de données', error));

       
               }

              
                // cosmetique
                if(AllMarquecosm.length === 0){
                  axios.post(`${apiUrl}/descripteurs/getMarque` , {
                    params: {
                    id: 3,

                    }
                    })
                    .then(response => {


                    // console.log(response.data);
                    var tab_data = [];
                    for(let i = 0; i < response.data.length; i++){ 
                    tab_data.push(
                    { value: response.data[i].idmarqcosm , label: response.data[i].nommarqcosm }
                    )

                    }
                    setAllMarquecosm(tab_data)

                    })
                    .catch(error => console.error('echec de récupération de données', error));

       
               }

              
                // cheveux
                if(AllMarquechev.length === 0){
                  axios.post(`${apiUrl}/descripteurs/getMarque` , {
                    params: {
                    id: 4,

                    }
                    })
                    .then(response => {


                    // console.log(response.data);
                    var tab_data = [];
                    for(let i = 0; i < response.data.length; i++){ 
                    tab_data.push(
                    { value: response.data[i].idmarqchev , label: response.data[i].nommarqchev }
                    )

                    }
                    setAllMarquechev(tab_data)

                    })
                    .catch(error => console.error('echec de récupération de données', error));

       
               }
                 // classes => designations
              
                        // vetement
                        if(AllClassevet.length === 0){
                          axios.post(`${apiUrl}/descripteurs/getDesignation`, {
                            params: {
                              id: 1
                            }
                          })
                        .then(response => {
                          //  console.log("response.data");
                          // console.log(response.data);
                        var tab_desig = [];
                        for(let i = 0; i < response.data.length; i++){ 
                            tab_desig.push(
                            { value: response.data[i].idclassvet, label: response.data[i].libelclassvet }
                            )
      
                        }
                        setAllClassevet(tab_desig)
      
                        })
                        .catch(error => console.error('echec de récupération de données', error));
                        
                       }
                                          
                      
                
                      // accessoire
                      if(AllClasseacc.length === 0){
                        axios.post(`${apiUrl}/descripteurs/getDesignation`, {
                          params: {
                            id: 2,
                            
                          }
                        })
                      .then(response => {
    
    
                      // console.log(response.data);
                      var tab_desig = [];
                      for(let i = 0; i < response.data.length; i++){ 
                          tab_desig.push(
                          { value: response.data[i].idclasacces , label: response.data[i].libelclassacces }
                          )
    
                      }
                      setAllClasseacc(tab_desig)
    
                      })
                      .catch(error => console.error('echec de récupération de données', error));
                
             
                     }
                  
                   
                      // cosmetique
                      if(AllClassecosm.length === 0){
                        axios.post(`${apiUrl}/descripteurs/getDesignation` , {
                          params: {
                            id: 3,
                            
                          }
                        })
                      .then(response => {
    
    
                      // console.log(response.data);
                      var tab_desig = [];
                      for(let i = 0; i < response.data.length; i++){ 
                          tab_desig.push(
                          { value: response.data[i].idclasscosm , label: response.data[i].libelclasscosm }
                          )
    
                      }
                      setAllClassecosm(tab_desig)
    
                      })
                      .catch(error => console.error('echec de récupération de données', error));
                  
                     }
                  
                     
                      // cheveux
                      if(AllClassechev.length === 0){
                        axios.post(`${apiUrl}/descripteurs/getDesignation` , {
                          params: {
                            id: 4,
                            
                          }
                        })
                      .then(response => {
    
    
                      // console.log(response.data);
                      var tab_desig = [];
                      for(let i = 0; i < response.data.length; i++){ 
                          tab_desig.push(
                          { value: response.data[i].idclasschev , label: response.data[i].libelclasschev }
                          )
    
                      }
                      setAllClassechev(tab_desig)
    
                      })
                      .catch(error => console.error('echec de récupération de données', error));
                
                     }
                  
                    

               // etat
               if(AllEtats.length === 0){
                axios.get(`${apiUrl}/descripteurs/getEtat`)
                .then(response => {
        
        
                  // console.log(response.data);
                  var tab_desig = [];
                  for(let i = 0; i < response.data.length; i++){ 
                    tab_desig.push(
                      { value: response.data[i].idetat, label: response.data[i].libeletat }
                    )
         
                  }
                  setAllEtats(tab_desig)
        
                })
                .catch(error => console.error('echec de récupération de données', error));
                
             }

              //  couleurs
               if(AllColors.length === 0){
                // get colors
                axios.get(`${apiUrl}/descripteurs/getCouleur`)
                .then(response => {
         
                  var tab_desig = [];
                  for(let i = 0; i < response.data.length; i++){ 
                    tab_desig.push(
                      { value: response.data[i].id, label: response.data[i].libcolor }
                    )
         
                  }
                  setAllColors(tab_desig)
        
                })
                .catch(error => console.error('echec de récupération de données', error));
     
     
             }
              if(list_descripteurs.length === 0){
                 //  liste des produits
                 var tab_filters = [];
                 var label_this = null;
                 const data_prod = await axios.post(`${apiUrl}/produits/getallproducts` , params);
                 var tab_descripteurs = [];
                   if(data_prod.data.length > 0){
                       
                       const list_vetem = data_prod?.data[0];
                       const list_acces = data_prod?.data[1];
                       const list_cosm = data_prod?.data[2];
                       const list_chev = data_prod?.data[3];
                       // console.log(list_vetem) 
                       //  console.log(list_acces)
                       //    console.log(list_cosm)
                       // console.log(list_chev)
   
                       for(let i=0; i< list_vetem.length ; i++){
                         tab_descripteurs.push(list_vetem[i])
                       }
           
                       for(let i=0; i< list_acces.length ; i++){
                         tab_descripteurs.push(list_acces[i])
                       }
           
                       for(let i=0; i< list_cosm.length ; i++){
                         tab_descripteurs.push(list_cosm[i])
                       }
           
                       for(let i=0; i< list_chev.length ; i++){
                         tab_descripteurs.push(list_chev[i])
                       }
           
                       // setListdescripteurs(tab_descripteurs)
           
                       const sortedProducts = [...tab_descripteurs].sort((a, b) => b.Mle_biens - a.Mle_biens);
                       const DataVetements = sortedProducts.filter((product) => product.type_bien === 1);
                       const DataAccessoires =  sortedProducts.filter((product) => product.type_bien === 2);
                       const DataCosm =  sortedProducts.filter((product) => product.type_bien === 3);
                       const DataChev =  sortedProducts.filter((product) => product.type_bien === 4);
           
                       console.log('sortedProducts')
                       console.log(DataVetements)
                       console.log(DataAccessoires)
                       console.log(DataCosm)
                       console.log(DataChev)
                       setListdescripteurs(sortedProducts);
   
                     
                      //  les data des filtres
                        // if(list_descripteurs.length > 0){
                          const visibility = [...new Set(sortedProducts.map((p) => p?.public))]; 
                          const catego = [...new Set(sortedProducts.map((p) => p?.type_bien))];
                          const genres = [...new Set(sortedProducts.map((p) => p.genre))];
                          const etats = [...new Set(sortedProducts.map((p) => p.etat))];
                          const ages = [...new Set(sortedProducts.map((p) => p.age))];
                          const couleurs = [...new Set(sortedProducts.map((p) => p.coloris))];

                    
                          const classeVet = [...new Set(DataVetements.map((p) => p.classe))];
                          const classeAcces = [...new Set(DataAccessoires.map((p) => p.classe))];
                          const classeChev = [...new Set(DataCosm.map((p) => p.classe))];
                          const classeCosm = [...new Set(DataChev.map((p) => p.classe))];

                          const marqueVet = [...new Set(DataVetements.map((p) => p.marque))];
                          const marqueAcces = [...new Set(DataAccessoires.map((p) => p.marque))];
                          const marqueCosm = [...new Set(DataCosm.map((p) => p.marque))];
                          const marqueChev = [...new Set(DataChev.map((p) => p.marque))];
                         
                        
                        

                          
                            if(visibility.length > 0){
                              console.log('test label')
                              // listing des valeurs des filtres
                                                      // etat de visibilité du produit
                              
                                                    
                                          
                                                      
                                                
                                                        for(let i= 0; i < visibility.length; i++){
                                                          var label_this = null;
                                                
                                                          if(visibility[i] === 1){
                                                            label_this = 'publié';
                                                
                                                
                                                          }
                                                          else if(visibility[i] === 2){
                                                            label_this = 'publiable';
                                                
                                                          }
                                                          else if(visibility[i] === 0){
                                                            label_this = 'non publiable';
                                                            
                                                          }
                                                
                                                          tab_filters.push({
                                                            id : visibility[i],
                                                            label : label_this
                                                          })
                                                
                                                        }
                                                        
                                                        // console.log(tab_filters)
                                                        setpublic_filter(tab_filters)
                        
                                                        console.log(public_filter)
                                                
                                                      
                            }
                           

                           // catégories
                            if(catego.length > 0){
                              // console.log(public_state)
                              tab_filters = [];

                              for(let i= 0; i < catego.length; i++){
                                label_this = null;

                                if(catego[i] === 1){
                                  label_this = 'vêtements';


                                }
                                else if(catego[i] === 2){
                                  label_this = 'accessoires';

                                }
                                else if(catego[i] === 3){
                                  label_this = 'cosmétiques';
                                  
                                }
                                else if(catego[i] === 4){
                                  label_this = 'cheveux';
                                  
                                }

                                tab_filters.push({
                                  id : catego[i],
                                  label : label_this
                                })

                              }
                              

                              setcategories_filter(tab_filters)

                            }
                            else{
                              console.log('categorie  non trouvé')
                            }

                        // age 
                        if(ages.length > 0){
                              
                          tab_filters = [];

                        for(let i= 0; i < ages.length; i++){
                            label_this = null;

                          if(ages[i] === 1){
                            label_this = 'adulte';


                          }
                          else if(ages[i] === 2){
                            label_this = 'enfant';

                          }
                          
                          tab_filters.push({
                            id : ages[i],
                            label : label_this
                          })

                        }
                        

                        setage_filter(tab_filters)

                        }
                        else{
                        console.log('age non trouvé')
                        }

                        // genre du produit
                        if(genres.length > 0){
                          
                          tab_filters = [];

                        for(let i= 0; i < genres.length; i++){
                            label_this = null;

                          if(genres[i] === 1){
                            label_this = 'masculin';


                          }
                          else if(genres[i] === 2){
                            label_this = 'féminin';

                          }
                          else if(genres[i] === 3){
                            label_this = 'uni';
                            
                          }

                          tab_filters.push({
                            id : genres[i],
                            label : label_this
                          })

                        }
                        

                        setgenre_filter(tab_filters)

                        }
                        else{
                          console.log('genre  non trouvé')
                        }
                          // etats du produit
                          if(etats.length > 0){
                          
                            tab_filters = [];
                           
                            for(let i= 0; i < etats.length ; i++){
                              label_this = null;
                              for(let j= 0; j < AllEtats.length ; j++){
                              
                                if(AllEtats[j]?.value === etats[i]){
                                  label_this = AllEtats[j]?.label;

                                }
                              
                              }
                              tab_filters.push({
                                id : etats[i],
                                label : label_this
                              })
                              


                            }
 
                          
  
                            setetat_filter(tab_filters)
  
                          }
                           // couleur du produit
                           if(couleurs.length > 0){
                          
                            tab_filters = [];
                           
                            for(let i= 0; i < couleurs.length ; i++){
                              label_this = null;
                              for(let j= 0; j < AllColors.length ; j++){
                              
                                if(AllColors[j]?.value === couleurs[i]){
                                  label_this = AllColors[j]?.label;

                                }
                              
                              }
                              tab_filters.push({
                                id : couleurs[i],
                                label : label_this
                              })
                              


                            }
 
                          
  
                            setcouleur_filter(tab_filters)
  
                          }

                            // classe du produit
                            if(classeVet.length > 0){
                          
                              tab_filters = [];
                             
                              for(let i= 0; i < classeVet.length ; i++){
                                if(classeVet[i] != null){
                                  label_this = null;
                                  for(let j= 0; j < AllClassevet.length ; j++){
                                  
                                    if(AllClassevet[j]?.value === classeVet[i]){
                                      label_this = AllClassevet[j]?.label;
    
                                    }
                                  
                                  }

                                  tab_filters.push({
                                    id : classeVet[i],
                                    label : label_this
                                  })

                                }
                              
                                
  
  
                              }
   
                            
    
                              setclassvetement_filter(tab_filters)
    
                            }

                            if(classeAcces.length > 0){
                          
                              tab_filters = [];
                             
                              for(let i= 0; i < classeAcces.length ; i++){
                                if(classeAcces[i] != null){
                                  label_this = null;
                                  for(let j= 0; j < AllClasseacc.length ; j++){
                                  
                                    if(AllClasseacc[j]?.value === classeAcces[i]){
                                      label_this = AllClasseacc[j]?.label;
    
                                    }
                                  
                                  }
                                  tab_filters.push({
                                    id : classeAcces[i],
                                    label : label_this
                                  })

                                }
                              
                                
  
  
                              }
   
                            
    
                              setclassaccessoire_filter(tab_filters)
    
                            }

                            if(classeCosm.length > 0){
                          
                              tab_filters = [];
                             
                              for(let i= 0; i < classeCosm.length ; i++){
                                if(classeCosm[i] != null){
                                  label_this = null;
                                  for(let j= 0; j < AllClassecosm.length ; j++){
                                  
                                    if(AllClassecosm[j]?.value === classeCosm[i]){
                                      label_this = AllClassecosm[j]?.label;
    
                                    }
                                  
                                  }
                                  tab_filters.push({
                                    id : classeCosm[i],
                                    label : label_this
                                  })
                                  
                                }
                               
                                
  
  
                              }
   
                            
    
                              setclasscosm_filter(tab_filters)
    
                            }

                            if(classeChev.length > 0){
                          
                              tab_filters = [];
                             
                              for(let i= 0; i < classeChev.length ; i++){
                                if(classeChev[i] != null){
                                  label_this = null;
                                  for(let j= 0; j < AllClassechev.length ; j++){
                                  
                                    if(AllClassechev[j]?.value === classeChev[i]){
                                      label_this = AllClassechev[j]?.label;
    
                                    }
                                  
                                  }
                                  tab_filters.push({
                                    id : classeChev[i],
                                    label : label_this
                                  })
                                  
                                }
                               
                                
  
  
                              }
   
                            
    
                              setclasschev_filter(tab_filters)
    
                            }

                               // marque du produit
                               if(marqueVet.length > 0){
                          
                                tab_filters = [];
                               
                                for(let i= 0; i < marqueVet.length ; i++){
                                  if(marqueVet[i] != null){
                                    label_this = null;
                                    for(let j= 0; j < AllMarquevet.length ; j++){
                                    
                                      if(AllMarquevet[j]?.value === marqueVet[i]){
                                        label_this = AllMarquevet[j]?.label;
      
                                      }
                                    
                                    }
                                    tab_filters.push({
                                      id : marqueVet[i],
                                      label : label_this
                                    })
                                  
                                  }
                                 
                                  
    
    
                                }
     
                              
      
                                setmarqvetement_filter(tab_filters)
      
                              }
  
                              if(marqueAcces.length > 0){
                            
                                tab_filters = [];
                               
                                for(let i= 0; i < marqueAcces.length ; i++){
                                  if(marqueAcces[i] != null){
                                    label_this = null;
                                    for(let j= 0; j < AllMarqueacc.length ; j++){
                                    
                                      if(AllMarqueacc[j]?.value === marqueAcces[i]){
                                        label_this = AllMarqueacc[j]?.label;
      
                                      }
                                    
                                    }
                                    tab_filters.push({
                                      id : marqueAcces[i],
                                      label : label_this
                                    })
                                  
                                  }
                                 
                                  
    
    
                                }
     
                              
      
                                setmarqaccessoire_filter(tab_filters)
      
                              }
  
                              if(marqueCosm.length > 0){
                            
                                tab_filters = [];
                               
                                for(let i= 0; i < marqueCosm.length ; i++){
                                  if(marqueCosm[i] != null){
                                    label_this = null;
                                    for(let j= 0; j < AllMarquecosm.length ; j++){
                                    
                                      if(AllMarquecosm[j]?.value === marqueCosm[i]){
                                        label_this = AllMarquecosm[j]?.label;
      
                                      }
                                    
                                    }
                                    tab_filters.push({
                                      id : marqueCosm[i],
                                      label : label_this
                                    })
                                  
                                  }
                                
                                  
    
    
                                }
     
                              
      
                                setmarqcosm_filter(tab_filters)
      
                              }
  
                              if(marqueChev.length > 0){
                            
                                tab_filters = [];
                               
                                for(let i= 0; i < marqueChev.length ; i++){
                                  if(marqueChev[i] != null){
                                    label_this = null;
                                    for(let j= 0; j < AllMarquechev.length ; j++){
                                    
                                      if(AllMarquechev[j]?.value === marqueChev[i]){
                                        label_this = AllMarquechev[j]?.label;
      
                                      }
                                    
                                    }
                                    tab_filters.push({
                                      id : marqueChev[i],
                                      label : label_this
                                    })
                                  
                                  }
                                
                                  
    
    
                                }
     
                              
      
                                setmarqchev_filter(tab_filters)
      
                              }
                         

   
                       
                   }
                     

              }
           
            }
            catch (err) {
                  console.log(err);  
              }
          };
      fetchData();
 

    
  }); 
 

  const format_this =  (param ) => {

    // console.log(formattedDate)
    const currentDate = new Date(param);
    const formattedDate = format(currentDate, "eeee dd MMMM yyyy", { locale: fr });
    const this_date = format(currentDate, "dd-MM");
    const this_an = format(currentDate, " yyyy", { locale: fr });
    const this_mois = format(currentDate, " MMMM", { locale: fr });
    const this_day = format(currentDate, " dd", { locale: fr });
    // console.log(formattedDate)
    // console.log(this_an)
    // console.log(this_date)
    // console.log(this_day)
    return this_date;
        
      
   

  };
  
  const setColoris =  (param ) => {

  // console.log(param)
  // console.log(AllColors)
  const filter_res = AllColors.filter(item  => item?.value === param);
  // console.log("filter_res")
  // console.log(filter_res)


        return filter_res[0]?.label;
      
   

  };
  const setEtat =  (param ) => {

    console.log("AllEtats")
    console.log(AllEtats)

  
       const filter_res = AllEtats.filter(item  => item?.value === param);
  
        return filter_res[0]?.label;
      
   

  };
  const setClasse =  (param , category) => {

        if(category === 1){
          // vetement
          var filter_res = AllClassevet.filter(item  => item?.value === param);

      
      }

      else if(category === 2){
          // accessoire
            filter_res = AllClasseacc.filter(item  => item?.value === param);

      }

      else if(category === 3){
          // cosmetique
            filter_res = AllClassecosm.filter(item  => item?.value === param);

      }

      else if(category === 4){
          // cheveux
            filter_res = AllClassechev.filter(item  => item?.value === param);

      }
       
      return filter_res[0]?.label;
      
   

  };
  
  const setMarque =  (param , category) => {

   
    if(category === 1){
        // vetement
        var filter_res = AllMarquevet.filter(item  => item?.value === param);
  
     
    }

    else if(category === 2){
        // accessoire
          filter_res = AllMarqueacc.filter(item  => item?.value === param);

    }

    else if(category === 3){
        // cosmetique
          filter_res = AllMarquecosm.filter(item  => item?.value === param);

    }

    else if(category === 4){
        // cheveux
          filter_res = AllMarquechev.filter(item  => item?.value === param);

    }
    
 
   
    return filter_res[0]?.label;
      
   

  };
  const handleDelete = async (event ) => {

    
        
      if(event.target.dataset.biens != undefined){
        setModalOpen(true);
          
        
        var tab_id = [];
        // prev id
        for(let i=0; i < delete_id.length; i++){
          tab_id.push(delete_id[i])
        }
        tab_id.push(event.target.dataset.biens)
        // current id
        
       
        setDelete_id(tab_id)
      }
   

  };

  const handleMultiDelete = () => {
    // Logique pour supprimer les produits sélectionnés
    console.log("Produits à supprimer :", selectedProducts);
    setModalOpen(true);
    setDelete_id(selectedProducts)
    // Vous pouvez appeler une API ou mettre à jour l'état des produits ici
  };

  const handleConfirm = async () => {
    // Code pour supprimer l'élément
    setModalOpen(false);

    // console.log('delete')
    // console.log(delete_id)
// return false;
    if(delete_id.length > 0){
      
    const param = {
      id : delete_id
    }

    const deleting = await axios.post(`${apiUrl}/produitsupload/deleteproduits` , param);
        toast.info('supperssion en cours' , {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });

    //  console.log(deleting) 
        if(deleting.data.msg === "update success"){
                  setTimeout(() => {
                          
                    toast.success('produit supprimé avec succès' , {
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

                  const updatedProds = list_descripteurs.filter(item  => item.Mle_biens != delete_id[0]);
                  setListdescripteurs(updatedProds) 
                  setDelete_id([])
              
                  navigate("/catalogues")
                     
                }, 3500); // Délai de 3 secondes
               

           }  

    }
    
  };

  const handleCancel = () => {
    setModalOpen(false);
  };
 
// les tris

const sort_data = async (event ) => {
    
  // console.log(event)
  // console.log(event.target)
  // liste des produits
  // console.log(list_descripteurs)
    if(event.target.dataset.sort === "date"){
     
      if(date_sortup === null){
        setdate_sortup(1)
        
           const sortedProducts = [...list_descripteurs].sort((a, b) => new Date(a.date_enreg) - new Date(b.date_enreg));
    
                // console.log('sortedProducts')
                // console.log(sortedProducts)
                setListdescripteurs(sortedProducts);
      
      }
      else if(date_sortup === 1){
        setdate_sortup(0)

        const sortedProducts = [...list_descripteurs].sort((a, b) => new Date(b.date_enreg) - new Date(a.date_enreg));
    
        // console.log('sortedProducts')
        // console.log(sortedProducts)
        setListdescripteurs(sortedProducts);
        
      }
      else if(date_sortup === 0){

        setdate_sortup(1)
        const sortedProducts = [...list_descripteurs].sort((a, b) => new Date(a.date_enreg) - new Date(b.date_enreg));
    
        // console.log('sortedProducts')
        // console.log(sortedProducts)
        setListdescripteurs(sortedProducts);
        
      }
    }
    else if(event.target.dataset.sort === "prix"){
     
      if(prix_sortup === null){
        setprix_sortup(1)
        const sortedProducts = [...list_descripteurs].sort((a, b) => a.prix - b.prix);
    
        // console.log('sortedProducts')
        // console.log(sortedProducts)
        setListdescripteurs(sortedProducts);
      
      }
      else if(prix_sortup === 1){
        setprix_sortup(0)
        const sortedProducts = [...list_descripteurs].sort((a, b) => b.prix - a.prix);
      
    
        // console.log('sortedProducts')
        // console.log(sortedProducts)
        setListdescripteurs(sortedProducts);
       
      }
      else if(prix_sortup === 0){

        setprix_sortup(1)
        const sortedProducts = [...list_descripteurs].sort((a, b) => a.prix - b.prix);
        setListdescripteurs(sortedProducts);
       
      }
    }
    else if(event.target.dataset.sort === "qte"){
     
      if(qte_sortup === null){
        setqte_sortup(1)
      
        const sortedProducts = [...list_descripteurs].sort((a, b) => a.qte - b.qte);
    
        // console.log('sortedProducts')
        // console.log(sortedProducts)
        setListdescripteurs(sortedProducts);
       
      }
      else if(qte_sortup === 1){
        setqte_sortup(0)
        const sortedProducts = [...list_descripteurs].sort((a, b) => b.qte - a.qte);
    
        // console.log('sortedProducts')
        // console.log(sortedProducts)
        setListdescripteurs(sortedProducts);
       
      }
      else if(qte_sortup === 0){

        setqte_sortup(1)
     
        const sortedProducts = [...list_descripteurs].sort((a, b) => a.qte - b.qte);
        setListdescripteurs(sortedProducts);
      
      }
    }

       
 

};
 
 

const handleCheckboxChange = (productId) => {
  setSelectedProducts((prevSelected) =>
    prevSelected.includes(productId)
      ? prevSelected.filter((id) => id !== productId)
      : [...prevSelected, productId]
  );

  console.log(selectedProducts)
};
 
useEffect(() => {
//  console.log(selectedProducts)
      if(selectedProducts.length > 0){
        setMultiDeleted(1)
      }
      else{
        setMultiDeleted(0)
      }
  } , ([selectedProducts]));  

//  function de filtres


const products = [
  { id: 1, name: "Produit A", categorie: "Vêtements", couleur: "Rouge", marque: "Nike" },
  { id: 2, name: "Produit B", categorie: "Chaussures", couleur: "Bleu", marque: "Adidas" },
  { id: 3, name: "Produit C", categorie: "Accessoires", couleur: "Noir", marque: "Puma" },
  { id: 4, name: "Produit D", categorie: "Vêtements", couleur: "Bleu", marque: "Nike" },
  { id: 5, name: "Produit E", categorie: "Chaussures", couleur: "Rouge", marque: "Adidas" }
];

const [selectedCateg, setSelectedCateg] = useState([]);
const [selectedVisibility, setSelectedVisibility] = useState([]);
const [selectedGenre, setSelectedGenre] = useState([]);
const [selectedAge, setSelectedAge] = useState([]);
const [selectedEtats, setSelectedEtats] = useState([]);
const [selectedColors, setSelectedColors] = useState([]);

const [selectedVetementClasse, setSelectedVetementClasse] = useState([]);
const [selectedAccesClasse, setSlectedAccesClasse] = useState([]);
const [selectedCosmClasse, setSectedCosmClasse] = useState([]);
const [selectedChevClasse, setSelectedChevClasse] = useState([]);

const [selectedMarqueVet, setSelectedMarqueVet] = useState([]);
const [selectedMarqueAcces, setSelectedMarqueAcces] = useState([]);
const [selectedMarqueCosm, setSelectedMarqueCosm] = useState([]);
const [selectedMarqueChev, setSelectedMarqueChev] = useState([]);
console.log(selectedVisibility)

// Extract unique options for each filter

 
// Filtering logic
// const filteredProducts = list_descripteurs.filter((product) => {
//   const matchCategory =
//   selectedCateg.length === 0 || selectedCateg.includes(product.categorie);
//   const matchColor =
//     selectedColors.length === 0 || selectedColors.includes(product.couleur);
//   const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(product.marque);


//   console.log(matchCategory)
  
//   console.log(matchColor)
//   return matchCategory && matchColor && matchBrand;
// });

// console.log(list_descripteurs)
const filteredProducts = list_descripteurs.filter((product) => {
  console.log("selectedCateg")
  console.log(selectedCateg)

  const matchCategory = selectedCateg.length === 0 || selectedCateg.includes(product?.type_bien);
  const matchVisibility = selectedVisibility.length === 0 || selectedVisibility.includes(product?.public);
  const matchGenre = selectedGenre.length === 0 || selectedGenre.includes(product?.genre);
  const matchAge = selectedAge.length === 0 || selectedAge.includes(product.age);
  const matchEtat = selectedEtats.length === 0 || selectedEtats.includes(product.etat);
  const matchColors = selectedColors.length === 0 || selectedColors.includes(product.coloris);
 
 const matchClasseVet = selectedVetementClasse.length === 0 || selectedVetementClasse.includes(product.classe);
 const matchClasseAcc = selectedAccesClasse.length === 0 || selectedAccesClasse.includes(product.classe);
 const matchClasseCosm = selectedCosmClasse.length === 0 || selectedCosmClasse.includes(product.classe);
 const matchClasseChev = selectedChevClasse.length === 0 || selectedChevClasse.includes(product.classe);

 const matchMarqVet = selectedMarqueVet.length === 0 || selectedMarqueVet.includes(product.marque);
 const matchMarqAcc = selectedMarqueAcces.length === 0 || selectedMarqueAcces.includes(product.marque);
 const matchMarqCosm = selectedMarqueCosm.length === 0 || selectedMarqueCosm.includes(product.marque);
 const matchMarqChev = selectedMarqueChev.length === 0 || selectedMarqueChev.includes(product.marque);


  console.log("matchCategory")
  console.log(matchCategory)
  
  // console.log(matchColor)
  return matchCategory  && matchVisibility && matchGenre && matchAge && matchEtat && matchColors
          && matchClasseVet  && matchClasseAcc  && matchClasseCosm  && matchClasseChev 
          && matchMarqVet  && matchMarqAcc  && matchMarqCosm  && matchMarqChev;
});
// fin fonctions de filtre
 console.log("public_filter")
 console.log(public_filter)
 
 console.log(marqvetement_filter)
//  console.log(AllClassevet)
 console.log(classvetement_filter)
 console.log(marqaccessoire_filter)
 console.log(classaccessoire_filter)
 console.log("end public_filter")
  return (

    <>
     <div className="body-wrapper">
         <Header_banner  data_props ={{ 
                            title: 'Catalogues',
                     }} 
                     data_page = {{type: "comptes" , back_option: "on"}}
           />
              <main id="MainContent" className="content-for-layout">
              <ToastContainer />
                 <div className="cart-page box_border">
                    <div className="container">
                       <div className="cart-page-wrapper">
                            <div className="table-container custom_table">
                              {/* tableau de produits */}
                              <table className="fixed-table">
                                    <thead>
                                    <tr>
                                       
                                      <div className='th_1 th'>#
                                      
                                      </div>
                                      <div className='th_2 th'>
                                          <FontAwesomeIcon icon={faImage} />
 
                                      </div>
                                       <div className='th_3 th'>  
                                       {public_filter.length > 0 ?

                                       (
                                        <>
                                        {/* vues */}
                                         {/* <MultiSelectDropdown className="d-inline mx-2 custom_filter_box" options={public_filter} title= "vue" onChange={handlePublicChange} /> */}
     
                                          <MultiSelectDropdown
                                          className="d-inline mx-2 custom_filter_box"
                                          title="vue"
                                          options={public_filter}
                                          selectedOptions={selectedVisibility}
                                          setSelectedOptions={setSelectedVisibility}
                                           />
                                        </>
                                      
                                       )

                                       :

                                       (
                                        <>
                                         {/* <MultiSelectDropdown  options={public_filter} className="d-inline mx-2"  title= "vue" onChange={handlePublicChange} /> */}
     
                                        vue
                                        </>

                                       )

                                       }
                                      
                                       </div>
                                     
                                      <th  className='th_4 th'>
                                        {/* filtre de catégories */}
                                          {categories_filter.length > 0 ?

                                       (
                                      
                                      <MultiSelectDropdown
                                        title= {<>
                                           <label><FontAwesomeIcon icon={faList} /></label>
                                           
                                             </>}
                                        options={categories_filter}
                                        selectedOptions={selectedCateg}
                                        setSelectedOptions={setSelectedCateg}
                                      />

                                       )

                                       :

                                       (
                                        <>
                                             <label><FontAwesomeIcon icon={faList} /></label>
                                        </>

                                       )

                                       }
                                       
    
                                      </th>
                                      <th>actions</th>
                                      <th>prix
                                      {prix_sortup === 1 ?

                                          (
                                            <>
                                              {/* <FontAwesomeIcon onClick={sort_data} data-sort = "vue" className='sort_icon vue_sort_up' icon={faSortUp} /> */}
                                              <i onClick={sort_data}  data-sort = "prix" className='sort_icon prix_sort fa fa-sort-up '></i>


                                            </>
                                          )

                                          :
                                          prix_sortup === 0 ?

                                          (
                                            <>

                                              {/* <FontAwesomeIcon onClick={sort_data}  data-sort = "vue" className='sort_icon vue_sort_down' icon={faSortDown} /> */}
                                              <i onClick={sort_data}  data-sort = "prix" className='sort_icon prix_sort fa fa-sort-down '></i>

                                            </>
                                          )

                                          :

                                          (
                                            <>
                                              <i onClick={sort_data}  data-sort = "prix" className='sort_icon prix_sort fa fa-sort '></i>

                                            {/* <FontAwesomeIcon onClick={sort_data}  data-sort = "vue" className='sort_icon vue_sort' icon={faSort} /> */}
                                            </>
                                          )

                                          }
                                      </th>
                                      <th>stock
                                      {qte_sortup === 1 ?

                                        (
                                          <>
                                            {/* <FontAwesomeIcon onClick={sort_data} data-sort = "vue" className='sort_icon vue_sort_up' icon={faSortUp} /> */}
                                            <i onClick={sort_data}  data-sort = "qte" className='sort_icon qte_sort fa fa-sort-up '></i>


                                          </>
                                        )

                                        :
                                        qte_sortup === 0 ?

                                        (
                                          <>

                                            {/* <FontAwesomeIcon onClick={sort_data}  data-sort = "vue" className='sort_icon vue_sort_down' icon={faSortDown} /> */}
                                            <i onClick={sort_data}  data-sort = "qte" className='sort_icon qte_sort fa fa-sort-down '></i>

                                          </>
                                        )

                                        :

                                        (
                                          <>
                                            <i onClick={sort_data}  data-sort = "qte" className='sort_icon qte_sort fa fa-sort '></i>

                                          {/* <FontAwesomeIcon onClick={sort_data}  data-sort = "vue" className='sort_icon vue_sort' icon={faSort} /> */}
                                          </>
                                        )

                                        }
                                      </th>
                                      <th>
                                          {genre_filter.length > 0 ?

                                       (
                                        <>
                                            {/* <MultiSelectDropdown className="d-inline mx-2 custom_filter_box" options={genre_filter} title= {<>
                                          <label><FontAwesomeIcon icon={faVenusMars} /></label>
                                         

                                          </>}
                                           onChange={handleGenreChange}
                                         /> */}
                                          
                                         <MultiSelectDropdown
                                          className="d-inline mx-2 custom_filter_box"
                                          title= {<>
                                            <label><FontAwesomeIcon icon={faVenusMars} /></label>
                                           
  
                                            </>}
                                          options={genre_filter}
                                          selectedOptions={selectedGenre}
                                          setSelectedOptions={setSelectedGenre}
                                           />
                                        
                                        </>
                                    

                                       )

                                       :

                                       (
                                        <>
                                           <label><FontAwesomeIcon icon={faVenusMars} /></label>
                                        </>

                                       )

                                       }
                                    
                                      
                                      </th>
                                      <th>
                                          {age_filter.length > 0 ?

                                       (
                                         <>
                                          <MultiSelectDropdown
                                          className="d-inline mx-2 custom_filter_box"
                                          title= {<>
                                           Ages
  
                                            </>}
                                          options={age_filter}
                                          selectedOptions={selectedAge}
                                          setSelectedOptions={setSelectedAge}
                                           />
                                         </>

                                       )

                                       :

                                       (
                                        <>
                                        âges
                                        </>

                                       )

                                       }

                                   
                                       
                                      </th>
                                      {/* <th>taille</th> */}
                                   
                                   
                                      <th>
                                    {etat_filter.length > 0 ?

                                       (
                                         <>
                                        <MultiSelectDropdown
                                          className="d-inline mx-2 custom_filter_box"
                                          title= {<>
                                            Etats
  
                                            </>}
                                          options={etat_filter}
                                          selectedOptions={selectedEtats}
                                          setSelectedOptions={setSelectedEtats}
                                           />
                                         </>
                                       )

                                       :

                                       (
                                        <>
                                        états
                                        </>

                                       )

                                       }
                                        
                                       
                                      </th>
                                     
                                      <th>
                                    
                                        {/* Dropdown pour filtrer par couleur */}
                                          {couleur_filter.length > 0 ?

                                       (
                                        <>
                                            <MultiSelectDropdown
                                          className="d-inline mx-2 custom_filter_box"
                                          title= {<>
                                              <label><FontAwesomeIcon icon={faPalette} /></label>
                                           
  
                                            </>}
                                          options={couleur_filter}
                                          selectedOptions={selectedColors}
                                          setSelectedOptions={setSelectedColors}
                                           />
                                        </>
                                       )

                                       :

                                       (
                                        <>
                                         <label><FontAwesomeIcon icon={faPalette} /></label>
                                        </>

                                       )

                                       }
                                      
                                      
                                      </th>
                                      {selectedCateg.length === 1 &&
                                      
                                      (
                                        <>
                                        {selectedCateg[0] === 1 ?
                                        (
                                         
                                          <>
                                           <th>
                                           <MultiSelectDropdown
                                          className="d-inline mx-2 custom_filter_box"
                                          title= {<>
                                            Classes
                                           
  
                                            </>}
                                          options={classvetement_filter}
                                          selectedOptions={selectedVetementClasse}
                                          setSelectedOptions={setSelectedVetementClasse}
                                           />
                                      
                                      </th>
                                      <th>
                                      <MultiSelectDropdown
                                          className="d-inline mx-2 custom_filter_box"
                                          title= {<>
                                              Marques
                                           
  
                                            </>}
                                          options={marqvetement_filter}
                                          selectedOptions={selectedMarqueVet}
                                          setSelectedOptions={setSelectedMarqueVet}
                                           />
                                        
                                         
                                      </th>
                                          
                                          </>

                                        )
                                        :

                                        selectedCateg[0] === 2 ?
                                        (
                                          
                                          <>
                                            <th>
                                           <MultiSelectDropdown
                                          className="d-inline mx-2 custom_filter_box"
                                          title= {<>
                                           Classes
  
                                            </>}
                                          options={classaccessoire_filter}
                                          selectedOptions={selectedAccesClasse}
                                          setSelectedOptions={setSlectedAccesClasse}
                                           />
                                      
                                      </th>
                                      <th>
                                      <MultiSelectDropdown
                                          className="d-inline mx-2 custom_filter_box"
                                          title= {<>
                                             Marques
  
                                            </>}
                                          options={marqaccessoire_filter}
                                          selectedOptions={selectedMarqueAcces}
                                          setSelectedOptions={setSelectedMarqueAcces}
                                           />
                                        
                                         
                                      </th>
                                          
                                          </>

                                        )
                                        :

                                        selectedCateg[0] === 3 ?
                                        (
                                          
                                          <>
                                              <th>
                                           <MultiSelectDropdown
                                          className="d-inline mx-2 custom_filter_box"
                                          title= {<>
                                            Classes
  
                                            </>}
                                          options={classcosm_filter}
                                          selectedOptions={selectedCosmClasse}
                                          setSelectedOptions={setSectedCosmClasse}
                                           />
                                      
                                      </th>
                                      <th>
                                      <MultiSelectDropdown
                                          className="d-inline mx-2 custom_filter_box"
                                          title= {<>
                                            Marques
  
                                            </>}
                                          options={marqcosm_filter}
                                          selectedOptions={selectedMarqueCosm}
                                          setSelectedOptions={setSelectedMarqueCosm}
                                           />
                                        
                                         
                                      </th>
                                          
                                          </>

                                        )
                                        :

                                        selectedCateg[0] === 4 &&
                                        (
                                          
                                          <>
                                              <th>
                                           <MultiSelectDropdown
                                          className="d-inline mx-2 custom_filter_box"
                                          title= {<>
                                           Classes
  
                                            </>}
                                          options={classchev_filter}
                                          selectedOptions={selectedChevClasse}
                                          setSelectedOptions={setSelectedChevClasse}
                                           />
                                      
                                      </th>
                                      <th>
                                      <MultiSelectDropdown
                                          className="d-inline mx-2 custom_filter_box"
                                          title= {<>
                                            Marques
  
                                            </>}
                                          options={marqchev_filter}
                                          selectedOptions={selectedMarqueChev}
                                          setSelectedOptions={setSelectedMarqueChev}
                                           />
                                        
                                         
                                      </th>
                                          
                                          </>

                                        )
                                        


                                      
                                      
                                      }
                                        
                                       
                                        
                                        </>
                                      )}
                                     
                                      <th>
                                      <FontAwesomeIcon className='iconify' icon={faCalendar} />
                                      </th>
                                     
                                    </tr>
                                    </thead>
                                    <tbody className='table_body'>
                                   
                                    {
                                    filteredProducts .map(item => (
                                     
                                     <tr key={item.Mle_biens}>

                                      <td>
                                        {/* {item.Mle_biens} */}

                                      <Checkbox                                               
                                          
                                          isChecked={selectedProducts.includes(item.Mle_biens)}
                                          onChange={() => handleCheckboxChange(item.Mle_biens)}
                                          
                                          /> 
                                      </td>
                                        <td className='image_container'>
                                          <Link  to={`/fiche_produit/${item.Mle_biens}/${item.type_bien}`} >
                                               <img src={`https://fsapi.fashionecos.com/${item?.path_image1}`} alt="img" />
                                    
                                                                                                  
                                          </Link>
 
                                      </td>
                                      <td>
                                        
                                        <>
                                            
                                            { 
                                              /* non publiable*/
                                             item.public === 0 ?

                                              (
                                                <>

                                                    <FontAwesomeIcon icon={faEye} className='icon_danger'/>
                                                </>

                                              )

                                              :
                                              
                                              /* publié */

                                              item.public === 1  ?

                                              (
                                                <>

                                                  <FontAwesomeIcon icon={faEye} className='icon_sucess'/>
                                                 </>
                                              )
                                              :
                                             
                                            // publiable
                                              item.public === 2  ?

                                              (
                                                <>

                                                        <FontAwesomeIcon icon={faEye} className='icon_warning'/>
                                                </>

                                              )
                                              :
                                                 

                                              (
                                               null

                                              )
                                             

                                            }
                                            
                                          
                                          </>
                                     
                                      

                                      

                                      
                                      


                                      </td>
                                   

                                      <td>
                                        <>

                                        { item.type_bien === 1 ?
                                          (
                                            "vêt."
                                            

                                          )

                                          :

                                          item.type_bien === 2 ?
                                         
                                          (
                                            "Acces."

                                          )

                                         :

                                          item.type_bien === 3 ?
                                          (
                                            "cosm."
                                          )
                                          
                                          :
                                          item.type_bien === 4 ?

                                          (
                                            "chev."

                                          )
                                          
                                          :

                                          (
                                            null

                                          )

                                        }
                                       
                                        
                                        </>
                                      
                                      </td>
                                      <td>
                                              <div className ="product-form-buttons d-flex align-items-center justify-content-between">
                                                
                                              
                                                <a href="#" className="edit_btn">
                                                    <Link  to={`/create_produit/${item?.type_bien}/${item?.Mle_biens}`} className='btn_cst'>
                                                          <FontAwesomeIcon size="sm" icon={faEdit} className='iconify'/>
                                                    </Link>
                                                     
                                                </a>
                                                {/* <a href="#" className="delete_btn"   > */}
                                                    
                                                    <FontAwesomeIcon onClick={handleDelete} size="sm" icon={faTimes} data-biens = {item?.Mle_biens} className='iconify icon_danger'/>
                                               
                                                {/* </a> */}
                                            </div>

                                      </td>
                                      <td>{item.prix} fr</td>
                                      <td>{item.qte}</td>
                                      <td>
                                        {item.genre === 1 ?
                                        (
                                          <> Masc. </>
                                        )
                                        
                                        : item.genre === 2  ?
                                        (
                                          <> Fém. </>
                                        )

                                        : item.genre === 3  ?
                                        (
                                          <> uni </>
                                        )
                                        :
                                        (
                                          <> - </>
                                        )
                                        
                                        
                                        }

                                    
                                      </td>
                                      <td> 
                                      {item.age === 1 ?
                                        (
                                          <> Adulte </>
                                        )
                                        
                                        : item.age === 2  ?
                                        (
                                          <> Enfant </>
                                        )

                                        
                                        :
                                        (
                                          <> - </>
                                        )
                                        
                                        
                                        }
                                      </td>
                                      {/* <td>{item.taille}</td> */}
                                   
                                     
                                      <td> 

                                      {item.etat === "" || item.etat === null ?

                                            (


                                              <>
                                              -
                                              </>
                                            )

                                            :

                                            (
                                              <>
                                              {setEtat(item.etat)}
                                              </>

                                            )

                                            }
                                      </td>
                                        <td>
                                        {item.coloris === "" || item.coloris === null ?

                                        (
                                        

                                          <>
                                          -
                                          </>
                                        )

                                        :

                                        (
                                          <>
                                          {setColoris(item.coloris)}
                                          </>

                                        )

                                        }
                                        
                                        
                                        </td> 
                                        {selectedCateg.length === 1 &&
                                      
                                      (
                                        <>
                                          <td>
                                      {item.classe === "" || item.classe === null ?

                                            (


                                              <>
                                              -
                                              </>
                                            )

                                            :

                                            (
                                              <>
                                              {setClasse(item.classe ,item.type_bien )}
                                              </>

                                            )

                                            }
                                      </td>
                                        
                                           <td>
                                      {item.marque === "" || item.marque === null ?

                                            (


                                              <>
                                              -
                                              </>
                                            )

                                            :

                                            (
                                              <>
                                              {setMarque(item.marque ,item.type_bien )}
                                              </>

                                            )

                                            }
                                      </td>
                                        </>
                                      )}
                                       
                                      <td>

                                      {format_this(item?.date_enreg)}
                                      </td>
                                      </tr>
                                    ))}
                                    </tbody>
                                  </table>

                                  {/*fin tableu de produits  */}
                              </div>
                       </div>
                    </div>
                </div>
                   {/* confirm boite */}
                <ConfirmationModal
                  isOpen={isModalOpen}
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                  message="Êtes-vous sûr de vouloir supprimer cet élément ?"
                />

                 {isMultiDeleted === 1 &&

                 <>
                      <Link onClick={handleMultiDelete} className="del_bottombtn">
                            <FontAwesomeIcon size="sm" icon={faTimes} className='iconify'/>
                          <a href="#">
                                supprimer
                          </a>     
                  
                    
                      </Link>
                 
                 </>

                 }
                
                <Link to="/categories" state={ {previousPath: location.pathname} } className="fixed_bottombtn">
                        <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/>
                      <a href="#">
                      ajouter un produit
                      </a>     
              
                
                </Link>


                         

              </main>
              <Footer />


     </div>

    
    </>
  )
}

export default Catalogues
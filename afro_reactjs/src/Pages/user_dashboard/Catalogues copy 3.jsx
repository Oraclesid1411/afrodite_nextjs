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

// import Dropdown from 'react-bootstrap/Dropdown';
 import MultiSelectDropdown from '../../Components/MultiSelectDropdown';
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
              if(list_descripteurs.length === 0){
                 //  liste des produits

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
           
                       // console.log('sortedProducts')
                       // console.log(sortedProducts)
                       setListdescripteurs(sortedProducts);
   
                     
                      //  les data des filtres
                        // if(list_descripteurs.length > 0){
                          const couleurs = [...new Set(sortedProducts.map((p) => p.coloris))];
                          const genres = [...new Set(sortedProducts.map((p) => p.genre))];
                          const etats = [...new Set(sortedProducts.map((p) => p.etat))];
                          const ages = [...new Set(sortedProducts.map((p) => p.age))];
                          const public_state = [...new Set(sortedProducts.map((p) => p.public))];
                          const categories = [...new Set(sortedProducts.map((p) => p.type_bien))];
                          


                          console.log("data")
                            console.log(couleurs)
                            console.log(genres)
                            console.log(etats)
                            console.log(ages)
                            console.log(public_state)
                            console.log(categories)
                          console.log("data")

                          // listing des valeurs des filtres
                            // etat de visibilité du produit
     
                          if(public_state.length > 0){
                
                            var tab_filters = [];
                    
                            for(let i= 0; i < public_state.length; i++){
                              var label_this = null;
                    
                              if(public_state[i] === 1){
                                label_this = 'publié';
                    
                    
                              }
                              else if(public_state[i] === 0){
                                label_this = 'publiable';
                    
                              }
                              else if(public_state[i] === 2){
                                label_this = 'non publiable';
                                
                              }
                    
                              tab_filters.push({
                                id : public_state[i],
                                label : label_this
                              })
                    
                            }
                            
                            // console.log(tab_filters)
                            setpublic_filter(tab_filters)
                    
                          }
                          else{
                            console.log('public_state  non trouvé')
                          }

                           // catégories
                            if(categories.length > 0){
                              // console.log(public_state)
                              tab_filters = [];

                              for(let i= 0; i < categories.length; i++){
                                label_this = null;

                                if(categories[i] === 1){
                                  label_this = 'vêtements';


                                }
                                else if(categories[i] === 2){
                                  label_this = 'accessoires';

                                }
                                else if(categories[i] === 3){
                                  label_this = 'cosmétiques';
                                  
                                }
                                else if(categories[i] === 4){
                                  label_this = 'cheveux';
                                  
                                }

                                tab_filters.push({
                                  id : categories[i],
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

   
                       
                   }
                     

              }
           
            }
            catch (err) {
                  console.log(err);  
              }
          };
      fetchData();
 

    
  }); 

  // recupérer tous les descripteurs
  useEffect(() => {

    const fetchData_b = async () => {
      if(list_descripteurs.length > 0)
        {
          // liste des descripteurs
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
                  
                      //   designation
        
       
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
                  
                    
    
    
    
                        // marque
    
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
    
                      
        }

    };
    fetchData_b(list_descripteurs);
    
} , ([])); 
  // end recupérations des descripteurs
  // données pour les filtres
  useEffect(() => {

    // Extraction des catégories et des couleurs uniques
    const fetchData_c = async () => {
    

      // };
    };
    fetchData_c(list_descripteurs);
    

    

  

} , ([])); 
  
// end filtres
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

  // console.log(list_descripteurs)
  // console.log(couleurs)
// les filtres
  // États pour les filtres sélectionnés
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCouleurs, setSelectedCouleurs] = useState([]);
  const [selectedPublic, setselectedPublic] = useState([]);
  const [selectedEtats, setselectedEtats] = useState([]);
  const [selectedGenre, setselectedGenre] = useState([]);
  const [selectedAge, setselectedAge] = useState([]);

  

  const filterProduct = async (event ) => {

   console.log("selectedPublic")
   console.log(selectedPublic)


  };


  const handlePublicChange = (value) => {
  //  console.log(value)

    setselectedPublic((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
    filterProduct();

  };

  // console.log(selectedPublic)
  // Gérer la sélection multiple pour les catégories
  const handleCategoryChange = (value) => {
  
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((cat) => cat !== value)
        : [...prevSelected, value]
    );
  };

  // Gérer la sélection multiple pour les couleurs
  const handleCouleurChange = (value) => {
    
    setSelectedCouleurs((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((couleur) => couleur !== value)
        : [...prevSelected, value]
    );
  };



  const handleGenreChange = (value) => {
   
    setselectedGenre((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((cat) => cat !== value)
        : [...prevSelected, value]
    );
  };

  const handleAgeChange = (value) => {
    
    setselectedAge((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((cat) => cat !== value)
        : [...prevSelected, value]
    );
  };

  const handleEtatChange = (value) => {
  
    setselectedEtats((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((cat) => cat !== value)
        : [...prevSelected, value]
    );
  };

  // Filtrer les produits en fonction des catégories et couleurs sélectionnées
  // const filteredProducts = list_descripteurs.filter((product) => {
  //   const isPublicMatch =  selectedPublic.length === 0 || selectedPublic.includes(product.public);
  //   // const isCouleurMatch =
  //   //   selectedCouleurs.length === 0 || selectedCouleurs.includes(product.couleur);
  //   // return isCategorieMatch && isCouleurMatch;
  //   console.log(isPublicMatch)
  //   return isPublicMatch ;
  // });

  // console.log("filteredProducts")
  // console.log(filteredProducts)

  // setListdescripteurs(filteredProducts)
 

// selection de produit

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
                                         <MultiSelectDropdown className="d-inline mx-2 custom_filter_box" options={public_filter} title= "vue" onChange={handlePublicChange} />
     

                                       )

                                       :

                                       (
                                        <>
                                         <MultiSelectDropdown  options={public_filter} className="d-inline mx-2"  title= "vue" onChange={handlePublicChange} />
     
                                        {/* vue */}
                                        </>

                                       )

                                       }
                                      
                                       </div>
                                     
                                      <th  className='th_4 th'>
                                        {/* filtre de catégories */}
                                          {categories_filter.length > 0 ?

                                       (
                                         <MultiSelectDropdown className="d-inline mx-2"
                                          options={categories_filter}
                                           title= {<>
                                          <label><FontAwesomeIcon icon={faList} /></label>
                                         
                                          </>}
                                           onChange={handleCategoryChange}
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
                                          <MultiSelectDropdown className="d-inline mx-2 custom_filter_box" options={genre_filter} title= {<>
                                          <label><FontAwesomeIcon icon={faVenusMars} /></label>
                                         

                                          </>}
                                           onChange={handleGenreChange}
                                         />

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
                                          <MultiSelectDropdown className="d-inline mx-2 custom_filter_box" options={age_filter} title= {<>
                                        âges
                                         
                                          </>}
                                           onChange={handleAgeChange}
                                         />

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
                                        designation
                                      
                                      </th>
                                      <th>
                                          {etat_filter.length > 0 ?

                                       (
                                          <MultiSelectDropdown className="d-inline mx-2 custom_filter_box" options={etat_filter} title= {<>
                                          états
                                          </>}
                                           onChange={handleEtatChange}
                                         />
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
                                          <MultiSelectDropdown className="d-inline mx-2 custom_filter_box" options={couleur_filter} title= {<>
                                        
                                          <label><FontAwesomeIcon icon={faPalette} /></label>
                                         
                                          </>}
                                           onChange={handleCouleurChange}
                                         />
                                       )

                                       :

                                       (
                                        <>
                                         <label><FontAwesomeIcon icon={faPalette} /></label>
                                        </>

                                       )

                                       }
                                      
                                      
                                      </th>
                                      <th>
                                        Marque
                                        
                                         
                                      </th>
                                      <th>
                                      <FontAwesomeIcon className='iconify' icon={faCalendar} />
                                      </th>
                                     
                                    </tr>
                                    </thead>
                                    <tbody className='table_body'>
                                   
                                    {
                                    list_descripteurs .map(item => (
                                     
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
                                      <td>

                                      {format_this(item?.date_enreg)}
                                      </td>
                                      </tr>
                                    ))}
                                    </tbody>
                                  </table>
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
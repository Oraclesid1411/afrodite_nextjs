
import  {useRef, useEffect, useState} from 'react'
import Tab from 'react-bootstrap/Tab';
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../../Context/AuthenticateContext";
import Tabs from 'react-bootstrap/Tabs';
import image_a from "/assets/img/fs/vetements_default.jpeg"
import Header_banner from '../../Components/Header_banner';
import Searchable_select from '../../Components/Searchable_select';
import {
    Link,
    NavLink,
    useLocation
  } from "react-router-dom";

import Select from 'react-select'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faCamera, faImage, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DropdownMenu from '../../Components/DropdownMenu';

// import { faPlus } from '@fortawesome/free-solid-svg-icons'
const Checkbox = ({ label, isChecked, onChange, id }) => {
  return (
    <div className="my_chk">
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={onChange}
      />
     
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
 
function CreateProduit() {
    const apiUrl = 'https://fsapi.fashionecos.com'
  
      axios.defaults.withCredentials = true;
      const auth = useAuth();
      const navigate = useNavigate()
    
      let current_location = useLocation(); 
  
      const link_url = current_location?.pathname.split('/');
      const categorie = link_url[2];
      
       const [biens_ID, setbiens_ID] = useState(null);
       const [StateUpdate, setStateUpdate] = useState(0);
       const [biens_dataupdate, setbiens_dataupdate] = useState([]);

     
       
         useEffect(() => {
            if(link_url[3] !== undefined){
              const this_id = link_url[3];
              setbiens_ID(this_id)
              setProduitId(this_id)

              const fetchData = async () => {

      
     
                try {
                 
                  const params = {
                      category : categorie,
                      idproduit : this_id 
                  }
               
                  // console.log(params)
                        
                    const rep1 = await axios.post(`${apiUrl}/produits/ficheproduit` , params);
                    // console.log('rep1')
                    // console.log(rep1)

                   const info_this_produit = rep1?.data?.data;
                   const image_this_produit = rep1?.data?.images;
                  //  console.log(info_this_produit)
                  //  console.log(image_this_produit)

                      // Convertir les blobs en objets File
                      const fileObjects = image_this_produit.map((file, index) => {
                        const byteCharacters = atob(file.data); // Décoder base64 en bytes
                        const byteNumbers = new Array(byteCharacters.length).fill().map((_, i) => byteCharacters.charCodeAt(i));
                        const byteArray = new Uint8Array(byteNumbers);
                        return new File([byteArray], file.name, { type: file.type });
                    });
                  

                    const files_list = image_this_produit.map((file) => {
                      const filename = file?.name;  
                      const path = file?.path;

                      return { path : path , filename : filename};
                    
                  });

                  // console.log(files_list)

                  //   return false;

                    setLocalFiles(files_list);
                    setListImages(files_list);
                    setFiles(fileObjects);
                    var tab_imgs = [];


                   for(let j= 0; j< files.length; j++ ){
                    var this_path = URL.createObjectURL(files[j]);
                    // console.log('image get')
                    // console.log(files?.name)
                    //  console.log(e.target.files[j])
                  
                    tab_imgs.push({
                      id: j,
                      src: this_path,
                      alt: "image indisponible"
                    })
                  
                 
                   }
                    setUpload_img(tab_imgs);

                   setFile(files);

                
                   setbiens_dataupdate(info_this_produit);
                  //  mettre à jour les valeurs des données
                  setValues(
                    {...values ,
                        prix: info_this_produit?.prix,
                        qte: info_this_produit?.qte,
                        // prix: info_this_produit?.prix


                    }
                      
                    )

                    // genre
                 
                    if(info_this_produit?.genre === 1){
                      setGenreA("masculin")
                      setGenre(1)

                    }
                    else if(info_this_produit?.genre === 2){
                      setGenreB("feminin");
                      setGenre(2)
                      
                    }
                    else if(info_this_produit?.genre === 3){
                      setGenreA("masculin")
                      setGenreB("feminin");
                      setGenre(3)
                      
                    }

                    // age
                    if(info_this_produit?.age === 1){
                      setAge("adulte")
                     

                    }
                    else if(info_this_produit?.age === 2){
                      setAge("enfant");
                     
                      
                    }

                      // couv corps
                    if(info_this_produit?.type_bien === 1){

               
                       if(info_this_produit?.zone_couv === 1){
                        setCouvcorp("haut");
                       
                        
                      }
                      else if(info_this_produit?.zone_couv === 2){
                        setCouvcorp("bas");
                       
                        
                      } else if(info_this_produit?.zone_couv === 3){
                        setCouvcorp("combis");
                       
                        
                      } else if(info_this_produit?.zone_couv === 4){
                        setCouvcorp("lingerie");
                       
                        
                      }
                     

                    }
                  

                      // taille
                      if(info_this_produit?.type_bien !== 3){
                        if(info_this_produit?.taille === 1){
                          setTaille("xxl");
                        
                         
                       }
                       else if(info_this_produit?.taille === 2){
                        setTaille("xl");
                        
                         
                       } else if(info_this_produit?.taille === 3){
                        setTaille("l");
                        
                         
                       } 
                       else if(info_this_produit?.taille === 4){
                        setTaille("m");
                        
                         
                       }
                       else if(info_this_produit?.taille === 5){
                        setTaille("sm");
                        
                         
                       }
 
                     }

                      // désignation
                       
                      if(options_designation.length > 0){
                        for(let a = 0; a < options_designation.length; a++){
                         
                          if(options_designation[a]?.value === info_this_produit?.classe)
                            
                          setDesignation(options_designation[a])

                        }
                      }

                      if(options_etat.length > 0){
                        for(let a = 0; a < options_etat.length; a++){
                         
                          if(options_etat[a]?.value === info_this_produit?.etat)
                            
                          setEtat(options_etat[a])

                        }
                      }

                      if(options_couleur.length > 0){
                        for(let a = 0; a < options_couleur.length; a++){
                          
                          if(options_couleur[a]?.value === info_this_produit?.coloris)
                           
                          setCouleur(options_couleur[a])

                        }
                      }

                      if(options_marque.length > 0){
                    
                        for(let a = 0; a < options_marque.length; a++){
                         
                          if(options_marque[a]?.value === info_this_produit?.marque)
                           
                          setMarque(options_marque[a])

                        }
                      }

                      if(info_this_produit?.type_bien === 1 || info_this_produit?.type_bien === 2){
                     
                        if(options_joint.length > 0){
                          for(let a = 0; a < options_joint.length; a++){
                           
                            if(options_joint[a]?.value === info_this_produit?.joint)
 
                            setJoint(options_joint[a])
  
                          }
                        }
                      }

                      // col et manche
                      if(info_this_produit?.type_bien === 1){

                        // col
                        if(info_this_produit?.col === 1){
                          // choix de aucun
                          setCol("aucun");
                    
                        }
                       else if(info_this_produit?.col !== "" || info_this_produit?.col !== null){
                          setCol("col");
                            // type de col
                        if(options_col.length > 0){
                          for(let a = 0; a < options_col.length; a++){
                           
                            if(options_col[a]?.value === info_this_produit?.col)
                              // console.log(options_designation[a])
                            setTypecol(options_col[a])
  
                          }
                        }

                    
                        }


                      
                        // manche

                        if(info_this_produit?.manche === 1){
                          // choix de aucun
                          setManche("sans-manche");
                    
                        }
                       else if(info_this_produit?.manche !== "" || info_this_produit?.manche !== null){
                        setManche("manche");
                            // type de col
                        if(options_manche.length > 0){
                          for(let a = 0; a < options_manche.length; a++){
                           
                            if(options_manche[a]?.value === info_this_produit?.manche)
                              // console.log(options_designation[a])
                            setTypemanche(options_manche[a])
  
                          }
                        }

                    
                        }
                      }

                        if(info_this_produit?.type_bien === 1 || info_this_produit?.type_bien === 2){
                          if(options_motif.length > 0){
                            for(let a = 0; a < options_motif.length; a++){
                            
                              if(options_motif[a]?.value === info_this_produit?.motif)
                                // console.log(options_designation[a])
                              setMotif(options_motif[a])
    
                            }
                        }
                        if(options_occasion.length > 0){
                          for(let a = 0; a < options_occasion.length; a++){
                           
                            if(options_occasion[a]?.value === info_this_produit?.occasion)
                            
                              setOccasion(options_occasion[a])
  
                          }
                        }
                      }

                    
 
                   setStateUpdate(1)
                   upload_produit_image()
                
          
                } catch (err) {
                  console.log(err);
                  console.log('erreur here')
                }
              };
              fetchData(this_id);

              // récupérer les données de l'article
              // console.log(this_id)

              // if(categorie === "1")
              //   // console.log('vetements')


              // if(categorie === "2")
              //   // console.log('accessoire')
              // if(categorie === "3")
              //   // console.log('cosmetique')
              // if(categorie === "4")
              //   console.log('cheveux')
      
            }
          
    
        } , [link_url , categorie]);  
      
    
      // console.log(biens_dataupdate)
      
      const [checkboxes, setCheckboxes] = useState({
        prix_gele: false,
        qte_gele: false,
        reduction_gele: false,
        genre_gele: false,
        taille_gele: false,
        couv_corp_gele: false,
        age_gele: false,
        manche_gele: false,
        typemanche_gele: false,
        col_gele: false,
        typecol_gele: false,
        designation_gele: false,
        etat_gele: false,
        couleur_gele: false,
        marque_gele: false,
        joint_gele: false,
        motif_gele: false,
        occasion_gele: false,
      });
  
      const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        setCheckboxes((prevCheckboxes) => ({
          ...prevCheckboxes,
          [id]: checked,
        }));

       
        const zone = id.split('_')
        if(id === "prix_gele" || id === "qte_gele" || id === "reduction_gele"){
          const text_zone = document.querySelector('input[name = "'+ zone[0] + '"]')
          if(checked === true){
            if(!text_zone.classList.contains('disable_zone'))
            text_zone.classList.add('disable_zone');

        }
        else{
            if(text_zone.classList.contains('disable_zone'))
            text_zone.classList.remove('disable_zone');
          }
      

         
        }
        if(id === "genre_gele"){
          const text_zonea = document.querySelector('label[name = "masculin"]')
          const text_zoneb = document.querySelector('label[name = "feminin"]')

          if(checked === true){
            if(!text_zonea.classList.contains('disable_zone'))
              text_zonea.classList.add('disable_zone');
            if(!text_zoneb.classList.contains('disable_zone'))
              text_zoneb.classList.add('disable_zone');

          }
          else{
            if(text_zonea.classList.contains('disable_zone'))
              text_zonea.classList.remove('disable_zone');
            if(text_zoneb.classList.contains('disable_zone'))
              text_zoneb.classList.remove('disable_zone');
          }
        }
        if(id === "age_gele"){
          const text_zonec = document.querySelector('label[name = "adulte"]')
          const text_zoned = document.querySelector('label[name = "enfant"]')

          if(checked === true){
            if(!text_zonec.classList.contains('disable_zone'))
              text_zonec.classList.add('disable_zone');
            if(!text_zoned.classList.contains('disable_zone'))
              text_zoned.classList.add('disable_zone');

          }
          else{
            if(text_zonec.classList.contains('disable_zone'))
              text_zonec.classList.remove('disable_zone');
            if(text_zoned.classList.contains('disable_zone'))
              text_zoned.classList.remove('disable_zone');
          }
        }

        if(id === "couv_corp_gele"){
          const text_zone_haut = document.querySelector('label[name = "haut"]')
          const text_zone_combis = document.querySelector('label[name = "combis"]')
          const text_zone_bas = document.querySelector('label[name = "bas"]')
          const text_zone_lingerie = document.querySelector('label[name = "lingerie"]')

          if(checked === true){
            if(!text_zone_haut.classList.contains('disable_zone'))
              text_zone_haut.classList.add('disable_zone');
            if(!text_zone_combis.classList.contains('disable_zone'))
              text_zone_combis.classList.add('disable_zone');
            if(!text_zone_bas.classList.contains('disable_zone'))
              text_zone_bas.classList.add('disable_zone');
            if(!text_zone_lingerie.classList.contains('disable_zone'))
              text_zone_lingerie.classList.add('disable_zone');

          }
          else{
            if(text_zone_haut.classList.contains('disable_zone'))
              text_zone_haut.classList.remove('disable_zone');
            if(text_zone_combis.classList.contains('disable_zone'))
              text_zone_combis.classList.remove('disable_zone');
            if(text_zone_bas.classList.contains('disable_zone'))
              text_zone_bas.classList.remove('disable_zone');
            if(text_zone_lingerie.classList.contains('disable_zone'))
              text_zone_lingerie.classList.remove('disable_zone');
          }
        }

        if(id === "taille_gele"){
          const text_zone_xxl = document.querySelector('label[name = "xxl"]')
          const text_zone_xl = document.querySelector('label[name = "xl"]')
          const text_zone_l = document.querySelector('label[name = "l"]')
          const text_zone_m = document.querySelector('label[name = "m"]')
          const text_zone_sm = document.querySelector('label[name = "sm"]')

          if(checked === true){
            if(!text_zone_xxl.classList.contains('disable_zone'))
              text_zone_xxl.classList.add('disable_zone');
            if(!text_zone_xl.classList.contains('disable_zone'))
              text_zone_xl.classList.add('disable_zone');
            if(!text_zone_l.classList.contains('disable_zone'))
              text_zone_l.classList.add('disable_zone');
            if(!text_zone_m.classList.contains('disable_zone'))
              text_zone_m.classList.add('disable_zone');
            if(!text_zone_sm.classList.contains('disable_zone'))
              text_zone_sm.classList.add('disable_zone'); 

          }
          else{
            if(text_zone_xxl.classList.contains('disable_zone'))
              text_zone_xxl.classList.remove('disable_zone');
            if(text_zone_xl.classList.contains('disable_zone'))
              text_zone_xl.classList.remove('disable_zone');
            if(text_zone_l.classList.contains('disable_zone'))
              text_zone_l.classList.remove('disable_zone');
            if(text_zone_m.classList.contains('disable_zone'))
              text_zone_m.classList.remove('disable_zone');
            if(text_zone_sm.classList.contains('disable_zone'))
              text_zone_sm.classList.remove('disable_zone'); 
          }
        }

        if(id === "manche_gele"){
          const text_zonec = document.querySelector('label[name = "sans-manche"]')
          const text_zoned = document.querySelector('label[name = "manche"]')

          if(checked === true){
            if(!text_zonec.classList.contains('disable_zone'))
              text_zonec.classList.add('disable_zone');
            if(!text_zoned.classList.contains('disable_zone'))
              text_zoned.classList.add('disable_zone');

          }
          else{
            if(text_zonec.classList.contains('disable_zone'))
              text_zonec.classList.remove('disable_zone');
            if(text_zoned.classList.contains('disable_zone'))
              text_zoned.classList.remove('disable_zone');
          }
        }

        if(id === "col_gele"){
          const text_zonec = document.querySelector('label[name = "aucun_col"]')
          const text_zoned = document.querySelector('label[name = "col"]')

          if(checked === true){
            if(!text_zonec.classList.contains('disable_zone'))
              text_zonec.classList.add('disable_zone');
            if(!text_zoned.classList.contains('disable_zone'))
              text_zoned.classList.add('disable_zone');

          }
          else{
            if(text_zonec.classList.contains('disable_zone'))
              text_zonec.classList.remove('disable_zone');
            if(text_zoned.classList.contains('disable_zone'))
              text_zoned.classList.remove('disable_zone');
          }
        }

        if(id === "designation_gele" || id === "etat_gele" || id === "couleur_gele"
            || id === "marque_gele" || id === "joint_gele" || id === "typecol_gele"
            || id === "typemanche_gele" || id === "motif_gele" || id === "occasion_gele"
        ){
          const select_zone = document.querySelector('.input_box[name = "'+ zone[0] + '"]')
          if(checked === true){
            if(!select_zone.classList.contains('disable_zone'))
              select_zone.classList.add('disable_zone');

          }
          else{
            if(select_zone.classList.contains('disable_zone'))
              select_zone.classList.remove('disable_zone');
          }

        }

      

      };
    
    const [category, setCategory] = useState(""); 
    const [info_vendeur , setinfo_vendeur] =  useState([]);
    const [record, setRecord] = useState(null); 
    const [recordsave, setRecordSave] = useState(null); 
    const [publish, setPublish] = useState(null); 
    const [produit_id, setProduitId] = useState(null); 
    const [updating, setUpdating] = useState(null); 
   
  
    const user_info = auth.currentUser
    axios.defaults.withCredentials = true;
    const userid = user_info?.id;
  //  console.log(user_info)
      const params = {
                        
        userid : userid 
    }
     // vendeur
     useEffect(() => {
      
      const fetchData = async () => {
     
        try {
            //  info vendeur
  
                const data_b = await axios.post(`${apiUrl}/auth/getVendeur` , params);
               
                if(data_b.data.length > 0){
                 setinfo_vendeur(data_b.data[0]);
  
                }
                else{
                 setinfo_vendeur(data_b.data);
                 navigate("/mescomptes")
                }
  
              
  
  
         
        } catch (err) {
          // console.log(err);
          // console.log('erreur here')
        }
      };
      fetchData(userid);
     
  
      });  

      // check gele option
      useEffect(() => {

        if(checkboxes.prix_gele === true){
          const zone = "prix_gele".split('_')
          const text_zone = document.querySelector('input[name = "'+ zone[0] + '"]')
            if(text_zone != null || text_zone != undefined){
              if(!text_zone.classList.contains('disable_zone'))
                text_zone.classList.add('disable_zone');

            }
          
        }

        if(checkboxes.qte_gele === true){
          const zone = "qte_gele".split('_')
          const text_zone = document.querySelector('input[name = "'+ zone[0] + '"]')
        if(text_zone != null || text_zone != undefined){
          if(!text_zone.classList.contains('disable_zone'))
            text_zone.classList.add('disable_zone');

        }
          
        }

        if(checkboxes.reduction_gele === true){
          const zone = "reduction_gele".split('_')
          const text_zone = document.querySelector('input[name = "'+ zone[0] + '"]')
            if(text_zone != null || text_zone != undefined){
              if(!text_zone.classList.contains('disable_zone'))
                text_zone.classList.add('disable_zone');

            }
          
        }
        if(checkboxes.genre_gele === true){
          const text_zonea = document.querySelector('label[name = "masculin"]')
          const text_zoneb = document.querySelector('label[name = "feminin"]')

          if(text_zonea != null || text_zonea != undefined){
            if(!text_zonea.classList.contains('disable_zone'))
              text_zonea.classList.add('disable_zone');
           

            }

            if(text_zoneb != null || text_zoneb != undefined){
              if(!text_zoneb.classList.contains('disable_zone'))
                text_zoneb.classList.add('disable_zone');
             
  
              }
          
        }

        if(checkboxes.age_gele === true){
          const text_zonec = document.querySelector('label[name = "adulte"]')
          const text_zoned = document.querySelector('label[name = "enfant"]')
  
          if(text_zonec != null || text_zonec != undefined){
            if(!text_zonec.classList.contains('disable_zone'))
              text_zonec.classList.add('disable_zone');
          

            }

            if(text_zoned != null || text_zoned != undefined){
              if(!text_zoned.classList.contains('disable_zone'))
                text_zoned.classList.add('disable_zone');
    
  
              }
          
        }

        if(checkboxes.couv_corp_gele === true){
          const text_zone_haut = document.querySelector('label[name = "haut"]')
          const text_zone_combis = document.querySelector('label[name = "combis"]')
          const text_zone_bas = document.querySelector('label[name = "bas"]')
          const text_zone_lingerie = document.querySelector('label[name = "lingerie"]')

          if(text_zone_haut != null || text_zone_haut != undefined){
            if(!text_zone_haut.classList.contains('disable_zone'))
              text_zone_haut.classList.add('disable_zone');
          

            }

            if(text_zone_combis != null || text_zone_combis != undefined){
              if(!text_zone_combis.classList.contains('disable_zone'))
                text_zone_combis.classList.add('disable_zone');
    
  
              }

              if(text_zone_bas != null || text_zone_bas != undefined){
                if(!text_zone_bas.classList.contains('disable_zone'))
                  text_zone_bas.classList.add('disable_zone');
      
    
                }

                if(text_zone_lingerie != null || text_zone_lingerie != undefined){
                  if(!text_zone_lingerie.classList.contains('disable_zone'))
                    text_zone_lingerie.classList.add('disable_zone');
        
      
                  }
          
        }

        if(checkboxes.taille_gele  === true){
            const text_zone_xxl = document.querySelector('label[name = "xxl"]')
            const text_zone_xl = document.querySelector('label[name = "xl"]')
            const text_zone_l = document.querySelector('label[name = "l"]')
            const text_zone_m = document.querySelector('label[name = "m"]')
            const text_zone_sm = document.querySelector('label[name = "sm"]')
    
          if(text_zone_xxl != null || text_zone_xxl != undefined){
            if(!text_zone_xxl.classList.contains('disable_zone'))
              text_zone_xxl.classList.add('disable_zone');
          

            }

            if(text_zone_xl != null || text_zone_xl != undefined){
              if(!text_zone_xl.classList.contains('disable_zone'))
                text_zone_xl.classList.add('disable_zone');
    
  
              }

              if(text_zone_l != null || text_zone_l != undefined){
                if(!text_zone_l.classList.contains('disable_zone'))
                  text_zone_l.classList.add('disable_zone');
      
    
                }

                if(text_zone_m != null || text_zone_m != undefined){
                  if(!text_zone_m.classList.contains('disable_zone'))
                    text_zone_m.classList.add('disable_zone');
        
      
                  }
                  if(text_zone_sm != null || text_zone_sm != undefined){
                    if(!text_zone_sm.classList.contains('disable_zone'))
                      text_zone_sm.classList.add('disable_zone');
          
        
                    }
        }
        if(checkboxes.manche_gele === true){
          const text_zonec = document.querySelector('label[name = "sans-manche"]')
        const text_zoned = document.querySelector('label[name = "manche"]')

          if(text_zonec != null || text_zonec != undefined){
            if(!text_zonec.classList.contains('disable_zone'))
              text_zonec.classList.add('disable_zone');
            }

            if(text_zoned != null || text_zoned != undefined){
              if(!text_zoned.classList.contains('disable_zone'))
                text_zoned.classList.add('disable_zone');
              }
          
        }
        if(checkboxes.col_gele === true){
          const text_zonec = document.querySelector('label[name = "aucun_col"]')
          const text_zoned = document.querySelector('label[name = "col"]')
  
          if(text_zonec != null || text_zonec != undefined){
            if(!text_zonec.classList.contains('disable_zone'))
              text_zonec.classList.add('disable_zone');
            }

            if(text_zoned != null || text_zoned != undefined){
              if(!text_zoned.classList.contains('disable_zone'))
                text_zoned.classList.add('disable_zone');
              }
          
        }
       
        if(checkboxes.designation_gele === true){
          const zone = "designation_gele".split('_')
          const text_zone = document.querySelector('.input_box[name = "'+ zone[0] + '"]')
            if(text_zone != null || text_zone != undefined){
              if(!text_zone.classList.contains('disable_zone'))
                text_zone.classList.add('disable_zone');

            }
          
        }
        if(checkboxes.etat_gele === true){
          const zone = "etat_gele".split('_')
          const text_zone = document.querySelector('.input_box[name = "'+ zone[0] + '"]')
            if(text_zone != null || text_zone != undefined){
              if(!text_zone.classList.contains('disable_zone'))
                text_zone.classList.add('disable_zone');

            }
          
        }

        if(checkboxes.couleur_gele === true){
          const zone = "couleur_gele".split('_')
          const text_zone = document.querySelector('.input_box[name = "'+ zone[0] + '"]')
            if(text_zone != null || text_zone != undefined){
              if(!text_zone.classList.contains('disable_zone'))
                text_zone.classList.add('disable_zone');

            }
          
        }
        if(checkboxes.marque_gele === true){
          const zone = "marque_gele".split('_')
          const text_zone = document.querySelector('.input_box[name = "'+ zone[0] + '"]')
            if(text_zone != null || text_zone != undefined){
              if(!text_zone.classList.contains('disable_zone'))
                text_zone.classList.add('disable_zone');

            }
          
        }
        if(checkboxes.joint_gele === true){
          const zone = "joint_gele".split('_')
          const text_zone = document.querySelector('.input_box[name = "'+ zone[0] + '"]')
            if(text_zone != null || text_zone != undefined){
              if(!text_zone.classList.contains('disable_zone'))
                text_zone.classList.add('disable_zone');

            }
          
        }
        if(checkboxes.typecol_gele === true){
          const zone = "typecol_gele".split('_')
          const text_zone = document.querySelector('.input_box[name = "'+ zone[0] + '"]')
            if(text_zone != null || text_zone != undefined){
              if(!text_zone.classList.contains('disable_zone'))
                text_zone.classList.add('disable_zone');

            }
          
        }
        if(checkboxes.typemanche_gele === true){
          const zone = "typemanche_gele".split('_')
          const text_zone = document.querySelector('.input_box[name = "'+ zone[0] + '"]')
            if(text_zone != null || text_zone != undefined){
              if(!text_zone.classList.contains('disable_zone'))
                text_zone.classList.add('disable_zone');

            }
          
        }
        if(checkboxes.motif_gele === true){
          const zone = "motif_gele".split('_')
          const text_zone = document.querySelector('.input_box[name = "'+ zone[0] + '"]')
            if(text_zone != null || text_zone != undefined){
              if(!text_zone.classList.contains('disable_zone'))
                text_zone.classList.add('disable_zone');

            }
          
        }
        if(checkboxes.occasion_gele === true){
          const zone = "occasion_gele".split('_')
          const text_zone = document.querySelector('.input_box[name = "'+ zone[0] + '"]')
            if(text_zone != null || text_zone != undefined){
              if(!text_zone.classList.contains('disable_zone'))
                text_zone.classList.add('disable_zone');

            }
          
        }
        
      }); 
  // liste des data

  const [localFiles, setLocalFiles] = useState([]);
  const [listImages, setListImages] = useState([]);  
  const [options_designation, setOptions_designation] = useState([]);  
  const [options_marque, setOptions_marque] = useState([]);   
  const [options_etat, setOptions_etat] = useState([]);  
  const [options_couleur, setOptions_couleur] = useState([]); 
  const [options_joint, setOptions_joint] = useState([]);  
  const [options_col, setOptions_col] = useState([]);  
  const [options_manche, setOptions_manche] = useState([]);  
  const [options_motif, setOptions_motif] = useState([]);  
  const [options_occasion, setOptions_occasion] = useState([]);  

  // options caméra
      const videoRef = useRef(null);
      const canvasRef = useRef(null);
      const [camera_active, setCameraactive] = useState(0);
      const [images, setImages] = useState([]);
      const [isFrontCamera, setIsFrontCamera] = useState(true);

      // fonction pour caméra
      
  const startCamera = async () => {
    console.log('test caméra')

    console.log(videoRef)
    console.log(videoRef.current)
    setCameraactive(1)
 
    if(videoRef.current.srcObject) {
      console.log('camera')
      // Stop current video stream if already active
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }

    const constraints = {
      video: {
        facingMode: isFrontCamera ? 'user' : 'environment', // Switch between 'user' for front and 'environment' for back camera
      },
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL('image/png');
    setImages([...images, image]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    images.forEach((image, index) => {
      // Convert base64 to a Blob before sending
      const blob =  (fetch(image)).blob();
      formData.append(`image_${index}`, blob, `image_${index}.png`);
    });

    // Assurez-vous que l'URL correspond à votre serveur Node.js
    await fetch('http://your-server-url/upload', {
      method: 'POST',
      body: formData,
    });
  };

  const switchCamera = () => {
    setIsFrontCamera(!isFrontCamera);
    startCamera();
  };

   // categorie
    useEffect(() => {
    if(categorie === "1"){
        // vetement
        setCategory("vêtement")
        
        
        
    }
    else if(categorie === "2"){
        // accessoire
        setCategory("accessoire")
       
    }
    else if(categorie === "3"){
        // cosmetique
        setCategory("cosmétique")
        
    }
    else if(categorie === "4"){
        // cheveux
        setCategory("cheveux")
        
    }

    }, [categorie]);  
   
    //   designation
                useEffect(() => {
                    if(categorie === "1"){
                        // vetement
                                          
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
                        setOptions_designation(tab_desig)
                
                        })
                        .catch(error => console.error('echec de récupération de données', error));
                        
                    }
                    else if(categorie === "2"){
                        // accessoire
                    
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
                        setOptions_designation(tab_desig)
                
                        })
                        .catch(error => console.error('echec de récupération de données', error));
                    }
                    else if(categorie === "3"){
                        // cosmetique
                    
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
                        setOptions_designation(tab_desig)
                
                        })
                        .catch(error => console.error('echec de récupération de données', error));
                    }
                    else if(categorie === "4"){
                        // cheveux
                    
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
                        setOptions_designation(tab_desig)
                
                        })
                        .catch(error => console.error('echec de récupération de données', error));
                    }
            
                }, [categorie]);

   // marque
    
     useEffect(() => {
        if(categorie === "1"){
            // vetement
           
            
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
              setOptions_marque(tab_data)
    
            })
            .catch(error => console.error('echec de récupération de données', error));
            
        }
        else if(categorie === "2"){
            // accessoire
           
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
              setOptions_marque(tab_data)
    
            })
            .catch(error => console.error('echec de récupération de données', error));
        }
        else if(categorie === "3"){
            // cosmetique
          
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
              setOptions_marque(tab_data)
    
            })
            .catch(error => console.error('echec de récupération de données', error));
        }
        else if(categorie === "4"){
            // cheveux
          
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
              setOptions_marque(tab_data)
    
            })
            .catch(error => console.error('echec de récupération de données', error));
        }
      
      }, [categorie]);
  
       // joint
      
       useEffect(() => {
    
        axios.get(`${apiUrl}/descripteurs/getJoint`)
          .then(response => {
  
  
            // console.log(response.data);
            var tab_desig = [];
            for(let i = 0; i < response.data.length; i++){ 
              tab_desig.push(
                { value: response.data[i].idjoint, label: response.data[i].libjoint }
              )
   
            }
            setOptions_joint(tab_desig)
  
          })
          .catch(error => console.error('echec de récupération de données', error));
      }, []);
  
       // col
      
       useEffect(() => {
    
        axios.get(`${apiUrl}/descripteurs/getCol`)
          .then(response => {
  
  
            // console.log(response.data);
            var tab_desig = [];
            for(let i = 0; i < response.data.length; i++){ 
              tab_desig.push(
                { value: response.data[i].idcol, label: response.data[i].libcol }
              )
   
            }
            setOptions_col(tab_desig)
  
          })
          .catch(error => console.error('echec de récupération de données', error));
      }, []);
  
       // manche
      
       useEffect(() => {
    
        axios.get(`${apiUrl}/descripteurs/getManche`)
          .then(response => {
  
  
            // console.log(response.data);
            var tab_desig = [];
            for(let i = 0; i < response.data.length; i++){ 
              tab_desig.push(
                { value: response.data[i].idmanches, label: response.data[i].libmanches }
              )
   
            }
            setOptions_manche(tab_desig)
  
          })
          .catch(error => console.error('echec de récupération de données', error));
      }, []);
  
       // motif
      
       useEffect(() => {
    
        axios.get(`${apiUrl}/descripteurs/getMotif`)
          .then(response => {
  
  
            // console.log(response.data);
            var tab_desig = [];
            for(let i = 0; i < response.data.length; i++){ 
              tab_desig.push(
                { value: response.data[i].idmotif, label: response.data[i].libmotif }
              )
   
            }
            setOptions_motif(tab_desig)
  
          })
          .catch(error => console.error('echec de récupération de données', error));
      }, []);
  
       // occasion
      
       useEffect(() => {
    
        axios.get(`${apiUrl}/descripteurs/getOccasion`)
          .then(response => {
  
  
            // console.log(response.data);
            var tab_desig = [];
            for(let i = 0; i < response.data.length; i++){ 
              tab_desig.push(
                { value: response.data[i].idoccasion, label: response.data[i].liboccasion }
              )
   
            }
            setOptions_occasion(tab_desig)
  
          })
          .catch(error => console.error('echec de récupération de données', error));
      }, []);
    // etat
    
    useEffect(() => {
  
        axios.get(`${apiUrl}/descripteurs/getEtat`)
          .then(response => {
  
  
            // console.log(response.data);
            var tab_desig = [];
            for(let i = 0; i < response.data.length; i++){ 
              tab_desig.push(
                { value: response.data[i].idetat, label: response.data[i].libeletat }
              )
   
            }
            setOptions_etat(tab_desig)
  
          })
          .catch(error => console.error('echec de récupération de données', error));
      }, []);
  
       // couleur
      
       useEffect(() => {
    
        axios.get(`${apiUrl}/descripteurs/getCouleur`)
          .then(response => {
  
  
            // console.log(response.data);
            var tab_desig = [];
            for(let i = 0; i < response.data.length; i++){ 
              tab_desig.push(
                { value: response.data[i].id, label: response.data[i].libcolor }
              )
   
            }
            setOptions_couleur(tab_desig)
  
          })
          .catch(error => console.error('echec de récupération de données', error));
      }, []);

    // console.log(category)
    
  // declaration des parametres pour les images
  const [upload_img, setUpload_img] = useState([]);  
  const [files, setFiles] = useState([]);
  const [upload_file, setFile] = useState("");  
  const [images_gallery_boxshow, setimages_gallery_boxshow] = useState(false);  
  // const [images_camera_boxshow, setImages_camera_boxshow] = useState(false);  
  const [nav1, setNav1] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slider1, setSlider1] = useState(null);

  
  // formulaire inputs
  const [values, setValues] = useState({
    prix: "",
    qte: "",
    reduction: ""
  }); 

  const [genre, setGenre] = useState(null); 
  const [genre_b, setGenreB] = useState(null); 
  const [genre_a, setGenreA] = useState(null); 
  const [taille, setTaille] = useState(null); 
  const [couv_corp, setCouvcorp] = useState(null); 
  const [age, setAge] = useState(null); 
  const [manche, setManche] = useState(null); 
  const [col, setCol] = useState(null); 
 
  // les selects
  const [designation, setDesignation] = useState(null);
  const [etat, setEtat] = useState(null);
  const [couleur, setCouleur] = useState(null);
  const [marque, setMarque] = useState(null);
  const [joint, setJoint] = useState(null); 
  const [typecol, setTypecol] = useState(null); 
  const [typemanche, setTypemanche] = useState(null);
  const [motif, setMotif] = useState(null);
  const [occasion, setOccasion] = useState(null);
  // console.log("designation")
  // console.log(designation)
// console.log(info_vendeur)

  // fonctions
  const openMask = (event) => {
   
    setimages_gallery_boxshow(true)
  };
  const handlechkChange = (event) => {
    const { name, checked } = event.target;
    // console.log(checked)

    if(event.target.dataset.input === "taille"){
      if(checked === true){
        setTaille(name);
      }
      else{
        setTaille(null);
      }

    }
    else if(event.target.dataset.input === "col"){
      if(checked === true){
        setCol(name);
      }
      else{
        setCol(null);
      }

    }
    else if(event.target.dataset.input === "manche"){
      if(checked === true){
        setManche(name);
      }
      else{
        setManche(null);
      }

    }
      else if(event.target.dataset.input === "genre"){
        if(checked === true){
          setGenre(name);
        }
        else{
          setGenre(null);
        }

      }
      else if(event.target.dataset.input === "genrea"){
        if(checked === true){
          setGenreA(name);
          if(genre_b != null){
             setGenre(3)
          }
          else{
           setGenre(1)
          }

        }
        else{
          setGenreA(null);
           if(genre_b != null){
             setGenre(2)
          }
          else{
           setGenre(null)
          }
        }

      }
      else if(event.target.dataset.input === "genreb"){
        if(checked === true){
          setGenreB(name);
            if(genre_a != null){
             setGenre(3)
          }
          else{
           setGenre(2)
          }
        }
        else{
             setGenreB(null);
            if(genre_a != null){
             setGenre(1)
          }
          else{
           setGenre(null)
          }
        }

      }

    else if(event.target.dataset.input === "age"){
      if(checked === true){
        setAge(name);
      }
      else{
        setAge(null);
      }

    }

    else if(event.target.dataset.input === "couv_corp"){
      if(checked === true){
        setCouvcorp(name);
      }
      else{
        setCouvcorp(null);
      }

    }
   
  };
   
  //  console.log("designation")
  //   console.log(designation)
  
  const saveRecord = async (event) => {
    // console.log(event.target)
    event.preventDefault();
    // console.log(document.querySelector(event.target.dataset.form))
    var produit_values = {};
    var selected_col = null;
    var selected_manche = null;
    // console.log('category')
    // console.log(category)
    if(col === "aucun"){
      selected_col = 1; 

    }
    else if(col === undefined){

      selected_col = null; 

    }
    else{
      // console.log('test')
        selected_col = typecol?.value;
    }

    if(manche === "sans-manche"){
      selected_manche = 1;  

    }
    else if(manche === undefined){
      selected_manche = null; 

    }
    else{
      // console.log('test')
      selected_manche = typemanche?.value;
    }

    // taille
   var taille_value = null;
     if(taille === "xxl"){
             taille_value = 1;
    }
    else if(taille === "xl"){
            taille_value = 2;
    }
     else if(taille === "l"){
        taille_value = 3;
    }
     else if(taille === "m"){
        taille_value = 4;
    }
     else if(taille === "sm"){
      taille_value = 5;
    } 
    else {
      taille_value = null; 

    }

  // genre
   var genre_value = null;

    if(genre_a === null && genre_b === null){
      genre_value = null;
    }
    else if(genre_a !== null && genre_b === null){
      genre_value = 1;
    }
    else if(genre_a === null && genre_b !== null){
      genre_value = 2;
    }
    else if(genre_a !== null && genre_b !== null){
      genre_value = 3;
    }

    // if(genre === "masculin"){
    //          genre_value = 1;
    // }
    // else if(genre === "féminin"){
    //         genre_value = 2;
    // }
    // else if(genre === undefined){
    //   genre_value = null; 

    // }
    //  else{
    //     genre_value = 3;
    // }

    // couverture corporelle
    var couv_corp_value = null;
    if(couv_corp === "haut"){
      couv_corp_value = 1;
    }
    else if(couv_corp === undefined){
      couv_corp_value = null; 

    }
    else if(couv_corp === "bas"){
      couv_corp_value = 2;
    }
     else if(couv_corp === "combis"){
      couv_corp_value = 3;
    }
     else if(couv_corp === "lingerie"){
      couv_corp_value = 4;
    }
    
    
    // age
     var age_value = null;
    if(age === "adulte"){
      age_value = 1;
    }
    else if(age === "enfant"){
      age_value = 2;
    } 
    else{
      age_value = null;
    }
    

    if(category === "vêtement"){
        produit_values = {
          images: listImages,
          prix : values.prix,
          qte : values.qte,
          reduction :values.reduction, 
          genre :genre_value, 
          taille :taille_value, 
          couv_corp :couv_corp_value, 
          age :age_value, 
          manche :selected_manche, 
          col : selected_col, 
          designation :designation?.value, 
          etat : etat?.value, 
          couleur : couleur?.value, 
          marque : marque?.value, 
          joint : joint?.value, 
          // typecol : typecol, 
          // typemanche : typemanche, 
          motif : motif?.value, 
          occasion : occasion?.value, 
          vendeur: info_vendeur?.Mle_vendeur
    
       }

      
  
       try {

      
        await axios
          .post(`${apiUrl}/produitsupload/saveVetements`,
                    [
                           {data : produit_values} 
                                            
                    ]
             )
          .then((result) => {
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

             if(result){
           

              // return false;
              setProduitId(result?.data?.produit)
              setTimeout(() => {
               
                toast.success('produit enrégistré avec succès' , {
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
                  // navigate("/profile", 
                  // { state: { previousPath: location.pathname }});
                
                  // });
                  setRecord(1)
                  setRecordSave(1)
            }, 3500); // Délai de 3 secondes

             }
             else{
              setTimeout(() => {
               
                toast.danger('échec de la sauvegarde du produit' , {
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
                  // navigate("/profile", 
                  // { state: { previousPath: location.pathname }});
                
                  // });
            }, 3500); // Délai de 3 secondes
             }
          
  
        // navigate("/login");
      })
     }
      catch (err) {
        console.log("erreur");
        // setError(err.response.data);
      }

    }
    else if(category === "accessoire"){
      produit_values = {
        images: listImages,
        prix : values.prix,
        qte : values.qte,
        reduction :values.reduction, 
        genre :genre_value, 
        taille :taille_value, 
        age :age_value, 
       
        designation :designation?.value, 
        etat : etat?.value, 
        couleur : couleur?.value, 
        marque : marque?.value, 
        joint : joint?.value, 
        motif : motif?.value, 
        occasion : occasion?.value, 
        vendeur: info_vendeur?.Mle_vendeur
  
     }

     console.log(produit_values)

    //  return false;
      try {
        await axios
        .post(`${apiUrl}/produitsupload/saveAccessoires`,
                  [
                         {data : produit_values} 
                                          
                  ]
           )
        .then((result) => {
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

           if(result){
         
            setProduitId(result?.data?.produit)
            setTimeout(() => {
             
              toast.success('produit enrégistré avec succès' , {
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
                // navigate("/profile", 
                // { state: { previousPath: location.pathname }});
              
                // });
                setRecord(1)
                setRecordSave(1)
          }, 3500); // Délai de 3 secondes

           }
           else{
            setTimeout(() => {
             
              toast.danger('échec de la sauvegarde du produit' , {
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
                // navigate("/profile", 
                // { state: { previousPath: location.pathname }});
              
                // });
          }, 3500); // Délai de 3 secondes
           }
        

      // navigate("/login");
    })
      }
      catch (err) {
        console.log("erreur");
        // setError(err.response.data);
      }
    }
    else if(category === "cosmétique"){
      produit_values = {
        images: listImages,
        prix : values.prix,
        qte : values.qte,
        reduction :values.reduction, 
        genre :genre_value, 
        age :age_value, 
       
        designation :designation?.value, 
        etat : etat?.value, 
        couleur : couleur?.value, 
        marque : marque?.value, 
        vendeur: info_vendeur?.Mle_vendeur
  
     }
     console.log(produit_values)

    //  return false;
      try {

        await axios
          .post(`${apiUrl}/produitsupload/saveCosmetiques`,
                    [
                           {data : produit_values} 
                                            
                    ]
             )
          .then((result) => {
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

             if(result){
              console.log(result)
              setProduitId(result?.data?.produit)
              setTimeout(() => {
               
                toast.success('produit enrégistré avec succès' , {
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
                  // navigate("/profile", 
                  // { state: { previousPath: location.pathname }});
                
                  // });
                  setRecord(1)
                  setRecordSave(1)
            }, 3500); // Délai de 3 secondes

             }
             else{
              setTimeout(() => {
               
                toast.danger('échec de la sauvegarde du produit' , {
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
                  // navigate("/profile", 
                  // { state: { previousPath: location.pathname }});
                
                  // });
            }, 3500); // Délai de 3 secondes
             }
          
  
        // navigate("/login");
      })
      }
      catch (err) {
        console.log("erreur");
        // setError(err.response.data);
      }
    }
    else if(category === "cheveux"){
      produit_values = {
        images: listImages,
        prix : values.prix,
        qte : values.qte,
        reduction :values.reduction, 
        genre :genre_value, 
        taille :taille_value, 
        age :age_value, 
       
        designation :designation?.value, 
        etat : etat?.value, 
        couleur : couleur?.value, 
        marque : marque?.value, 
        motif : motif?.value, 
        occasion : occasion?.value, 
        vendeur: info_vendeur?.Mle_vendeur
  
     }

         console.log(produit_values)

  //  return false;
      try {

        await axios
          .post(`${apiUrl}/produitsupload/saveCheveux`,
                    [
                           {data : produit_values} 
                                            
                    ]
             )
          .then((result) => {
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

             if(result){
              console.log(result)
              setProduitId(result?.data?.produit)
              setTimeout(() => {
               
                toast.success('produit enrégistré avec succès' , {
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
                  // navigate("/profile", 
                  // { state: { previousPath: location.pathname }});
                
                  // });
                  setRecord(1)
                  setRecordSave(1)
            }, 3500); // Délai de 3 secondes

             }
             else{
              setTimeout(() => {
               
                toast.danger('échec de la sauvegarde du produit' , {
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
                  // navigate("/profile", 
                  // { state: { previousPath: location.pathname }});
                
                  // });
            }, 3500); // Délai de 3 secondes
             }
          
  
        // navigate("/login");
      })
      }
      catch (err) {
        console.log("erreur");
        // setError(err.response.data);
      }
    }
   
   console.log(produit_values)

 
   
  };

  
  const publishRecord = async (event) => {
    console.log(event.target)
    var produit_values = {};
    var selected_col = null;
    var selected_manche = null;
    // console.log('category')
    // console.log(category)
    if(col === "aucun"){
      selected_col = 1; 

    }
    else if(col === undefined){

      selected_col = null; 

    }
    else{
      // console.log('test')
        selected_col = typecol?.value;
    }

    if(manche === "sans-manche"){
      selected_manche = 1;  

    }
    else if(manche === undefined){
      selected_manche = null; 

    }
    else{
      // console.log('test')
      selected_manche = typemanche?.value;
    }

    // taille
   var taille_value = null;
     if(taille === "xxl"){
             taille_value = 1;
    }
    else if(taille === "xl"){
            taille_value = 2;
    }
     else if(taille === "l"){
        taille_value = 3;
    }
     else if(taille === "m"){
        taille_value = 4;
    }
     else if(taille === "sm"){
      taille_value = 5;
    } 
    else {
      taille_value = null; 

    }

  // genre
   var genre_value = null;
    if(genre === "masculin"){
             genre_value = 1;
    }
    else if(genre === "féminin"){
            genre_value = 2;
    }
    else if(genre === undefined){
      genre_value = null; 

    }
     else{
        genre_value = 3;
    }

    // couverture corporelle
    var couv_corp_value = null;
    if(couv_corp === "haut"){
      couv_corp_value = 1;
    }
    else if(couv_corp === undefined){
      couv_corp_value = null; 

    }
    else if(couv_corp === "bas"){
      couv_corp_value = 2;
    }
     else if(couv_corp === "combis"){
      couv_corp_value = 3;
    }
     else if(couv_corp === "lingerie"){
      couv_corp_value = 4;
    }
    
    
    // age
     var age_value = null;
    if(age === "adulte"){
      age_value = 1;
    }
    else if(age === "enfant"){
      age_value = 2;
    } 
    else{
      age_value = null;
    }
    
    if(category === "vêtement"){
        produit_values = {
          images: listImages,
          prix : values.prix,
          qte : values.qte,
          reduction :values.reduction, 
          genre :genre_value, 
          taille :taille_value, 
          couv_corp :couv_corp_value, 
          age :age_value, 
          manche :selected_manche, 
          col : selected_col, 
          designation :designation?.value, 
          etat : etat?.value, 
          couleur : couleur?.value, 
          marque : marque?.value, 
          joint : joint?.value, 
          // typecol : typecol, 
          // typemanche : typemanche, 
          motif : motif?.value, 
          occasion : occasion?.value, 
          vendeur: info_vendeur?.Mle_vendeur
    
       }

       try {

        console.log(produit_values)
        // return false;
        await axios
          .post(`${apiUrl}/produitsupload/saveandpublishVetements`,
                    [
                           {data : produit_values} 
                                            
                    ]
             )
          .then((result) => {
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

             if(result){
              console.log(result)
              setProduitId(result?.data?.produit)
              setTimeout(() => {
               
                toast.success('produit enrégistré et publié avec succès' , {
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
                 
                  setRecord(null)
                  setRecordSave(null)
                  setPublish(1)
            }, 3500); // Délai de 3 secondes

             }
             else{
              setTimeout(() => {
               
                toast.danger('échec de la sauvegarde du produit' , {
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
                  // navigate("/profile", 
                  // { state: { previousPath: location.pathname }});
                
                  // });
            }, 3500); // Délai de 3 secondes
             }
          
  
        // navigate("/login");
      })
     }
      catch (err) {
        console.log("erreur");
        // setError(err.response.data);
      }

    }

    else if(category === "accessoire"){
      produit_values = {
        images: listImages,
        prix : values.prix,
        qte : values.qte,
        reduction :values.reduction, 
        genre :genre_value, 
        taille :taille_value, 
        age :age_value, 
       
        designation :designation?.value, 
        etat : etat?.value, 
        couleur : couleur?.value, 
        marque : marque?.value, 
        joint : joint?.value, 
        motif : motif?.value, 
        occasion : occasion?.value, 
        vendeur: info_vendeur?.Mle_vendeur
  
     }
      try {
        await axios
        .post(`${apiUrl}/produitsupload/saveandpublishAccessoires`,
                  [
                         {data : produit_values} 
                                          
                  ]
           )
        .then((result) => {
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

           if(result){
            console.log(result)
            setProduitId(result?.data?.produit)
            setTimeout(() => {
             
              toast.success('produit enrégistré et publié avec succès' , {
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
                // navigate("/profile", 
                // { state: { previousPath: location.pathname }});
              
                setRecord(null)
                setRecordSave(null)
                setPublish(1)
          }, 3500); // Délai de 3 secondes

           }
           else{
            setTimeout(() => {
             
              toast.danger('échec de la sauvegarde du produit' , {
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
                // navigate("/profile", 
                // { state: { previousPath: location.pathname }});
              
                // });
          }, 3500); // Délai de 3 secondes
           }
        

      // navigate("/login");
    })
      }
      catch (err) {
        console.log("erreur");
        // setError(err.response.data);
      }
    }

    else if(category === "cosmétique"){
      produit_values = {
        images: listImages,
        prix : values.prix,
        qte : values.qte,
        reduction :values.reduction, 
        genre :genre_value, 
        age :age_value, 
       
        designation :designation?.value, 
        etat : etat?.value, 
        couleur : couleur?.value, 
        marque : marque?.value, 
        vendeur: info_vendeur?.Mle_vendeur
  
     }
      try {

        await axios
          .post(`${apiUrl}/produitsupload/saveandpublishCosmetiques`,
                    [
                           {data : produit_values} 
                                            
                    ]
             )
          .then((result) => {
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

             if(result){
              console.log(result)
              setProduitId(result?.data?.produit)
              setTimeout(() => {
               
                toast.success('produit enrégistré et publié avec succès' , {
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
                  // navigate("/profile", 
                  // { state: { previousPath: location.pathname }});
                
                  // });
                  setRecord(null)
                  setRecordSave(null)
                  setPublish(1)
            }, 3500); // Délai de 3 secondes

             }
             else{
              setTimeout(() => {
               
                toast.danger('échec de la sauvegarde du produit' , {
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
                  // navigate("/profile", 
                  // { state: { previousPath: location.pathname }});
                
                  // });
            }, 3500); // Délai de 3 secondes
             }
          
  
        // navigate("/login");
      })
      }
      catch (err) {
        console.log("erreur");
        // setError(err.response.data);
      }
    }

    else if(category === "cheveux"){
      produit_values = {
        images: listImages,
        prix : values.prix,
        qte : values.qte,
        reduction :values.reduction, 
        genre :genre_value, 
        taille :taille_value, 
        age :age_value, 
       
        designation :designation?.value, 
        etat : etat?.value, 
        couleur : couleur?.value, 
        marque : marque?.value, 
        motif : motif?.value, 
        occasion : occasion?.value, 
        vendeur: info_vendeur?.Mle_vendeur
  
     }
      try {

        await axios
          .post(`${apiUrl}/produitsupload/saveandpublishCheveux`,
                    [
                           {data : produit_values} 
                                            
                    ]
             )
          .then((result) => {
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

             if(result){
              console.log(result)
              setProduitId(result?.data?.produit)
              setTimeout(() => {
               
                toast.success('produit enrégistré et publié avec succès' , {
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
                  // navigate("/profile", 
                  // { state: { previousPath: location.pathname }});
                
                  // });
                  setRecord(null)
                  setRecordSave(null)
                  setPublish(1)
            }, 3500); // Délai de 3 secondes

             }
             else{
              setTimeout(() => {
               
                toast.danger('échec de la sauvegarde du produit' , {
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
                  // navigate("/profile", 
                  // { state: { previousPath: location.pathname }});
                
                  // });
            }, 3500); // Délai de 3 secondes
             }
          
  
        // navigate("/login");
      })
      }
      catch (err) {
        console.log("erreur");
        // setError(err.response.data);
      }
    }
   };
   const Publishnow = async () => {
      const param = {
        id : produit_id
      }
    const publishing = await axios.post(`${apiUrl}/produitsupload/publish_produit` , param);
    toast.info('publication en cours' , {
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
    
    console.log(publishing.data) 
    if(publishing.data.msg === "update success"){
      setTimeout(() => {
               
        toast.success('produit publié avec succès' , {
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
          // navigate("/profile", 
          // { state: { previousPath: location.pathname }});
        
          // });
          setRecord(null)
          setRecordSave(null)
          setPublish(1)
    }, 3500); // Délai de 3 secondes

    }        

   };

   const UpdateForm = async () => {
     
    setRecordSave(null)
    setRecord(null)
    setUpdating(1)
    // console.log(param)     

 };
   const UpdateFiche = async () => {
 
   
    const param = {
      id : produit_id
    }
 
    // return false;
    event.preventDefault();
    // console.log(document.querySelector(event.target.dataset.form))
    var produit_values = {};
    var selected_col = null;
    var selected_manche = null;
    // console.log('category')
    // console.log(category)
    if(col === "aucun"){
      selected_col = 1; 

    }
    else if(col === undefined){

      selected_col = null; 

    }
    else{
      // console.log('test')
        selected_col = typecol?.value;
    }

    if(manche === "sans-manche"){
      selected_manche = 1;  

    }
    else if(manche === undefined){
      selected_manche = null; 

    }
    else{
      // console.log('test')
      selected_manche = typemanche?.value;
    }

    // taille
   var taille_value = null;
     if(taille === "xxl"){
             taille_value = 1;
    }
    else if(taille === "xl"){
            taille_value = 2;
    }
     else if(taille === "l"){
        taille_value = 3;
    }
     else if(taille === "m"){
        taille_value = 4;
    }
     else if(taille === "sm"){
      taille_value = 5;
    } 
    else {
      taille_value = null; 

    }

  // genre
   var genre_value = null;
    if(genre === "masculin"){
             genre_value = 1;
    }
    else if(genre === "féminin"){
            genre_value = 2;
    }
    else if(genre === undefined){
      genre_value = null; 

    }
     else{
        genre_value = 3;
    }

    // couverture corporelle
    var couv_corp_value = null;
    if(couv_corp === "haut"){
      couv_corp_value = 1;
    }
    else if(couv_corp === undefined){
      couv_corp_value = null; 

    }
    else if(couv_corp === "bas"){
      couv_corp_value = 2;
    }
     else if(couv_corp === "combis"){
      couv_corp_value = 3;
    }
     else if(couv_corp === "lingerie"){
      couv_corp_value = 4;
    }
    
    
    // age
     var age_value = null;
    if(age === "adulte"){
      age_value = 1;
    }
    else if(age === "enfant"){
      age_value = 2;
    } 
    else{
      age_value = null;
    }
    

    if(category === "vêtement"){
        produit_values = {
          id : produit_id,
          images: listImages,
          prix : values.prix,
          qte : values.qte,
          reduction :values.reduction, 
          genre :genre_value, 
          taille :taille_value, 
          couv_corp :couv_corp_value, 
          age :age_value, 
          manche :selected_manche, 
          col : selected_col, 
          designation :designation?.value, 
          etat : etat?.value, 
          couleur : couleur?.value, 
          marque : marque?.value, 
          joint : joint?.value, 
          // typecol : typecol, 
          // typemanche : typemanche, 
          motif : motif?.value, 
          occasion : occasion?.value, 
          vendeur: info_vendeur?.Mle_vendeur
    
       }

       console.log(produit_values)

      //  return false;
  
       try {

        console.log(produit_values)
        // return false;
        await axios
          .post(`${apiUrl}/produitsupload/updateVetements`,
                    [
                           {data : produit_values} 
                                            
                    ]
             )
          .then((result) => {
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

             if(result){
              console.log(result)

              // return false;
              setProduitId(result?.data?.produit)
              setTimeout(() => {
               
                toast.success('produit mis à jour avec succès' , {
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
                  // navigate("/profile", 
                  // { state: { previousPath: location.pathname }});
                
                  // });
                  setRecord(1)
                  setRecordSave(1)
            }, 3500); // Délai de 3 secondes

             }
             else{
              setTimeout(() => {
               
                toast.danger('échec de la sauvegarde du produit' , {
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
                  // navigate("/profile", 
                  // { state: { previousPath: location.pathname }});
                
                  // });
            }, 3500); // Délai de 3 secondes
             }
          
  
        // navigate("/login");
      })
     }
      catch (err) {
        console.log("erreur");
        // setError(err.response.data);
      }

    }
    else if(category === "accessoire"){
      produit_values = {
        id : produit_id,
        images: listImages,
        prix : values.prix,
        qte : values.qte,
        reduction :values.reduction, 
        genre :genre_value, 
        taille :taille_value, 
        age :age_value, 
       
        designation :designation?.value, 
        etat : etat?.value, 
        couleur : couleur?.value, 
        marque : marque?.value, 
        joint : joint?.value, 
        motif : motif?.value, 
        occasion : occasion?.value, 
        vendeur: info_vendeur?.Mle_vendeur
  
     }

     console.log(produit_values)

    //  return false;
      try {
        await axios
        .post(`${apiUrl}/produitsupload/updateAccessoires`,
                  [
                         {data : produit_values} 
                                          
                  ]
           )
        .then((result) => {
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

           if(result){
            console.log(result)

            // return false;
            setProduitId(result?.data?.produit)
            setTimeout(() => {
             
              toast.success('produit mis à jour avec succès' , {
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
                // navigate("/profile", 
                // { state: { previousPath: location.pathname }});
              
                // });
                setRecord(1)
                setRecordSave(1)
          }, 3500); // Délai de 3 secondes

           }
           else{
            setTimeout(() => {
             
              toast.danger('échec de la sauvegarde du produit' , {
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
                // navigate("/profile", 
                // { state: { previousPath: location.pathname }});
              
                // });
          }, 3500); // Délai de 3 secondes
           }
       })
   }
      catch (err) {
        console.log("erreur");
        // setError(err.response.data);
      }
    }
    else if(category === "cosmétique"){
      produit_values = {
        id : produit_id,
        images: listImages,
        prix : values.prix,
        qte : values.qte,
        reduction :values.reduction, 
        genre :genre_value, 
        age :age_value, 
       
        designation :designation?.value, 
        etat : etat?.value, 
        couleur : couleur?.value, 
        marque : marque?.value, 
        vendeur: info_vendeur?.Mle_vendeur
  
     }
     console.log(produit_values)

    //  return false;
      try {

        await axios
          .post(`${apiUrl}/produitsupload/updateCosmetiques`,
                    [
                           {data : produit_values} 
                                            
                    ]
             )
             .then((result) => {
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
 
            if(result){
             console.log(result)
 
             // return false;
             setProduitId(result?.data?.produit)
             setTimeout(() => {
              
               toast.success('produit mis à jour avec succès' , {
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
                 // navigate("/profile", 
                 // { state: { previousPath: location.pathname }});
               
                 // });
                 setRecord(1)
                 setRecordSave(1)
           }, 3500); // Délai de 3 secondes
 
            }
            else{
             setTimeout(() => {
              
               toast.danger('échec de la sauvegarde du produit' , {
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
                 // navigate("/profile", 
                 // { state: { previousPath: location.pathname }});
               
                 // });
           }, 3500); // Délai de 3 secondes
            }
           })
      }
      catch (err) {
        console.log("erreur");
        // setError(err.response.data);
      }
    }
    else if(category === "cheveux"){
      produit_values = {
        id : produit_id,
        images: listImages,
        prix : values.prix,
        qte : values.qte,
        reduction :values.reduction, 
        genre :genre_value, 
        taille :taille_value, 
        age :age_value, 
       
        designation :designation?.value, 
        etat : etat?.value, 
        couleur : couleur?.value, 
        marque : marque?.value, 
        motif : motif?.value, 
        occasion : occasion?.value, 
        vendeur: info_vendeur?.Mle_vendeur
  
     }

         console.log(produit_values)

  //  return false;
      try {

        await axios
          .post(`${apiUrl}/produitsupload/updateCheveux`,
                    [
                           {data : produit_values} 
                                            
                    ]
             )
           .then((result) => {
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
 
            if(result){
             console.log(result)
 
             // return false;
             setProduitId(result?.data?.produit)
             setTimeout(() => {
              
               toast.success('produit mis à jour avec succès' , {
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
                 // navigate("/profile", 
                 // { state: { previousPath: location.pathname }});
               
                 // });
                 setRecord(1)
                 setRecordSave(1)
           }, 3500); // Délai de 3 secondes
 
            }
            else{
             setTimeout(() => {
              
               toast.danger('échec de la sauvegarde du produit' , {
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
                 // navigate("/profile", 
                 // { state: { previousPath: location.pathname }});
               
                 // });
           }, 3500); // Délai de 3 secondes
            }
           })
      }
      catch (err) {
        console.log("erreur");
        // setError(err.response.data);
      }
    }     

 };
   const Publishafter = async (event) => {
        setPublish(0)
   };

   const SameCategory = async (event) => {
    // console.log('même catégorie')
    setListImages([])
    setUpload_img([])
    setFile("")
    setimages_gallery_boxshow(false)
    setImages_camera_boxshow(false)

  
    if(checkboxes?.genre_gele === false){
    
      setGenreA(null)
      setGenreB(null)
    }

  
      if(checkboxes?.taille_gele === false){
    
          setTaille(null)
    }

  
      if(checkboxes?.couv_corp_gele === false){
             setCouvcorp(null)
    }
  
    if(checkboxes?.age_gele === false){
    
           setAge(null)
    }
    
     
      if(checkboxes?.manche_gele === false){
    
        setManche(null)
    }
    
      if(checkboxes?.col_gele === false){
    
        setCol(null)
    }
    

      if(checkboxes?.designation_gele === false){
    
        setDesignation(null)
    }
    

      if(checkboxes?.etat_gele === false){
    
        setEtat(null)
    }
   
   if(checkboxes?.couleur_gele === false){
    
        setCouleur(null)
    }
   
      if(checkboxes?.marque_gele === false){
    
        setMarque(null)
    }
   
      if(checkboxes?.joint_gele === false){
    
        setJoint(null)
    }
    
      if(checkboxes?.typecol_gele === false){
    
        setTypecol(null)
    }
   
      if(checkboxes?.typemanche_gele === false){
    
        setTypemanche(null)
    }
    
      if(checkboxes?.motif_gele === false){
    
        setMotif(null)
    }
     
      if(checkboxes?.occasion_gele === false){
    
        setOccasion(null)
    }


    if(checkboxes?.prix_gele === false){
    
        setValues(
        { prix: ""}
          
        )
    }

      if(checkboxes?.qte_gele === false){
    
        setValues(
        { qte: ""}
          
        )
    }

      if(checkboxes?.reduction_gele === false){
    
        setValues(
        { ...values , reduction: null}
          
        )
    }
 
    setPublish(null)
    setProduitId(null)
    
    setRecord(0)
  };



  
  useEffect(() => {
    setNav1(slider1);
  }, [slider1]);

    const settings = {
    //   dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      autoplay: false,
      autoplaySpeed: 1000,
      onReInit: () => setCurrentSlide(slider1?.innerSlider.state.currentSlide),
      lazyLoad: true,
      asNavFor: ".slider-nav",
      focusOnSelect: true,
      nextArrow: (
        <div>
          <div className="next-slick-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" stroke="black" height="24" viewBox="0 -960 960 960" width="24"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/></svg>
          </div>
        </div>
      ),
  
      prevArrow: (
        <div>
          <div className="next-slick-arrow rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" stroke="black" height="24" viewBox="0 -960 960 960" width="24"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/></svg>
          </div>
        </div>
      ),
   };
   const cancel_uploading = () => {
    // console.log('test')
    if(images_gallery_boxshow === true){
        setimages_gallery_boxshow(false)

    }
   
  
  };

  const deleteImage = (e) => {
    // alert(e.target.dataset.id)
  
    var tab_image_rec = upload_img;
    if(e.target.dataset.id != undefined){
    
      console.log(upload_img)
      console.log(tab_image_rec[e.target.dataset.id])

      const updatedImage = tab_image_rec.filter(image => image?.id != e.target.dataset.id);
     
     console.log('updatedImage')
     
     console.log(updatedImage)

     console.log('upload_file')
     console.log(upload_file)
      setUpload_img(updatedImage);
 
      var this_name = upload_file[e.target.dataset.id].name;
 
      const updatedFIles = upload_file.filter(file  => file.name != this_name);
      
     
         
      setFile(updatedFIles) 
    }
   
  
  };
  const onImageChange = (e) => {  
    
  var tab_img = [];
  var tab_file_upload = [];
    
    for(let i= 0;i < upload_img.length; i++ ){

      tab_img.push(upload_img[i])
    }

  for(let j= 0; j< e.target.files.length; j++ ){
    var this_path = URL.createObjectURL(e.target.files[j]);
    
  
    tab_img.push({
      id: j,
      src: this_path,
      alt: "image indisponible"
    })
  
 
  }
   console.log("tab_img")
   console.log(tab_img)
    setUpload_img(tab_img);

    for(let i= 0;i < upload_file.length; i++ ){

      tab_file_upload.push(upload_file[i])
    }

    const files = Array.from(e.target.files);
    // setSelectedFiles(files);
    for(let i= 0;i < files.length; i++ ){

      tab_file_upload.push(files[i])
    }

    console.log("tab_file_upload")
    console.log(tab_file_upload)
  
    setFile(tab_file_upload);
 
  };

  
  const upload_produit_image = () => {  
    var tab_path = [];
    for(let i= 0;i < upload_img.length; i++ ){

      tab_img.push(upload_img[i])
    }
   
    if(biens_dataupdate.length > 0){
      var path_1 = "",  path_2 = "",  path_3 = "", 
          path_4 = "",  path_5 = "",  path_6 = "", 
          path_7 = "",  path_8 = "",  path_9 = "", 
          path_10 = "";

        if(biens_dataupdate[0]?.path_image1 != "")
          path_1 = biens_dataupdate[0]?.path_image1;

        if(biens_dataupdate[0]?.path_image2 != "")
          path_2 = biens_dataupdate[0]?.path_image2;

        if(biens_dataupdate[0]?.path_image3 != "")
          path_3 = biens_dataupdate[0]?.path_image3;

        if(biens_dataupdate[0]?.path_image4 != "")
          path_4 = biens_dataupdate[0]?.path_image4;

        if(biens_dataupdate[0]?.path_image5 != "")
          path_5 = biens_dataupdate[0]?.path_image5;

        if(biens_dataupdate[0]?.path_image6 != "")
          path_6 = biens_dataupdate[0]?.path_image6;

        if(biens_dataupdate[0]?.path_image7 != "")
          path_7 = biens_dataupdate[0]?.path_image7;

        if(biens_dataupdate[0]?.path_image8 != "")
          path_8 = biens_dataupdate[0]?.path_image8;

        if(biens_dataupdate[0]?.path_image9 != "")
          path_9 = biens_dataupdate[0]?.path_image9;

        if(biens_dataupdate[0]?.path_image10 != "")
          path_10 = biens_dataupdate[0]?.path_image10;
        
       
        tab_path.push(path_1, path_2, path_3 , path_4 , path_5 , path_6 , path_7 , path_8 , path_9 , path_10)
     
    }

    console.log(tab_path)
  
    // Filtrer uniquement les chaînes vides, null et undefined
    const filteredArray = tab_path.filter((item) => item !== '' && item !== null && item !== undefined);
    console.log(filteredArray)
    
  for(let j= 0; j< tab_path.length; j++ ){
    

    if(tab_path[j] !== ""){
      // require(`./images/${imageName}`).default;

      // var this_image = import(`https://fsapi.fashionecos.com/${tab_path[j]}`)
    
      // console.log("this_image")
      // console.log(this_image)

      
      var this_path = URL.createObjectURL();
      
      return false;

    }
    // var this_path =   URL.createObjectURL(e.target.files[j]);
    //  this_path =   URL.createObjectURL(e.target.files[j]);
    //  console.log(e.target.files[j]?.name)
    //  console.log(e.target.files[j])
  
    // tab_img.push({
    //   id: j,
    //   src: this_path,
    //   alt: "image indisponible"
    // })
  
 
}
    // setUpload_img(tab_img);
    // const files = Array.from(e.target.files);
    // // setSelectedFiles(files);
  
    // setFile(files);
 
  };
  
  
   const valid_uploading = async () => {
  // const resp = handleSaveLocal();

  const formData_b = new FormData();
  upload_file.forEach((file) => formData_b.append('images', file));

  try {
    // const response = await axios.post('http://localhost:8000/api/save-local', formData_b, {
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${apiUrl}/upload/saveImage`, formData_b, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log("response.data.files")
    console.log(response.data.files)
    
    setLocalFiles(response.data.files); // Mettre à jour la liste des fichiers sauvegardés localement
    setListImages(response?.data?.files)
    // console.log({ message: 'Images sauvegardées localement', data_img : response.data.files});
    // setListImages(response?.data?.files)
    // return {resp : response.data.files};

    if(response.data.files != undefined){
        console.log("response.data.files")
        console.log(response.data.files)
        if(images_gallery_boxshow === true){
          setimages_gallery_boxshow(false)

        }
        if(images_camera_boxshow === true){
          setImages_camera_boxshow(false)

        }
    
        
    
      }
  } catch (error) {
    console.error('Erreur lors de la sauvegarde locale :', error);
  }
 
  };
  // console.log(listImages)
    const Show_gallerybox = () => {
      // console.log("gallery")
        if(images_gallery_boxshow === true){
        
            setimages_gallery_boxshow(false)
            // open gallery
          
        }
        else{
            setimages_gallery_boxshow(true)
            var select_img = document.querySelector('#select_img');
            // console.log(select_img)
            select_img.click();

        }
      
      };
      const Show_camerabox = () => {
        if(images_camera_boxshow === true){
            setImages_camera_boxshow(false)

        }
        else{
            setImages_camera_boxshow(true)
            startCamera()

        }
      
      };

      
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target)
    //   console.log(e.target)
  
  
  };

  //  console.log(upload_img)
  return (
    <>
    <div className="body-wrapper">
      <main id="MainContent" className="content-for-layout creer_produit">
      <ToastContainer />

          {/* select option prise images */}
          <div className="container">
            {/* form zone */}
          
 
          {upload_img.length === 0 ?
          (
            // select image
             <div className="option_image">
          
                         <div className="row">
           
                    <div className="col-lg-6 col-md-6 col-6 inline_box camera_box">
                                    <div className="trusted-badge rounded p-0 ">
                                    <label htmlFor="" onClick={Show_camerabox} data-box="camera_box">
                                        <div className="trusted-icon">
                                        <FontAwesomeIcon size="sm" icon={faCamera} className='icon-trusted'/>
                                            {/* <img className="icon-trusted" src="assets/img/trusted/1.png" alt="icon-1"/> */}
                                        </div>
                                        <div className="trusted-content">
                                            <h2 className="heading_18 trusted-heading">caméra</h2>
                                            
                                        </div>


                                        </label>
                                       
                                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-6 inline_box">
                                    <div className="trusted-badge rounded p-0">
                                        <label htmlFor=""onClick={Show_gallerybox} data-box="gallery_box">
                                        <input id="select_img"  className='display_none' type="file" multiple accept="image/*" onChange={onImageChange} />
                                             <div className="trusted-icon">
                                               <FontAwesomeIcon size="sm" icon={faImage} className='icon-trusted'/>
                                            {/* <img className="icon-trusted" src="assets/img/trusted/1.png" alt="icon-1"/> */}
                                        </div>
                                        <div className="trusted-content">
                                            <h2 className="heading_18 trusted-heading">Gallérie</h2>
                                            
                                        </div>


                                        </label>
                                       
                                    </div>
                </div>


            </div>
       
            </div>
          )
          :
          (
              <>
              {publish === 1
               ?
               (
                <>
                  <div className="form_box">
                           <Header_banner  data_props ={{ 
                                  //   title: 'Publier un produit: vêtement',
                                    title: `notification: ${category}`,
                            }} 
                            data_page = {{type: "catalogue" , back_option: "on"}}
                          />
                           <div className="description_wrapper">
                            <div className="card">
                              <div className="notification">
                                Vous avez publié avec succès un produit!
                              </div>

                              <div className="send_btn actions">
                            
                                            <Link  to={`/fiche_produit/${produit_id}/${categorie}`} >
                                              <label data-form="recordProduit" className='link_cst save_btn'>
                                                   
                                                    voir fiche produit
                                              </label>
                                                                                                  
                                          </Link>

                                        
                              {/* <label data-form="recordProduit" onClick={saveRecord} name="save" className='link_cst save_btn'>
                                      modifier
                              </label> */}
                             <Link to="/catalogues"  >
                                <label data-form="recordProduit" onClick={Publishnow} name="publish" className='link_cst publish_btn'>
                                {/* <FontAwesomeIcon size="sm" icon={faPlus} className='icon-trusted'/> */}
                                    mon catalogue
                                </label> 
                                                                                  
                            </Link>

                  </div>
                            </div>
                            <div className="title actions">
                            <label> Publier un nouveau produit</label>
                          </div>
                            <div className="send_btn actions">

                           
                            <label data-form="recordProduit" onClick={SameCategory} name="save" className='link_cst save_btn'>
                                      <FontAwesomeIcon size="sm" icon={faPlus} className='icon-trusted'/>
                                           
                                                 de la même catégorie
                            </label>
                                          {/* <label data-form="recordProduit" onClick={saveRecord} name="save" className='link_cst save_btn'>
                                                  modifier
                                          </label> */}
                                 <Link to="/categories"  >
                                           <label  className='link_cst publish_btn'>
                                          <FontAwesomeIcon size="sm" icon={faPlus} className='icon-trusted'/>
                                              d&apos;une autre catégorie
                                          </label>   
                                                                                  
                                </Link>

                                        

                              </div>

                             


                           </div>
                    
                  </div>

                </>

               )
               :
               publish === 0 ?

               (
                <>
                  <div className="form_box">
                           <Header_banner  data_props ={{ 
                                  //   title: 'Publier un produit: vêtement',
                                    title: `notification: ${category}`,
                            }} 
                            data_page = {{type: "catalogue" , back_option: "on"}}
                          />
                           <div className="description_wrapper">
                            <div className="card">
                              <div className="notification">
                                Vous avez programmé la publication d'un produit!
                              </div>

                              <div className="send_btn actions">
                           
                              <Link  to={`/fiche_produit/${produit_id}/${categorie}`} >
                              <label data-form="recordProduit" onClick={Publishafter} name="save" className='link_cst save_btn'>
                                    {/* <FontAwesomeIcon size="sm" icon={faPlus} className='icon-trusted'/> */}
                               
                                    voir fiche produit
                              </label>
                                                                                  
                            </Link>
                              {/* <label data-form="recordProduit" onClick={saveRecord} name="save" className='link_cst save_btn'>
                                      modifier
                              </label> */}
                                <Link to="/catalogues"  >
                                <label data-form="recordProduit" onClick={Publishnow} name="publish" className='link_cst publish_btn'>
                              {/* <FontAwesomeIcon size="sm" icon={faPlus} className='icon-trusted'/> */}
                                  mon catalogue
                              </label> 
                                                                                  
                                </Link>
                            

                  </div>
                            </div>
                            <div className="title actions">
                            <label> Publier un nouveau produit</label>
                          </div>
                            <div className="send_btn actions">
                           
                            <label data-form="recordProduit" onClick={SameCategory} name="save" className='link_cst save_btn'>
                                      <FontAwesomeIcon size="sm" icon={faPlus} className='icon-trusted'/>
                                           
                                                 de la même catégorie
                                          </label>
                                          {/* <label data-form="recordProduit" onClick={saveRecord} name="save" className='link_cst save_btn'>
                                                  modifier
                                          </label> */}
                                          <Link to="/categories"  >
                                           <label  className='link_cst publish_btn'>
                                          <FontAwesomeIcon size="sm" icon={faPlus} className='icon-trusted'/>
                                              d'une autre catégorie
                                          </label>   
                                                                                  
                                </Link>

                              </div>

                             


                           </div>
                    
                  </div>

                </>

               )

               :

               (
                <>
                 {record === 1 
                  ?
                  (
                    <>
                      <div className="form_box">
                        <Header_banner  data_props ={{ 
                                  //   title: 'Publier un produit: vêtement',
                                    title: `Détails fiche produit: ${category}`,
                            }} 
                            data_page = {{type: "catalogue" , back_option: "on"}}
                          />
                        <div className="list_image">
                          <div className="title">
                          <label>Images du produit</label>
                          </div>
                            
                                <div className="images-wrapper">
                                                    {upload_img.map((item) => (
                                                        <div key={`full_a_${item.id}`}>
                                                          <img  src={item?.src}  alt={item.alt} />
                                                        
                                                        </div>
                                                    ))}
                                            
                                </div>
      
                        </div>
                        <div className="description_wrapper">
                          <div className="title">
                            <label> autres details du produit</label>
                          </div>
                          <div className="list_descripteurs">
                                    {/* <div className="lbl_important">
                                        <label className="mt-1 text-left ">Champs obligatoires ( * )</label>
                                      </div>    */}
                            <div className="text_input">
                                  <div className="form-group">  
                                      
                                      {/* prix */}
                                        <div className="input_line">                                                                                                    
                                                    <label className="input_lbl">Prix</label>  
                                              <div className="input_box">
                                                {values.prix === null || values.prix === "" || values.prix === undefined

                                                ?
                                                (
                                                  <label className="input_lbl">-</label>  

                                                )

                                                :

                                                (
                                                  <label className="input_lbl">{values.prix}</label>  

                                                )
                                                
                                                }
                                            
                                                  
                                                </div>
                                            
                                                                                                                                                                                                                                                                              
                                        </div>
                                      {/* qte */}
                                        <div className="input_line">
      
                                          <label className="input_lbl">Quantité</label>
                                          
                                              <div className="input_box">
                                                {values.qte === null || values.qte === "" || values.qte === undefined

                                                ?
                                                (
                                                  <label className="input_lbl">-</label>  

                                                )

                                                :

                                                (
                                                  <label className="input_lbl">{values.qte}</label>  

                                                )
                                                
                                                }
                                            
                                                  
                                                </div>
                                            
                                                                                                                                                                                                                                                                              
                                        
                                                                        
                                                                                                                                                    
                                                                                                                                          
                                        </div>
                                        {/* reduction */}
                                        <div className="input_line">
      
                                          <label className="input_lbl">Réduction</label>  
                                          <div className="input_box">
                                                {values.reduction === null || values.reduction === "" || values.reduction === undefined

                                                ?
                                                (
                                                  <label className="input_lbl">-</label>  

                                                )

                                                :

                                                (
                                                  <label className="input_lbl">{values.reduction}</label>  

                                                )
                                                
                                                }
                                            
                                                  
                                                </div>
      
                                                                  
                                                          
                                        </div>                                                                                          
                                </div>
      
                            </div>
                            <div className="checkable_input">
                              {/* genre */}
                                <div className="input_line">
      
                                <label className="input_lbl">Genre</label>  
                                            <div className="input_box">
                                                {genre === null || genre === "" || genre === undefined

                                                ?
                                                (
                                                  <label className="input_lbl">-</label>  

                                                )

                                                :

                                                (
                                                  <label className="input_lbl">{genre}</label>  

                                                )
                                                
                                                }
                                            
                                                  
                                          </div>
      
                                          
      
                                                      
                                                
                                </div>
      
                                {/* age */}
                                <div className="input_line">
      
                                  <label className="input_lbl">Age</label>  
                                      <div className="input_box">
                                                {age === null || age === "" || age === undefined

                                                ?
                                                (
                                                  <label className="input_lbl">-</label>  

                                                )

                                                :

                                                (
                                                  <label className="input_lbl">{age}</label>  

                                                )
                                                
                                                }
                                            
                                                  
                                      </div>                              
                                </div>
      
                              {category === "vêtement" &&
                                  (
                                      <>
                                      {/* couverture corporelle */}
                                          <div className="input_line">
      
                                              <label className="input_lbl">couv. corp.</label>  
                                              <div className="input_box">
                                                {couv_corp === null || couv_corp === "" || couv_corp === undefined

                                                ?
                                                (
                                                  <label className="input_lbl">-</label>  

                                                )

                                                :

                                                (
                                                  <label className="input_lbl">{couv_corp}</label>  

                                                )
                                                
                                                }
                                            
                                                  
                                          </div>
      
                                                                                
                                                                              
                                              </div>
                                      </>
                                  )
                              }
      
                              {/* taille */}
                              {category != "cosmétique" && 
                              (
                                  <div className="input_line">
      
                                  <label className="input_lbl">Taille</label>  
                                            <div className="input_box">
                                            {taille === null || taille === "" || taille === undefined

                                                ?
                                                (
                                                  <label className="input_lbl">-</label>  

                                                )

                                                :

                                                (
                                                  <label className="input_lbl">{taille}</label>  

                                                )
                                                
                                                }
                                            
                                                  
                                          </div>
      
                                                
                                </div>
      
                              )}
                            
                           </div>
                            
                            <div className="select_input">
                              {/* désignation (classe du produit) */}
                                      <div className="input_line">                                                                                                    
                                                      <label className="input_lbl">Désignation</label> 
                                                  <div className="input_box">
                                                      {designation === null || designation === "" || designation === undefined

                                                          ?
                                                          (
                                                            <label className="input_lbl">-</label>  

                                                          )

                                                          :

                                                          (
                                                            <label className="input_lbl">{
                                                              designation.label
                                                              
                                                              }</label>  

                                                          )
                                                          
                                                          }
                                                      
                                                            
                                                    </div> 
                                                                                                                                                                                                                                                                                      
                                      </div>
                                {/* etat */}
                                  <div className="input_line">                                                                                                    
                                                        <label className="input_lbl">Etat</label>  
                                                        <div className="input_box">
                                                      {etat === null || etat === "" || etat === undefined

                                                          ?
                                                          (
                                                            <label className="input_lbl">-</label>  

                                                          )

                                                          :

                                                          (
                                                            <label className="input_lbl">{
                                                              etat?.label
                                                              }</label>  

                                                          )
                                                          
                                                          }
                                                      
                                                            
                                                    </div> 
                                                  
                                                
                                                                                                                                                                                                                                                                                  
                                  </div>
                                  {/* couleur */}
                                  <div className="input_line">                                                                                                    
                                                        <label className="input_lbl">Couleur</label>  
                                                        <div className="input_box">
                                                      {couleur === null || couleur === "" || couleur === undefined

                                                          ?
                                                          (
                                                            <label className="input_lbl">-</label>  

                                                          )

                                                          :

                                                          (
                                                            <label className="input_lbl">{
                                                              couleur?.label
                                                              }</label>  

                                                          )
                                                          
                                                          }
                                                      
                                                            
                                                    </div> 
                                                  
                                                
                                                                                                                                                                                                                                                                                  
                                  </div>
      
                            
      
                              {/*marque  */}
                              <div className="input_line">                                                                                                    
                                                    <label className="input_lbl">Marque</label>  
                                                    <div className="input_box">
                                                      {marque === null || marque === "" || marque === undefined

                                                          ?
                                                          (
                                                            <label className="input_lbl">-</label>  

                                                          )

                                                          :

                                                          (
                                                            <label className="input_lbl">{marque?.label}</label>  

                                                          )
                                                          
                                                          }
                                                      
                                                            
                                                    </div> 
                                            
                                            
                                                                                                                                                                                                                                                                              
                              </div>
                              {(category === "vêtement" || category === "accessoire") &&
                              (
                                  <>
                                  {/* joint */}
                                      <div className="input_line">                                                                                                    
                                                          <label className="input_lbl">Joint</label>  
                                                          <div className="input_box">
                                                      {joint === null || joint === "" || joint === undefined

                                                          ?
                                                          (
                                                            <label className="input_lbl">-</label>  

                                                          )

                                                          :

                                                          (
                                                            <label className="input_lbl">{joint?.label}</label>  

                                                          )
                                                          
                                                          }
                                                      
                                                            
                                                    </div> 
                                                    
                                                  
                                                                                                                                                                                                                                                                                      
                                      </div>
                            
                                  
                                  </>
                              )
      
                              }
      
                              {category === "vêtement" &&
      
                                  (
                                      <>
                                        {/* col */}
                                          <div className="input_line">
      
                                              <label className="input_lbl">Col</label>  
                                              <div className="input_box">
                                                      {col === null || col === "" || col === undefined

                                                          ?
                                                          (
                                                            <label className="input_lbl">-</label>  

                                                          )

                                                          :

                                                          (
                                                            <label className="input_lbl">{col}</label>  

                                                          )
                                                          
                                                          }
                                                      
                                                            
                                                    </div> 
                                                    
      
                                                                    
                                                              
                                              </div>
                                              { col === "col" &&
                                              (
                                                  <div className="input_line">                                                                                                    
                                                  <label className="input_lbl">type de col</label>  
                                                  <div className="input_box">
                                                      {typecol === null || typecol === "" || typecol === undefined

                                                          ?
                                                          (
                                                            <label className="input_lbl">-</label>  

                                                          )

                                                          :

                                                          (
                                                            <label className="input_lbl">{typecol?.label}</label>  

                                                          )
                                                          
                                                          }
                                                      
                                                            
                                                    </div> 
                                                          
                                                                                                                                                                                                                                                                                          
                                              </div>
                                              )
      
                                              }
      
      
                                              {/* manche */}
                                              <div className="input_line">
      
                                              <label className="input_lbl">Manche</label>  

                                              <div className="input_box">
                                                      {manche === null || manche === "" || manche === undefined

                                                          ?
                                                          (
                                                            <label className="input_lbl">-</label>  

                                                          )

                                                          :

                                                          (
                                                            <label className="input_lbl">{manche}</label>  

                                                          )
                                                          
                                                          }
                                                      
                                                            
                                                    </div> 
                          
                                                              
                                              </div>
                                              {manche === "manche" &&
                                                  (
                                                  <div className="input_line">                                                                                                    
                                                      <label className="input_lbl">type de manche</label>  
                                                      <div className="input_box">
                                                      {typemanche === null || typemanche === "" || typemanche === undefined

                                                          ?
                                                          (
                                                            <label className="input_lbl">-</label>  

                                                          )

                                                          :

                                                          (
                                                            <label className="input_lbl">{typemanche?.label}</label>  

                                                          )
                                                          
                                                          }
                                                      
                                                            
                                                    </div> 
                                                          
                                                          
                                                                                                                                                                                                                                                                                          
                                                  </div>
      
                                                  )
      
                                              }
                                      </>
                                  )
                              }
                              
                              {(category === "vêtement" || category === "accessoire") &&
      
                                  (
                                      <>
                                        {/* motif */}
      
                                          <div className="input_line">                                                                                                    
                                                              <label className="input_lbl">motif</label> 
                                                              <div className="input_box">
                                                      {motif === null || motif === "" || motif === undefined

                                                          ?
                                                          (
                                                            <label className="input_lbl">-</label>  

                                                          )

                                                          :

                                                          (
                                                            <label className="input_lbl">{motif?.label}</label>  

                                                          )
                                                          
                                                          }
                                                      
                                                            
                                                    </div> 
                                                          
                                                        
                                                      
                                                                                                                                                                                                                                                                                          
                                          </div>
      
                                          {/* occasion */}
                                          <div className="input_line">                                                                                                    
                                                              <label className="input_lbl">occasion</label>  
                                                              <div className="input_box">
                                                      {occasion === null || occasion === "" || occasion === undefined

                                                          ?
                                                          (
                                                            <label className="input_lbl">-</label>  

                                                          )

                                                          :

                                                          (
                                                            <label className="input_lbl">{occasion?.label}</label>  

                                                          )
                                                          
                                                          }
                                                      
                                                            
                                                    </div> 
                                                          
                                                        
                                                      
                                                                                                                                                                                                                                                                                          
                                          </div>
                                      </>
                                  )
                              }
                            
      
                            </div>
      
                            <div className="send_btn">
                              {recordsave === 1 

                              ?

                              (
                                <>
                                  {StateUpdate === 0 ?

                                      (
                                      <>
                                         <label data-form="recordProduit" onClick={Publishafter} name="save" className='link_cst save_btn'>
                                                  publier après
                                          </label>
                                          </>

                                      )

                                      : 

                                      (
                                      <>
                                       <Link  to={`/fiche_produit/${produit_id}/${categorie}`} >
                                              <label data-form="recordProduit" className='link_cst save_btn'>
                                                   
                                                voir fiche produit
                                              </label>
                                                                                                  
                                          </Link>
                                     

                                      </>

                                      )

                                      }
                                       


                                          <label data-form="recordProduit" onClick={UpdateForm} name="save" className='link_cst save_btn'>
                                                  modifier
                                          </label>

                                          {StateUpdate === 0 &&

                                        (
                                            <>
                                          {
                                            // vetements
                                          categorie === "1" ?
                                        
                                              (

                                                <>
                                                    {(values?.prix != "") && (values?.qte != "" ) &&
                                                      ( genre != null) && ( age != null) &&
                                                      ( couv_corp != null) && ( taille != null) &&
                                                      (  designation != null) && (  etat != null) &&
                                                      (  couleur != null) 

                                                      &&
                                                      (
                                                        <label data-form="recordProduit" onClick={Publishnow} name="publish" className='link_cst publish_btn'>
                                                                    publier
                                                        </label>

                                                      )
                                                      
                                                     }
                                                
                                                </>

                                              )

                                              :
                                              // accessoire

                                              categorie === "2" ?

                                              (
                                                <>
                                                  {(values?.prix != "") && (values?.qte != "" ) &&
                                                      (genre != null) && (age != null) && (taille != null) &&
                                                      (designation != null) && (etat != null) && (couleur != null) 

                                                      &&
                                                      (
                                                        <label data-form="recordProduit" onClick={Publishnow} name="publish" className='link_cst publish_btn'>
                                                                    publier
                                                        </label>

                                                      )
                                                      
                                                     }
                                                
                                                </>

                                              )

                                            :
                                              categorie === "3" ?
                                              
                                              (
                                                // cosmetique

                                                <>
                                                  {(values?.prix != "") && (values?.qte != "" ) &&
                                                      (genre != null) && (age != null) && 
                                                      (designation != null) && (etat != null) && (couleur != null) 

                                                      &&
                                                      (
                                                        <label data-form="recordProduit" onClick={Publishnow} name="publish" className='link_cst publish_btn'>
                                                                    publier
                                                        </label>

                                                      )
                                                      
                                                     }
                                                
                                                </>

                                              )

                                              :
                                              categorie === "4"  ? 
                                            
                                        
                                              (
                                                // cheveux

                                                <>
                                                    {(values?.prix != "") && (values?.qte != "" ) &&
                                                      (genre != null) && (age != null) && (taille != null) &&
                                                      (designation != null) && (etat != null) && (couleur != null) 

                                                      &&
                                                      (
                                                        <label data-form="recordProduit" onClick={Publishnow} name="publish" className='link_cst publish_btn'>
                                                                    publier
                                                        </label>

                                                      )
                                                      
                                                     }
                                                </>

                                              )

                                              :

                                              (
                                                null
                                              )

                                              

                                        
                                          }
                                            </>

                                        )

                                      
                                        }
                                                                                   
                                       
                                </>

                              )

                              :

                              (
                                <>
                                          
                                          <label data-form="recordProduit" onClick={saveRecord} name="save" className='link_cst save_btn'>
                                                  modifier
                                          </label>
                                          <label data-form="recordProduit" onClick={publishRecord} name="publish" className='link_cst publish_btn'>
                                                      publier autre produit
                                          </label>
                                </>

                              )

                              }

                                      
                                      
                                        
      
                            </div>
      
                          </div>
      
                        </div>
                    
                    </div>

                    </>
                  )

                  :

                  (

                    <form id="recordProduit" onSubmit={handleSubmit} >
                    <div className="form_box">
                    {StateUpdate === 0 ?

                      (
                      <>
                      <Header_banner  data_props ={{ 
                                  //   title: 'Publier un produit: vêtement',
                                    title: `Publier un produit: ${category}`,
                            }} 
                            data_page = {{type: "catalogue" , back_option: "on"}}
                          />
                      
                      </>
                      
                      )

                      : 

                      (
                      <>
                        <Header_banner  data_props ={{ 
                                  //   title: 'Publier un produit: vêtement',
                                    title: `Modifier un produit: ${category}`,
                            }} 
                            data_page = {{type: "catalogue" , back_option: "on"}}
                          />
                      
                      </>
                      
                      )
                    
                    }
                        

                           
                        <div className="list_image">
                          <div className="title">
                          <label>Images du produit</label>
                          </div>
                            
                                <div className="images-wrapper">
                                                    {upload_img.map((item) => (
                                                       <div key={`full_b_${item.id}`} onClick={openMask}>
                                                          <img  src={item?.src}  alt={item.alt} />
                                                       </div>
                                                    ))}
                                            
                                </div>
      
                        </div>
                        <div className="description_wrapper">
                          <div className="title">
                            <label>details du produit</label>
                          </div>
                          <div className="list_descripteurs">
                                    <div className="lbl_important">
                                        <label className="mt-1 text-left ">Champs obligatoires ( * )</label>
                                      </div>   
                            <div className="text_input">
                                  <div className="form-group">  
                                      
                                      {/* prix */}
                                        <div className="input_line">                                                                                                    
                                                    <label className="input_lbl">Prix</label>  
                                              <div className="input_box">
                                                    <input className="input_field" 
                                                    value={values.prix}
                                                    onChange={(e) =>
                                                      setValues({ ...values, prix: e.target.value })
                                                    } data-priorite="1" type="number" name="prix" id="prix"/>
                                                </div>
                                               
                                                { checkboxes.prix_gele === true

                                                          ?
                                                          (
                                                            <Checkbox

                                                     
                                                                  label="Dégeler"
                                                                  // isChecked={prix_gele}
                                                                  isChecked={checkboxes.prix_gele}
                                                                  onChange={handleCheckboxChange}
                                                                    id="prix_gele"
                                                                  // id="input_prix"
                                                                data_input = {{name: "prix_gele"}}
                                                            />  

                                                          )

                                                          :

                                                          (
                                                            <Checkbox

                                                     
                                                            label="Géler"
                                                            // isChecked={prix_gele}
                                                            isChecked={checkboxes.prix_gele}
                                                            onChange={handleCheckboxChange}
                                                               id="prix_gele"
                                                            // id="input_prix"
                                                           data_input = {{name: "prix_gele"}}
                                                      />  

                                                          )
                                              }
                                            
                                                                                                                                                                                                                                                                            
                                        </div>
                                      {/* qte */}
                                        <div className="input_line">
      
                                          <label className="input_lbl">Quantité</label>
                                                <div className="input_box">
                                                  <input className="input_field" 
                                                   value={values.qte}
                                                    onChange={(e) =>
                                                      setValues({ ...values, qte: e.target.value })
                                                    } data-priorite="1"  type="number" name="qte" id="qte"/>
                                                </div>
                                                { checkboxes.qte_gele === true

                                                  ?
                                                  (
                                                    <Checkbox


                                                          label="Dégeler"
                                                          isChecked={checkboxes.qte_gele}
                                                                                                    onChange={handleCheckboxChange}
                                                                                                    id="qte_gele"
                                                    />  

                                                  )

                                                  :

                                                  (
                                                    <Checkbox


                                                    label="Géler"
                                                    // isChecked={prix_gele} 
                                                    isChecked={checkboxes.qte_gele}
                                                    onChange={handleCheckboxChange}
                                                    id="qte_gele"
                                                  />  

                                                  )
                                                  }
                                                
                                                                                                                            
                                        </div>
                                        {/* reduction */}
                                        <div className="input_line">
      
                                          <label className="input_lbl">Réduction</label>  
      
                                          <div className="input_box">
                                              <input className="input_field"  value={values.reduction}
                                                    onChange={(e) =>
                                                      setValues({ ...values, reduction: e.target.value })
                                                    } type="number" name="reduction" id="reduction"/>
                                          </div>  

                                             { checkboxes.reduction_gele === true

                                                  ?
                                                  (
                                                    <Checkbox


                                                          label="Dégeler"
                                                          isChecked={checkboxes.reduction_gele}
                                                          onChange={handleCheckboxChange}
                                                          id="reduction_gele"
                                                    />  

                                                  )

                                                  :

                                                  (
                                                    <Checkbox


                                                    label="Géler"
                                                    isChecked={checkboxes.reduction_gele}
                                                    onChange={handleCheckboxChange}
                                                    id="reduction_gele"
                                                  />  

                                                  )
                                                  } 
                                                                     
                                                          
                                        </div>                                                                                          
                                </div>
      
                            </div>
                            <div className="checkable_input">
                              {/* genre */}
                                <div className="input_line">
      
                                <label className="input_lbl">Genre</label>  
      
                                <div className="input_box">
                                <div className="fit_content mr-4">
                                                                                        <div className="React__checkbox">
                                                                                          <label   name="masculin" >
                                                                                            <input
                                                                                              type="checkbox"
                                                                                              className="React__checkbox--input"
                                                                                              name="masculin"
                                                                                              data-input="genrea"                                                            
                                                                                              // checked={genre === "masculin"}
                                                                                              checked={genre_a === "masculin"}
                                                                                              onChange={handlechkChange}
                                                                                            />
                                                                                            <span className="React__checkbox--span"/> masculin
                                                                                          </label>
                                                                                        </div>
                                                                                      </div>
                                                                                      <div className="fit_content">
                                                                                        <div className="React__checkbox">
                                                                                          <label   name="feminin">
                                                                                            <input
                                                                                              type="checkbox"
                                                                                              className="React__checkbox--input"
                                                                                              name="feminin"
                                                                                                data-input="genreb"
                                                                                              // checked={genre === "feminin"}
                                                                                              checked={genre_b === "feminin"}
                                                                                              onChange={handlechkChange}
                                                                                            />
                                                                                            <span className="React__checkbox--span" /> féminin
                                                                                          </label>
                                                                                        </div>
                                                                                      </div>
                                </div>  

                                { checkboxes.genre_gele === true

?
(
  <Checkbox


        label="Dégeler"
        isChecked={checkboxes.genre_gele}
                                                  onChange={handleCheckboxChange}
                                                  id="genre_gele"
  />  

)

:

(
  <Checkbox


  label="Géler"
  isChecked={checkboxes.genre_gele}
  onChange={handleCheckboxChange}
  id="genre_gele"
/>  

)
}
                                                                     
                                                
                                </div>
      
                                {/* age */}
                                <div className="input_line">
      
                                  <label className="input_lbl">Age</label>  
      
                                                    <div className="input_box">
                                                    <div className="fit_content mr-4">
                                                                <div className="React__checkbox">
                                                                  <label  name="adulte">
                                                                    <input
                                                                      type="checkbox"
                                                                      className="React__checkbox--input"
                                                                      name="adulte"
                                                                        data-input="age"
      
                                                                      checked={age === "adulte"}
                                                                      onChange={handlechkChange}
                                                                    />
                                                                    <span className="React__checkbox--span" /> adulte
                                                                  </label>
                                                                </div>
                                                              </div>
                                                              <div className="fit_content">
                                                                <div className="React__checkbox">
                                                                  <label name="enfant">
                                                                    <input
                                                                      type="checkbox"
                                                                      className="React__checkbox--input"
                                                                      name="enfant"
                                                                        data-input="age"
                                                                      checked={age === "enfant"}
                                                                      onChange={handlechkChange}
                                                                    />
                                                                    <span className="React__checkbox--span" /> enfant
                                                                  </label>
                                                                </div>
                                                              </div>
                                                      </div>  
                                                      { checkboxes.age_gele === true

?
(
  <Checkbox


        label="Dégeler"
        isChecked={checkboxes.age_gele}
                                                  onChange={handleCheckboxChange}
                                                  id="age_gele"
  />  

)

:

(
  <Checkbox


  label="Géler"
  isChecked={checkboxes.age_gele}
  onChange={handleCheckboxChange}
  id="age_gele"
/>  

)
}   
                                                                      
                                                                      
                                </div>
      
                              {category === "vêtement" &&
                                  (
                                      <>
                                      {/* couverture corporelle */}
                                          <div className="input_line">
      
                                              <label className="input_lbl">couv. corp.</label>  
      
                                                          <div className="input_box">
                                                                      <div className="fit_content mr-2">
                                                                      <div className="React__checkbox">
                                                                          <label   name="haut">
                                                                          <input
                                                                              type="checkbox"
                                                                              className="React__checkbox--input"
                                                                              name="haut"
                                                                                  data-input="couv_corp"
      
                                                                              checked={couv_corp === "haut"}
                                                                              onChange={handlechkChange}
                                                                          />
                                                                          <span className="React__checkbox--span" /> haut
                                                                          </label>
                                                                      </div>
                                                                      </div>
                                                                      <div className="fit_content mr-2">
                                                                      <div className="React__checkbox">
                                                                          <label   name="bas">
                                                                          <input
                                                                              type="checkbox"
                                                                              className="React__checkbox--input"
                                                                              name="bas"
                                                                              data-input="couv_corp"
                                                                              checked={couv_corp === "bas"}
                                                                              onChange={handlechkChange}
                                                                          />
                                                                          <span className="React__checkbox--span" /> bas
                                                                          </label>
                                                                      </div>
                                                                      </div>
                                                                      <div className="fit_content mr-2">
                                                                      <div className="React__checkbox">
                                                                          <label   name="lingerie">
                                                                          <input
                                                                              type="checkbox"
                                                                              className="React__checkbox--input"
                                                                              name="lingerie"
                                                                              data-input="couv_corp"
      
                                                                              checked={couv_corp === "lingerie"}
                                                                              onChange={handlechkChange}
                                                                          />
                                                                          <span className="React__checkbox--span" /> lingerie
                                                                          </label>
                                                                      </div>
                                                                      </div>
                                                                      <div className="fit_content mr-2">
                                                                      <div className="React__checkbox">
                                                                          <label name="combis">
                                                                          <input
                                                                              type="checkbox"
                                                                              className="React__checkbox--input"
                                                                              name="combis"
                                                                              data-input="couv_corp"
                                                                              checked={couv_corp === "combis"}
                                                                              onChange={handlechkChange}
                                                                          />
                                                                          <span className="React__checkbox--span" /> combis
                                                                          </label>
                                                                      </div>
                                                                      </div>
                                                              </div>   
                                                              { checkboxes.couv_corp_gele === true

?
(
  <Checkbox


        label="Dégeler"
        isChecked={checkboxes.couv_corp_gele}
        onChange={handleCheckboxChange}
        id="couv_corp_gele"
  />  

)

:

(
  <Checkbox


  label="Géler"
  isChecked={checkboxes.couv_corp_gele}
                                                  onChange={handleCheckboxChange}
                                                  id="couv_corp_gele"
/>  

)
}
                                                                                   
                                                                              
                                              </div>
                                      </>
                                  )
                              }
      
                              {/* taille */}
                              {category != "cosmétique" && 
                              (
                                  <div className="input_line">
      
                                  <label className="input_lbl">Taille</label>  
      
                                    <div className="input_box">
                                              <div className="fit_content mr-2">
                                                <div className="React__checkbox">
                                                  <label name="xxl">
                                                    <input
                                                    data-input="taille"
                                                      type="checkbox"
                                                      className="React__checkbox--input"
                                                      name="xxl"
      
                                                      checked={taille === "xxl"}
                                                      onChange={handlechkChange}
                                                    />
                                                    <span className="React__checkbox--span" /> xxl
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="fit_content mr-2">
                                                <div className="React__checkbox">
                                                  <label   name="xl">
                                                    <input
                                                      type="checkbox"
                                                        data-input="taille"
                                                      className="React__checkbox--input"
                                                      name="xl"
                                                      checked={taille === "xl"}
                                                      onChange={handlechkChange}
                                                    />
                                                    <span className="React__checkbox--span" /> xl
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="fit_content mr-2">
                                                <div className="React__checkbox">
                                                  <label name="l">
                                                    <input
                                                      type="checkbox"
                                                        data-input="taille"
                                                      className="React__checkbox--input"
                                                      name="l"
      
                                                      checked={taille === "l"}
                                                      onChange={handlechkChange}
                                                    />
                                                    <span className="React__checkbox--span" /> l
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="fit_content mr-2">
                                                <div className="React__checkbox">
                                                  <label  name="m">
                                                    <input
                                                      type="checkbox"
                                                        data-input="taille"
                                                      className="React__checkbox--input"
                                                      name="m"
                                                      checked={taille === "m"}
                                                      onChange={handlechkChange}
                                                    />
                                                    <span className="React__checkbox--span" /> m
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="fit_content mr-2">
                                                <div className="React__checkbox">
                                                  <label name="sm">
                                                    <input
                                                      type="checkbox"
                                                      data-input="taille"
                                                      className="React__checkbox--input"
                                                      name="sm"
                                                      checked={taille === "sm"}
                                                      onChange={handlechkChange}
                                                    />
                                                    <span className="React__checkbox--span" /> sm
                                                  </label>
                                                </div>
                                              </div>
                                  </div>   
                                  { checkboxes.taille_gele === true

?
(
  <Checkbox


        label="Dégeler"
        isChecked={checkboxes.taille_gele}
        onChange={handleCheckboxChange}
        id="taille_gele"
  />  

)

:

(
  <Checkbox


  label="Géler"
  isChecked={checkboxes.taille_gele}
  onChange={handleCheckboxChange}
  id="taille_gele"
/>  

)
}

                                                         
                                                      
                                </div>
      
                              )}
                            
                           </div>
                            
                            <div className="select_input">
                              {/* désignation (classe du produit) */}
                                  <div className="input_line">                                                                                                    
                                                      <label className="input_lbl">Désignation</label>  
                                                <div className="input_box" name="designation">
                                                          <Select options={options_designation} defaultValue={designation} onChange={setDesignation} placeholder="sélectionner" name="designation" />
                                                      {/* <input className="input_field"  data-priorite="1" type="number" name="prix" id="prix"/> */}
                                                  </div>

                                                  { checkboxes.designation_gele === true

?
(
  <Checkbox


        label="Dégeler"
        isChecked={checkboxes.designation_gele}
        onChange={handleCheckboxChange}
        id="designation_gele"
  />  

)

:

(
  <Checkbox


  label="Géler"
  isChecked={checkboxes.designation_gele}
  onChange={handleCheckboxChange}
  id="designation_gele"
/>  

)
}
                                                 
                                                                                                                                                                                                                                                                                
                                </div>
                                {/* etat */}
                                  <div className="input_line">                                                                                                    
                                                        <label className="input_lbl">Etat</label>  
                                                  <div className="input_box" name="etat">
                                                            <Select options={options_etat} placeholder="sélectionner" name="etat" defaultValue={etat} onChange={setEtat}/>
                                                        {/* <input className="input_field"  data-priorite="1" type="number" name="prix" id="prix"/> */}
                                                    </div>

                                                    { checkboxes.etat_gele === true

?
(
  <Checkbox


        label="Dégeler"
        isChecked={checkboxes.etat_gele}
                                                  onChange={handleCheckboxChange}
                                                  id="etat_gele"
  />  

)

:

(
  <Checkbox


  label="Géler"
  isChecked={checkboxes.etat_gele}
                                                  onChange={handleCheckboxChange}
                                                  id="etat_gele"
/>  

)
}
                                                     
                                                                                                                                                                                                                                                                                  
                                  </div>
                                  {/* couleur */}
                                  <div className="input_line">                                                                                                    
                                                        <label className="input_lbl">Couleur</label>  
                                                  <div className="input_box" name="couleur">
                                                            <Select options={options_couleur} placeholder="sélectionner" name="couleur" defaultValue={couleur} onChange={setCouleur}/>
                                                        {/* <input className="input_field"  data-priorite="1" type="number" name="prix" id="prix"/> */}
                                                    </div>

                                                    { checkboxes.couleur_gele === true

?
(
  <Checkbox


        label="Dégeler"
        isChecked={checkboxes.couleur_gele}
                                                  onChange={handleCheckboxChange}
                                                  id="couleur_gele"
  />  

)

:

(
  <Checkbox


  label="Géler"
  isChecked={checkboxes.couleur_gele}
                                                  onChange={handleCheckboxChange}
                                                  id="couleur_gele"
/>  

)
}
                                                  
                                                                                                                                                                                                                                                                                  
                                  </div>
      
                              <div className="lbl_important">
                                        <label className="mt-1 text-left ">Champs facultatifs</label>
                              </div>   
      
                              {/*marque  */}
                              <div className="input_line">                                                                                                    
                                                    <label className="input_lbl">Marque</label>  
                                              <div className="input_box" name="marque">
                                                        <Select options={options_marque} placeholder="sélectionner" name="marque" defaultValue={marque} onChange={setMarque}/>
                                                    {/* <input className="input_field"  data-priorite="1" type="number" name="prix" id="prix"/> */}
                                                </div>

                                                { checkboxes.marque_gele === true

?
(
  <Checkbox


        label="Dégeler"
        isChecked={checkboxes.marque_gele}
        onChange={handleCheckboxChange}
        id="marque_gele"
  />  

)

:

(
  <Checkbox


  label="Géler"
  isChecked={checkboxes.marque_gele}
                                                  onChange={handleCheckboxChange}
                                                  id="marque_gele"
/>  

)
}
                                                                                                                                                                                                                                                                                     
                              </div>
                              {(category === "vêtement" || category === "accessoire") &&
                              (
                                  <>
                                  {/* joint */}
                                      <div className="input_line">                                                                                                    
                                                          <label className="input_lbl">Joint</label>  
                                                      <div className="input_box" name="joint">
                                                              <Select options={options_joint} placeholder="sélectionner" name="joint" defaultValue={joint} onChange={setJoint}/>
                                                          {/* <input className="input_field"  data-priorite="1" type="number" name="prix" id="prix"/> */}
                                                      </div>

                                                      { checkboxes.joint_gele === true

?
(
  <Checkbox


        label="Dégeler"
        isChecked={checkboxes.joint_gele}
                                                  onChange={handleCheckboxChange}
                                                  id="joint_gele"
  />  

)

:

(
  <Checkbox


  label="Géler"
  isChecked={checkboxes.joint_gele}
                                                  onChange={handleCheckboxChange}
                                                  id="joint_gele"
/>  

)
}
                                                   

                                                  
                                                                                                                                                                                                                                                                                      
                                      </div>
                            
                                  
                                  </>
                              )
      
                              }
      
                              {category === "vêtement" &&
      
                                  (
                                      <>
                                        {/* col */}
                                          <div className="input_line">
      
                                              <label className="input_lbl">Col</label>  
      
                                              <div className="input_box">
                                              <div className="fit_content mr-4">
                                                                                                      <div className="React__checkbox">
                                                                                                      <label name="aucun_col">
                                                                                                          <input
                                                                                                          type="checkbox"
                                                                                                          className="React__checkbox--input"
                                                                                                          name="aucun"
                                                                                                          data-input="col"                                                            
                                                                                                          checked={col === "aucun"}
                                                                                                          onChange={handlechkChange}
                                                                                                          />
                                                                                                          <span className="React__checkbox--span" /> aucun
                                                                                                      </label>
                                                                                                      </div>
                                                                                                  </div>
                                                                                                  <div className="fit_content">
                                                                                                      <div className="React__checkbox">
                                                                                                      <label name="col">
                                                                                                          <input
                                                                                                          type="checkbox"
                                                                                                          className="React__checkbox--input"
                                                                                                          name="col"
                                                                                                              data-input="col"
                                                                                                          checked={col === "col"}
                                                                                                          onChange={handlechkChange}
                                                                                                          />
                                                                                                          <span className="React__checkbox--span" />à col
                                                                                                      </label>
                                                                                                      </div>
                                                                                                  </div>
                                              </div>  

                                              { checkboxes.col_gele === true

?
(
  <Checkbox


        label="Dégeler"
        isChecked={checkboxes.col_gele}
                                                  onChange={handleCheckboxChange}
                                                  id="col_gele"
  />  

)

:

(
  <Checkbox


  label="Géler"
  isChecked={checkboxes.col_gele}
  onChange={handleCheckboxChange}
  id="col_gele"
/>  

)
}
                        
                                                              
                                              </div>
                                              { col === "col" &&
                                              (
                                                  <div className="input_line">                                                                                                    
                                                  <label className="input_lbl">type de col</label>  
                                                          <div className="input_box" name="typecol">
                                                                      <Select options={options_col} placeholder="sélectionner" name="type_col" defaultValue={typecol} onChange={setTypecol}/>
                                                                  {/* <input className="input_field"  data-priorite="1" type="number" name="prix" id="prix"/> */}
                                                              </div>

                                                              { checkboxes.typecol_gele === true

?
(
  <Checkbox


        label="Dégeler"
        isChecked={checkboxes.typecol_gele}
        onChange={handleCheckboxChange}
        id="typecol_gele"
  />  

)

:

(
  <Checkbox


  label="Géler"
  // isChecked={prix_gele} 
  isChecked={checkboxes.typecol_gele}
  onChange={handleCheckboxChange}
  id="typecol_gele"
/>  

)
}
                                                
                                                          
                                                                                                                                                                                                                                                                                          
                                              </div>
                                              )
      
                                              }
      
      
                                              {/* manche */}
                                              <div className="input_line">
      
                                              <label className="input_lbl">Manche</label>  
      
                                              <div className="input_box" >
                                              <div className="fit_content mr-4">
                                                                                                      <div className="React__checkbox">
                                                                                                          <label  name="sans-manche">
                                                                                                          <input
                                                                                                              type="checkbox"
                                                                                                              className="React__checkbox--input"
                                                                                                              name="sans-manche"
                                                                                                              data-input="manche"                                                            
                                                                                                              checked={manche === "sans-manche"}
                                                                                                              onChange={handlechkChange}
                                                                                                          />
                                                                                                          <span className="React__checkbox--span" /> sans-manche
                                                                                                          </label>
                                                                                                      </div>
                                                                                                      </div>
                                                                                                      <div className="fit_content">
                                                                                                      <div className="React__checkbox">
                                                                                                          <label name="manche">
                                                                                                          <input
                                                                                                              type="checkbox"
                                                                                                              className="React__checkbox--input"
                                                                                                              name="manche"
                                                                                                              data-input="manche"
                                                                                                              checked={manche === "manche"}
                                                                                                              onChange={handlechkChange}
                                                                                                          />
                                                                                                          <span className="React__checkbox--span" /> à manche
                                                                                                          </label>
                                                                                                      </div>
                                                                                                      </div>
                                              </div>   

                                                 { checkboxes.manche_gele === true

                                                  ?
                                                  (
                                                    <Checkbox


                                                          label="Dégeler"
                                                          isChecked={checkboxes.manche_gele}
                                                          onChange={handleCheckboxChange}
                                                          id="manche_gele"
                                                    />  

                                                  )

                                                  :

                                                  (
                                                    <Checkbox


                                                    label="Géler"
                                                    // isChecked={prix_gele} 
                                                    isChecked={checkboxes.manche_gele}
                                                    onChange={handleCheckboxChange}
                                                    id="manche_gele"
                                                  />  

                                                  )
                                                  }  
                                                                     
                                                              
                                              </div>
                                              {manche === "manche" &&
                                                  (
                                                  <div className="input_line">                                                                                                    
                                                      <label className="input_lbl">type de manche</label>  
                                                          <div className="input_box" name="typemanche">
                                                                      <Select options={options_manche} placeholder="sélectionner" name="type_manche" defaultValue={typemanche} onChange={setTypemanche}/>
                                                                  {/* <input className="input_field"  data-priorite="1" type="number" name="prix" id="prix"/> */}
                                                              </div>

                                                              { checkboxes.typemanche_gele === true

?
(
  <Checkbox


        label="Dégeler"
        isChecked={checkboxes.typemanche_gele}
        onChange={handleCheckboxChange}
        id="typemanche_gele"
  />  

)

:

(
  <Checkbox


  label="Géler"
  // isChecked={prix_gele} 
  isChecked={checkboxes.typemanche_gele}
  onChange={handleCheckboxChange}
  id="typemanche_gele"
/>  

)
}
                                                                        

                                                                                                                                                                                                                                                                                          
                                                  </div>
      
                                                  )
      
                                              }
                                      </>
                                  )
                              }
                              
                              {(category === "vêtement" || category === "accessoire") &&
      
                                  (
                                      <>
                                        {/* motif */}
      
                                          <div className="input_line">                                                                                                    
                                                              <label className="input_lbl">motif</label>  
                                                          <div className="input_box" name="motif">
                                                                  <Select options={options_motif} placeholder="sélectionner" name="motif" defaultValue={motif} onChange={setMotif}/>
                                                              {/* <input className="input_field"  data-priorite="1" type="number" name="prix" id="prix"/> */}
                                                          </div>

                                                          { checkboxes.motif_gele === true

?
(
  <Checkbox


        label="Dégeler"
        isChecked={checkboxes.motif_gele}
                                                              onChange={handleCheckboxChange}
                                                              id="motif_gele"
  />  

)

:

(
  <Checkbox


  label="Géler"
  // isChecked={prix_gele} 
  isChecked={checkboxes.motif_gele}
                                                              onChange={handleCheckboxChange}
                                                              id="motif_gele"
/>  

)
}
                                                            
                                                      
                                                                                                                                                                                                                                                                                          
                                          </div>
      
                                          {/* occasion */}
                                          <div className="input_line">                                                                                                    
                                                              <label className="input_lbl">occasion</label>  
                                                          <div className="input_box" name="occasion">
                                                                  <Select options={options_occasion} placeholder="sélectionner" name="occasion" defaultValue={occasion} onChange={setOccasion}/>
                                                              {/* <input className="input_field"  data-priorite="1" type="number" name="prix" id="prix"/> */}
                                                          </div>

                                                          { checkboxes.occasion_gele === true

?
(
  <Checkbox


        label="Dégeler"
        isChecked={checkboxes.occasion_gele}
                                                            onChange={handleCheckboxChange}
                                                            id="occasion_gele"
  />  

)

:

(
  <Checkbox


  label="Géler"
  // isChecked={prix_gele} 
  isChecked={checkboxes.occasion_gele}
                                                            onChange={handleCheckboxChange}
                                                            id="occasion_gele"
/>  

)
}
                                                         
                                                                                                                                                                                                                                                                                          
                                          </div>
                                      </>
                                  )
                              }
                            
      
                            </div>
      
                            <div className="send_btn">

                            {StateUpdate === 0 ?

                              (
                              <>
                               
                               {updating === 1

                                  ?
                                  (
                                    <>
                                           <label data-form="recordProduit" onClick={UpdateFiche} name="save" className='link_cst save_btn'>
                                                    sauver
                                            </label>

                                           
                                    </>
                                  )

                                  :

                                  (
                                    <>
                                    <label data-form="recordProduit" onClick={saveRecord} name="save" className='link_cst save_btn'>
                                                    sauver
                                            </label>
                                    
                                    </>

                                  )
                                  }

                              </>

                              )

                              : 

                              (
                              <>
                               <label data-form="recordProduit" onClick={UpdateFiche} name="save" className='link_cst save_btn'>
                                                  sauver
                                 </label>

                                 <Link  to={`/fiche_produit/${produit_id}/${categorie}`} >
                                              <label data-form="recordProduit" className='link_cst save_btn'>
                                                   
                                                  annuler
                                              </label>
                                                                                                  
                                          </Link>

                              </>

                              )

                              }

                          

                                         

                                {StateUpdate === 0 &&

                                (
                                <>
                                  {
                                            // vetements
                                          categorie === "1" ?
                                        
                                              (

                                                <>
                                                    {(values?.prix != "") && (values?.qte != "" ) &&
                                                      ( genre != null) && ( age != null) &&
                                                      ( couv_corp != null) && ( taille != null) &&
                                                      (  designation != null) && (  etat != null) &&
                                                      (  couleur != null) 

                                                      &&
                                                      (
                                                        <label data-form="recordProduit" onClick={publishRecord} name="publish" className='link_cst publish_btn'>
                                                                  sauver et publier
                                                      </label>

                                                      )
                                                      
                                                     }
                                                
                                                </>

                                              )

                                              :
                                              // accessoire

                                              categorie === "2" ?

                                              (
                                                <>
                                                  {(values?.prix != "") && (values?.qte != "" ) &&
                                                      (genre != null) && (age != null) && (taille != null) &&
                                                      (designation != null) && (etat != null) && (couleur != null) 

                                                      &&
                                                      (
                                                        <label data-form="recordProduit" onClick={publishRecord} name="publish" className='link_cst publish_btn'>
                                                                  sauver et publier
                                                      </label>

                                                      )
                                                      
                                                     }
                                                
                                                </>

                                              )

                                            :
                                              categorie === "3" ?
                                              
                                              (
                                                // cosmetique

                                                <>
                                                  {(values?.prix != "") && (values?.qte != "" ) &&
                                                      (genre != null) && (age != null) && 
                                                      (designation != null) && (etat != null) && (couleur != null) 

                                                      &&
                                                      (
                                                        <label data-form="recordProduit" onClick={publishRecord} name="publish" className='link_cst publish_btn'>
                                                                  sauver et publier
                                                      </label>

                                                      )
                                                      
                                                     }
                                                
                                                </>

                                              )

                                              :
                                              categorie === "4"  ? 
                                            
                                        
                                              (
                                                // cheveux

                                                <>
                                                    {(values?.prix != "") && (values?.qte != "" ) &&
                                                      (genre != null) && (age != null) && (taille != null) &&
                                                      (designation != null) && (etat != null) && (couleur != null) 

                                                      &&
                                                      (
                                                        <label data-form="recordProduit" onClick={publishRecord} name="publish" className='link_cst publish_btn'>
                                                                  sauver et publier
                                                      </label>

                                                      )
                                                      
                                                     }
                                                </>

                                              )

                                              :

                                              (
                                                null
                                              )

                                              

                                        
                                          }
                                
                               

                                </>

                                )

                              

                                }       
                                          
                                        
 
                                       
                                      
                                        
      
                            </div>
      
                          </div>
      
                        </div>
                    
                    </div>
                    </form>

                  )
              
                }

                </>


               )


              }
               
              
              </>
            
          )

          }
            
           {/* caméra zone */}
           {camera_active === 1 &&
          
             (  
                 <>
                   <div className="camera_view">
                      <video ref={videoRef} autoPlay width="300" height="200"></video>
                      <canvas ref={canvasRef} style={{ display: 'none' }} width="300" height="200"></canvas>
                      {/* <button onClick={startCamera}>Start Camera</button> */}
                      <button onClick={captureImage}>Capture Image</button>
                      <button onClick={switchCamera}>
                        mode: {isFrontCamera ? 'Back' : 'Front'} Camera
                      </button>
                      <button onClick={handleUpload}>Upload Images</button>

                      <div>
                        {images.map((image, index) => (
                          <img key={index} src={image} alt={`preview ${index}`} width="100" />
                        ))}
                      </div>
                    </div>
                  
                  </>
                  )

           }
                  

          {/* preview */}
          {images_gallery_boxshow === false && images_camera_boxshow === false
            ?

            (
              null
            )

            : 

            (
              <>
               <div className="image_preview">
                
              {upload_img.length === 0 ?

                (
                  <>
                     <div id="gal_mask" className="mask_gal">  
                              <div className="container">
                                        
                                            <div  className='full_img_box none_img'>
                                            <div className="img-body expand_img ">
                                              
                                                {/* <img  src={image_a}  alt={item.alt} /> */}
                                            </div>
                                            
                                            </div>
                                        
                                        <div className="thumb-wrapper flex_center">
                                            
                                                <div className="" >
                                               
                                                
                                                    <label htmlFor='add_image' className='input_label'>
                                                           <input id="add_image"  className='display_none' type="file" multiple accept="image/*" onChange={onImageChange} />
                                           
                                                           <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/>
                                                        
                                                      </label>     
                                                                                        
                                                                                            
                                                   
                                                
                                                </div>
                                           
                                      </div>
                              </div>
                                
                              <div className="fixedbtn_box">
                              <div className="col-6 col-sm-6 col-md-6">
                                   {/* <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/> */}
                                          {/* <a href="#"> */}
                                          <Link to="#" className="link_cst cancel_btn" onClick={cancel_uploading} >
                                     
                                              Annuler
                                              </Link>
                                            {/* </a>      */}
                                                                                  
                              
                              </div>
                              <div className="col-6 col-sm-6 col-md-6">
                               
                                      {/* <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/> */}
                                          {/* <a href="#"> */}
                                          <Link to="#" className="link_cst confirm_btn">
                                              Passer
                                              </Link>
                                            {/* </a>      */}
                                                                                  
                               
                              </div>
                          
                          </div>                     
                                  
                          </div>

                  </>

                )

                :
                (
                  <>
  
                          <div id="gal_mask" className="mask_gal">  
                              <div className="container">
                                        <Slider {...settings}  asNavFor={nav1} ref={(slider) => setSlider1(slider)} className="slider_full">
                                        {upload_img.map((item) => (
                                            <div key={`full_${item.id}`} className='full_img_box'>
                                            <div className="img-body expand_img">
                                                <img  src={item?.src}  alt={item.alt} />
                                            </div>
                                            {/* <div>
                                                <h2>{item.title}</h2>
                                                <p>{item.description}</p>
                                            </div> */}
                                            </div>
                                        ))}
                                        </Slider>
                                        <div className="thumb-wrapper">
                                        {/* <DropdownMenu /> */}

                                            {upload_img.map((item, idx) => (
                                                <div key={ `thumb_${item.id}`} className={currentSlide === idx ? "active": null}
                                                            onClick={() => {
                                                              slider1?.slickGoTo(idx)
                                                          }}  >
                                                     <img  src={item?.src}  alt={item.alt} />

                                                   <div className="btn_action_bx">
                                                   
                                                          <div className="deletebtn">
                                                            <label className="lbl_action">
                                                                <FontAwesomeIcon size="sm" data-id={idx} onClick={deleteImage} icon={faTimes} className='iconify'/>
                                                            </label>
                                                            
                                                        </div>
                                                   </div>
 
                                                 
                                                </div>
                                            ))}

                                            {upload_img.length < 10 &&
                                            (
                                              <div className="" >
                                               
                                                
                                              <label htmlFor='add_image' className='input_label'>
                                                     <input id="add_image"  className='display_none' type="file" multiple accept="image/*" onChange={onImageChange} />
                                     
                                                     <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/>
                                                  
                                                </label>     
                                                                                  
                                                                                      
                                             
                                          
                                          </div>


                                            )
                                            }

                                       </div>
                              </div>
                                
                              <div className="fixedbtn_box">
                              <div className="col-6 col-sm-6 col-md-6">
                                  <Link to="#" className="link_cst cancel_btn" onClick={cancel_uploading} >
                                        {/* <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/> */}
                                          {/* <a href="#"> */}
                                              Annuler
                                            {/* </a>      */}
                                                                              
                                                                                  
                                </Link>
                              </div>
                              <div className="col-6 col-sm-6 col-md-6">
                                  <Link to="#" className="link_cst confirm_btn" onClick={valid_uploading}>
                                        {/* <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/> */}
                                          {/* <a href="#"> */}
                                              Suivant
                                            {/* </a>      */}
                                                                              
                                                                                  
                                </Link>
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
          


          </div>
         

      </main>


    </div>
      

  </>
  )
}

export default CreateProduit
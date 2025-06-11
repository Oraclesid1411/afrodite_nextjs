// import React from 'react'
import  { useEffect, useState} from 'react'
import Tab from 'react-bootstrap/Tab';
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../../Context/AuthenticateContext";
import Tabs from 'react-bootstrap/Tabs';
import Header_banner from "../../Components/Header_banner"
import Footer from "../../Components/Footer"

import { Link , useLocation } from 'react-router-dom';
import image_a from "/assets/img/fs/vetements_default.jpeg"

import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faPlus  } from '@fortawesome/free-solid-svg-icons'

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    // const [idproduit , setidproduit] =  useState(null);
   
// select produits du vendeur




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
 // vendeur)
 useEffect(() => {
  const params = {
    userid : userid 
  }
  
  const fetchData = async () => {
 
        try {
           
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

            }
            

          
            
                
        }
        catch (err) {
              console.log(err);  
          }
      };
      fetchData(userid);
 

  }); 
  
  
  // console.log('record show') 
  // console.log(list_descripteurs) 
  

  const handleDelete = async (event ) => {

    console.log(event)

    // return false;
        
      if(event.target.dataset.biens != undefined){
        setModalOpen(true);
          
        console.log("event.target")
        console.log(event.target.dataset.biens)
        var tab_id = [];
        // prev id
        for(let i=0; i < delete_id.length; i++){
          tab_id.push(delete_id[i])
        }
        tab_id.push(event.target.dataset.biens)
        // current id
        
        console.log(tab_id)
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

    console.log('delete')
    console.log(delete_id)
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

     console.log(deleting) 
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
//  console.log('list_descripteurs')
//  console.log(list_descripteurs)

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
                                  <table>
                                    <thead>
                                    <tr>
                                      <th>#</th>
                                      <th>prod.</th>
                                      <th>vue</th>
                                      <th>date</th>
                                      <th>categ.</th>
                                      <th>actions</th>
                                      <th>prix</th>
                                      <th>stock</th>
                                      <th>actions</th>
                                      <th>prix</th>
                                      <th>stock</th>
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
                                      <td>-</td>
                                      <td>-</td>

                                      <td>
                                        <>

                                        { item.type_bien === 1 ?
                                          (
                                            "vêtement"

                                          )

                                          :

                                          item.type_bien === 2 ?
                                         
                                          (
                                            "Accessoire"

                                          )

                                         :

                                          item.type_bien === 3 ?
                                          (
                                            "cosmétique"
                                          )
                                          
                                          :
                                          item.type_bien === 4 ?

                                          (
                                            "cheveux"

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
                                                    
                                                    <FontAwesomeIcon onClick={handleDelete} size="sm" icon={faTimes} data-biens = {item?.Mle_biens} className='iconify'/>
                                               
                                                {/* </a> */}
                                            </div>

                                      </td>
                                      <td>{item.prix} fr</td>
                                      <td>{item.qte}</td>
                                      <td>{item.prix} fr</td>
                                      <td>{item.qte}</td>
                                      <td>{item.prix} fr</td> 
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
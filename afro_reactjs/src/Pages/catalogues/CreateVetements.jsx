// import React from 'react'

import  { useEffect, useState} from 'react'
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
  } from "react-router-dom";

  import Select from 'react-select'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faCamera, faImage } from '@fortawesome/free-solid-svg-icons'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { faPlus } from '@fortawesome/free-solid-svg-icons'

  function Save_input(props) {
    
    return( 
      <>
                    <div className="input_line">
                                   <div className="inline-block boxes">
                                                                                                                    
                                        <input className="ckbx" id="customCheck01" type="checkbox" name="gele1" value="1" onclick="checkBoxFunction('prixvet', this,'gele_prixlbl');"/>
                                                                                                                  
                                     <label id="gele_prixlbl" className="cursor-pointer font-italic gelelabel d-block custom-control-label" htmlFor="customCheck01">Géler</label>
                                                                                                                                                                                
                                                                                                                                                                        
                                                                                        
                                   </div>
                    </div>

      </>
    )
  }

function CreateVetements() {

  const apiUrl = 'https://fsapi.fashionecos.com'
  
  axios.defaults.withCredentials = true;
  const auth = useAuth();
  const navigate = useNavigate()
  const user_info = auth.currentUser

  console.log(user_info)
  
  // liste des data


  const [options_designation, setOptions_designation] = useState([]);  
  const [options_etat, setOptions_etat] = useState([]);  
  const [options_couleur, setOptions_couleur] = useState([]);  
  const [options_marque, setOptions_marque] = useState([]);  
  const [options_joint, setOptions_joint] = useState([]);  
  const [options_col, setOptions_col] = useState([]);  
  const [options_manche, setOptions_manche] = useState([]);  
  const [options_motif, setOptions_motif] = useState([]);  
  const [options_occasion, setOptions_occasion] = useState([]);  
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  

  
    // désignation: classe du produit
    
    useEffect(() => {
  
      axios.get(`${apiUrl}/descripteurs/getDesignation`)
        .then(response => {


          console.log(response.data);
          var tab_desig = [];
          for(let i = 0; i < response.data.length; i++){ 
            tab_desig.push(
              { value: response.data[i].idclassvet, label: response.data[i].libelclassvet }
            )
 
          }
          setOptions_designation(tab_desig)

        })
        .catch(error => console.error('echec de récupération de données', error));
    }, []);

     // etat
    
     useEffect(() => {
  
      axios.get(`${apiUrl}/descripteurs/getEtat`)
        .then(response => {


          console.log(response.data);
          var tab_desig = [];
          for(let i = 0; i < response.data.length; i++){ 
            tab_desig.push(
              { value: response.data[i].idclassvet, label: response.data[i].libelclassvet }
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


          console.log(response.data);
          var tab_desig = [];
          for(let i = 0; i < response.data.length; i++){ 
            tab_desig.push(
              { value: response.data[i].idclassvet, label: response.data[i].libelclassvet }
            )
 
          }
          setOptions_couleur(tab_desig)

        })
        .catch(error => console.error('echec de récupération de données', error));
    }, []);

     // marque
    
     useEffect(() => {
  
      axios.get(`${apiUrl}/descripteurs/getMarque`)
        .then(response => {


          console.log(response.data);
          var tab_desig = [];
          for(let i = 0; i < response.data.length; i++){ 
            tab_desig.push(
              { value: response.data[i].idclassvet, label: response.data[i].libelclassvet }
            )
 
          }
          setOptions_marque(tab_desig)

        })
        .catch(error => console.error('echec de récupération de données', error));
    }, []);

     // joint
    
     useEffect(() => {
  
      axios.get(`${apiUrl}/descripteurs/getJoint`)
        .then(response => {


          console.log(response.data);
          var tab_desig = [];
          for(let i = 0; i < response.data.length; i++){ 
            tab_desig.push(
              { value: response.data[i].idclassvet, label: response.data[i].libelclassvet }
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


          console.log(response.data);
          var tab_desig = [];
          for(let i = 0; i < response.data.length; i++){ 
            tab_desig.push(
              { value: response.data[i].idclassvet, label: response.data[i].libelclassvet }
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


          console.log(response.data);
          var tab_desig = [];
          for(let i = 0; i < response.data.length; i++){ 
            tab_desig.push(
              { value: response.data[i].idclassvet, label: response.data[i].libelclassvet }
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


          console.log(response.data);
          var tab_desig = [];
          for(let i = 0; i < response.data.length; i++){ 
            tab_desig.push(
              { value: response.data[i].idclassvet, label: response.data[i].libelclassvet }
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


          console.log(response.data);
          var tab_desig = [];
          for(let i = 0; i < response.data.length; i++){ 
            tab_desig.push(
              { value: response.data[i].idclassvet, label: response.data[i].libelclassvet }
            )
 
          }
          setOptions_occasion(tab_desig)

        })
        .catch(error => console.error('echec de récupération de données', error));
    }, []);
    
  // declaration des parametres
  const [upload_img, setUpload_img] = useState([]);  
  const [upload_file, setFile] = useState("");  
  const [images_gallery_boxshow, setimages_gallery_boxshow] = useState(false);  
  const [images_camera_boxshow, setImages_camera_boxshow] = useState(false);  
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
  const [taille, setTaille] = useState(null); 
  const [couv_corp, setCouvcorp] = useState(null); 
  const [age, setAge] = useState(null); 
  const [manche, setManche] = useState(null); 
  const [col, setCol] = useState(null); 


console.log(col)

console.log(manche)
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
  console.log("designation")
  console.log(designation)

  // fonctions
  
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
   
  
  const saveRecord = (event) => {
    console.log(event.target)
    event.preventDefault();
    console.log(document.querySelector(event.target.dataset.form))
    var produit_values = {};
    produit_values = {
    prix : values.prix,
    qte : values.qte,
    reduction :values.reduction, 
    genre :genre, 
    taille :taille, 
    couv_corp :couv_corp, 
    age :age, 
    manche :manche, 
    col : col, 
    designation :designation, 
    etat : etat, 
    couleur : couleur, 
    marque : marque, 
    joint : joint, 
    typecol : typecol, 
    typemanche : typemanche, 
    motif : motif, 
    occasion : occasion, 

   }
   console.log(produit_values)



   
 
return false;
   
  };

  
  const publishRecord = (event) => {
    console.log(event.target)
    event.preventDefault();
    console.log(document.querySelector("#" + event.target.dataset.form))
   
 
return false;
    
   };
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target)
  
 
return false;
    try {
      await axios
        .post(`${apiUrl}/auth/register`,
                  [
                         {user : user_values},
                         {em: ecosmoney_values},
                         {vendeur: vendeur_values},
                         {artisan: artisan_values},
                         {admindepot: admindepot_values},
                         {livreur: livreur_values}
                                          
                  ]
           )
        .then((result) => {
          toast.info('création de compte en cours' , {
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
           setTimeout(() => {
              console.log(result);
              console.log(auth_fct?.set_user(result.data))
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
                navigate("/profile", 
                { state: { previousPath: location.pathname }});
              
                });
          }, 3500); // Délai de 3 secondes

      // navigate("/login");
    } catch (err) {
      console.log("erreur");
      // setError(err.response.data);
    }
  };


  var tab_img = [];
  
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
    if(images_camera_boxshow === true){
      setImages_camera_boxshow(false)

    }
  
  };
     const valid_uploading = () => {
    // console.log('test')
    // hide preview box
    if(images_gallery_boxshow === true){
        setimages_gallery_boxshow(false)

    }
    if(images_camera_boxshow === true){
      setImages_camera_boxshow(false)

    }
  
  };
  const onImageChange = (e) => {  
    for(let i= 0;i < upload_img.length; i++ ){

      tab_img.push(upload_img[i])
    }
  for(let j= 0; j< e.target.files.length; j++ ){
    var this_path =   URL.createObjectURL(e.target.files[j]);
     this_path =   URL.createObjectURL(e.target.files[j]);
  
    tab_img.push({
      id: upload_img.length + 1,
      src: this_path,
      alt: "image indisponible"
    })
  
 
}
    setUpload_img(tab_img);
  
    setFile(e.target.files[0]);
 
  };

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

        }
      
      };

 
  return (
 
    <>
    <div className="body-wrapper">
      <main id="MainContent" className="content-for-layout creer_produit">

          {/* select option prise images */}
          <div className="container">
            {/* form zone */}
          
 
          {upload_img.length === 0 ?
          (
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
             <form id="recordProduit" onSubmit={handleSubmit} >
              <div className="form_box">
                  <Header_banner  data_props ={{ 
                              title: 'Publier un produit: vêtement',
                      }} 
                      data_page = {{type: "catalogue" , back_option: "on"}}
      />
                  <div className="list_image">
                    <div className="title">
                    <label>Images du produit</label>
                    </div>
                      
                          <div className="images-wrapper">
                                              {upload_img.map((item) => (
                                                  <div key={item.id}>
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
                                     
                                
                                
                                  <div className="input_line">                                                                                                    
                                              <label className="input_lbl">Prix</label>  
                                        <div className="input_box">
                                              <input className="input_field" 
                                               value={values.prix}
                                              onChange={(e) =>
                                                setValues({ ...values, prix: e.target.value })
                                              } data-priorite="1" type="number" name="prix" id="prix"/>
                                          </div>
                                      
                                                                                                                                                                                                                                                                        
                                  </div>
                                
                                  <div className="input_line">

                                    <label className="input_lbl">Quantité</label>
                                          <div className="input_box">
                                            <input className="input_field"  value={values.qte}
                                              onChange={(e) =>
                                                setValues({ ...values, qte: e.target.value })
                                              } data-priorite="1"  type="number" name="qte" id="qte"/>
                                          </div>
                                                                  
                                                                                                                                              
                                                                                                                                    
                                  </div>
                                  <div className="input_line">

                                    <label className="input_lbl">Réduction</label>  

                                    <div className="input_box">
                                        <input className="input_field"  value={values.reduction}
                                              onChange={(e) =>
                                                setValues({ ...values, reduction: e.target.value })
                                              } type="number" name="reduction" id="reduction"/>
                                    </div>                           
                                                    
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
                                                                                    <label>
                                                                                      <input
                                                                                        type="checkbox"
                                                                                        className="React__checkbox--input"
                                                                                        name="masculin"
                                                                                        data-input="genre"                                                            
                                                                                        checked={genre === "masculin"}
                                                                                        onChange={handlechkChange}
                                                                                      />
                                                                                      <span className="React__checkbox--span" /> masculin
                                                                                    </label>
                                                                                  </div>
                                                                                </div>
                                                                                <div className="fit_content">
                                                                                  <div className="React__checkbox">
                                                                                    <label>
                                                                                      <input
                                                                                        type="checkbox"
                                                                                        className="React__checkbox--input"
                                                                                        name="feminin"
                                                                                          data-input="genre"
                                                                                        checked={genre === "feminin"}
                                                                                        onChange={handlechkChange}
                                                                                      />
                                                                                      <span className="React__checkbox--span" /> féminin
                                                                                    </label>
                                                                                  </div>
                                                                                </div>
                          </div>                           
                                          
                          </div>

                          {/* age */}
                          <div className="input_line">

                            <label className="input_lbl">Age</label>  

                                              <div className="input_box">
                                              <div className="fit_content mr-4">
                                                          <div className="React__checkbox">
                                                            <label>
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
                                                            <label>
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
                                                                
                          </div>

                          {/* couverture corporelle */}
                          <div className="input_line">

                            <label className="input_lbl">couv. corp.</label>  

                                          <div className="input_box">
                                                    <div className="fit_content mr-2">
                                                      <div className="React__checkbox">
                                                        <label>
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
                                                        <label>
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
                                                        <label>
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
                                                        <label>
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
                                                            
                        </div>
                        <div className="input_line">

                                        <label className="input_lbl">Taille</label>  

                                          <div className="input_box">
                                                    <div className="fit_content mr-2">
                                                      <div className="React__checkbox">
                                                        <label>
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
                                                        <label>
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
                                                        <label>
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
                                                        <label>
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
                                                        <label>
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
                                                            
                        </div>



                      </div>
                      <div className="select_input">
                        {/* désignation (classe du produit) */}
                            <div className="input_line">                                                                                                    
                                                <label className="input_lbl">Désignation</label>  
                                          <div className="input_box">
                                                    <Select options={options_designation} defaultValue={designation} onChange={setDesignation} placeholder="sélectionner" name="designation" />
                                                {/* <input className="input_field"  data-priorite="1" type="number" name="prix" id="prix"/> */}
                                            </div>
                                        
                                                                                                                                                                                                                                                                          
                          </div>
                          {/* etat */}
                            <div className="input_line">                                                                                                    
                                                  <label className="input_lbl">Etat</label>  
                                            <div className="input_box">
                                                      <Select options={options} placeholder="sélectionner" name="etat" defaultValue={etat} onChange={setEtat}/>
                                                  {/* <input className="input_field"  data-priorite="1" type="number" name="prix" id="prix"/> */}
                                              </div>
                                          
                                                                                                                                                                                                                                                                            
                            </div>
                            {/* couleur */}
                            <div className="input_line">                                                                                                    
                                                  <label className="input_lbl">Couleur</label>  
                                            <div className="input_box">
                                                      <Select options={options} placeholder="sélectionner" name="couleur" defaultValue={couleur} onChange={setCouleur}/>
                                                  {/* <input className="input_field"  data-priorite="1" type="number" name="prix" id="prix"/> */}
                                              </div>
                                          
                                                                                                                                                                                                                                                                            
                            </div>

                        <div className="lbl_important">
                                  <label className="mt-1 text-left ">Champs facultatifs</label>
                        </div>   
                        {/*marque  */}
                        <div className="input_line">                                                                                                    
                                              <label className="input_lbl">Marque</label>  
                                        <div className="input_box">
                                                  <Select options={options} placeholder="sélectionner" name="marque" defaultValue={marque} onChange={setMarque}/>
                                              {/* <input className="input_field"  data-priorite="1" type="number" name="prix" id="prix"/> */}
                                          </div>
                                      
                                                                                                                                                                                                                                                                        
                        </div>
                        {/* joint */}
                        <div className="input_line">                                                                                                    
                                              <label className="input_lbl">Joint</label>  
                                        <div className="input_box">
                                                  <Select options={options} placeholder="sélectionner" name="joint" defaultValue={joint} onChange={setJoint}/>
                                              {/* <input className="input_field"  data-priorite="1" type="number" name="prix" id="prix"/> */}
                                          </div>
                                      
                                                                                                                                                                                                                                                                        
                        </div>
                        {/* col */}
                        <div className="input_line">

                        <label className="input_lbl">Col</label>  

                        <div className="input_box">
                        <div className="fit_content mr-4">
                                                                                <div className="React__checkbox">
                                                                                  <label>
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
                                                                                  <label>
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
                                        
                        </div>
                        { col === "col" &&
                        (
                              <div className="input_line">                                                                                                    
                               <label className="input_lbl">type de col</label>  
                                      <div className="input_box">
                                                <Select options={options} placeholder="sélectionner" name="type_col" defaultValue={typecol} onChange={setTypecol}/>
                                            {/* <input className="input_field"  data-priorite="1" type="number" name="prix" id="prix"/> */}
                                        </div>
                                    
                                                                                                                                                                                                                                                                      
                           </div>
                        )

                        }
                      

                        {/* manche */}
                        <div className="input_line">

                          <label className="input_lbl">Manche</label>  

                          <div className="input_box">
                          <div className="fit_content mr-4">
                                                                                  <div className="React__checkbox">
                                                                                    <label>
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
                                                                                    <label>
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
                                          
                          </div>
                          {manche === "manche" &&
                            (
                              <div className="input_line">                                                                                                    
                                <label className="input_lbl">type de manche</label>  
                                      <div className="input_box">
                                                <Select options={options} placeholder="sélectionner" name="type_manche" defaultValue={typemanche} onChange={setTypemanche}/>
                                            {/* <input className="input_field"  data-priorite="1" type="number" name="prix" id="prix"/> */}
                                        </div>
                                    
                                                                                                                                                                                                                                                                      
                              </div>

                            )

                          }
                      
                        {/* motif */}

                        <div className="input_line">                                                                                                    
                                              <label className="input_lbl">motif</label>  
                                        <div className="input_box">
                                                  <Select options={options} placeholder="sélectionner" name="motif" defaultValue={motif} onChange={setMotif}/>
                                              {/* <input className="input_field"  data-priorite="1" type="number" name="prix" id="prix"/> */}
                                          </div>
                                      
                                                                                                                                                                                                                                                                        
                        </div>

                        {/* occasion */}
                        <div className="input_line">                                                                                                    
                                              <label className="input_lbl">occasion</label>  
                                        <div className="input_box">
                                                  <Select options={options} placeholder="sélectionner" name="occasion" defaultValue={occasion} onChange={setOccasion}/>
                                              {/* <input className="input_field"  data-priorite="1" type="number" name="prix" id="prix"/> */}
                                          </div>
                                      
                                                                                                                                                                                                                                                                        
                        </div>

                        
                      
                        {/* <Searchable_select options={options} onSelect={handleSelect} /> */}

                      </div>

                      <div className="send_btn">
                                    <label data-form="recordProduit" onClick={saveRecord} name="save" className='save_btn'>
                                             sauver
                                    </label>
                                    <label data-form="recordProduit" onClick={publishRecord} name="publish" className='save_btn'>
                                                publier
                                    </label>
                                 
                                  

                      </div>

                    </div>

                  </div>
              
              </div>
            </form>
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
                                  <Link to="#" className="link_cst cancel_btn" onClick={cancel_uploading} >
                                        <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/>
                                          <a href="#">
                                              Annuler
                                            </a>     
                                                                              
                                                                                  
                                </Link>
                              </div>
                              <div className="col-6 col-sm-6 col-md-6">
                                  <Link to="#" className="link_cst confirm_btn">
                                        <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/>
                                          <a href="#">
                                              Passer
                                            </a>     
                                                                              
                                                                                  
                                </Link>
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
                                            <div key={item.id} className='full_img_box'>
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
                                            {upload_img.map((item, idx) => (
                                                <div
                                                key={item.id}
                                                className={currentSlide === idx ? "active": null}
                                                onClick={() => {
                                                    slider1?.slickGoTo(idx)
                                                }}>
                                                   <img  src={item?.src}  alt={item.alt} />
                                                {/* <img src={image_a} alt={item.alt}/> */}
                                                {currentSlide}
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
                                        <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/>
                                          <a href="#">
                                              Annuler
                                            </a>     
                                                                              
                                                                                  
                                </Link>
                              </div>
                              <div className="col-6 col-sm-6 col-md-6">
                                  <Link to="#" className="link_cst confirm_btn" onClick={valid_uploading}>
                                        <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/>
                                          <a href="#">
                                              Suivant
                                            </a>     
                                                                              
                                                                                  
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

export default CreateVetements
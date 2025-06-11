import React, { useEffect, useState,Component ,memo } from 'react'

import { Route, Link, Routes, useLocation,useLoaderData } from 'react-router-dom';
import axios from 'axios'
import Slider from "react-slick";
import { nanoid } from "nanoid";

import parse from "html-react-parser";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping } from '@fortawesome/free-solid-svg-icons';
// import test from './assets/uploads/image/sell/produits/vetements/142deidei/2023-01-17-074927ali-pazani-fPRnc-KXwe8-unsplash.jpg';
// import img_1 from './../../assets/uploads/image/sell/produits/vetements/142deidei/2023-01-17-074927ali-pazani-fPRnc-KXwe8-unsplash.jpg';


export const singleProductLoader = async ({ params }) => {

  axios.defaults.withCredentials = true;
  // console.log('params')
  // console.log(params.id)
  // console.log(params)
  // console.log('params')
  // const { prod_id } = params.id;
  // const{ type_prod } = params.type;
  


  // const response = await axios(`http://localhost:8080/products/${id}`);
  const res = await axios.get('/products/getdetail:'  + params.id + '/:' + params.type) 
  console.log('response')
  console.log(res.data[0][0])

    // commun
              // age
              const response_age = await axios.get('/products/get_common_descriptif:age' + '/:' + res.data[0][0]?.age) 
              // genre
              const response_genre = await axios.get('/products/get_common_descriptif:genre' + '/:' + res.data[0][0]?.genre) 
              // vendeur
              const response_vendeur = await axios.get('/products/get_common_descriptif:vendeur' + '/:' + res.data[0][0]?.vendeur) 

              // taille: pour vêtements, accessoires, cheveux 
                if((res.data[0][0]?.type_bien === 1) || (res.data[0][0]?.type_bien === 2) ||(res.data[0][0]?.type_bien === 4)){

                  console.log('taille')
                  var response_taille = await axios.get('/products/get_common_descriptif:taille' + '/:' + res.data[0][0]?.taille)
                  
                  
                }
                else{
                   response_taille = {data : null};
                }
                // état de l'article
                if(res.data[0][0]?.type_bien === 1){

                  // console.log('etat')
                  var response_etat = await axios.get('/products/get_common_descriptif:etatvet' + '/:' + res.data[0][0]?.etatvet)
                  
                  
                }
                else if((res.data[0][0]?.type_bien === 3) || (res.data[0][0]?.type_bien === 2) ||(res.data[0][0]?.type_bien === 4)){

                  // console.log('etat')
                   response_etat = await axios.get('/products/get_common_descriptif:etat' + '/:' + res.data[0][0]?.etat)
                  
                  
                }
                else{
                   response_etat = {data : null};
                }

                // marque
                if(res.data[0][0]?.marque !== null){
                  if(res.data[0][0]?.type_bien === 1){

                    // console.log('marque')
                    if(res.data[0][0]?.cstm_marq === 1){
                      var table = 'custom_marque_vet'
                    }
                    else{
                       table = 'marque_vetems'
  
                    }

                    var response_marque = await axios.get('/products/get_common_descriptif:' + table + '/:' + res.data[0][0]?.marque)
                    
                    
                  }
                  else if(res.data[0][0]?.type_bien === 2){
  
                     if(res.data[0][0]?.cstm_marq === 1){
                       table = 'custom_marque_access'
                    }
                    else{
                       table = 'marque_acces'
  
                    }
                    
                     response_marque = await axios.get('/products/get_common_descriptif:' + table + '/:' + res.data[0][0]?.marque)
                    
                    
                  }
                  else if(res.data[0][0]?.type_bien === 3){
  
                    if(res.data[0][0]?.cstm_marq === 1){
                       table = 'custom_marque_cosm'
                    }
                    else{
                       table = 'marque_cosms'
  
                    }
                    
                     response_marque = await axios.get('/products/get_common_descriptif:' + table + '/:' + res.data[0][0]?.marque)
                    
                    
                  }
                  else if(res.data[0][0]?.type_bien === 4){
  
                    if(res.data[0][0]?.cstm_marq === 1){
                       table = 'custom_marque_cheveux'
                    }
                    else{
                       table = 'marque_chevs'
  
                    }
                    
                     response_marque = await axios.get('/products/get_common_descriptif:' + table + '/:' + res.data[0][0]?.marque)
                   
                    
                  }
                  else{
                     response_marque = {data : null};
                  }

                }

                // désignation: classe du produit
                if(res.data[0][0]?.type_bien === 1){

                  if(res.data[0][0]?.cstm_class === 1){
                     table = 'custom_classe_vet'
                  }
                  else{
                     table = 'classe_vetements'

                  }
                  var response_desig = await axios.get('/products/get_common_descriptif:' + table + '/:' + res.data[0][0]?.classevet)
                  
                  
                }
                else  if(res.data[0][0]?.type_bien === 2){

                  if(res.data[0][0]?.cstm_class === 1){
                     table = 'custom_classe_access'
                  }
                  else{
                     table = 'classe_access'

                  }
                   response_desig = await axios.get('/products/get_common_descriptif:' + table + '/:' + res.data[0][0]?.classe)
                  
                  
                }
                else  if(res.data[0][0]?.type_bien === 3){

                  if(res.data[0][0]?.cstm_class === 1){
                     table = 'custom_classe_cosmetique'
                  }
                  else{
                     table = 'classe_cosms'

                  }
                   response_desig = await axios.get('/products/get_common_descriptif:' + table + '/:' + res.data[0][0]?.classe)
                  
                  
                }
                else  if(res.data[0][0]?.type_bien === 4){

                  if(res.data[0][0]?.cstm_class === 1){
                     table = 'custom_classe_cheveux'
                  }
                  else{
                     table = 'classe_chevs'

                  }
                   response_desig = await axios.get('/products/get_common_descriptif:' + table + '/:' + res.data[0][0]?.classe)
                  
                  
                }


              



            
  

    
  return { productData: res.data, data_age: response_age.data, data_genre: response_genre.data , data_vendeur: response_vendeur.data, data_taille: response_taille.data , data_etat: response_etat.data , data_marque: response_marque.data, data_desig: response_desig.data };
};
 



const Description_produit = () => {

              

            const { productData } = useLoaderData();

            const liste_image = productData[1];
            const detail_prod = productData[0];
          
         
                          // taille: pour vêtements, accessoires, cheveux 
             const { data_age } = useLoaderData();
              const { data_genre } = useLoaderData();
              const { data_vendeur } = useLoaderData();
              // if((detail_prod[0][0]?.type_bien === 1) || (detail_prod[0][0]?.type_bien === 2) ||(detail_prod[0][0]?.type_bien === 4)){
             
                // var { data_taille } = useLoaderData();
            //  }

                  function Taille({ productData }) {
                    // let itemContent = name;
                    // if (productData) {
                    //  console.log('detail loaded')
                     var { data_taille } = useLoaderData();

                     if(data_taille){
                      console.log(data_taille)
                      // }
                      return (
                        <span>taille:   <Link to='/' className='cst_link'>{data_taille[0]?.libtaille}</Link>  </span>
                      
                      );
                     }
                     return null;
                  
                  }
                  function Etat({ productData }) {
                    // let itemContent = name;
                    // if (productData) {
                     console.log('detail loaded')
                     var { data_etat } = useLoaderData();

                     if(data_etat){
                      // console.log(data_etat)
                      // }
                      return (
                        <span>état:   <Link to='/' className='cst_link'>{data_etat[0]?.libeletat}</Link>  </span>
                      
                      );
                     }
                     return null;
                  
                  }

                  function Marque() {
                    // let itemContent = name;
                    // if (productData) {
                     console.log('marque loaded')
                     const { productData } = useLoaderData();
                   
                     var { data_marque } = useLoaderData();
                     console.log(data_marque)
                     console.log(productData)

                     if(productData[0][0]?.type_bien === 1){

                      console.log('marque')
                      if(productData[0][0]?.cstm_marq === 1){
                        return (
                          <span>marque:   <Link to='/' className='cst_link'>{data_marque[0]?.libelle_marq_vet_bis}</Link>  </span>
                        
                        );
                      }
                      else{
                        return (
                          <span>marque:   <Link to='/' className='cst_link'>{data_marque[0]?.nommarqvet}</Link>  </span>
                        
                        );
    
                      }
  
                    
                      
                      
                    }
                   else if(productData[0][0]?.type_bien === 2){

                      console.log('marque')
                      if(productData[0][0]?.cstm_marq === 1){
                        return (
                          <span>marque:   <Link to='/' className='cst_link'>{data_marque[0]?.libelle_marqaccess}</Link>  </span>
                        
                        );
                      }
                      else{
                        return (
                          <span>marque:   <Link to='/' className='cst_link'>{data_marque[0]?.nommarqaccess}</Link>  </span>
                        
                        );
    
                      }
  
                    
                      
                      
                    }
                   else if(productData[0][0]?.type_bien === 3){

                      console.log('marque')
                      if(productData[0][0]?.cstm_marq === 1){
                        return (
                          <span>marque:   <Link to='/' className='cst_link'>{data_marque[0]?.libelle_marqcosm}</Link>  </span>
                        
                        );
                      }
                      else{
                        return (
                          <span>marque:   <Link to='/' className='cst_link'>{data_marque[0]?.nommarqcosm}</Link>  </span>
                        
                        );
    
                      }
  
                    
                      
                      
                    }
                   else if(productData[0][0]?.type_bien === 4){

                      console.log('marque')
                      if(productData[0][0]?.cstm_marq === 1){
                        return (
                          <span>marque:   <Link to='/' className='cst_link'>{data_marque[0]?.libelle_marqchev}</Link>  </span>
                        
                        );
                      }
                      else{
                        return (
                          <span>marque:   <Link to='/' className='cst_link'>{data_marque[0]?.nommarqchev}</Link>  </span>
                        
                        );
    
                      }
  
                    
                      
                      
                    }

                  
                     return null;
                  
                  }

                  function Designation() {
                    // let itemContent = name;
                    // if (productData) {
                     console.log('marque loaded')
                     const { productData } = useLoaderData();
                   
                     var { data_desig } = useLoaderData();

                     if(productData[0][0]?.type_bien === 1){

                      console.log('marque')
                      if(productData[0][0]?.cstm_class === 1){
                        return (
                          <span>Libellé:   <Link to='/' className='cst_link'>{data_desig[0]?.libelle_classe_vet_bis}</Link>  </span>
                        
                        );
                      }
                      else{
                        return (
                          <span>Libellé:   <Link to='/' className='cst_link'>{data_desig[0]?.libelclassvet}</Link>  </span>
                        
                        );
    
                      }
  
                    
                      
                      
                    }
                   else if(productData[0][0]?.type_bien === 2){

                    
                      if(productData[0][0]?.cstm_class === 1){
                        return (
                          <span>Libellé:   <Link to='/' className='cst_link'>{data_desig[0]?.libelle_ccaccess}</Link>  </span>
                        
                        );
                      }
                      else{
                        return (
                          <span>Libellé:   <Link to='/' className='cst_link'>{data_desig[0]?.libelclassacces}</Link>  </span>
                        
                        );
    
                      }
  
                    
                      
                      
                    }
                   else if(productData[0][0]?.type_bien === 3){

                     
                      if(productData[0][0]?.cstm_class === 1){
                        return (
                          <span>Libellé:   <Link to='/' className='cst_link'>{data_desig[0]?.libelle_cccosm}</Link>  </span>
                        
                        );
                      }
                      else{
                        return (
                          <span>Libellé:   <Link to='/' className='cst_link'>{data_desig[0]?.libelclasscosm}</Link>  </span>
                        
                        );
    
                      }
  
                    
                      
                      
                    }
                   else if(productData[0][0]?.type_bien === 4){

                    
                      if(productData[0][0]?.cstm_class === 1){
                        return (
                          <span>Libellé:   <Link to='/' className='cst_link'>{data_desig[0]?.libelle_ccchev}</Link>  </span>
                        
                        );
                      }
                      else{
                        return (
                          <span>Libellé:   <Link to='/' className='cst_link'>{data_desig[0]?.libelclasschev}</Link>  </span>
                        
                        );
    
                      }
  
                    
                      
                      
                    }

                  
                     return null;
                  

                  }

                   console.log('productData')
     

            // console.log(response_taille.data)
            console.log('detail_prod')
             // recupérer les libellé des descripteurs

            // vetement
            console.log(productData[0][0]?.type_bien)
          


            if(productData[0][0]?.type_bien === 1){
              console.log('vetement')
              console.log(data_age)
              // 
            }

            // accessoires
            else if(productData[0][0]?.type_bien === 2){
              console.log('accessoires')

            }

            // cosmetique
            else if(productData[0][0]?.type_bien === 3){
              console.log('cosmétiques')

            }

            // cheveux

            else if(productData[0][0]?.type_bien === 4){
              console.log('produits capillaires')

            }

            else{
              console.log('unknow')
            }

            // const product = {
            //   id: productData?.Mle_biens,
            //   title: productData?.genre,
            //   image: productData?.path_image1,
            //    price: productData?.prix,
            //    amount: productData?.qte,
            
            // };
  
     
      
        const settings = {
          dots: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: false,
          // autoplaySpeed: 1000,
        };

     
      


  return (

           <div className='container detail_ihm'>
                <div className="image_slide_container">
                        <Slider {...settings} >
                            {liste_image.map((item) => (
                              <div>
                              
                                <img src={require(`./../../assets/${item?.src}`)} alt={item?.src} />
                                                      
                                
                                
                                
                              </div>
                            ))}
                      </Slider>
                </div>
        
                         
               <div className="content" style={{ display : "none"}}>
                {detail_prod.map((info) => (
                  // trois boutons pour les différents formes d'achats
                    <div className="">
                      
                        <div className="cart_zone text-xl max-sm:text-lg text-accent-content">
                        <button
                          className="cart btn bg-blue-600 hover:bg-blue-500 shopping_btn"
                          onClick={'/'} >
                          Ajouter
                       <FontAwesomeIcon  className=" mr-1"  size="lg" icon={faCartShopping}/>
                      
                         
                        </button>
                        <button
                          className="xp btn bg-blue-600 hover:bg-blue-500  shopping_btn"
                          // onClick={() => {
                          //   if (loginState) {
                          //     dispatch(addToCart(product));
                          //   } else {
                          //     toast.error(
                          //       "You must be logged in to add products to the cart"
                          //     );
                          //   }
                          // }}
                        >
                         {/* <FontAwesomeIcon  className=" mr-1"  size="lg" icon={faCartShopping}/> */}
                      
                         Achat express
                        </button>
                        <button
                          className="myxp btn bg-blue-600 hover:bg-blue-500  shopping_btn"
                          // onClick={() => {
                          //   if (loginState) {
                          //     dispatch(addToCart(product));
                          //   } else {
                          //     toast.error(
                          //       "You must be logged in to add products to the cart"
                          //     );
                          //   }
                          // }}
                        >
                        {/* <FontAwesomeIcon  className=" mr-1"  size="lg" icon={faCartShopping}/> */}
                      
                         Achat Myexpress
                        </button>
                       </div>
                       <div className="descriptif_zone">
                       <Designation />  
                      
                         <span>prix:  <Link to='/' className='cst_link'>{info?.prix}</Link>fr</span>
                         <span>en stock:   <Link to='/' className='cst_link'>{info?.qte}</Link></span>
                         <span>genre:   <Link to='/' className='cst_link'>{data_genre[0]?.libgenre}</Link></span>
                         <span>age:   <Link to='/' className='cst_link'>{data_age[0]?.libage}</Link></span>
                            <Taille />  
                            <Etat /> 
                            <Marque /> 
                          
                         <span>vendeur:   <Link to='/' className='cst_link'>{data_vendeur[0]?.nomvendeur}</Link></span>
                        {/* <span> {parse(info?.image_1)}</span> */}
                      
                      </div>

                     
                 
                  </div>
                  

                 ))}
                
              </div>
                          
                        
    
        <div>
          
     
           
    </div>
    
 
    </div>
  )
}

export default Description_produit

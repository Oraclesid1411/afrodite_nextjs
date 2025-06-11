import React, { useEffect, useState, useRef  } from 'react'

import { Route, Link, Routes, useLocation,useLoaderData } from 'react-router-dom';
import axios from 'axios'

import Genre_links from '../../../Components/Genre_links';
import Header_menu from '../../../Components/Header_menu'

import image_a from "/assets/img/fs/cosmetique_def.jpeg"
import GridView from '../../../Components/GridView';

import Footer from '../../../Components/Footer';

import Slider from "react-slick";

// style

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Cosmetique = () => {

  let current_location = useLocation();
  const param = useLocation().search

  const link_url = current_location?.pathname.split('/');
  console.log(link_url)
  console.log('param')
  axios.defaults.withCredentials = true;

  const [liste_dame , setlistdame] = useState([]);
  const [liste_homme , setlisthomme ] = useState([]);
  const [liste_uni , setlistuni ] = useState([]);
  const apiUrl = 'https://fsapi.fashionecos.com'

  
  useEffect(() => {
      
    const fetchData = async () => {
     
      try {
       
        console.log('request send')
               
         

           const rep1 = await axios.get(`${apiUrl}/produits/getCosmetiques_dame`);
             const rep2 = await axios.get(`${apiUrl}/produits/getCosmetiques_homme`);
          const rep3 = await axios.get(`${apiUrl}/produits/getCosmetiques_uni`);
        
       
         
          setlistdame(rep1.data);
          setlisthomme(rep2.data);
          setlistuni(rep3.data);
        console.log('test here')
      } catch (err) {
        console.log(err);
        console.log('erreur here')
      }
    };
    fetchData();
  });


    //   join les genders
    //   male et uni
    var All_vh = [];
    // console.log(liste_vetements_homme)
    if(liste_homme.length > 0){
        for(let i=0; i<liste_homme.length; i++){
            All_vh.push(liste_homme[i])
        }
    }
    if(liste_uni.length > 0){
        for(let i=0; i<liste_uni.length; i++){
            All_vh.push(liste_uni[i])
        }
    }
    // console.log(liste_vetements_uni)

    // female et uni
    var All_vd = [];
    // console.log(liste_vetements_dame)
    if(liste_dame.length > 0){
        for(let i=0; i<liste_dame.length; i++){
            All_vd.push(liste_dame[i])
        }
    }
    if(liste_uni.length > 0){
        for(let i=0; i<liste_uni.length; i++){
            All_vd.push(liste_uni[i])
        }
    }
 
  return (
    <>
       <Header_menu data_page = {{type: "produit" , back_option: "on"}}/>
        <div className="body-wrapper">
          <main id="MainContent" className="content-for-layout">
        {/* <!-- collection start --> */}
        <Genre_links 
               listdata ={{ 
                             link : '', category: '' , 
                             link_a: '/vetements'  , title_a : 'vêtements' ,active_a : 'nonactif',
                             link_b: '/accessoires'  , title_b : 'accessoires' ,active_b : 'nonactif',
                             link_c: ''  , title_c : 'cosmétiques' ,active_c : 'actif',
                             link_d: '/cheveux'  , title_d : 'cheveux', active_d : 'nonactif',
                          }} 
            />
        <GridView
            product_list_a ={{ title: 'dames' , data: All_vd , link : '/cosmetiquesdames' , defaultImg:image_a}} 
            
            product_list_b ={{ title: 'hommes' , data: All_vh, link : '/cosmetiqueshommes', defaultImg:image_a}} 
            product_list_c ={{ title: 'dames' , data: All_vd, link : '/cosmetiquesdames' , defaultImg:image_a}} 
            product_list_d ={{ title: 'hommes' , data: All_vh, link : '/cosmetiqueshommes' , defaultImg:image_a}} 
            category = {{num_a : "3" , num_b : "3" , num_c : "3" , num_d : "3"} }
        />

          
    {/* <!-- collection end --> */}
        </main>
        <Footer />                         
          </div>
    </>
  )
}

export default Cosmetique

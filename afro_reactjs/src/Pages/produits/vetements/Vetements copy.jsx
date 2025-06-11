import React, { useEffect, useState, useRef  } from 'react'

import { Route, Link, Routes, useLocation,useLoaderData } from 'react-router-dom';
import axios from 'axios'

import Header_menu from '../../../Components/Header_menu'

import Footer from '../../../Components/Footer';

import Slider from "react-slick";

import GridView from '../../../Components/GridView';
// style

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Vetements = () => {
    let current_location = useLocation();
    const param = useLocation().search

    const link_url = current_location?.pathname.split('/');
    console.log(link_url)
    console.log('param')
    axios.defaults.withCredentials = true;

    const [liste_vetements_dame , setlistVetementsdame] = useState([]);
    const [liste_vetements_homme , setlistVetementshomme ] = useState([]);
    const [liste_vetements_uni , setlistVetementsuni ] = useState([]);

    const apiUrl = 'http://localhost:8000'

      useEffect(() => {
      
        const fetchData = async () => {
         
          try {
           
            console.log('request send')
                   
             

               const rep1 = await axios.get(`${apiUrl}/produits/getVetements_dame`);
                 const rep2 = await axios.get(`${apiUrl}/produits/getVetements_homme`);
              const rep3 = await axios.get(`${apiUrl}/produits/getVetements_uni`);
            
           
             
              setlistVetementsdame(rep1.data);
              setlistVetementshomme(rep2.data);
              setlistVetementsuni(rep3.data);
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
    if(liste_vetements_homme.length > 0){
        for(let i=0; i<liste_vetements_homme.length; i++){
            All_vh.push(liste_vetements_homme[i])
        }
    }
    if(liste_vetements_uni.length > 0){
        for(let i=0; i<liste_vetements_uni.length; i++){
            All_vh.push(liste_vetements_uni[i])
        }
    }
    // console.log(liste_vetements_uni)

    // female et uni
    var All_vd = [];
    // console.log(liste_vetements_dame)
    if(liste_vetements_dame.length > 0){
        for(let i=0; i<liste_vetements_dame.length; i++){
            All_vd.push(liste_vetements_dame[i])
        }
    }
    if(liste_vetements_uni.length > 0){
        for(let i=0; i<liste_vetements_uni.length; i++){
            All_vd.push(liste_vetements_uni[i])
        }
    }

console.log(All_vd)
console.log(All_vh)


const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />
  };
    return (

        <>
          <Header_menu />
          <div className="body-wrapper">
          <main id="MainContent" className="content-for-layout">
        {/* <!-- collection start --> */}
           <GridView product_list_a ={{ title: 'vêtements dames' , data: All_vd}} 
                     product_list_b ={{ title: 'vêtements hommes' , data: All_vh}} 
                     product_list_c ={{ title: 'vêtements dames' , data: All_vd}} 
                     product_list_d ={{ title: 'vêtements hommes' , data: All_vh}} 
                    />
           {/* <Banner_sm show_test={{ title: 'Page de publication'}} /> */}
    {/* <!-- collection end --> */}
        </main>
        <Footer />                         
          </div>

          
        </>

    )


}
export default Vetements
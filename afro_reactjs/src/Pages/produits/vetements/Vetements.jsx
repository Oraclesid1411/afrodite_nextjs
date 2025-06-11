import  { useEffect, useState  } from 'react'

import { useLocation } from 'react-router-dom';
import axios from 'axios'

import Genre_links from '../../../Components/Genre_links';
import Header_menu from '../../../Components/Header_menu'
import Footer from '../../../Components/Footer';
import GridView from '../../../Components/GridView';

// import Slider from "react-slick";

// style


import image_a from "/assets/img/fs/vetements_default.jpeg"
const Vetements = () => {
    let current_location = useLocation();
    // const param = useLocation().search

    const link_url = current_location?.pathname.split('/');
    console.log(link_url)
    
    console.log('param')
    axios.defaults.withCredentials = true;

    const [liste_vetements_dame , setlistVetementsdame] = useState([]);
    const [liste_vetements_homme , setlistVetementshomme ] = useState([]);
    const [liste_vetements_uni , setlistVetementsuni ] = useState([]);

    // const apiUrl = 'http://localhost:8000'
    
    const apiUrl = 'https://fsapi.fashionecos.com'

      useEffect(() => {
      console.log('use effect')
        const fetchData = async () => {
         
          try {
           
            console.log('request send')
                   
             

               const rep1 = await axios.get(`${apiUrl}/produits/getVetements_dame`);
                 const rep2 = await axios.get(`${apiUrl}/produits/getVetements_homme`);
              const rep3 = await axios.get(`${apiUrl}/produits/getVetements_uni`);
            
           
              setlistVetementsdame(rep1.data);
              setlistVetementshomme(rep2.data);
              setlistVetementsuni(rep3.data);
           
          } catch (err) {
            console.log(err);
          
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

    
    return (

        <>
          <Header_menu data_page = {{type: "produit" , back_option: "on"}}/>
          <div className="body-wrapper">
          <main id="MainContent" className="content-for-layout">
        {/* <!-- collection start --> */}
        <Genre_links 
               listdata ={{ 
                             link : '', category: '' , 
                             link_a: ''  , title_a : 'vêtements' ,active_a : 'actif',
                             link_b: '/accessoires'  , title_b : 'accessoires' ,active_b : 'nonactif',
                             link_c: '/cosmetiques'  , title_c : 'cosmétiques' ,active_c : 'nonactif',
                             link_d: '/cheveux'  , title_d : 'cheveux', active_d : 'nonactif',
                          }} 
            />
           <GridView
                    product_list_a ={{ title: 'dames' , data: All_vd , link : '/vetementsdames' , defaultImg:image_a}} 
            
                     product_list_b ={{ title: 'hommes' , data: All_vh, link : '/vetementshommes', defaultImg:image_a}} 
                     product_list_c ={{ title: 'dames' , data: All_vd, link : '/vetementsdames' , defaultImg:image_a}} 
                     product_list_d ={{ title: 'hommes' , data: All_vh, link : '/vetementshommes' , defaultImg:image_a}}
                     category = {{num_a : "1" , num_b : "1" , num_c : "1" , num_d : "1"} }
           />
    {/* <!-- collection end --> */}
        </main>
        <Footer />                         
          </div>

          
        </>

    )


}
export default Vetements
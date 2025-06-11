import  { useEffect, useState  } from 'react'

import {  useLocation } from 'react-router-dom';
import axios from 'axios'

import Header_menu from '../../../Components/Header_menu'
import Footer from '../../../Components/Footer';
 
import Genre_links from '../../../Components/Genre_links';
 
import RowView from '../../../Components/RowView';
import image_a from "/assets/img/fs/vetements_default.jpeg"

const Vetements_garcons = () => {
  let current_location = useLocation();
  // const param = useLocation().search

  const link_url = current_location?.pathname.split('/');
  console.log(link_url)
  console.log('param')
  axios.defaults.withCredentials = true;

  const [liste_haut , setlistHaut] = useState([]);
  const [liste_bas , setlistBas ] = useState([]);
  const [liste_combis , setlistCombis ] = useState([]);
  const [liste_lingerie , setlistLingeries ] = useState([]);

   const apiUrl = 'https://fsapi.fashionecos.com'

  useEffect(() => {
    
      const fetchData = async () => {
       
        try {
         
          console.log('request send')
                
            const rep1 = await axios.get(`${apiUrl}/produits/haut_garcon`);
            const rep2 = await axios.get(`${apiUrl}/produits/bas_garcon`);
            const rep3 = await axios.get(`${apiUrl}/produits/combis_garcon`);
            const rep4 = await axios.get(`${apiUrl}/produits/lingerie_garcon`);
          
           
            setlistHaut(rep1.data);
            setlistBas(rep2.data);
            setlistCombis(rep3.data);
            setlistLingeries(rep4.data);

        } catch (err) {
          console.log(err);
          console.log('erreur here')
        }
      };
      fetchData();
    });
  
    
  return (
    <>
        <Header_menu data_page = {{type: "produit" , back_option: "on"}}/>
     
       <div className="body-wrapper">
          <main id="MainContent" className="content-for-layout">
          <Genre_links 
               listdata ={{ 
                             link : '/vetements', category: 'vêtements' , 
                             link_a: '/vetementsdames'  , title_a : 'dames' ,active_a : 'nonactif',
                             link_b: '/vetementsfilles'  , title_b : 'filles' ,active_b : 'nonactif',
                             link_c: '/vetementshommes'  , title_c : 'hommes' ,active_c : 'nonactif',
                             link_d: ''  , title_d : 'garçons', active_d : 'actif',
                          }} 
            />    
          <RowView 
          category = {{num : "1"}}
                    product_list_a ={{ title: 'hauts' , data: liste_haut , link : '/hautgarcons' , defaultImg:image_a}} 
                    product_list_b ={{ title: 'bas' , data: liste_bas, link : '/basgarcons', defaultImg:image_a}} 
                    product_list_c ={{ title: 'combis' , data: liste_combis, link : '/combisgarcons' , defaultImg:image_a}} 
                    product_list_d ={{ title: 'lingeries' , data: liste_lingerie, link : '/lingeriegarcons' , defaultImg:image_a}} 
                 />


          </main>
          <Footer />
        </div>
                     
    </>
  )
}

export default Vetements_garcons

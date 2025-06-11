import { useEffect, useState  } from 'react'

import { useLocation } from 'react-router-dom';
import axios from 'axios'

import Header_menu from '../../../Components/Header_menu'
import Footer from '../../../Components/Footer';
import RowView from '../../../Components/RowView';
import Genre_links from '../../../Components/Genre_links';
// style

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
 
 
import image_a from "/assets/img/fs/vetements_default.jpeg"

const Vetements_dames = () => {
  let current_location = useLocation();
  // const param = useLocation().search

  const link_url = current_location?.pathname.split('/');
  console.log(link_url)
  
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
                
            const rep1 = await axios.get(`${apiUrl}/produits/haut_dame`);
            const rep2 = await axios.get(`${apiUrl}/produits/bas_dame`);
            const rep3 = await axios.get(`${apiUrl}/produits/combis_dame`);
            const rep4 = await axios.get(`${apiUrl}/produits/lingerie_dame`);
          
           
            setlistHaut(rep1.data);
            setlistBas(rep2.data);
            setlistCombis(rep3.data);
            setlistLingeries(rep4.data);

        } catch (err) {
          console.log(err);
          // console.log('erreur here')
        }
      };
      fetchData();
    });
  
    
  return (
    <>
       {/* <Header_menu /> */}
       <Header_menu data_page = {{type: "produit" , back_option: "on"}}/>
      
       <div className="body-wrapper">
          <main id="MainContent" className="content-for-layout">
            <Genre_links 
               listdata ={{ 
                             link : '/vetements', category: 'vêtements' , 
                             link_a: ''  , title_a : 'dames' ,active_a : 'actif',
                             link_b: '/vetementsfilles'  , title_b : 'filles' ,active_b : 'nonactif',
                             link_c: '/vetementshommes'  , title_c : 'hommes' ,active_c : 'nonactif',
                             link_d: '/vetementsgarcons'  , title_d : 'garçons', active_d : 'nonactif',
                          }} 
            />
                 <RowView 
                  category = {{num : "1"}}
                    product_list_a ={{ title: 'hauts' , data: liste_haut , link : '/hautdames' , defaultImg:image_a}} 
                    product_list_b ={{ title: 'bas' , data: liste_bas, link : '/basdames', defaultImg:image_a}} 
                    product_list_c ={{ title: 'combis' , data: liste_combis, link : '/combisdames' , defaultImg:image_a}} 
                    product_list_d ={{ title: 'lingeries' , data: liste_lingerie, link : '/lingeriedames' , defaultImg:image_a}} 
                 />
          </main>
          <Footer />
        </div>
                     
    </>
  )
}

export default Vetements_dames

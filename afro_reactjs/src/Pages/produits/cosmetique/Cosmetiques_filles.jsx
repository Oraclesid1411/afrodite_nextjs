import  { useEffect, useState} from 'react'

import {  useLocation } from 'react-router-dom';
import axios from 'axios'

import RowView from '../../../Components/RowView';
import Header_menu from '../../../Components/Header_menu'
import Footer from '../../../Components/Footer';
import Genre_links from '../../../Components/Genre_links';
import image_a from "/assets/img/fs/cosmetique_def.jpeg"

const Cosmetiques_filles = () => {
  let current_location = useLocation(); 

  const link_url = current_location?.pathname.split('/');
  console.log(link_url)
  console.log('param')
  axios.defaults.withCredentials = true;

  const [liste_a , setlistA] = useState([]);
  const [liste_b , setlistB ] = useState([]);
  const [liste_c , setlistC ] = useState([]);
  const [liste_d , setlistD ] = useState([]);

  const [liste_e , setlistE ] = useState([]);
  const [liste_f , setlistF ] = useState([]);
  const [liste_g , setlistG ] = useState([]);
  const [liste_h , setlistH] = useState([]);

  const apiUrl = 'https://fsapi.fashionecos.com'

  useEffect(() => {
    
      const fetchData = async () => {
       
        try {
         
          console.log('request send')
                
            const rep1 = await axios.get(`${apiUrl}/produits/parfums_filles`);
            const rep2 = await axios.get(`${apiUrl}/produits/cremes_filles`);
            const rep3 = await axios.get(`${apiUrl}/produits/lotions_filles`);
            const rep4 = await axios.get(`${apiUrl}/produits/laits_filles`);

            const rep5 = await axios.get(`${apiUrl}/produits/getParfum_uniJeune`);
            const rep6 = await axios.get(`${apiUrl}/produits/getCreme_uniJeune`);
            const rep7 = await axios.get(`${apiUrl}/produits/getLotion_uniJeune`);
            const rep8 = await axios.get(`${apiUrl}/produits/getLait_uniJeune`);
          
            console.log(rep1)
           
            setlistA(rep1.data);
            setlistB(rep2.data);
            setlistC(rep3.data);
            setlistD(rep4.data);
            setlistE(rep5.data);
            setlistF(rep6.data);
            setlistG(rep7.data);
            setlistH(rep8.data);
          console.log('test here')

        } catch (err) {
          console.log(err);
          console.log('erreur here')
        }
      };
      fetchData();
    });
  
   

    var tab_1 = [] , tab_2 = [] , tab_3 = [] , tab_4 = [];
    if(liste_a.length > 0){
      for(let i=0; i<liste_a.length; i++){
        tab_1.push(liste_a[i])
      }
    }
    if(liste_e.length > 0){
      for(let i=0; i<liste_e.length; i++){
        tab_1.push(liste_e[i])
      }
    }

    if(liste_b.length > 0){
      for(let i=0; i<liste_b.length; i++){
        tab_2.push(liste_b[i])
      }
    }
    if(liste_f.length > 0){
      for(let i=0; i<liste_f.length; i++){
        tab_2.push(liste_f[i])
      }
    }

    if(liste_c.length > 0){
      for(let i=0; i<liste_c.length; i++){
        tab_3.push(liste_c[i])
      }
    }
    if(liste_g.length > 0){
      for(let i=0; i<liste_g.length; i++){
        tab_3.push(liste_g[i])
      }
    }

    if(liste_d.length > 0){
      for(let i=0; i<liste_d.length; i++){
        tab_4.push(liste_d[i])
      }
    }
    if(liste_h.length > 0){
      for(let i=0; i<liste_h.length; i++){
        tab_4.push(liste_h[i])
      }
    }

  return (
    <>
      <Header_menu data_page = {{type: "produit" , back_option: "on"}}/>
       <div className="body-wrapper">
          <main id="MainContent" className="content-for-layout">
          <Genre_links 
               listdata ={{ 
                             link : '/cosmetiques', category: 'cosmétiques' , 
                             link_a: '/cosmetiquesdames'  , title_a : 'dames' ,active_a : 'nonactif',
                             link_b: ''  , title_b : 'filles' ,active_b : 'actif',
                             link_c: '/cosmetiqueshommes'  , title_c : 'hommes' ,active_c : 'nonactif',
                             link_d: '/cosmetiquesgarcons'  , title_d : 'garçons', active_d : 'nonactif',
                          }} 
            />

                 <RowView 
                 category = {{num : "3"}}
                    product_list_a ={{ title: 'parfums' , data: tab_1 , link : '/parfumsfilles' , defaultImg:image_a}} 
                    product_list_b ={{ title: 'crèmes' , data: tab_2, link : '/cremesfilles', defaultImg:image_a}} 
                    product_list_c ={{ title: 'lotions' , data: tab_3, link : '/lotionsfilles' , defaultImg:image_a}} 
                    product_list_d ={{ title: 'lait de beauté' , data: tab_4, link : '/laitsfilles' , defaultImg:image_a}} 
                 />

          </main>
          <Footer />
        </div>
                     
    </>
  )
}

export default Cosmetiques_filles

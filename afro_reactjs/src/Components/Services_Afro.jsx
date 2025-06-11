import React from 'react'
import Header_banner from './Header_banner'
import Footer from './Footer'
import FixedMenu from './FixedMenu'
import Header_menu from './Header_menu'
import  { useEffect, useState  } from 'react'
import { motion } from "framer-motion";

import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthenticateContext.jsx";
// import CandidatureForm from '../Pages/Postuler/CandidatureForm.jsx'
// import { useLocation } from 'react-router-dom';
function Services_Afro() {

    const auth = useAuth(); 
    const user_info = auth.currentUser 
    // const navigate = useNavigate()
    console.log("user_info")
    console.log(user_info)
    const location = useLocation();
    // const location = useLocation(); 
    console.log("state")
    console.log(location.state)
    const { demande } = location.state || {}; 

    console.log("demande")  
     console.log(demande)
 
    const [isModalOpen_auth, setIsModalOpen_auth] = useState({ isOpen: false, category: "" });;
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [modalContent, setModalContent] = useState('');

    useEffect(() => {
      if (!user_info) {

        console.log(demande)
        if (demande === "devenir afrodite") {
          setIsModalOpen_auth({ isOpen: true, category: "choix" });
        }

        // setIsModalOpen_auth(true);
      }
    }, [user_info ,demande]);
     // Fonction pour ouvrir un modal
      // const openModal = (content) => {
      //   setModalContent(content);
      //   setIsModalOpen(true);
      //   // Ajouter un hash dans l'URL
      //   window.history.pushState(null, '', `#${content}`);
      // };
    
      // Fonction pour fermer le modal
      const closeModal = () => {
        setIsModalOpen(false);
        setModalContent('');
        // Supprimer le hash dans l'URL
        window.history.pushState(null, '', location.pathname);
      };
    
      // Surveillance du changement d'URL (pour détecter le bouton retour du navigateur)
      useEffect(() => {
        const handlePopState = () => {
          if (isModalOpen) {
            closeModal();
          }
        };
        
        window.addEventListener('popstate', handlePopState);
    
        return () => {
          window.removeEventListener('popstate', handlePopState);
        };
      }, [isModalOpen, location]);
    
     
  return (
    <>
    <Header_menu data ={{ link : 'services afrodites' }}/>
  <div className='serviceafro'>
      {isModalOpen_auth && (
          <div className="modal-overlay" onClick={closeModal}>
          <motion.div
            className="modal-content_b"
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100vh", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn modal_content_close" onClick={closeModal}>&times;</button>
            
            {isModalOpen_auth.category === "choix" ? (

              <div className="modal-options text-center">
                <h2 className="text-lg font-semibold mb-4">Devenez Afrodites</h2>
                <div className="button_container fk_btn">
                  <Link 
                  className="link_cst"
                  to={"/postuler/1"}
                  state={{ demande: "devenir afrodite" }}
                  
                  >
                    Devenir Mannequin
                </Link>
                </div>
                <div className="button_container fk_btn">
                  <Link className="link_cst"
                    to={"/postuler/2"}
                    state={{ demande: "devenir afrodite" }}
                    >Devenir Hôtesse</Link>
                </div>

                <div className="button_container fk_btn" >
                  <Link className="link_cst"
                    to={"/postuler/3"}
                    state={{ demande: "devenir afrodite" }}
                    >Influenceur</Link>
               </div>

               <h2 className="text-lg font-semibold mb-4">se former à Afrodite</h2>
            
               <div className="button_container fk_btn" >
                  <label className="devenir_mannequin">apprendre à marcher</label>
                </div>
                <div className="button_container fk_btn" >
                  <label className="devenir_hotesse">apprendre à poser</label>
                </div>

                <div className="button_container fk_btn">
                  <label className="devenir_influenceur">faire un book</label>
               </div>
              </div>

            ) : (
              // <CandidatureForm selectedCategory={isModalOpen_auth.category} />
              null
            )}
          </motion.div>
        </div>
      )}
    <div className="container services_listing bg-white">
      <div className="data_box">
        page de gestion de candidature et cie

      </div>

    
         
    </div>

  </div>
    
   
    <FixedMenu />

    </>
  )
}

export default Services_Afro
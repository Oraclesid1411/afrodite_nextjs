import React from 'react'
import Header_banner from './Header_banner'
import Footer from './Footer'

import FixedMenu from './FixedMenu'
import Header_menu from './Header_menu'
import  { useEffect, useState  } from 'react'
import { motion } from "framer-motion";


import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthenticateContext.jsx";
import CandidatureForm from '../Pages/Postuler/CandidatureForm.jsx'
// import { useLocation } from 'react-router-dom';
function Services_Afro() {

    const auth = useAuth(); 
    const user_info = auth.currentUser 
    const navigate = useNavigate()
    console.log("user_info")
    console.log(user_info)
    const location = useLocation();
    // const location = useLocation(); 
    const { demande } = location.state || {}; 
 
    const [isModalOpen_auth, setIsModalOpen_auth] = useState({ isOpen: false, category: "" });;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
      if (!user_info) {

        console.log(demande)
        if (demande === "intégrer afrodite") {
          setIsModalOpen_auth({ isOpen: true, category: "choix" });
        }

        // setIsModalOpen_auth(true);
      }
    }, [user_info ,demande]);
     // Fonction pour ouvrir un modal
      const openModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
        // Ajouter un hash dans l'URL
        window.history.pushState(null, '', `#${content}`);
      };
    
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
                <h2 className="text-lg font-semibold mb-4">Intégrer Afrodites</h2>
                <div className="button_container fk_btn" onClick={() => openModal("mannequin")}>
                  <label className="devenir_mannequin">Devenir Mannequin</label>
                </div>
                <div className="button_container fk_btn" onClick={() => openModal("hotesse")}>
                  <label className="devenir_hotesse">Devenir Hôtesse</label>
                </div>

                <div className="button_container fk_btn" onClick={() => openModal("influenceur")}>
                  <label className="devenir_influenceur">Influenceur</label>
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
              <CandidatureForm selectedCategory={isModalOpen_auth.category} />
            )}
          </motion.div>
        </div>
      )}
    <div className="container services_listing bg-white">
      <div className="data_box">
        <ul className="service-links">
          <li>
            <a href="/join/1">Devenir mannequin</a>
            
            {/* <a href="/postuler/1">Devenir mannequin</a> */}
            </li>
          <li>
            <a href="/join/2">Devenir hotesse d&apos;accueil</a>
            {/* <a href="/postuler/2">Devenir hotesse d&apos;accueil</a> */}
            
            </li>
          <li>
            <a href="/join/3">Devenir influenceur</a>
            {/* <a href="/postuler/3">Devenir influenceur</a> */}
            
            </li>
          <li><a  onClick={() => openModal('coming_soon_a')}>Se former à poser</a></li>
          <li><a  onClick={() => openModal('coming_soon_b')}>Se former à marcher</a></li>
          <li><a  onClick={() => openModal('coming_soon_c')}>Faire un book</a></li>
        
        
        </ul>


      </div>

        {/* Modals */}
     {isModalOpen && (
        <div className="modal_customs">
          <div className="modal_customs-content">
            <button className="close_cstom-btn" onClick={closeModal}>
              ×
            </button>
            <h2>
              {/* {modalContent.replace(/-/g, ' ').toUpperCase()} */}
              {modalContent === 'coming_soon_a' && (
                <>
                
                <li>Se former à poser</li>
                </>
              )}
               {modalContent === 'coming_soon_b' && (
                <>
                
                <li>Se former à marcher </li>
                </>
              )}
               {modalContent === 'coming_soon_c' && (
                <>
                
                <li>Faire un book</li>
                </>
              )}
              
              </h2>
            <ul>
              {modalContent === 'coming_soon_a' && (
                <>
                
                <li>bientôt disponible</li>
                </>
              )}
             
              
              {modalContent === 'coming_soon_b' && (
                <>
                  <li>bientôt disponible</li>
                </>
              )}
                {modalContent === 'coming_soon_c' && (
                <>
                  <li>bientôt disponible</li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}

      
         
    </div>

  </div>
    
   
    <FixedMenu />

    </>
  )
}

export default Services_Afro
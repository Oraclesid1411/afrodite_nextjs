import React from 'react'
import Header_banner from './Header_banner'
import Footer from './Footer'
import FixedMenu from './FixedMenu'
import Header_menu from './Header_menu'
import  { useEffect, useState  } from 'react'

import { useLocation } from 'react-router-dom';
function Services_Afro() {

  
  const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

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
    <div className="container services_listing bg-white">
      <div className="data_box">
        <ul className="service-links">
          <li><a href="/postuler/1">Devenir mannequin</a></li>
          <li><a href="/postuler/2">Devenir hotesse d&apos;accueil</a></li>
          <li><a href="/postuler/3">Devenir influenceur</a></li>
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
   
    <FixedMenu />

    </>
  )
}

export default Services_Afro
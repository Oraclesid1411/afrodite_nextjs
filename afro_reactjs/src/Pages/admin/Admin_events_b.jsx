import React ,  { useState , useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import Calendar_view from '../Calendar_view'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faList } from '@fortawesome/free-solid-svg-icons';


function Admin_events() {


  
      // get all events*
  const [events , setEvents] = useState([]);
  const apiUrl = 'https://apiafro.aafrodites.com'
  // const apiUrl = 'http://localhost:5000'

  const navigate = useNavigate();



  useEffect(() => {
      const fetchData = async () => {
       
        try {
         
             const rep1 = await axios.get(`${apiUrl}/events/all`);
         
             const formattedEvents = rep1.data.map(event => ({
              ...event,
              date: new Date(event.date).toISOString().split('T')[0],
            }));
    
            setEvents(formattedEvents);
         
        } catch (err) {
          console.log(err);
        
        }
      };
      fetchData();
    } , []);

    // console.log("events")
    // console.log(events)

      const [isModalOpen, setIsModalOpen] = useState(false);
     const toggleModal = () => setIsModalOpen(!isModalOpen);
  // const [isModalOpen, setIsModalOpen] = useState(true);
    
      const [TypeView, setTypeView] = useState("calendar");
    
      const handleView = (event) => {
        setTypeView(event.currentTarget.dataset.mode);
      };

  return (
    <>
     <div className="admin_datacontent">
        {
          // affichage type calendrier
          TypeView === "calendar" ? (
            <div className="calendar_view">
              <Calendar_view data={{list : events}}/>
            </div>
          ) : (
            // affichage type timeline
            // <Timeline_view />
            <></>
          )
        }

        <div className="mode_affichage_container">
        <div className="add_event">
            <button className='add_event_btn' 
            // onClick={console.log('add new event')}
            onClick={toggleModal}
            >+ ajouter</button>
          </div>
          <div className="btn_box">
         
            {TypeView === "calendar" ? (
              <>
                 <button className="view_btn calendar active">
                    <FontAwesomeIcon icon={faCalendar} size='xl'/>
                </button>
                <button className="view_btn timeline" data-mode="timelines" onClick={handleView}>
                  <FontAwesomeIcon icon={faList} size='xl'/>
                </button>
              </>
            ) : (
              <>
           
                <button className="view_btn calendar" data-mode="calendar" onClick={handleView}>
                  <FontAwesomeIcon icon={faCalendar} size='xl'/>
                </button>
                <button className="view_btn active timeline">
                  <FontAwesomeIcon icon={faList} size='xl'/>
                </button>
              </>
            )}
          </div>
        </div>

        <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-overlay"
            onClick={toggleModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <label className='title'>Créer un événement</label>
              <form>
                {/* <label>Nom de l'événement</label> */}
                <div className="line_data">
                <div className="half_col">
              

              <input className="input_value" type="text"
              placeholder="nom / titre de l'évenement"
              // value={formData.postulant.nom}
 
              // onChange={(e) => handleInputChange("postulant", "nom", e.target.value)}
            />
            
              
          
               </div>
          
             <div className="half_col">
             
                <input
            className="input_value"
              type="text"
                placeholder="Type d’événement "
              // value={formData.postulant.prenom}
              // onChange={(e) => handleInputChange("postulant", "prenom", e.target.value)}
            />
             
           
           
        
             </div>
          
            <div className="half_col">
              

              <input className="input_value" type="text"
              placeholder="Date "
              // value={formData.postulant.nom}
 
              // onChange={(e) => handleInputChange("postulant", "nom", e.target.value)}
            />
            
              
          
               </div>
          
             <div className="half_col">
             
                <input
            className="input_value"
              type="text"
                placeholder="heure"
              // value={formData.postulant.prenom}
              // onChange={(e) => handleInputChange("postulant", "prenom", e.target.value)}
            />
             
           
           
        
             </div>

             <div className="half_col">
              

              <input className="input_value" type="text"
              placeholder="Description"
              // value={formData.postulant.nom}
 
              // onChange={(e) => handleInputChange("postulant", "nom", e.target.value)}
            />
            
              
          
               </div>
          
             <div className="half_col">
             
                <input
            className="input_value"
              type="text"
                placeholder="nombre participants"
              // value={formData.postulant.prenom}
              // onChange={(e) => handleInputChange("postulant", "prenom", e.target.value)}
            />
             
           
           
        
             </div>
            </div>

            <div className="line_data">
              <label className='title full_zone'>adresse / lieu</label>
           
              <div className="half_col">
             
             <input
         className="input_value"
           type="text"
             placeholder="lieu"
           // value={formData.postulant.prenom}
           // onChange={(e) => handleInputChange("postulant", "prenom", e.target.value)}
         />
          
        
        
     
            </div>
            <div className="half_col">
              

              <input className="input_value" type="text"
              placeholder="pays"
              // value={formData.postulant.nom}
 
              // onChange={(e) => handleInputChange("postulant", "nom", e.target.value)}
            />
            
              
          
               </div>
          
             <div className="half_col">
             
                <input
            className="input_value"
              type="text"
                placeholder="ville "
              // value={formData.postulant.prenom}
              // onChange={(e) => handleInputChange("postulant", "prenom", e.target.value)}
            />
             
           
           
        
             </div>
             <div className="half_col">
             
             <input
         className="input_value"
           type="text"
             placeholder="quartier"
           // value={formData.postulant.prenom}
           // onChange={(e) => handleInputChange("postulant", "prenom", e.target.value)}
         />
          
        
        
     
          </div>
          <div className="half_col">
             
             <input
         className="input_value"
           type="text"
             placeholder="indications"
           // value={formData.postulant.prenom}
           // onChange={(e) => handleInputChange("postulant", "prenom", e.target.value)}
         />
          
         
        
     
          </div>
          <div className="half_col">
             
             <input
         className="input_value"
           type="text"
             placeholder="GPS"
           // value={formData.postulant.prenom}
           // onChange={(e) => handleInputChange("postulant", "prenom", e.target.value)}
         />
          
        
        
     
          </div>
            </div>

            
            <div className="line_data">
           
             <div className="full_zone">
             <label className='mr-3'>modele concerné:</label> mannequin / hotesse/ vlogueuse
        
             </div>
            </div>
              

                {/* <label>Description</label>
                <textarea placeholder="Ajoutez une description"></textarea> */}

                <div className="modal-actions flex-center">
                  <button type="submit" className="btn-save">Enregistrer</button>
                  {/* <button type="button" className="btn-close" onClick={toggleModal}>
                    Fermer
                  </button> */}
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

     
    </>
  )
}

export default Admin_events
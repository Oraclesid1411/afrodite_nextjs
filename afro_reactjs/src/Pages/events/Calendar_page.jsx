import React, { useState, useEffect ,useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import ZoomView from '../ZoomView';

import Header_menu from "../../Components/Header_menu";
// import {  useNavigate } from 'react-router-dom';
// import Loader from '../Components/Loader';
import axios from 'axios' 

// import Footer from "../Components/Footer";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaEdit, FaEye,FaFilter, FaTrash } from "react-icons/fa";
// import ReactPaginate from "react-paginate";
// import imageCompression from 'browser-image-compression';
// import { motion } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faList , faSearch ,faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import FixedMenu from '../../Components/FixedMenu';
import Calendar_view from '../Calendar_view';

function Calendar_page(){
  // get all events
   const [loading, setLoading] = useState(true); // Loader state
   
  const [events , setEvents] = useState([]);
  const apiUrl = 'https://apiafro.aafrodites.com'
  
  useEffect(() => {
    const fetchData = async () => {
     
      try {
        setLoading(true); // Active le loader
       
            const rep1 = await axios.get(`${apiUrl}/events/all`);
                 // console.log(rep1)
             const grouped_event = rep1?.data.reduce((acc, row) => {
                // Vérifie si le mannequin existe déjà dans l'accumulateur

            const convdb = new Date(row?.date_debut).toISOString().split('T')[0];         
            const convdf = new Date(row?.date_fin).toISOString().split('T')[0];
            
              let listevent = acc.find(item => (item.id_event === row.id_event) 
                                                   &&
                                              (item.type_model === row.id_typemodel)
                                    );
            
            if (!listevent) {
            
              // Si non, crée une nouvelle entrée pour ce mannequin
                listevent = {
                id_event: row.id_event,
                nom_event: row.nom_event,
                detail: row.details,
                type_model: row.id_typemodel, 
                date_debut : convdb,
                date_ffin : convdf,
                pays : row.pays,
                ville : row.ville,
                quartier : row.quartier,
                indication_lieu : row.indication_lieu,
                statut : row.statut,
                id_typeevent : row.id_typeevent,
                nom_organiser : row.nom_organiser,
                heure_debut : row?.heure_debut,
                heure_fin : row?.heure_fin,
                tab_dates: {},
                paths: {} };
                
              acc.push(listevent);
            }
            
             
            // Ajoute le path_image correspondant au type_resolution
            switch (row.type_resolution) {
               
              case 3:
                listevent.paths.path_hrd = row.path_image;
                break;
              case 4:
                listevent.paths.path_hrm = row.path_image;
                break;
              case 5:
                listevent.paths.path_md = row.path_image;
                break;
              case 6:
                listevent.paths.path_mm = row.path_image;
                break;
              default:
                // Si un type inconnu est trouvé, le traiter ou ignorer
                // console.warn(`Type de résolution inconnu : ${row.type_resolution}`);
                break;
            }
            const eventDay = new Date(row.event_date).toISOString().split('T')[0];

            // console.log("eventDay")
            // console.log(eventDay)
            listevent.tab_dates[eventDay] = {
              heure_debut: row.debut || row.heure_debut,
              heure_fin: row.fin || row.heure_fin
            };
           
             return acc;
          }, []);

      
          setEvents(grouped_event);
       
      } catch (err) {
        console.log(err);
      
      }finally {
        setLoading(false); // Désactive le loader
      }
    };
    fetchData();
  } , []);
   // Afficher un loader si la page est en cours de chargement
  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Chargement en cours...</p>
      </div>
    );
  }
 
  return (
    <>
    <Header_menu data={{ link: 'events' }} />
      <div className="main_container event_ihm">
     <Calendar_view 
           events_tab = {events} 
          links = {{a : "#" , b: "#"}} />
      </div>

   
<FixedMenu/>
    </>
  );
}

export default Calendar_page;

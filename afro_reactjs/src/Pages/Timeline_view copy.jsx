// import React from 'react'
import React, { useState, useEffect ,useRef } from 'react';

import axios from 'axios';
import { FaChevronUp, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import default_img from '/assets/img/event/event_2.jpeg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faList, faSearch,faChevronDown,faChevronRight,faClock,faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
// import { FaChevronDown, FaChevronRight, FaClock, FaCalendarAlt } from "react-icons/fa";


function Timeline_view({ data, setTypeView_N }) {

   const apiUrl = 'https://apiafro.aafrodites.com'
  // const apiUrl = 'http://localhost:5000'

  const events = data?.list;
 
  console.log(events)
  const navigate = useNavigate();

  // 🔹 Grouper les événements par `id_event`
  const groupedEvents = events.reduce((acc, event) => {
    const existingEvent = acc.find((e) => e.id_event === event.id_event);
    if (existingEvent) {
      // Ajouter les types de modèles au même événement
      if (!existingEvent.type_models.includes(event.type_model)) {
        existingEvent.type_models.push(event.type_model);
      }
    } else {
      acc.push({
        id_event: event.id_event,
        nom_event: event.nom_event,
        date_debut: event.date_debut,
        date_ffin: event.date_ffin,
        type_models: [event.type_model],
      });
    }
    return acc;
  }, []);

  // 🔹 Fonction pour formater la date
  const formatDate = (startDate, endDate) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const start = new Date(startDate).toLocaleDateString("fr-FR", options);
    const end = new Date(endDate).toLocaleDateString("fr-FR", options);

    if (start === end) return start; // Si la date de début et de fin sont les mêmes
    return `${start.split(" ")[0]}-${end.split(" ")[0]} ${end.split(" ")[1]} ${end.split(" ")[2]}`;
  };

  const [selectedCategories, setSelectedCategories] = useState([1, 2, 3]); // Par défaut, tout est sélectionné


const categoriesList = [
  { id: 1, label: "Mannequin" },
  { id: 2, label: "Vlogueuse" },
  { id: 3, label: "Hôtesse" }
];

const [filteredEvents, setFilteredEvents] = useState(events);
 
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);


  const toggleCategory = (categoryId) => {
    if (categoryId === "Tout") {
        if (selectedCategories.length === categoriesList.length) {
            setSelectedCategories([]); // Désélectionner tout
        } else {
            setSelectedCategories(categoriesList.map(cat => cat.id)); // Sélectionner tout
        }
    } else {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId) // Supprime si déjà sélectionné
                : [...prev, categoryId] // Ajoute sinon
        );
    }
};

  // Fermer le menu si on clique en dehors
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    console.log(events)

    const [activeEvent, setActiveEvent] = useState(null);

  const handleToggle = (id) => {
    setActiveEvent(activeEvent === id ? null : id); // Toggle pour ouvrir ou fermer les détails
  };

  // Trier les événements du plus récent au plus ancien
  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <>
      <div className="timeline-container">
          <div className="calendar-header">
                   <div className="mode_affichage_container">
                   <button onClick={() => setTypeView_N("calendar")}
                    className="view_btn calendar">
                        <FontAwesomeIcon icon={faCalendar}/>
                 </button>
        
                           <button className="view_btn timeline active" data-mode="timelines">
                                    <FontAwesomeIcon icon={faList} />
                          </button>
        
                    </div>
         
       
        
                   <div className="event_categories_filter">
                         <button className="search_btn" onClick={() => setIsOpen_search(!isOpen_search)}>
                              rechercher <FontAwesomeIcon icon={faSearch}/>
                          </button>

                       
        <div className="dropdown " ref={dropdownRef}>
    <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        {selectedCategories.length === categoriesList.length ? "Tout" : categoriesList.filter(cat => selectedCategories.includes(cat.id)).map(cat => cat.label).join(", ")}
    </button>

    {isOpen && (
                           <div className="dropdown-menu">
            <label>
                <input type="checkbox"
                    checked={selectedCategories.length === categoriesList.length}
                    onChange={() => toggleCategory("Tout")}
                />
                Tout
            </label>
            {categoriesList.map((category) => (
                <label key={category.id}>
                    <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => toggleCategory(category.id)}
                    />
                    {category.label}
                </label>
            ))}
        </div>
        
    )}
</div>
                  </div>

         
        </div>
                         
     

        <ul className="timeline">
      {groupedEvents.map((event) => (
        <li key={event.id_event} className="timeline-event">
          <div className="timeline-dot"></div>

          <div className="timeline-title" onClick={() => setActiveEvent(activeEvent === event.id_event ? null : event.id_event)}>
            <div className="calendar_zone">
              <span className="block_box date">
              <FontAwesomeIcon icon={faCalendarAlt} />
                {formatDate(event.date_debut, event.date_ffin)}
              </span>
              <span className="block_box horaire">
              <FontAwesomeIcon icon={faClock} /> 
             15h à 18h
              </span>
            </div>

            <div className="event_zone">
              <label className="title_lbl">{event.nom_event}</label>
              <label className="description_event">
                Types de modèles: {event.type_models.join(", ")}
              </label>
            </div>

            <div className="btn_zone">
              {activeEvent === event.id_event ?    <FontAwesomeIcon icon={faChevronDown} />  : <FontAwesomeIcon icon={faChevronRight} /> }
            </div>
          </div>

          {/* Détails de l'événement */}
          <div className={`timeline-details ${activeEvent === event.id_event ? "show" : ""}`}>
            <div className="event_card">
              <div className="event_img">
                <img className="img-fluid" src="default_img.jpg" alt="event" />
              </div>
              <div className="event_detail">
                Informations supplémentaires sur {event.nom_event}
              </div>
            </div>

            <button className="eventDetail_btn" onClick={() => navigate(`/event/${event.id_event}`)}>Voir +</button>
          </div>
        </li>
      ))}
    </ul>
    </div>
        
    </>
  )
}

export default Timeline_view
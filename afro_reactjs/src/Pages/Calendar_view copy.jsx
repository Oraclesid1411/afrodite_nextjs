import React, { useState, useEffect ,useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import ZoomView from './ZoomView';

// import {  useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import axios from 'axios' 

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaEye,FaFilter, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import imageCompression from 'browser-image-compression';

// const events = [
//   { id: 1, title: "Castin²g pour des modèles", date: "2024-10-24", description: "mini détail", details: "détails supplémentaires" },
//   { id: 2, title: "Photoshooting à Djdjolé", date: "2024-10-26", description: "mini détail", details: "détails supplémentaires" },
//   { id: 3, title: "Défilé à Zossimé", date: "2024-10-31", description: "mini détail", details: "détails supplémentaires" },
//   { id: 4, title: "Défilé au Factory", date: "2024-11-01", description: "mini détail", details: "détails supplémentaires" },
//   { id: 5, title: "Photoshooting à Agora", date: "2024-11-07", description: "mini détail", details: "détails supplémentaires" },
//   { id: 6, title: "Test avec Joseph", date: "2024-12-09", description: "mini détail", details: "détails supplémentaires" }
// ];

function Calendar_view(props) {

  const events = props?.data?.list;
  console.log("data?.list")
  console.log(props?.data?.list)
  const navigate = useNavigate()

  
  // const [events , setEvents] = useState([]);
  const apiUrl = 'https://apiafro.aafrodites.com'

  const [selectedCategories, setSelectedCategories] = useState([1, 2, 3]); // Par défaut, tout est sélectionné
  const [calendarDays, setCalendarDays] = useState([]);

const categoriesList = [
  { id: 1, label: "Mannequin" },
  { id: 2, label: "Vlogueuse" },
  { id: 3, label: "Hôtesse" }
];

const [filteredEvents, setFilteredEvents] = useState(events);

// const filteredEvents = events.filter(event => selectedCategories.includes(event.id_typemodel));
  // const categoriesList = ["Mannequin", "Hôtesse d'accueil", "Vlogueuse"];

  // const [selectedCategories, setSelectedCategories] = useState([...categoriesList]);

  console.log("filteredEvents")
  console.log(filteredEvents)
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // const toggleCategory = (category) => {
  //   if (category === "Tout") {
  //     if (selectedCategories.length === categoriesList.length) {
  //       setSelectedCategories([]); // Tout est décoché
  //     } else {
  //       setSelectedCategories([...categoriesList]); // Tout est coché
  //     }
  //   } else {
  //     setSelectedCategories((prev) =>
  //       prev.includes(category)
  //         ? prev.filter((c) => c !== category) // Retirer la catégorie
  //         : [...prev, category] // Ajouter la catégorie
  //     );
  //   }
  // };

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

  const [selectedDay, setSelectedDay] = useState(null);

 
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentEventIndex, setCurrentEventIndex] = useState(null);
  const [noEventMessage, setNoEventMessage] = useState(""); // État pour le message "Aucun événement"


  
  useEffect(() => {
    setFilteredEvents(events.filter(event => selectedCategories.includes(event.id_typemodel)));
}, [selectedCategories, events]); 

useEffect(() => {
  setCalendarDays(generateCalendar());
}, [filteredEvents, currentMonth, currentYear]); 

// Créer un objet qui stocke le nombre d'événements pour chaque date
const eventCountByDate = filteredEvents.reduce((acc, event) => {
  acc[event.date] = (acc[event.date] || 0) + 1;
  // console.log(acc)
  // console.log(event.date)
  return acc;
}, {});

  const [index_date, setIndex_date] = useState(""); // État pour le message "Aucun événement"
 useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
    setSelectedDay(today);
  
    const index = events.findIndex(event => event.date === today);
    if (index !== -1) {
      setCurrentEventIndex(index); // Sélectionne l'événement du jour
      setNoEventMessage(""); // Efface le message "Aucun événement"
    } else {
      setCurrentEventIndex(null);
      setNoEventMessage("Aucun événement trouvé en ce jour.");
    }
  }, []);
  

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      // Si le mois est décembre, passer à janvier (0) et incrémenter l'année
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      // Sinon, passer simplement au mois suivant
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      // Si le mois est janvier, passer à décembre (11) et décrémenter l'année
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      // Sinon, passer simplement au mois précédent
      setCurrentMonth(currentMonth - 1);
    }
  };

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();


  const generateCalendar = () => {
    const totalDays = daysInMonth(currentMonth, currentYear);
    const firstDay = firstDayOfMonth(currentMonth, currentYear);
    let days = [];

    for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
        const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const eventCount = eventCountByDate[dateStr] || 0;
      
        const hasEvent = filteredEvents.some(event => event.date === dateStr) ? 'has-event' : '';
        const isSelected = selectedDay === dateStr ? 'selected' : '';

        days.push(
            <div key={day} className={`calendar-day ${hasEvent} ${isSelected}`}>
             
                <Link 
                    to="#"
                    className='calendar_value' 
                    onClick={() => handleEventClick(dateStr)}
                >
                    {day}
                </Link>

                {eventCount > 0 && <span className="badge_cstom">{eventCount}</span>}
                  {/* Ajout du badge si la journée a des événements */}
           
            </div>
        );
    }

    return days;
};

  // const generateCalendar = () => {

  
         
  //   console.log("nes events")
  //   console.log(filteredEvents)
  //   const totalDays = daysInMonth(currentMonth, currentYear);
  //   const firstDay = firstDayOfMonth(currentMonth, currentYear);
  //   let days = [];

  //   for (let i = 0; i < firstDay; i++) {
  //     days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  //   }

  //   for (let day = 1; day <= totalDays; day++) {
  //     const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  //     const hasEvent = filteredEvents.some(event => event.date === dateStr) ? 'has-event' : '';
  //     const isSelected = selectedDay === dateStr ? 'selected' : ''; // Classe sélectionnée

  //     days.push(
  //       <div key={day} className={`calendar-day ${hasEvent} ${isSelected}`}>
  //         <Link 
  //           to="#"
  //           className='calendar_value' 
  //           onClick={() => handleEventClick(dateStr)}
  //         >
  //           {day}
  //         </Link>
  //       </div>
  //     );
  //   }

  //   return days;
  // };
 
  const handleEventClick = (dateStr) => {
    console.log("dateStr")
    console.log(dateStr)
    setSelectedDay(dateStr)
    const index = events.findIndex(event => event.date === dateStr);

    if (index === currentEventIndex) {
      setCurrentEventIndex(null); // Ferme les détails si déjà sélectionné
      setNoEventMessage(""); // Réinitialise le message
    } else if (index === -1) {
      if (noEventMessage) {
        setNoEventMessage(""); // Masque le message si déjà affiché
      } else {
        setNoEventMessage("Aucun événement trouvé pour cette date."); // Affiche le message
        setCurrentEventIndex(null); // Efface l'événement actuel
      }
    } else {
      setCurrentEventIndex(index); // Affiche les détails de l'événement
      setNoEventMessage(""); // Efface le message
    }

     // Met à jour l'état du jour sélectionné
  setSelectedDay(dateStr);
  };

  const goToPreviousEvent = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : events.length - 1));
  };

  const goToNextEvent = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex < events.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <>
      <div className="calendar-container">
        <div className="calendar-header">
          <div className="add_event">
            <button className='add_event_btn' onClick={console.log('add new event')}>+ ajouter</button>
          </div>
          <button onClick={handlePreviousMonth} className='calendar_btn'>&lt;</button>
          
          <ZoomView 
            currentMonth={currentMonth} 
            currentYear={currentYear} 
            onMonthChange={setCurrentMonth} 
            onYearChange={setCurrentYear} 
          />
          
          <button onClick={handleNextMonth} className='calendar_btn'>&gt;</button>

          <div className="dropdown" ref={dropdownRef}>
    <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        {selectedCategories.length === categoriesList.length ? "Toutes les catégories" : categoriesList.filter(cat => selectedCategories.includes(cat.id)).map(cat => cat.label).join(", ")}
    </button>

    {isOpen && (
        <div className="dropdown-menu">
            <label>
                <input
                    type="checkbox"
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
        <div className="calendar-grid">
        <div className="calendar-weekday">Dim</div>
          <div className="calendar-weekday">Lun</div>
          <div className="calendar-weekday">Mar</div>
          <div className="calendar-weekday">Mer</div>
          <div className="calendar-weekday">Jeu</div>
          <div className="calendar-weekday">Ven</div>
          <div className="calendar-weekday">Sam</div>
         
          {/* {generateCalendar()} */}

          {calendarDays}
        </div>

        {/* Détails de l'événement */}
        {currentEventIndex !== null ? (
          <div className="event_details">

             <label className='event_date'>events du {events[currentEventIndex].date}</label>

            <div className="action_box">
            <button className=' calendar_btn' onClick={goToPreviousEvent} disabled={currentEventIndex === 0}>&lt;</button>
            <button className='eventDetail' onClick={()=>{
                    navigate(`/event/${events[currentEventIndex].id_event}`);
            }}>Tout voir</button>
            <button className=' calendar_btn' onClick={goToNextEvent} disabled={currentEventIndex === events.length - 1}>&gt;</button>
        
            </div>
          
            <div className="event_mini_cards">
    {filteredEvents.filter(event => 
      event.date === events[currentEventIndex].date) // Filtre les événements de la même date
      .map((event, index) => (
         <div key={index} className="mini_card col-12">
              <label className='title'>{event.title}
                <span className='type_model mx-3'>
                  {event?.id_typemodel === 1 ?

                  (
                    <>
                    pour mannequin</>
                  )

                  :
                  event?.id_typemodel === 2 ?
                  (
                    <>
                    vlogueuse</>

                  )
                  :
                   event?.id_typemodel === 3 &&
                  (
                    <>
                    h$otesse d'accueil
                    </>

                  )
                  

                  }
                </span>

              <label className='right'>{"lieu: CCF "} {" heure: 15h"}</label>
              </label>
              
              <p className='event_content'>{event.description}

              <button className='event_action' onClick={() => handleEventAction(event.id_event)}>voir +</button> {/* Action personnalisée */}
     
              </p>
               {/* Utilise une courte description */}
            {/* <div className="btn_zone">
             
            </div> */}
             </div>
      ))}
  </div>
           
             </div>
        ) : (

          <div className="event_details">
          <label className='event_date'>events du {selectedDay}</label>
         
          <div className="event_mini_cards">
          {noEventMessage && <div className="event-details"><p>{noEventMessage}</p></div>}
         </div>
         
          </div>
          
        )}
      </div>
    </>
  );
}

export default Calendar_view;

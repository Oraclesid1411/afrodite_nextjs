// import React from 'react';
// import Modal from 'react-modal';
// import { useNavigate, useParams } from 'react-router-dom';

// const events = {
//   "2024-10-24": {
//     title: "Casting",
//     description: "Casting pour les nouveaux talents. Présentez-vous avec votre portfolio.",
//   },
//   "2024-10-26": {
//     title: "Photoshoot",
//     description: "Session de photoshoot à 9h pour la nouvelle collection.",
//   },
//   "2024-10-31": {
//     title: "Entrainement de marche",
//     description: "Entrainement de marche à 14h pour améliorer la posture et l'équilibre.",
//   },
//   "2024-11-01": {
//     title: "Test de défilé",
//     description: "Test de défilé pour les mannequins débutants à 8h.",
//   },
//   "2024-11-07": {
//     title: "Photoshoot",
//     description: "Session de photoshoot à 16h avec la nouvelle équipe de photographes.",
//   },
//   "2024-12-09": {
//     title: "Tests avec Joseph",
//     description: "Session de tests avec le photographe Joseph pour les nouveaux participants.",
//   },
// };

// function EventModal() {
//   const { date } = useParams();
//   const navigate = useNavigate();

//   const event = events[date] || { title: "Aucun événement", description: "Il n'y a pas d'événement pour cette date." };
  
//   const closeModal = () => {
//     navigate(-1);
//   };

//   return (
//     <Modal
//       isOpen={true}
//       onRequestClose={closeModal}
//       contentLabel="Détails de l'événement"
//       overlayClassName="custom-overlay"
//       className="custom-modal"
//       ariaHideApp={false}
//     >
//       <h2>Événement du {date}</h2>
//       <h3>{event.title}</h3>
//       <p>{event.description}</p>
//       <button onClick={closeModal}>Retour</button>
//     </Modal>
//   );
// }

// export default EventModal;



import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate, useParams } from 'react-router-dom';

const events = {
  "2024-10-24": {
    title: "Casting",
    description: "Casting pour les nouveaux talents. Présentez-vous avec votre portfolio.",
  },
  "2024-10-26": {
    title: "Photoshoot",
    description: "Session de photoshoot à 9h pour la nouvelle collection.",
  },
  "2024-10-31": {
    title: "Entrainement de marche",
    description: "Entrainement de marche à 14h pour améliorer la posture et l'équilibre.",
  },
  "2024-11-01": {
    title: "Test de défilé",
    description: "Test de défilé pour les mannequins débutants à 8h.",
  },
  "2024-11-07": {
    title: "Photoshoot",
    description: "Session de photoshoot à 16h avec la nouvelle équipe de photographes.",
  },
  "2024-12-09": {
    title: "Tests avec Joseph",
    description: "Session de tests avec le photographe Joseph pour les nouveaux participants.",
  },
};

function EventModal() {
  const { date } = useParams();
  const navigate = useNavigate();

  const event = events[date] || { title: "Aucun événement", description: "Il n'y a pas d'événement pour cette date." };

  // Créer un tableau trié des dates d'événements
  const eventDates = Object.keys(events).sort();
  const currentIndex = eventDates.indexOf(date);

  // Déterminer la date précédente et suivante
  const prevDate = currentIndex > 0 ? eventDates[currentIndex - 1] : null;
  const nextDate = currentIndex < eventDates.length - 1 ? eventDates[currentIndex + 1] : null;

  const closeModal = () => {
    navigate(-1); // Fermer le modal en revenant à la page précédente
  };

  // Fonction pour naviguer vers l'événement précédent sans fermer le modal
  const goToPrevEvent = () => {
    if (prevDate) {
      navigate(`/events/${prevDate}`);
    }
  };

  // Fonction pour naviguer vers l'événement suivant sans fermer le modal
  const goToNextEvent = () => {
    if (nextDate) {
      navigate(`/events/${nextDate}`);
    }
  };




  return (

    
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      contentLabel="Détails de l'événement"
      overlayClassName="custom-overlay"
      className="custom-modal"
      ariaHideApp={false}
    >
      <h2>Événement du {date}</h2>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      
      {/* <div className="buttons"> */}
        {/* Bouton Précédent */}
        {/* <button onClick={goToPrevEvent} disabled={!prevDate}>Précédent</button> */}
        {/* Bouton Suivant */}
        {/* <button onClick={goToNextEvent} disabled={!nextDate}>Suivant</button> */}
      {/* </div> */}

      <button onClick={closeModal}>Retour</button>
    </Modal>
  );
}

export default EventModal;

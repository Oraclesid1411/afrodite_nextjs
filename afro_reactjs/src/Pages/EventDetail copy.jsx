import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faCalendar, faMapMarkerAlt, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import FixedMenu from '../Components/FixedMenu';

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
  const [eventIds, setEventIds] = useState([]);
  const apiUrl = 'https://apiafro.aafrodites.com';
//   const apiUrl = 'http://localhost:5000';

  // Récupération des détails de l'événement
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Active le loader
        const rep1 = await axios.post(`${apiUrl}/events/this_event`, { id });


        console.log(rep1)

        const grouped_event = rep1?.data.reduce((acc, row) => {
          // Vérifie si le mannequin existe déjà dans l'accumulateur

          // console.log("row")
          // console.log(row)

          // return false;
          // new Date(event.date).toISOString().split('T')[0]
          const convdb = new Date(row?.date_debut).toISOString().split('T')[0];
          // const dateDebut = `${convdb.getDate()}-${convdb.getMonth() + 1}-${convdb.getFullYear()}`;

          const convdf = new Date(row?.date_fin).toISOString().split('T')[0];
          // const dateFin = `${convdf.getDate()}-${convdf.getMonth() + 1}-${convdf.getFullYear()}`;


          let listevent = acc.find(item => (item.id_event === row.id_event) &&
                                            (item.type_model === row.id_typemodel));
          
          if (!listevent) {
          
            // Si non, crée une nouvelle entrée pour ce mannequin
            listevent = {
              id_event: row.id_event,
              nom_event: row.nom_event,
              detail: row.details,
              type_model: row.id_typemodel, 
              date_debut : convdb,
              date_ffin : convdf,
              heure_debut : row?.heure_debut,
              heure_fin : row?.heure_fin,
              paths: {} };
            acc.push(listevent);
          }
          
          // console.log("listevent")
          // console.log(listevent)
          
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

          // console.log("listimg")
          // console.log(listimg)
          return acc;
        }, []);

        setEvent(grouped_event);
  
        const formattedEvents = rep1.data.map(event => {
          const eventDate = new Date(event.date);
          const formatter = new Intl.DateTimeFormat('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          });

          const formattedDate = formatter.format(eventDate);

          return {
            ...event,
            date: `${formattedDate.charAt(0).toUpperCase()}${formattedDate.slice(1)}`,
          };
        });

        // setEvent(formattedEvents);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Désactive le loader
      }
    };

    fetchData();
  }, [id]);

  // Récupération des IDs des événements pour navigation
  useEffect(() => {
    const fetchEventIds = async () => {
      try {
        const response = await axios.get(`${apiUrl}/events/all`);
        const ids = response.data.map(model => model.id);
        setEventIds(ids);
      } catch (error) {
        console.error('Erreur lors de la récupération des IDs des événements', error);
      }
    };
    fetchEventIds();
  }, []);

  const currentIndex = eventIds.indexOf(parseInt(id, 10));

  const goToPrevious = () => {
    if (currentIndex > 0) {
      navigate(`/event/${eventIds[currentIndex - 1]}`);
      window.location.reload();
    }
  };

  const goToNext = () => {
    if (currentIndex < eventIds.length - 1) {
      navigate(`/event/${eventIds[currentIndex + 1]}`);
      window.location.reload();
    }
  };

  console.log("event")
  console.log(event)
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
      {event.map(item => (
        <div className="container eventDetailZoom mt-5 text-light" key={item?.id}>
          <div className="section-header">
            <h2 className="text-light">{item.title}</h2>
          </div>
          <div className="row">
            <div className="col-md-6">
              <a href="../../assets/img/blog/bag-2.jpg" data-fancybox="gallery">
                <img
                  src="../../assets/img/blog/bag-2.jpg"
                  alt="Speaker 1"
                  className="img-fluid rounded"
                />
              </a>
            </div>
            <div className="col-md-6">
              <div className="details">
                <h2 className="text-light">{item.title}</h2>
                <p className="text-light">
                  <span className="me-2">
                    <FontAwesomeIcon className="icon" icon={faCalendar} size="sm" />
                  </span>
                  {item.date}
                </p>
                <div>
                  <div className="mb-3">
                    <button className="eventPrev me-5" onClick={goToPrevious}>
                      <FaChevronLeft size={24} />
                    </button>
                    <button className="eventNext" onClick={goToNext}>
                      <FaChevronRight size={24} />
                    </button>
                  </div>
                </div>
                <p>Description : {item?.description}</p>
                <p>
                  <span className="me-2">
                    <FontAwesomeIcon className="icon" icon={faMapMarkerAlt} size="sm" />
                  </span>
                  Lieu
                </p>
                <p>Détails : {item?.details}</p>
                <div className="social">
                  <button className="like">
                    <FontAwesomeIcon className="icon" icon={faThumbsUp} size="sm" />
                  </button>
                  <button className="postuler">Postuler</button>
                  <button className="share">
                    <FontAwesomeIcon className="icon" icon={faShare} size="sm" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <FixedMenu />
    </>
  );
}

export default EventDetail;

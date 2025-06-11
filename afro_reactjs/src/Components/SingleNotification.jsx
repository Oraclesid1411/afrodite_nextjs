import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import moment from 'moment';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthenticateContext.jsx"; // Assurez-
import FixedMenu from "./FixedMenu.jsx";
import Header_menu from "./Header_menu.jsx";

const SingleNotification = () => {

    const navigate = useNavigate();
    const auth = useAuth();

       const [loading, setLoading] = useState(true); // Loader state
      const user_info = auth.currentUser;

    
      axios.defaults.withCredentials = true;
     
       const apiUrl = 'https://apiafro.aafrodites.com'
   // Exemple de données
const [notifications, setNotifications] = useState([]);

const { id } = useParams(); // Récupère l'ID depuis l'URL
//   récupérer les notifications de ce user
useEffect(() => {
 
  
  const fetchData = async () => {
    try {
     
         const this_notification  =  await axios.post(`${apiUrl}/notifications/single_notifications`, 
           { id: user_info?.id ,
             role: user_info?.role,
             id_notification : parseInt(id)
          });
 
  console.log("this_notification")
  console.log(this_notification)
      
      
      
      if (this_notification.data?.notifications.length > 0) {
          // alert('here')
          setNotifications(this_notification.data?.notifications);

          // set notification comme déja lu
          console.log(this_notification.data?.notifications)
          if(this_notification.data?.notifications[0]?.etat_notification ===  0){
            console.log('set')
            try {
               const set_notif  =  await axios.post(`${apiUrl}/notifications/set_read`, 
              { id: user_info?.id ,
               role: user_info?.role,
               id_notification : parseInt(id),
               etat_notification : this_notification.data?.notifications[0]?.etat_notification
             });

                    console.log("set_notif")
                    console.log(set_notif)

                  } catch (error) {
                    console.error("Erreur lors de la mise à jour des notifications :", error.message);
                    return res.status(500).json({ error: "Une erreur interne s'est produite." });
                  }
          }
          else{
            console.log(this_notification.data?.notifications[0])
          }

      } else {
      //   navigate("/"); // Redirection si aucune donnée
      }
      setLoading(false);
    } catch (err) {
      console.error("Erreur lors de la récupération des données :", err);
      setLoading(false);
    }
  };

  fetchData();
}, []);

 // Prétraiter les données pour convertir les dates au format Moment
  const new_list = notifications.map((item) => ({
    ...item,
    read: item?.etat_notification === 0 ? false : true ,
    
    title: item?.type_notification === 2 ? "intégrer afrodites" : "autre" ,
    date_creation_formatted: item.create_date
      ? moment(item.create_date).format("DD/MM/YY hh:mm") // Formater la date
      : "-", // Si null, afficher la date d'hier
  }));
  console.log("new_list")
  console.log(new_list)

  const notification = new_list.find((notif) => notif.id_notification === parseInt(id));

  // console.log("notification")
  // console.log(notification)
  if (!notification) {
    return <p>Notification introuvable.</p>;
  }

   console.log("user_info kk")
   console.log(user_info?.role)

  return (
    <>
    <Header_menu />
    
    {loading === true &&

(
  <div className="loader-container">
  <div className="spinner"></div>
  <p>Chargement en cours...</p>
</div>

)
}

      <div className="single-notification">
        <div className="content">
        {/* <h2>Détails de la Notification</h2> */}
      <div className="notification-details">
        <h3> {notification.title}</h3>
        <p>Date: {notification.date_creation_formatted}</p>
        <p>Détails: {notification.details || "Pas de détails disponibles."}</p>
        {/* <a className="manage_link">
            Gérer {user_info?.role}
          </a> */}
        {((user_info?.role === 3) || (user_info?.role === 1)) &&
        (
          <label>
              <a className="manage_link" href="/manager">
                  Gérer  
              </a>

          </label>
        
        )

        }
      </div>

        </div>
     
    </div>
    <FixedMenu />
    
    </>
  
  );
};

export default SingleNotification;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthenticateContext.jsx"; // Assurez-vous que ce hook est correctement configuré
import Header_menu from "../../Components/Header_menu.jsx";
import FixedMenu from "../../Components/FixedMenu.jsx";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { FaChevronLeft, FaChevronRight, FaChevronDown , faSpinner, faCheck  } from 'react-icons/fa';

// import { FaChevronLeft, FaChevronRight, FaChevronDown ,faSpinner, faCheck } from 'react-icons/fa';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCheck } from '@fortawesome/free-solid-svg-icons';

import moment from 'moment';
import axios from "axios";
function Manage_joiner() {

  const y_date = moment().subtract(1, "days").format("DD/MM/YY");
  const navigate = useNavigate();
  const auth = useAuth();
  
    const [loading, setLoading] = useState(true); // Loader state
  const user_info = auth.currentUser;

   const apiUrl = 'https://apiafro.aafrodites.com'
  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const userid = user_info?.id;

    // Si l'utilisateur n'est pas connecté, rediriger vers la page de login
    if (userid === undefined) {
      console.log("Utilisateur non connecté, redirection vers login");
      // const current = window.location.pathname; // Récupérer l'URL actuelle
      const current = "/manager"; // Récupérer l'URL actuelle
     navigate("/login", { state: { from: current }, replace: true }); // Rediriger vers la page de login avec l'URL actuelle
  
      // navigate("/login", { state: { from: current } }); // Rediriger vers la page de login avec l'URL actuelle
    }
    else{

      // info user

      if(user_info?.role === 2){
        setIsModalOpen(true)
        // alert('vous devez vous connecter en tant que manager')
      }
    }
  }, []);

   const [isModalOpen, setIsModalOpen] = useState(false);
          // Fonction pour fermer le modal
          const closeModal = () => {
            setIsModalOpen(false);
          //   setModalContent('');
            // Supprimer le hash dans l'URL
            window.history.pushState(null, '', location.pathname);
  
            console.log('navigate to accueil')
            const current = "/manager"; // Récupérer l'URL actuelle
            navigate("/login", { state: { from: current }, replace: true }); // Rediriger vers la page de login avec l'URL actuelle
         
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
  

  const [joiners, setJoiners] = useState([]);

  useEffect(() => {
   
    
      const fetchData = async () => {
        try {
          console.log("listejoiner")
          console.log(listejoiner)
          const [listejoiner, list_rdv, list_formation] = await Promise.all([
            axios.post(`${apiUrl}/postulant/infoperson`, { id: personneId }),
            axios.post(`${apiUrl}/postulant/infofashion`, { id }),
            axios.post(`${apiUrl}/postulant/inforole`, { id }),
            // axios.post(`${apiUrl}/postulant/infohost`, { id }),
          ]);

          // return false;
          if (listejoiner.data.length > 0) {
            setJoiners(listejoiner.data);
  
            // const id = dataPostulant.data[0].id;
            // const personneId = dataPostulant.data[0].personne_id;
  
            // const [dataPersonne, dataFashion, dataRole, dataHost] = await Promise.all([
            //   axios.post(`${apiUrl}/postulant/infoperson`, { id: personneId }),
            //   axios.post(`${apiUrl}/postulant/infofashion`, { id }),
            //   axios.post(`${apiUrl}/postulant/inforole`, { id }),
            //   axios.post(`${apiUrl}/postulant/infohost`, { id }),
            // ]);
  
            // setInfoPersonne(dataPersonne.data || []);
            // setInfoFashion(dataFashion.data || []);
            // setInfoRole(dataRole.data || []);
            // setInfoHost(dataHost.data || []);
          } 
        
          setLoading(false);
        } catch (err) {
          console.error("Erreur lors de la récupération des données :", err);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
    const sort_joiners = joiners.sort((a, b) => b.id - a.id); // Tri décroissant

     // Prétraiter les données pour convertir les dates au format Moment
  const formattedPostulants = sort_joiners.map((postulant) => ({
    ...postulant,
    date_creation_formatted: postulant.date_creation
      ? moment(postulant.date_creation).format("DD/MM/YY") // Formater la date
      : y_date, // Si null, afficher la date d'hier
  }));

  const handleCall = (telephone) => {
    const phoneNumber = telephone.replace(/\D/g, ""); // Retirer tout caractère non numérique (si nécessaire)
    window.location.href = `tel:${phoneNumber}`; // Ouvrir l'application téléphone avec le numéro
  };

  const handleWhatsapp = (telephone) => {
    const phoneNumber = telephone.replace(/\D/g, ""); // Retirer tout caractère non numérique (si nécessaire)
    window.location.href = `https://wa.me/${phoneNumber}`; // Ouvrir WhatsApp avec le numéro
  };

  const handleToggleVue = (index) => {
    const updatedUsers = [...joiners];
    updatedUsers[index].vue = updatedUsers[index].vue === 0 ? 1 : 0;
    setJoiners(updatedUsers);
  };


  console.log(joiners)
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
      <div className="manager_cst bg-white">
        <div className="joiner_table">
          <div className="title_container">
            <label>Liste des demandes</label>
          </div>

          <div className="table-container">
            <table className="user-table">
              <thead>
                <tr>
               
                
                  <th className="fixed-col">Nom</th>
                  <th className="">Prénom</th>
                  <th className="">date</th>
                  {/* <th>Pseudo</th> */}
                  <th>Téléphone</th>
                  <th>whatsapp</th>
                  <th>Action</th>
                 
                  {/* <th>Action_3</th>
                  <th>Action_4</th> */}
                </tr>
              </thead>
              <tbody>
                {formattedPostulants.length > 0 ?
                <>
                {formattedPostulants.map((li, index) => (
                  <tr key={index}>
                    
                    <td className="fixed-col">{li.nom}</td>
                    <td className="">
                      {li.prenom}

                    </td>
                    <td className="cst_line">
                      {/* <p>  */}
                        {/* {now_date}
                        {user.datecreation.format('DD/MM/YY')} */}
                        {li.date_creation_formatted
                           ? li.date_creation_formatted
                        : y_date}

                         {/* </p> */}
                      </td>
                  
                    {/* <td>{user.pseudo || "-"}</td> */}
                    <td className="text-center">
                      {/* {`${user.indicatif}`}{user.num_tel} */}
                      
                      <label className="bg-light" onClick={() => handleCall(li.indicatif + "" + li.num_tel)}>
                      {`${li.indicatif}`}{li.num_tel}
                      </label>
                      </td>
                    <td className="text-center">
                      <label className="bg-light" onClick={() => handleWhatsapp(li.indicatif + "" + li.num_tel)}>
                      {`${li.indicatif_whatsapp}`}{li.whatsapp} 
                      </label>
                    </td>
                    <td className="text-center">
                      {li.vue === 1 ? (
                        <label>
                            <FontAwesomeIcon icon={faCheck} className="cst_icon" />
                        </label>
                      ) : (
                        <button onClick={() => handleToggleVue(index)}>
                           <FontAwesomeIcon icon={faSpinner} spin className="cst_icon" />
                        </button>
                      )}
                    </td>
                   
                  </tr>
                ))}
                </>

                :

                <>
                <div className="full_box"> aucune demande trouvée</div>
                </>


               }             
               
              </tbody>
            </table>
          </div>
        </div>
      </div>


      <div className='container modal_cstm bg-white'>
      {isModalOpen && (
        <div className="modal_customs">
          <div className="modal_customs-content">
            <button className="close_cstom-btn" onClick={closeModal}>
              ×
            </button>
            <h2>
            Alert
              
              </h2>
            <div>
            <p className='data_info'>
               vous ne disposez pas des droits nécessaires pour poursuivre!
                <br/>
              connectez vous avec un compte manager!
               <br/>
              
            </p>
             
            
            
            </div>

            <div className="btn_container">
                <button className="close_btn" onClick={closeModal}>
                    fermer
                </button>


            </div>
          </div>
        </div>
      )}
      
     </div>

      <FixedMenu />
    </>
  );
}

export default Manage_joiner;

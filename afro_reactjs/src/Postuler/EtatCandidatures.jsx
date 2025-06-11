import React from 'react'
// import React from 'react'
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect ,useRef  } from "react"; 
import Header_banner from '../Components/Header_banner';  

import Locations from '../Components/Locations.jsx';
import { useAuth } from "../Context/AuthenticateContext.jsx";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faCamera,faCheckDouble, faImage,faRepeat, faPlus, faTimes, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CameraCapture from '../Components/CameraCapture .jsx';
import FixedMenu from '../Components/FixedMenu.jsx';
import Header_menu from '../Components/Header_menu.jsx';

const Accordeon = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordeon">
      <div
        className="accordeon-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3>{title}</h3>
        <span>{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && <div className="accordeon-content">{children}</div>}
    </div>
  );
};

function EtatCandidatures() {
  const auth = useAuth(); 
  const user_info = auth.currentUser 
 
  const navigate = useNavigate()
   const apiUrl = 'https://apiafro.aafrodites.com'
 
  const location = useLocation(); 
  const link_url = location?.pathname.split('/');
  const [infoPostulant, setInfoPostulant] = useState([]);
  const [infoPersonne, setInfoPersonne] = useState([]);
  const [infoFashion, setInfoFashion] = useState([]);
  const [infoRole, setInfoRole] = useState([]);
  const [infoHost, setInfoHost] = useState([]);
  const [loading, setLoading] = useState(true);

 console.log(infoHost)
  useEffect(() => {
   
  const userid = user_info?.id;
    const params = { userid };

    const fetchData = async () => {
      try {
        const dataPostulant = await axios.post(`${apiUrl}/postulant/etatcandidature`, params);
        if (dataPostulant.data.length > 0) {
          setInfoPostulant(dataPostulant.data);

          const id = dataPostulant.data[0].id;
          const personneId = dataPostulant.data[0].personne_id;

          const [dataPersonne, dataFashion, dataRole, dataHost] = await Promise.all([
            axios.post(`${apiUrl}/postulant/infoperson`, { id: personneId }),
            axios.post(`${apiUrl}/postulant/infofashion`, { id }),
            axios.post(`${apiUrl}/postulant/inforole`, { id }),
            axios.post(`${apiUrl}/postulant/infohost`, { id }),
          ]);

          setInfoPersonne(dataPersonne.data || []);
          setInfoFashion(dataFashion.data || []);
          setInfoRole(dataRole.data || []);
          setInfoHost(dataHost.data || []);
        } else {
          navigate("/"); // Redirection si aucune donnée
        }
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des données :", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Chargement des données...</p>;
  }
  return (
    <>

        <Header_menu data ={{ link : 'ma candidature' }} />
    <div className="main_container data_container">
        
    <div className="postulant-details">
      {/* <h1 className='title'>Détails du Postulant</h1> */}
    
      <Accordeon title="Informations Personnelles">
        {infoPersonne.length > 0 ? (
          <div>
            <p>Nom : {infoPersonne[0]?.nom}</p>
            <p>Prénom : {infoPersonne[0]?.prenom}</p>
            <p>Pseudo : {infoPersonne[0]?.pseudo}</p>
            <p>date_naissance : {new Date(infoPersonne[0]?.date_naissance).toLocaleDateString("fr-FR")}</p>
            <p>poids : {infoPersonne[0]?.email}</p>
            <p>taille : {infoPersonne[0]?.prenom}</p>
            <p>tel 1 : {infoPersonne[0]?.indicatif} {infoPersonne[0]?.num_tel}</p>
            <p>whatsapp: {infoPersonne[0]?.indicatif_2} {infoPersonne[0]?.num_tel_2}</p>
            <p>pays :   {infoFashion[0]?.pays ? infoFashion[0]?.pays : "-"}</p>
            <p>ville :   {infoFashion[0]?.ville ? infoFashion[0]?.ville : "-"}</p>
            {/* <p>quartier : {infoPersonne[0]?.quartier}</p>
            <p>indication : {infoPersonne[0]?.indication}</p> */}
          </div>
        ) : (
          <p>Aucune information du postulant trouvée.</p>
        )}
      </Accordeon>
      {infoFashion.length > 0 &&
      (
        <Accordeon title="Informations Fashion model">
        {infoFashion.length > 0 ? (
          <>
            <p>expériences en mannequinnat : {infoFashion[0]?.experience_mannequinnat ? "Oui" : "Non"}</p>
            <p>etat de la candidature :  {
                                            infoFashion[0]?.etat_candidature === null || infoFashion[0]?.etat_candidature === 0
                                              ? "En cours"
                                              : infoFashion[0]?.etat_candidature === 1
                                              ? "Validé"
                                              : infoFashion[0]?.etat_candidature === 2
                                              ? "Rejeté"
                                              : "Non spécifié"
                                          }</p>
            
            <div className="action_btn">
                  
                  <label className="abort_btn">
                    Abandonner

                    </label>
                    <label className="update_btn">
                      modifier

                    </label>
                   
                     
              </div>
          </>
        ) : (
          <p>Aucune information fashion disponible.</p>
        )}
      </Accordeon>
      )}
     
      {infoHost.length > 0 &&
      (
        <Accordeon title="Informations host model">
        {infoHost.length > 0 ? (
            <>
              <p>experience: {infoHost[0]?.temps_experience ? `${infoHost[0]?.temps_experience} mois` : "-"}</p>
              {/* <p>abonnés : {infoHost[0]?.nbr_abonne ? infoRole[0]?.nbr_abonne : "-"}</p> */}
              <p>etat de la candidature :  {
                                              infoHost[0]?.etat_candidature === null || infoHost[0]?.etat_candidature === 0
                                                ? "En cours"
                                                : infoHost[0]?.etat_candidature === 1
                                                ? "Validé"
                                                : infoHost[0]?.etat_candidature === 2
                                                ? "Rejeté"
                                                : "Non spécifié"
                                            }</p>
                <div className="action_btn">
                  
                  <label className="abort_btn">
                    Abandonner

                    </label>
                    <label className="update_btn">
                      modifier

                    </label>
                   
                     
              </div>
            </>
          ) : (
            <p>Aucune information fashion disponible.</p>
          )}
          
        </Accordeon>
      )}
       {infoRole.length > 0 &&
      (
        <Accordeon title="information role model">
        {infoRole.length > 0 ? (
            <>
              <p>réseaux sociaux: {infoRole[0]?.rxsx ? infoRole[0]?.rxsx : "-"}</p>
              <p>abonnés : {infoRole[0]?.nbr_abonne ? infoRole[0]?.nbr_abonne : "-"}</p>
              <p>etat de la candidature :  {
                                              infoRole[0]?.etat_candidature === null || infoRole[0]?.etat_candidature === 0
                                                ? "En cours"
                                                : infoRole[0]?.etat_candidature === 1
                                                ? "Validé"
                                                : infoRole[0]?.etat_candidature === 2
                                                ? "Rejeté"
                                                : "Non spécifié"
                                            }</p>
                <div className="action_btn">
                  
                  <label className="abort_btn">
                    Abandonner

                    </label>
                    <label className="update_btn">
                      modifier

                    </label>
                   
                     
              </div>
            </>
          ) : (
            <p>Aucune information fashion disponible.</p>
          )}
         
        </Accordeon>
      )}
    

     
    </div>
    </div>


<FixedMenu />   
    
    </>
  )
}

export default EtatCandidatures
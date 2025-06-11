import React, { useState } from 'react';
import axios from 'axios';

import { FaTrash ,FaSpinner} from "react-icons/fa";
const DeleteMannequinButton = ({ mannequinId,imageId, onDeleteSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = 'https://apiafro.aafrodites.com'
  axios.defaults.withCredentials = true;
 
  const handleDelete = async () => {
    setLoading(true);
    setError(null);
        console.log(" here mannequinId")
        console.log(mannequinId)
        onDeleteSuccess(mannequinId); // Callback pour gérer l'état après la suppression
      
        // return false;
    try {
      // Appel API pour supprimer le mannequin
      const data = { 
        imageId :imageId ,
        modelId : parseInt(mannequinId) 
       }

       console.log(data)
      //  return false;
      const response = await axios.post(`${apiUrl}/fashion_model/deleteFashionModel`
        , data );
       
      
    //   await axios.delete(`/api/delete-manquin/${mannequinId}`);
   console.log("response")
   console.log(response)

  //  return false
      // Si la suppression est réussie
      if (response.status === 200) {
        onDeleteSuccess(); // Callback pour gérer l'état après la suppression
        console.log('Mannequin supprimé avec succès');
      }
    } catch (error) {
      setError('Une erreur est survenue lors de la suppression du mannequin.');
      console.error('Erreur lors de la suppression du mannequin:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleDelete} disabled={loading}>
        {loading ?  <FaSpinner /> :    <FaTrash />}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default DeleteMannequinButton;

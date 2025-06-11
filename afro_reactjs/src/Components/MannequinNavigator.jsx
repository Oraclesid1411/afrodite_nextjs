import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function MannequinNavigation({ className }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modelIds, setModelIds] = useState([]);
  const apiUrl = 'https://apiafro.aafrodites.com';

  useEffect(() => {
    const fetchModelIds = async () => {
      try {
        const response = await axios.get(`${apiUrl}/fashion_model/all`);
        const ids = response.data.map(model => model.idmannequin);
        setModelIds(ids);
      } catch (error) {
        console.error('Erreur lors de la récupération des IDs de mannequins', error);
      }
    };
    fetchModelIds();
  }, []);

  const currentIndex = modelIds.indexOf(parseInt(id, 10));

  const goToPrevious = () => {
    if (currentIndex > 0) {
      navigate(`/single_view/1/${modelIds[currentIndex - 1]}`);
      window.location.reload();
    }
  };

  const goToNext = () => {
    if (currentIndex < modelIds.length - 1) {
      navigate(`/single_view/1/${modelIds[currentIndex + 1]}`);
      window.location.reload();
    }
  };


  return (
    <div className={`model-navigation ${className}`}>
      <button onClick={goToPrevious} className="prev-btnModel">
        <FaChevronLeft size={24} />
      </button>
      
      <button onClick={goToNext} className="next-btnModel">
        <FaChevronRight size={24} />
      </button>
    </div>
  );
}

export default MannequinNavigation;

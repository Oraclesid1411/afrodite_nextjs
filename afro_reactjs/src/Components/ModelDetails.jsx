import React from 'react';
import { Card } from 'react-bootstrap';

const ModelDetails = ({ model, ville, nationalite, langues }) => {
  const getLibelle = (array, id) =>
    array.find((item) => item.id === id)?.libelle || 'Inconnu';

  return (
    <Card>
      <Card.Body>
        <h3>{model.nom} {model.prenom}</h3>
        <p><strong>Ville:</strong> {getLibelle(ville, model.id_ville)}</p>
        <p><strong>Nationalité:</strong> {getLibelle(nationalite, model.id_nationalite)}</p>
        <p><strong>Langues:</strong> {model.langues?.map(id => getLibelle(langues, id)).join(', ')}</p>
        <p><strong>Âge:</strong> {model.age}</p>
        <p><strong>Taille:</strong> {model.taille} cm</p>
        <p><strong>Poids:</strong> {model.poids} kg</p>
      </Card.Body>
    </Card>
  );
};

export default ModelDetails;

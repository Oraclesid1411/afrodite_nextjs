import React, { useState } from 'react';

const ModalForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fonction pour ouvrir le modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Bouton Add New */}
      <button onClick={openModal} style={styles.addButton}>
        Add New
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2>Ajouter un nouvel élément</h2>

            {/* Formulaire */}
            <form>
              <div style={styles.formGroup}>
                <label>Nom :</label>
                <input type="text" placeholder="Entrer un nom" style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label>Description :</label>
                <textarea placeholder="Entrer une description" style={styles.textarea}></textarea>
              </div>
              <button type="submit" style={styles.submitButton}>Enregistrer</button>
            </form>

            {/* Bouton Fermer */}
            <button onClick={closeModal} style={styles.closeButton}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles pour le modal et les boutons
const styles = {
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    width: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  closeButton: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ModalForm;

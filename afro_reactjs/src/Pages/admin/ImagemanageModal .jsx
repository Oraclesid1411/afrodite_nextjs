import React, { useState } from "react";

const ImageModal = ({ images, onClose, handleDelete, handleUpload }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Versions d'images</h3>
        <button className="close-modal" onClick={onClose}>
          X
        </button>
        <div className="image-grid">
          {Object.keys(images).map((key) => (
            <div key={key} className="image-box">
              {images[key] ? (
                <>
                  <img
                    src={`${images[key]}`}
                    alt={`Version ${key}`}
                    className="preview-image"
                  />
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(key)}
                  >
                    Supprimer
                  </button>
                </>
              ) : (
                <input
                  type="file"
                  className="upload-input"
                  onChange={(e) => handleUpload(e, key)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ImageManager = ({ imageData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState({
    path_hrd: imageData.paths.path_hrd,
    path_hrm: imageData.paths.path_hrm,
    path_md: imageData.paths.path_md,
    path_mm: imageData.paths.path_mm,
    path_od: imageData.paths.path_od,
    path_om: imageData.paths.path_om,
  });

  const handleDelete = (key) => {
    // Supprime l'image
    console.log(`Suppression de ${key}`);
    // Simule la suppression
    const updatedImages = { ...images, [key]: null };
    setImages(updatedImages);
  };

  const handleUpload = (event, key) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`Upload pour ${key}: ${file.name}`);
      // Simule l'upload et mise à jour
      const updatedImages = { ...images, [key]: URL.createObjectURL(file) };
      setImages(updatedImages);
    }
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className="open-modal-btn">
        Modifier les images
      </button>
      {isModalOpen && (
        <ImageModal
          images={images}
          onClose={() => setIsModalOpen(false)}
          handleDelete={handleDelete}
          handleUpload={handleUpload}
        />
      )}
    </div>
  );
};

export default ImageManager;

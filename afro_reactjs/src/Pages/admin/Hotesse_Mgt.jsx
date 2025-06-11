
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect ,useRef  } from "react"; 
import Loader from '../../Components/Loader';
import axios from 'axios' 

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaEye,FaFilter, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import imageCompression from 'browser-image-compression';
const Hotesse_Mgt = () => {

  const [fashion_models , setfashion_models] = useState([]);
  const [mannequins_data , setmannequins_data] = useState([]);
  const [hotesses_data , sethotesses_data] = useState([]);
  const [podiums , setPodiums] = useState([]);
  const [details , setDetails] = useState([]);
  const [newuserdata , setnewuserdata] = useState([]);
  
  console.log("hotesses_data")
  console.log(hotesses_data)
  const apiUrl = 'https://apiafro.aafrodites.com'
  //    const apiUrl = 'http://localhost:5000'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [images, setImages] = useState([]);
  const [isnotification, setIsNotification] = useState(false);
const [imagespath, setImagespath] = useState([]);
  // Fonction pour ouvrir le modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
    setIsNotification(false)
    setImagePreview(null)
  };
  

  // Fonction pour gérer le changement de l'image
   // Fonction pour gérer le changement d'image
   const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const newImagePath = reader.result; // Chemin de la nouvelle image

        
        // Mettre à jour les aperçus
        setImagePreview(newImagePath);
        
   
        // Sauvegarder le chemin dans l'état images
        setImages((prev) => {
          const updatedImages = { ...prev };
          if (!updatedImages.path) {
            updatedImages.path = [];
          }
          updatedImages.path.push(newImagePath); // Ajoute le nouveau chemin
          return updatedImages;
        });
      };
      reader.readAsDataURL(file); // Lit l'image comme DataURL
    }

  };
 
      const [isloaded, setIsloaded] = useState(true);
        useEffect(() => {
          const fetchData = async () => {
            try {
              const [rep1, rep2] = await Promise.all([
               
                axios.post(`${apiUrl}/host_model/liste_hotesses`),
                // axios.post(`${apiUrl}/fashion_model/list_mannequin`),
              
              ]);
              sethotesses_data(rep1.data);
              // setmannequins_data(rep2.data);
              // setDetails(rep3.data);
              // setmannequins_data(rep4.data);
              setIsloaded(false)
            } catch (err) {
              console.error("Erreur lors de la récupération des données :", err);
            }
          };
         
          // N'exécuter fetchData que si isloaded est true
            if (isloaded) {
              fetchData();
            }
        }, [isloaded]);
  
     
  const [models, setModels] = useState([]); // Liste des modèles
  const [search, setSearch] = useState(""); // Barre de recherche
  const [sortOrder, setSortOrder] = useState(null); // Ordre de tri
  const [currentPage, setCurrentPage] = useState(0); // Page actuelle
  const [itemsPerPage] = useState(7); // Nombre d'éléments par page

  // organiser les données des mannequins

const groupedResults = hotesses_data.reduce((acc, row) => {
  // Vérifie si le mannequin existe déjà dans l'accumulateur
  let model = acc.find(item => item.model_id === row.idhotesse);
    
  if (!model) {
    // Si non, crée une nouvelle entrée pour ce mannequin
    model = {
      model_id: row.idhotesse,
      nom: row.nom,
      prenom: row.prenom,
      pseudo: row.pseudo,
      type_image: row.type_image,
      type_model: row.type_model,
      userclient: row.userclient,
      id_image: row.id_image,
      image_name: row.image_name,
       paths: {} };
    acc.push(model);
  }
  
  // Ajoute le path_image correspondant au type_resolution
  switch (row.type_resolution) {
    // case 1:
    //   mannequin.paths.path_od = row.path_resolution;
    //   break;
    // case 2:
    //   mannequin.paths.path_om = row.path_resolution;
    //   break;
    // case 3:
    //   mannequin.paths.path_hrd = row.path_resolution;
    //   break;
    // case 4:
    //   mannequin.paths.path_hrm = row.path_resolution;
    //   break;
    case 5:
      model.paths.path_md = row.path_resolution;
      break;
    case 6:
      model.paths.path_mm = row.path_resolution;
      break;
    default:
      // Si un type inconnu est trouvé, le traiter ou ignorer
      console.warn(`Type de résolution inconnu : ${row.type_resolution}`);
      break;
  }

  return acc;
}, []);

console.log("groupedResults");
console.log(groupedResults);
  // Simulation de données
  useEffect(() => {
    const fetchData = () => {
      const sampleData = [
        { id: 1, nom: "John Doe", image: "https://via.placeholder.com/50", etat: "Actif" },
        { id: 2, nom: "Jane Smith", image: "https://via.placeholder.com/50", etat: "Inactif" },
        { id: 3, nom: "Alice Brown", image: "https://via.placeholder.com/50", etat: "Actif" },
        // Ajoutez plus de données ici
      ];
      setModels(sampleData);
    };
    fetchData();
  }, []);

  // Filtrer les données par recherche
  const filteredModels = groupedResults.filter((model) =>
    model.nom.toLowerCase().includes(search.toLowerCase()) ||
     model.prenom.toLowerCase().includes(search.toLowerCase()) ||
     model.pseudo.toLowerCase().includes(search.toLowerCase())
  );

  // Trier les données
  const sortedModels = [...filteredModels].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.nom.localeCompare(b.nom);
    } else {
      return b.nom.localeCompare(a.nom);
    }
  });
 
  // Pagination
  const offset = currentPage * itemsPerPage;
  const paginatedModels = sortedModels.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

  // Détecter les changements de taille de l'écran
  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log("deviceWidth")
  console.log(deviceWidth)
   // Fonction pour obtenir le chemin de l'image adapté à la largeur de l'appareil
   const getPathForResolution = (paths) => {
    console.log("paths")
    console.log(paths)
    if (deviceWidth <= 720) {
      return paths.path_mm; // Résolution miniature
    } else if (deviceWidth <= 1080) {
      return paths.path_md; // Résolution moyenne
    } else {
      return paths.path_md; // Résolution haute
    }
  };
  // form params
  
  const [formData, setFormData] = useState({
    model: {
      nom: "",
      prenom: "",
      pseudo: "",
      // date_naissance: "",
      //   taille: "",
      // poids: "",
      // indication: "",
     
    }
    
  });

  const handleInputChange = (type, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  function base64ToFile(base64String, filename) {
    const arr = base64String.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new File([u8arr], filename, { type: mime });
  }
  const compressImage = async (file, maxWidth, maxHeight) => {
    const options = {
      maxWidthOrHeight: Math.max(maxWidth, maxHeight),
      useWebWorker: true,
    };
    return await imageCompression(file, options);
  };

  const next_option = async () => {
    console.log("Envoi au serveur...");
  
    if (!images?.path || images.path.length === 0) {
      console.error("Aucune image à télécharger");
      return;
    }
  
    const formData = new FormData();

for (let index = 0; index < images.path.length; index++) {
  const base64Image = images.path[index];
  const originalFileName = `image-${index + 1}.jpeg`;

  // Ajouter un timestamp pour rendre le nom unique
  const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
  const uniqueFileName = `${originalFileName.split(".")[0]}_${timestamp}.jpeg`;

  const file = base64ToFile(base64Image, uniqueFileName);

  // Compression et redimensionnement
  const desktopImage = await compressImage(file, 1920, 1080); // Desktop haute qualité
  const mobileImage = await compressImage(file, 1280, 729); // Mobile haute qualité
  const thumbnailDesktop = await compressImage(file, 600, 400); // Miniature Desktop
  const thumbnailMobile = await compressImage(file, 400, 250); // Miniature Mobile
  

  console.log(desktopImage)
  console.log(mobileImage)
  console.log(thumbnailMobile)
  // Ajout des fichiers compressés avec dossier et type dans FormData
  formData.append("images", file, `${uniqueFileName}_original_desktop`);
  formData.append("folder", "original_resolution");
  formData.append("type", "desktop");

  formData.append("images", desktopImage, `${uniqueFileName}_desktop`);
  formData.append("folder", "haute_resolution");
  formData.append("type", "desktop");

  formData.append("images", mobileImage, `${uniqueFileName}_mobile`);
  formData.append("folder", "haute_resolution");
  formData.append("type", "mobile");

  formData.append("images", thumbnailDesktop, `${uniqueFileName}_thumbnail_desktop`);
  formData.append("folder", "miniatures");
  formData.append("type", "desktop");

  formData.append("images", thumbnailMobile, `${uniqueFileName}_thumbnail_mobile`);
  formData.append("folder", "miniatures");
  formData.append("type", "mobile");
  
}
// console.log("FormData avant envoi :");
// for (let pair of formData.entries()) {
//   console.log(pair[0] + ': ' + pair[1]);
//   // console.log("folder:", folder, "type:", type);
// }
  
    try {
      // Envoi des fichiers
     
      const response = await axios.post(`${apiUrl}/uploadfiles/saveImage`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
  
      console.log("Fichiers uploadés avec succès :", response.data);
      return response.data?.files;
    } catch (error) {
      console.error("Erreur lors de l'upload :", error.response?.data || error.message);
    }
  };
   
  const handleSubmit = async (e) => {

    e.preventDefault();

 
    const imgs_upld = await next_option(); // Attend que la fonction résolve la promesse
   
    console.log("imgs_upld")
    const all_images = []
       all_images.push({
                            o_desktop : imgs_upld[0] ,
                            hr_desktop : imgs_upld[1] ,
                            hr_mobile : imgs_upld[2] ,
                            m_desktop : imgs_upld[3] ,
                            m_mobile : imgs_upld[4] ,

                   });

      console.log(all_images)
    // return false;
    const data_model = {
      data : formData?.model
    }
   
    const param = {all_images ,data_model}
        console.log(param)

  // return false;
        toast.info('sauvegarde en cours' , {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });

        try {

          console.log(param)

          // return false;
          await axios
            .post(`${apiUrl}/host_model/add`,
              param
              )
            .then((result) => {
        
            console.log("result.data")
              console.log(result)
            //   console.log(result.data?.user)

            //  return false;

            
                if(result){
                  setTimeout(() => {
                  
                    toast.success('hotesse ajouté avec succès' , {
                      position: "top-center",
                      autoClose: 3000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                      // transition: Bounce,
                  });
                    
                  setImages([])
                  setnewuserdata([result.data?.new_pseudo , result.data?.new_pass])
                    // affciher une notif
                    setIsNotification(true)
                    setIsloaded(true)
                    // setIsModalOpen(false);
                    

                  // arreter le loader

                  // afficher le recap
                }, 3500); // Délai de 3 secondes

                
      
                }
              }); 
              
        } catch (err) {
          console.log("erreur");
          // setError(err.response.data);
        }
  };
 

  const [selectedModel, setSelectedModel] = useState(null); // Pour gérer le modal
  const [isDetailModalOpen, setDetailModalOpen] = useState(false); // Modal pour détail
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false); // Modal pour mise à jour

  // Supprimer un modèle
  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce modèle ?")) {
      // Appeler l'API pour supprimer
      fetch(`${apiUrl}/models/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            alert("Modèle supprimé avec succès !");
            // Mettre à jour l'affichage
            window.location.reload();
          } else {
            alert("Échec de la suppression !");
          }
        })
        .catch((error) => console.error("Erreur :", error));
    }
  };

  // Voir les détails
  const handleViewDetails = (model) => {
    setSelectedModel(model);
    setDetailModalOpen(true);
  };

  // Modifier (Update)
  const handleUpdate = (model) => {
    setSelectedModel(model);
    setUpdateModalOpen(true);
  };

  return (


    <div className='admin_datacontent'>
       <ToastContainer className="toast_style"/>
      <h1>hotesses d&apos;accueil Management</h1>
      <div className="models-table-container">
      {/* Barre de recherche et options */}
      <div className="table-options">
        <input
          type="text"
          placeholder="Rechercher un modèle..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
         <div className="filters">
          <FaFilter style={{ marginRight: "5px" }} />
          <select>
            <option value="all">Tous les types</option>
            <option value="actif">podium</option>
            <option value="inactif">détail</option>
          </select>
        </div>
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="asc">Trier par nom (A-Z)</option>
          <option value="desc">Trier par nom (Z-A)</option>
        </select>
        <div>
          <label className="add_new mx-3" onClick={openModal} > + nouveau</label>
          <label className="add_new mx-3" onClick={openModal} > valider postulant</label>
        
        </div>
      </div>

      {/* Tableau */}
      <table className="models-table">
        <thead>
          <tr>
            <th>#</th>
            <th>
              <input type="checkbox" />
            </th>
            <th>Image</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Pseudo</th>
            {/* <th>État</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedModels.map((model) => (
            <tr key={model.model_id}>
              <td>{model.model_id}</td>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <img 
               
                 src={`${apiUrl}/${getPathForResolution(model.paths)} `}
                 alt={model.nom} />
              </td>
              <td>{model.nom}</td>
              <td>{model.prenom}</td>
              <td>{model.pseudo}</td>
              {/* <td>{model.etat}</td> */}
              <td>
                <button title="Modifier" onClick={() => handleUpdate(model)}>
                  <FaEdit />
                </button>
                <Link title="Voir"  to={`/admin/detail_mannequin/1/${model?.id_mannequin}`}>
                  <FaEye />
                </Link>
                <button title="Supprimer" onClick={() => handleDelete(model.id_mannequin)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={"Précédent"}
        nextLabel={"Suivant"}
        breakLabel={"..."}
        pageCount={Math.ceil(filteredModels.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
      {/* Modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
            {/* Bouton Fermer */}
          
          <div style={styles.modalContent}>
          <button onClick={closeModal} style={styles.closeButton}>
              X
            </button>
            <h2 style={{fontSize : "18px" , textAlign : "center"}}>nouvelle hotesse</h2>
           
            {isnotification ?
          (
            <>
            <div className="">
            {/* Accordion for Model */}
              <div className="resume_box">
              <div style={{ marginBottom: "20px" }}>
                      
            
                <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
              
              
                
                      <>
                        <div className="text-center"> 
                      <span className='title_label'>
                          hotesse ajouté avec succès.
                          les identifiants de son compte afrodites sont:
                          
                      </span>
                      <p>pseudo : {newuserdata[0]}</p>
                      <p>mot de passe : {newuserdata[1]}</p>
                      </div> 
                      </>
                  
                  
                </div>
            
            </div>

              </div>

          

            </div>
            </>)

            :

            (
              <>
              {/* Formulaire */}
              <form onSubmit={handleSubmit}>
                      
                      <div style={styles.formGroup}>
                        <label>Nom :</label>
                        <input type="text"
                          onChange={(e) => handleInputChange("model", "nom", e.target.value)}
                        placeholder="nom" style={styles.input} />
                      </div>
                      <div style={styles.formGroup}>
                        <label>prenom :</label>
                        <input type="text"
                          onChange={(e) => handleInputChange("model", "prenom", e.target.value)}
                    
                        placeholder="prénom" style={styles.input} />
                      </div>
                      <div style={styles.formGroup}>
                        <label>pseudo :</label>
                        <input type="text"
                          onChange={(e) => handleInputChange("model", "pseudo", e.target.value)}
                    
                        placeholder="pseudo " style={styles.input} />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.imageLabel}>
                          {/* Zone de prévisualisation de l'image */}
                          {imagePreview ? (
                            <img
                              src={imagePreview}
                              alt="Prévisualisation"
                              style={styles.imagePreview}
                            />
                          ) : (
                            <span> + image </span>
                          )} 
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={styles.fileInput}
                          />
                        </label>
                      </div>

                      {/* <div style={styles.formGroup}>
                        <label>Description :</label>
                        <textarea placeholder="Entrer une description" style={styles.textarea}></textarea>
                      </div> */}
                      <div className="text-center">
                      <button type="submit" style={styles.submitButton}>Enregistrer</button>
                  
                      </div>
                      </form>
              </>
            )
          
          
          }
           

          
          </div>
        </div>
      )}
 {/* Modal pour Détails */}
 {isDetailModalOpen && (
        <div className="modal">
          <h3>Détails du modèle</h3>
          <p>Nom : {selectedModel.nom}</p>
          <p>Prénom : {selectedModel.prenom}</p>
          <p>Pseudo : {selectedModel.pseudo}</p>
          <p>Image :</p>
          <img src={`${apiUrl}/${selectedModel?.path_image}`} alt={selectedModel.nom} />
          <button onClick={() => setDetailModalOpen(false)}>Fermer</button>
        </div>
      )}

      {/* Modal pour Mise à jour */}
      {isUpdateModalOpen && (
        <div className="modal">
          <h3>Modifier le modèle</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Appeler l'API pour mettre à jour
              fetch(`${apiUrl}/models/${selectedModel.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(selectedModel),
              })
                .then((response) => {
                  if (response.ok) {
                    alert("Modèle mis à jour avec succès !");
                    setUpdateModalOpen(false);
                    window.location.reload();
                  } else {
                    alert("Échec de la mise à jour !");
                  }
                })
                .catch((error) => console.error("Erreur :", error));
            }}
          >
            <label>
              Nom :
              <input
                type="text"
                value={selectedModel.nom}
                onChange={(e) => setSelectedModel({ ...selectedModel, nom: e.target.value })}
              />
            </label>
            <label>
              Prénom :
              <input
                type="text"
                value={selectedModel.prenom}
                onChange={(e) => setSelectedModel({ ...selectedModel, prenom: e.target.value })}
              />
            </label>
            <label>
              Pseudo :
              <input
                type="text"
                value={selectedModel.pseudo}
                onChange={(e) => setSelectedModel({ ...selectedModel, pseudo: e.target.value })}
              />
            </label>
            <button type="submit">Sauvegarder</button>
            <button type="button" onClick={() => setUpdateModalOpen(false)}>
              Annuler
            </button>
          </form>
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
    zIndex: 9999,
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
    padding: '4px 8px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display : 'inline-block'
  },
  closeButton: {
    marginTop: '10px',
    padding: '5px 8px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    float: "right",
    // marginRight: "1em",
    display : 'inline-block'
  },
  imageLabel: {
    display: 'block',
    cursor: 'pointer',
    textAlign: 'center',
    padding: '10px',
    border: '1px dashed #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    position: 'relative',
  },
  fileInput: {
    display: 'none',
  },
  imagePreview: {
    maxWidth: '100%',
    maxHeight: '150px',
    marginBottom: '10px',
  },
};

export default Hotesse_Mgt;

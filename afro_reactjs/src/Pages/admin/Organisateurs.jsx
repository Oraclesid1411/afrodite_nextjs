import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaFilter, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faPhone ,faAnglesRight} from '@fortawesome/free-solid-svg-icons';
import Locations from '../../Components/Locations_models';


// import './Organisateurs.css';

const API_URL = 'https://apiafro.aafrodites.com';

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 20,
    transition: {
      duration: 0.2,
      ease: 'easeIn'
    }
  }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const Modal = ({ isOpen, onClose, title, children }) => {
    console.log('test')
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="modal-overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={onClose}
            />
            <motion.div
              className="modal-container"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()} // 👉 Ajoute cette ligne
            >
              <div className="modal-header">
                <h2>{title}</h2>
                <button className="close-button" onClick={onClose}>&times;</button>
              </div>
              <div className="modal-content">
                {children}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  };
  
function Organisateurs() {
  const [organisateurs, setOrganisateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedOrganisateur, setSelectedOrganisateur] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    indicatif_phone:'',
    telephone: '',
    pays:'',
    ville:'',
    address: '',
    type: 'company'
  });
  const [code_pays, setcode_pays] = useState("+228");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    fetchOrganisateurs();
  }, []);

  const fetchOrganisateurs = async () => {
    try {
      const response = await axios.get(`${API_URL}/organisateurs/list`);

      console.log("response")
      console.log(response)
      setOrganisateurs(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching organisateurs:', error);
      toast.error('Failed to load organisateurs');
      setLoading(false);
    }
  };

  const filteredOrganisateurs = organisateurs.filter(org =>
    org.nom.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    return sortOrder === 'asc' 
      ? a.nom.localeCompare(b.nom)
      : b.nom.localeCompare(a.nom);
  });

  
   // Gestion du changement de téléphone
   const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setFormData((prev) => ({
      ...prev,
         telephone: value,
    
    }));
  };
  const [locationData, setLocationData] = useState({
    pays: '',
    ville: '',
    quartier: '',
  });

  const handleLocationChange = (data) => {

    console.log("data")
    console.log(data?.code_pays)
    setLocationData(data);
    setcode_pays(data?.code_pays)
    setFormData((prevFormData) => ({
      ...prevFormData,
      pays: data.pays || "",
      ville: data.ville || "",
      indicatif_phone : data?.code_pays,
    
    }));
  
    console.log("Valeurs sélectionnées:", data);
  };
 

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
  console.log(formData)
    return false;
    try {
      await axios.post(`${API_URL}/organisateurs`, formData);
      toast.success('Organisateur created successfully');
      setIsCreateModalOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        type: 'company'
      });
      fetchOrganisateurs();
    } catch (error) {
      toast.error('Failed to create organisateur');
      console.error(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/organisateurs/${selectedOrganisateur.id}`, formData);
      toast.success('Organisateur updated successfully');
      setIsUpdateModalOpen(false);
      fetchOrganisateurs();
    } catch (error) {
      toast.error('Failed to update organisateur');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this organisateur?')) return;
    
    try {
      await axios.delete(`${API_URL}/organisateurs/${id}`);
      toast.success('Organisateur deleted successfully');
      fetchOrganisateurs();
    } catch (error) {
      toast.error('Failed to delete organisateur');
      console.error(error);
    }
  };

  
  
//   const Modal = ({ isOpen, onClose, title, children }) => {
//     return (
//       <AnimatePresence>
//         {isOpen && (
//           <>
//             <motion.div
//               className="modal-overlay"
//               variants={overlayVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               onClick={onClose}
//             />
//             <motion.div
//               className="modal-container"
//               variants={modalVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//             >
//               <div className="modal-header">
//                 <h2>{title}</h2>
//                 <button className="close-button" onClick={onClose}>&times;</button>
//               </div>
//               <div className="modal-content">
//                 {children}
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     );
//   };

  return (
    <div className="admin_datacontent organisateurs-container">
      <div className="header">
        <h1>Organisateurs</h1>
        <motion.button
          className="add-button"
          onClick={() => setIsCreateModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPlus /> nouveau
        </motion.button>
      </div>

      <div className="filters">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search organisateurs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="sort-container">
          <FaFilter />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Name (A-Z)</option>
            <option value="desc">Name (Z-A)</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrganisateurs.map(org => (
              <motion.tr
                key={org.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layout
              >
                <td>{org.nom}</td>
                <td>{org.email}</td>
                <td>{org.phone}</td>
                <td>{org.type}</td>
                <td>
                  <div className="action-buttons">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}

                      onClick={() => {
                        setSelectedOrganisateur(org);
                        setFormData({
                          name: org.name || '',
                          email: org.email || '',
                          phone: org.phone || '',
                          address: org.address || '',
                          type: org.type || 'company'
                        });
                        setIsUpdateModalOpen(true);
                      }}
                      
                    //   onClick={() => {
                    //     setSelectedOrganisateur(org);
                    //     // setFormData(org);
                    //     setIsUpdateModalOpen(true);
                    //   }}
                    >
                      <FaEdit />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(org.id)}
                    >
                      <FaTrash />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Add New Organisateur"
      >
        <form onSubmit={handleCreate} className="form">
            <div className="row">
            <div className="form-group">
            {/* <label></label> */}
            <input
              type="text"
              name="name"
              placeholder='nom'
              value={formData.name}
 
            //   value={formData.name}
              onChange={handleInputChange}  
            //   required
            />
          </div>
          <div className="form-group">
            {/* <label></label> */}
            <input
              type="email"
              placeholder='Email'
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
       
            </div>

            <div className="row">
                       
       
          <div className="line_data_a ">
            <div className="label_ttl">
                  <label className="ext_label">
                  domicile
                  </label>
              </div>
             <Locations className="inline_zone"
               inputdata ={{ 
                           
                              pays_name : 'pays',

                              ville_name: 'ville',
                             //  quartier_name: 'quartier'
               }} 
               onChange={handleLocationChange} />
         </div>
     
          <div className="form-group">
            {/* <label></label> */}
            <input type='adress'
              name="address"
              placeholder='indication'
              value={formData.address}
              onChange={handleInputChange}
            //   rows="3"
            />
          </div>
          <div className="form-group">
                         <div className="label_ttl">
                                  <label className="ext_label">
                                  <FontAwesomeIcon icon={faPhone} />
                
                                  </label>
                              </div>
                           
                          <div className="number_zone ">
                
                <div className="indicatif">
                
                <input type="text" 
                className="indicatif input_padding" 
                placeholder="code"
                value={code_pays} 
                onChange={(e) => setcode_pays(e.target.value)} />
                
                </div>
                
                <div className="tel_number">
                
                <input type="tel" className="contact input_padding" placeholder="numéro"
                    value={phoneNumber} onChange={handlePhoneChange}  />
                   
                </div>
                
                         </div>
                     
                            </div>
                
            </div>
          {/* <div className="form-group">
            <label>Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
            >
              <option value="company">Company</option>
              <option value="individual">Individual</option>
            </select>
          </div> */}
          <div className="form-actions">
            <motion.button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cancel-button"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="submit-button"
            >
              Create
            </motion.button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        title="Update Organisateur"
      >
        <form onSubmit={handleUpdate} className="form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
            >
              <option value="company">Company</option>
              <option value="individual">Individual</option>
            </select>
          </div>
          <div className="form-actions">
            <motion.button
              type="button"
              onClick={() => setIsUpdateModalOpen(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cancel-button"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="submit-button"
            >
              Update
            </motion.button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Organisateurs;
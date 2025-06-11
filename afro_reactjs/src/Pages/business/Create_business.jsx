import React, { useState } from 'react';

const Create_business = () => {
 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    companyAddress: '',
    companySector: '',
    services: []
  });

  const servicesList = [
    "Réserver un mannequin",
    "Réserver une hôtesse",
    "Engager une vloggueuse",
    "Organiser un casting",
    "Formation mannequin/hôtesse",
    "Participation à événements",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prevState => {
      if (checked) {
        return { ...prevState, services: [...prevState.services, value] };
      } else {
        return { ...prevState, services: prevState.services.filter(service => service !== value) };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Données envoyées:', formData);
    // Ici tu pourras ajouter ton appel API pour envoyer formData
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Créer votre compte entreprise</h2>

      {/* Section Vous êtes */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Vous êtes</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="Prénom"
            value={formData.firstName}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Nom"
            value={formData.lastName}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Téléphone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>
      </div>

      {/* Section Votre entreprise */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Votre entreprise</h3>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="companyName"
            placeholder="Nom de l'entreprise"
            value={formData.companyName}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="companyAddress"
            placeholder="Adresse"
            value={formData.companyAddress}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="companySector"
            placeholder="Secteur d'activité"
            value={formData.companySector}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>
      </div>

      {/* Section Vous désirez */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Vous désirez</h3>
        <div className="grid grid-cols-2 gap-2">
          {servicesList.map((service, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={service}
                checked={formData.services.includes(service)}
                onChange={handleServiceChange}
              />
              <span>{service}</span>
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Enregistrer
      </button>
    </form>
  );
};

export default Create_business;

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function Locations(props) {
  const apiUrl = 'https://apiafro.aafrodites.com';

// changement de méthode
const [queryCity, setQueryCity] = useState("");
const [queryCountry, setQueryCountry] = useState("");
const [selectedCity, setSelectedCity] = useState(null);
const [isCountryReadonly, setIsCountryReadonly] = useState(false);
const [showCitySuggestions, setShowCitySuggestions] = useState(false);
const [showCountrySuggestions, setShowCountrySuggestions] = useState(false);

const [suggestedCities, setSuggestedCities] = useState([]); // Liste complète des villes
const [filteredCities, setFilteredCities] = useState([]); // Liste filtrée des villes

const [suggestedCountries, setSuggestedCountries] = useState([]); // Liste complète des pays

// Récupérer les villes depuis l'API
useEffect(() => {
  axios.get(`${apiUrl}/locations/getAllVilles`)
    .then(response => setSuggestedCities(response.data))
    .catch(error => console.error('Erreur récupération des villes', error));
}, []);

// Récupérer la liste des pays depuis l'API
useEffect(() => {
  axios.get(`${apiUrl}/locations/getPays`)
    .then(response => setSuggestedCountries(response.data))
    .catch(error => console.error('Erreur récupération des pays', error));
}, []);

// Gestion de la saisie dans l'input ville
const handleCityChange = (e) => {
  const value = e.target.value;
  setQueryCity(value);
  setShowCitySuggestions(value.length > 1);

  if (value.length > 1) {
    const filtered = suggestedCities.filter((city) =>
      city.nomville.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCities(filtered);
  } else {
    setFilteredCities([]); // Réinitialise la liste si l'input est vide
  }

  const matchedCity = suggestedCities.find(
    (city) => city.nomville.toLowerCase() === value.toLowerCase()
  );

  if (matchedCity) {
    setSelectedCity(matchedCity);

    // Trouver le pays correspondant
    const matchedCountry = suggestedCountries.find(
      (country) => country.id === matchedCity.pays
    );

    setQueryCountry(matchedCountry ? matchedCountry.nom : "");
    setIsCountryReadonly(true);
  } else {
    setSelectedCity(null);
    setQueryCountry("");
    setIsCountryReadonly(false);
  }
};

// Sélection d'une ville dans la liste des suggestions
const handleCitySelect = (city) => {
  console.log("Ville sélectionnée:", city);

  // Trouver le pays correspondant
  const matchedCountry = suggestedCountries.find(
    (country) => country.id === city.pays
  );

  setQueryCity(city.nomville);
  setQueryCountry(matchedCountry ? matchedCountry.nom : ""); // Afficher le nom du pays
  setSelectedCity(city);
  setIsCountryReadonly(true);
  setShowCitySuggestions(false);
  setFilteredCities([]); // Réinitialiser la liste après sélection
};

  return (
    <>
   <div className="container_locations">
   <div className="item_list location_input">
     
      {/* <label>Ville :</label> */}
      <input
        type="text"
        placeholder="votre ville..."
        value={queryCity}
        onChange={handleCityChange}
        onFocus={() => setShowCitySuggestions(queryCity.length > 1)}
        onBlur={() => setTimeout(() => setShowCitySuggestions(false), 200)}
      />
      {/* {showCitySuggestions && (
        <ul className="suggestions">
          {suggestedCities.map((city) => (
            <li key={city.idville} onClick={() => handleCitySelect(city)}>
              {city.nomville}
            </li>
          ))}
        </ul>
      )} */}

<div className={`suggestions ${(showCitySuggestions && filteredCities.length > 0) ? 'active' : ''}`}>
  {filteredCities.length > 0 ? (
    filteredCities.map((city) => (
      <li key={city.idville} onClick={() => handleCitySelect(city)}>
        {city.nomville}
      </li>
    ))
  ) : (
    <li>Aucune ville trouvée</li>
  )}
</div>

 </div>
 <div className="item_list location_input col-12">
 <input
        type="text"
        placeholder="votre pays"
        value={queryCountry}
        onChange={handleCountryChange}
        readOnly={isCountryReadonly}
        onFocus={() => !isCountryReadonly && setShowCountrySuggestions(queryCountry.length > 1)}
        onBlur={() => setTimeout(() => setShowCountrySuggestions(false), 200)}
      />
      {showCountrySuggestions && !isCountryReadonly && (
        <ul className="suggestions">
          {suggestedCountries.map((country, index) => (
            <li key={index} onClick={() => handleCountrySelect(country)}>
              {country}
            </li>
          ))}
        </ul>
      )}

    </div>
  
    </div>
     
     
    </>
  );
}

export default Locations;

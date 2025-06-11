import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function Locations(props) {
  const apiUrl = 'https://apiafro.aafrodites.com';

  const [list_pays, setListpays] = useState([]);
  const [list_ville, setListville] = useState([]);
  const [list_quartier, setListquartier] = useState([]);

  const [selectedPays, setSelectedPays] = useState('');
  const [selectedVille, setSelectedVille] = useState('');
  const [selectedQuartier, setSelectedQuartier] = useState('');

  // Ref pour éviter un re-render infini
  const isFirstLoad = useRef(true);

  // console.log("props.inputdata")
  // console.log(props.inputdata)
  // Récupérer les données initiales à partir de props (chargé une seule fois)
  useEffect(() => {
    if (props.inputdata && isFirstLoad.current) {
      console.log("here data")
      console.log(props.inputdata.ville_name)
      setSelectedPays(props.inputdata.pays_name || '');
      setSelectedVille(props.inputdata.ville_name || '');
      setSelectedQuartier(props.inputdata.quartier_name || '');

      console.log("props.inputdata.pays_name")
      console.log(props.inputdata.pays_name)
      console.log(props.inputdata.ville_name)
      console.log(props.inputdata.quartier_name)
      isFirstLoad.current = false; // Empêche le rechargement infini
    }
  }, [props.inputdata]); 

  // Récupérer la liste des pays
  useEffect(() => {
    axios.get(`${apiUrl}/locations/getPays`)
      .then(response => setListpays(response.data))
      .catch(error => console.error('Échec de récupération de la liste des pays', error));
  }, []);

  // Récupérer la liste des villes lorsque le pays change
  useEffect(() => {
    if (selectedPays) {
      axios.get(`${apiUrl}/locations/getVilles/${selectedPays}`)
        .then(response => {
          setListville(response.data);
          setListquartier([]); // Réinitialiser les quartiers
          setSelectedVille(''); // Réinitialiser la ville sélectionnée
        })
        .catch(error => console.error('Échec de récupération de la liste des villes:', error));
    }
  }, [selectedPays]);

  // Récupérer la liste des quartiers lorsque la ville change
  useEffect(() => {
    if (selectedVille) {

      console.log("selectedVille")
      console.log(selectedVille)
      axios.get(`${apiUrl}/locations/getQuartiers/${selectedVille}`)
        .then(response => setListquartier(response.data))
        .catch(error => console.error('Échec de récupération de la liste des quartiers:', error));
    }
  }, [selectedVille]);

  // Appeler `onChange` pour transmettre les valeurs au parent
  useEffect(() => {
    if (props.onChange) {
      props.onChange({
        pays: selectedPays,
        ville: selectedVille,
        quartier: selectedQuartier,
      });
    }
  }, [selectedVille , selectedQuartier]);

  return (
    <>
      {/* Pays */}
      <div className="item_list location_input col-12">
        <fieldset>
          <label className="label">Votre pays</label>
          <select
            className="form-control form-control-lg"
            value={selectedPays}
            onChange={e => setSelectedPays(e.target.value)}
          >
            <option value="">Sélectionner votre pays</option>
            {list_pays.map(country => (
              <option key={country.id} value={country.id}>
                {country.nom}
              </option>
            ))}
          </select>
        </fieldset>
      </div>

      {/* Villes */}
      <div className="item_list location_input col-12">

     

        <fieldset>
          <label className="label">Votre ville 
          {selectedVille} 

          </label>
          <select
            className="form-control form-control-lg"
            value=  {selectedVille} 
            onChange={e => setSelectedVille(e.target.value)}
            disabled={!selectedPays}
          >
            <option value="">Sélectionner votre ville</option>
            {list_ville.map(ville => (
              <option key={ville.idville} value={ville.idville}>
                {ville.nomville} 
              </option>
            ))}
          </select>
        </fieldset>
      </div>

      {/* Quartiers */}
      <div className="item_list location_input col-12">
        <fieldset>
          <label className="label">Quartier</label>
          <select
            className="form-control form-control-lg"
            value={selectedQuartier}
            onChange={e => setSelectedQuartier(e.target.value)}
            disabled={!selectedVille}
          >
            <option value="">Sélectionner votre quartier</option>
            {list_quartier.map(quartier => (
              <option key={quartier.idquart} value={quartier.idquart}>
                {quartier.nomquartier}
              </option>
            ))}
          </select>
        </fieldset>
      </div>
    </>
  );
}

export default Locations;









// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Locations(props) {
//   const apiUrl = 'https://apiafro.aafrodites.com';

//   console.log('data recup')     
//   console.log(props)
//   const [list_pays, setListpays] = useState([]);
//   const [list_ville, setListville] = useState([]);
//   const [list_quartier, setListquartier] = useState([]);

//   const [selectedPays, setSelectedPays] = useState('');
//   const [selectedVille, setSelectedVille] = useState('');
//   const [selectedQuartier, setSelectedQuartier] = useState('');

//   // Récupérer les données initiales à partir de props
//   useEffect(() => {
//     if (props.inputdata) {
//       setSelectedPays(props.inputdata.pays_name || '');
//       setSelectedVille(props.inputdata.ville_name || '');
//       setSelectedQuartier(props.inputdata.quartier_name || '');
//     }
//   }, [props.inputdata]);

//   // Récupérer la liste des pays
//   useEffect(() => {
//     axios.get(`${apiUrl}/locations/getPays`)
//       .then(response => {
//         setListpays(response.data);
//       })
//       .catch(error => console.error('Échec de récupération de la liste des pays', error));
//   }, []);

//   // Récupérer la liste des villes lorsque le pays change
//   useEffect(() => {
//     if (selectedPays) {
//       axios.get(`${apiUrl}/locations/getVilles/${selectedPays}`)
//         .then(response => {
//           setListville(response.data);
//           setListquartier([]); // Réinitialiser les quartiers
//         })
//         .catch(error => console.error('Échec de récupération de la liste des villes:', error));
//     }
//   },
//    [selectedPays]
//   //  [selectedPays]
// );

//   // Récupérer la liste des quartiers lorsque la ville change
//   useEffect(() => {
//     if (selectedVille) {
//       axios.get(`${apiUrl}/locations/getQuartiers/${selectedVille}`)
//         .then(response => {
//           setListquartier(response.data);
//         })
//         .catch(error => console.error('Échec de récupération de la liste des quartiers:', error));
//     }
//   },
//    [selectedVille]
//   //  [selectedVille]
//   );

//   // Appeler la fonction `onChange` pour transmettre les valeurs au parent
//   useEffect(() => {
//     if (props.onChange) {
//       props.onChange({
//         pays: selectedPays,
//         ville: selectedVille,
//         quartier: selectedQuartier,
//       });
//     }
//   },
//   //  [selectedQuartier]
//    [selectedPays, selectedVille, selectedQuartier]
//   );

//   return (
//     <>
//       {/* Pays */}
//       <div className="item_list location_input col-12">
//         <fieldset>
//           <label className="label">Votre pays</label>
//           <select
//             className="form-control form-control-lg"
//             value={selectedPays}
//             onChange={e => setSelectedPays(e.target.value)}
//           >
//             <option value="">Sélectionner votre pays</option>
//             {list_pays.map(country => (
//               <option key={country.id} value={country.id}>
//                 {country.nom}
//               </option>
//             ))}
//           </select>
//         </fieldset>
//       </div>

//       {/* Villes */}
//       <div className="item_list location_input col-12">
//         <fieldset>
//           <label className="label">Votre ville</label>
//           <select
//             className="form-control form-control-lg"
//             value={selectedVille}
//             onChange={e => setSelectedVille(e.target.value)}
//             disabled={!selectedPays}
//           >
//             <option value="">Sélectionner votre ville</option>
//             {list_ville.map(ville => (
//               <option key={ville.idville} value={ville.idville}>
//                 {ville.nomville}
//               </option>
//             ))}
//           </select>
//         </fieldset>
//       </div>

//       {/* Quartiers */}
//       {/* {props.inputdata.quartier_name && */}
//         <div className="item_list location_input col-12">
//           <fieldset>
//             <label className="label">Quartier</label>
//             <select
//               className="form-control form-control-lg"
//               value={selectedQuartier}
//               onChange={e => setSelectedQuartier(e.target.value)}
//               disabled={!selectedVille}
//             >
//               <option value="">Sélectionner votre quartier</option>
//               {list_quartier.map(quartier => (
//                 <option key={quartier.idquart} value={quartier.idquart}>
//                   {quartier.nomquartier}
//                 </option>
//               ))}
//             </select>
//           </fieldset>
//         </div>
//       {/* } */}
//     </>
//   );
// }

// export default Locations;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Locations(props) {
//   const apiUrl = 'https://apiafro.aafrodites.com';

//   const [list_pays, setListpays] = useState([]);
//   const [list_ville, setListville] = useState([]);
//   const [list_quartier, setListquartier] = useState([]);

//   const [selectedPays, setSelectedPays] = useState('');
//   const [selectedVille, setSelectedVille] = useState('');
//   const [selectedQuartier, setSelectedQuartier] = useState('');

//   // Initialisation des valeurs par défaut depuis les props
//   useEffect(() => {
//     if (props.inputdata) {
//       setSelectedPays(props.inputdata.pays_name || '');
//       setSelectedVille(props.inputdata.ville_name || '');
//       setSelectedQuartier(props.inputdata.quartier_name || '');
//     }
//   }, [props.inputdata]);

//   // Récupérer la liste des pays
//   useEffect(() => {
//     axios.get(`${apiUrl}/locations/getPays`)
//       .then(response => {
//         setListpays(response.data);
//       })
//       .catch(error => console.error('Échec de récupération de la liste des pays', error));
//   }, []);

//   // Récupérer la liste des villes lorsque le pays change
//   useEffect(() => {
//     if (selectedPays) {
//       console.log("selectedPays")
//     alert(selectedPays)
//       axios.get(`${apiUrl}/locations/getVilles/${selectedPays}`)
//         .then(response => {
//           setListville(response.data);
//           setListquartier([]); // Réinitialiser les quartiers
//         })
//         .catch(error => console.error('Échec de récupération de la liste des villes:', error));
//     }
//   }, [selectedPays]);

//   // Récupérer la liste des quartiers lorsque la ville change
//   useEffect(() => {
//     if (selectedVille) {
//       axios.get(`${apiUrl}/locations/getQuartiers/${selectedVille}`)
//         .then(response => {
//           setListquartier(response.data);
//         })
//         .catch(error => console.error('Échec de récupération de la liste des quartiers:', error));
//     }
//   }, [selectedVille]);

//   // Appeler la fonction `onChange` pour transmettre les valeurs au parent
//   useEffect(() => {
//     if (props.onChange) {
//       props.onChange({
//         pays: selectedPays,
//         ville: selectedVille,
//         quartier: selectedQuartier,
//       });
//     }
//   }, [selectedPays, selectedVille, selectedQuartier]); // Déclenche quand une valeur change

//   return (
//     <>
//       {/* Pays */}
//       <div className="item_list location_input col-12">
//         <fieldset>
//           <label className="label">Votre pays</label>
//           <select
//             className="form-control form-control-lg"
//             name={props.inputdata.pays_name}
//             value={selectedPays}
//             onChange={e => setSelectedPays(e.target.value)}
//           >
//             <option value="">Sélectionner votre pays</option>
//             {list_pays.map(country => (
//               <option key={country.id} value={country.id}>
//                 {country.nom}
//               </option>
//             ))}
//           </select>
//         </fieldset>
//       </div>

//       {/* Villes */}
//       <div className="item_list location_input col-12">
//         <fieldset>
//           <label className="label">Votre ville</label>
//           <select
//             className="form-control form-control-lg"
//             name={props.inputdata.ville_name}
//             value={selectedVille}
//             onChange={e => setSelectedVille(e.target.value)}
//             disabled={!selectedPays}
//           >
//             <option value="">Sélectionner votre ville</option>
//             {list_ville.map(ville => (
//               <option key={ville.idville} value={ville.idville}>
//                 {ville.nomville}
//               </option>
//             ))}
//           </select>
//         </fieldset>
//       </div>

//       {/* Quartiers */}
//       {props.inputdata.quartier_name &&
//         <div className="item_list location_input col-12">
//           <fieldset>
//             <label className="label">Quartier</label>
//             <select
//               className="form-control form-control-lg"
//               name={props.inputdata.quartier_name}
//               value={selectedQuartier}
//               onChange={e => setSelectedQuartier(e.target.value)}
//               disabled={!selectedVille}
//             >
//               <option value="">Sélectionner votre quartier</option>
//               {list_quartier.map(quartier => (
//                 <option key={quartier.idquart} value={quartier.idquart}>
//                   {quartier.nomquartier}
//                 </option>
//               ))}
//             </select>
//           </fieldset>
//         </div>
//       }
//     </>
//   );
// }

// export default Locations;





// // import React from 'react'

// import  { useEffect, useState} from 'react'
// import axios from 'axios'
// function Locations(props) {
//   const apiUrl = 'https://apiafro.aafrodites.com';

//   const [list_pays, setListpays] = useState([]);
//   const [list_ville, setListville] = useState([]);
//   const [list_quartier, setListquartier] = useState([]);

//   const [selectedPays, setSelectedPays] = useState('');
//   const [selectedVille, setSelectedVille] = useState('');
//   const [selectedQuartier, setSelectedQuartier] = useState('');

//   // Récupérer la liste des pays
//   useEffect(() => {
//     axios.get(`${apiUrl}/locations/getPays`)
//       .then(response => {
//         setListpays(response.data);
//       })
//       .catch(error => console.error('Échec de récupération de la liste des pays', error));
//   }, []);

//   // Récupérer la liste des villes lorsque le pays change
//   useEffect(() => {
//     if (selectedPays) {
//       axios.get(`${apiUrl}/locations/getVilles/${selectedPays}`)
//         .then(response => {
//           setListville(response.data);
//           setListquartier([]); // Réinitialiser les quartiers
//         })
//         .catch(error => console.error('Échec de récupération de la liste des villes:', error));
//     }
//   }, [selectedPays]);

//   // Récupérer la liste des quartiers lorsque la ville change
//   useEffect(() => {
//     if (selectedVille) {
//       axios.get(`${apiUrl}/locations/getQuartiers/${selectedVille}`)
//         .then(response => {
//           setListquartier(response.data);
//         })
//         .catch(error => console.error('Échec de récupération de la liste des quartiers:', error));
//     }
//   }, [selectedVille]);

//   // Appeler la fonction `onChange` pour transmettre les valeurs au parent
//   useEffect(() => {
//     if (props.onChange) {
//       props.onChange({
//         pays: selectedPays,
//         ville: selectedVille,
//         quartier: selectedQuartier,
//       });
//     }
//   }, [selectedPays, selectedVille, selectedQuartier]); // Déclenche quand une valeur change

//   return (
//     <>
//       {/* Pays */}
//       <div className="item_list location_input col-12">
//         <fieldset>
//           <label className="label">Votre pays</label>
//           <select
//             className="form-control form-control-lg"
//             name={props.inputdata.pays_name}
//             value={selectedPays}
//             onChange={e => setSelectedPays(e.target.value)}
//           >
//             <option value="">Sélectionner votre pays</option>
//             {list_pays.map(country => (
//               <option key={country.id} value={country.id}>
//                 {country.nom}
//               </option>
//             ))}
//           </select>
//         </fieldset>
//       </div>

//       {/* Villes */}
//       <div className="item_list location_input col-12">
//         <fieldset>
//           <label className="label">Votre ville</label>
//           <select
//             className="form-control form-control-lg"
//             name={props.inputdata.ville_name}
//             value={selectedVille}
//             onChange={e => setSelectedVille(e.target.value)}
//             disabled={!selectedPays}
//           >
//             <option value="">Sélectionner votre ville</option>
//             {list_ville.map(ville => (
//               <option key={ville.idville} value={ville.idville}>
//                 {ville.nomville}
//               </option>
//             ))}
//           </select>
//         </fieldset>
//       </div>

//       {/* Quartiers */}
//       {props.inputdata.quartier_name &&
//       (
//         <>
//   <div className="item_list location_input col-12">
//         <fieldset>
//           <label className="label">Quartier</label>
//           <select
//             className="form-control form-control-lg"
//             name={props.inputdata.quartier_name}
//             value={selectedQuartier}
//             onChange={e => setSelectedQuartier(e.target.value)}
//             disabled={!selectedVille}
//           >
//             <option value="">Sélectionner votre quartier</option>
//             {list_quartier.map(quartier => (
//               <option key={quartier.idquart} value={quartier.idquart}>
//                 {quartier.nomquartier}
//               </option>
//             ))}
//           </select>
//         </fieldset>
//       </div>
//         </>
//       )}
    
//     </>
//   );
// }

// export default Locations;

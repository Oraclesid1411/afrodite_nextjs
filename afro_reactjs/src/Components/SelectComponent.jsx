// import React from 'react';

const SelectComponent = ({ options, label, value, onChange, id, defaultValue }) => {
 console.log("options")
 console.log(options)
 
  return (
    <div className="select-container">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{defaultValue || 'Sélectionnez une option'}</option>
        {options.map((option) => (
          <option key={option.collab_id} value={option.collab_id}>
            {/* {option.collab_id || '-'} */}
            {option.nom || '-'}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;

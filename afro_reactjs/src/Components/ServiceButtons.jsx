// components/ServiceButtons.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ServiceButtons = () => {
  return (
    <div className="services_listing">
      <div className="row px-2">
        <div className="col-4 item">
          <button className="custom-dropdown-link">
            <Link className='custom_title' to={"/postuler"} state={{ demande: "devenir afrodite" }}>
              Devenez<br />une<br />Afrodite
            </Link>
          </button>
        </div>

        <div className="col-4 item">
          <button className="custom-dropdown-link">
            <Link className='custom_title' to={"/creercomptebusiness"} state={{ demande: "engager une afrodite" }}>
              Mettez de<br />l'Afrodites dans<br />votre Com.
            </Link>
          </button>
        </div>

        <div className="col-4 item">
          <button className="custom-dropdown-link">
            <Link className='custom_title' to={"/creerfranchise"} state={{ demande: "creer franchise" }}>
              Créez une<br />franchise<br />Afrodite
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};


export default React.memo(ServiceButtons);
// export default ServiceButtons;

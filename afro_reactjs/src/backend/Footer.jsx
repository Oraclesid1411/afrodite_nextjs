import React ,{useContext}from 'react';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faCartFlatbed } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from "../Context/AuthenticateContext.jsx";
const Footer = () => {

    const auth = useAuth();

    const user_info = auth.currentUser
    const {logout} = auth.logout
    var tabs = [];
// console.log('user_info')
// console.log(user_info)
// console.log('user_info')
 if((user_info != undefined) || (user_info != null)){
       tabs = [{
        // button moi 
        
        // route: "/accessoire",
        link: "/profile",
        icon: faUser,
        label: "Moi",
      
        
        
      },{
        // button acceuil
      
        // route: "/cosmetique",
        icon: faHome,
        link: "/",
        label: "Accueil",
        
      },{
        // button cart
      
        // route: "/vetements",
        link: "/cart",
        icon: faCartFlatbed,
        label: "Panier",
        
       }]
}
else{
     tabs = [{
        // button moi 
        
        // route: "/accessoire",
        link: "/login",
        icon: faUser,
        label: "Moi",
      
        
        
      },{
        // button acceuil
      
        // route: "/cosmetique",
        icon: faHome,
        link: "/",
        label: "Accueil",
        
      },{
        // button cart
      
        // route: "/vetements",
        link: "/cart",
        icon: faCartFlatbed,
        label: "Panier",
        
      }]
}

  return (
    <>
        <footer id="bottom_nav" className="mt-100 overflow-hidden footer-style-2">
        <div >
            {/* Bottom Tab Navigator*/}
            <nav className="navbar fixed-bottom navbar-light" role="navigation">
            <Nav className="w-100">
              <div className=" d-flex flex-row justify-content-around w-100">
                {
                  tabs.map((tab, index) =>(
                    <NavItem key={`tab-${index}`}>
                      <NavLink href={tab.link} className="nav-link" activeClassName="active">
                        <div className="row d-flex flex-column justify-content-center align-items-center">
                          <FontAwesomeIcon size="sm" icon={tab.icon}/>
                          <div className='label_sm'>{tab.label}</div>
                        </div>
                      </NavLink>
                    </NavItem>
                  ))
                }
              </div>
            </Nav>
          </nav>
        </div>
        </footer>

        
    </>
  )
}

export default Footer

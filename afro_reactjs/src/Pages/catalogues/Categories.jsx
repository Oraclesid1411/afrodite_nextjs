// import React from 'react'
import {useEffect, useState } from "react";

import { useAuth } from "../../Context/AuthenticateContext.jsx";

import {
    Link,
    NavLink,
  } from "react-router-dom";

  import { useLocation  } from 'react-router-dom'; 

//   import $ from "jquery";
  
// import { AuthContext } from '../context/authContext';
 import Back_btn from "../../Components/Back_btn.jsx";
 import Header_banner from "../../Components/Header_banner.jsx";

 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
 import { faPlus } from '@fortawesome/free-solid-svg-icons'

function Categories() {
    const auth = useAuth();
          

    const user_info = auth.currentUser

    console.log(user_info)


  return (
    <>
       <div className="body-wrapper">
                <Header_banner  data_props ={{ 
                                    title: 'choix de catégories',
                            }} 
                            data_page = {{type: "catalogues" , back_option: "on"}}
                />
              <main id="MainContent" className="content-for-layout">
                 <div className="cart-page box_border">
                    <div className="container">
                    <div className="faq-container">
                    <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                                <div className="faq-item rounded">
                                        <h2 className="faq-heading heading_18 collapsed d-flex align-items-center justify-content-between" data-bs-toggle="collapse" data-bs-target="#faq1">
                                          cataloguer un produit
                                            <span className="faq-heading-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F76B6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-down">
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                            </span>
                                        </h2>
                                        <div id="faq1" className="accordion-collapse collapse bg_white custom_accord show">
                                             <div className="li_item ">
                                                 <Link to="/create_produit/1" state={ {previousPath: location.pathname} } className="relative_bottombtn">
                                                                    <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/>
                                                                <a href="#">
                                                              vêtements
                                                                </a>     
                                                                
                                                                    
                                             </Link>
                                             </div>
                                             <div className="li_item ">
                                             <Link to="/create_produit/2" state={ {previousPath: location.pathname} } className="relative_bottombtn">
                                                                    <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/>
                                                                <a href="#">
                                                              Accessoires
                                                                </a>     
                                                                
                                                                    
                                             </Link>
                                             </div>
                                             <div className="li_item ">
                                             <Link to="/create_produit/3" state={ {previousPath: location.pathname} } className="relative_bottombtn">
                                                                    <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/>
                                                                <a href="#">
                                                              Cosmétiques
                                                                </a>     
                                                                
                                                                    
                                             </Link>
                                             </div>
                                             <div className="li_item ">
                                             <Link to="/create_produit/4" state={ {previousPath: location.pathname} } className="relative_bottombtn">
                                                                    <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/>
                                                                <a href="#">
                                                              Cheveux
                                                                </a>     
                                                                
                                                                    
                                             </Link>
                                             </div>
                                            </div>
                                        </div>

                                        <div className="faq-item rounded">
                                        <h2 className="faq-heading heading_18 collapsed d-flex align-items-center justify-content-between" data-bs-toggle="collapse" data-bs-target="#services">
                                          cataloguer un service
                                            <span className="faq-heading-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F76B6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-down">
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                            </span>
                                        </h2>
                                        <div id="services" className="accordion-collapse collapse">
                                            <p className="faq-body text_14">Lorem ipsum dolor sit amet consectetur
                                                adipisicing elit.
                                                Sit repellat
                                                quod facere illo esse cumque inventore veniam necessitatibus totam
                                                repudiandae. Hic rerum animi modi sed?
                                            </p>
                                        </div>
                                        </div>
                    </div>
                    </div>

                    </div>

                    </div>
                    

                 </div>
              </main>

       </div>


    </>
  )
}

export default Categories
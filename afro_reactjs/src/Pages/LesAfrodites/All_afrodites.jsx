import React, {useState, useEffect} from 'react'

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function All_afrodite(props) {

    const [current_link, setCurrentLink] = useState("");


    useEffect(() => {
      
        const fetchData = async () => {
         
            // if(location?.state != null || location?.state != undefined){
                setCurrentLink(props?.data?.link)
            // }
        };
        fetchData();
      });
 
  return (
    <>
                <div className="container_b pt-1 allAfro sticky_nav">
                    
                    <div className="card_b py-0">


                        <ul className="main-menu list-unstyled justify-content-around d-flex py-0">

                    {current_link === "mannequins" ?
                    (
                        <>

                                    <li className="menu-list-item nav-item active" style={{ borderBottom: '2px solid #ff5733', padding : '2px'}}>
                                        <a className="nav-link" href="/mannequins">mannequins</a>
                                    </li>
                                    <li className="menu-list-item nav-item" style={{ padding : '2px'}} >
                                        <a className="nav-link" href="/hodesse_accueil">hotesses</a>
                                    </li>

                                    <li className="menu-list-item nav-item" style={{ padding : '2px'}}>
                                        <a className="nav-link" href="/influenceur">influenceurs</a>
                                    </li>

                                  

                                   

                        </>

                    ) : current_link === "hotesse" ? (

                        <>

                            <li className="menu-list-item nav-item" style={{ padding : '2px'}}>
                                <a className="nav-link" href="/mannequins">mannequins</a>
                            </li>

                          


                            <li className="menu-list-item nav-item active"style={{ borderBottom: '2px solid #ff5733', padding : '2px'}}>
                                <a className="nav-link" href="/hodesse_accueil">hotesses d&apos;accueil</a>
                            </li>
                            <li className="menu-list-item nav-item" style={{ padding : '2px'}}>
                                <a className="nav-link" href="/influenceur">influenceurs</a>
                            </li>

                           
                        </>

                    )  : current_link === "influenceur" ? ( 

                        <>

                        <li className="menu-list-item nav-item" style={{padding : '2px'}}>
                            <a className="nav-link" href="/mannequins">mannequins</a>
                        </li>

                        

                       

                        <li className="menu-list-item nav-item" style={{ padding : '2px'}}>
                            <a className="nav-link" href="/hodesse_accueil">hotesses d&apos;accueil</a>
                        </li>
                        <li className="menu-list-item nav-item active" style={{ borderBottom: '2px solid #ff5733', padding : '2px'}}>
                            <a className="nav-link" href="/influenceur">influenceurs</a>
                        </li>

                         </>

                    ): null}

                        
                        </ul>
                        
                    </div>

                </div>                                             
                    
    </>
  )
}

export default All_afrodite;
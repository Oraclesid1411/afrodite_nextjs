import React, { useEffect, useState, useRef  } from 'react'

import { Route, Link, Routes, useLocation,useLoaderData } from 'react-router-dom';
import axios from 'axios'

import Glider from 'react-glider';
import 'glider-js/glider.min.css'; 

export const lesvetemets_dames = async ({ params }) => {

  console.log(params)
  // vetement homme
 
  const res_1 = await axios.get('/products/haut_dame')
  const res_2 = await axios.get('/products/bas_dame') 
  const res_3 = await axios.get('/products/combis_dame') 
  const res_4 = await axios.get('/products/lingerie_dame') 

  // vetement dame

  // service vetement homme 

  // service vetement dame
  
  return { return_1: res_1.data, return_2: res_2.data , res_1: res_3.data, return_4: res_4.data };
};
 

const Bas_dame = () => {
  // liste des vetements
  const { return_1 } = useLoaderData();
  const { return_2 } = useLoaderData();
  const { return_3 } = useLoaderData();
  const { return_4 } = useLoaderData();
 
  
  const index_page = document.querySelector('body')
  console.log(index_page)

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  const INTERVAL = 4000;
  const MAX = 100;
  const intervalRef = React.useRef(null) ,  intervalRef_b = React.useRef(null) ,  intervalRef_c = React.useRef(null) ,  intervalRef_d = React.useRef(null);
        
        const callbackRef = React.useCallback(
            (glider) => {
            if (glider) {
                if (!intervalRef.current) {
                intervalRef.current = setInterval(() => {
                    let index = glider.page;
                    console.log(index)
                    if (index < MAX) {
                    index += 1;
                    } else {
                    index = 0;
                    }
                    glider.scrollItem(index, false);
                }, INTERVAL);
                }
            }
            },
            [intervalRef]
        );
        const callbackRef_b = React.useCallback(
            (glider) => {
            if (glider) {
                if (!intervalRef_b.current) {
                    intervalRef_b.current = setInterval(() => {
                    let index = glider.page;
                    if (index < MAX) {
                    index += 1;
                    } else {
                    index = 0;
                    }
                    glider.scrollItem(index, false);
                }, INTERVAL);
                }
            }
            },
            [intervalRef_b]
        );

        const callbackRef_c = React.useCallback(
            (glider) => {
            if (glider) {
                if (!intervalRef_c.current) {
                    intervalRef_c.current = setInterval(() => {
                    let index = glider.page;
                    if (index < MAX) {
                    index += 1;
                    } else {
                    index = 0;
                    }
                    glider.scrollItem(index, false);
                }, INTERVAL);
                }
            }
            },
            [intervalRef_c]
        );

        const callbackRef_d = React.useCallback(
            (glider) => {
            if (glider) {
                if (!intervalRef_d.current) {
                    intervalRef_d.current = setInterval(() => {
                    let index = glider.page;
                    if (index < MAX) {
                    index += 1;
                    } else {
                    index = 0;
                    }
                    glider.scrollItem(index, false);
                }, INTERVAL);
                }
            }
            },
            [intervalRef_d]
        );

                
        React.useEffect(
            () => () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            if (intervalRef_b.current) {
                clearInterval(intervalRef_b.current);
                intervalRef_b.current = null;
            }
            if (intervalRef_c.current) {
                clearInterval(intervalRef_c.current);
                intervalRef_c.current = null;
            }
            if (intervalRef_d.current) {
                clearInterval(intervalRef_d.current);
                intervalRef_d.current = null;
            }
            },
           
                [intervalRef],
                [intervalRef_b],
                [intervalRef_c],
                [intervalRef_d]

          
         
        );
        const [, setValue] = React.useState(null);

  return (
    <div>
         <main id="MainContent" className="content-for-layout">
                
                <div className="slideshow-section position-relative">
               
                   <input className='hide'
                   type="button"
                   onClick={() => setValue(Math.random())}
                   value="Set state (re-render)"
                   />
             
                   <div className="top_slider">
                       <div className="left_one">
                           <div className="title">
                               <Link to='/vetements' className='cst_link'>Haut</Link>
                           </div>
                           <Glider
                               draggable
                               rewind
                               ref={callbackRef}
                               // hasArrows
                               // hasDots
                               slidesToShow={1}
                               slidesToScroll={0} 
                               className="glider_slider"
                               >
                                {return_1.map(vetement=>(
                                            <div className="produit" key={vetement.Mle_biens}>
                                               
                                               {/* {vetement.Mle_biens} */}
                                               {/* <img src="" alt= {vetement.path_image1} /> */}
                                               <Link  to={`detail_produit/${vetement.Mle_biens}/1`} className=''>
                                                 <img src={require(`../../assets/${vetement.path_image1}`)} alt={vetement.path_image1} />
                                               </Link>
                                                   {/* <img src={require('./assets/uploads/image/sell/historiques/vetements/11aba/2022-02-12-120621ensbl9.jpg')} alt="horse" /> */}
                                                   {/* <img src={require('./Fsecos/EYE GLASSES/')} alt="horse" /> */}
                                               
                                           </div>


                                       )
                                   )
                                }
                              
                           </Glider>


                       </div>
                       <div className="right_one">
                       <div className="title">
                               <Link to='/accessoire'  className='cst_link'>Bas</Link>
                           </div>
                           <Glider
                                   draggable
                                   rewind
                                   ref={callbackRef_b}
                                   // hasArrows
                                   // hasDots
                                   slidesToShow={1}
                                   slidesToScroll={0} 
                                   className="glider_slider"
                                   >
                           {return_2.map(vetement=>(
                                    <div className="produit" key={vetement.Mle_biens}>
                                               
                                    <Link  to={`detail_produit/${vetement.Mle_biens}/2`}   className=''>
                                    
                                            <img src={require(`../../assets/${vetement.path_image1}`)} alt={vetement.path_image1} />
                                    </Link>
                                        
                                </div>


                            )
                            )
                         }
                       
                          </Glider>


                       </div>
                 


                   </div>
                   <div className="bottom_slider">
                        <div className="left_one">
                           <div className="title">
                               <Link to='/detail_produit' className='cst_link'>services dames</Link>
                           </div>
                           <Glider slidesToShow={1} scrollLock scrollToSlide={0}    ref={callbackRef_c} rewind className="glider_slider" >
                           {return_3.map(vetement=>(
                                            <div className="produit" key={vetement.Mle_biens}>
                                               
                                               <Link  to={`detail_produit/${vetement.Mle_biens}/3`} className=''>
                                                     <img src={require(`../../assets/${vetement.path_image1}`)} alt={vetement.path_image1} />
                                               </Link>
                                               
                                           </div>


                                       )
                                   )
                                }
                          
                         </Glider>


                       </div>
                       <div className="right_one">
                            <div className="title">
                               <Link to='/cheveux'  className='cst_link'>services hommes</Link>
                           </div>
                               <Glider
                                   rewind
                                           draggable
                                           ref={callbackRef_d}
                                          
                                           slidesToShow={1}
                                           slidesToScroll={0} 
                                           className="glider_slider"
                                           >
                                           {return_4.map(vetement=>(
                                            <div className="produit" key={vetement.Mle_biens}>
                                               
                                               <Link  to={`detail_produit/${vetement.Mle_biens}/4`}   className=''>
                                                     <img src={require(`../../assets/${vetement.path_image1}`)} alt={vetement.path_image1} />
                                               </Link>
                                               
                                           </div>


                                       )
                                   )
                                }
                           </Glider>


                       </div>


                   </div>
                
                        
                </div>


        </main>
                     
    </div>
  )
}

export default Bas_dame

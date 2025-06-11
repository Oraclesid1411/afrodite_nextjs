import React from 'react'
import Hero from './Hero'

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Parteners from './Parteners';
import { Link } from 'react-router-dom';

function MainContent() {

    

    const settings = {
        arrows: true,
        dots: false,
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
//         prevArrow:  <button className='slick-prev custom-prev'>
//         <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="white"
//     >
//         <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         d="M15 19l-7-7 7-7"
//         />
//     </svg> 
// </button>,
// nextArrow: <button   className='slick-next custom-next'>    
                    
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="white"
//                     >
//                         <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M9 5l7 7-7 7"
//                         />
//                     </svg>
// </button>,
        responsive: [
            {
                breakpoint : 1024,
                settings:{
                    arrows: true,
                    slidesToShow:4,
                    slidesToScroll:1,
                     dots: false,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 5000,
                }
            },
            {
                breakpoint : 776,
                settings:{
                    arrows: true,
                    slidesToShow:3,
                    slidesToScroll:1,
                    autoplay: true,
                    infinite: true,
                    autoplaySpeed: 5000,
                }
            },
            
            {
                breakpoint : 576,
                settings:{
                    arrows: true,
                    slidesToShow:2,
                    slidesToScroll:1,
                    autoplay: true,
                    infinite: true,
                    autoplaySpeed: 5000,
                }
            },

        ],
     
    
       
      };
  
    

  return (
    <>
      <main id="MainContent" className="content-for-layout">

        <Hero/>
       

        {/* section des offres */}
             <div className=" overflow-hidden bg_white">
                <div className="nos_services">
                         
                    <div className="container ">
                        
                        <div className="row col-12 ">
                            <div className="col-12 col-lg-6 col-sm-12 serv_group">
                                <div className=" col-12 title_label">
                                    <label htmlFor="">Devenir un model afrodite</label>
                                </div>
                                <div className="col-6 col-lg-3 col-md-3 col-sm-4 bg_white services_item">
                                        <Link to={"/postuler/1"}>
                                            <button className='btn btnService'>
                                            FASHION
                                            </button>
                                        </Link>
                              
                              </div>
                              <div className="col-6 col-lg-3 col-md-3 col-sm-4 bg_white services_item">
                                        <Link to={"/postuler/3"}>
                                            <button className='btn btnService'>
                                            ROLE
                                            </button>
                                        </Link>
                              
                              </div>
                              <div className="col-6 col-lg-3 col-md-3 col-sm-4 bg_white services_item">
                                        <Link to={"/postuler/2"}>
                                            <button className='btn btnService'>
                                            HOST
                                            </button>
                                        </Link>
                              
                              </div>
                          

                            </div>
                            <div className="col-12 col-lg-6 col-sm-12 serv_group">
                            <div className=" col-12 title_label ">
                                    <label htmlFor="">Engager un model afrodite</label>
                                </div>
                                <div className="col-6 col-lg-3 col-md-3 col-sm-4 bg_white services_item">
                                        <Link to={"/mannequins"}>
                                            <button className='btn btnService'>
                                            FASHION
                                            </button>
                                        </Link>
                              
                              </div>

                              <div className="col-6 col-lg-3 col-md-3 col-sm-4 bg_white services_item">
                                        <Link to={"/influenceur"}>
                                            <button className='btn btnService'>
                                            ROLE
                                            </button>
                                        </Link>
                              
                              </div>

                              <div className="col-6 col-lg-3 col-md-3 col-sm-4 bg_white services_item">
                                        <Link to={"/hodesse_accueil"}>
                                            <button className='btn btnService'>
                                            HOST
                                            </button>
                                        </Link>
                              
                              </div>
                          
                          </div>
                            
                        </div>
                    </div>
                </div>
                <div className="container line mb-2">

                </div>
            </div>
       

        {/* end session des offres */}

            <div className="container apropos">
                <div>
                    <div className="col-12 text-center">
                    <h3 className='titleText'>
                        A PROPOS DE NOUS
                    </h3>
                    </div>
                    
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. dignissimos commodi omnis maiores et facere autem amet nulla minus, incidunt nostrum provident expedita eum.
                        Magnam alias quia dignissimos est olore. Nihil, repudiandae.
                      </p>
                     <p>
                        <a href="/weare" className='custom_a text-white'>
                              <img src="/assets/models/89.png" alt="" width={30}/> 
                                  Lire plus
                        </a>
                     </p>
                </div>
            </div>

        {/*session du Apropos */}

        
        {/*session des mannequins */}

            <div className='bg-white mannequins-section'>

                <div className="content">
                    <div className="title">
                      <label htmlFor="">  Nos fashion model</label>
                    </div>
                    <div className="slider text-center">
                        <Slider {...settings}>
                         

                            <div className='sliderContainer'>
                                <Link to='/single_view/1/1'>
                                    <img src="/assets/models/chi/chi1.webp" alt="mannequin" className='img'/>
                                    <a className="plus" href='/single_view/1/1'>
                                        <div>
                                            VOIR
                                        </div>
                                        <div>
                                            <img src="/assets/models/89.png" alt=""/>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                           
                            <div className='sliderContainer'>
                            <Link to='/single_view/1/2'>
                            <img src="/assets/models/damilola/1.png" alt="mannequin" className='img'/>
                            <a className="plus" href='/single_view/1/2'>
                                    <div>
                                        VOIR
                                    </div>
                                    <div>
                                        <img src="/assets/models/89.png" alt=""/>
                                    </div>
                                </a>
                                </Link>
                               
                            </div>
                            <div className='sliderContainer'>
                            <Link to='/single_view/1/4'>
                            <img src="/assets/models/diepiriye/2.jpg" alt="mannequin" className='img'/>
                            <a className="plus" href='/single_view/1/4'>
                                    <div>
                                        VOIR
                                    </div>
                                    <div>
                                        <img src="/assets/models/89.png" alt=""/>
                                    </div>
                                </a>
                                </Link>
                              
                            </div>
                            <div className='sliderContainer'>
                            <Link to='/single_view/1/5'>
                            <img src="/assets/models/jessie/1.jpg" alt="mannequin" className='img'/>
                            <a className="plus" href='/single_view/1/5'>
                                    <div>
                                        VOIR
                                    </div>
                                    <div>
                                        <img src="/assets/models/89.png" alt=""/>
                                    </div>
                                </a>
                                </Link>
                               
                            </div>
                            <div className='sliderContainer'>
                            <Link to='/single_view/1/6'>
                            <img src="/assets/models/grace3.jpeg" alt="mannequin"  className='img'/>
                                <a className="plus" href='/single_view/1/1'>
                                    <div>
                                        VOIR
                                    </div>
                                    <div>
                                        <img src="/assets/models/89.png" alt=""/>
                                    </div>
                                </a>
                                </Link>
                              
                            </div>
                            <div className='sliderContainer'>
                            <Link to='/single_view/1/6'>
                            <img src="/assets/models/munachimso/1.webp" alt="mannequin"  className='img'/>
                                <a className="plus" href='/single_view/1/1'>
                                    <div>
                                        VOIR
                                    </div>
                                    <div>
                                        <img src="/assets/models/89.png" alt=""/>
                                    </div>
                                </a>
                                </Link>
                              
                            </div>
                            <div className='sliderContainer'>
                            <Link to='/single_view/1/6'>
                            <img src="/assets/models/real/real1.webp" alt="mannequin"  className='img'/>
                                <a className="plus" href='/single_view/1/1'>
                                    <div>
                                        VOIR
                                    </div>
                                    <div>
                                        <img src="/assets/models/89.png" alt=""/>
                                    </div>
                                </a>
                                </Link>
                              
                            </div>
                            <div className='sliderContainer'>
                            <Link to='/single_view/1/6'>
                            <img src="/assets/models/tolulope/1.webp" alt="mannequin"  className='img'/>
                                <a className="plus" href='/single_view/1/1'>
                                    <div>
                                        VOIR
                                    </div>
                                    <div>
                                        <img src="/assets/models/89.png" alt=""/>
                                    </div>
                                </a>
                                </Link>
                              
                            </div>
                            <div className='sliderContainer'>
                            <Link to='/single_view/1/6'>
                            <img src="/assets/models/refilwe/1.jpg" alt="mannequin"  className='img'/>
                                <a className="plus" href='/single_view/1/1'>
                                    <div>
                                        VOIR
                                    </div>
                                    <div>
                                        <img src="/assets/models/89.png" alt=""/>
                                    </div>
                                </a>
                                </Link>
                              
                            </div>
                        </Slider>
                    </div>
                </div>
            
                <div className="plusMannequin">
                    {/* voir plus */}
                    <a href="/mannequins"> voir
                    <img src="/assets/models/add.png" alt=""/>
                    </a>
                 
                </div>
                
            </div>
            

        {/*fin session des mannequins */}






        {/*session des hotesses */}

        <div className='hotesse-section'>

                <div className="content">
                    
                    <div className="title">
                    <label htmlFor="">   Nos host model</label>
                      
                    </div>
                    <div className="slider text-center">
                        <Slider {...settings}>
                            <div className='sliderContainer'>
                            <img src="/assets/hotesses/11.jpg" alt="mannequin"  className='img'/>
                            <a className="plus" href='/single_view/1/1'>
                                    <div>
                                        VOIR
                                    </div>
                                    <div>
                                        <img src="/assets/models/89.png" alt=""/>
                                    </div>
                                </a>
                            </div>
                            <div className='sliderContainer'>
                                <img src="/assets/hotesses/1.jpg" alt="mannequin"  className='img'/>
                                <a className="plus" href='/single_view/1/1'>
                                    <div>
                                        VOIR
                                    </div>
                                    <div>
                                        <img src="/assets/models/89.png" alt=""/>
                                    </div>
                                </a>
                            </div>
                            <div className='sliderContainer'>
                            <img src="/assets/hotesses/2.jpg" alt="mannequin"  className='img'/>
                            <a className="plus" href='/single_view/1/1'>
                                    <div>
                                        VOIR
                                    </div>
                                    <div>
                                        <img src="/assets/models/89.png" alt=""/>
                                    </div>
                                </a>
                            </div>
                            <div className='sliderContainer'>
                            <img src="/assets/hotesses/3.jpg" alt="mannequin"  className='img'/>
                            <a className="plus" href='/single_view/1/1'>
                                    <div>
                                        VOIR
                                    </div>
                                    <div>
                                        <img src="/assets/models/89.png" alt=""/>
                                    </div>
                                </a>
                            </div>
                            <div className='sliderContainer'>
                            <img src="/assets/hotesses/4.jpg" alt="mannequin"  className='img'/>
                            <a className="plus" href='/single_view/1/1'>
                                    <div>
                                        VOIR
                                    </div>
                                    <div>
                                        <img src="/assets/models/89.png" alt=""/>
                                    </div>
                                </a>
                            </div>
                            <div className='sliderContainer'>
                            <img src="/assets/hotesses/5.jpg" alt="mannequin"  className='img'/>
                            <a className="plus" href='/single_view/1/1'>
                                    <div>
                                        VOIR
                                    </div>
                                    <div>
                                        <img src="/assets/models/89.png" alt=""/>
                                    </div>
                                </a>
                            </div>
                            <div className='sliderContainer'>
                            <img src="/assets/hotesses/6.jpg" alt="mannequin"  className='img'/>
                            <a className="plus" href='/single_view/1/1'>
                                    <div>
                                        VOIR
                                    </div>
                                    <div>
                                        <img src="/assets/models/89.png" alt=""/>
                                    </div>
                                </a>
                            </div>
                            <div className='sliderContainer'>
                            <img src="/assets/hotesses/7.jpg" alt="mannequin"  className='img'/>
                            <a className="plus" href='/single_view/1/1'>
                                    <div>
                                        VOIR
                                    </div>
                                    <div>
                                        <img src="/assets/models/89.png" alt=""/>
                                    </div>
                                </a>
                            </div>
                            <div className='sliderContainer'>
                            <img src="/assets/hotesses/8.jpg" alt="mannequin"  className='img'/>
                            <a className="plus" href='/single_view/1/1'>
                                    <div>
                                        VOIR
                                    </div>
                                    <div>
                                        <img src="/assets/models/89.png" alt=""/>
                                    </div>
                                </a>
                            </div>
                            <div className='sliderContainer'>
                            <img src="/assets/hotesses/9.jpg" alt="mannequin"  className='img'/>
                            <a className="plus" href='/single_view/1/1'>
                                    <div>
                                        VOIR
                                    </div>
                                    <div>
                                        <img src="/assets/models/89.png" alt=""/>
                                    </div>
                                </a>
                            </div>
                            <div className='sliderContainer'>
                            <img src="/assets/hotesses/10.jpg" alt="mannequin"  className='img'/>
                            <a className="plus" href='/single_view/1/1'>
                                    <div>
                                        VOIR
                                    </div>
                                    <div>
                                        <img src="/assets/models/89.png" alt=""/>
                                    </div>
                                </a>
                            </div>
                        </Slider>
                    </div>
                </div>

                <div className="plusHotesse">

                    <a href="/hodesse_accueil">
                     voir  <img src="/assets/models/add2.png" alt=""/>
                    </a>
                   
                </div>

            </div>


        {/*fin session des hotesses */}

     
        {/* session des partenaires */}

        {/* <Parteners /> */}
            <div className="partenaires">
               
                   <Parteners />

                {/* <div className="contain">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ff5500" fillOpacity="0.2" d="M0,128L48,117.3C96,107,192,85,288,106.7C384,128,480,192,576,213.3C672,235,768,213,864,186.7C960,160,1056,128,1152,101.3C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
                </div> */}
                    <svg className="svg_bg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ff5500" fillOpacity="0.2" d="M0,128L48,117.3C96,107,192,85,288,106.7C384,128,480,192,576,213.3C672,235,768,213,864,186.7C960,160,1056,128,1152,101.3C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        
            </div>


        {/*fin session des partenaires */}

        
          
      </main>
        

    </>
  )
}

export default MainContent
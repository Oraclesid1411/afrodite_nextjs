import React from 'react'

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Parteners() {

    const settings = {
        dots: false,
        arrows: false,
        centerMode: true,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint : 1024,
                settings:{
                    slidesToShow:5,
                    slidesToScroll:1,
                     dots: false,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 3000,
                }
            },
            {
                breakpoint : 728,
                settings:{
                    slidesToShow:3,
                    slidesToScroll:1,
                    autoplay: true,
                    infinite: true,
                    autoplaySpeed: 3000,
                }
            },
            

        ],
      
       
      };
  return (


    <>
    <div className="container partenaire_zone">
        <div className="row">

            
            <div className="partenaires_list">
                <ul>
                <Slider {...settings}>
                    <li>
                    <img src="/assets/img/brand/1.png" alt="mannequin" className='img'/>
                                                          
                    </li>
                    <li>
                    <img src="/assets/img/brand/2.png" alt="mannequin" className='img'/>
                                                          
                    </li>
                   
                    <li>
                    <img src="/assets/img/brand/3.png" alt="mannequin" className='img'/>
                                                          
                    </li>
                    <li>
                    <img src="/assets/img/brand/4.png" alt="mannequin" className='img'/>
                                                          
                    </li>
                    <li>
                    <img src="/assets/img/brand/5.png" alt="mannequin" className='img'/>
                                                          
                    </li>
                    <li>
                    <img src="/assets/img/brand/6.png" alt="mannequin" className='img'/>
                                                          
                    </li>
                    <li>
                    <img src="/assets/img/brand/7.png" alt="mannequin" className='img'/>
                                                          
                    </li>
                    <li>
                    <img src="/assets/img/brand/8.png" alt="mannequin" className='img'/>
                                                          
                    </li>
                    {/* <li>
                    <img src="/assets/img/brand/9.jpeg" alt="mannequin" className='img'/>
                                                          
                    </li> */}
                    <li>
                    <img src="/assets/img/brand/10.png" alt="mannequin" className='img'/>
                                                          
                    </li>
                    </Slider>
                </ul>
                </div>
        </div>
    </div>
    
    </>
  )
}

export default Parteners
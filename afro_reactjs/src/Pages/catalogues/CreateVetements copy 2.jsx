// import React from 'react'

import  { useEffect, useState} from 'react'
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
import image_a from "/assets/img/fs/vetements_default.jpeg"

import {
    Link,
    NavLink,
  } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faCamera, faImage } from '@fortawesome/free-solid-svg-icons'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { faPlus } from '@fortawesome/free-solid-svg-icons'

function CreateVetements() {

    
  const [upload_img, setUpload_img] = useState([]);  
  const [upload_file, setFile] = useState("");  
  const [images_gallery_boxshow, setimages_gallery_boxshow] = useState(false);  
  const [images_camera_boxshow, setImages_camera_boxshow] = useState(false);  
  const [nav1, setNav1] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slider1, setSlider1] = useState(null);

  var tab_img = [];
  
  useEffect(() => {
    setNav1(slider1);
  }, [slider1]);

    const settings = {
    //   dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      autoplay: false,
      autoplaySpeed: 1000,
      onReInit: () => setCurrentSlide(slider1?.innerSlider.state.currentSlide),
      lazyLoad: true,
      asNavFor: ".slider-nav",
      focusOnSelect: true,
      nextArrow: (
        <div>
          <div className="next-slick-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" stroke="black" height="24" viewBox="0 -960 960 960" width="24"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/></svg>
          </div>
        </div>
      ),
  
      prevArrow: (
        <div>
          <div className="next-slick-arrow rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" stroke="black" height="24" viewBox="0 -960 960 960" width="24"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/></svg>
          </div>
        </div>
      ),
   };
   const cancel_uploading = () => {
    console.log('test')
    if(images_gallery_boxshow === true){
        setimages_gallery_boxshow(false)

    }
    if(images_camera_boxshow === true){
      setImages_camera_boxshow(false)

    }
  
  };
  const onImageChange = (e) => {
    console.log('test')
    console.log(e.target)
    console.log(e.target.files);
    // setUpload_img(tab_img);
   
    for(let i=0; i< e.target.files.length; i++ ){
    var this_path =   URL.createObjectURL(e.target.files[i]);
    tab_img.push({
      id: i + 1,
      src: this_path,
      alt: "image indisponible"
    })
      
      console.log('path')
      console.log(this_path)


    //   setUpload_img(e.target.files[i]);
    }

    setUpload_img(tab_img);
    setFile(e.target.files);
 
  };

    const Show_gallerybox = () => {
      console.log("gallery")
        if(images_gallery_boxshow === true){
        
            setimages_gallery_boxshow(false)
            // open gallery
           


        }
        else{
            setimages_gallery_boxshow(true)
            var select_img = document.querySelector('#select_img');
            console.log(select_img)
            select_img.click();

        }
      
      };
      const Show_camerabox = () => {
        if(images_camera_boxshow === true){
            setImages_camera_boxshow(false)

        }
        else{
            setImages_camera_boxshow(true)

        }
      
      };

      console.log(images_gallery_boxshow)
      console.log(images_camera_boxshow)
      var path_imgs = []
      path_imgs.push(
        {
            id: 1 , 
            src: image_a
        },
        {
            id: 2 , 
            src: image_a
        },
        {
            id: 3 , 
            src: image_a
        }
      )

      console.log("upload_img")
      console.log(upload_img)
      console.log('upload_file b')
      console.log(upload_file)

  return (
 
    <>
    <div className="body-wrapper">
      <main id="MainContent" className="content-for-layout creer_produit">

          {/* select option prise images */}
          <div className="container">
 
            
          <div className="option_image">
          
            {/* <div className="row">
                <label>Ajouter les images du produit</label>
            </div> */}
            <div className="row">
           
                    <div className="col-lg-6 col-md-6 col-6 inline_box camera_box">
                                    <div className="trusted-badge rounded p-0 ">
                                    <label htmlFor="" onClick={Show_camerabox} data-box="camera_box">
                                        <div className="trusted-icon">
                                        <FontAwesomeIcon size="sm" icon={faCamera} className='icon-trusted'/>
                                            {/* <img className="icon-trusted" src="assets/img/trusted/1.png" alt="icon-1"/> */}
                                        </div>
                                        <div className="trusted-content">
                                            <h2 className="heading_18 trusted-heading">caméra</h2>
                                            
                                        </div>


                                        </label>
                                       
                                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-6 inline_box">
                                    <div className="trusted-badge rounded p-0">
                                        <label htmlFor=""onClick={Show_gallerybox} data-box="gallery_box">
                                        <input id="select_img"  className='display_none' type="file" multiple accept="image/*" onChange={onImageChange} />
                                             <div className="trusted-icon">
                                               <FontAwesomeIcon size="sm" icon={faImage} className='icon-trusted'/>
                                            {/* <img className="icon-trusted" src="assets/img/trusted/1.png" alt="icon-1"/> */}
                                        </div>
                                        <div className="trusted-content">
                                            <h2 className="heading_18 trusted-heading">Gallérie</h2>
                                            
                                        </div>


                                        </label>
                                       
                                    </div>
                </div>


            </div>
       
          </div>
          {images_gallery_boxshow === false && images_camera_boxshow === false
            ?

            (
              null
            )

            : 

            (
              <>
               <div className="image_preview">
                
              {upload_img.length === 0 ?

                (
                  <>
                     <div id="gal_mask" className="mask_gal">  
                              <div className="container">
                                        
                                            <div  className='full_img_box none_img'>
                                            <div className="img-body expand_img ">
                                              
                                                {/* <img  src={image_a}  alt={item.alt} /> */}
                                            </div>
                                            
                                            </div>
                                        
                                        <div className="thumb-wrapper flex_center">
                                            
                                                <div className="" >
                                               
                                                
                                                    <label htmlFor='add_image' className='input_label'>
                                                           <input id="add_image"  className='display_none' type="file" multiple accept="image/*" onChange={onImageChange} />
                                           
                                                           <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/>
                                                        
                                                      </label>     
                                                                                        
                                                                                            
                                                   
                                                
                                                </div>
                                           
                                      </div>
                              </div>
                                
                              <div className="fixedbtn_box">
                              <div className="col-6 col-sm-6 col-md-6">
                                  <Link to="#" className="link_cst cancel_btn" onClick={cancel_uploading} >
                                        <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/>
                                          <a href="#">
                                              Annuler
                                            </a>     
                                                                              
                                                                                  
                                </Link>
                              </div>
                              <div className="col-6 col-sm-6 col-md-6">
                                  <Link to="#" className="link_cst confirm_btn">
                                        <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/>
                                          <a href="#">
                                              Passer
                                            </a>     
                                                                              
                                                                                  
                                </Link>
                              </div>
                          
                          </div>                     
                                  
                          </div>

                  </>

                )

                :
                (
                  <>
  
                          <div id="gal_mask" className="mask_gal">  
                              <div className="container">
                                        <Slider {...settings}  asNavFor={nav1} ref={(slider) => setSlider1(slider)} className="slider_full">
                                        {upload_img.map((item) => (
                                            <div key={item.id} className='full_img_box'>
                                            <div className="img-body expand_img">
                                                <img  src={item.CreateVetements?.src}  alt={item.alt} />
                                            </div>
                                            {/* <div>
                                                <h2>{item.title}</h2>
                                                <p>{item.description}</p>
                                            </div> */}
                                            </div>
                                        ))}
                                        </Slider>
                                        <div className="thumb-wrapper">
                                            {upload_img.map((item, idx) => (
                                                <div
                                                key={item.id}
                                                className={currentSlide === idx ? "active": null}
                                                onClick={() => {
                                                    slider1?.slickGoTo(idx)
                                                }}>
                                                   <img  src={item.CreateVetements?.src}  alt={item.alt} />
                                                {/* <img src={image_a} alt={item.alt}/> */}
                                                {currentSlide}
                                                </div>
                                            ))}
                                      </div>
                              </div>
                                
                              <div className="fixedbtn_box">
                              <div className="col-6 col-sm-6 col-md-6">
                                  <Link to="#" className="link_cst cancel_btn" onClick={cancel_uploading} >
                                        <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/>
                                          <a href="#">
                                              Annuler
                                            </a>     
                                                                              
                                                                                  
                                </Link>
                              </div>
                              <div className="col-6 col-sm-6 col-md-6">
                                  <Link to="#" className="link_cst confirm_btn">
                                        <FontAwesomeIcon size="sm" icon={faPlus} className='iconify'/>
                                          <a href="#">
                                              Suivant
                                            </a>     
                                                                              
                                                                                  
                                </Link>
                              </div>
                          
                          </div>                     
                                  
                          </div>
                        
                         
                    
               
                  </>
                )
              }



                </div>
              </>

            )
          }
          


          </div>
         

      </main>


    </div>
      

  </>
  )
}

export default CreateVetements
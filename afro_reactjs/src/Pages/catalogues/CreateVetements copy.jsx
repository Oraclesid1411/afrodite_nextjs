// import React from 'react'

import  { useEffect, useState} from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
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
  const [images_gallery_boxshow, setimages_gallery_boxshow] = useState(false);  
  const [images_camera_boxshow, setImages_camera_boxshow] = useState(false);  
  const [nav1, setNav1] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slider1, setSlider1] = useState(null);

  
  
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

    return false;
    if(images_gallery_boxshow === true){
        setimages_gallery_boxshow(false)

    }
    if(images_camera_boxshow === true){
      setImages_camera_boxshow(false)

    }
  
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
              {/* upload_img */}
              {upload_img.length === 0
                ?

                (
                  <>

                  </>

                )

                :
                (
                  <>
   <div className="image_preview">
                          <div id="gal_mask" className="mask_gal">  
                              <div className="container">
                                        <Slider {...settings}  asNavFor={nav1} ref={(slider) => setSlider1(slider)} className="slider_full">
                                        {path_imgs.map((item) => (
                                            <div key={item.id} className='full_img_box'>
                                            <div className="img-body expand_img">
                                                <img  src={image_a}  alt={item.alt} />
                                            </div>
                                            {/* <div>
                                                <h2>{item.title}</h2>
                                                <p>{item.description}</p>
                                            </div> */}
                                            </div>
                                        ))}
                                        </Slider>
                                        <div className="thumb-wrapper">
                                            {path_imgs.map((item, idx) => (
                                                <div
                                                key={item.id}
                                                className={currentSlide === idx ? "active": null}
                                                onClick={() => {
                                                    slider1?.slickGoTo(idx)
                                                }}>
                                                <img src={image_a} alt={item.alt}/>
                                                {currentSlide}
                                                </div>
                                            ))}
                                      </div>
                              </div>
                                
                                <div id="full_pic" className="image-gallery single_img" style={{display: "none"}}>
                                        <img src={image_a} /></div>   
                                    <ul id="thumbnails_cont" className="thumbnails" style={{display: "none"}}>

                                            <li data-path="uploads/temp_484_2024-08-19_122130/s2.jpg" data-name="s2.jpg" className="gal_im">
                                            <a id="select_img" onclick="change_bg(&quot;uploads/temp_484_2024-08-19_122130/s2.jpg&quot;)">
                                            <img src={image_a} data-get="uploads/temp_484_2024-08-19_122130/s2.jpg"/>
                                            </a>
                                            <div className="button_box"></div>
                                            <a className="buttonct button--winona fa fa-times text-danger" onclick="deleteimg(&quot;uploads/temp_484_2024-08-19_122130/s2.jpg&quot;)"></a>
                                            <a onclick="change_option('uploads/temp_484_2024-08-19_122130/s2.jpg','s2.jpg')" className=" buttonct_edit button--winona fa fa-edit text-secondary"></a>
                                            </li>
                                            <li data-path="uploads/temp_484_2024-08-19_122130/s3.jpg" data-name="s3.jpg" className="gal_im"><a id="select_img" onclick="change_bg(&quot;uploads/temp_484_2024-08-19_122130/s3.jpg&quot;)">
                                            <img src={image_a} data-get="uploads/temp_484_2024-08-19_122130/s3.jpg" />
                                            </a>
                                            <div className="button_box"></div>
                                            <a className="buttonct button--winona fa fa-times text-danger" onclick="deleteimg(&quot;uploads/temp_484_2024-08-19_122130/s3.jpg&quot;)"></a>
                                            <a onclick="change_option('uploads/temp_484_2024-08-19_122130/s3.jpg','s3.jpg')" className=" buttonct_edit button--winona fa fa-edit text-secondary"></a>
                                            </li>
                                            <li data-path="uploads/temp_484_2024-08-19_122130/s4.jpg" data-name="s4.jpg" className="gal_im">
                                            <a id="select_img" onclick="change_bg(&quot;uploads/temp_484_2024-08-19_122130/s4.jpg&quot;)">
                                            <img src={image_a} data-get="uploads/temp_484_2024-08-19_122130/s4.jpg"/>
                                            </a>
                                            <div className="button_box"></div>
                                            <a className="buttonct button--winona fa fa-times text-danger" onclick="deleteimg(&quot;uploads/temp_484_2024-08-19_122130/s4.jpg&quot;)">
                                            </a>
                                            <a onclick="change_option('uploads/temp_484_2024-08-19_122130/s4.jpg','s4.jpg')" className=" buttonct_edit button--winona fa fa-edit text-secondary"></a>
                                            </li>
                                            <label className="btn btn-default fa fa-plus" onclick="addnewonce_img(this)" id="add_img"></label>
                                            </ul>   
                                                        <form style={{display: "none"}} className="hide" id="img_del_form" action="https://lara.fashionecos.com/deletepic" method="POST">
                                                            <input type="hidden" name="_token" value="" />
                                                            <input type="hidden" id="del_img_inpt" name="delimg_path" value=""/>
                                                                
                                                        </form>                        
                                  
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
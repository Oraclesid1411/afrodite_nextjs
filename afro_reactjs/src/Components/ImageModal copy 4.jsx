import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom'
import { useLocation  } from 'react-router-dom'; 
import { useAuth } from "../Context/AuthenticateContext.jsx";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faShareAlt, faUserPlus, faUserCheck, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ImageModal = ({ image, data, onClose }) => {
  console.log(image)
  console.log(data)

    const auth = useAuth(); 
          const user_info = auth.currentUser 
      
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current image index
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
     
//    const [constributeurs, setContributeurs] = useState([]);
const [Photographe, setPhotographe] = useState([]);
const [styliste, setStyliste] = useState([]);
const [maquilleur, setMaquilleur] = useState([])
const [coiffeur, setCoiffeur] = useState([]);
 
axios.defaults.withCredentials = true;
const apiUrl = 'https://apiafro.aafrodites.com'
//  const apiUrl = 'http://localhost:5000' 


  const [images, setImages] = useState([data]);
  // const images = data; // Assuming 'data' is an array of images
  console.log("images")
  console.log(images)

// récupérer les stats du contenu
      //  like et share
      // const [likeCount, setLikeCount] = useState(0);
      // const [shareCount, setShareCount] = useState(0);
      // const [hasLiked, setHasLiked] = useState(false);
       // État pour savoir si l'utilisateur suit ou non
  const [isFollowing, setIsFollowing] = useState(false);

  // Fonction de gestion du clic sur le bouton "Suivre"
  const handleFollow = () => {
    setIsFollowing(!isFollowing);  // Inverse l'état du suivi
  };
      const [postId, setpostId] = useState(null);
      const userid = user_info?.id;
      console.log("userid")
      console.log(userid)
  
      async function getIp() {
        try {
          const response = await fetch('/?format=json', { // Note the path is relative now
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          const data = await response.text();
          console.log("data"); 
          console.log(data); 
        } catch (error) {
          console.error('Error:', error);
          console.log('serve error')
        }
      }
      
      
     

      const handleLike = async () => {
          if (hasLiked) {
              alert('vous avez déja aimé ce contenu');
          } else {

            console.log(image)
            console.log(postId)
            // Récupérer l'IP de l'utilisateur via l'API ipify
      // const response = await axios.get('https://api.ipify.org?format=json');
      // const userIp = getIp();

      // console.log("userIp");
      // console.log(userIp);
      //       return false;
            const like_post = await axios.post(`${apiUrl}/posts/like`, {
              id_contenu: image?.id_image,
              id_post: postId, //photo
              user: userid, //image secondaire de mannequin
            });

            if(like_post){
              console.log(like_post)
              // return false;
              setLikeCount(likeCount + 1);
              setHasLiked(true);
            }
         }
      };
  
      const handleShare = () => {
          axios.post(`/post/${postId}/share`)
              .then(() => {
                  setShareCount(shareCount + 1);
              })
              .catch(error => console.error('Erreur lors du partage', error));
      };
  
     useEffect(() => {
   
      const fetchData = async () => {
        // selection des contributeurs
        
      
        try {
        //  console.log("id_image")
        //  console.log(image)
   
          const rep1 = await axios.post(`${apiUrl}/Collabs/list_collab_by_image`, {
            id_image: image?.id_image,
          });
          const rep_posts = await axios.post(`${apiUrl}/posts/stats`, {
            id: image?.id_image,
            categorie: 1, //photo
            type: 2, //image secondaire de mannequin
          });
       
          console.log("rep1")
          console.log(rep1)
          // console.log("rep_posts")
          // console.log(rep_posts)
          if(rep_posts?.data){
            const info_post = rep_posts?.data?.stats;
            var thispost_id = rep_posts?.data?.post_id;
            console.log("info_post")
            console.log(info_post)
            console.log(rep_posts?.data)
            setLikeCount(info_post?.likes_count)
            setShareCount(info_post?.shares_count)
            setpostId(rep_posts?.data?.postid)


                // console.log("rep_posts?.data?.postid")
                
                // console.log(rep_posts?.data?.postid)
                axios.post(`${apiUrl}/posts/liked`, {
                  id_contenu: image?.id_image,
                  id_post: rep_posts?.data?.postid, //photo
                  user: user_info?.id, //
              
                })
                .then(response => {
                  console.log("response")
                  console.log(response)
                  if(response.data.length > 0){
                    
                  setHasLiked(response.data[0].has_liked);

                  }
                 
                })
                .catch(error => console.error('Erreur lors de la récupération des statistiques', error));
    
        
            
          }
          console.log(rep1?.data?.photographes)
           
          // return false;
          if(rep1){

                setPhotographe(rep1?.data?.photographes)
                setMaquilleur(rep1?.data?.maquilleurs)
                setStyliste(rep1?.data?.stylistes)
                setCoiffeur(rep1?.data?.coiffeurs) 
               
              }
       
                   
         
        } catch (err) {
          console.log(err);
        
        }
      };
      fetchData();
    } , [image]);
    useEffect(() => {
   
      const fetchDatab = async () => {
       
        setImages(data)
      };
      fetchDatab();
    } , [data]);
     
    console.log("Photographe")
    console.log(Photographe)
    console.log(styliste)
    console.log(maquilleur)
    console.log(coiffeur)

  useEffect(() => {
    if (image && data) {
      const currentImageIndex = data.findIndex(img => img.id_image === image.id_image);
      setCurrentIndex(currentImageIndex);
    }
  }, [image, data]);
  const currentImage = images[currentIndex]; // Get the current image to display

  useEffect(() => {
    const handleResize = () => setDeviceWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleSwipe = (event) => {
    const touchStartX = event.touches[0].clientX;
  
    event.target.addEventListener('touchend', (endEvent) => {
      const touchEndX = endEvent.changedTouches[0].clientX;
  
      if (touchStartX - touchEndX > 50) {
        // Swipe left -> Next
        handleNext();
      } else if (touchEndX - touchStartX > 50) {
        // Swipe right -> Previous
        handlePrev();
      }
    });
  };
  
  // Handle next image
  const handleNext = async () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    await updateImageData(newIndex);
  };
  
  // Handle previous image
  const handlePrev = async () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    await updateImageData(newIndex);
  };
  
  // Update data when image changes (next or previous)
  const updateImageData = async (index) => {
    const currentImage = images[index];  // Get current image based on updated index
    try {
      const rep1 = await axios.post(`${apiUrl}/Collabs/list_collab_by_image`, {
        id_image: currentImage.id_image,
      });
  
      const rep_posts = await axios.post(`${apiUrl}/posts/stats`, {
        id: currentImage.id_image,
        categorie: 1, // photo
        type: 2, // image secondaire de mannequin
      });
  
      if (rep_posts?.data) {
        const info_post = rep_posts?.data?.stats;
        setLikeCount(info_post?.likes_count);
        setShareCount(info_post?.shares_count);
        setpostId(rep_posts?.data?.postid);
      }
  
      // Set contributors
      if (rep1) {
        setPhotographe(rep1?.data?.photographes || []);
        setMaquilleur(rep1?.data?.maquilleurs || []);
        setStyliste(rep1?.data?.stylistes || []);
        setCoiffeur(rep1?.data?.coiffeurs || []);
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  // Function to handle "Like"
  // const handleLike = () => {
  //   if (hasLiked) {
  //     alert('Vous avez déjà aimé ce contenu');
  //   } else {
  //     // Call your like API here and update state accordingly
  //     setLikeCount(likeCount + 1);
  //     setHasLiked(true);
  //   }
  // };

  // // Function to handle "Share"
  // const handleShare = () => {
  //   // Call your share API here and update state accordingly
  //   setShareCount(shareCount + 1);
  // };

  // Function to get the image path based on resolution
  const getPathForResolution = (paths) => {
    if (deviceWidth <= 720) {
      return paths.path_mm; // Mobile resolution
    } else if (deviceWidth <= 1080) {
      return paths.path_md; // Medium resolution
    } else {
      return paths.path_hrd; // High resolution
    }
  };

  
  const getPathForResolution_b = (paths) => {
    // console.log("paths")
    // console.log(paths)
    if (deviceWidth <= 720) {
      return paths.path_hrm; // Résolution miniature
    } else if (deviceWidth <= 1080) {
      return paths.path_hrd; // Résolution moyenne
    } else {
      return paths.path_hrd; // Résolution haute
    }
  };

  return (
    <div className="imagezoombox">
      <div className="modal_overlay">
        <div className="fixedbtnzone">
          <button className="closebtn" onClick={onClose}>X</button>
        </div>

        <div className="modal-content">
          <div className="image-section text-center">
            <a
              className="hover-switch"
              href={`${apiUrl}/${getPathForResolution_b(currentImage.paths)}`}
              data-fancybox="gallery"
            >
              <img
                src={`${apiUrl}/${getPathForResolution_b(currentImage.paths)}`}
                alt={currentImage.path_image}
                className="img-fluid"
              />
            </a>
          </div>

          <div className="details-section">
            <div className="btn_list">
                         <div className="like_btn">
                         <div className="post-actions">
                           <button onClick={handleLike} disabled={hasLiked} className={hasLiked && "active_icon"}>
                               <FontAwesomeIcon icon={faThumbsUp}  className='mr-3'/> 
                               {/* {hasLiked ? `Vous avez aimé ($)` : ` (${likeCount})`} */}
                            <span className='ml-3'>   {likeCount}</span>
                           </button>
           
                           <button onClick={handleFollow} className="follow-button">
                 <FontAwesomeIcon 
                   icon={isFollowing ? faUserCheck : faUserPlus} // Icône selon l'état
                   className={isFollowing ? "followed-icon" : "follow-icon"}
                 />
                 {isFollowing ? "Vous suivez" : "Suivre"}
               </button>
                           <button onClick={handleShare}>
                               <FontAwesomeIcon icon={faShareAlt} /> 
                                ({shareCount})
                           </button>
                       </div>
                         </div>
                       </div>

                       <div className="contributeurzone">
              {/* <div className="label">photographes</div> */}
              {Photographe.length > 0 &&
              
              (
                  <label className="photographes">
                  <span className="label">photo</span>
                  {Photographe.map((item) => (
                  <a key={item?.collab_id} href={`/singleViewP/1/${item?.collab_id}`} className="value">{item?.collab_pseudo}</a>
                ))}
                  </label>
              )}
            
            
              {styliste.length > 0 &&
              
              (
                  <label className="stylistes">
                  <span className="label">costume</span>
                  {styliste.map((item) => (
                    <a key={item?.collab_id} href={`/singleViewP/4/${item?.collab_id}`} className="value">{item?.collab_pseudo}</a>
                  ))}
                  </label> 
              )}
          
            

            {maquilleur.length > 0 &&
              
              (
                  <label className="maquilleurs">
                  <span className="label">make-up</span>
                  {maquilleur.map((item) => (
                  <a key={item?.collab_id} href={`/singleViewP/2/${item?.collab_id}`} className="value">{item?.collab_pseudo}</a>
                  ))}
                  </label>  
              )}
            

            {coiffeur.length > 0 &&
              
              (
                  <label className="coiffure">
                  <span className="label">hair</span>
                  {coiffeur.map((item) => (
                  <a key={item?.collab_id} href={`/singleViewP/3/${item?.collab_id}`} className="value">{item?.collab_pseudo}</a>
                  ))}
                  </label>
              )}
            
              
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="nav_buttons">
            <button className="prev-button left_btn" onClick={handlePrev}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className="next-button  right_btn" onClick={handleNext}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          {/* Fancybox for all images */}
          <div className="fancythubs">
            {images.map((img, index) => (
              <a
                key={img.id}
                href={`${apiUrl}/${getPathForResolution_b(img.paths)}`}
                data-fancybox="gallery"
              >
                <img
                  src={`${apiUrl}/${getPathForResolution_b(img.paths)}`}
                  alt={img.path_image}
                  className="img-fluid"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;

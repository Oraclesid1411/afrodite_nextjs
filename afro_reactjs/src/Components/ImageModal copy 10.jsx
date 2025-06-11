import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faShareAlt, faUserPlus, faUserCheck , faTimes} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../Context/AuthenticateContext.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageModal = ({ image, data, onClose, onDataLoaded }) => {
  const auth = useAuth();
  const user_info = auth.currentUser;

  const [imagesWithContributors, setImagesWithContributors] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State for the current image in slider
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [postId, setPostId] = useState(null);

  
  const [loading_img, setLoading_img] = useState(false); // Loader state
  // State to hold contributors
  const [photographe, setPhotographe] = useState([]);
  const [styliste, setStyliste] = useState([]);
  const [maquilleur, setMaquilleur] = useState([]);
  const [coiffeur, setCoiffeur] = useState([]);

  const apiUrl = 'https://apiafro.aafrodites.com';
  // const apiUrl = 'http://localhost:5000'


  // Function to fetch contributors for a specific image
  const fetchContributors = async (imageId) => {
    // setLoading_img(true)
    try {
      const response = await axios.post(`${apiUrl}/Collabs/list_collab_by_image`, { id_image: imageId });
      return response.data;
      // setLoading_img(false)
    } catch (err) {
      console.error('Erreur lors de la récupération des contributeurs', err);
      return {}; // Return empty if error
    }
  };

  // Fetch stats for a specific image
  const fetchImageStats = async (imageId) => {
    try {
      const rep_posts = await axios.post(`${apiUrl}/posts/stats`, {
        id: imageId,
        categorie: 1,
        type: 2,
      });
      if (rep_posts?.data) {
        const info_post = rep_posts?.data?.stats;
        setLikeCount(info_post?.likes_count);
        setShareCount(info_post?.shares_count);
        setPostId(rep_posts?.data?.postid);
      }
      return rep_posts.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques', error);
    }
  };

  // Fetch stats for a specific image
  const fetchhasLiked = async (imageId) => {
    try {
      const rep_hasliked = await axios.post(`${apiUrl}/posts/image_liked`, {
        id_contenu: imageId,
        // id_post: rep_posts?.data?.postid, //photo
        user: user_info?.id, //
      });

      setHasLiked(true)

      return rep_hasliked?.data;
      
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques', error);
    }
  };

  const fetchSetHasLike = async () => {
    try {
      const response = await axios.post(`${apiUrl}/posts/hasLiked`, {
        id_post: postId,
        user: user_info?.id,
      });

      // Vérifier si la réponse indique un succès
      if (response.data?.success) {
        setHasLiked(true);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du like', error);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchSetHasLike();
    }
  }, [postId]);
  // Fetch all images with their contributors and stats
  useEffect(() => {
    // setLoading(true)
    if (data && data.length > 0) {
      const fetchImagesWithContributors = async () => {
        const updatedImages = await Promise.all(
          data.map(async (imageData) => {
            const contributors = await fetchContributors(imageData.id_image);
            console.log("contributors")
            console.log(contributors)
            const stats = await fetchImageStats(imageData.id_image); // Fetch stats for the image
            console.log("stats")
            console.log(stats)
            const like_state = await fetchhasLiked(imageData.id_image); // Fetch stats for the image
            console.log("stats")
            console.log(stats)
            return {
              ...imageData,
              contributors,
              stats,
              like_state
            };
          })
        );

        console.log("updatedImages")
        
        console.log(updatedImages)
        setImagesWithContributors(updatedImages);

        // Set current image index based on the initial `image` prop
        const initialIndex = updatedImages.findIndex((img) => img.id_image === image.id_image);
        setCurrentImageIndex(initialIndex !== -1 ? initialIndex : 0);  // Fallback to 0 if image is not found
        // Notify parent that the data has been loaded
        if (onDataLoaded) {
          onDataLoaded(true);
        }
    
      };

      fetchImagesWithContributors();

    }
    // setLoading(false)
  }, [data, image , onDataLoaded]); // Ensure the effect runs when data or image props change

 
  
  // Update contributors data whenever the current image changes
  useEffect(() => {
    if (imagesWithContributors.length > 0) {
      const currentImage = imagesWithContributors[currentImageIndex];
       setPhotographe(currentImage.contributors?.photographes || []);
      setStyliste(currentImage.contributors?.stylistes || []);
      setMaquilleur(currentImage.contributors?.maquilleurs || []);
      setCoiffeur(currentImage.contributors?.coiffeurs || []);
      setLikeCount(currentImage.stats?.stats?.likes_count || 0);
      setShareCount(currentImage.stats?.stats?.shares_count || 0);
      setPostId(currentImage.stats?.postid || null);
      setHasLiked(false);  // Reset like state when the image changes
      setIsFollowing(false);  // Reset follow state if needed
    }
  }, [currentImageIndex, imagesWithContributors]);

  const handleFollow = () => setIsFollowing(!isFollowing);

  const handleLike = async (imageId) => {
    if (hasLiked) {
      alert('Vous avez déjà aimé ce contenu');
    } else {
      try {
        const like_post = await axios.post(`${apiUrl}/posts/like`, {
          id_contenu: imageId,
          id_post: postId,
          user: user_info?.id,
        });

        if (like_post) {
          setLikeCount(likeCount + 1);
          setHasLiked(true);
        }
      } catch (error) {
        console.error('Erreur lors du like', error);
      }
    }
  };

  const handleShare = async () => {
    try {
      await axios.post(`/post/${postId}/share`);
      setShareCount(shareCount + 1);
    } catch (error) {
      console.error('Erreur lors du partage', error);
    }
  };

  const getPathForResolution_b = (paths) => {
    if (window.innerWidth <= 720) {
      return paths.path_hrm;
    } else if (window.innerWidth <= 1080) {
      return paths.path_hrd;
    } else {
      return paths.path_hrd;
    }
  };

  // Slider settings with next/prev functionality
  const sliderSettings = {
    infinite: true,
    centerMode: true,
    centerPadding: "0",
    slidesToShow: 1,
    focusOnSelect: true,
    initialSlide: currentImageIndex, // Set initial slide using currentImageIndex
    prevArrow: <button className="left_btn">Prev</button>,
    nextArrow: <button className="right_btn">Next</button>,
    afterChange: (index) => setCurrentImageIndex(index), // Update the current image index after sliding
  };

  // Only render slider when imagesWithContributors has been populated
  if (!imagesWithContributors.length) {
    return null; // Or a loading spinner/message
  }


  return (
    <div className="imagezoombox">
    <div className="modal_overlay">
      <div className="fixedbtnzone">
        <button className="closebtn" onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="modal-content">
     
        <div className="image-section text-center">
          
          <Slider {...sliderSettings}>
            {imagesWithContributors.map((currentImage, index) => (
              <div key={currentImage.id_image} className="image-section text-center">
             {/* {currentImage.id_image} */}
                <a
                  className="hover-switch"
                  href={`${apiUrl}/${getPathForResolution_b(currentImage.paths)}`}
                  data-fancybox="gallery"
                >
                  <img
                    src={`${apiUrl}/${getPathForResolution_b(currentImage.paths)}`}
                    alt={currentImage.path_image || "Image"}
                    className="img-fluid"
                  />
                </a>

                {/* Displaying stats and contributors only for the current image */}
                {index === currentImageIndex && (
                  <div className="btn-section">
                    <div className="btn_list">
                      <div className="like_btn">
                        <div className="post-actions">
                           {/* <a href=''> */}
                           {currentImage?.pseudo_model &&
                           
                           (
                            <>
                               <button>
                          
                                 <a className='cstm_link' href={`/single_view/1/${currentImage?.idmannequin}`}>
                                                               
                                      {currentImage?.pseudo_model}
                                </a> 
                                <a className='cstm_link_b mx-1' href={`/mannequins`}>
                                                               
                                                               mannequin
                                                            </a> 

                           </button>
                         
                            
                            </>
                           )
                           }
                        
                          
                          <button onClick={() => handleLike(currentImage.id_image)}>
                            <FontAwesomeIcon icon={faThumbsUp} className="mr-3" />
                              <span className="ml-3">{likeCount}</span>
                          </button>

                          <button onClick={handleFollow} className="follow-button">
                            <FontAwesomeIcon
                              icon={isFollowing ? faUserCheck : faUserPlus}
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
                  </div>
                )}
              </div>
            ))}
          </Slider>
        </div>

        {/* Display contributors only for the current image */}
        {/* {imagesWithContributors.length} */}
        {imagesWithContributors.length > 0 && imagesWithContributors[currentImageIndex] && (
          <div className="details-section">
          
            <div className="contributeurs_list_container">
            <a href='/parteners' className='link_cst cstm_link mx-1 ' >
                                  Collabs :
             </a>
             {photographe.length > 0 && (
                <label className="photographe">
                  {photographe.map((item, index) => (
                    <React.Fragment key={item?.collab_id}>
                      <a href={`/singleViewP/1/${item?.collab_id}`} className="custom_link">
                        {item?.collab_pseudo}
                      </a>
                      {index < photographe.length - 1 && ' & '}
                    </React.Fragment>
                  ))}
                  <span className="label">(photo) /</span>
                </label>
              )}

              
              {styliste.length > 0 && (
                  <label className="styliste">
                    {styliste.map((item, index) => (
                      <React.Fragment key={item?.collab_id}>
                        <a href={`/singleViewP/4/${item?.collab_id}`} className="">
                          {item?.collab_pseudo}
                        </a>
                        {index < styliste.length - 1 && ' & '}
                      </React.Fragment>
                    ))}
                    <span className="label">(costume) /</span>
                  </label>
                )}

                {maquilleur.length > 0 && (
                  <label className="maquilleur">
                    {maquilleur.map((item, index) => (
                      <React.Fragment key={item?.collab_id}>
                        <a href={`/singleViewP/2/${item?.collab_id}`} className="">
                          {item?.collab_pseudo}
                        </a>
                        {index < maquilleur.length - 1 && ' & '}
                      </React.Fragment>
                    ))}
                    <span className="label">(makeup) /</span>
                  </label>
                )}

                  {coiffeur.length > 0 && (
                    <label className="coiffeur">
                      {coiffeur.map((item, index) => (
                        <React.Fragment key={item?.collab_id}>
                          <a href={`/singleViewP/3/${item?.collab_id}`} className="">
                            {item?.collab_pseudo}
                          </a>
                          {index < coiffeur.length - 1 && ' & '}
                        </React.Fragment>
                      ))}
                      <span className="label">(hair)</span>
                    </label>
                  )}

            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default ImageModal;

import React, { useState,useRef, useEffect } from 'react';
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
  const [scale, setScale] = useState(1); // Initial scale (no zoom)
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Initial position of the zoomed image
  const zoomFactor = 1.5;  // Adjust this value for desired zoom
  const imageRef = useRef(null);
  const lastTap = useRef(0);  // To track double-tap/double-click timing

  // New state to track if zoom is in progress
  const [isZooming, setIsZooming] = useState(false);

  // Initialize Fancybox with custom options to disable navigation buttons
  useEffect(() => {
    // Configuration for Fancybox
    $('[data-fancybox="gallery"]').fancybox({
      buttons: [  // Only show the buttons you need (remove navigation and other buttons)
        'zoom',    // Zoom button
        'close'    // Close button
      ],
      
      arrows: false, // Disables the previous/next navigation arrows
      infobar: false, // Disables the info bar
      toolbar: false, // Disables the toolbar
      smallBtn: true, // Optional: Makes the close button small
    });
  }, []);

  // Function to handle zoom on double-click or double-tap
  const handleZoom = (event) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap.current;

    // Detect double-click (desktop) or double-tap (mobile)
    if (tapLength < 300 && tapLength > 0 && imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left; // X coordinate of the double-click relative to the image
      const y = event.clientY - rect.top; // Y coordinate of the double-click relative to the image

      // Zoom in/out effect
      const newScale = scale === 1 ? zoomFactor : 1; // Toggle zoom
      setScale(newScale);
      setIsZooming(true); // Mark zoom as in progress

      // Move the image to focus on the clicked area
      if (newScale === zoomFactor) {
        const maxX = (rect.width * newScale) - rect.width;
        const maxY = (rect.height * newScale) - rect.height;
        const newPosX = Math.max(Math.min(x - (rect.width / 2), maxX), 0);
        const newPosY = Math.max(Math.min(y - (rect.height / 2), maxY), 0);
        setPosition({ x: newPosX, y: newPosY });
      } else {
        setPosition({ x: 0, y: 0 });  // Reset position when zoom is reset
      }
    }

    lastTap.current = currentTime;
  };

  // Handle touch event for mobile (double-tap)
  const handleTouchEnd = (event) => {
    if (event.touches.length === 0 && imageRef.current) {  // Check if it's a tap (not a swipe)
      handleZoom(event);
    }
  };

  // Prevent Fancybox from opening if zoom is in progress
  const handlePreventFancybox = (e) => {
    if (isZooming) {
      e.preventDefault(); // Prevent the default Fancybox behavior
    }
  };

  // Handle drag on zoomed image to move within the frame
  const handleDrag = (e) => {
    if (scale !== 1 && imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const deltaX = e.clientX - rect.left;
      const deltaY = e.clientY - rect.top;

      const maxX = (rect.width * scale) - rect.width;
      const maxY = (rect.height * scale) - rect.height;
      const newPosX = Math.max(Math.min(deltaX - (rect.width / 2), maxX), 0);
      const newPosY = Math.max(Math.min(deltaY - (rect.height / 2), maxY), 0);

      setPosition({ x: newPosX, y: newPosY });
    }
  };

  // Optional: useEffect to check if imageRef is available after render
  useEffect(() => {
    if (imageRef.current) {
      // Any additional setup or checks after the image is rendered
    }
  }, []);


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
            {/* Image with zoom functionality */}
           
            <a
                    className="hover-switch"
                    href={`${apiUrl}/${getPathForResolution_b(currentImage.paths)}`}  // This should be the high-res image path for Fancybox
                    data-fancybox="gallery"  // Ensure this is here to trigger Fancybox
                    onClick={handlePreventFancybox} // Prevent Fancybox if zooming
                  >
                    <img
                      ref={imageRef}
                      src={`${apiUrl}/${getPathForResolution_b(currentImage.paths)}`}
                      alt={currentImage.path_image || 'Image'}
                      className="img-fluid"
                      style={{
                        transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                        transition: 'transform 0.3s ease',
                        cursor: scale === 1 ? 'pointer' : 'move', // Change cursor when zoomed
                      }}
                      onDoubleClick={handleZoom}  // Handle desktop double-click
                      onTouchEnd={handleTouchEnd}  // Handle mobile double-tap
                      onMouseMove={handleDrag}  // Drag the image when zoomed
                      onMouseDown={(e) => e.preventDefault()} // Prevent text selection or image drag
                    />
                  </a>

            {/* Displaying stats and contributors only for the current image */}
            {index === currentImageIndex && (
              <div className="btn-section">
                <div className="btn_list">
                  <div className="like_btn">
                    <div className="post-actions">
                      {currentImage?.pseudo_model && (
                        <>
                          <button>
                            <a className="cstm_link" href={`/single_view/1/${currentImage?.idmannequin}`}>
                              {currentImage?.pseudo_model}
                            </a>
                            <a className="cstm_link_b mx-1" href={`/mannequins`}>
                              mannequin
                            </a>
                          </button>
                        </>
                      )}
                      <button onClick={() => handleLike(currentImage.id_image)}>
                        <FontAwesomeIcon icon={faThumbsUp} className="mr-3" />
                        <span className="ml-3">{likeCount}</span>
                      </button>

                      <button onClick={handleFollow} className="follow-button">
                        <FontAwesomeIcon
                          icon={isFollowing ? faUserCheck : faUserPlus}
                          className={isFollowing ? 'followed-icon' : 'follow-icon'}
                        />
                        {isFollowing ? 'Vous suivez' : 'Suivre'}
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
                        <a href={`/singleViewP/4/${item?.collab_id}`} className="custom_link">
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
                        <a href={`/singleViewP/2/${item?.collab_id}`} className="custom_link">
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
                          <a href={`/singleViewP/3/${item?.collab_id}`} className="custom_link">
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

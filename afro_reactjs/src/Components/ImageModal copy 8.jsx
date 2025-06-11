import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faShareAlt, faUserPlus, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../Context/AuthenticateContext.jsx";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageModal = ({ image, data, onClose }) => {

  console.log("image")
  console.log(image)
  const auth = useAuth();
  const user_info = auth.currentUser;
  const [imagesWithContributors, setImagesWithContributors] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State for the current image in slider
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [postId, setPostId] = useState(null);
  const apiUrl = 'https://apiafro.aafrodites.com';

  // Function to fetch contributors for a specific image
  const fetchContributors = async (imageId) => {

    console.log("imageId")
    console.log(imageId)
    try {
      const response = await axios.post(`${apiUrl}/Collabs/list_collab_by_image`, { id_image: imageId });
      return response.data;
    } catch (err) {
      console.error('Erreur lors de la récupération des contributeurs', err);
      return {}; // return empty if error
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
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques', error);
    }
  };

  // Fetch all contributors and stats for each image
  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImagesWithContributors = async () => {
        const updatedImages = await Promise.all(
          data.map(async (imageData) => {
            const contributors = await fetchContributors(imageData.id_image);
            await fetchImageStats(imageData.id_image); // Fetch stats for the image
            return {
              ...imageData,
              contributors
            };
          })
        );
        setImagesWithContributors(updatedImages);

        // Set current image index based on the initial `image` prop
        const initialIndex = updatedImages.findIndex((img) => img.id_image === image.id_image);
      console.log("initialIndex")
      console.log(initialIndex)
      
        setCurrentImageIndex(initialIndex !== -1 ? initialIndex : 0);  // Fallback to 0 if image is not found
      };

      fetchImagesWithContributors();
    }
  }, [data, image]);

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
    prevArrow: <button className="left_btn">Prev</button>,
    nextArrow: <button className="right_btn">Next</button>,
    afterChange: (index) => setCurrentImageIndex(index) // Update the current image index after sliding
  };

  console.log("currentImageIndex")
  console.log(currentImageIndex)
  return (
    <div className="imagezoombox">
      <div className="modal_overlay">
        <div className="fixedbtnzone">
          <button className="closebtn" onClick={onClose}>X</button>
        </div>
        <div className="modal-content">
          <div className="image-section text-center">
            <Slider {...sliderSettings}>
              {imagesWithContributors.map((currentImage, index) => (
                
                <div key={currentImage.id_image} className="image-section text-center">
                  {index}
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
                    // <div className="stats-section">
                        <div className="details-section">
                        <div className="btn_list">
                        <div className=" like_btn">
                        <div className="post-actions">
                        <button onClick={() => handleLike(currentImage.id_image)} disabled={hasLiked} className={hasLiked ? "active_icon" : ""}>
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
                    // </div>
                  )}
                </div>
              ))}
            </Slider>
          </div>

          {/* Display contributors only for the current image */}
          {imagesWithContributors.length > 0 && imagesWithContributors[currentImageIndex] && (
           
           <div className="details-section">
            {/* <div className="btn_list"> */}
           <div className="contributeurzone">
              {imagesWithContributors[currentImageIndex].contributors.photographes?.length > 0 && (
                <label className="photographes">
                   <span className="label">photo</span>
                  {imagesWithContributors[currentImageIndex].contributors.photographes.map((item) => (
                    <a key={item?.collab_id} href={`/singleViewP/1/${item?.collab_id}`} className="value">
                      {item?.collab_pseudo}
                    </a>
                  ))}
                </label>
              )}

              {imagesWithContributors[currentImageIndex].contributors.stylistes?.length > 0 && (
                <label className="stylistes">
                <span className="label">costume</span>
                {imagesWithContributors[currentImageIndex].contributors.stylistes.map((item) => (
                    <a key={item?.collab_id} href={`/singleViewP/4/${item?.collab_id}`} className="value">
                      {item?.collab_pseudo}
                    </a>
                  ))}
                </label>
              )}

              {imagesWithContributors[currentImageIndex].contributors.maquilleurs?.length > 0 && (
                <label className="maquilleurs">
                 <span className="label">make-up</span>
                 {imagesWithContributors[currentImageIndex].contributors.maquilleurs.map((item) => (
                    <a key={item?.collab_id} href={`/singleViewP/2/${item?.collab_id}`} className="value">
                      {item?.collab_pseudo}
                    </a>
                  ))}
                </label>
              )}

              {imagesWithContributors[currentImageIndex].contributors.coiffeurs?.length > 0 && (
                <label className="coiffure">
                <span className="label">hair</span>
                {imagesWithContributors[currentImageIndex].contributors.coiffeurs.map((item) => (
                    <a key={item?.collab_id} href={`/singleViewP/3/${item?.collab_id}`} className="value">
                      {item?.collab_pseudo}
                    </a>
                  ))}
                </label>
              )}
            </div>
             {/* </div> */}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faShareAlt, faUserPlus, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../Context/AuthenticateContext.jsx";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageModal = ({ image, data, onClose }) => {
  const auth = useAuth();
  const user_info = auth.currentUser;
  const [imagesWithContributors, setImagesWithContributors] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [postId, setPostId] = useState(null);
  const apiUrl = 'https://apiafro.aafrodites.com';

  // Function to fetch contributors for a specific image
  const fetchContributors = async (imageId) => {
    try {
      const response = await axios.post(`${apiUrl}/Collabs/list_collab_by_image`, { id_image: imageId });
      return response.data;
    } catch (err) {
      console.error('Erreur lors de la récupération des contributeurs', err);
      return {}; // return empty if error
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImagesWithContributors = async () => {
        const updatedImages = await Promise.all(
          data.map(async (imageData) => {
            const contributors = await fetchContributors(imageData.id_image);
            return {
              ...imageData,
              contributors
            };
          })
        );
        setImagesWithContributors(updatedImages);
      };

      fetchImagesWithContributors();
    }
  }, [data]);

  const handleFollow = () => setIsFollowing(!isFollowing);

  const handleLike = async () => {
    if (hasLiked) {
      alert('Vous avez déjà aimé ce contenu');
    } else {
      try {
        const like_post = await axios.post(`${apiUrl}/posts/like`, {
          id_contenu: image?.id_image,
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

  const sliderSettings = {
    infinite: true,
    centerMode: true,
    centerPadding: "0",
    slidesToShow: 1,
    focusOnSelect: true,
    prevArrow: <button className="left_btn">Prev</button>,
    nextArrow: <button className="right_btn">Next</button>,
  };

  return (
    <div className="imagezoombox">
      <div className="modal_overlay">
        <div className="fixedbtnzone">
          <button className="closebtn" onClick={onClose}>X</button>
        </div>
        <div className="modal-content">
          <div className="image-section text-center">
            <Slider {...sliderSettings}>
              {imagesWithContributors.map((currentImage) => (
                <div key={currentImage.id_image} className="image-section text-center">
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
                </div>
              ))}
            </Slider>
          </div>

          <div className="details-section">
            <div className="btn_list">
              <div className="like_btn">
                <div className="post-actions">
                  <button onClick={handleLike} disabled={hasLiked} className={hasLiked && "active_icon"}>
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

            <div className="contributeurzone">
              {imagesWithContributors.length > 0 && imagesWithContributors.map((currentImage) => (
                <div key={currentImage.id_image}>
                  {currentImage.contributors.photographes?.length > 0 && (
                    <label className="photographes">
                      <span className="label">Photographe</span>
                      {currentImage.contributors.photographes.map((item) => (
                        <a key={item?.collab_id} href={`/singleViewP/1/${item?.collab_id}`} className="value">
                          {item?.collab_pseudo}
                        </a>
                      ))}
                    </label>
                  )}

                  {currentImage.contributors.stylistes?.length > 0 && (
                    <label className="stylistes">
                      <span className="label">Styliste</span>
                      {currentImage.contributors.stylistes.map((item) => (
                        <a key={item?.collab_id} href={`/singleViewP/4/${item?.collab_id}`} className="value">
                          {item?.collab_pseudo}
                        </a>
                      ))}
                    </label>
                  )}

                  /

                  {currentImage.contributors.maquilleurs?.length > 0 && (
                    <label className="maquilleurs">
                      <span className="label">Maquilleur</span>
                      {currentImage.contributors.maquilleurs.map((item) => (
                        <a key={item?.collab_id} href={`/singleViewP/2/${item?.collab_id}`} className="value">
                          {item?.collab_pseudo}
                        </a>
                      ))}
                    </label>
                  )}

                  /

                  {currentImage.contributors.coiffeurs?.length > 0 && (
                    <label className="coiffure">
                      <span className="label">Coiffeur</span>
                      {currentImage.contributors.coiffeurs.map((item) => (
                        <a key={item?.collab_id} href={`/singleViewP/3/${item?.collab_id}`} className="value">
                          {item?.collab_pseudo}
                        </a>
                      ))}
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;

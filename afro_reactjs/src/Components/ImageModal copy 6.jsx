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
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [Photographe, setPhotographe] = useState([]);
  const [styliste, setStyliste] = useState([]);
  const [maquilleur, setMaquilleur] = useState([]);
  const [coiffeur, setCoiffeur] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [postId, setPostId] = useState(null);
  const apiUrl = 'https://apiafro.aafrodites.com';

  useEffect(() => {
    if (image?.id_image && data) {
      const fetchData = async () => {
        try {
          const rep1 = await axios.post(`${apiUrl}/Collabs/list_collab_by_image`, { id_image: image?.id_image });
          const rep_posts = await axios.post(`${apiUrl}/posts/stats`, {
            id: image?.id_image,
            categorie: 1,
            type: 2,
          });

          if (rep_posts?.data) {
            const info_post = rep_posts?.data?.stats;
            setLikeCount(info_post?.likes_count);
            setShareCount(info_post?.shares_count);
            setPostId(rep_posts?.data?.postid);

            axios.post(`${apiUrl}/posts/liked`, {
              id_contenu: image?.id_image,
              id_post: rep_posts?.data?.postid,
              user: user_info?.id,
            })
            .then(response => {
              if (response.data.length > 0) {
                setHasLiked(response.data[0].has_liked);
              }
            })
            .catch(error => console.error('Erreur lors de la récupération des statistiques', error));
          }

          if (rep1?.data) {
            setPhotographe(rep1?.data?.photographes);
            setMaquilleur(rep1?.data?.maquilleurs);
            setStyliste(rep1?.data?.stylistes);
            setCoiffeur(rep1?.data?.coiffeurs);
          }
        } catch (err) {
          console.error('Erreur lors de la récupération des données', err);
        }
      };

      fetchData();
    }
  }, [image, data, user_info]);

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


  console.log("data")
  console.log(data)
  return (
    <div className="imagezoombox">
      <div className="modal_overlay">
        <div className="fixedbtnzone">
          <button className="closebtn" onClick={onClose}>X</button>
        </div>
        <div className="modal-content">
        <div className="image-section text-center">
        
          <Slider {...sliderSettings}>
            {data.map((currentImage) => (
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
              {Photographe.length > 0 && (
                <label className="photographes">
                  <span className="label">Photographe</span>
                  {Photographe.map((item) => (
                    <a key={item?.collab_id} href={`/singleViewP/1/${item?.collab_id}`} className="value">
                      {item?.collab_pseudo}
                    </a>
                  ))}
                </label>
              )}

              {styliste.length > 0 && (
                <label className="stylistes">
                  <span className="label">Styliste</span>
                  {styliste.map((item) => (
                    <a key={item?.collab_id} href={`/singleViewP/4/${item?.collab_id}`} className="value">
                      {item?.collab_pseudo}
                    </a>
                  ))}
                </label>
              )}

              {maquilleur.length > 0 && (
                <label className="maquilleurs">
                  <span className="label">Maquilleur</span>
                  {maquilleur.map((item) => (
                    <a key={item?.collab_id} href={`/singleViewP/2/${item?.collab_id}`} className="value">
                      {item?.collab_pseudo}
                    </a>
                  ))}
                </label>
              )}

              {coiffeur.length > 0 && (
                <label className="coiffure">
                  <span className="label">Coiffeur</span>
                  {coiffeur.map((item) => (
                    <a key={item?.collab_id} href={`/singleViewP/3/${item?.collab_id}`} className="value">
                      {item?.collab_pseudo}
                    </a>
                  ))}
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;

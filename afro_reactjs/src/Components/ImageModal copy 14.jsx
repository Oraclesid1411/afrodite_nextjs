import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faShareAlt, faUserPlus, faUserCheck , faTimes} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../Context/AuthenticateContext.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';  // Remplacer useHistory par useNavigate

// import model_defaultimg from 'assets/'
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
  const [boutique, setBoutiques] = useState([]);
  const [modeldata, setModeldata] = useState([]);

  console.log("modeldata")
  console.log(modeldata)
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

  // Fetch if a specific image is like by the current user
  const fetchhasLiked = async (imageId) => {
    try {
      const rep_hasliked = await axios.post(`${apiUrl}/posts/image_liked`, {
        id_contenu: imageId,
        // id_post: rep_posts?.data?.postid, //photo
        user: user_info?.id, //
      });

      // setHasLiked(true)

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

  // useEffect(() => {
  //   // setLoading(true)
  //   if (data && data.length > 0) {

  //   var  contributors = [];
  //    var stats = [];
  //    var like_state = [];
  //    const first_load = data.map((imageData) => {
  //         const contributors = [];
  //        const stats = [];
        
  //        const like_state = [];
         
  //       return {
  //         ...imageData,
  //         contributors,
  //         stats,
  //         like_state
  //       };
  //     })
    
  //     setImagesWithContributors(first_load);
      
  //     const fetchImagesWithContributors = async () => {
  //       const updatedImages = await Promise.all(
  //         data.map(async (imageData) => {
  //            contributors = await fetchContributors(imageData.id_image);
  //           // const contributors = [];
  //           // console.log("contributors")
  //           // console.log(contributors)
  //           // const stats = [];
  //            stats = await fetchImageStats(imageData.id_image); // Fetch stats for the image
  //           // console.log("stats")
  //           // console.log(stats)
  //           // const like_state = [];
  //            like_state = await fetchhasLiked(imageData.id_image); // Fetch stats for the image
  //           // console.log("stats")
  //           // console.log(stats)

  //           // console.log("like_state")
  //           //  console.log(like_state)

  //            console.log("imageData")
  //            console.log(imageData)
  //           return {
  //             ...imageData,
  //             contributors,
  //             stats,
  //             like_state
  //           };
  //         })
  //       );

  //       console.log("updatedImages")
        
  //     console.log(data)
  //       console.log(updatedImages)
  //       // setLoading(false)
  //       // return false;
  //       setImagesWithContributors(updatedImages);

  //       // Set current image index based on the initial `image` prop
  //       const initialIndex = updatedImages.findIndex((img) => img.id_image === image.id_image);
  //       setCurrentImageIndex(initialIndex !== -1 ? initialIndex : 0);  // Fallback to 0 if image is not found
  //       // Notify parent that the data has been loaded
  //       if (onDataLoaded) {
  //         onDataLoaded(true);
  //       }
    
  //     };

  //     fetchImagesWithContributors();

  //   }
  //   // setLoading(false)
  // }, [data, image , onDataLoaded]); // Ensure the effect runs when data or image props change

  useEffect(() => {
    if (!data || data.length === 0) return;
  
    // Afficher immédiatement les images avec des valeurs vides pour éviter le délai
  const first_load =  setImagesWithContributors(
      data.map((imageData) => ({
        ...imageData,
        contributors: [],
        stats: [],
        like_state: []
      }))
    );
      // Définir l'index de l'image actuelle
      const first_index = data.findIndex((img) => img.id_image === image.id_image);
      setCurrentImageIndex(first_index !== -1 ? first_index : 0);
  
  
    const fetchImagesWithContributors = async () => {
      const updatedImages = await Promise.all(
        data.map(async (imageData) => {
          const [contributors, stats, like_state] = await Promise.all([
            fetchContributors(imageData.id_image),
            fetchImageStats(imageData.id_image),
            fetchhasLiked(imageData.id_image)
          ]);
  
          return { ...imageData, contributors, stats, like_state };
        })
      );
  
      setImagesWithContributors(updatedImages);
  
      // Définir l'index de l'image actuelle
      const initialIndex = updatedImages.findIndex((img) => img.id_image === image.id_image);
      setCurrentImageIndex(initialIndex !== -1 ? initialIndex : 0);
  
      // Notifier que les données sont chargées
      onDataLoaded?.(true);
    };
  
    fetchImagesWithContributors();
  }, [data, image, onDataLoaded]); // Déclenché lorsque data ou image change
  
  
  // Update contributors data whenever the current image changes
  useEffect(() => {
    if (imagesWithContributors.length > 0) {

      console.log("imagesWithContributors")
      console.log(imagesWithContributors)
      const currentImage = imagesWithContributors[currentImageIndex];

      console.log("currentImage")
      
      console.log(currentImage)
      setModeldata({idmodel : currentImage.idmannequin , pseudomodel : currentImage.pseudo_model })
       setPhotographe(currentImage.contributors?.photographes || []);
      setStyliste(currentImage.contributors?.stylistes || []);
      setBoutiques(currentImage.contributors?.boutiques || []);
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
      // alert('Vous avez déjà aimé ce contenu');
      toast.info('Vous avez déjà aimé ce contenu!');
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
          toast.success('Contenu aimé avec succès !');
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
        <ToastContainer />
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
                    src={`${apiUrl}/${getPathForResolution_b(currentImage.paths)}` || "/assets/img/avatar/dame.png"}
                    // src={`${apiUrl}/${getPathForResolution_b(currentImage.paths)}`}
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
                         {/* like {currentImage?.like_state[0]?.has_liked} */}
                          {/* <button onClick={() => handleLike(currentImage.id_image)}>
                            <FontAwesomeIcon icon={faThumbsUp} className="mr-3" />
                              <span className="ml-3">{likeCount}</span>
                          </button> */}
                          <button
  onClick={() => handleLike(currentImage.id_image)}
  className={currentImage?.like_state[0]?.has_liked === 1 ? 'active' : ''}
  disabled={currentImage?.like_state[0]?.has_liked === 1}  // Désactive le bouton si l'utilisateur a déjà aimé
>
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
          <div className="details-section">
          
          <div className="contributeurs_list_container">
  {modeldata?.pseudomodel && (
    <>
    
      <a className="cstm_link_b mx-1" href={`/mannequins`}>
        mannequin
      </a>

      <a className="cstm_link" href={`/single_view/1/${modeldata?.idmodel}`}>
        {modeldata?.pseudomodel} /
      </a> 
    </>
  )}

  <a href="/parteners" className="cstm_link_b ">
    Collabs :
  </a>

  {imagesWithContributors.length > 0 && imagesWithContributors[currentImageIndex] && (
    <>
      {photographe.length > 0 && (
        <label className="photographe">
          {photographe.map((item, index) => (
            <React.Fragment key={item?.collab_id}>
              <a href={`/singleViewP/1/${item?.collab_id}`} className="cstm_link">
                {item?.collab_pseudo}
              </a>
              {index < photographe.length - 1 && ' & '}
            </React.Fragment>
          ))}
          <span className="label">photo / </span>
        </label>
      )}

      {styliste.length > 0 && (
        <label className="styliste">
          {styliste.map((item, index) => (
            <React.Fragment key={item?.collab_id}>
              <a href={`/singleViewP/4/${item?.collab_id}`} className="cstm_link">
                {item?.collab_pseudo}
              </a>
              {index < styliste.length - 1 && ' & '}
            </React.Fragment>
          ))}
          <span className="label">costume / </span>
        </label>
      )}

      {maquilleur.length > 0 && (
        <label className="maquilleur">
          {maquilleur.map((item, index) => (
            <React.Fragment key={item?.collab_id}>
              <a href={`/singleViewP/2/${item?.collab_id}`} className="cstm_link">
                {item?.collab_pseudo}
              </a>
              {index < maquilleur.length - 1 && ' & '}
            </React.Fragment>
          ))}
          <span className="label">makeup / </span>
        </label>
      )}

      {coiffeur.length > 0 && (
        <label className="coiffeur">
          {coiffeur.map((item, index) => (
            <React.Fragment key={item?.collab_id}>
              <a href={`/singleViewP/3/${item?.collab_id}`} className="cstm_link">
                {item?.collab_pseudo}
              </a>
              {index < coiffeur.length - 1 && ' & '}
            </React.Fragment>
          ))}
          <span className="label">hair / </span> 
        </label>
      )}

{boutique.length > 0 && (
        <label className="coiffeur">
          {boutique.map((item, index) => (
            <React.Fragment key={item?.collab_id}>
              <a href={`/singleViewP/5/${item?.collab_id}`} className="cstm_link">
                {item?.nom_boutique}
              </a>
              {index < boutique.length - 1 && ' & '}
            </React.Fragment>
          ))}
          <span className="label">boutique</span>
        </label>
      )}
    </>
  )}
</div>

          </div>
      
      </div>
    </div>
  </div>
  );
};

export default ImageModal;

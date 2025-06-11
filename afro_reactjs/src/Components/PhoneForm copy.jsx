import { auth } from '../firebase-config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useState } from 'react';

import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import { useNavigate } from 'react-router-dom';

const apiUrl = "https://apiafro.aafrodites.com";

const PhoneForm = ({ onCodeSent }) => {
 
    // const [phone, setPhone] = useState('');
    // const navigate = useNavigate();
    const [code_pays, setcode_pays] = useState("+228");
    const [phoneNumber, setPhoneNumber] = useState("");
    
  
  const handlePhoneChange = (e) => {
      setPhoneNumber(e.target.value);
    };
  
    const handleSendCode = async (e) => {
      e.preventDefault();
  
      // const data = { code_pays, phoneNumber };
       const loadingToast = toast.info('demande en cours...', {
        position: "top-center",
        autoClose: false, // Ne ferme pas la notification automatiquement
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
     
     const formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');
        const phon_num = code_pays +''+ phoneNumber;
        console.log("phon_num")
        console.log(phon_num)
     const data = { 
      indicatif :code_pays,
      number : phoneNumber,
      date : formattedDate
  };
  
      // console.log(data)
      // return false;
      try {
         
        // if (!window.recaptchaVerifier) {
        //   window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        //     size: 'invisible',
        //     callback: (response) => {
        //       console.log('reCAPTCHA validé');
        //     },
        //   });
        // }
    
          // const confirmationResult = await signInWithPhoneNumber(auth, phone);
          // const result = await signInWithPhoneNumber(auth, phon_num ,window.recaptchaVerifier);
          // setConfirmationResult(result);
            // Dismiss la notification de "sauvegarde en cours"
                   toast.dismiss(loadingToast);
        const send_otp =  await axios.post(`${apiUrl}/auth/send-otp`,phon_num );
      
              console.log(send_otp)
              
              return false;
          toast.success('Code OTP envoyé avec succès');
          console.log("result")
          console.log(result)
          // window.confirmationResult = confirmationResult;
        // return false;
        onCodeSent(result);
          // await axios
          //  .post(`${apiUrl}/auth/verify_number`,
          //   data
          //    )
          //  .then((result) => {
       
         
          //  console.log(result)
          //      if(result){
          //         // Dismiss la notification de "sauvegarde en cours"
          //          toast.dismiss(loadingToast);
          //          console.log("result")
          //          console.log(result)
          //          return false;
        
          //          const subCategoriesToCheck = new Set([
          //           "meet_afrodite_former_mannequinnat",
          //           "meet_afrodite_hotesse_accueil",
          //           "meet_afrodite_influenceur",
          //           "meet_afrodite_maquillage",
          //           "meet_afrodite_former_selfconfiance",
          //           "meet_afrodite_etiquette_image",
          //           "meet_afrodite_former_fitness"
          //         ]);
                  
          //         if (formData?.rencontrer_afrodite?.etat_candidature) {
          //           setContacter_afrodites(1);
          //         } else if (
          //           formData?.formation?.some(
          //             (formation) =>
          //               formation?.category === "meet_afrodite_formation" ||
          //               formation?.subCategories?.some((sub) => subCategoriesToCheck.has(sub))
          //           )
          //         ) {
          //           setContacter_afrodites(1);
          //         }
    
          //           //  if(formData?.rencontrer_afrodite?.etat_candidature === true){
    
          //           //   setContacter_afrodites(1)
          //           //  }
          //           //   if(formData?.formation.length > 0){
          //           //   for(let i= 0; i < formData?.formation.length; i++){
          //           //     if(formData?.formation[i]?.category === "meet_afrodite_formation"){
    
          //           //       setContacter_afrodites(1)
          //           //     }
                       
          //           //       if(formData?.formation[i]?.subCategories.length > 0){
          //           //         // alert('bis')
          //           //         for(let j = 0; j < formData?.formation[i]?.subCategories.length; j++){
          //           //           if((formData?.formation[i]?.subCategories[j] ==="meet_afrodite_former_mannequinnat")
          //           //           || (formData?.formation[i]?.subCategories[j] ==="meet_afrodite_hotesse_accueil")
                            
          //           //           || (formData?.formation[i]?.subCategories[j] ==="meet_afrodite_influenceur")
          //           //           || (formData?.formation[i]?.subCategories[j] ==="meet_afrodite_maquillage")
          //           //           || (formData?.formation[i]?.subCategories[j] ==="meet_afrodite_former_selfconfiance")
          //           //           || (formData?.formation[i]?.subCategories[j] ==="meet_afrodite_etiquette_image")
          //           //           || (formData?.formation[i]?.subCategories[j] ==="meet_afrodite_former_fitness")
          //           //           )
          //           //           {
          //           //             setContacter_afrodites(1)
          //           //           }
          //           //       }
          //           //        }
                      
          //           //     }
          //           //   }
          //           //  alert('pass')
          //         //  vérifier si il y a des cas de contacter afrodites
          //          if(result?.data?.user === undefined){
    
          //           if(result?.data?.msg){
          //             // alert('1')
          //             toast.error(result?.data?.msg, {
          //               position: "top-center",
          //               autoClose: 3000,
          //               hideProgressBar: true,
          //               closeOnClick: true,
          //               pauseOnHover: true,
          //               draggable: true,
          //               progress: undefined,
          //               theme: "light",
          //               // transition: Bounce,
          //             });
                      
     
          //           }
    
          //           setNewUser(0)
          //           setIsModalOpen(true)
    
          //           setIsSubmitting(false); 
     
          //          }
          //          else{
          //           // alert('2')
          //           // alert('test')
          //           if(result?.data?.msg){
          //             toast.error(result?.data?.msg, {
          //               position: "top-center",
          //               autoClose: 3000,
          //               hideProgressBar: true,
          //               closeOnClick: true,
          //               pauseOnHover: true,
          //               draggable: true,
          //               progress: undefined,
          //               theme: "light",
          //               // transition: Bounce,
          //             });
                      
          //             setIsSubmitting(false); 
     
          //           }
          //           else{
          //             toast.success('demande soumis avec succès' , {
          //               position: "top-center",
          //               autoClose: 3000,
          //               hideProgressBar: true,
          //               closeOnClick: true,
          //               pauseOnHover: true,
          //               draggable: true,
          //               progress: undefined,
          //               theme: "light",
          //               // transition: Bounce,
          //             });
                      
          //            //  setIsModalOpen(true)
          //             if(result.data?.user != null && result.data?.token != null){
          //               // Sauvegarder les données du user dans le localStorage
          //               const   user   = result.data?.user; // Assurez-vous que `response.data.user` contient l'ID, le pseudo et le password
          //               const  token = result.data?.token; // Assurez-vous que `response.data.user` contient l'ID, le pseudo et le password
                       
          //               setAuth_ids((prevState) => ({
          //                 ...prevState,
          //                 auth: {
                           
          //                   pseudo: result.data?.pseudo || "", // Si phone1 est vide, on met une chaîne vide pour éviter les erreurs
          //                   pass: result.data?.pass || "-",
                            
          //                 },
          //               }));
                     
          //               setNewUserData([user , result.data?.pass])
          //                auth.saveToLocalStorage(user ,token);
          //             setNewUser(1)
          //             setIsModalOpen(true)
    
          //             setIsSubmitting(false); 
     
          //                   }
     
          //           }
    
          //          }
    
          //         //  return false;
          //          // affciher une notif
          //          // setIsNotification(true)
               
                 
                   
    
                  
               
     
          //      }
    
             
          //    }); 
             
       } catch (err) {
         console.log(err);
         // setError(err.response.data);
       }   
      
  };
//   const handleSendCode = async () => {
//     window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//       size: 'invisible',
//     });

//     const confirmation = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
//     onCodeSent(confirmation);
//   };

  return (
    <>
    
        <ToastContainer className="toast_style"/>
        <div id="recaptcha-container"></div>

       <div className="form_title">
        <label>Récupération de mot de passe</label>
   
        </div>
      <form className="form_zone">

           <div className="form_control">

<div className="indicatif">

<input type="text" 
className="indicatif input_padding" 
placeholder="code"
value={code_pays} 
onChange={(e) => setcode_pays(e.target.value)} />

</div>

<div className="tel_number">

<input type="tel" className="contact input_padding" placeholder="numéro"
    value={phoneNumber} onChange={handlePhoneChange}  />
   
</div>

         </div>
        
       
      {/* <input
        className='form_control'
        type="tel"
        placeholder="votre numéro de téléphone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      /> */}


      <div className="btn_container">
    
           <button onClick={handleSendCode}>Envoyer le code</button>
   
      </div>
     
      </form>
    </>
  );
};

export default PhoneForm;

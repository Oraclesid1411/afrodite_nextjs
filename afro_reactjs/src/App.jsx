import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState, useEffect ,useRef  } from "react"; 

// auth imports
import AuthProvider from "./Context/AuthenticateContext.jsx";
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import { useAuth } from "./Context/AuthenticateContext.jsx";

// pages
import Home from './Pages/Home';
import Modeles from './Pages/Modeles';
import Hotesses from './Pages/Hotesses';
import Events from './Pages/Events';
import Castings from './Pages/Castings';
import SingleView from './Components/SingleView';
import SingleViewI from './Components/SingleViewI.jsx';
import SingleViewP from './Components/SingleViewP.jsx';
import SingleViewH from './Components/SingleViewH.jsx';
import Nous_sommes from './Components/Nous_sommes';
import Register from './Components/Register.jsx';
import Login from './Components/Login.jsx';
import Profile from './Pages/Comptes/Profile.jsx';
import Postuler from './Pages/Postuler.jsx';
import EventModal from './Pages/EventModal';
import EventDetail from './Pages/EventDetail.jsx';
import LesAfrodites from './Pages/LesAfrodites';
import Influenceur from './Pages/infuenceur.jsx';

import Vlog from './Pages/Vlog.jsx';
import Parteners from './Pages/Parteners.jsx';

import PostulerMannequin from './Postuler/postulerMannequin.jsx';
import PostulerHotesse from './Postuler/postulerHotesse.jsx';
import PostulerFranchise from './Postuler/postulerFranchise.jsx';
import PostulerInfluenceur from './Postuler/postulerInfluenceur.jsx';
import Franchises from './Pages/Franchises.jsx';

import Postuler_models from './Pages/Postuler/Postuler_models.jsx';
import EtatCandidatures from './Pages/Postuler/EtatCandidatures.jsx';
// import PostulerFranchise from './Pages/Postuler/postulerFranchise.jsx';

// admins
import RegisterAdmin from './Components/RegisterAdmin.jsx';

import AdminRoute from './Components/AdminRoute.jsx';
import AdminProvider from './Context/AdminContext.jsx';
import AdminDashboard from './Pages/admin/AdminDashboard.jsx';
import ManageUsers from './Pages/admin/ManageUsers.jsx';
import AdminLogin from './Components/AdminLogin.jsx';
import Sidebar from './Pages/admin/Sidebar.jsx';
import Navbar from './Pages/admin/Navbar.jsx';
import FashionModelMgt from './Pages/admin/FashionModelMgt.jsx';
import Admin_modelSingleView from './Pages/admin/Admin_modelSingleView.jsx';
import Hotesse_Mgt from './Pages/admin/Hotesse_Mgt.jsx';
import Collabs_Mgt from './Pages/admin/Collabs_Mgt.jsx';
import Influenceurs_Mgt from './Pages/admin/Influenceurs_Mgt.jsx';
import Services_Afro from './Components/Services_Afro.jsx';
import Rejoindre_afrodites from './Pages/Postuler/Rejoindre_afrodites.jsx';
import Manage_joiner from './Pages/managers/Manage_joiner.jsx';
import Liste_postulant from './Pages/managers/Liste_postulant.jsx';
import Notifications from './Components/Notifications.jsx';
import SingleNotification from './Components/SingleNotification.jsx';
import CreerProfil from './Pages/Comptes/CreerProfil.jsx';
// import CreerbusinessCompte from './Pages/business/CreerbusinessCompte.jsx';
import Creerfranchises from './Pages/franchises/Creerfranchises.jsx';
import Admin_events from './Pages/admin/Admin_events.jsx';
// import Calendar_view from './Pages/Calendar_view.jsx';
// import Timeline_view from './Pages/Timeline_view.jsx';
import Calendar_page from './Pages/events/Calendar_page.jsx';
import Timelines_page from './Pages/events/Timelines_page.jsx';
import Organisateurs from './Pages/admin/Organisateurs.jsx';
import Business from './Pages/business/Business.jsx';
import Create_business from './Pages/business/Create_business.jsx';


// firebase 
import { onMessage } from "firebase/messaging";
import { messaging } from "./firebase-config";
import requestPermission from "./sevices/NotificationService.js";
import ForgetPasswordPhone from './Components/ForgetPasswordPhone.jsx';
import Create_franchise from './Pages/franchises/Create_franchise.jsx';
// import RegisterAdmin from './uses/src/Components/RegisterAdmin.jsx';


// firebase
function MainApp() {
  const auth = useAuth();
 
  const { isAdmin, isAuthenticatedA } = useAuth()

  console.log("auth b")
  console.log(auth)
  const location = useLocation(); // Utilisation du hook pour récupérer la route actuelle
  const isAdminRoute = location.pathname.startsWith('/admin'); // Vérifie si la route commence par /admin
 const [adminName, setAdminName] = useState("");
  
  // const adminName = "admin"; // Replace with dynamic data if needed

  useEffect(() => {
     
  if(auth){

    const user_info = auth.currentUser;
    setAdminName(user_info?.pseudo)
    requestPermission(user_info?.id);

    // Écouter les notifications entrantes
    onMessage(messaging, (payload) => {
      // console.log("Notification reçue : ", payload);
      alert(`Notification : ${payload.notification.title}`);
    });

    
  }
  }, []);

  return (
    <>
      {/* Afficher Sidebar et Navbar uniquement pour les routes admin */}
      {isAdminRoute && <Sidebar />}
      {isAdminRoute && <Navbar adminName={adminName} />}
      <Routes>
        {/* Routes admin protégées */}
        <Route path='/adminlogin' element={<AdminLogin />}></Route>
        <Route
          path="/admin"
          element={
            <AdminRoute isAdmin={isAdmin} isAuthenticatedA={isAuthenticatedA}>
                        <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage-users"
          element={
             <AdminRoute isAdmin={isAdmin} isAuthenticatedA={isAuthenticatedA}>
                 <ManageUsers />
            </AdminRoute>
          }
        />
           <Route
          path="/admin/organisateurs"
          element={
             <AdminRoute isAdmin={isAdmin} isAuthenticatedA={isAuthenticatedA}>
                <Organisateurs />
            </AdminRoute>
          }
        />
     
      <Route
          path="/admin/fashionmodelsmngt"
          element={
             <AdminRoute isAdmin={isAdmin} isAuthenticatedA={isAuthenticatedA}>
                  <FashionModelMgt />
            </AdminRoute>
          }
        />

<Route
          path="/admin/hotesses"
          element={
             <AdminRoute isAdmin={isAdmin} isAuthenticatedA={isAuthenticatedA}>
                       <Hotesse_Mgt />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/influenceurs"
          element={
             <AdminRoute isAdmin={isAdmin} isAuthenticatedA={isAuthenticatedA}>
                       <Influenceurs_Mgt />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/collabs"
          element={
             <AdminRoute isAdmin={isAdmin} isAuthenticatedA={isAuthenticatedA}>
                       <Collabs_Mgt />
            </AdminRoute>
          }
        />

<Route
          path="/admin/events"
          element={
             <AdminRoute isAdmin={isAdmin} isAuthenticatedA={isAuthenticatedA}>
                       <Admin_events />
            </AdminRoute>
          }
        />
            {/* <Route path='/single_view/:categorie/:id' element={<SingleView />}></Route> */}
            <Route
          path="/admin/register"
          element={
            <AdminRoute isAdmin={isAdmin} isAuthenticatedA={isAuthenticatedA}>
              <RegisterAdmin />
            </AdminRoute>
          }
        />

          <Route
          path="/admin/detail_mannequin/:categorie/:id"
          element={
             <AdminRoute isAdmin={isAdmin} isAuthenticatedA={isAuthenticatedA}>
                       <Admin_modelSingleView />
            </AdminRoute>
          }
        />
        {/* Fin des routes admin */}

        {/* manager route */}
        <Route path='/manager' element={<Liste_postulant />}></Route>
        <Route path='/notifications' element={<Notifications />}></Route>
        <Route path="/notification/:id" element={<SingleNotification />} />
        {/* manager route */}
        {/* Routes principales */}
        <Route path='/' element={<Home />}></Route>
        <Route path='/services_afro' element={<Services_Afro />}></Route>
        <Route path='/creercomptebusiness' element={<Business />}></Route>
        <Route path='/creer_profil' element={<CreerProfil />}></Route>
        <Route path='/creerbusiness' element={<Create_business />}></Route>
        <Route path='/creerfranchise' element={<Create_franchise />}></Route>
        <Route path='/postuler/:id' element={<Postuler_models />}></Route>
        <Route path='/etatcandidature/' element={<EtatCandidatures />}></Route>
        <Route path='/postuler/' element={<Postuler_models />}></Route>
        <Route path='/join/:id' element={<Rejoindre_afrodites />}></Route>
        <Route path='/mannequins' element={<Modeles />}></Route>
        <Route path='/mannequins/:id' element={<Modeles />}></Route>
        <Route path='/hodesse_accueil' element={<Hotesses />}></Route>
        <Route path='/influenceur' element={<Influenceur />}></Route>
        <Route path='/castings' element={<Castings />}></Route>
        <Route path='/evenements' element={<Calendar_page />}></Route>
        <Route path='/events_calendar' element={<Calendar_page />}></Route>
        <Route path='/event_timelines' element={<Timelines_page />}></Route>
        <Route path='/zoom/month/:id' element={<Events />}></Route>
        <Route path='/zoom/month/:year' element={<Events />}></Route>
        <Route path='/event/:id' element={<EventDetail />}></Route>
        <Route path='/about' element={<Nous_sommes />}></Route>
        <Route path='/lesafrodites' element={<LesAfrodites />}></Route>
        <Route path='/single_view/:categorie/:id' element={<SingleView />}></Route>
        <Route path='/singleViewI/:categorie/:id' element={<SingleViewI />}></Route>
        <Route path='/singleViewP/:categorie/:id' element={<SingleViewP />}></Route>
        <Route path='/single_viewH/:categorie/:id' element={<SingleViewH />}></Route>
        <Route path='/vlog' element={<Vlog />}></Route>
        <Route path='/parteners' element={<Parteners />}></Route>
        <Route path='/franchises' element={<Franchises />}></Route>
        {/* Auth routes */}
        <Route path='/forgotpass' element={<ForgetPasswordPhone />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/postulerMannequin' element={<PostulerMannequin />}></Route>
        <Route path='/postulerHotesse' element={<PostulerHotesse />}></Route>
        <Route path='/postulerFranchise' element={<PostulerFranchise />}></Route>
        <Route path='/postulerInfluenceur' element={<PostulerInfluenceur />}></Route>
      </Routes>
    </>
  );
}

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <AdminProvider>
          <MainApp />
        </AdminProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

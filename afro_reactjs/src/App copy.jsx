 
//  react modules
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
 
// auth imports
import AuthProvider  from "./Context/AuthenticateContext.jsx";
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import { useAuth} from "./Context/AuthenticateContext.jsx";

// pages
import Home from './Pages/Home'
import Modeles from './Pages/Modeles'
import Hotesses from './Pages/Hotesses'
import Events from './Pages/Events'
import Castings from './Pages/Castings'
import SingleView from './Components/SingleView'
import SingleViewI from './Components/SingleViewI.jsx';
import SingleViewP from './Components/SingleViewP.jsx';
import SingleViewH from './Components/SingleViewH.jsx';
import Nous_sommes from './Components/Nous_sommes' 
import Register from './Components/Register.jsx';
import Login from './Components/Login.jsx';
import Profile from './Pages/Comptes/Profile.jsx';
import Postuler from './Pages/Postuler.jsx';
import EventModal from './Pages/EventModal';
import EventDetail from './Pages/EventDetail.jsx';
// import ZoomView from './Pages/ZoomView';
import LesAfrodites from './Pages/LesAfrodites';
import Influenceur from './Pages/infuenceur.jsx';
// import ForgotPass from './Components/ForgotPass.jsx'; 

import Vlog from './Pages/Vlog.jsx';
import Parteners from './Pages/Parteners.jsx';

import PostulerMannequin from './Postuler/postulerMannequin.jsx';
import PostulerHotesse from './Postuler/postulerHotesse.jsx';
import PostulerFranchise from './Postuler/postulerFranchise.jsx';
import PostulerInfluenceur from './Postuler/postulerInfluenceur.jsx';
import Franchises from './Pages/Franchises.jsx';

import Postuler_models from './Postuler/Postuler_models.jsx';
import EtatCandidatures from './Postuler/EtatCandidatures.jsx';

// admins
import AdminRoute from './Components/AdminRoute.jsx';
import  AdminProvider  from './Context/AdminContext.jsx';
import AdminDashboard from './Pages/admin/AdminDashboard.jsx';
import ManageUsers from './Pages/admin/ManageUsers.jsx';
import AdminLogin from './Components/AdminLogin.jsx';
import Sidebar from './Pages/admin/Sidebar.jsx';
import Navbar from './Pages/admin/Navbar.jsx';


function App() {
  const adminName = "John Doe"; // Replace with dynamic data if needed

  return (
    <BrowserRouter>
     <AuthProvider>
     <AdminProvider>
     <Sidebar />
     <Navbar adminName={adminName} />
        <Routes>
           {/* Routes admin protégées */}
           <Route path='/adminlogin' element={<AdminLogin />}></Route> 
         
           <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/manage-users"
              element={
                <AdminRoute>
                  <ManageUsers />
                </AdminRoute>
              }
            />

            {/* fin des routes admin */}
          
          <Route path='/' element={<Home />}></Route> 
          <Route path='/postuler/:id' element={<Postuler_models />}></Route> 
         
          <Route path='/etatcandidature/' element={<EtatCandidatures />}></Route>
          <Route path='/postuler/' element={<Postuler />}></Route> 
          <Route path='/mannequins' element={<Modeles />}></Route> 
          <Route path='/hodesse_accueil' element={<Hotesses />}></Route> 
          <Route path='/influenceur' element={<Influenceur />}></Route> 
          <Route path='/castings' element={<Castings />}></Route> 
          <Route path='/evenements' element={<Events />}></Route> 



          


          <Route path='/zoom/month/:id' element={<Events />}></Route> 
          <Route path='/zoom/month/:year' element={<Events />}></Route> 
          {/* <Route path='/event/:date' element={<EventModal />}></Route>  */}
          <Route path='/event/:id' element={<EventDetail />}></Route> 
          
          {/* <Route path='/zoom' element={<ZoomView />}></Route>  */}



          <Route path='/about' element={<Nous_sommes />}></Route> 
          <Route path='/lesafrodites' element={<LesAfrodites />}></Route> 
          <Route path='/single_view/:categorie/:id' element={<SingleView />}></Route>
          <Route path='/singleViewI/:categorie/:id' element={<SingleViewI />}></Route> 
          <Route path='/singleViewP/:categorie/:id' element={<SingleViewP />}></Route> 
          <Route path='/single_viewH/:categorie/:id' element={<SingleViewH />}></Route> 



          <Route path='/vlog' element={<Vlog />}></Route>
          <Route path='/parteners' element={<Parteners />}></Route>
          <Route path='/franchises' element={<Franchises />}></Route> 

          

          {/* auth routes */}
          <Route path='/login' element={<Login />}></Route> 
          <Route path='/register' element={<Register />}></Route> 
          <Route path='/profile' element={<Profile />}></Route> 




          <Route path='/postulerMannequin' element={<PostulerMannequin />}></Route> 
          <Route path='/postulerHotesse' element={<PostulerHotesse />}></Route> 
          <Route path='/postulerFranchise' element={<PostulerFranchise />}></Route> 
          <Route path='/postulerInfluenceur' element={<PostulerInfluenceur />}></Route> 


          
          {/* <Route path='/search/:id' element={<SearchComponent />}></Route> */}
      

          </Routes>
          </AdminProvider>
     </AuthProvider>
   
     
    </BrowserRouter>
  )
}

export default App

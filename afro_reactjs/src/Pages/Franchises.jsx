import React from 'react'
import Header_menu from '../Components/Header_menu'
import Footer from '../Components/Footer'
// import All_Vlogs from './Vlogs/all_Vlogs'
import FixedMenu from '../Components/FixedMenu'




function Franchises() {
    return <>
    <Header_menu data ={{ link : 'home' }} />
    <div className="main_container">
        <div className="main_header text-center">
            <h1 className='text-white my-4'>Nos Franchises</h1>
        </div>
        <div className="container bg-white m-100 w-100">
        <p> Franchises afrodites?</p>
          <p> Comment devenir franchises d'afrodites</p>

          <label> Devenir franchise afrodites</label>
          <label> Liste de nos franchises</label>
        </div>
    </div>


    <Footer /> 
<FixedMenu/>
  </>
}

export default Franchises
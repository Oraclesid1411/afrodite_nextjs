import React from 'react'
import Header_menu from '../Components/Header_menu'
import All_afrodites from './LesAfrodites/All_afrodites'
import Footer from "../Components/Footer"
import FixedMenu from '../Components/FixedMenu'



function LesAfrodites() {
  return <>
      <Header_menu data ={{ link : '' }} />
      <div className="main_container">
                {/* main data hotesse */}
                {/* <All_afrodites />       */}
            </div>


      <Footer /> 
      <FixedMenu />

    </>
}

export default LesAfrodites
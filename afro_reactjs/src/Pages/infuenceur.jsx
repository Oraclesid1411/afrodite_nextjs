import React from 'react'
import Header_menu from '../Components/Header_menu'
import Footer from '../Components/Footer'
import All_Influenceurs from './Influenceurs/All_Influenceurs'
import FixedMenu from '../Components/FixedMenu'

import All_afrodite from './LesAfrodites/All_afrodites'
import Header_banner from '../Components/Header_banner'



function Influenceur() {
    return <>
    {/* <Header_menu data ={{ link : 'home' }} /> */}
    <Header_menu data ={{ link : 'influenceurs' }} />
   <div className="bgt_container">
   <All_afrodite data ={{ link : 'influenceur' }}/>

    <div className="main_container bgt_container">
        <div className="">
            <All_Influenceurs />
        </div>
    </div>

   </div>
 

<FixedMenu />
  </>
}

export default Influenceur
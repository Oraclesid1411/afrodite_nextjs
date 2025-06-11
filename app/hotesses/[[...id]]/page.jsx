import React from 'react'

// import Header_menu from "../Components/Header_menu" 
// import Footer from "../Components/Footer"
// import Hero_b from '../Components/Hero_b' 
import All_hotesses from '../../../components/models/All_hotesses'
// import FixedMenu from '../Components/FixedMenu'

import All_afrodite from '../../../components/models/All_afrodites'
// import Header_banner from '../Components/Header_banner'


function Hotesses() {
  return (
    <>
        {/* <Header_menu data ={{ link : 'mannequin' }}/> */}
      {/* <Header_menu data ={{ link : 'hot. d\'accueil' }}/> */}
  <div className="bgt_container">
  <All_afrodite data ={{ link : 'hotesse' }}/>

<div className="">
      <All_hotesses />          
</div>
  </div>
        
      {/* <FixedMenu /> */}

    </>
  )
}

export default Hotesses
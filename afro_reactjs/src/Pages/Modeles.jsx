import React from 'react'

import Header_banner from "../Components/Header_banner"  
import Footer from "../Components/Footer"
import Hero_b from '../Components/Hero_b'
import All_models from './Models/All_models'
import Recent_models from './Models/Recent_models'
import Top_models from './Models/Top_models'
import FixedMenu from '../Components/FixedMenu'

import All_afrodite from './LesAfrodites/All_afrodites'
import Header_menu from '../Components/Header_menu'


function Modeles() {
  return (
    <>
    {/* <Header_menu data ={{ link : 'mannequin' }}/> */}
    <Header_menu data ={{ link : 'mannequins' }} />
  
<div className="container bgt_container">
<All_afrodite data ={{ link : 'mannequins' }}/>

<div className="">
      <All_models />          
</div>
</div>
  
       

<FixedMenu/>
</>
  )
}

export default Modeles
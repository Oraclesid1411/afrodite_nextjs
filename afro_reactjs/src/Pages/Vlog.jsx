import React from 'react'
import Header_banner from '../Components/Header_banner'
import Footer from '../Components/Footer'
import All_Vlogs from './Vlogs/all_Vlogs'
import FixedMenu from '../Components/FixedMenu'
import Header_menu from '../Components/Header_menu'

function Vlog() {
    return <>
     <Header_menu data={{ link: 'vlog' }} />
     {/* <Header_banner data ={{ link : 'vlogs' }} /> */}
    <div className="main_container">
        
        <div className="">
            <All_Vlogs />
        </div>
    </div>


<FixedMenu/>
  </>
}

export default Vlog
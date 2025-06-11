// import React from 'react'
// import Annoncement from './Annoncement'
import Header_menu from './Header_menu'
import Main_container from './Main_container'
// import Footer from './Footer'
// import $ from 'jquery';  
const Body = () => {
    
  // console.log('bck btn mount')
  // console.log( $(".btn-menu-back"))
  return (
        
        <>
             <Header_menu />
           <div className="body-wrapper">

            {/* <Annoncement /> */}
           
            <Main_container />
        
            {/* <Footer /> */}
          

           </div>
         </>
  )

}

export default Body

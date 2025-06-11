// import React from 'react'
import Header_menu from './Header_menu'
import Footer from './Footer'
function Nous_sommes() {
  return (
    <>
      <Header_menu data ={{ link : 'about' }}/>
        <div className="main_container">
            <h1 className="my-5 text-light text-center">
                Concernant Afrodite
            </h1> 
        </div>
        <Footer /> 
      
      </>
  )
}

export default Nous_sommes
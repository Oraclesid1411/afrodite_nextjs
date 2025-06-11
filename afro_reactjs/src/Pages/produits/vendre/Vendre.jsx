import React from 'react'

import {
    BrowserRouter, NavLink, Route, Switch, Link
  } from "react-router-dom";  
const Vendre = () => {
  return (
    <div className='container_sell'>
       <ul className='categorie_list'>
            <li> <Link className='link' to="/creervetement">Vêtements</Link></li>
            <li> <Link className='link' to="/">Accessoires</Link></li>
            <li> <Link className='link' to="/">Cosmétiques</Link></li>

            <li> <Link className='link' to="/">Cheveux</Link></li>
             

       </ul>
    </div>
  )
}

export default Vendre

import React, { useState } from 'react'

const creervetement = () => {
  return (
    <div className='creer_vetement'>
          <form className='form'>
          <div className="form-group">
            <label htmlFor="prix">prix </label>
            <input type="number" name="prix" value="" className="form-control" id="prix" placeholder="prix du produit" />
          </div>
          <div className="form-group">
            <label htmlFor="qte">quantité </label>
            <input type="number" name="qte" value="" className="form-control" id="qte" placeholder="quantité" />
          </div>
         
          <div className="submit_field">
                            <label>
                                                               
                              <button className='creer_button' >créer</button>
                       </label>
       </div>
        </form>
    </div>
  )
}

export default creervetement

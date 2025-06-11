// import React from 'react'
import Header_banner from "../../Components/Header_banner"
import Footer from "../../Components/Footer"

import image_a from "/assets/img/fs/vetements_default.jpeg"


function Catalogues() {
    
const students = [
 {
  id: 1,
  name: "John Doe",
  age: 20,
  course: "Business",
  grade: "A",
  attendance: "Present",
  status: "Active",
  remarks: "Good",
 },
 {
  id: 2,
  name: "Jane Smith",
  age: 22,
  course: "Engineering",
  grade: "B",
  attendance: "Absent",
  status: "Inactive",
  remarks: "Average",
 },
 {
  id: 3,
  name: "Alice Johnson",
  age: 21,
  course: "Medicine",
  grade: "A+",
  attendance: "Present",
  status: "Active",
  remarks: "Excellent",
 },
 {
  id: 4,
  name: "Bob Brown",
  age: 23,
  course: "Computer Science",
  grade: "C",
  attendance: "Present",
  status: "Active",
  remarks: "Fair",
 },
 {
  id: 5,
  name: "Eve Wilson",
  age: 24,
  course: "Arts",
  grade: "B+",
  attendance: "Absent",
  status: "Inactive",
  remarks: "Good",
 },
 {
  id: 6,
  name: "David Lee",
  age: 25,
  course: "Law",
  grade: "A-",
  attendance: "Present",
  status: "Active",
  remarks: "Very Good",
 },
 {
  id: 7,
  name: "Grace Clark",
  age: 26,
  course: "Science",
  grade: "D",
  attendance: "Absent",
  status: "Inactive",
  remarks: "Poor",
 },
];
  return (
    <>
     <div className="body-wrapper">
         <Header_banner  data_props ={{ 
                            title: 'Catalogues',
                     }} 
                     data_page = {{type: "comptes" , back_option: "on"}}
           />
              <main id="MainContent" className="content-for-layout">
                 <div className="cart-page mt-3 box_border">
                    <div className="container">
                    <div className="cart-page-wrapper">
                        <div className="row">
                            <div className="col-lg-7 col-md-12 col-12">
                                <table className="cart-table w-100">
                                   <thead>
                                      <tr>
                                        <th className="cart-caption heading_18">#</th>
                                        <th className="cart-caption heading_18">article</th>
                                        <th className="cart-caption text-center heading_18 d-none d-md-table-cell">Quantity</th>
                                        <th className="cart-caption text-end heading_18">Price</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="cart-item">
                                          <td className="cart-item-media">
                                            <div className="mini-img-wrapper">
                                                <img className="mini-img" src={image_a} alt="img"/>
                                            </div>                                    
                                          </td>
                                          <td className="cart-item-details">
                                            <h2 className="product-title"><a href="#">Eliot Reversible Sectional</a></h2>
                                            <p className="product-vendor">XS / Dove Gray</p>                                   
                                          </td>
                                          <td className="cart-item-quantity">
                                         
                                            another td                        
                                          </td>
                                          <td className="cart-item-price text-end">
                                            <div className="product-price">$580.00</div>                           
                                          </td>                        
                                        </tr>

                                    </tbody>

                                </table>

                            </div>
                          </div>
                       </div>
                    </div>
                </div>

              </main>
              <Footer />


     </div>

    
    </>
  )
}

export default Catalogues
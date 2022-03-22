import pic1 from "../img/pic1.jpg";
import React from "react";
import Footer from '../UserSide/components/common/Footer/Footer';
import { Container } from "react-bootstrap";
import NavBar from '../UserSide/components/common/nav/NavBar';

const AboutUs = () => {
  return (
    <>
    <NavBar/>
      <div style={{ position: "relative", width: "500px" }}>
        <img src={pic1} style={{height: "80vh", width: "100vw" ,objectFit:'cover' }} />
        <h4 className="text-white p-3 rounded-end  shadow" style={{ background:"#EF5023",position: "absolute", top:"50px", left:"0px"}}>
          Who are we?
        </h4>
         <div className="text-white p-3 rounded-3 " style={{ position: "absolute", top: "120px", left: "5px" , backgroundColor:'rgba(0,0,0,0.7)', width:'40rem'}}>
          Our technology platform connects customers, restaurant and riders,
          serving their multiple needs.<br /> Customers use our platform:
          <ol>
            <li>
            To search and discover restaurants
            </li>
            <li>
            Read and write reviews and view photos
            </li>
            <li>
            Order food online
            </li>
            <li>
            book a table and make payments while dining-out at restaurants
            </li>
          </ol>
          On the other hand, we provide restaurant partners with
          industry-specific marketing tools which enable them to engage and
          acquire customers to grow their business while also providing a
          reliable and efficient last mile delivery service.<br /> We also provide our
          delivery partners with transparent and flexible earning opportunities.
        </div> 
      </div>
      <div className="p-5">
        <h4>Explore over popular meal chart</h4>
        <p style={{marginBottom:'0px'}}>Choosing your next meal has never been this easy.</p>
        <p>With the most popular meals at the top of the chart, ordering is going to be so much fun.</p>
        <div className="row">
        <div className="about-us-divs text-white p-5 d-flex justify-content-center align-items-center rounded " style={{background:"#EF5023", height:"200px",width:"355px", margin:"2px"}}
          ><h2>Popular Meals</h2></div>
        <div className="about-us-divs text-white p-5  d-flex justify-content-center align-items-center rounded " style={{background:"#EF5023", height:"200px",width:"355px", margin:"2px"}}
          ><h2>Book Table</h2></div>
          <div className="about-us-divs text-white p-5 d-flex justify-content-center align-items-center rounded" style={{background:"#EF5023", height:"200px",width:"355px", margin:"2px"}}
          ><h2>Fast Delivery</h2></div>
            <div className="about-us-divs text-white p-5  d-flex justify-content-center align-items-center rounded " style={{background:"#EF5023", height:"200px",width:"355px", margin:"2px"}}
          ><h2>Search</h2></div>
          </div>
          
     </div>
     <Footer/>
     
         
    </>
  );
};

export default AboutUs;

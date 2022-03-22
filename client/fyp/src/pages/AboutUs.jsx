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
        <img src={pic1} style={{height: "auto", width: "100vw" }} />
        <h1 className="text-white p-1 rounded-end " style={{ background:"#EF5023",position: "absolute", top:"300px", left:"0px"}}
          >Who are we?</h1>
         <p className="text-white p-5 bg-dark " style={{ position: "absolute", top: "400px", left: "0" }} 
        >Our technology platform connects customers, restaurant and riders,
          serving their multiple needs. Customers use our platform to search and
          discover restaurants, read and write reviews and view photos, order
          food delivery, book a table and make payments while dining-out at
          restaurants. On the other hand, we provide restaurant partners with
          industry-specific marketing tools which enable them to engage and
          acquire customers to grow their business while also providing a
          reliable and efficient last mile delivery service.We also provide our
          delivery partners with transparent and flexible earning opportunities.
        </p> 
      </div>
      <div className="p-5">
        <h1 >Explore over popular meal chart</h1>
        <p>Choosing your next meal has never been this easy.</p>
        <p>With the most popular meals at the top of the chart, ordering is going to be so much fun.</p>
        <div class="row">
        <h1 className="text-white p-5  rounded " style={{background:"#EF5023", height:"200px",width:"400px", margin:"2px"}}
          >Popular Meals</h1>
        <h1 className="text-white p-5  rounded " style={{background:"#EF5023", height:"200px",width:"400px", margin:"2px"}}
          >Book Table</h1>
          <h1 className="text-white p-5  rounded" style={{background:"#EF5023", height:"200px",width:"400px", margin:"2px"}}
          >Fast Delivery</h1>
          </div>
     </div>
     <Footer/>
     
         
    </>
  );
};

export default AboutUs;

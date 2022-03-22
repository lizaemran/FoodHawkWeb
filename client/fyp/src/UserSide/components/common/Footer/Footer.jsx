import { Container, Row, Col } from "react-bootstrap";
import React from "react";
import "./Footer.css";
import {BsFacebook} from 'react-icons/bs';
import {AiFillInstagram} from 'react-icons/ai';
import {BsTwitter} from 'react-icons/bs';
function Footer() {
  return (
    <div className="main-footer">
      <p className="text-center fs-3 fw-bold">Food Hawk</p>
        <Container className="">
        <Row className="pt-3 pb-4">
            <Col xl={3} lg={3} md={3} sm={12} xs={12} className="d-flex justify-content-center align-items-center fs-6" style={{}}>About Us</Col>
            <Col xl={3} lg={3} md={3} sm={12} xs={12} className="d-flex justify-content-center align-items-center fs-6" style={{}}>Booking</Col>
            <Col xl={3} lg={3} md={3} sm={12} xs={12} className="d-flex justify-content-center align-items-center fs-6" style={{}}>Contact</Col>
            <Col xl={3} lg={3} md={3} sm={12} xs={12} className="d-flex justify-content-center align-items-center fs-6" style={{}}>FAQs</Col>
        </Row>
        <Row className="py-3">
        <Col className="d-flex justify-content-end align-items-center">
        <a href="https://www.facebook.com/profile.php?id=100079527450083">
          <BsFacebook className="fs-3" style={{color:"#EF5023"}}/>
          </a>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
        <BsTwitter className="fs-3" style={{color:"#EF5023"}}/>
        </Col>
        <Col className="d-flex justify-content-start align-items-center">
          <a href="https://www.instagram.com/foodhawk11/">
        <AiFillInstagram className="fs-3" style={{color:"#EF5023"}}/>
        </a>
        </Col>
        </Row>
        </Container>

     
</div>


      
                    
                       


  );
}

export default Footer;
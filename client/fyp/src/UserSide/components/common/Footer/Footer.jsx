import { Container, Row, Col } from "react-bootstrap";
import React from "react";
import "./Footer.css";
import {BsFacebook} from 'react-icons/bs';
import {AiFillInstagram} from 'react-icons/ai';
import {BsTwitter} from 'react-icons/bs';
function Footer() {
  return (
    <div className="main-footer">
      <p className="text-center fs-3 fw-bold text-dark">Food Hawk</p>
        <Container className="">
        <Row className="pt-3 pb-4">
            <Col xl={3} lg={3} md={3} sm={12} xs={12} className="d-flex justify-content-center align-items-center fs-6" style={{}}><a className='text-decoration-none text-dark'href='/about-us'>About Us</a></Col>
            <Col xl={3} lg={3} md={3} sm={12} xs={12} className="d-flex justify-content-center align-items-center fs-6" style={{}}><a className='text-decoration-none text-dark'href='/'>Booking</a></Col>
            <Col xl={3} lg={3} md={3} sm={12} xs={12} className="d-flex justify-content-center align-items-center fs-6" style={{}}><a className='text-decoration-none text-dark'href='/contact'>Contact</a></Col>
            <Col xl={3} lg={3} md={3} sm={12} xs={12} className="d-flex justify-content-center align-items-center fs-6" style={{}}><a className='text-decoration-none text-dark'href='/faqs'>FAQs</a></Col>
        </Row>
        <Row className="pt-3 pb-4">
            <Col xl={3} lg={3} md={3} sm={12} xs={12} className="d-flex justify-content-center align-items-center fs-6" style={{}}><a className='text-decoration-none text-dark'href='/register/restaurant'>Restaurant Login/Register</a></Col>
            <Col xl={3} lg={3} md={3} sm={12} xs={12} className="d-flex justify-content-center align-items-center fs-6" style={{}}><a className='text-decoration-none text-dark'href='/'>Place Order</a></Col>
            <Col xl={3} lg={3} md={3} sm={12} xs={12} className="d-flex justify-content-center align-items-center fs-6" style={{}}><a className='text-decoration-none text-dark'href='/rider/login'>Become Our Rider</a></Col>
            <Col xl={3} lg={3} md={3} sm={12} xs={12} className="d-flex justify-content-center align-items-center fs-6" style={{}}><a className='text-decoration-none text-dark'href='/'>Get Promos</a></Col>
        </Row>
        <Row className="py-5">
        <Col className="d-flex justify-content-end align-items-center">
          <BsFacebook className="fs-3" style={{color:"#EF5023"}}/>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
        <BsTwitter className="fs-3" style={{color:"#EF5023"}}/>
        </Col>
        <Col className="d-flex justify-content-start align-items-center">
        <AiFillInstagram className="fs-3" style={{color:"#EF5023"}}/>
        </Col>
        </Row>
        </Container>

     
</div>


      
                    
                       


  );
}

export default Footer;
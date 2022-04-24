import React, { useState } from 'react';
import './Form.css';
import FormSignup from './FormSignup';
// import FormSuccess from './FormSuccess';
import BurgerS from "../../img/loginpage.jpg";
import { Col, Row, Image } from 'react-bootstrap';
import NavBar from '../../UserSide/components/common/nav/NavBar';
import Footer from '../../UserSide/components/common/Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../img/Food_HawK-removebg-preview.png';
const Form = () => {

  return (
    <>
    <ToastContainer />
    <NavBar/>
    <Row className='bg-light'>
      <Col xl={6} lg={6} md={6} sm={12} xs={12} className='d-flex flex-column justify-content-center align-items-center text-dark'>
      {/* <Image className='log-img' src={BurgerS} alt="sign-in"/> */}
      <Image src={logo} style={{height:'auto', width:'15rem'}} />
          <h1>Food Hawk</h1>
          <h3>Serving you the best</h3>
      </Col>
      <Col xl={6} lg={6} md={6} sm={12} xs={12} className='d-flex flex-column justify-content-center align-items-start'>
      <FormSignup  />
      </Col>
    </Row>
    <Footer />
    </>
  );
};

export default Form;
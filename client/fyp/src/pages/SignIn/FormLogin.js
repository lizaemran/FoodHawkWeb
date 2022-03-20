import React, { useState } from 'react';
import FormLoginSub from './FormLoginSub';
// import FormSuccess from './FormSuccess';
import BurgerS from "../../img/registerpage.jpg";
import { Col, Row, Image } from 'react-bootstrap';
import NavBar from '../../UserSide/components/common/nav/NavBar';
import Footer from '../../UserSide/components/common/Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../img/Food_HawK-removebg-preview.png';
const FormLogin = () => {
    return (
        <>
      <ToastContainer />
    <NavBar/>
    <Row className='bg-light'>
    <Col xl={6} lg={6} md={6} sm={12} xs={12} className='d-flex flex-column justify-content-center align-items-center text-white'>
      {/* <Image className='log-img' src={BurgerS} alt="sign-in"/> */}
      <Image src={logo} style={{height:'auto', width:'15rem'}} />
          <h3 className='text-dark'>Food Hawk</h3>
          <h6 className='text-dark'>Serving you the best</h6>
      </Col>
      <Col xl={6} lg={6} md={6} sm={12} xs={12} className='d-flex flex-column justify-content-center align-items-center'>
      <FormLoginSub  />
      </Col>
    </Row>
    <Footer />
    </>
    )
}

export default FormLogin

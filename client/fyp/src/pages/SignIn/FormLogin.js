import React, { useState } from 'react';
import FormLoginSub from './FormLoginSub';
// import FormSuccess from './FormSuccess';
import BurgerS from "../../img/registerpage.jpg";
import { Col, Row, Image } from 'react-bootstrap';
import NavBar from '../../UserSide/components/common/nav/NavBar';
import Footer from '../../UserSide/components/common/Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../img/projlogon.png';
const FormLogin = () => {
    return (
        <>
      <ToastContainer />
    <NavBar/>
    <Row className='bg-dark'>
    <Col xl={6} lg={6} md={6} sm={12} xs={12} className='d-flex flex-column justify-content-center align-items-center text-white'>
      {/* <Image className='log-img' src={BurgerS} alt="sign-in"/> */}
      <Image src={logo} style={{height:'auto', width:'15rem'}} />
          <h1>Food Hawk</h1>
          <h3>Serving you the best</h3>
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

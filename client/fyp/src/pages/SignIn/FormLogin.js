import React, { useState } from 'react';
import FormLoginSub from './FormLoginSub';
// import FormSuccess from './FormSuccess';
import BurgerS from "../../img/registerpage.jpg";
import { Col, Row, Image } from 'react-bootstrap';
import NavBar from '../../UserSide/components/common/nav/NavBar';
import Footer from '../../UserSide/components/common/Footer/Footer';

const FormLogin = () => {
    return (
        <>
    <NavBar/>
    <Row className='bg-dark'>
      <Col xl={6} lg={6} md={6} sm={12} xs={12}>
      <Image className='sign-img' src={BurgerS} alt="sign-in"/>
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

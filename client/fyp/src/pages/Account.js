import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import SideNav from '../components/SideNav/SideNav'
import Footer from '../UserSide/components/common/Footer/Footer'
import { useSelector } from 'react-redux'
const account = () => {
    return (
        <>
        <Row>
            <Col xl={1} lg={1} md={1} sm={12} xs={12} >
            <SideNav />
            </Col>
            <Col xl={11} lg={11} md={11} sm={12} xs={12}>
           <Container className='p-3'>
               <p>Hello, </p>
           </Container>
           </Col>
        </Row>
           <Footer /> 
        </>
    )
}

export default account

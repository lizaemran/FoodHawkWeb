import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import imagebanner from '../img/mobilebanner.svg'
import allmobilebanner from '../img/mobilescreens.svg'
// import MobileApp from "./MobileApp";
import Fade from 'react-reveal/Fade';
import Rotate from 'react-reveal/Rotate';
const GetMobileApp = () => {
    return (
        <div className="bg-white">
            <Container >
            <Fade left>
                <Row>
                    <Col>
                        <Image id='mobile' src={imagebanner} alt='banner' style={{height:'auto' , width:'100%'}} />
                        {/* <MobileApp /> */}
                     </Col>
                    <Col className="d-flex flex-column justify-content-center align-items-center">
                        <h4>Get Rider Mobile App Now</h4>
                        <p>Join our community!</p>
                        <Rotate bottom right><a 
                        // id='getmobile' 
                        href='http://localhost:19006/' target='_blank' className="text-decoration-none text-white py-2 px-3 rounded-3" style={{cursor:'pointer',backgroundColor : '#ef5023' }}>Get Mobile App</a>
                        </Rotate>
                    </Col>
                </Row>
            </Fade>
            <Fade bottom>
                <Row>
                    <Image src={allmobilebanner} alt='banner' style={{height:'auto' , width:'100%'}} /> 
                </Row>
            </Fade>
            </Container>
        </div>
    )
}

export default GetMobileApp
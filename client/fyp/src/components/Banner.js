import React from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import Rotate from 'react-reveal/Rotate';
const Banner = ({heading, para, position, buttonText, buttonLink}) => {
    return (
        <div className={`${position === 'right' ? 'banner' : 'banner2' } position-relative `} style={{padding:'6rem', height:'60vh', marginTop:'5%', marginBottom:'5%'}}>
            <Container className="">
            <Row className={`${position === 'right' ? 'justify-content-start' : 'justify-content-end' } d-flex align-items-center `}>
                <Col xl={5} lg={5} md={5} sm={12} xs={12} className=' position-absolute shadow-lg p-3 rounded-3 ' 
                style={{backgroundColor:'rgba(255,255,255,0.8)', 
                backdropFilter:'blur(5px)', 
                bottom:'-25px'}}>
                    <h4>{heading}</h4>
                    {para}
                    {position === 'right' ? <Rotate bottom right>
                    <Button className="py-2 px-4"  style={{float: position, backgroundColor:'#ef5023', border:'none'}}>
                        <a href={buttonLink} className="text-decoration-none text-white">{buttonText}</a>
                    </Button>
                    </Rotate> : <Rotate bottom left>
                    <Button className="py-2 px-4"  style={{float: position, backgroundColor:'#ef5023', border:'none'}}>
                        <a href={buttonLink} className="text-decoration-none text-white">{buttonText}</a>
                    </Button>
                    </Rotate>}
                </Col>
            </Row>
            </Container>
        </div>
    )
}
export default Banner;
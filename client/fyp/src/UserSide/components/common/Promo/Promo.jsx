import React, {useState} from 'react'
import "../Promo/Promo.css";
import Email from '../EmailInput/Email';
import DatePicker from '../DatePicker/DatePicker';
import Phone from '../InputPhone/Phone';
import Person from '../Numberofperson/Person';
import { Col, Container, Row } from 'react-bootstrap';
function Promo() {
  
    return (
        <div  className="square">
        <h2 className='text-center fw-bold pt-3 text-white'>Get your Promo, <br /> And Book Now !</h2>
        <p className='text-center text-muted pb-5' style={{fontSize:"12px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt<br /> ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</p>
           <Container className='text-white'>
               <Row>
                   <Col>
                   <DatePicker/>
                   </Col>
                   <Col>
                   <Email/>
                   </Col>
               </Row>
               <Row>
                   <Col>
                   <Phone/>
                   </Col>
                   <Col>
                   <Person/>
                   </Col>
               </Row>
           </Container>
          
         
          
          
         
         </div>
        
    )
      
}

export default Promo

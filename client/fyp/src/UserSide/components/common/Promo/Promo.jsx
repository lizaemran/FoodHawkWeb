import React, {useState} from 'react'
import "../Promo/Promo.css";
import { Col, Container, Row, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker/dist/react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
function Promo() {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <Container  className="square p-5 mb-5">
        <h2 className='text-center fw-bold pt-3 text-white'>Get your Promo, <br /> And Book Now !</h2>
        <p className='text-center text-muted fs-6' style={{fontSize:"12px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt<br /> ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</p>
               <Form>
               <Row className='py-2'>
                   <Col >
                   <DatePicker className="input1 fs-6 rounded-3 mt-0 mb-3 border-0 text-muted" selected={startDate} onChange={(date) => setStartDate(date)} />
                   </Col>
                   <Col>
                    <Form.Control required style={{border:"none"}}className="input1" type="email" placeholder="Example@email.com"/>
                   </Col>
               </Row>
               <Row className='py-2'>
                   <Col>
                   <Form.Control type="text"
                    className="w-100 input1 fs-6 rounded-3 mt-0 mb-3 border-0 text-muted"
                    style={{border:"none"}}
                    placeholder='+92 XXXX XXX XXX'/>
                   </Col>
                   <Col>
                   <Form.Control type="text"
                    className="w-100 input1 fs-6 rounded-3 mt-0 mb-3 border-0 text-muted"
                    style={{border:"none"  }}
                    placeholder='Person' />
                   </Col>
               </Row>
               </Form>
      </Container>
        
    )
      
}

export default Promo

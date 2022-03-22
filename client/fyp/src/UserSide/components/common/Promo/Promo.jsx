import React, {useState} from 'react'
import "../Promo/Promo.css";
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker/dist/react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
function Promo() {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <Container  className="square p-5 my-5 shadow">
        <h2 className='text-center pt-3 text-muted'>Get your Promo, <br /> And Book Now !</h2>
        <p className='text-center text-muted fs-6' style={{fontSize:"12px"}}>Get promo codes on your first order and reservation today! </p>
               <Form>
                <Row className='py-2 '>
                <Col className='d-flex flex-column justify-content-center align-items-center'>
                <Form.Control type="text"
                    className="w-50  fs-6 rounded-3 mb-3 border-0 text-muted"
                    style={{border:"none"}}
                    placeholder='+92 XXXX XXX XXX'/>
                <Form.Control type="text"
                    className="w-50 input1 fs-6 rounded-3 mb-3 border-0 text-muted"
                    style={{border:"none"  }}
                    placeholder='Person' />
                <Form.Control required className='shadow-sm w-50 mb-3' style={{border:"none"}} type="email" placeholder="Example@email.com"/>
                <div className='d-flex justify-content-center align-items-center'><DatePicker className=" fs-6 rounded-3  mb-3 border-0 text-muted"  selected={startDate} onChange={(date) => setStartDate(date)} /></div>
                <Button className='w-50' style={{backgroundColor:'#ef5023', border:'none'}}>
                    <span className="text-white">Get Promo</span>
                </Button>
                </Col>
                </Row>
               </Form>
      </Container>
        
    )
      
}

export default Promo

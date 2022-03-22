import React from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import NavBar from '../UserSide/components/common/nav/NavBar';
import BurgerS from "../../src/img/loginpage.jpg";
import { Col, Row, Image } from 'react-bootstrap';
const Contact = () => {
  return (
      <>
      <NavBar/>
      <Row className='bg-light'>
      <Col xl={6} lg={6} md={6} sm={12} xs={12}>
      <Image className='log-img' src={BurgerS} alt="sign-in"/>
      </Col>
      <Col xl={6} lg={6} md={6} sm={12} xs={12} className='d-flex flex-column justify-content-center align-items-start'>
          <Form>
              <h1>Contact Us</h1>
          <label for="email" class="form-label">Email</label>
        <input 
          className="form-control" type="email"  name="email" style={{width:"600px"}}/>
      <label for="comment">Message</label>
      <textarea class="form-control" rows="5"  name="text"></textarea>
      <Button type="submit" className='py-2 px-5 fs-6 form-btn my-2' style={{background:"#EF5023", border:"none"}}>
            Submit
          </Button>
          </Form>
      </Col>
    </Row>
   
</>
  )
}

export default Contact
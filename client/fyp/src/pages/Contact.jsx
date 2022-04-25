import React, {useState} from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import NavBar from '../UserSide/components/common/nav/NavBar';
import BurgerS from "../../src/img/loginpage.jpg";
import { Col, Row, Image } from 'react-bootstrap';
import { useDispatch,useSelector } from "react-redux";
import { sendMessageAsync } from "../redux/user";
import * as yup from 'yup';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../UserSide/components/common/Footer/Footer';
const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const dispatch = useDispatch();
  let schemaSendMessage = yup.object().shape({
  email: yup.string().email().required(),
  subject: yup.string().required('Please enter subject'),
  message: yup.string().required('Please enter message').min(50),
    });
  const sendMessageHandler = (e) => {
      e.preventDefault();
      schemaSendMessage
  .validate({ email: email ,subject: subject, message: message})
  .then(function (valid) {
      dispatch(sendMessageAsync({
          email: email,
          message: message,
          subject: subject,
      }));
      setEmail('');
      setSubject("");
      setMessage("");
  }).catch((e) => {
      toast.error(e.errors[0].toString());
    });

  }
  return (
      <>
      <NavBar/>
      <Row className='bg-light'>
      <ToastContainer />
      <Col className='position-relative' xl={6} lg={6} md={6} sm={12} xs={12}>
      <Image className='log-img' src={BurgerS} alt="sign-in"/>
      <div className='position-absolute text-white text-center rounded-3' style={{top:'10%', left:'10%', backgroundColor:'rgba(0,0,0,0.5)', padding:'200px'}}>
        <h2>Food Hawk</h2>
        <p className='fs-5'>Delivering the best...</p>
      </div>
      </Col>
      <Col xl={6} lg={6} md={6} sm={12} xs={12} className='d-flex flex-column justify-content-center align-items-start'>
          <Form>
              <h4>Contact Us</h4>
              <p className='text-muted'>We appreciate your concern. Feel free to contact regarding your concerns.</p>
          <label for="email" className="form-label">Email</label>
        <input 
          className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} type="email"  name="email" style={{width:"600px"}}/>
          <label for="subject" className="form-label">Subject</label>
        <input 
          className="form-control" value={subject} onChange={(e) => setSubject(e.target.value)} type="text"  name="subject" style={{width:"600px"}}/>
      <label for="comment">Message</label>
      <textarea className="form-control" value={message} onChange={(e) => setMessage(e.target.value)} rows="5"  name="text"></textarea>
      <p className='text-muted' style={{marginBottom:'0px', fontSize:'12px'}}>Characters: {message.length}</p>
      <Button onClick={sendMessageHandler} className='py-2 px-5 fs-6 form-btn my-2' style={{background:"#EF5023", border:"none"}}>
            Send Us Message
          </Button>
          </Form>
      </Col>
    </Row>
   <Footer />
</>
  )
}

export default Contact
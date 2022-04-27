import React, {useState} from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import SideNav from "../components/SideNav/SideNav";
import {AiFillMail} from 'react-icons/ai';
import { useDispatch,useSelector } from "react-redux";
import { sendMessageAsync } from "../redux/user";
import * as yup from 'yup';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserContact = () => {
    const auth = useSelector((state) => state.auth);
    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState("");
    const dispatch = useDispatch();
    let schemaSendMessage = yup.object().shape({
		subject: yup.string().required('Please enter subject'),
		message: yup.string().required('Please enter message').min(50),
      });
    const sendMessageHandler = (e) => {
        e.preventDefault();
        schemaSendMessage
		.validate({ subject: subject, message: message})
		.then(function (valid) {
        dispatch(sendMessageAsync({
            email: auth?.email,
            message: message,
            subject: subject,
        }));
        setSubject("");
        setMessage("");
    }).catch((e) => {
        toast.error(e.errors[0].toString());
      });

    }
    return (
        <div>
        <Row>
            <Col xl={1} lg={1} md={1} sm={12} xs={12} >
            <SideNav />
            </Col>
            <Col xl={11} lg={11} md={11} sm={12} xs={12} className=''>
            <ToastContainer />
           <Container className='p-4 d-flex flex-column justify-content-center align-items-center bg-light' >
               <h4 className="p-2"><AiFillMail className="fs-3" style={{marginRight:'10px'}} />Contact Us</h4>
               <div className="w-100">
               <Form.Label> From  </Form.Label>
               <Form.Control type='text' className="mb-3 bg-light" value={auth?.email} disabled={true} style={{cursor:'no-drop'}} />
                </div>
                <div className="w-100">
                <Form.Label> To  </Form.Label>
               <Form.Control type='text' className="mb-3 bg-light" value='foodhawk@info.com' disabled={true} style={{cursor:'no-drop'}} />
                </div>
               <div className="w-100">
               <Form.Label> Subject  </Form.Label>
               <Form.Control type='text' className="mb-3 bg-light" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder='XYZ - Query' />
               </div>
               <div className="w-100">
               <Form.Label> Message  </Form.Label>
               <Form.Control  value={message} onChange={(e)=> setMessage(e.target.value)} as='textarea' className="shadow " style={{borderRadius:'10px' ,border:'2px solid #ef5023'}}  rows={10} placeholder='Can you please help me with...'  /> 
               <p className="text-muted mt-1" style={{marginBottom:'0px', fontSize:'12px', }}>Characters: {message.length}</p>

               </div>
               
               <Button onClick={sendMessageHandler} className="mt-2 px-5" style={{backgroundColor:'#ef5023', border:'1px solid #ef5023' }}>
                  <AiFillMail className="fs-3 text-white" style={{marginRight:'10px'}} /> Send Message
               </Button>
           </Container>
            </Col>
        </Row>
        </div>
    );
}
export default UserContact;
import React from "react";
import {IoIosArrowDown} from 'react-icons/io';
import {Accordion, Container} from 'react-bootstrap';
const FAQs = () => {
    return (
        <Container className="px-5 d-flex flex-column justify-content-center align-items-center">
            <h4 className="text-center mb-3">FAQs</h4>
        <Accordion className="w-75" >
            <Accordion.Item className="mb-3" eventKey="0">
                <Accordion.Header className="" >
                    <h6 style={{color:'#ef5023'}}>How do I login?</h6>
                </Accordion.Header>
                <Accordion.Body>
                    <p> You can login by clicking on the "Login" button on the homepage. You will be redirected to the login page.</p>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item className="mb-3" eventKey="1">
                <Accordion.Header className="" >
                    <h6 style={{color:'#ef5023'}}>How do I sign up?</h6>
                </Accordion.Header>
                <Accordion.Body>
                    <p> You can sign up by clicking on the "Sign Up" button on the
        //             home page. You will be redirected to the sign up page.</p>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        </Container>
        // <div className="FAQs">
        // <div className="container">
        //     <h4 className="text-center">FAQs</h4>
        //     <div className="row mt-3 d-flex justify-content-center align-items-center">
        //     <div className="col-md-6 ">
        //         <div className="card  rounded-3 shadow-sm">
        //         <div className="card-header pt-3 d-flex justify-content-between align-items-center" style={{backgroundColor:'white'}}>
        //             <h6>How do I login?</h6>
        //             <IoIosArrowDown className="fs-3" />
        //         </div>
        //         <div className="card-body" style={{fontSize:'14px'}}>
        //             <p>
        //             You can login by clicking on the "Login" button on the home
        //             page. You will be redirected to the login page.
        //             </p>
        //         </div>
        //         </div>
        //     </div>
        //     </div>
        //     <div className="row mt-3 d-flex justify-content-center align-items-center">
        //     <div className="col-md-6 " >
        //         <div className="card rounded-3 shadow-sm">
        //         <div className="card-header pt-3 d-flex justify-content-between align-items-center" style={{backgroundColor:'white'}}>
        //             <h6>How do I sign up?</h6>
        //             <IoIosArrowDown className="fs-3" />
        //         </div>
        //         <div className="card-body" style={{fontSize:'14px'}}>
        //             <p>
        //             You can sign up by clicking on the "Sign Up" button on the
        //             home page. You will be redirected to the sign up page.
        //             </p>
        //         </div>
        //         </div>
        //     </div>
        //     </div>
        // </div>
        // </div>
    );
    }
export default FAQs;
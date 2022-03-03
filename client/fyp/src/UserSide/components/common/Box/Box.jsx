import React from 'react'
import "./Box.css";
import SearchBar from '../nav/SearchBar';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import NavBar from "../nav/NavBar";
import burger from "../../../../img/e3c16df9.png";
import {AiOutlineArrowDown} from "react-icons/ai";
function Box() {
  const scrollDown = () => {
    window.scroll({
      top: 700,
      left: 0,
      behavior: "smooth",
    });
  };
    return (
        <div className='curve shadow-lg' style={{backgroundColor:"black"}}>
          <NavBar />
        <Container className="p-5 mainbox d-flex flex-column justify-content-center align-items-center text-white">
          <h1 className="fw-bold text-center">Special Food Every Time</h1>
          <h1 className="fw-bold text-center">For You!</h1>
           <p className='text-muted text-center fs-5' >Are you hungry because you're home now? Don't worry, <br /> now you can order food via your cellphone!</p>
           <SearchBar />
           <Row>
              <Col  className='d-flex justify-content-start align-items-end'>
                {/* <Image className='w-75 h-auto'  src={burger} alt="burger" style={{transform:"scaleX(-1)"}}/>          */}
              </Col>
              <Col  className='d-flex justify-content-center align-items-end'>
              <Button className="position-absolute shadow-lg" style={{borderRadius:"50%", backgroundColor:"#ef5023", border:"none", height:"60px", width:"60px", bottom:"0px", zIndex:"3"}}>
                <AiOutlineArrowDown   onClick={() => { scrollDown();}}  style={{ transitionDelay: "3s", cursor: "pointer"  }} className='down text-white' style={{fontSize:"2rem"}}/>
              </Button></Col>
              <Col  className='d-flex justify-content-end align-items-end'>
                {/* <Image className='w-75 h-auto' src={burger} alt="burger"/> */}
              </Col>
          </Row>
          </Container> 
        </div>
          )
}

export default Box

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
        <div className='curve shadow-lg'>
          <NavBar />
        <div className=" mainbox d-flex flex-column justify-content-center align-items-center text-white" style={{backgroundColor:'rgba(0,0,0,0.25)', backdropFilter : 'blur(0.5px)',  }}>
          <h1 className=" text-center">Special Food Every Time</h1>
          <h1 className=" text-center">For You!</h1>
           <p className='text-white text-center fs-6' >Are you hungry because you're home now? Don't worry, <br /> now you can order food via your cellphone!</p>
           <SearchBar />
           {/* <Row className='position-relative'>
              <Col  className='d-flex justify-content-center align-items-end'>
              <Button className="position-absolute shadow-lg d-flex justify-content-center align-items-center" style={{borderRadius:"50%", backgroundColor:"#ef5023", border:"none", height:"30px", width:"30px", top:"90px"}}>
                <AiOutlineArrowDown   onClick={() => { scrollDown();}}  className='down text-white ' style={{fontSize:"2rem",  transitionDelay: "3s", cursor: "pointer" }}/>
              </Button>
              </Col>
            
          </Row> */}
          </div> 
        </div>
          )
}

export default Box

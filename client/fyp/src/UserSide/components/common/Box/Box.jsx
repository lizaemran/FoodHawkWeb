import React from 'react'
import "./Box.css";
import SearchBar from '../nav/SearchBar';
import { Button, Col, Container, Navbar, Row } from 'react-bootstrap';
import NavBar from "../nav/NavBar";
import burger from "../../../../img/e3c16df9.png";
import {AiOutlineArrowDown} from "react-icons/ai";
function Box() {
    return (
        <div className='curve' style={{backgroundColor:"black"}}>
          <NavBar />
        <div className="mainbox d-flex flex-column justify-content-center align-items-center text-white">
          <h1 className="fw-bold text-center fs-1">---Special Food Every---<br />Time For You!</h1>
           <p className='text-muted text-center pt-3 pb-5' style={{fontSize:"12px"}}>Are you hungry because you're home now? Don't worry, <br /> now you can order food via your cellphone!</p>
           <SearchBar />
          </div> 
          <Container>
            <Row>
              <Col className='d-flex justify-content-center align-items-end'><img id="" className='main-page-burger' src={burger} alt="burger" style={{transform:"scaleX(-1)"}}/>         </Col>
              <Col className='d-flex justify-content-center align-items-end'><Button className="position-absolute" style={{borderRadius:"50%", backgroundColor:"#ef5023", border:"none", height:"60px", width:"60px", bottom:"0px", zIndex:"3"}}><AiOutlineArrowDown className='text-white' style={{fontSize:"2rem"}}/></Button></Col>
              <Col className='d-flex justify-content-center align-items-end'><img id="" className='main-page-burger' src={burger} alt="burger"/></Col>
          </Row>
          </Container>
           </div>
          )
}

export default Box

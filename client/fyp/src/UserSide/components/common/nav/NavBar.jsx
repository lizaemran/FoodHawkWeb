import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Image, Container, NavDropdown, Form , FormControl,Button, Nav, Navbar} from 'react-bootstrap';
// import logo from "../../../../img/logored.PNG"
import "../nav/Navbar.css";
import logo from "../../../../img/burger.svg";
import { Link } from 'react-router-dom';
const NavBar = () => {
    return (
      <Navbar className="" bg="" expand="lg" style={{background:"black"}}>
      <Container fluid>
        <Navbar.Brand href="/" className='NavLogo d-flex justify-content-center align-items-end'><Image className="" src={logo} alt="logo" style={{color:"#EF5023", height:"auto", width:"70px"}}/><p className='text-white fs-4'>Food Hawk</p></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <nav className="mr-auto" style={{ maxHeight: '100px' }} navbarScroll>
        <Navbar.Collapse id="navbarScroll">
            <Link to="#" className="fw-bold text-muted">
            <Button variant="" className="NavBtn fw-bold text-muted">About Us</Button>
            </Link>
            <Link to="#" className="fw-bold text-muted">
            <Button variant="" className="NavBtn fw-bold text-muted">Booking</Button>
            </Link>
            <Link to="#" className="fw-bold text-muted">
            <Button variant="" className="NavBtn fw-bold text-muted">Get App</Button>
            </Link>
            <Link to="/SignUp">
              <Button variant="" className="NavBtn fw-bold text-muted">Register</Button>
            </Link>
            <Link to="/SignIn">
              <Button variant="" className="NavBtn fw-bold text-muted">Sign in</Button>
            </Link>
          </Navbar.Collapse>
          </nav>      
      </Container>
    </Navbar>
    )
}

export default NavBar

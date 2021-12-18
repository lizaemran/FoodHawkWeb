import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Image, Container, NavDropdown, Form , FormControl,Button, Nav, Navbar} from 'react-bootstrap';
import Burger from "../../../../img/burger.svg";
import "../nav/Navbar.css";
import logo from "../../../../img/burger.svg";
const NavBar = () => {
    return (
      <Navbar bg="transparent" expand="lg" style={{paddingLeft:"75px", paddingRight:"75px"}}>
      <Container fluid>
        <Navbar.Brand href="#"><Image className="" src={logo} alt="logo" style={{height:"70px", width:"70px"}}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <nav>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1" className="text-muted px-5">Home</Nav.Link>
            <Nav.Link href="#action2" className="text-muted px-5">About Us</Nav.Link>
            <Nav.Link href="#" className="text-muted px-5">
              Booking
            </Nav.Link>
            <Nav.Link href="#" className="text-muted px-5">
              Get Apps
            </Nav.Link>
          </Nav>
          </Navbar.Collapse>
          </nav>
          <nav>
            <Button variant="" className="NavBtn">Sign in</Button>
          </nav>
       
      </Container>
    </Navbar>
    )
}

export default NavBar

import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Image, Container, NavDropdown, Form , FormControl,Button, Nav, Navbar} from 'react-bootstrap';
// import logo from "../../../../img/logored.PNG"
import "../nav/Navbar.css";
import logo from "../../../../img/projlogon.png";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import SearchBar from './SearchBar'
const NavBar = () => {
  var location = useLocation();
  location = location.pathname.split('/')[1];
    return (
      <Navbar className="" bg="" expand="lg" style={{background:"black"}}>
      <Container fluid>
        <Navbar.Brand href="/" className='NavLogo d-flex justify-content-start align-items-end'><Image className="" src={logo} alt="logo" style={{color:"#EF5023", height:"auto", width:"70px"}}/><p className='text-white fs-6s my-auto' style={{margin:'0px'}} >Food Hawk</p></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className='' />
        <nav className="mr-auto"  navbarScroll>
        <Navbar.Collapse id="navbarScroll">
          {location !== '' && <div className='' style={{marginRight:'50px'}}>
            <SearchBar inNav={true} />
          </div>}
            <Link to="/about-us" className="fw-bold text-muted " >
            <Button variant="" className="NavBtn text-white ">About Us</Button>
            </Link>
            <Link to="#" className="fw-bold text-muted">
            <Button variant="" className="NavBtn text-white">Booking</Button>
            </Link>
            <Link to="/contact-us" className="fw-bold text-muted">
            <Button variant="" className="NavBtn text-white">Contact Us</Button>
            </Link>
            <Link to="/SignUp">
              <Button variant="" className="NavBtn text-white">Register</Button>
            </Link>
            <Link to="/SignIn">
              <Button variant="" className="NavBtn text-white">Sign in</Button>
            </Link>
          </Navbar.Collapse>
          </nav>      
      </Container>
    </Navbar>
    )
}

export default NavBar

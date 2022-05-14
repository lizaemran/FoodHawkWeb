import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Image, Container, NavDropdown, Form , FormControl,Button, Nav, Navbar} from 'react-bootstrap';
// import logo from "../../../../img/logored.PNG"
import "../nav/Navbar.css";
import logo from "../../../../img/Food_HawK-removebg-preview.png";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import SearchBar from './SearchBar'
const NavBar = () => {
  var location = useLocation();
  location = location.pathname.split('/')[1];
    return (
      <Navbar className="" bg="" expand="lg" style={{background:location !== '' ? '#e5e5e5' : "white"}}>
      <Container fluid>
        <Navbar.Brand href="/" className='NavLogo d-flex justify-content-center align-items-center'>
          <Image className="" src={logo} alt="logo" style={{color:"#EF5023", height:"auto", width:"70px", marginLeft:'10px'}}/><p style={{marginBottom:'0px', marginLeft:'10px'}}>Food Hawk</p></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className='' />
        <nav className="mr-auto"  navbarScroll>
        <Navbar.Collapse id="navbarScroll">
          {location !== '' && <div className='' style={{marginRight:'50px'}}>
            <SearchBar inNav={true} />
          </div>}
            <Link to="/about-us" className="fw-bold text-dark " >
            <Button variant="" className="NavBtn text-dark" style={{fontSize:'14px'}}>About Us</Button>
            </Link>
            <a href="http://localhost:19006/" target="_blank" className="fw-bold text-dark text-decoration-none" >
            <Button variant="" className="NavBtn text-dark" style={{fontSize:'14px'}}>Rider Mobile App</Button>
            </a>
            <Link to="/contact-us" className="fw-bold text-dark">
            <Button variant="" className="NavBtn text-dark" style={{fontSize:'14px'}}>Contact Us</Button>
            </Link>
            <Link to="/SignUp">
              <Button variant="" className="NavBtn text-dark" style={{fontSize:'14px'}}>Register</Button>
            </Link>
            <Link to="/SignIn">
              <Button variant="" className="NavBtn text-dark" style={{fontSize:'13.5px'}}>Sign in</Button>
            </Link>
          </Navbar.Collapse>
          </nav>      
      </Container>
    </Navbar>
    )
}

export default NavBar

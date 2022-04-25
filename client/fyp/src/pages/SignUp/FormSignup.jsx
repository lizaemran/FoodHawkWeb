import React, {useState, useEffect} from 'react';
import './Form.css';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Container, Form } from 'react-bootstrap';
import { registerUserAsync } from '../../redux/auth';
import {MdOutlineLocationOn} from 'react-icons/md';
import GoogleMapReact from 'google-map-react';
const FormSignup = ({noRedirection, setModalShowLogin, setModalShowSignUp}) => {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('abc');
  const [latValue, setLatValue] = useState('0');
  const [lngValue, setLngValue] = useState('1');
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  let schemaSignIn = yup.object().shape({
    username: yup.string().required('Please enter username'),
    firstName: yup.string().required('Please enter first name'),
    lastName: yup.string().required('Please enter last name'),
    email: yup.string().required().email().label('Email'),
    password: yup.string().required('Please enter password').min(5).label('Password'),
    contact: yup.string().required('Please enter contact number').matches(/^[0-9]+$/).length(11),
    address: yup.string().required('Please enter address'),
  });
	const onSubmit = (event) => {
		event.preventDefault();
    schemaSignIn
    .validate({ username: userName, password: password, firstName: firstName, lastName: lastName, email: email, contact: contact, address: location })
    .then(function (valid) {
		dispatch(registerUserAsync({
            username: userName,
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password,
            contact: contact,
            address: location,
            lat: latValue,
            lng: lngValue,
		}));
		    setUserName("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setContact("");
        setLocation("");
      }).catch((e) => {
        toast.error(e.errors[0].toString());
      });
	};
    
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLocation(position.coords.latitude + "," + position.coords.longitude);
      setLatValue(position.coords.latitude);
      setLngValue(position.coords.longitude);
    });
  }, [])
  const defaultProps = {
    center: {
      lat: latValue,
      lng: lngValue
    },
    zoom: 16
  };
  const getAddress = async() => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latValue},${lngValue}&key=AIzaSyAOWEsA7XNwmoFasiw9hlAewldBeEJB8-o`, {
    method: "GET",
});

if(response.ok){
    const address = await response.json();
    setLocation(address.results[0]?.formatted_address);
  
}
  }
  return (
    <Container className='p-5 ' style={{backgroundColor:'#e9e9e1'}}>
      <Form  className='' noValidate >
        <h3 className='text-dark'>
          Register...
        </h3>
        <div className='d-flex flex-column'>
          <label className='text-dark' style={{fontSize:'14px'}}>Username</label>
          <input
            className='w-75 mb-1 input2 py-3 fs-6 rounded-3 text-muted bg-light'
            type='text'
            style={{fontSize:'14px'}}
            name='username'
            placeholder='Enter your username'
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <div className='d-flex flex-column'>
          <label className='text-dark' style={{fontSize:'14px'}}>First Name</label>
          <input
            className='w-75 mb-1 input2 py-3 fs-6 rounded-3 mt-0  text-muted bg-light'
            type='text'
            name='username'
            style={{fontSize:'14px'}}
            placeholder='Enter your first Name'
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div className='d-flex flex-column'>
          <label className='text-dark' style={{fontSize:'14px'}}>Last Name</label>
          <input
            className='w-75 mb-1 input2 py-3 fs-6 rounded-3 mt-0  text-muted bg-light'
            type='text'
            name='username'
            style={{fontSize:'14px'}}
            placeholder='Enter your last name'
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
        <div className='d-flex flex-column'>
          <label className='text-dark' style={{fontSize:'14px'}}>Email</label>
          <input
            className='input2 w-75 mb-1 fs-6 p-3 rounded-3 mt-0  text-muted bg-light'
            type='email'
            name='email'
            style={{fontSize:'14px'}}
            placeholder='Enter your email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className='d-flex flex-column'>
          <label className='text-dark' style={{fontSize:'14px'}}>Password</label>
          <input
            className='input2 w-75 mb-1 fs-6 p-3 rounded-3 text-muted bg-light'
            type='password'
            name='password'
            style={{fontSize:'14px'}}
            placeholder='Enter your password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {/* <div className='d-flex flex-column'>
          <label className='text-white'>Confirm Password</label>
          <input
            className='input2 w-75 mb-1 fs-6 p-3 rounded-3 mt-0  text-muted'
            type='password'
            name='password2'
            placeholder='Confirm your password'
          />
        </div> */}
        <div className='d-flex flex-column'>
          <label className='text-dark' style={{fontSize:'14px'}}>Phone Number</label>
          <input
            className='input2 w-75 mb-1 fs-6 p-3 rounded-3 mt-0  text-muted bg-light'
            type='phone'
            name='phone'
            style={{fontSize:'14px'}}
            placeholder='Enter Phone Number'
            value={contact}
            onChange={(event) => setContact(event.target.value)}
          />
        </div>
        <div className='d-flex flex-column'>
          <label className='text-dark' style={{fontSize:'14px'}}>Address</label>
          <input
            className='input2 w-75 py-3 mb-1 fs-6 rounded-3 mt-0  text-muted bg-light'
            type='text'
            name='address'
            style={{fontSize:'14px'}}
            placeholder='Select from map'
            value={location}
            disabled='true'
            onChange={(event) => setLocation(event.target.value)}
          />
        </div>
        <div className='d-flex flex-column'>
        {(latValue && lngValue) && 
                  <div style={{ height: '35vh', width: '75%' }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyAOWEsA7XNwmoFasiw9hlAewldBeEJB8-o" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    onBoundsChange={(center, zoom) => {setLatValue(center[0]); setLngValue(center[1]); setLocation(center[0] + "," + center[1])}}
                  >
                    <MdOutlineLocationOn className='fs-3'
                      lat={latValue}
                      lng={lngValue}
                      text="My Marker"
                    />
                  </GoogleMapReact>
                  </div>
                  }
                <Button className='btn w-75'  onClick={getAddress}>
                    Set Location
                </Button>
          </div>
        <Button type="submit" onClick={onSubmit} className='py-2 my-2 px-5 fs-6 form-btn' style={{background:"#EF5023", border:"none"}}>
          Sign up
        </Button>
        {noRedirection ? (
           <span className='text-dark' style={{fontSize:'12px', cursor:'pointer'}}>
           <br />Already have an account? <u onClick={() => {setModalShowLogin(true); setModalShowSignUp(false);}}>Login</u>
         </span>
        ) : (
          <span className='text-dark' style={{fontSize:'12px'}}>
          <br />Already have an account? <a href='/SignIn'>Login</a>
        </span>
        )}
       
      </Form>
    </Container>
  );
};

export default FormSignup;
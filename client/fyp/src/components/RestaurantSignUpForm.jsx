import React, {useState, useEffect} from 'react';
import { Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from 'react-redux';
import { addRestaurantsAsync } from '../redux/Slice';
import {MdOutlineLocationOn} from 'react-icons/md';
import GoogleMapReact from 'google-map-react';
const RestaurantSignUpForm = () => {
    const dispatch = useDispatch();
    const [username, setUserName] = useState('');
    const [passwordd, setPasswordd] = useState('');
    const [emaill, setEmail] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [location, setLocation] = useState('');
    const [latValue, setLatValue] = useState('');
    const [lngValue, setLngValue] = useState('');
    const [phone, setPhone] = useState('');
    const [rating, setRating] = useState(0);
    let schemaSignUpP = yup.object().shape({
        username: yup.string().required('Please enter username'),
        password: yup.string().required('Please enter password').min(5).label('Password'),
        email: yup.string().required().email().label('Email'),
        name: yup.string().required('Please enter name'),
        image: yup.string().required('Please enter imgbb Link'),
        location: yup.string().required('Please enter your location'),
        phone: yup.string().required().matches(/^[0-9]+$/).length(11),
      });
      const submitForm = (e) => {
        e.preventDefault();
          schemaSignUpP
            .validate({ username: username, password: passwordd, email: emaill, name: name, image: image, location: location, phone: phone })
            .then(function (valid) {
                dispatch(addRestaurantsAsync({
                    username: username,
                    password: passwordd,
                    email: emaill,
                    name: name,
                    image: image,
                    location: location,
                    phone: phone,
                    rating: rating,
                    lat: latValue,
                    lng: lngValue,
                }));
                setUserName("");
                setPasswordd("");
                setEmail("");
                setName("");
                setImage("");
                setLocation("");
                setPhone("");
            }).catch((e) => {
              toast.error(e.errors[0].toString());
            });
      }
  
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
        zoom: 17
      };
      const getAddress = async() => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latValue},${lngValue}&key=AIzaSyAOWEsA7XNwmoFasiw9hlAewldBeEJB8-o`, {
        method: "GET",
    });

    if(response.ok){
        const address = await response.json();
        setLocation(address.results[0].formatted_address);
      
    }
      }
    return (
        <div>
            <Form className='d-flex flex-column'>
                <Form.Label className='pt-1'>Username*
                <Form.Control type='text' className='' 
                 required
                 value={username}
                 placeholder="abc123"
                 onChange={(e) => setUserName(e.target.value)}
                style={{border:'none', borderRadius:'5px'}}/>
                </Form.Label>
                <Form.Label className='pt-1'>Password*
                <Form.Control type='password' 
                 required
                 value={passwordd}
                 placeholder="•••••"
                 onChange={(e) => setPasswordd(e.target.value)} />
                </Form.Label>
                <Form.Label className='pt-1'>Email*
                <Form.Control type='email'
                 required
                 value={emaill}
                 placeholder="abc123@gmail.com"
                 onChange={(e) => setEmail(e.target.value)} />
                </Form.Label>
                <Form.Label className='pt-1'>Name*
                <Form.Control type='text' 
                 required
                 value={name}
                 placeholder="abc"
                 onChange={(e) => setName(e.target.value)}
                 style={{border:'none', borderRadius:'5px'}}/>
                </Form.Label>
                <Form.Label className='pt-1'>Image*
                <Form.Control type='text' 
                 required
                 value={image}
                 placeholder="imgbb.com/abc"
                 onChange={(e) => setImage(e.target.value)}
                style={{border:'none', borderRadius:'5px'}}/>
                </Form.Label>
                <Form.Label className='pt-1'>Location*
                <Form.Control type='text' 
                 required
                 value={location}
                 placeholder="Select Location from map"
                 onChange={(e) => setLocation(e.target.value)}
                 style={{border:'none', borderRadius:'5px'}}/>
                </Form.Label>
                {(latValue && lngValue) && 
                  <div style={{ height: '45vh', width: '100%' }}>
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
                <Button className='btn' type="submit" onClick={getAddress}>
                    Set Location
                </Button>
                <Form.Label className='pt-1'>Phone Number*
                <Form.Control type='text' 
                 required
                 value={phone}
                 placeholder="+92-XXX-XXXXXXX"
                 onChange={(e) => setPhone(e.target.value)}
                 style={{border:'none', borderRadius:'5px'}}/>
                </Form.Label>
                <a onClick={submitForm} className='mt-2 text-center text-white text-decoration-none py-2 px-3' style={{backgroundColor:'#ef5023', borderRadius:'5px', cursor:'pointer'}}>Register</a>
                <a href='/restaurant-login' className='mt-2'>Already a Member? Sign in</a>
            </Form>
        </div>
    )
}
export default RestaurantSignUpForm;
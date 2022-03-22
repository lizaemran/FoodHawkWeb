import React, {useState, useEffect} from "react";
import { Col, Row , Container, Form, FloatingLabel, Button} from "react-bootstrap";
import SideNav from "../components/SideNav/SideNav";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAsync } from "../redux/auth";
import * as yup from 'yup';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AiFillPhone} from 'react-icons/ai';
import {BsFillPersonFill} from 'react-icons/bs';
import {IoHome} from 'react-icons/io5';
import {MdOutlineLocationOn} from 'react-icons/md';
import GoogleMapReact from 'google-map-react';
const UserProfile = () => {
    const token = useSelector((state)=> state.auth.token);
    const auth = useSelector((state) => state.auth);
    const id = useSelector((state) => state.auth?.id);
    const [isEdit, setIsEdit] = useState(false);
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState('');
    const [latValue, setLatValue] = useState('');
    const [lngValue, setLngValue] = useState('');
    const dispatch = useDispatch();
    let schemaUpdatePI = yup.object().shape({
		firstname: yup.string().required('Please enter firstname'),
		lastname: yup.string().required('Please enter lastname'),
		contact: yup.string().required('Please enter contact').matches(/^[0-9]+$/).length(11),
        address: yup.string().required('Please enter address'),
      });
    const updateInfoHandler = (e) => {
        e.preventDefault();
        schemaUpdatePI
		.validate({ firstname: fname, lastname: lname, contact: phone, address: address })
		.then(function (valid) {
        dispatch(updateUserAsync({
            id: id,
            firstname : fname,
            lastname : lname,
            address : location,
            contact : phone,
        }))}).catch((e) => {
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
        zoom: 16
      };
      const getAddress = async() => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latValue},${lngValue}&key=AIzaSyAyt8jyJ3uk_s1p6e6qtvI50OmLq8e4z0w`, {
        method: "GET",
    });
    
    if(response.ok){
        const address = await response.json();
        setLocation(address.results[0].formatted_address);
        setIsEdit(false);
      
    }
      }
    return (
        <div>
         <Row>
            <Col xl={1} lg={1} md={1} sm={12} xs={12} >
            <SideNav />
            </Col>
            <Col xl={11} lg={11} md={11} sm={12} xs={12}>
            <ToastContainer />
           <Container className='p-4'>
               <div className='px-4 py-3 bg-danger bg-opacity-10 text-white w-100 d-flex justify-content-start align-items-start flex-column' style={{borderRadius:"5px"}}>
                    <p className='fs-4' style={{marginBottom:'0px', borderBottom:'5px dotted #e5e5e5'}}>Hello, {auth.firstName || auth.username}</p>
                    <p className="mt-1" style={{marginBottom:'0px'}}><BsFillPersonFill className="text-dark" style={{marginRight:'5px'}} />{auth?.firstname}{" "}{auth?.lastname}</p>
                    <p style={{marginBottom:'0px'}}><AiFillPhone className="text-dark" style={{ marginRight:'5px'}} /> {auth?.contact}</p>
                    <p className="" style={{marginBottom:'0px'}}><IoHome className="text-dark" style={{marginRight:'5px'}} />{auth?.address}</p>
               </div>
               {!isEdit && <Button className="my-3 d-flex justify-content-center align-items-center " onClick={() => setIsEdit(true)}>
                 <p style={{marginBottom:'0px'}}>Edit Profile Information</p>
               </Button>}
               {isEdit && 
                            <div className="mt-2 shadow-lg" style={{ border: '2px solid orange', borderRadius:'5px'}}>
                             <div className=' py-3 bg-white d-flex justify-content-center align-items-center ' style={{borderRadius:"5px"}}>
                            <Form className="">
                             
                             {/* <Form.Label  className="">First Name : </Form.Label> */}
                            <FloatingLabel
                                 controlId="floatingInput"
                                 label="firstName"
                                 className="mb-3 "
                                 style={{fontSize:'10px'}}
                             >
                                <Form.Control className="" style={{}} name='fname' type='text' value={fname} onChange={(e) => setFName(e.target.value)} placeholder='Change First Name' />
                                </FloatingLabel>
                                {/* <Form.Label>Last Name : </Form.Label> */}
                                <FloatingLabel
                                 controlId="floatingInput"
                                 label="lastName"
                                 className="mb-3"
                                 style={{fontSize:'10px'}}
                             >
                                <Form.Control className="" style={{ }} name='lname' type='text' value={lname}  onChange={(e) => setLName(e.target.value)} placeholder='Change Last Name' />
                                </FloatingLabel>
                      
                                {/* <Form.Label>Address : </Form.Label> */}
                                <FloatingLabel
                                 controlId="floatingInput"
                                 label="address"
                                 className="mb-3"
                                 style={{fontSize:'10px'}}
                             >
                                <Form.Control className="" style={{}} name='address' type='text' value={address}  onChange={(e) => setAddress(e.target.value)} placeholder='Change Address' />
                                 </FloatingLabel>
                                 <div className='d-flex flex-column'>
                     {(latValue && lngValue) && 
                               <div style={{ height: '35vh', width: '100%' }}>
                               <GoogleMapReact
                                 bootstrapURLKeys={{ key: "AIzaSyAyt8jyJ3uk_s1p6e6qtvI50OmLq8e4z0w" }}
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
                             <Button className='btn w-100 bg-light text-primary'  onClick={getAddress}>
                                 Set Location
                             </Button>
                       </div>
                                {/* <Form.Label>Phone : </Form.Label> */}
                                 <FloatingLabel
                                 controlId="floatingInput"
                                 label="phone"
                                 className="my-3"
                                 style={{fontSize:'10px'}}
                             >
                                 <Form.Control className="" style={{}} name='phone' type='text' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Change Phone' />
                                 </FloatingLabel>
                                 <Button onClick={updateInfoHandler} className='w-100 bg-success'>
                                     Submit 
                                 </Button>
                                 <Button onClick={() => setIsEdit(false)} className='w-100 bg-light text-primary mt-2'>
                                     Discard 
                                 </Button>
                                
                            </Form>
                            </div>
                            </div>}
  
            </Container>
            </Col>
            </Row>

        </div>
    )}
export default UserProfile;
import React, {useState,useEffect} from 'react';
import {AiOutlineLogout} from 'react-icons/ai';
import {FaUserCircle} from 'react-icons/fa';
import auth, { logoutUser, getRiderAsync} from '../redux/auth';
import {useSelector, useDispatch} from 'react-redux';
import { Col, Container, Image, Row, Table, Button, ToggleButton } from 'react-bootstrap';
import {MdOutlineLocationOn} from 'react-icons/md';
import GoogleMapReact from 'google-map-react';
import { getAssignedOrder, patchOrderStatusAsync, patchRiderLocationAsync, patchRiderStatusAsync } from '../redux/rider';
const RiderDashboard = () => {
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [location, setLocation] = useState('');
    const [statusValue, setStatusValue] = useState(false);
    const dispatch = useDispatch();
    const logOut = (e) => {
        e.preventDefault();
        dispatch(logoutUser());
    }
    const rider = useSelector((state) => state?.auth);

    useEffect(() => {
        dispatch(getRiderAsync());
     
        if(rider?.id){
            setInterval(() => {
                navigator.geolocation.getCurrentPosition(function(position) {
                    setLocation(position.coords.latitude + "," + position.coords.longitude);
                    setLat(position.coords.latitude);
                    setLng(position.coords.longitude);
                    dispatch(patchRiderLocationAsync({
                        lat: position.coords.latitude ,
                        lng: position.coords.longitude,
                        id: rider?.id
                    }));
                });
                dispatch(getAssignedOrder({
                    id: rider?.id
                }));
            }, 30000);
        }
      }, [rider?.id]);
    const defaultProps = {
        center: {
            lat : lat,
            lng : lng
        },
        zoom: 16
      };

    const d = new Date();
    const month = d.toLocaleString('default', { month: 'long' });
    const date = d.getDate() + " " + month + ", " + d.getFullYear();
    const time = d.getHours() + 'h ' + d.getMinutes() + 'm ' + d.getSeconds() + 's';
    const {assignedOrder} = useSelector((state)=> state.rider);
    const riderdetails = useSelector((state)=> state.rider?.rider);
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(patchRiderStatusAsync({
            id: rider?.id,
            status: `${statusValue ? 'available' : 'inactive'} `
        }));
    }
    return (
        <div className='rider__register__bg' >
            <Container className='p-3'>
                <Row className='mb-2' style={{backgroundColor:'rgba(0, 0, 0, 0.4)', borderRadius:'20px', backdropFilter:'blur(15px)'}}>
                    <Col className='d-flex justify-content-between align-items-center p-3 text-white' >
                        <div>
                        <p className=''>Hello, <span><b>{rider.name}</b></span></p>
                        <p>{date}</p>
                        <p>{time}</p>
                        </div>
                        <FaUserCircle className='' style={{fontSize:'6rem'}} />
                        <div className='d-flex flex-column my-auto'>
                        <div className='mt-3 mb-2'>
                            <AiOutlineLogout className='fs-3 bg-light p-1' onClick={logOut} style={{borderRadius:'50%', cursor:'pointer',}}/>
                        <span style={{marginLeft:'20px'}}>Logout</span>
                        </div>
                        <label className='sr-only'>Status</label>
                        <div class="form-check form-switch toggle-status">
                        <input
                            type='checkbox'
                            className='form-check-input'
                            id="flexSwitchCheckDefault"
                            checked={riderdetails?.status === 'inactive ' ? false : true}
                            onChange={(e)=> {onSubmit(e)} }
                        >
                        </input>
                        <h6>{riderdetails?.status}</h6>
                        </div>
                        <br />
                        </div>
                    </Col>
                </Row>  
                <Row>
                <Col className=' p-3' xl={12} lg={12} md={5} sm={12} xs={12} style={{ height:'fit-content', backgroundColor:'rgba(0, 0, 0, 0.4)', borderRadius:'20px', backdropFilter:'blur(15px)'}}>
                        {/* <Image src={map} className='' alt='res-map' style={{height:'37.5vh', width:'100%', borderRadius:'10px', objectFit:'cover'}}/> */}
                        {(lat && lng) && 
                                  <div style={{ height: '260px', width: '100%', }}>
                                  <GoogleMapReact
                                      bootstrapURLKeys={{ key: "AIzaSyAyt8jyJ3uk_s1p6e6qtvI50OmLq8e4z0w" }}
                                      defaultCenter={defaultProps.center}
                                      defaultZoom={defaultProps.zoom}
                                  >
                                      <MdOutlineLocationOn className='fs-4'
                                      lat={lat}
                                      lng={lng}
                                      text="My Marker"
                                      />
                                  </GoogleMapReact>
                                  </div>
                        }
              
                        </Col>
                </Row>
                <Row className='my-2' style={{backgroundColor:'rgba(0, 0, 0, 0.4)', borderRadius:'20px', backdropFilter:'blur(15px)'}}>
                    <Col className='d-flex flex-column justify-content-center align-items-center text-white'>
                        <h3 className='py-2'>
                            Orders for Today
                        </h3>
                        <div>
                        <Table striped bordered hover responsive>
                    <thead className='text-white' >
                        <tr>
                        <th>#</th>
                        <th>Restaurant</th>
                        <th>Products</th>
                        <th>User</th>
                        <th>Order Details</th>
                        <th>Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                       <tr className='text-white'>
                           <td>
                               1
                           </td>
                           <td className='' style={{width:'fit-content'}}>
                               <div className='d-flex flex-column' >
                                   <div className='d-flex justify-content-center align-items-center'>
                                   <Image src={assignedOrder?.restaurant?.image} className='h-25 w-25' />
                                    </div>
                                      <p><span><b>Name: </b></span>{assignedOrder?.restaurant?.name}</p>
                                      <p><span><b>Location: </b></span>{assignedOrder?.restaurant?.location}</p>
                                      <p><span><b>Contact: </b></span>{assignedOrder?.restaurant?.phone}</p>
                               </div>
                           </td>
                           <td className='' style={{width:'fit-content'}}>
                               {assignedOrder?.products?.map((product, index) => {
                                      return (
                                        <div key={index}>
                                             <div className='d-flex justify-content-center align-items-center'>
                                             <Image src={product?.image} className='h-25 w-25' />
                                             </div>
                                             <p><span><b>Name: </b></span>{product?.name}</p>
                                            <p><span><b>Price: </b></span>{product?.price}</p>
                                        </div>
                                      )
                                  })}
                           </td>
                           <td className=''>
                               <div className='d-flex flex-column'>
                                    <p><span><b>Name: </b></span>{assignedOrder?.user?.name}</p>
                                    <p><span><b>Contact: </b></span>{assignedOrder?.user?.contact}</p>
                                    <p><span><b>Address: </b></span>{assignedOrder?.user?.address}</p> 
                               </div>
                           </td>
                           <td className=''>
                               <div className='d-flex flex-column'>
                                  <p className={`${assignedOrder?.status === 'pending' ? 'text-warning' : 'text-primary' }`}><span><b>Status: </b></span>{assignedOrder?.status}</p>
                                  <p><span><b>Price: Rs.</b></span>{assignedOrder?.total_price}</p>
                                  <p><span><b>Date: </b></span>{assignedOrder?.date}</p>
                                  <p><span><b>Time: </b></span>{assignedOrder?.time}</p>
                               </div>
                           </td>
                           <td className=''>
                               {assignedOrder?.status === 'pending' ?
                               (<>
                                 <Button className='' style={{backgroundColor:'#ef5023', border:'none', outline : 'none'}} onClick={()=>dispatch(patchOrderStatusAsync({status : 'picked' , id : assignedOrder?.id })) }>Picked yet?</Button>
                               </>) : (
                                   <>
                                 <Button className='' style={{backgroundColor:'#ef5023', border:'none', outline : 'none'}} onClick={()=>dispatch(patchOrderStatusAsync({status : 'delivered' , id : assignedOrder?.id })) }>Delivered yet?</Button>
                                   </>
                               )}
                           </td>
                       </tr>
                    </tbody>
                    </Table>
                        </div>
                    </Col>

                </Row>

            </Container>
        </div>
    )
}
export default RiderDashboard
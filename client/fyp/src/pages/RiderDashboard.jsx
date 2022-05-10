import React, {useState,useEffect} from 'react';
import {AiOutlineLogout, AiOutlineLoading3Quarters, AiOutlineWarning} from 'react-icons/ai';
import {FaUserCircle} from 'react-icons/fa';
import auth, { logoutUser, getRiderAsync, resendVerifyRiderAsync} from '../redux/auth';
import {useSelector, useDispatch} from 'react-redux';
import { Col, Container, Image, Row, Table, Button, ToggleButton } from 'react-bootstrap';
import {MdOutlineLocationOn, MdOutlineDirections } from 'react-icons/md';
import loadingMapGif from '../img/loadingMap.gif';
import GoogleMapReact from 'google-map-react';
import { getAssignedOrder, getDeliveredOrders, patchOrderStatusAsync, patchRiderLocationAsync, patchRiderStatusAsync } from '../redux/rider';
const RiderDashboard = () => {
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [location, setLocation] = useState('');
    const [statusValue, setStatusValue] = useState(false);
    const dispatch = useDispatch();
    const logOut = (e) => {
        e.preventDefault();
        dispatch(patchRiderStatusAsync({
            id: rider?.id,
            status: 'inactive'
        }));
        dispatch(logoutUser());
    }
    const rider = useSelector((state) => state?.auth);

    useEffect(() => {
        dispatch(getRiderAsync());
        if(rider?.id){
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
            dispatch(getDeliveredOrders({
                id: rider?.id,
            }));
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
    const {deliveredOrders} = useSelector((state)=> state.rider);
    const riderdetails = useSelector((state)=> state.rider?.rider);
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(patchRiderStatusAsync({
            id: rider?.id,
            status: `${statusValue ? 'available' : 'inactive'}`
        }));
    }
    return (
        <div className='rider__register__bg' >
             {rider?.isConfirmed === false && <div className="alert alert-danger mb-1 text-center text-danger" role="alert" style={{fontSize:'12px'}}>
               <AiOutlineWarning className='fs-5' /> Confirm Your Email to Change Status <a className='border border-1 border-danger text-decoration-none text-danger rounded-3 p-1 shadow-sm' style={{cursor:'pointer'}} onClick={()=> dispatch(resendVerifyRiderAsync({email:rider.email}))}>Resend</a>
               </div>}
               {riderdetails?.status === 'inactive' && <div className="alert alert-warning mb-1 text-center text-warning" role="alert" style={{fontSize:'12px'}}>
               <AiOutlineWarning className='fs-5 text-warning' />Change Your Status to get Orders </div>}
            <Container className='p-3'>
                <Row className='mb-2 ' style={{backgroundColor:'rgba(0, 0, 0, 0.4)', borderRadius:'20px', backdropFilter:'blur(15px)'}}>
                    <Col className='d-flex justify-content-between align-items-center py-3 px-5 text-white' >
                        <div style={{fontSize:'14px'}}>
                        <p className='fs-6'>Hello, <span><b>{rider.name}</b></span></p>
                        <p>{date}</p>
                        <p>{time}</p>
                        </div>
                        <FaUserCircle className='' style={{fontSize:'6rem'}} />
                        <div className='d-flex flex-column my-auto'>
                        <div class="form-check form-switch toggle-status mt-4" style={{fontSize:'14px'}} >
                        {rider?.isConfirmed === true && <><input
                            type='checkbox'
                            className='form-check-input'
                            id="flexSwitchCheckDefault"
                            checked={riderdetails?.status === 'inactive' ? false : true}
                            onChange={(e)=> {setStatusValue(!statusValue); onSubmit(e); } }
                        >
                        </input>
                        <h6 className='text-capitalize text-center'>{riderdetails?.status ? riderdetails?.status : 'Updating'}</h6></>}
                        </div>
                        <div className='mt-1 mb-2 ' style={{fontSize:'14px'}}>
                            <AiOutlineLogout className='fs-3 bg-light p-1' onClick={logOut} style={{borderRadius:'50%', cursor:'pointer',}}/>
                        <span style={{marginLeft:'20px'}}>Logout</span>
                        </div>
                        <br />
                        </div>
                    </Col>
                </Row>  
                <Row>
                <Col className=' p-3' xl={12} lg={12} md={12} sm={12} xs={12} style={{ height:'fit-content', backgroundColor:'rgba(0, 0, 0, 0.4)', borderRadius:'20px', backdropFilter:'blur(15px)'}}>
                        <h6 className='py-2 text-center text-white' >
                            Current Location
                        </h6>
                        {/* AIzaSyAyt8jyJ3uk_s1p6e6qtvI50OmLq8e4z0w */}
                        {/* <Image src={map} className='' alt='res-map' style={{height:'37.5vh', width:'100%', borderRadius:'10px', objectFit:'cover'}}/> */}
                        {(lat && lng) ? 
                                  (<div style={{ height: '260px', width: '100%', }}>
                                      
                                  <GoogleMapReact
                                      bootstrapURLKeys={{ key: "AIzaSyAOWEsA7XNwmoFasiw9hlAewldBeEJB8-o" }}
                                      defaultCenter={defaultProps.center}
                                      defaultZoom={defaultProps.zoom}
                                  >
                                      <MdOutlineLocationOn className='fs-4'
                                      lat={lat}
                                      lng={lng}
                                      text="My Marker"
                                      />
                                  </GoogleMapReact>
                                  </div>) : 
                                  (<div className='d-flex flex-column justify-content-center align-items-center' style={{height: '260px', width: '100%', }}>
                                      <AiOutlineLoading3Quarters className='fs-1 mb-5 rotation' />
                                      <p className='text-white text-center'>Loading location...</p>
                                    </div>)
                        }
              
                        </Col>
                </Row>
                <Row className='my-2' style={{backgroundColor:'rgba(0, 0, 0, 0.4)', borderRadius:'20px', backdropFilter:'blur(15px)'}}>
                    <Col className='d-flex flex-column justify-content-center align-items-center text-white'>
                        <h6 className='py-2'>
                            Active Orders
                        </h6>
                        {assignedOrder?.restaurant ? 
                        (<div>
                        <Table striped bordered hover responsive style={{fontSize:'12px'}}>
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
                                      <p><span><b>Contact: </b></span><a className='text-success' href={`tel:${assignedOrder?.restaurant?.phone}`}>{assignedOrder?.restaurant?.phone}</a></p>
                               </div>
                           </td>
                           <td className='' style={{width:'fit-content'}}>
                               {assignedOrder?.products?.map((product, index) => {
                                      return (
                                        <div key={index} className='d-flex flex-column justify-content-center align-items-center'>
                                             <Image src={product?.image} className='h-25 w-25' />
                                             <p><span><b>Name: </b></span>{product?.name}</p>
                                            <p><span><b>Price: </b></span>{product?.price}</p>
                                        </div>
                                      )
                                  })}
                           </td>
                           <td className=''>
                               <div className='d-flex flex-column'>
                                    <p><span><b>Name: </b></span>{assignedOrder?.user?.name}</p>
                                    <p><span><b>Contact: </b></span><a className='text-success' href={`tel:${assignedOrder?.user?.contact}`}>{assignedOrder?.user?.contact}</a></p>
                                    <p><span><b>Address: </b></span>{assignedOrder?.user?.address}</p> 
                               </div>
                           </td>
                           <td className=''>
                               <div className='d-flex flex-column'>
                                  <p className={`${assignedOrder?.status === 'pending' ? 'text-warning' : 'text-primary' } text-capitalize `}><span><b>Status: </b></span>{assignedOrder?.status}</p>
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
                                 <Button className='' style={{backgroundColor:'blue', border:'none', outline : 'none'}} onClick={()=>dispatch(patchOrderStatusAsync({status : 'delivered' , id : assignedOrder?.id })) }>Delivered yet?</Button>
                                   </>
                               )}
                               <a href={`${assignedOrder?.status === 'pending' ? `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${assignedOrder?.restaurant?.lat},${assignedOrder?.restaurant?.lng}&travelmode=driving` : `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${assignedOrder?.user?.lat},${assignedOrder?.user?.lng}&travelmode=driving`}`} target='_blank' rel="noopener noreferrer" className=''>
                                <Button className='mt-2' style={{backgroundColor:'#ef5023', border:'none', outline : 'none'}}><MdOutlineDirections className='fs-5 text-white' style={{marginRight:'2.5px'}}  />Directions</Button>
                                </a>
                           </td>
                       </tr>
                    </tbody>
                    </Table>
                        </div>) : 
                        (<div className='d-flex flex-column justify-content-center align-items-center' style={{height: '260px', width: '100%', }}>
                            <AiOutlineLoading3Quarters className='fs-1 mb-3 rotation' />
                            <p className='text-white text-center'>Finding Orders For You...</p>
                        </div>)
                        }
                    </Col>

                </Row>
                <Row className='my-2' style={{backgroundColor:'rgba(0, 0, 0, 0.4)', borderRadius:'20px', backdropFilter:'blur(15px)'}}>
                    <Col className='d-flex flex-column justify-content-center align-items-center text-white'>
                        <h3 className='py-2'>
                            Completed Orders
                        </h3>
                        {deliveredOrders?.length > 0 ? 
                        (<div>
                        <Table striped bordered hover responsive style={{fontSize:'12px'}}>
                    <thead className='text-white' >
                        <tr>
                        <th>#</th>
                        <th>Restaurant</th>
                        <th>Products</th>
                        <th>User</th>
                        <th>Order Details</th>
                        <th>Order Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveredOrders?.map((d, index) => 
                       <tr className='text-white'>
                           <td>
                               {index + 1}
                           </td>
                           <td className='' style={{width:'fit-content'}}>
                               <div className='d-flex flex-column' >
                                   <div className='d-flex justify-content-center align-items-center'>
                                   <Image src={d?.restaurant?.image} className='h-25 w-25' />
                                    </div>
                                      <p><span><b>Name: </b></span>{d?.restaurant.name}</p>
                                      <p><span><b>Location: </b></span>{d?.restaurant?.location}</p>
                                      <p><span><b>Contact: </b></span>{d?.restaurant?.phone}</p>
                               </div>
                           </td>
                           <td className='' style={{width:'fit-content'}}>
                               {d?.products?.map((product, index) => {
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
                                    <p><span><b>Name: </b></span>{d?.user?.name}</p>
                                    <p><span><b>Contact: </b></span>{d?.user?.contact}</p>
                                    <p><span><b>Address: </b></span>{d?.user?.address}</p> 
                               </div>
                           </td>
                           <td className=''>
                               <div className='d-flex flex-column'>
                                  <p><span><b>Status: </b></span>{d?.status}</p>
                                  <p><span><b>Price: Rs.</b></span>{d?.total_price}</p>
                                  <p><span><b>Date: </b></span>{d?.date}</p>
                                  <p><span><b>Time: </b></span>{d?.time}</p>
                               </div>
                           </td>
                           <td className=''>
                               <p>Delivered</p>
                           </td>
                       </tr>
                        )}
                    </tbody>
                    </Table>
                        </div>) : 
                        (<div className='d-flex flex-column justify-content-center align-items-center' style={{height: '260px', width: '100%', }}>
                            <AiOutlineLoading3Quarters className='fs-1 mb-5 rotation' />
                            <p className='text-white text-center'>Completed Orders...</p>
                        </div>)
                        }
                    </Col>

                </Row>

            </Container>
        </div>
    )
}
export default RiderDashboard
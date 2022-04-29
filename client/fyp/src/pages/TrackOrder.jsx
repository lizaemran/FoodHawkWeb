import React, {useState} from 'react'
// import Footer from '../UserSide/components/common/Footer/Footer';
// import NavBar from '../UserSide/components/common/nav/NavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {GrRestaurant} from 'react-icons/gr';
import {MdSportsMotorsports} from 'react-icons/md';
// import RiderLoginForm from '../components/RiderLoginForm';
import {IoReceipt} from 'react-icons/io5';
import {RiMapPinUserFill} from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getOrderAsync, getProductAsync } from '../redux/user';
import { Col, Row , Container, Image} from 'react-bootstrap';
import SideNav from '../components/SideNav/SideNav';
// import cooking from '../img/cooking.svg';
import ontheway from '../img/ontheway.svg';
import delivered from '../img/delivered.svg';
import { Swiper, SwiperSlide } from "swiper/react";
// import fitBound from 'google-map-react/utils/fit-bound';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import jwt_decode from "jwt-decode";
import { getUserAsync } from '../redux/auth';
import { getRiderAssign, getRiderByIdAsync } from '../redux/rider';
import {getRestaurantAsync} from '../redux/Slice';
// import Carousel from 'react-bootstrap/Carousel';
import Cooking from '../components/Cooking';
import GoogleMapReact from 'google-map-react';
import {MdOutlineLocationOn} from 'react-icons/md';
const TrackOrder = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    var location = useLocation();
    location = location.pathname;
    const token = useSelector((state)=> state.auth.token);
    var decoded = jwt_decode(token);
    const order_id = location.split('/')[2];
    const [latValue, setLatValue] = useState('');
    const [lngValue, setLngValue] = useState('');
    const rider = useSelector((state) => {if(state.rider?.assignedRider) { return  state.rider?.assignedRider} else { return state.rider?.rider}});
    const restaurant = useSelector((state) => state.restaurants?.restaurant);
    useEffect(() => {
        dispatch(getOrderAsync(order_id)); 
        if(decoded.isUser === true){
            dispatch(getUserAsync());
        }
          dispatch(getRiderAssign({
            id: order_id,
        }));  
        
       
    }, [])
    const order = useSelector((state) => state.user.order);
    // const assignedRider = useSelector((state) => state.rider?.assignedRider);
    useEffect(() => {
        if(order?.rider_id && order?.restaurant_id){
        dispatch(getRiderByIdAsync({id: order?.rider_id}));
        dispatch(getRestaurantAsync({
          id : order?.restaurant_id
      })); 
        }
 
    navigator.geolocation.getCurrentPosition(function(position) {
        setLatValue(position.coords.latitude);
        setLngValue(position.coords.longitude);
      });
    }, [order])
    
    const defaultProps = {        
        center: {
            lat : (restaurant?.lat + latValue)/2,
            lng : (restaurant?.lng + lngValue)/2
        },

        zoom : 16
        
      };
      var points = [
        {lat : restaurant?.lat, lng : restaurant?.lng},
        {lat : latValue, lng : lngValue},
        {lat : rider?.lat, lng : rider?.lng},

      ]
      // const getMapBounds = (map, maps, points) => {
      //   const bounds = new maps.LatLngBounds();
      //   points.forEach((point) => {
      //     bounds.extend(new maps.LatLng(
      //       point.lat,
      //       point.lng,
      //     ));
      //   });
      //   return bounds;
      // };
      // const bindResizeListener = (map, maps, bounds) => {
      //   maps.event.addDomListenerOnce(map, 'idle', () => {
      //     maps.event.addDomListener(window, 'resize', () => {
      //       map.fitBounds(bounds);
      //     });
      //   });
      // };
      // const apiIsLoaded = (map, maps, places) => {
      //   // Get bounds by our places
      //   const bounds = getMapBounds(map, maps, places);
      //   // Fit map to bounds
      //   map.fitBounds(bounds);
      //   // Bind the resize listener
      //   bindResizeListener(map, maps, bounds);
      // };
    return (
        <div>
        <Row>
            <Col xl={1} lg={1} md={1} sm={1} xs={1}>
                <SideNav />
            </Col>
            <Col>
            <Container className='p-2 mt-3'>
                <ToastContainer />
                <Row>
            <div className='px-4 py-3 mb-3 text-white w-25 d-flex justify-content-start align-items-center' style={{borderRadius:"10px", backgroundColor:'#EF5023'}}>
                        <p className='fs-4' style={{marginBottom:'0px'}}>Hello, {auth.firstName || auth.username}</p>
                    </div>
                    <h4>Track Your Order...</h4>
                    </Row>
            </Container>
                <Container className='p-4' style={{backgroundColor:'#f7f2f2', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px', borderRadius:'10px',}}>
                    
                    <section>
                    <Row>
                        {order.status === 'pending' && <Cooking />}     
                        {order.status === 'picked' && <>
                        {(restaurant?.lat && restaurant?.lng) && 
                                  <div style={{ height: '260px', width: '100%', }}>
                                  <GoogleMapReact
                                      bootstrapURLKeys={{ key: "AIzaSyAOWEsA7XNwmoFasiw9hlAewldBeEJB8-o" }}
                                      defaultCenter={defaultProps.center}
                                      defaultZoom={defaultProps.zoom}
                                      // onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, points)}

                                  >
                                      <RiMapPinUserFill className='fs-1 text-dark' style={{transform:'translateY(-50%)'}}
                                      lat={latValue}
                                      lng={lngValue}
                                      text="My Marker"
                                      />
                                      <GrRestaurant className='fs-1 text-warning' style={{transform:'translateY(-50%)', color: '#e843b6'}}
                                      lat={restaurant?.lat}
                                      lng={restaurant?.lng}
                                      text="My Marker"
                                      />
                                      <MdSportsMotorsports className='fs-1' style={{transform:'translateY(-50%)', }}
                                      lat={rider?.lat}
                                      lng={rider?.lng}
                                      text="My Marker"
                                      />
                                  </GoogleMapReact>
                                
                                  </div>
                        }           <div className='d-flex py-4 justify-content-center align-items-center'>
                                    <Image src={ontheway} style={{height: '30px', width: 'auto', objectFit: 'contain'}} />
                                    <p style={{marginBottom:'0px'}} className='d-flex justify-content-center align-items-center'>
                                        Your order is on your way...
                                        </p>
                        </div>
                        </>}   
                        {order.status === 'delivered' && <Image className='m-auto' src={delivered} style={{height: '300px', width: 'auto', objectFit: 'contain'}} />}     
                    </Row>
                    </section>

                    <section>
                    <Row className='my-2' >
                    <Col className='' style={{}}>
                            <h5  className='text-center'><IoReceipt className='fs-2' style={{marginRight:'5px'}} /><b>Order details</b></h5>
                            <h6>Total amount: {order.total_price}</h6>
                            <h6 className='text-capitalize'>Status: <span className={order.status === 'pending' ? 'text-warning' : 'text-primary'}>{order.status}</span></h6>
                            <h6>{order.date}</h6>
                            <h6>{order.time}</h6>
                            </Col>
                            {rider && 
                            <Col className='' style={{borderLeft:'1px solid rgba(0,0,0,0.2)'}}>
                            <h5 className='text-center'><MdSportsMotorsports className='fs-2' style={{marginRight:'5px'}} /><b>Rider details</b></h5>
                            <h6>Name: {rider.name}</h6>
                            <h6>Phone: {order.status === 'picked' ? (<a className='text-success' href={`tel:${rider.phone}`}>{rider.phone}</a>) : (<>{rider.phone}</>)} </h6> 
                            </Col>}
                    </Row>
                    </section>
                    <Row className='flex-wrap my-2'>
                    <Swiper className="mySwiper " slidesPerView={3} spaceBetween={10}  breakpoints = {{ 300 : {slidesPerView : 1} ,499 : {slidesPerView : 1} , 800 : {slidesPerView : 2}, 1024: {slidesPerView : 3}}}>
                                 {order.products?.map((product, index) => (
                                <Col xl={6} lg={6} md={6} sm={12} xs={12} key={index} className='my-2 mx-1 p-2 d-flex justify-content-start align-items-center' style={{ width:'fit-content'}}>
                             <SwiperSlide  style={{width: "426px", height:"200px"}}> 
                             <div className='py-2' style={{backgroundColor:'white', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px', borderRadius:'10px',}}>
                                        <div className='d-flex flex-column justify-content-center align-items-center'>
                                        <img src={product.image} alt="product" className='' style={{height:'15vh', width:'auto'}} />
                                        <h6 className='text-center mt-2'><b>{product.name}</b></h6>
                                        </div>
                                        <div className='d-flex justify-content-between px-3'>
                                        <h6>PKR {product.price}/-</h6>
                                        <h6>{product.category}</h6>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                </Col>
                                ))}
                          </Swiper>
                    </Row>
               
                   
                </Container>
            </Col>
        </Row>
        </div>
    )
}
export default TrackOrder
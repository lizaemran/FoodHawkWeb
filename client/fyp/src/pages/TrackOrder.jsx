import React from 'react'
import Footer from '../UserSide/components/common/Footer/Footer';
import NavBar from '../UserSide/components/common/nav/NavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RiderLoginForm from '../components/RiderLoginForm';
import {MdSportsMotorsports} from 'react-icons/md';
import {IoReceipt} from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getOrderAsync, getProductAsync } from '../redux/user';
import { Col, Row , Container, Image} from 'react-bootstrap';
import SideNav from '../components/SideNav/SideNav';
import map from '../img/gmaps.gif';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import jwt_decode from "jwt-decode";
import { getUserAsync } from '../redux/auth';
import { getRiderAssign, getRiderByIdAsync } from '../redux/rider';
import Carousel from 'react-bootstrap/Carousel';
const TrackOrder = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    var location = useLocation();
    location = location.pathname;
    const token = useSelector((state)=> state.auth.token);
    var decoded = jwt_decode(token);
    const order_id = location.split('/')[2];
    useEffect(() => {
        dispatch(getOrderAsync(order_id)); 
        if(decoded.isUser === true){
            dispatch(getUserAsync());
          
        }

    }, [])
    // useEffect(() => {
    //     for(let i = 0; i < order?.products?.length; i++){ 
    //         dispatch(getProductAsync(order.products[i]));
    //     }
    // }, [order])
    const order = useSelector((state) => state.user.order);

    useEffect(() => {
        if(order.rider_id === null || order.rider_id === undefined){
        dispatch(getRiderAssign({
            id: order_id,
        }));
    }
    else{
        dispatch(getRiderByIdAsync({id: order?.rider_id}));
    }
    }, [order])
    const rider = useSelector((state) => state.rider?.rider);
    return (
        <div>
        <Row>
            <Col xl={1} lg={1} md={1} sm={1} xs={1}>
                <SideNav />
            </Col>
            <Col>
            <Container className='p-2 mt-3'>
                <Row>
            <div className='px-4 py-3 mb-3 bg-danger bg-opacity-10 text-white w-25 d-flex justify-content-start align-items-center' style={{borderRadius:"10px"}}>
                        <p className='fs-4' style={{marginBottom:'0px'}}>Hello, {auth.firstName || auth.username}</p>
                    </div>
                    <h4>Track Your Order...</h4>
                    </Row>
            </Container>
                <Container className='p-4' style={{backgroundColor:'#f7f2f2', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px', borderRadius:'10px',}}>
                  
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
                            <h6>Phone: {rider.phone}</h6> 
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
               
                    <Row>
                        <Image src={map} alt='map-tracking' className='' style={{height:'60vh', width:'100%', objectFit:'cover'}} />
                    </Row>
                </Container>
            </Col>
        </Row>
        </div>
    )
}
export default TrackOrder
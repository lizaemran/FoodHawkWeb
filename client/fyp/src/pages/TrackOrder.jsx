import React from 'react'
import Footer from '../UserSide/components/common/Footer/Footer';
import NavBar from '../UserSide/components/common/nav/NavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RiderLoginForm from '../components/RiderLoginForm';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getOrderAsync, getProductAsync } from '../redux/user';
import { Col, Row , Container, Image} from 'react-bootstrap';
import SideNav from '../components/SideNav/SideNav';
import map from '../img/gmaps.gif';
import jwt_decode from "jwt-decode";
import { getUserAsync } from '../redux/auth';
import { getRiderAssign } from '../redux/rider';
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
            dispatch(getRiderAssign({
                id: order_id,
            }));
        }

    }, [])
    // useEffect(() => {
    //     for(let i = 0; i < order?.products?.length; i++){ 
    //         dispatch(getProductAsync(order.products[i]));
    //     }
    // }, [order])
    const order = useSelector((state) => state.user.order);
    return (
        <div>
        <Row>
            <Col xl={1} lg={1} md={1} sm={1} xs={1}>
                <SideNav />
            </Col>
            <Col>
                <Container className='p-4'>
                    <div className='px-4 py-3 mb-3 bg-danger bg-opacity-10 text-white w-25 d-flex justify-content-start align-items-center' style={{borderRadius:"10px"}}>
                        <p className='fs-4' style={{marginBottom:'0px'}}>Hello, {auth.firstName || auth.username}</p>
                    </div>
                    <h4>Track Your Order</h4>
                    <Row className='flex-wrap my-2'>
                        <Col className='' style={{}}>
                            {order.products?.map((product, index) => 
                                <Col xl={6} lg={6} md={6} sm={12} xs={12} key={index} className='m-2 p-2 d-flex justify-content-start align-items-center' style={{backgroundColor:'#f7f2f2', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px', borderRadius:'10px'}}>
                                    <img src={product.image} alt="product" className='' style={{height:'15vh', width:'auto', marginRight:'20px'}} />
                                    <div className='d-flex flex-column'>
                                        <h6><b>{product.name}</b></h6>
                                        <h6>PKR {product.price}/-</h6>
                                        <h6>{product.category}</h6>
                                    </div>
                                </Col>
                            
                            )}
                            </Col>
                            <Col className='' style={{borderLeft:'1px solid black'}}>
                            <h5><b>Order details</b></h5>
                            <h6>Total amount: {order.total_price}</h6>
                            <h6>Status {order.status}</h6>
                            <h6>{order.date}</h6>
                            <h6>{order.time}</h6>
                            </Col>
                    </Row>
                    <Row>

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
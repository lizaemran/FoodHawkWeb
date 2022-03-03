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

const TrackOrder = () => {
    const dispatch = useDispatch();
    var location = useLocation();
    location = location.pathname;
    const order_id = location.split('/')[2];
    useEffect(() => {
        dispatch(getOrderAsync(order_id)); 
    }, [dispatch])
    const order = useSelector((state) => state.user.order);
    useEffect(() => {
        for(let i = 0; i < order?.products?.length; i++){ 
            dispatch(getProductAsync(order.products[i]));
        }
    }, [order])
    const products = useSelector((state) => state.user.products);
    return (
        <div>
        <Row>
            <Col xl={1} lg={1} md={1} sm={1} xs={1}>
                <SideNav />
            </Col>
            <Col>
                <Container className='p-5'>
                <h5>Order</h5>
                    <Row className='flex-wrap'>
                            {products?.map((product, index) => 
                                <Col xl={4} lg={4} md={3} sm={12} xs={12} className='m-2 p-2' key={index} className=' d-flex justify-content-start align-items-center' style={{backgroundColor:'#f7f2f2', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px', borderRadius:'10px'}}>
                                    <img src={product.image} alt="product" className='' style={{height:'15vh', width:'auto', marginRight:'20px'}} />
                                    <div className='d-flex flex-column'>
                                        <h6><b>{product.name}</b></h6>
                                        <h6>PKR {product.price}/-</h6>
                                        <h6>{product.category}</h6>
                                    </div>
                                </Col>
                            
                            )}
                    </Row>
                    <Row>

                    </Row>
                    <Row>
                        <Image src={map} alt='map-tracking' className='h-auto w-100' style={{}} />
                    </Row>
                </Container>
            </Col>
        </Row>
        </div>
    )
}
export default TrackOrder
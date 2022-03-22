import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import SideNav from "../components/SideNav/SideNav";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getOrderAsync } from "../redux/user";
const OrderDetails = () => {
    const token = useSelector((state)=> state.auth.token);
    const auth = useSelector((state) => state.auth);
    var location = useLocation();
    location = location.pathname.split("/")[2];
    const dispatch = useDispatch();
    useEffect  (()=>{
        dispatch(getOrderAsync(location));
    },[])
    const order = useSelector((state) => state.user?.order);
    return (
        <div>
         <Row>
            <Col xl={1} lg={1} md={1} sm={12} xs={12} >
            <SideNav />
            </Col>
            <Col xl={11} lg={11} md={11} sm={12} xs={12}>
           <Container className='px-4'>
               <div className="py-3 px-5 my-5" style={{backgroundColor:'rgba(237,144,90,0.5)'}} >
                   <div className="p-3 bg-light shadow-lg" style={{borderRadius:'10px', borderTop:'15px solid #f27a35', }}>
                   <Row>
                   <h5 className=''>Order Details</h5>
                   <p>Order ID: {order?._id}</p>
                   <p className="text-capitalize">{order?.status}</p>
                   <p>{order?.date}</p>
                   <p>{order?.time}</p>
                   </Row>
                    <Row>
                        <Col>
                            <h5 className=''>Restaurant Details</h5>
                            <p>{order?.restaurant_id}</p>
                        </Col>
                        <Col>
                            <h5 className=''>User Details</h5>
                            <p>{order?.user_id}</p>
                        </Col>
                        <Col>
                            <h5 className=''>Rider Details</h5>
                            <p>{order?.rider_id}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <h5 className=''>Order Details</h5>
                        {order?.products?.map((p) => 
                            <div key={p?.id} className=' ' style={{borderTop:'5px dotted #e5e5e5'}}>
                                <div className="mx-5 my-2 d-flex justify-content-between align-items-center">
                                <Image src={p?.image} className='' style={{width:'75px', height:'auto', objectFit:'cover'}} />
                                <p>{p?.name}</p>
                                <p>{p?.category}</p>
                                <p>PKR {p?.price}</p>
                                </div>
                            </div>
                        )}
                        <p className="text-end mx-5"><b>Delivery Charges: </b>PKR 60</p>
                        <p className="text-end mx-5"><b>Total Price: </b>PKR {order?.total_price}</p>
                        </Col>
                    </Row>
                    </div>
               </div>
            </Container>
            </Col>
            </Row>
        </div>
    );
    }
export default OrderDetails;
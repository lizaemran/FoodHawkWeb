import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch , useSelector} from "react-redux";
import { getDeliveredOrders } from "../redux/rider";
import {Row, Col, Container, Table, Image} from 'react-bootstrap';
import SideNav from '../components/SideNav/SideNav';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
const RiderDetails = () => {
    var location = useLocation();
    location = location.pathname;
    location = location.split("/")[2];
    const token = useSelector((state)=> state.auth.token);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect (() => {
        dispatch(getDeliveredOrders({
            id: location
        }))
    }, [])
    const deliveredOrders = useSelector((state)=> state?.rider?.deliveredOrders);
    return (
        <div>
         <Row>
            <Col xl={1} lg={1} md={1} sm={12} xs={12} >
            <SideNav />
            </Col>
            <Col xl={11} lg={11} md={11} sm={12} xs={12}>
           <Container className='p-4 mt-3'>
               <h5 className="">Rider Details</h5>
               {deliveredOrders.length > 0 ? 
                        (<div>
                        <Table striped bordered hover responsive>
                    <thead className='text-dark' >
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
                       <tr className='text-dark'>
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
            </Container>
            </Col>
            </Row>
        </div>
    );
    }
export default RiderDetails;
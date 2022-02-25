import React, {useState,useEffect} from 'react';
import {AiOutlineLogout} from 'react-icons/ai';
import { logoutUser, getRiderAsync} from '../redux/auth';
import {useSelector, useDispatch} from 'react-redux';
import { Col, Container, Image, Row, Table } from 'react-bootstrap';

const RiderDashboard = () => {
    const dispatch = useDispatch();
    const logOut = (e) => {
        e.preventDefault();
        dispatch(logoutUser());
    }
    useEffect(()=> {
        dispatch(getRiderAsync());
    }, []) //have to re-render on status change
    const rider = useSelector((state) => state?.auth);
    const d = new Date();
    const month = d.toLocaleString('default', { month: 'long' });
    const date = d.getDate() + " " + month + ", " + d.getFullYear();
    const time = d.getHours() + 'h ' + d.getMinutes() + 'm ' + d.getSeconds() + 's';
    return (
        <div className='rider__register__bg' >
            <Container className='p-3'>
                <Row className='mb-2' style={{backgroundColor:'rgba(255, 255, 255, 0.5)', borderRadius:'20px', backdropFilter:'2px'}}>
                    <Col className='d-flex justify-content-between align-items-center p-3' >
                        <div>
                        <p className=''>Hello, {rider.name}</p>
                        <p>{date}</p>
                        <p>{time}</p>
                        </div>
                        <AiOutlineLogout className='fs-3 bg-light p-1' onClick={logOut} style={{borderRadius:'50%', cursor:'pointer',}}/>
                    </Col>
                </Row>  
                <Row className='mb-2' style={{backgroundColor:'rgba(255, 255, 255, 0.5)', borderRadius:'20px', backdropFilter:'2px'}}>
                    <Col className='d-flex flex-column justify-content-center align-items-center'>
                        <h3>
                            Orders for Today
                        </h3>
                        <div>
                        <Table striped bordered hover responsive>
                    <thead className='' >
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Category</th>
                        <th>Location</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                       <tr className=''>
                           <td>
                               1
                           </td>
                           <td className=''>
                               name
                           </td>
                           <td className=''>
                               price
                           </td>
                           <td className=''>
                               0
                           </td>
                           <td className=''>
                               fastfood
                           </td>
                           <td className=''>
                               House no.1, Street no.1, City
                           </td>
                           <td className=''>
                               Completed/Remaining/On-route
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
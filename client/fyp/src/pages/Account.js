import React, {useEffect} from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import SideNav from '../components/SideNav/SideNav'
import Footer from '../UserSide/components/common/Footer/Footer'
import { useSelector } from 'react-redux';
import {BiRestaurant} from 'react-icons/bi';
import {FiUsers} from 'react-icons/fi';
import {GiCash} from 'react-icons/gi';
import { useDispatch } from 'react-redux';
import { getAllUsersAsync } from '../redux/admin';
import jwt_decode from "jwt-decode";
const Account = () => {
    const token = useSelector((state)=> state.auth.token);
    const firstName = useSelector((state) => state.auth.firstname);
    const restaurants = useSelector((state)=> state.restaurants);
    const users = useSelector((state)=> state?.admin.users);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllUsersAsync());
    }, [dispatch])
    var decoded = jwt_decode(token);

    return (
        <>
        <Row>
            <Col xl={1} lg={1} md={1} sm={12} xs={12} >
            <SideNav />
            </Col>
            <Col xl={11} lg={11} md={11} sm={12} xs={12}>
           <Container className='p-4'>
               <div className='p-5 bg-danger bg-opacity-10 text-white' style={{borderRadius:"10px"}}>
                    <p className='fs-4'>Hello, {firstName}</p>
               </div>
               {decoded.isAdmin === true && 
               <Row className='py-5 text-white' >
                   <Col xl={2} lg={2} md={2} sm={12} xs={12} className='bg-success p-2 m-2 d-flex flex-column justify-content-center align-items-center' style={{borderRadius:"15px"}}>
                   <BiRestaurant className='fs-1 text-white'/>
                   <p style={{marginBottom:"0px"}}>{restaurants.length}</p>
                   <p className=''>Restaurants</p>
                   </Col>
                   <Col xl={2} lg={2} md={2} sm={12} xs={12} className='bg-primary p-2 m-2 d-flex flex-column justify-content-center align-items-center' style={{borderRadius:"15px"}}>
                   <FiUsers className='fs-1 text-white'/>
                   <p style={{marginBottom:"0px"}}>{users.length}</p>
                   <p className=''>Users</p>
                   </Col>
                   <Col xl={2} lg={2} md={2} sm={12} xs={12} className='bg-secondary p-2 m-2 d-flex flex-column justify-content-center align-items-center' style={{borderRadius:"15px"}}>
                   <GiCash className='fs-1 text-white'/>
                   <p style={{marginBottom:"0px"}}>PKR 0</p>
                   <p className=''>Sales</p>
                   </Col>
               </Row>
               }
           </Container>
           </Col>
        </Row>
           <Footer /> 
        </>
    )
}

export default Account

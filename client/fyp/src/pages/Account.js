import React, {useEffect} from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import SideNav from '../components/SideNav/SideNav'
import Footer from '../UserSide/components/common/Footer/Footer'
import { useSelector } from 'react-redux';
import {BiRestaurant} from 'react-icons/bi';
import {FiUsers} from 'react-icons/fi';
import {GiCash, GiNotebook, GiFullMotorcycleHelmet} from 'react-icons/gi';
import {GrNote} from 'react-icons/gr';
import { useDispatch } from 'react-redux';
import { getAllUsersAsync } from '../redux/admin';
import jwt_decode from "jwt-decode";
const Account = () => {
    const token = useSelector((state)=> state.auth.token);
    const auth = useSelector((state) => state.auth);
    const restaurants = useSelector((state)=> state.restaurants.restaurants);
    const users = useSelector((state)=> state?.admin.users);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllUsersAsync());
    }, [dispatch])
    var decoded = jwt_decode(token);

    return (
        <>
        <div>
        <Row>
            <Col xl={1} lg={1} md={1} sm={12} xs={12} >
            <SideNav />
            </Col>
            <Col xl={11} lg={11} md={11} sm={12} xs={12}>
           <Container className='p-4'>
               <div className='p-5 bg-danger bg-opacity-10 text-white' style={{borderRadius:"10px"}}>
                    <p className='fs-4'>Hello, {auth.firstName || auth.username}</p>
               </div>
               {decoded.isAdmin === true && 
               (<><Row className='py-5 text-white' >
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
                   <Col xl={2} lg={2} md={2} sm={12} xs={12} className='bg-info p-2 m-2 d-flex flex-column justify-content-center align-items-center' style={{borderRadius:"15px"}}>
                   <GiNotebook className='fs-2 text-white' style={{}}/>
                   <p style={{marginBottom:"0px"}}> 0</p>
                   <p className=''>Orders</p>
                   </Col>
                   <Col xl={2} lg={2} md={2} sm={12} xs={12} className='bg-warning p-2 m-2 d-flex flex-column justify-content-center align-items-center' style={{borderRadius:"15px"}}>
                   <GiFullMotorcycleHelmet className='fs-2 text-white' style={{}}/>
                   <p style={{marginBottom:"0px"}}> 0</p>
                   <p className=''>Riders</p>
                   </Col>
               </Row>
               <Row>
                   <Col>
                   <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                       {users.map((u, index)=> 
                       <tr>
                           <td>
                                {index}
                           </td>
                           <td>
                               {u.firstname}
                           </td>
                           <td>
                               {u.lastname}
                           </td>
                           <td>
                               {u.username}
                           </td>
                           <td>
                               {u.email}
                           </td>
                           <td>
                               {u.contact}
                           </td>
                       </tr>
                       )}
                    </tbody>
                    </Table>
                   </Col>
                   <Col>
                   <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Rating</th>
                        <th>Status</th>
                        <th>Products</th>
                        </tr>
                    </thead>
                    <tbody>
                       {restaurants.map((u, index)=> 
                       <tr>
                           <td>
                                {index}
                           </td>
                           <td>
                               {u.name}
                           </td>
                           <td>
                               {u.location}
                           </td>
                           <td>
                               {u.rating}
                           </td>
                           <td>
                               {u.status === true ? 'Active' : 'Closed'} 
                           </td>
                           <td>
                               {u.products.length}
                           </td>
                       </tr>
                       )}
                    </tbody>
                    </Table>
                   </Col>
               </Row>
               </>)
               }
           </Container>
           </Col>
        </Row>
           </div>
        </>
    )
}

export default Account

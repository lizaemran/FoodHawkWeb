import React, {useState, useEffect} from 'react'
import { Col, Container, Row, Table, Image } from 'react-bootstrap'
import SideNav from '../components/SideNav/SideNav'
import {Link} from 'react-router-dom';
import Footer from '../UserSide/components/common/Footer/Footer'
import { useSelector } from 'react-redux';
import {BiRestaurant} from 'react-icons/bi';
import {FiUsers} from 'react-icons/fi';
import {GiCash, GiNotebook, GiFullMotorcycleHelmet} from 'react-icons/gi';
import {GrNote} from 'react-icons/gr';
import { useDispatch } from 'react-redux';
import { getAllOrdersAsync, getAllRidersAsync, getAllUsersAsync } from '../redux/admin';
import jwt_decode from "jwt-decode";
import { getAllOrdersForUserAsync } from '../redux/user';
const Account = () => {
    const token = useSelector((state)=> state.auth.token);
    const auth = useSelector((state) => state.auth);
    const restaurants = useSelector((state)=> state.restaurants.restaurants);
    const users = useSelector((state)=> state?.admin.users);
    const riders = useSelector((state)=> state?.admin.riders);
    const orders = useSelector((state)=> state?.admin.orders);
    const [isRestaurant, setIsRestaurant] = useState(true);
    const [isUser, setIsUser] = useState(false);
    const [isRider, setIsRider] = useState(false);
    const [isOrder, setIsOrder] = useState(false);
    const dispatch = useDispatch();
    var decoded = jwt_decode(token);
    useEffect(() => {
        if(decoded.isAdmin == true){
        dispatch(getAllUsersAsync());
        dispatch(getAllRidersAsync());
        dispatch(getAllOrdersAsync());
        }
        else if(decoded.isUser == true){
        dispatch(getAllOrdersForUserAsync(auth?.id));
        }
        else{
            alert("You are not authorized to view this page");
        }
    }, [dispatch])
    const allOrders = useSelector((state)=> state?.user?.allOrders);
    return (
        <>
        <div>
        <Row>
            <Col xl={1} lg={1} md={1} sm={12} xs={12} >
            <SideNav />
            </Col>
            <Col xl={11} lg={11} md={11} sm={12} xs={12}>
           <Container className='p-4'>
               <div className='px-4 py-3 bg-danger bg-opacity-10 text-white w-25 d-flex justify-content-start align-items-center' style={{borderRadius:"5px"}}>
                    <p className='fs-4' style={{marginBottom:'0px'}}>Hello, {auth.firstName || auth.username}</p>
               </div>
               {decoded.isAdmin === true && 
               (<><Row className='py-3 text-white' >
                   <Col xl={2} lg={2} md={2} sm={12} xs={12} onClick={() => {setIsRestaurant(true); setIsRider(false); setIsUser(false); setIsOrder(false);}} className='bg-success p-2 m-2 d-flex flex-column justify-content-center align-items-center' style={{borderRadius:"5px", cursor:'pointer' , boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
                   <BiRestaurant className='fs-1 text-white'/>
                   <p style={{marginBottom:"0px"}}>{restaurants?.length}</p>
                   <p className=''>Restaurants</p>
                   </Col>
                   <Col xl={2} lg={2} md={2} sm={12} xs={12} onClick={() => {setIsRestaurant(false); setIsRider(false); setIsUser(true); setIsOrder(false);}} className='bg-primary p-2 m-2 d-flex flex-column justify-content-center align-items-center' style={{borderRadius:"5px", cursor:'pointer' , boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
                   <FiUsers className='fs-1 text-white'/>
                   <p style={{marginBottom:"0px"}}>{users.length}</p>
                   <p className=''>Users</p>
                   </Col>
                   <Col xl={2} lg={2} md={2} sm={12} xs={12} className='bg-secondary p-2 m-2 d-flex flex-column justify-content-center align-items-center' style={{borderRadius:"5px" , boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
                   <GiCash className='fs-1 text-white'/>
                   <p style={{marginBottom:"0px"}}>PKR 0</p>
                   <p className=''>Sales</p>
                   </Col>
                   <Col xl={2} lg={2} md={2} sm={12} xs={12} onClick={() => {setIsRestaurant(false); setIsRider(false); setIsUser(false); setIsOrder(true);}} className='bg-info p-2 m-2 d-flex flex-column justify-content-center align-items-center' style={{borderRadius:"5px", cursor:'pointer' , boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
                   <GiNotebook className='fs-2 text-white' style={{}}/>
                   <p style={{marginBottom:"0px"}}>{orders?.length}</p>
                   <p className=''>Orders</p>
                   </Col>
                   <Col xl={2} lg={2} md={2} sm={12} xs={12} onClick={() => {setIsRestaurant(false); setIsRider(true); setIsUser(false); setIsOrder(false);}} className='bg-warning p-2 m-2 d-flex flex-column justify-content-center align-items-center' style={{borderRadius:"5px", cursor:'pointer' , boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
                   <GiFullMotorcycleHelmet className='fs-2 text-white' style={{}}/>
                   <p style={{marginBottom:"0px"}}> {riders?.length}</p>
                   <p className=''>Riders</p>
                   </Col>
               </Row>
               <Row>
                   {isUser && (
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
                   )}
                   {isRestaurant && (
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
                               {u?.name}
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
                               {u.products?.length}
                           </td>
                       </tr>
                       )}
                    </tbody>
                    </Table>
                   </Col>
                   )}
               </Row>
               {isOrder && (
                   <Col>
                   <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Products</th>
                        <th>User</th>
                        <th>Restaurant</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                       {orders.map((u, index)=> 
                       <tr>
                           <td>
                                {index}
                           </td>
                           <td>
                               {u?.products?.map((p, index)=> <div key={index}><Image src={p.image} style={{width:'40px', height:'auto'}} /> {p.name}<span className='mx-2'><b>{p.price}</b></span> {index < p.length && <span> , </span>}</div> )}
                           </td>
                           <td>
                               {u.user_id}
                           </td>
                           <td>
                               {u.restaurant_id}
                           </td>
                           <td className={`${u.status === 'pending' ? 'text-warning' : 'text-success'}`}>
                               {u.status}
                           </td>
                           <td>
                               {u.date}
                           </td>
                           <td>
                               {u.time}
                           </td>
                       </tr>
                       )}
                    </tbody>
                    </Table>
                   </Col>
                   )}
               {isRider && (
               <Row>
                   <Col>
                   <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                       {riders.map((u, index)=> 
                       <tr>
                           <td>
                                {index}
                           </td>
                           <td>
                               {u.name}
                           </td>
                           <td>
                               {u.username}
                           </td>
                           <td>
                               {u.email}
                           </td>
                           <td>
                               {u.phone}
                           </td>
                       </tr>
                       )}
                    </tbody>
                    </Table>
                   </Col>
                   </Row>
               )}
               </>)
               }
               {decoded.isUser == true && (
                <Row className='py-5'>
                    <h3>Orders</h3>
                    <Col>
                   <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Products</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                       {allOrders[0]?.map((u, index)=> 
                       
                       <tr>
                           <td>
                                {index}
                           </td>
                               <td>
                               {u.products?.map((p, index)=> 
                               <div><Image src={p.image} className='' style={{width:'50px', height:'auto'}} /> {p.name} <span className='fw-bold'>{p.price}</span> <span>, </span></div> )}
                           </td>
                           <td>
                               {u.total_price}
                           </td>
                           <td>
                               {u.status}
                           </td>
                           <td>
                               {u.date}
                           </td>
                           <td>
                               {u.time}
                           </td>
                       </tr>
                       )}
                    </tbody>
                    </Table>
                   </Col>
                </Row>
               )}
           </Container>
           </Col>
        </Row>
           </div>
        </>
    )
}

export default Account

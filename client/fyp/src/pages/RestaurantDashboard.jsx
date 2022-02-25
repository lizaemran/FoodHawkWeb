import React, {useState,useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getRestaurantDashboardAsync, logoutUser} from '../redux/auth';
import { useLocation } from 'react-router-dom';
import { Col, Container, Image, Row, Table } from 'react-bootstrap';
import {AiOutlineLogout} from 'react-icons/ai';
import FormPopUp from '../components/FormPopUp';
import UpdateStatus from '../components/UpdateStatus';
import AddProduct from '../components/AddProduct';
const RestaurantDashboard = () => {
    const dispatch = useDispatch();
    const [isEditStatus, setIsEditStatus] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const d = new Date();
    const month = d.toLocaleString('default', { month: 'long' });
    const date = d.getDate() + " " + month + ", " + d.getFullYear();
    const time = d.getHours() + 'h ' + d.getMinutes() + 'm ' + d.getSeconds() + 's';
    var location = useLocation();
    location = location.pathname;
    const username = location.split('/')[3];
    const status = useSelector((state) => state?.auth?.status);
    useEffect(()=> {
        dispatch(getRestaurantDashboardAsync(username))
    }, []) //have to re-render on status change
    const logOut = (e) => {
        e.preventDefault();
        dispatch(logoutUser());
    }
    const name = useSelector((state) => state?.auth?.name);
    const img = useSelector((state) => state?.auth?.image);
    const products = useSelector((state) => state?.auth?.products);
    const r_id = useSelector((state) => state?.auth?.id);
    const orders = useSelector((state) => state?.auth?.orders);

    return (
        <div className='dashboard__bg' >
            <section>
                <Container  className='p-3'>
                    <Row className='' style={{backgroundColor:'rgba(255, 255, 255, 0.5)', borderRadius:'20px', backdropFilter:'2px'}}>
                        <Col className='d-flex flex-column p-3 text-white'>
                            <p className='fs-5'>Hello, {name}</p>
                            <p>{date}</p>
                            <p>{time}</p>
                            <p>You are currently <span className='fw-bold' style={{color: status ? '#37d339' : 'red'}}>{status ? 'Active' : 'Inactive'}</span> <span className='' onClick={() => setIsEditStatus(true)} style={{fontSize:'11px', cursor:'pointer', color:'#2121d1'}}><u>Change</u></span></p>
                        </Col>
                        <Col className='d-flex justify-content-center align-items-center'>
                        <Image src={img} className='w-25 h-auto'/>
                        </Col>
                        <Col className='d-flex justify-content-end align-items-center p-3' >
                            <AiOutlineLogout className='fs-3 bg-light p-1' onClick={logOut} style={{borderRadius:'50%', cursor:'pointer'}}/>
                        </Col>
                    </Row>
                </Container>
                {isEditStatus && <FormPopUp title="Update Status" setIsOpen={setIsEditStatus}><UpdateStatus rId={r_id} status={status}/></FormPopUp>}

            </section>


            <section>
                <Container className='p-3'>
                    <Row className='text-white' style={{backgroundColor:'rgba(255, 255, 255, 0.5)', borderRadius:'20px', backdropFilter:'2px'}}>
                        <Col>
                            <p className='pt-3'>Products : <span className='fw-bold'>{products?.length}</span></p>
                        </Col>
                        <Col className='d-flex justify-content-end align-items-center p-3'>
                        <p className='py-1 px-2 text-white rounded-3' onClick={() => setIsAdd(true)} style={{backgroundColor:'#ef5023', marginBottom:'0px', cursor:'pointer'}} >Add Product</p>
                        </Col>
                        <Row>
                        <Table striped bordered hover responsive>
                    <thead className='text-white' >
                        <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                       {products?.map((u, index)=> 
                       <tr className='text-white'>
                           <td>
                               {index+1}
                           </td>
                           <td>
                                <Image src={u?.image} className='w-25 h-auto'/>
                           </td>
                           <td className=''>
                               {u?.name}
                           </td>
                           <td className=''>
                               {u?.price}
                           </td>
                           <td className=''>
                               {u?.discount}
                           </td>
                           <td className=''>
                               {u?.category}
                           </td>
                       </tr>
                       )}
                    </tbody>
                    </Table>
                        </Row>

                    </Row>
                </Container>
                {isAdd && <FormPopUp title="Add Product" setIsOpen={setIsAdd}><AddProduct rId={r_id}/></FormPopUp> }

            </section>

            <section>
                <Container className='p-3'>
                    <Row className='text-white p-2' style={{backgroundColor:'rgba(255, 255, 255, 0.5)', borderRadius:'20px', backdropFilter:'2px'}}>
                        Total Sales: PKR 0
                    </Row>
                </Container>
            </section>

            <section>
                <Container className='p-3'>
                    <Row className='text-white p-2' style={{backgroundColor:'rgba(255, 255, 255, 0.5)', borderRadius:'20px', backdropFilter:'2px'}}>
                        Orders: {orders?.map((u, index)=> 
                        <div className='' style={{width:'fit-content'}}>
                         {u} <span> , </span>
                        </div>
                        )}
                    </Row>
                </Container>
            </section>
            
        </div>
    )
}
export default RestaurantDashboard
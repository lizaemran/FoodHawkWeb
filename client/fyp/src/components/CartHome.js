import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteCart } from '../redux/CartSlice';
import {MdOutlineLocationOn} from 'react-icons/md'
const CartHome = () => {
    const firstname = useSelector((state) => state.auth.firstname);
    const cartItems = useSelector((state)=> state.cart.cartItems);
    const dispatch = useDispatch();
    const handleDeleted = (cId) => {
		dispatch(deleteCart({ 
            id:cId,

         }));
	};
    return (
        <Container >
            <Row className='py-4'>
                <h5 className='fw-bold text-capitalize'>{firstname}</h5>
                <h5>Cart Summary</h5>
                <Col className='py-4'>
                {cartItems !== undefined && cartItems.map((c) => 
                            <div className="cart-menu">
                                <img src={c.image} className='w-25' alt="cart-image" style={{objectFit:"cover"}}/>
                                <p className='fs-6'>{c.name}</p>
                                <p className='fs-6'>x{c.countItems}</p>
                                <p className='fs-6 px-1 fw-bold'>{c.price}</p>
                                <span onClick={()=> handleDeleted(c.id) } style={{color:"#ef5023"}}><i className="fas fa-times"></i></span>
                            </div>
                        )
                }
                
                </Col>
                <div>
                    Your Delivery Address
                    <p><MdOutlineLocationOn className='fs-5' style={{color:"#ef5023"}}/>House no...</p>
                </div>
                <Link to='/Cart'><Button className='m-4' style={{background:"#ef5023", border:"none", outline:"none"}}>Go To Cart</Button></Link>
            </Row>
        </Container>
    )
}

export default CartHome

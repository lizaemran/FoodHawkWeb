import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteCart } from '../redux/CartSlice';
import {MdOutlineLocationOn} from 'react-icons/md'
const CartHome = () => {
    const firstname = useSelector((state) => state.auth.firstname);
    const address = useSelector((state) => state.auth.address)
    const cartItems = useSelector((state)=> state.cart.cartItems);
    const dispatch = useDispatch();
    const handleDeleted = (cId) => {
		dispatch(deleteCart({ 
            id:cId,

         }));
	};
    return (
        <div >
            <Row className='py-5'>
                <h5 className='fw-bold text-capitalize'>{firstname}</h5>
                <h6>Cart Summary</h6>
                <Col className='py-5' style={{paddingLeft:'0px'}}>
                {cartItems !== undefined && cartItems.map((c) => 
                            <div className="cart-menu">
                                <img src={c.image} className='w-10 h-auto' alt="cart-image" style={{objectFit:"cover"}}/>
                                <p className='fs-6 my-auto'>{c.name}</p>
                                <p className='fs-6 my-auto'>x{c.countItems}</p>
                                <p className='fs-6 px-1 fw-bold my-auto'>{c.price}</p>
                                <span onClick={()=> handleDeleted(c.id) } style={{color:"#ef5023"}}><i className="fas fa-times"></i></span>
                            </div>
                        )
                }
                
                </Col>
                <hr />
                <div>
                    Your Delivery Address
                    <p><MdOutlineLocationOn className='fs-5' style={{color:"#ef5023"}}/>{address}</p>
                </div>
                <Link to='/Cart'><Button className='m-4' style={{background:"#ef5023", border:"none", outline:"none"}}>Go To Cart</Button></Link>
            </Row>
        </div>
    )
}

export default CartHome

import React, {useState, useEffect} from 'react'
import CartCard from '../components/CartCard';
import { useSelector, useDispatch } from 'react-redux';
import {setCart} from '../redux/CartSlice';
import { Col, Container, Row } from 'react-bootstrap';
import {MdOutlineLocationOn} from 'react-icons/md'
import SideNav from '../components/SideNav/SideNav';
const Cart = () => {
    const dispatch = useDispatch();
    const {cartItems, total} = useSelector((state)=> state.cart);
    const cart = useSelector((state)=> state.cart);
    const [sum, setSum] = useState(0);
    const address = useSelector((state) => state.auth.address)
    const getTotal = () => {
        let t = cartItems.reduce((a,c)=> 
         a += c.price*c.countItems, 0
        )
        setSum(t);
    };

    useEffect(() => {
        getTotal();
    }, [cartItems]);
    useEffect(() => {
        if(cartItems.length >= 0){
           localStorage.setItem("cart",JSON.stringify(cart));
       }
   }, [cartItems])
    useEffect(() => {
        if(localStorage.getItem("cart")){
            dispatch(setCart(
                JSON.parse(localStorage.getItem("cart")),
            ))
        }

    
    }, []);
  
    return (
        <div>
            <Row>
                <Col xl={1} lg={1} md={1} sm={12} xs={12} >
                <SideNav />
                </Col>
                <Col>
                <Container>
                <h5 className="text-center p-5">Cart</h5>
            <div className="row align-items-center text-center h-100">
                    <div className="col image">

                    </div>
                    <div className="col name">
                        <h5>Product</h5>
                    </div>
                    <div className="col">
                        <h5>Quantity</h5>
                    </div>
                    <div className="col">
                        <h5>Discount</h5>
                    </div>
                    <div className="col">
                        <h5>Total</h5>
                    </div>
                <hr />
            {cartItems.map((c)=>
            <CartCard 
            id={c.id}
            name={c.name} 
            price={c.price} 
            image={c.image} 
            discount={c.discount}
            quantity={c.countItems}
            
            />
            )}
            </div>
            <div className="d-flex justify-content-end align-items-center">
                <h5 className="" style={{marginRight:'10px'}}>Total Amount: </h5>
                <h5 id="total-style-h5" className="fw-bold"> {` PKR ${sum}`} </h5>
            </div>
                <div className="d-flex justify-content-end align-items-center py-3">
                    Your Delivery Address: 
                    <p style={{marginBottom:'0px'}}><MdOutlineLocationOn className='fs-5 ' style={{color:"#ef5023"}}/>{address}</p>
                </div>
            <div id="checkout">
            <button id="checkout-btn" className="mr-30 cart-style">CHECKOUT</button>
            </div>
                </Container>
                </Col>
            </Row>

        </div>
    )
}

export default Cart

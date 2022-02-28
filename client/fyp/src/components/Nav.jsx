import React, {useState, useEffect} from 'react';
import '../styles/nav.css';
import {deleteCart} from '../redux/CartSlice';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import jwt_decode from "jwt-decode";
import {FaUserCircle} from 'react-icons/fa';
const Nav = ({setSearch, search}) => {
    const dispatch = useDispatch();
    const {cartItems,total } = useSelector((state)=> state.cart);
    const products = useSelector((state)=> state.products);
    const [isCart, setIsCart] = useState(false);
    const token = useSelector((state)=> state.auth.token);
    const firstName = useSelector((state) => state.auth.username);
    const [cart, setCart] = useState([]);
    useEffect(()=> {
         setCart(cartItems.map((cI)=> ( {item: products.filter((p) => cI.id === p._id), count: cI.countItems})));
    },[cartItems])
    const handleDeleted = (cId) => {
		dispatch(deleteCart({ 
            id:cId,

         }));
	};
   
    const d = new Date();
    const month = d.toLocaleString('default', { month: 'long' });
    const date = d.getDate() + " " + month + ", " + d.getFullYear();
    var decoded = jwt_decode(token);
    return (
        <>
        <div className="center">
            <input className='' 
            type="text" 
            placeholder="Search for restaurants" 
            value={search}
            onChange={(e)=> {
                setSearch(e.target.value||"");
            }}/>
         <div className='d-flex'>

            <p className='nav-date fs-6'>{date}</p>

            {decoded.isUser === true && <>
            <div onMouseLeave={()=> setIsCart(false)} >
            <div onMouseEnter={()=> setIsCart(true)}  className = {isCart ?  `cart-icon-activate  cart-icon`: `cart-icon`}><i className="fas fa-shopping-basket fs-2"></i>
                <div className="cart-number"><p>{total}</p></div>
                
            </div>
            
            {isCart &&
                    <div className="cart-drop-menu">
                        {total === 0? <h1 style={{fontSize: "1.25rem"}}>Cart is empty</h1> :
                        cartItems !== undefined && cartItems.map((c) => 
                            <div className="cart-menu">
                                <img src={c.image} style={{marginRight:'5px'}} alt="cart-image"/>
                                <h6 style={{marginRight:'5px'}}>{c.name}</h6>
                                <h6 style={{marginRight:'5px'}}>x{c.countItems}</h6>
                                <h6 style={{marginRight:'5px'}}>{c.price}</h6>
                                <span onClick={()=> handleDeleted(c.id)} ><i className="fas fa-times"></i></span>
                            </div>
                        )
                    }
                        {total!==0 && 
                        <Link to="/Cart">
                            <button className='py-2' style={{fontSize:'12px', borderRadius:'5px'}}>
                            View Cart
                            </button>
                            </Link>}
                       
                    </div>}
                   
                    </div>
                    
                    
                    <div className='nav-date fs-5' style={{marginLeft:'10px', marginTop:'4vh'}}>
                        <FaUserCircle className='fs-3' /> {firstName}
                    </div>
                    </>
                    }
                    </div>
        </div>
        
        </>
    )
}


export default Nav

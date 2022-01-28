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

            <p className='nav-date fs-5'>{date}</p>

            {decoded.isUser === true && 
            <div onMouseLeave={()=> setIsCart(false)} >
            <div onMouseEnter={()=> setIsCart(true)}  className = {isCart ?  `cart-icon-activate  cart-icon`: `cart-icon`}><i className="fas fa-shopping-basket"></i>
                <div className="cart-number"><p>{total}</p></div>
                
            </div>
            
            {isCart &&
                    <div className="cart-drop-menu">
                        {total === 0? <h1 style={{fontSize: "1.25rem"}}>Cart is empty</h1> :
                        cartItems !== undefined && cartItems.map((c) => 
                            <div className="cart-menu">
                                <img src={c.image} alt="cart-image"/>
                                <h4>{c.name}</h4>
                                <h4>x{c.countItems}</h4>
                                <h4>{c.price}</h4>
                                <span onClick={()=> handleDeleted(c.id)} ><i className="fas fa-times"></i></span>
                            </div>
                        )
                    }
                        {total!==0 && <Link to="/Cart"><button>View Cart</button></Link>}
                       
                    </div>}
                   
                    </div>
                    
                    }
                    <div className='nav-date fs-5' style={{marginLeft:'10px'}}>
                        <FaUserCircle className='fs-3' /> {firstName}
                    </div>
                    </div>
        </div>
        
        </>
    )
}


export default Nav

import React, {useState, useEffect} from 'react';
import '../styles/nav.css';
import {deleteCart} from '../redux/CartSlice';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
const Nav = ({setSearch, search}) => {
    const dispatch = useDispatch();
    const {cartItems,total } = useSelector((state)=> state.cart);
    const products = useSelector((state)=> state.products);
    const [isCart, setIsCart] = useState(false);
    const [cart, setCart] = useState([]);
    useEffect(()=> {
         setCart(cartItems.map((cI)=> ( {item: products.filter((p) => cI.id === p._id), count: cI.countItems})));
    },[cartItems])
    const handleDeleted = (cId) => {
		dispatch(deleteCart({ 
            id:cId,

         }));
	};
    return (
        <>
        <div className="center">
            <input className='searchinput' 
            type="text" 
            placeholder="Search ..." 
            value={search}
            onChange={(e)=> {
                setSearch(e.target.value||"");
            }}/>
            <div onMouseLeave={()=> setIsCart(false)} >
            <div onMouseEnter={()=> setIsCart(true)}  className = {isCart ?  `cart-icon-activate  cart-icon`: `cart-icon`}><i className="fas fa-shopping-basket"></i>
                <div className="cart-number"><p>{total}</p></div>
                
            </div>
            {isCart && 
                    <div className="cart-drop-menu">
                        {total === 0? <h1 style={{fontSize: "1.25rem"}}>No Products In Cart Yet</h1> :
                        cartItems !== undefined && cartItems.map((c) => 
                            <div className="cart-menu">
                                <img src={c.image} alt="cart-image"/>
                                <h1>{c.name}</h1>
                                <h1>x{c.countItems}</h1>
                                <h1>{c.price}</h1>
                                <span onClick={()=> handleDeleted(c.id)} ><i className="fas fa-times"></i></span>
                            </div>
                        )
                    }
                        {total!==0 && <Link to="/Cart"><button>View Cart</button></Link>}
                       
                    </div>}
                    </div>
        </div>
        
        </>
    )
}


export default Nav

import React, {useEffect} from 'react';
import '../styles/nav.css';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
const Nav = ({setSearch, search}) => {
    const {total } = useSelector((state)=> state.cart);
    // useEffect(()=> {
    //     console.log(total);
    // },[])
    return (
        <>
        <div className="center">
            <input 
            type="text" 
            placeholder="Search ..." 
            value={search}
            onChange={(e)=> {
                setSearch(e.target.value||"");
            }}/>
            <div className = "cart-icon"><Link to='/Cart'><i className="fas fa-shopping-basket"></i></Link>
                <div className="cart-number"><p>{total}</p></div>
            </div>
        </div>
        
        </>
    )
}


export default Nav

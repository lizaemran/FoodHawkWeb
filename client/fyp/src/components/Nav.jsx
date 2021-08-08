import React, {useEffect} from 'react';
import '../styles/nav.css';
import {useSelector} from 'react-redux';

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
            <div className = "cart-icon"><i className="fas fa-shopping-basket"></i>
                <div className="cart-number"><p>{total}</p></div>
            </div>
        </div>
        
        </>
    )
}


export default Nav

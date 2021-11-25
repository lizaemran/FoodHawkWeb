import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { incrementProduct, decrementProduct } from '../redux/CartSlice';
const CartCard = ({ id, name,  price, image, discount, quantity}) => {
    const [quan, setQuan] = useState(quantity);
    const dispatch = useDispatch();
    return (
        <>
            <div className="row align-items-center text-center h-100">
                    <div className="col ">
                        <img className="c-image mb-3"src={image} alt="cart-image"/>
                    </div>
                    <div className="col name">
                        <h1 className=" cart-style">{name}</h1>
                    </div>
                    <div className="col d-flex justify-content-center text-align-center">
                        <div id="quantity-style-div" >
                            <button id="q-button-1"  disabled={quan === 1} onClick={()=> {setQuan(quan-1);dispatch(decrementProduct({id}))}}><i className="fas fa-minus"></i></button>
                            <input id="quantity-stylee-input" className=" cart-style" type="text" onChange={(e)=> setQuan(e.target.value)} value={quan} />
                            <button id="q-button-2"  onClick={()=> {setQuan(quan+1); dispatch(incrementProduct({id}))}}><i className="fas fa-plus"></i></button>
                        </div>
                    </div>
                    <div className="col">
                        <h1 className=" cart-style">{discount}</h1>
                    </div>
                    <div className="col">
                        <h1 className="justify-content-right cart-style">{`PKR ${price*quantity}`}</h1>
                    </div>
                <hr />
            </div>

            </>
    )
}

export default CartCard

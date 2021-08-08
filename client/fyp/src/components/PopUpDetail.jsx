import React from 'react';
import {deleteProductAsync} from '../redux/ProductSlice';
import {useDispatch} from 'react-redux';
import {addCart} from '../redux/CartSlice';
const PopUpDetail = ({id, image, name, price, discount, category, setPId, setIsEditP}) => {
    const dispatch = useDispatch();
    const handleDeletedClick = () => {
		dispatch(deleteProductAsync({ id:id }));
	};
    const AddtoCart = () => {
        dispatch(addCart({
            id: id,
            countItems: "1",
        }))
    };
    return (
<>
            <div onClick={()=> setPId(id)} className="row r-card p-card">
                <div className="col-2">
                    <img className="p-image" src={image} alt="restaurant"/>
                </div>
                <div className="col-10">
                <div className="admin-button">
                <a onClick={()=> {setIsEditP(true)}}>Edit</a>
                </div>
                    <h1>{name}</h1>
                    <button id="btn" onClick={AddtoCart}>ADD TO CART</button>
                    <div id="rating">
                      <p className="price">${price}</p>
                    </div>
                    <div id="close" onClick={handleDeletedClick}><i class="fas fa-times"></i></div>
                    <p class="description">
                    Description: Lopem ispum lotez.<br />
                    Discount: {discount}<br />
                    Category: {category}
                    </p>
                    
                </div>
 
            </div>
</>           
    )
   
}

export default PopUpDetail

import React from 'react';
import {deleteProductAsync} from '../redux/ProductSlice';
import {useSelector, useDispatch} from 'react-redux';
import {addCart} from '../redux/CartSlice';
const PopUpDetail = ({id, image, name, price, discount, category, setPId, setIsEditP}) => {
    const {cartItems, total} = useSelector((state)=> state.cart);
    const restaurants = useSelector((state)=> state.restaurants);
    const dispatch = useDispatch();
    let rId = 0;
    let newrId = 0;
    const handleDeletedClick = () => {
		dispatch(deleteProductAsync({ id:id }));
	};
    const AddtoCart = () => {
        if(total > 0){
            rId = restaurants.filter((r)=> 
            r.products.filter((p)=> p === cartItems[0].id).length > 0 );
            console.log("Restaurant",rId[0]._id);
            newrId = restaurants.filter((r)=> 
            r.products.filter((p)=> p === id).length > 0 );
            if(rId[0]._id === newrId[0]._id){
                dispatch(addCart({
                    id: id,
                    countItems: 1,
                    restaurant: newrId._id,
                }))
            }
            else{
                alert("Select Product from One Restaurant.");
            }
        }
        else{
        newrId = restaurants.filter((r)=> 
        r.products.filter((p)=> p === id).length > 0 );
        dispatch(addCart({
            id: id,
            countItems: 1,
            restaurant: newrId._id,
        }))

        console.log("New",newrId[0]._id);
        }
 
      
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

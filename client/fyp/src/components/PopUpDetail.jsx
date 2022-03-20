import React from 'react';
import {deleteProductAsync} from '../redux/ProductSlice';
import {useSelector, useDispatch} from 'react-redux';
import {addCart} from '../redux/CartSlice';
import jwt_decode from "jwt-decode";

const PopUpDetail = ({id, image, name, price, description, discount, category, r_id, setPId, setIsEditP}) => {
    const {cartItems, total} = useSelector((state)=> state.cart);
    const restaurants = useSelector((state)=> state.restaurants.restaurants);
    const token = useSelector((state)=> state.auth.token);
    var decoded = jwt_decode(token);
    const dispatch = useDispatch();
    let rId = 0;
    let newrId = 0;
    const userType = useSelector((state)=> state.auth?.user_type);
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
                console.log(r_id);
                dispatch(addCart({
                    id: id,
                    restaurant_id: r_id,
                    countItems: 1,
                    name: name,
                    price: price,
                    image: image,
                    description: description,
                    discount: discount,
                    category: category,
                    
                }))
            }
            else{
                alert("Select Product from One Restaurant.");
            }
        }
        else{
        newrId = restaurants?.filter((r)=> 
        r.products?.filter((p)=> p._id === id).length > 0 );
        console.log(r_id);
        dispatch(addCart({
            id: id,
            restaurant_id: newrId[0]?._id,
            countItems: 1,
            name: name,
            price: price,
            image: image,
            description: description,
            discount: discount,
            category: category,
            restaurant: newrId._id,
        }))

        console.log("New",newrId[0]?._id);
        }
 
      
    };
    return (
<>
            <div onClick={()=> setPId(id)} className="row r-card p-card">
                <div className="col-2">
                    <img className="p-image" style={{marginLeft:'50px'}} src={image} alt="restaurant"/>
                </div>
                <div className="col-10">
                {userType === 'admin' && <div className="admin-button">
                <a onClick={()=> {setIsEditP(true)}}>Edit</a>
                </div>}
                    <h1>{name}</h1>
                    {decoded.isUser === true  && 
                     <button id="btn" onClick={AddtoCart}>ADD TO CART</button>
                    }
                    <div id="rating">
                      <p className="price">PKR{price}</p>
                    </div>
                    {userType === 'admin' && <div id="close" onClick={handleDeletedClick}><i className="fas fa-times"></i></div>}
                    <p className="description">
                    {description && (<><span>Description: {description || ''}</span><br /></>)}
                    Discount: {discount}<br />
                    Category: {category}
                    </p>
                    
                </div>
 
            </div>
</>           
    )
   
}

export default PopUpDetail

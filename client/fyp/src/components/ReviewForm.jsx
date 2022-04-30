import React, {useState, useEffect} from 'react';
import { Button, Form } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import { addRatingAsync } from '../redux/Slice';
import { useSelector, useDispatch } from 'react-redux';
import {useLocation } from 'react-router-dom';
import { addOrderRatingAsync } from '../redux/user';
const ReviewForm = ({setModalShow, orderToReview}) => {
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState('');
    const r_id = useSelector((state) => state.restaurants.restaurant?._id);
    const u_id = useSelector((state) => state.auth?.id);
    var location = useLocation()
    location = location.pathname;
    location = location.split('/')[1];
    const changeRating =( newRating ) => {
        setRating(newRating);
    }
    const dispatch = useDispatch();
    const addReview = () => {
      
        if(location === 'dashboard'){
            dispatch(addOrderRatingAsync({
                r_id: orderToReview?.restaurant_id,
                u_id: orderToReview?.user_id,
                o_id: orderToReview?._id,
                stars: rating,
                description: description,
            }))
            
        }
        else{
            dispatch(addRatingAsync({
                r_id: r_id,
                u_id: u_id,
                stars: rating,
                description: description,
            }))
        }
        setModalShow(false);
    }
    return (
        <div>
              {location === 'dashboard' && <>
                {orderToReview?.products.map((p)=>
                    <div key={p._id} className='d-flex justify-content-between align-items-center bg-light rounded-3 shadow-sm px-2 my-2'>
                        <span className='d-flex align-items-center p-2'><img src={p.image} alt="order-image" style={{width:'50px', height:'auto'}}/>
                        <p style={{marginBottom: '0px', marginLeft:'15px'}}>{p.name}</p></span>
                        <p style={{marginBottom: '0px'}}>Rs. {p.price}</p>
                        
                        </div>
                    )}
                    <p style={{marginBottom: '0px'}}>Time: {orderToReview?.time}</p>
                    <p style={{marginBottom: '0px'}}>Date: {orderToReview?.date}</p>
                    <p style={{marginBottom: '0px'}}>Delivery Charges: Rs. 60</p>
                    <p style={{marginBottom: '0px'}}>Rs. {orderToReview?.total_price}</p>
              </>}
              <div className='d-flex justify-content-center align-items-center mb-3'>
                <StarRatings
                rating={rating}
                starRatedColor="yellow"
                changeRating={changeRating}
                numberOfStars={5}
                name='rating'
                starDimension='40px'
                starSpacing='3px'
                style={{border:'1px solid #e5e5e5'}}
              />
              </div>
              <p>
                <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} as="textarea" rows={3} type='text' placeholder='Good...' className='book-form mt-2' />
              </p>
              <Button onClick={addReview} style={{backgroundColor:'#ef5023', border:'none'}}>Add</Button>
        </div>
    )
}
export default ReviewForm;

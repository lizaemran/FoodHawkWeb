import React, {useState, useEffect} from 'react';
import { Button, Form } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import { addRatingAsync } from '../redux/Slice';
import { useSelector, useDispatch } from 'react-redux';
const ReviewForm = ({setModalShow}) => {
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState('');
    const r_id = useSelector((state) => state.restaurants.restaurant?._id);
    const u_id = useSelector((state) => state.auth?.id);
    const changeRating =( newRating ) => {
        setRating(newRating);
    }
    const dispatch = useDispatch();
    const addReview = () => {
        setModalShow(false);
        dispatch(addRatingAsync({
            r_id: r_id,
            u_id: u_id,
            stars: rating,
            description: description,
        }))
    }
    return (
        <div>
            <StarRatings
                rating={rating}
                starRatedColor="yellow"
                changeRating={changeRating}
                numberOfStars={5}
                name='rating'
                starDimension='30px'
                starSpacing='3px'
              />
              <p>
                <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} as="textarea" rows={3} type='text' placeholder='Good...' className='book-form mt-2' />
              </p>
              <Button onClick={addReview} style={{backgroundColor:'#ef5023', border:'none'}}>Add</Button>
        </div>
    )
}
export default ReviewForm;

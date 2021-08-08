import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { updateRestaurantsAsync } from '../redux/Slice';

const UpdateRestaurant = ({rId}) => {
	const restaurants = useSelector((state)=> state.restaurants);
	const [nameValue, setNameValue] = useState('');
    const [imageValue, setImageValue] = useState('');
    const [locationValue, setLocationValue] = useState('');
    const [ratingValue, setRatingValue] = useState('');
	let restaurant = {}
	useEffect(()=>{
		restaurant = restaurants.filter((r) => r._id == rId);
		restaurant = restaurant[0];
		setNameValue(restaurant.name);
		setImageValue(restaurant.image);
		setLocationValue(restaurant.location);
		setRatingValue(restaurant.rating);
	},[restaurants]);

	const dispatch = useDispatch();
	const onSubmit = (event) => {
		event.preventDefault();
		dispatch(updateRestaurantsAsync({
			id: rId,
            name: nameValue,
            image: imageValue,
            location: locationValue,
            rating: ratingValue,
		}));
		setNameValue("");
        setImageValue("");
        setLocationValue("");
        setRatingValue("");
	};

	return (
<>		
		<div className="form-image">
			<img src={imageValue} alt="restaurant-image"/>
		</div>
		<form onClick={(e) => {e.stopPropagation()}} onSubmit={onSubmit} className='form-inline mt-3 mb-3'>
			
			<label className='sr-only'>Name</label>
			<input
				type='text'
				className='form-control mb-2 mr-sm-2'
				placeholder='Add Name...'
				value={nameValue}
				onChange={(event) => setNameValue(event.target.value)}
			></input>
            <label className='sr-only'>Image</label>
			<input
				type='text'
				className='form-control mb-2 mr-sm-2'
				placeholder='Add Image...'
				value={imageValue}
				onChange={(event) => setImageValue(event.target.value)}
			></input>
            <label className='sr-only'>Location</label>
			<input
				type='text'
				className='form-control mb-2 mr-sm-2'
				placeholder='Add location...'
				value={locationValue}
				onChange={(event) => setLocationValue(event.target.value)}
			></input>
            <label className='sr-only'>Rating</label>
			<input
				type='text'
				className='form-control mb-2 mr-sm-2'
				placeholder='Add rating...'
				value={ratingValue}
				onChange={(event) => setRatingValue(event.target.value)}
			></input>

			<button id="btn-submit" type='submit' className='btn btn-primary mb-2'>
				Submit
			</button>
            <br />
		</form>
        </>
	);
};

export default UpdateRestaurant;

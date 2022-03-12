import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { updateRestaurantsAsync } from '../redux/Slice';
import * as yup from 'yup';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UpdateRestaurant = ({rId}) => {
	const restaurants = useSelector((state)=> state.restaurants.restaurants);
	const [nameValue, setNameValue] = useState('');
    const [imageValue, setImageValue] = useState('');
    const [locationValue, setLocationValue] = useState('');
    const [ratingValue, setRatingValue] = useState('');
	let schemaUpdateRestaurant= yup.object().shape({
        name: yup.string().required('Please enter name').matches(/^[a-zA-Z]+$/, 'Only letters allowed. '),
        image: yup.string().required('Please enter imgbb Link'),
		location: yup.string().required('Please enter location'),
		rating: yup.string().required('Please enter rating'),
      });
	let restaurant = {}
	useEffect(()=>{
		restaurant = restaurants?.filter((r) => r._id === rId);
		restaurant = restaurant[0];
		setNameValue(restaurant.name);
		setImageValue(restaurant.image);
		setLocationValue(restaurant.location);
		setRatingValue(restaurant.rating);
	},[restaurants]);

	const dispatch = useDispatch();
	const onSubmit = (event) => {
		event.preventDefault();
		schemaUpdateRestaurant
		.validate({ name: nameValue, image: imageValue, location: locationValue, rating: ratingValue, })
		.then(function (valid) {
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
		}).catch((e) => {
			toast.error(e.errors[0].toString());
		});
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

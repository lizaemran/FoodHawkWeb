import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { addRestaurantsAsync } from '../redux/Slice';

const AddRestaurant = () => {
	const [nameValue, setNameValue] = useState('');
    const [imageValue, setImageValue] = useState('');
    const [locationValue, setLocationValue] = useState('');
    const [ratingValue, setRatingValue] = useState('');
	const dispatch = useDispatch();
	const onSubmit = (event) => {
		event.preventDefault();
		dispatch(addRestaurantsAsync({
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

export default AddRestaurant;

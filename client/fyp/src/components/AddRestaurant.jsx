import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { addRestaurantsAsync, addRestaurantsByAdminAsync } from '../redux/Slice';
import jwt_decode from "jwt-decode";
const AddRestaurant = () => {
	const [nameValue, setNameValue] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
    const [imageValue, setImageValue] = useState('');
    const [locationValue, setLocationValue] = useState('');
    const [ratingValue, setRatingValue] = useState('');
	const token = useSelector((state)=> state.auth.token);
	var decoded = jwt_decode(token);
	const dispatch = useDispatch();
	const onSubmit = (event) => {
		event.preventDefault();
		dispatch(addRestaurantsByAdminAsync({
			username: username,
			password: password,
			phone: phone,
			email: email,
            name: nameValue,
            image: imageValue,
            location: locationValue,
            rating: ratingValue,
		}));
		setUsername("");
		setPassword("");
		setEmail("");
		setPhone("");
		setNameValue("");
        setImageValue("");
        setLocationValue("");
        setRatingValue("");
	};

	return (
<>      

		<form onClick={(e) => {e.stopPropagation()}} onSubmit={onSubmit} className='form-inline mt-3 mb-3'>
			
		<label className='sr-only'>Username</label>
			<input
				type='text'
				className='form-control mb-2 mr-sm-2'
				placeholder='Add Username...'
				value={username}
				onChange={(event) => setUsername(event.target.value)}
			>
			</input>
			<label className='sr-only'>Password</label>
			<input
				type='password'
				className='form-control mb-2 mr-sm-2'
				placeholder='Add password...'
				value={password}
				onChange={(event) => setPassword(event.target.value)}
			></input>
				<label className='sr-only'>Name</label>
			<input
				type='text'
				className='form-control mb-2 mr-sm-2'
				placeholder='Add Email...'
				value={email}
				onChange={(event) => setEmail(event.target.value)}
			></input>
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
			<label className='sr-only'>Phone</label>
			<input
				type='text'
				className='form-control mb-2 mr-sm-2'
				placeholder='Add Phone...'
				value={phone}
				onChange={(event) => setPhone(event.target.value)}
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

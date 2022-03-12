import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { addRestaurantsAsync, addRestaurantsByAdminAsync } from '../redux/Slice';
import jwt_decode from "jwt-decode";
import * as yup from 'yup';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
	let schemaAddRestaurant = yup.object().shape({
		username: yup.string().required('Please enter username'),
		password: yup.string().required('Please enter password'),
		email: yup.string().required('Please enter email').email(),
        name: yup.string().required('Please enter name'),
        image: yup.string().required('Please enter imgbb Link'),
		location: yup.string().required('Please enter location'),
		phone: yup.string().required('Please enter phone').matches(/^[0-9]+$/).length(11),
		rating: yup.string().required('Please enter rating'),
      });
	const onSubmit = (event) => {
		event.preventDefault();
		schemaAddRestaurant
		.validate({ username: username, password: password, email: email, name: nameValue, image: imageValue, location: locationValue, phone: phone, rating: ratingValue, })
		.then(function (valid) {
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
		}).catch((e) => {
		toast.error(e.errors[0].toString());
	  });
	};

	return (
<>      
		<div className="form-image">
			<img src={imageValue || 'https://peacehumanity.org/wp-content/uploads/2021/10/placeholder-286.png'} alt="product-image"/>
		</div>
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

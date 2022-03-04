import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { patchRestaurantAsync} from '../redux/Slice';
const UpdateStatus = ({rId, status}) => {
	const restaurants = useSelector((state)=> state.restaurants.restaurants);
    const [imageValue, setImageValue] = useState('');
	const[statusValue, setStatusValue] = useState(status);

	let restaurant = {}
	useEffect(()=>{
		restaurant = restaurants?.filter((r) => r._id === rId);
		restaurant = restaurant[0];
		setImageValue(restaurant?.image);
		setStatusValue(restaurant?.status);
	},[restaurants]);

	const dispatch = useDispatch();
	const onSubmit = (statusValue) => {
		dispatch(patchRestaurantAsync({
			id: rId,
            status: statusValue,
		}));
	};

	return (
<>		
		<div className="form-image">
			<img src={imageValue} alt="restaurant-image"/>
		</div>
		<form onClick={(e) => {e.stopPropagation()}}  className='form-inline mt-3 mb-3'>
			<label className='sr-only'>Status</label>
            <div class="form-check form-switch toggle-status">
			<input
				type='checkbox'
				className='form-check-input'
                id="flexSwitchCheckDefault"
				checked={statusValue}
				onChange={(e)=> {onSubmit(e.target.checked)} }
			>
            </input>
			<h1>{restaurant.status}</h1>
            <label id="status-toggle" class="form-check-label" for="flexSwitchCheckDefault">Status</label>
            </div>
            <br />
		</form>
        </>
	);
};

export default UpdateStatus;

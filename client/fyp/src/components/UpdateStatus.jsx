import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getRestaurantsAsync, patchRestaurantAsync} from '../redux/Slice';
const UpdateStatus = ({rId, status}) => {
	useEffect(() => {
		dispatch(getRestaurantsAsync());
	}, []);
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
<div className='d-flex '>		
		<div className="form-image p-3">
			<img src={imageValue} alt="restaurant-image"/>
		</div>
		<form onClick={(e) => {e.stopPropagation()}}  className='d-flex justify-content-center align-items-center mx-auto'>
            <div class="form-check form-switch toggle-status">
			<input
				type='checkbox'
				className='form-check-input'
                id="flexSwitchCheckDefault"
				checked={statusValue}
				onChange={(e)=> {onSubmit(e.target.checked)} }
			>
            </input>
			<h6 className='mt-1'>{restaurant.status ? 'Open' : 'Closed'} </h6>
            </div>
            <br />
		</form>
        </div>
	);
};

export default UpdateStatus;

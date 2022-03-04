import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { addProductsAsync } from '../redux/ProductSlice';

const AddProduct = ({rId}) => {
    const restaurants = useSelector((state)=> state.restaurants.restaurants);
	const [nameValue, setNameValue] = useState('');
    const [priceValue, setPriceValue] = useState('');
    const [imageValue, setImageValue] = useState('');
    const [discountValue, setDiscountValue] = useState('');
    const [categoryValue, setCategoryValue] = useState('Fast Food');
	const dispatch = useDispatch();
    let restaurant = {}
	useEffect(()=>{
		restaurant = restaurants?.filter((r) => r._id === rId);
		restaurant = restaurant[0];
		setImageValue(restaurant.image);
	},[restaurants]);
	const onSubmit = (event) => {
		event.preventDefault();
		dispatch(addProductsAsync({
            id: rId,
            name: nameValue,
            price: priceValue,
            image: imageValue,
            discount: discountValue,
            category: categoryValue,
		}));
		setNameValue("");
        setPriceValue("");
        setImageValue("");
        setDiscountValue("");
        setCategoryValue("");
	};

	return (
<>     
        <div className="form-image">
			<img src={imageValue} alt="product-image"/>
		</div>
        <form onClick={(e) => {e.stopPropagation()}} onSubmit={onSubmit} className='form-inline mt-3 mb-3 form1'>
			<label className='sr-only'>Name</label>
			<input
				type='text'
				className='form-control mb-2 mr-sm-2'
				placeholder='Add Name...'
				value={nameValue}
				onChange={(event) => setNameValue(event.target.value)}
			></input>
            <label className='sr-only'>Price</label>
			<input
				type='text'
				className='form-control mb-2 mr-sm-2'
				placeholder='Add Price...'
				value={priceValue}
				onChange={(event) => setPriceValue(event.target.value)}
			></input>
            <label className='sr-only'>Image</label>
			<input
				type='text'
				className='form-control mb-2 mr-sm-2'
				placeholder='Add Image...'
				value={imageValue}
				onChange={(event) => setImageValue(event.target.value)}
			></input>
            <label className='sr-only'>Discount</label>
			<input
				type='text'
				className='form-control mb-2 mr-sm-2'
				placeholder='Add Discount...'
				value={discountValue}
				onChange={(event) => setDiscountValue(event.target.value)}
			></input>
            <label for='Category' className='sr-only'>Category</label>

                <select className="select" value={categoryValue} onChange={(event) => setCategoryValue(event.target.value)} name="cats" id="cats">
                    <option value="Fast Food">Fast Food</option>
                    <option value="Desi Food">Desi Food</option>
                    <option value="Home Made">Home Made</option>
                </select>

			<button id="btn-submit" type='submit' className='btn btn-primary mb-2'>
				Submit
			</button>
            <br />
		</form>

        </>
	);
};

export default AddProduct;

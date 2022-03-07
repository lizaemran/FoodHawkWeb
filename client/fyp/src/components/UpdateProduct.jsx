import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getProductsAsync, updateProductsAsync } from '../redux/ProductSlice';
import jwt_decode from "jwt-decode";
import { getRestaurantAsync } from '../redux/Slice';
const UpdateProduct = ({rId, pId, setPId}) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProductsAsync({id:rId}));
	}, []);
	const products = useSelector((state)=> state.products);
	const [nameValue, setNameValue] = useState('');
    const [priceValue, setPriceValue] = useState('');
    const [imageValue, setImageValue] = useState('');
    const [discountValue, setDiscountValue] = useState('');
    const [categoryValue, setCategoryValue] = useState('');
	
    let product = {}
	useEffect(()=>{
		product = products.filter((p) => p._id === pId);
		setNameValue(product.name);
        setPriceValue(product.price);
		setImageValue(product.image);
		setDiscountValue(product.discount);
		setCategoryValue(product.category);
	},[products]);
	const onSubmit = (event) => {
		event.preventDefault();
		dispatch(updateProductsAsync({
            id: pId,
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
			<img src={imageValue} alt="restaurant-image"/>
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
			<input
				type='text'
                name='Category'
				className='form-control mb-2 mr-sm-2'
				placeholder='Add Category...'
				value={categoryValue}
				onChange={(event) => setCategoryValue(event.target.value)}
			></input>

			<button id="btn-submit" type='submit' className='btn btn-primary mb-2'>
				Submit
			</button>
            <br />
		</form>
        </>
	);
};

export default UpdateProduct;

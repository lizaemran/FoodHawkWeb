import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getProductsAsync, updateProductsAsync } from '../redux/ProductSlice';
import jwt_decode from "jwt-decode";
import { getRestaurantAsync } from '../redux/Slice';
import * as yup from 'yup';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UpdateProduct = ({rId, pId, setPId}) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProductsAsync({id:rId}));
	}, []);
	const products = useSelector((state)=> state.products);
	const [nameValue, setNameValue] = useState('');
    const [priceValue, setPriceValue] = useState('');
    const [imageValue, setImageValue] = useState('');
	const [descriptionValue, setDescriptionValue] = useState('');
    const [discountValue, setDiscountValue] = useState('');
    const [categoryValue, setCategoryValue] = useState('');
	let schemaUpdateProduct = yup.object().shape({
        name: yup.string().required('Please enter name'),
        price: yup.string().required('Please enter price').label('Price'),
        image: yup.string().required('Please enter imgbb Link'),
        discount: yup.string().required(),
      });
    let product = {}
	useEffect(()=>{
		product = products.filter((p) => p._id === pId);
		product = product[0];
		setNameValue(product.name);
        setPriceValue(product.price);
		setImageValue(product.image);
		setDescriptionValue(product?.description);
		setDiscountValue(product.discount);
		setCategoryValue(product.category);
	},[products]);
	const onSubmit = (event) => {
		event.preventDefault();
		schemaUpdateProduct
		.validate({ name: nameValue, price: priceValue, image: imageValue, discount: discountValue, })
		.then(function (valid) {
		dispatch(updateProductsAsync({
            id: pId,
            name: nameValue,
            price: priceValue,
            image: imageValue,
			description: descriptionValue,
            discount: discountValue,
            category: categoryValue,
		}));
		setNameValue("");
        setPriceValue("");
        setImageValue("");
		setDescriptionValue("");
        setDiscountValue("");
        setCategoryValue("");
		}).catch((e) => {
			toast.error(e.errors[0].toString());
		});
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
			<label className='sr-only'>Description</label>
			<input
				type='text'
				className='form-control mb-2 mr-sm-2'
				placeholder='Add Description...'
				value={descriptionValue}
				onChange={(event) => setDescriptionValue(event.target.value)}
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

import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { updateRestaurantsAsync } from '../redux/Slice';
import * as yup from 'yup';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form } from 'react-bootstrap';
const UpdateRestaurant = ({rId}) => {
	const restaurants = useSelector((state)=> state.restaurants.restaurants);
	const [nameValue, setNameValue] = useState('');
	const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    // const [imageValue, setImageValue] = useState('');
    const [locationValue, setLocationValue] = useState('');
    const [ratingValue, setRatingValue] = useState('');
	
	let schemaUpdateRestaurant= yup.object().shape({
        name: yup.string().required('Please enter name').matches(/^[a-zA-Z]+$/, 'Only letters allowed. '),
        // image: yup.string().required('Please enter imgbb Link'),
		location: yup.string().required('Please enter location'),
		rating: yup.string().required('Please enter rating'),
      });
	let restaurant = {}
	useEffect(()=>{
		restaurant = restaurants?.filter((r) => r._id === rId);
		restaurant = restaurant[0];
		setNameValue(restaurant.name);
		// setImageValue(restaurant.image);
		setLocationValue(restaurant.location);
		setRatingValue(restaurant.rating);
	},[restaurants]);

	const dispatch = useDispatch();
	const onSubmit = (event) => {
		event.preventDefault();
		schemaUpdateRestaurant
		.validate({ name: nameValue, location: locationValue, rating: ratingValue, })
		.then(function (valid) {
		dispatch(updateRestaurantsAsync({
			id: rId,
            name: nameValue,
            image: previewSource,
            location: locationValue,
            rating: ratingValue,
		}));
		setNameValue("");
        // setImageValue("");
        setLocationValue("");
        setRatingValue("");
		}).catch((e) => {
			toast.error(e.errors[0].toString());
		});
	};
	const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }
    
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    }

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if(!previewSource) return;
    }

	return (
<>		<div className="mt-2 d-flex flex-column justify-content-center align-items-center">
			{/* <img src={imageValue || 'https://peacehumanity.org/wp-content/uploads/2021/10/placeholder-286.png'} alt="product-image"/> */}
			<div className='w-50'><Form.Control id='images' type='file' className='form-input' value={fileInputState} onChange={handleFileInputChange} name='image' accept="image/png, image/jpeg" />
                {/* <Button onClick={handleSubmitFile} className='py-1 px-2 text-center text-white rounded-3 w-100 my-2' style={{backgroundColor:'#ef5023', marginBottom:'0px', cursor:'pointer', border:'1px solid #ef5023'}} >Upload</Button> */}
            </div>
                      
            {previewSource && 
            <div className='p-3' style={{backgroundColor:'rgba(255, 255, 255, 0.5)', borderRadius:'20px', backdropFilter:'blur(2px)'}}>
                <img src={previewSource} className='' style={{height:'75px'}} alt='chosen' />
            </div>
    	}
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
            {/* <label className='sr-only'>Image</label>
			<input
				type='text'
				className='form-control mb-2 mr-sm-2'
				placeholder='Add Image...'
				value={imageValue}
				onChange={(event) => setImageValue(event.target.value)}
			></input> */}
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

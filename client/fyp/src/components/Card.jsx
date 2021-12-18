import React, {useState} from 'react';
import ProductPopUp from './ProductPopUp';
import {popup} from '../animations';
// import {motion} from 'framer-motion';
import { deleteRestaurantAsync } from '../redux/Slice';
import {useDispatch} from 'react-redux';
import {Row, Col, Image} from 'react-bootstrap';
const Card = ({id, image, stars, name, location, setRId, setPId, setIsAdd, setIsEdit, setIsEditP, isOnline, setIsEditStatus}) => {
    const dispatch = useDispatch();
    const [isPopUp, setIsPopUp] = useState(false);

    const renderStars = (stars) => {
        let rating = [];
             for(let i=1; i<=5; i++){
                if(i <= stars) {
                    rating.push(<i class="fas fa-star golden"></i>);
                }
                else{
                    rating.push(<i class="fas fa-star grey"></i>)
                }
            }
            return rating;
    }
    const handleDeletedClick = () => {
		dispatch(deleteRestaurantAsync({ id:id }));
	};
    return (
<>
{isPopUp && <ProductPopUp id={id} image={image} name={name} location={location} setIsPopUp={setIsPopUp} setPId={setPId} setIsEditP={setIsEditP}/>
}
            <Row className="r-card mt-5" variants={popup} initial='hidden' animate='show' onClick={()=> {setRId(id)}}>
                <Col className="" xl={2} lg={2} md={2} sm={2} xs={2}>
                    <div id="status" className = {isOnline ? "active-status": "inactive-status"}></div>
                    <Image class="p-image" src={image} fluid alt="restaurant"/>
                </Col>
                <Col className="" xl={10} lg={10} md={10} sm={10} xs={10}>
                <div className="admin-button d-flex">
                <div className="shadow-lg" onClick={()=> {setIsEditStatus(true)}}>Status</div>  
                <div onClick={()=> {setIsAdd(true)}}>Add</div>
                <div onClick={()=> {setIsEdit(true)}}>Edit</div>
                </div>
                    <h1>{name}</h1>
                    <button id="btn" className="fs-3 py-2 px-3" onClick={()=> {setIsPopUp(true)}} >ORDER</button>
                    <div id="rating">
                        {
                            renderStars(stars)
                        }
                    </div>
                    <div id="close" onClick={handleDeletedClick}><i className="fas fa-times"></i></div>
                    <p className="description fs-4">
                    Delivery Time: 40min<br />
                    Delivery Fee: Rs. 50<br />
                    Location: {location}
                    </p>
                    
                </Col>
 
            </Row>
</>           
    )
   
}

export default Card

import React, {useState} from 'react';
import ProductPopUp from './ProductPopUp';
import {popup} from '../animations';
import {motion} from 'framer-motion';
import { deleteRestaurantAsync, getRestaurantAsync } from '../redux/Slice';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { Col, Image } from 'react-bootstrap';
import {MdOutlineLocationOn} from 'react-icons/md';
const Card = ({id, username, image, stars, name, location, setRId, setPId, setIsAdd, setIsEdit, setIsEditP, isOnline, setIsEditStatus}) => {
    const dispatch = useDispatch();
    const [isPopUp, setIsPopUp] = useState(false);
    const userType = useSelector((state)=> state.auth?.user_type)
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
    const restaurantDetailHandler = () => {
        dispatch(getRestaurantAsync({
            id:id
        }))
    }
    return (
<>
{isPopUp && <ProductPopUp id={id} image={image} name={name} location={location} setIsPopUp={setIsPopUp} setPId={setPId} setIsEditP={setIsEditP}/>}
            <motion.div className="row r-card my-3 " variants={popup} initial='hidden' animate='show' onClick={()=> {setRId(id)}}>
                <Col className="col-2 m-auto"> 
                    <div id="status" className = {isOnline ? "active-status": "inactive-status"}></div>
                    <Link to={`/restaurant/${username}`}><Image onClick={restaurantDetailHandler} className="p-image" src={image} style={{borderRadius:'50%', marginLeft:'50px'}} alt="restaurant"/></Link>
                </Col>
                <Col className="col-10">
                {userType === 'admin' && <div className="admin-button shadow">
                <a onClick={()=> {setIsEditStatus(true)}}>Status</a>  
                <a onClick={()=> {setIsAdd(true)}}>Add</a>
                <a onClick={()=> {setIsEdit(true)}}>Edit</a>
                </div>}
                    <Link to={`/restaurant/${username}`} style={{color:'black', textDecoration:'none'}}><h1 onClick={restaurantDetailHandler}>{name}</h1></Link>
                    <button id="btn" 
                     onClick={()=> {if(isOnline) {setIsPopUp(true);} else {setIsPopUp(false)}}} >
                         ORDER
                    </button>
                    <div id="rating">
                        {
                            renderStars(stars)
                        }
                    </div>
                    {userType === 'admin' && <div id="close" onClick={handleDeletedClick}><i className="fas fa-times"></i></div>}
                    <p class="description">
                    Delivery Time: 40min<br />
                    Delivery Fee: Rs. 50<br />
                    <MdOutlineLocationOn  className='fs-5'/> {location}
                    </p>
                    
                </Col>
 
            </motion.div>
</>           
    )
   
}

export default Card

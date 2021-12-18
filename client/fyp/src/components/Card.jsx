import React, {useState} from 'react';
import ProductPopUp from './ProductPopUp';
import {popup} from '../animations';
import {motion} from 'framer-motion';
import { deleteRestaurantAsync } from '../redux/Slice';
import {useDispatch} from 'react-redux';
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
            <motion.div className="row r-card" variants={popup} initial='hidden' animate='show' onClick={()=> {setRId(id)}}>
                <div className="col-2">
                    <div id="status" className = {isOnline ? "active-status": "inactive-status"}></div>
                    <img class="p-image" src={image} alt="restaurant"/>
                </div>
                <div className="col-10">
                <div className="admin-button">
                <a onClick={()=> {setIsEditStatus(true)}}>Status</a>  
                <a onClick={()=> {setIsAdd(true)}}>Add</a>
                <a onClick={()=> {setIsEdit(true)}}>Edit</a>
                </div>
                    <h1>{name}</h1>
                    <button id="btn" onClick={()=> {setIsPopUp(true)}} >ORDER</button>
                    <div id="rating">
                        {
                            renderStars(stars)
                        }
                    </div>
                    <div id="close" onClick={handleDeletedClick}><i class="fas fa-times"></i></div>
                    <p class="description">
                    Delivery Time: 40min<br />
                    Delivery Fee: Rs. 50<br />
                    Location: {location}
                    </p>
                    
                </div>
 
            </motion.div>
</>           
    )
   
}

export default Card

import React, {useState} from 'react';
import {FaUserCircle} from 'react-icons/fa';

const Reviews = ({name, stars, desc}) => {
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
    return (
        <div className='bg-light p-3 mb-3' style={{borderRadius:'10px'}}>
            <div className='d-flex justify-content-between pb-3'>
                <div className=''>
                <FaUserCircle className='fs-4 m-1'/> 
                {name}
                </div>
                <div>
                {renderStars(stars)}
                </div>
            </div>
            <p className='' style={{fontSize:'14px'}}>{desc}</p>

        </div>
    )
}
export default Reviews
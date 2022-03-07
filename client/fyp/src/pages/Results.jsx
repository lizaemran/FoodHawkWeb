import React, {useState, useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Footer from '../UserSide/components/common/Footer/Footer'
import NavBar from '../UserSide/components/common/nav/NavBar'
import { Link, useLocation } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { getRestaurantsAsync } from '../redux/Slice'
import {MdOutlineLocationOn} from 'react-icons/md';
const Results = ({}) => {
    var location = useLocation();
    location = location.pathname.split('/')[2];
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
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRestaurantsAsync());
    }, [])
    const restaurants = useSelector((state) => state.restaurants.restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(location.toLowerCase())));
    return (
        <div className=' '>
            <NavBar />
            <Container className='py-5'>
                <h4>Results for "{location}"</h4>
                <Row className='my-5 flex-wrap'> 
                {restaurants.length === 0 ? <h4>No results found</h4> : <>
                <Row className='flex-wrap'> 
                    {restaurants?.map((restaurant, index) =>
                     <Col xl={4} lg={4} md={6} sm={12} xs={12} className='my-2 mx-1 p-2 ' key={index} style={{backgroundColor:'#f7f2f2', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px', borderRadius:'10px'}}>
                    <Link to={`/restaurant/${restaurant.username}`} className='text-dark text-decoration-none d-flex justify-content-start align-items-center'>
                            <img src={restaurant?.image} alt="product" className='' style={{height:'15vh', width:'auto', marginRight:'20px', borderRadius:'50%'}} />
                            <div className='d-flex flex-column text-decoration-none'>
                                <div className='d-flex'>
                                    <h6><b>{restaurant?.name}</b></h6>
                                    <div className='mb-2'>{restaurant?.status ? <span className='text-white px-1 rounded-3' style={{backgroundColor:'#25d366'}}>Open</span>
                                    : 
                                    <span className='text-white px-1 rounded-3' style={{backgroundColor:'#e33800'}}>Closed</span>}</div>
                                </div>
                                <h6><MdOutlineLocationOn className='fs-4' />{restaurant?.location}</h6>
                                <h6>{restaurant?.phone}</h6>
                                <div id="">
                                    {renderStars(restaurant?.rating)}({restaurant?.ratingArray.length})
                                </div>
                              
                            </div>
                            </Link>
                        </Col>
               
                    )}
                      </Row>
                    </>
                    }
                  
                </Row>
            </Container>
            <Footer />
        </div>
    )
}
export default Results
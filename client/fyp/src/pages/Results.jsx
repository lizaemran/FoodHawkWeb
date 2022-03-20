import React, {useState, useEffect} from 'react'
import Footer from '../UserSide/components/common/Footer/Footer'
import NavBar from '../UserSide/components/common/nav/NavBar'
import { Link, useLocation } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {AiFillPhone} from 'react-icons/ai';
import { getRestaurantsAsync, getSearchResultsAsync, getTop5RestaurantsAsync } from '../redux/Slice'
import {MdOutlineLocationOn} from 'react-icons/md';
import { PCard } from '../UserSide/components/common/Cards/PCard'
import { Container, Row, Col,  } from 'react-bootstrap';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
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
        dispatch(getSearchResultsAsync({
            keyword: location,
        }));
        dispatch(getRestaurantsAsync());
        dispatch(getTop5RestaurantsAsync());
    }, [])
    const searchedRestaurants = useSelector((state) => state.restaurants?.searchResults);
    const restaurants = useSelector((state)=> state.restaurants?.restaurants);
    const top5Restaurants = useSelector((state)=> state.restaurants?.top5Restaurants);
    const fastFood = restaurants?.filter((restaurant) => restaurant?.products?.filter((product) => product?.category === "Fast Food").length > 0);
    const desiFood = restaurants?.filter((restaurant) => restaurant?.products?.filter(product => product?.category === "Desi Food").length > 0);
    return (
        <div className=' '>
            <NavBar />
            <Container className='pt-5'>
                <h5>Showing Results for "{location}"</h5>
                <Row className='my-3 flex-wrap'> 
                {searchedRestaurants?.length === 0 ? <h5>No results found</h5> : <>
                <Row className='flex-wrap mb-5'> 
                    {searchedRestaurants?.map((restaurant, index) =>
                     <div className='my-2 mx-2 p-2 ' key={index} style={{backgroundColor:'#f7f2f2', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px', borderRadius:'10px', width:'20vw'}}>
                    <Link to={`/restaurant/${restaurant.username}`} className='text-dark text-decoration-none d-flex justify-content-start align-items-center'>
                            <img src={restaurant?.image} alt="product" className='' style={{height:'10vh', width:'auto', marginRight:'20px', borderRadius:'50%'}} />
                            <div className='d-flex flex-column text-decoration-none'>
                                <div className='d-flex'>
                                    <h6>{restaurant?.name}</h6>
                                    <div className=''>{restaurant?.status ? <span className='text-white px-1 rounded-3 ' style={{backgroundColor:'#25d366', fontSize:'11px', marginLeft:'5px'}}>Open</span>
                                    : 
                                    <span className='text-white px-1 rounded-3' style={{backgroundColor:'#e33800', fontSize:'11px', marginLeft:'5px'}}>Closed</span>}</div>
                                </div>
                                <p style={{fontSize:'12px'}}><MdOutlineLocationOn className='fs-4' />{restaurant?.location}</p>
                                <div id="" className='fs-6'>
                                    {renderStars(restaurant?.rating)}({restaurant?.ratingArray.length})
                                </div>
                              
                            </div>
                            </Link>
                        </div>
               
                    )}
                    
                      </Row>
                      <hr />
                    </>
                    }
                  
                </Row>
            </Container>

            <section>
        <Container className='pb-5'> 
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#000000" fill-opacity="1" d="M0,32L120,74.7C240,117,480,203,720,197.3C960,192,1200,96,1320,48L1440,0L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path></svg> */}
          <Row > <h5 className='text-left pt-3'>Popular Restaurants Today 👑</h5></Row>
          <Row><p className='text-left text-muted pb-3 fs-6'>Order Food and Reserve booking from popular restaurants and enjoy your meal to the fullest.</p></Row>
               {/* {ordered && <Confirmation toggle={setOrdered} />}  */}
                  <Row style={{margin:"0px", height:"fit-content"}}  >
                  <Swiper className="mySwiper " slidesPerView={3} spaceBetween={10}  breakpoints = {{ 300 : {slidesPerView : 1} ,499 : {slidesPerView : 1} , 800 : {slidesPerView : 2}, 1024: {slidesPerView : 3}}}>
                    { top5Restaurants?.map(data => (
                     <SwiperSlide  style={{width: "426px", height:"350px"}}>
                          <PCard key={`${data.id}`} data={data} stars={data.rating} />
                        </SwiperSlide>
                        )) }
        </Swiper>
                       </Row>  
          </Container>
          </section>

          <section className='' style={{backgroundColor:'rgba(237, 144, 90, 0.1)'}}>
          <Container className='pt-2 pb-3'> 
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#000000" fill-opacity="1" d="M0,32L120,74.7C240,117,480,203,720,197.3C960,192,1200,96,1320,48L1440,0L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path></svg> */}
          <Row > <h5 className='text-left  pt-3'>Fast Food 🍔🍟</h5></Row>
          <Row><p className='text-left text-muted pb-3 fs-6'>Ready to serve delicious and mouth-watering fast food. Put up reservation or Order Now & Enjoy your meal and order now!</p></Row>
               {/* {ordered && <Confirmation toggle={setOrdered} />}  */}
                  <Row style={{margin:"0px", height:"fit-content"}}  >
                  <Swiper className="mySwiper " slidesPerView={3} spaceBetween={10}  breakpoints = {{ 300 : {slidesPerView : 1} ,499 : {slidesPerView : 1} , 800 : {slidesPerView : 2}, 1024: {slidesPerView : 3}}}>
                   

                    { fastFood?.map(data => (
                     <SwiperSlide  style={{width: "426px", height:"350px"}}>
                       
                          <PCard key={`${data.id}`} data={data} stars={data.rating} />
                      
                        </SwiperSlide>
                        )) }
        </Swiper>
                       </Row>  
          </Container>
          </section>

          <section>
          <Container className='pt-2 pb-3'> 
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#000000" fill-opacity="1" d="M0,32L120,74.7C240,117,480,203,720,197.3C960,192,1200,96,1320,48L1440,0L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path></svg> */}
          <Row > <h5 className='text-left  pt-3'>Desi Food 🥘</h5></Row>
          <Row><p className='text-left text-muted pb-3 fs-6'>Ready to serve delicious and mouth-watering desi cuisine. Put up reservation or Order Now & Enjoy your meal and order now!</p></Row>
               {/* {ordered && <Confirmation toggle={setOrdered} />}  */}
                  <Row style={{margin:"0px", height:"fit-content"}}  >
                  <Swiper className="mySwiper " slidesPerView={3} spaceBetween={10}  breakpoints = {{ 300 : {slidesPerView : 1} ,499 : {slidesPerView : 1} , 800 : {slidesPerView : 2}, 1024: {slidesPerView : 3}}}>
                   

                    { desiFood?.map(data => (
                     <SwiperSlide  style={{width: "426px", height:"350px"}}>
                       
                          <PCard key={`${data.id}`} data={data} stars={data.rating} />
                      
                        </SwiperSlide>
                        )) }
        </Swiper>
                       </Row>  
          </Container>
          </section>
            <Footer />
        </div>
    )
}
export default Results
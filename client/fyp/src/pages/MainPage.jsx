import React,{useState, useEffect} from 'react'
import "../styles/mainPage.css";
import { useDispatch, useSelector } from 'react-redux';
import burger from'../img/e3c16df9.png';
import {PCard} from '../UserSide/components/common/Cards/PCard';
import { Container, Row, Col,  } from 'react-bootstrap';
// import { Confirmation } from '../UserSide/components/common/Cards/Confirmation';
// import pizzas from '../UserSide/components/common/Cards/data.json';
// import Carousel from "react-grid-carousel";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import Footer from '../UserSide/components/common/Footer/Footer';
import Box from '../UserSide/components/common/Box/Box';
import Promo from '../UserSide/components/common/Promo/Promo';
import Feedback from '../UserSide/components/common/CustomerFeedback/Feedback';
import { getRestaurantsAsync, getTop5RestaurantsAsync } from '../redux/Slice';
const MainPage = () => {
  const dispatch = useDispatch();
  useEffect(()=> {
		dispatch(getRestaurantsAsync());
    dispatch(getTop5RestaurantsAsync());
	},[]);
  const restaurants = useSelector((state)=> state.restaurants?.restaurants);
  const top5Restaurants = useSelector((state)=> state.restaurants?.top5Restaurants);
  const fastFood = restaurants?.filter((restaurant) => restaurant?.products?.filter((product) => product?.category === "Fast Food").length > 0);
  const desiFood = restaurants?.filter((restaurant) => restaurant?.products?.filter(product => product?.category === "Desi Food").length > 0);
  console.log(fastFood);
    return (
      <div className='bg-light'>
         <Box/> 
        <Container className='pt-5 pb-5'> 
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#000000" fill-opacity="1" d="M0,32L120,74.7C240,117,480,203,720,197.3C960,192,1200,96,1320,48L1440,0L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path></svg> */}
          <Row > <h5 className='text-left pt-3'>Popular Restaurants Today</h5></Row>
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
          <Container className='pt-2 pb-3'> 
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#000000" fill-opacity="1" d="M0,32L120,74.7C240,117,480,203,720,197.3C960,192,1200,96,1320,48L1440,0L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path></svg> */}
          <Row > <h5 className='text-left  pt-3'>Fast Food</h5></Row>
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
          <Container className='pt-2 pb-3'> 
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#000000" fill-opacity="1" d="M0,32L120,74.7C240,117,480,203,720,197.3C960,192,1200,96,1320,48L1440,0L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path></svg> */}
          <Row > <h5 className='text-left  pt-3'>Desi Food</h5></Row>
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
          <Promo/>
          <Feedback/>
         <Footer/>
         
         </div>
    )
}

export default MainPage

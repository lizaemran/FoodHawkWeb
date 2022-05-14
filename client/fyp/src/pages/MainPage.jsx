import React,{useState, useEffect} from 'react'
import "../styles/mainPage.css";
import { useDispatch, useSelector } from 'react-redux';
import burger from'../img/e3c16df9.png';
import {PCard} from '../UserSide/components/common/Cards/PCard';
import { Container, Row, Col,  } from 'react-bootstrap';
// import { Confirmation } from '../UserSide/components/common/Cards/Confirmation';
// import pizzas from '../UserSide/components/common/Cards/data.json';
// import Carousel from "react-grid-carousel";
// import allPositiveTweets from '../data/positive_tweets.json';
// import allNegativeTweets from '../data/negative_tweets.json'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import Footer from '../UserSide/components/common/Footer/Footer';
import Box from '../UserSide/components/common/Box/Box';
import Promo from '../UserSide/components/common/Promo/Promo';
import Feedback from '../UserSide/components/common/CustomerFeedback/Feedback';
import { getRestaurantsAsync, getTop5RestaurantsAsync } from '../redux/Slice';
import Banner from '../components/Banner';
import FAQs from '../components/FAQs';
import GetMobileApp from '../components/GetMobileApp';

const MainPage = () => {

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
    dispatch(getTop5RestaurantsAsync());
}, [])
const top5Restaurants = useSelector((state)=> state.restaurants?.top5Restaurants);

    return (
      <div className='bg-light'>
         <Box/>  
         <section>
        <Container className='pt-5 pb-1'> 
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
          <Banner buttonLink='/restaurant-register' buttonText='Get Started' position='right' heading='List your restaurant on Food Hawk' para={ <p className="fs-6">Would you like millions of new customers to enjoy your amazing food and groceries?
                    <br /><br />
                    So would we!
                    It's simple: we list your menu and product lists online, help you process orders, pick them up, and deliver them to hungry pandas – in a heartbeat!
                    Interested?<br /><br /> 
                    Let's start our partnership today!</p>} />
          <GetMobileApp />
          <Banner buttonLink='/' buttonText='Book Now' position='left' heading='Book reservation at your favourite restaurant' para={ <p className="fs-6">Would you like to reserve booking at your favourite restaurant before time?
                    <br /><br />
                    So shall we!
                    It's simple: Choose your faviourite restaurant, select from menu, and book your reservation online in advanced.
                    Interested?<br /><br /> 
                    Let's start!</p>} />
          <FAQs />
          {/* <Promo /> */}
          <Feedback/>
         <Footer/>
         
         </div>
    )
}

export default MainPage

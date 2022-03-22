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
import Banner from '../components/Banner';
import FAQs from '../components/FAQs';
const MainPage = () => {
  const dispatch = useDispatch();
  

    return (
      <div className='bg-light'>
         <Box/>  
          <Banner buttonLink='/restaurant-register' buttonText='Get Started' position='right' heading='List your restaurant on Food Hawk' para={ <p className="fs-6">Would you like millions of new customers to enjoy your amazing food and groceries?
                    <br /><br />
                    So would we!
                    It's simple: we list your menu and product lists online, help you process orders, pick them up, and deliver them to hungry pandas – in a heartbeat!
                    Interested?<br /><br /> 
                    Let's start our partnership today!</p>} />
          <Banner buttonLink='/' buttonText='Book Now' position='left' heading='Book reservation at your favourite restaurant' para={ <p className="fs-6">Would you like to reserve booking at your favourite restaurant before time?
                    <br /><br />
                    So shall we!
                    It's simple: Choose your faviourite restaurant, select from menu, and book your reservation online in advanced.
                    Interested?<br /><br /> 
                    Let's start!</p>} />
          <FAQs />
          <Promo />
          <Feedback/>
         <Footer/>
         
         </div>
    )
}

export default MainPage

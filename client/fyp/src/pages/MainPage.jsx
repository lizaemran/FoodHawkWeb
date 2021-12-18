import React,{useState} from 'react'
import "../styles/mainPage.css";
import burger from'../img/e3c16df9.png';
import {PCard} from '../UserSide/components/common/Cards/PCard';
import { Container, Row, Col, CarouselItem } from 'react-bootstrap';
import { Confirmation } from '../UserSide/components/common/Cards/Confirmation';
import pizzas from '../UserSide/components/common/Cards/data.json';
import Carousel from "react-grid-carousel";
import Footer from '../UserSide/components/common/Footer/Footer';
import Box from '../UserSide/components/common/Box/Box';
import Promo from '../UserSide/components/common/Promo/Promo';
import Feedback from '../UserSide/components/common/CustomerFeedback/Feedback';
import { ListItemSecondaryAction } from '@material-ui/core';
const MainPage = () => {
    const [ordered, setOrdered] = useState(false);

  function displayConfirmation() {
    setOrdered(true);

    setTimeout(() => {
      setOrdered(false);
    }, 3000);
  }
    return (
      <div className='bg-light'>
         <Box/> 
        <Container className='pt-5 pb-5'> 
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#000000" fill-opacity="1" d="M0,32L120,74.7C240,117,480,203,720,197.3C960,192,1200,96,1320,48L1440,0L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path></svg> */}
          <Row > <h2 className='text-center fw-bold pt-3'>---Popular Food Today---</h2></Row>
          <Row><p className='text-center text-muted pb-5' style={{fontSize:"12px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt<br /> ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</p></Row>
               {/* {ordered && <Confirmation toggle={setOrdered} />}  */}
                  <Row style={{marginLeft:"50px", height:"20rem"}}  >
                   < Carousel cols={3} rows={1} gap={2} hideArrow={true} autoplay={1500} loop={true} className="" >
                 
                    { pizzas.map(data => (
                      <Carousel.Item>
                        <Col key={'${data.id}'}>
                          <PCard data={data} setOrdered={displayConfirmation} price={data.price} />
                        </Col>
                        </Carousel.Item>
                        )) }
                       </Carousel> 
                     
                 
                       </Row>  
 </Container>
 <Promo/>
          <Feedback/>
         <Footer/>
         </div>
    )
}

export default MainPage

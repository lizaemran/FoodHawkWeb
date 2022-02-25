import React, {useState} from 'react';
import { Card, Badge, Button, Row, Col } from 'react-bootstrap';
import "../Cards/PCard.css";
import {BsArrowRight} from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { getRestaurantAsync } from '../../../../redux/Slice';
import { Link } from 'react-router-dom';
export function PCard({ data, setOrdered,stars }) {
  const dispatch = useDispatch();
  const [isHov, setIsHov] = useState(false);
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
const restaurantDetailHandler = () => {
  dispatch(getRestaurantAsync({
      id:data.id
  }))
}
  return (
    <Card className={`${isHov ? 'card-up' : ''} card-div`} style={{width:"19rem"}} onMouseEnter={() => setIsHov(true)} onMouseLeave={() => setIsHov(false)}>
    <Card className={`${isHov ? 'black' : 'bg-white'} h-100 shadow-sm rounded justify-content-center align-items-center` }>
      <Card.Img variant="top" className={`${isHov ? 'image-up': ''}`} src={data.image} style={{width:"200px", height:"25vh", objectFit:"contain"}}/>
      <Card.Body className="d-flex flex-column justify-content-center align-items-center">
          <Card.Title className={`${isHov ? 'white-c' : 'black-c'} mb-0 fw-bold`}>{data.name}</Card.Title>
          <Card.Text className='p-2 text-success fw-bold' style={{fontSize:"12px"}}>
          {renderStars(stars)} 
          </Card.Text>
      </Card.Body>
      {isHov && 
      <Row className='w-100 d-flex align-items-center p-3' style={{backgroundColor:"#ef5023"}}>
        <Link  to='/restaurant'>
          <Col onClick={restaurantDetailHandler} className=" text-white" style={{backgroundColor:"transparent", border:"none"}}>
          <text>Order</text>
          </Col>
          <Col className="d-flex justify-content-end"><BsArrowRight style={{color:"white", fontSize:"1.5rem"}}/>
          </Col>
        </Link>
      </Row>
}
    </Card>
    </Card>
  );
}
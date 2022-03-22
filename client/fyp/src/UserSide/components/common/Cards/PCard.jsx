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


  return (
    <Card className={`${isHov ? '' : ''} card-div h-100 justify-content-center align-items-center `} style={{width:"18rem", borderRadius:'10px', backgroundColor : '#F7F2F2'}} onMouseEnter={() => setIsHov(true)} onMouseLeave={() => setIsHov(false)}>
      <Card.Img variant="" className={`${isHov ? 'image-up': ''} pt-2 `} src={data.image} style={{borderRadius:'50%' ,width:"125px", height:"auto", objectFit:"contain"}}/>
      <Card.Body className="d-flex flex-column justify-content-center align-items-center">
          <Card.Title className=' text-capitalize' style={{fontSize:'17px'}}>{data.name}</Card.Title>
          <Card.Text className='text-success' style={{fontSize:"20x"}}>
          {renderStars(stars)} 
          </Card.Text>
      </Card.Body>
      {/* {isHov &&  */}
      <Row className='w-100 d-flex justify-content-center align-items-center p-3 card-div-button' style={{backgroundColor:"#ef5023", borderRadius:'0px 0px 10px 10px'}}>
        <Link  to={`/restaurant/${data.username}`} className='d-flex justify-content-center align-items-center' style={{textDecoration:'none'}}>
          <Col className=" text-white" style={{backgroundColor:"transparent", border:"none"}}>
          <text>Order</text>
          </Col>
          <Col className="d-flex justify-content-end"><BsArrowRight style={{color:"white", fontSize:"1.5rem"}}/>
          </Col>
        </Link>
      </Row>
{/* } */}
    </Card>
  );
}
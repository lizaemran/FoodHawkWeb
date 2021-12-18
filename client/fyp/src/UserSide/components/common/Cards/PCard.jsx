import React, {useState} from 'react';
import { Card, Badge, Button, Row, Col } from 'react-bootstrap';
import "../Cards/PCard.css";
import {BsArrowRight} from "react-icons/bs";
export function PCard({ data, setOrdered,price }) {
  const [isHov, setIsHov] = useState(false);
  return (
    <Card className={`${isHov ? 'card-up' : ''}`} style={{width:"19rem", borderRadius:"25px"}} onMouseEnter={() => setIsHov(true)} onMouseLeave={() => setIsHov(false)}>
    <Card className={`${isHov ? 'black' : 'bg-white'} h-100 shadow-sm rounded justify-content-center align-items-center` }>
      <Card.Img variant="top" className={`${isHov ? 'image-up': ''}`} src={data.image} style={{width:"200px", height:"25vh"}}/>
      <Card.Body className="d-flex flex-column justify-content-center align-items-center">
          <Card.Title className={`${isHov ? 'white-c' : 'black-c'} mb-0 fw-bold`}>{data.name}</Card.Title>
          <Card.Text className='p-2 text-success fw-bold' style={{fontSize:"12px"}}>
            PKR {price}
          </Card.Text>
      </Card.Body>
      {isHov && 
      <Row className='w-100 d-flex align-items-center p-2' style={{backgroundColor:"#ef5023"}}>
      <Col className=" text-white" style={{backgroundColor:"transparent", border:"none"}}>
        <text>Order Now 🍕</text>
        </Col>
        <Col className="d-flex justify-content-end"><BsArrowRight style={{color:"white", fontSize:"1.5rem"}}/>
        </Col>
      </Row>
}
    </Card>
    </Card>
   
  );
}
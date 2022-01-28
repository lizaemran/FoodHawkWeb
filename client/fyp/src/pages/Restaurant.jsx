import React, {useState} from 'react'
import { Breadcrumb, Button, Col, Container, Image, Row, Modal, Form } from 'react-bootstrap'
import {AiOutlineStar} from 'react-icons/ai';
import {MdOutlineDirections} from 'react-icons/md';
import {BsBookmarkPlus, BsShare} from 'react-icons/bs';
import SideNav from '../components/SideNav/SideNav'
import coke from '../img/reddrink.jpeg';
import cookies from '../img/log-in.jpg';
import map from '../img/googlemaps.jfif';
import BookTableForm from '../components/BookTableForm';
import PopUpDetail from '../components/PopUpDetail';
import { useSelector } from 'react-redux';
import Nav from '../components/Nav';
import Reviews from '../components/Reviews';
import {WhatsappShareButton, WhatsappIcon, TwitterShareButton, TwitterIcon} from 'react-share';
const Restaurant = ({pId, setPId, isEditP, setIsEditP, search, setSearch}) => {
    const [review, setReview] = useState(true);
    const [direction, setDirection] = useState(false);
    const [bookmark, setBookmark] = useState(false);
    const [share, setShare] = useState(false);
    const [overview, setOverview] = useState(true);
    const [menu, setMenu] = useState(false);
    const [gallery, setGallery] = useState(false);
    const [reviews, setReviews] = useState(false);
    const [orderOnline, setOrderOnline] = useState(false);
    const [book, setBook] = useState(false);
    const firstName = useSelector((state) => state.auth.username);
    const restaurant = useSelector((state) => state.restaurants.restaurant);
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
    const [modalShow, setModalShow] = useState(false);
    function MyVerticallyCenteredModal(props) {
        return (
          <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add Review
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h6>Review by {firstName} </h6>
              <p>
                <Form.Control as="textarea" rows={3} type='text' placeholder='Good...' className='book-form' />
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button style={{backgroundColor:'#ef5023', border:'none'}}>Add</Button>
            </Modal.Footer>
          </Modal>
        );
      }
    return (
        <div>
            <Row>
                <Col xl={1} lg={1} md={1} sm={12} xs={12}>
                <SideNav />
                </Col>
                <Col className='px-5'  xl={11} lg={11} md={11} sm={12} xs={12}>
                <Nav search={search} setSearch={setSearch} />
                <div className='px-4'>
                <Breadcrumb>
                <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/dashboard">
                    Restaurants
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{restaurant?.name}</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col>
                    <h1>{restaurant?.name}</h1>
                    <h6>Fast Food</h6>
                    <h6>{restaurant?.location}</h6>
                    
                    </Col>
                    <Col className='d-flex justify-content-end'>
                    <div id="" className='fs-6 '>
                        {renderStars(restaurant?.rating)} {restaurant?.rating}
                        <p className='' style={{fontSize:'12px'}}>20 Dining Reviews</p>
                    </div>
                    </Col>
                </Row>
                <Button className={!review ? 'res-but' : 'res-but-active'} onClick={()=> {setReview(true); setDirection(false); setBookmark(false); setShare(false); setModalShow(true);}} style={{marginRight:'10px'}}>
                    <AiOutlineStar className='fs-5' style={{color: review ? 'white' : '#EF5023'}} /> Add a review
                </Button>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
                <Button className={!direction ? 'res-but' : 'res-but-active'} onClick={()=> {setReview(false); setDirection(true); setBookmark(false); setShare(false);}} style={{marginRight:'10px'}}>
                    <MdOutlineDirections className='fs-5' style={{color: direction ? 'white' : '#EF5023'}} /> Direction
                </Button>
                <Button className={!bookmark ? 'res-but' : 'res-but-active'} onClick={()=> {setReview(false); setDirection(false); setBookmark(true); setShare(false);}} style={{marginRight:'10px'}}>
                    <BsBookmarkPlus className='fs-5' style={{color: bookmark ? 'white' : '#EF5023'}}/> Bookmark
                </Button>
                <WhatsappShareButton url='http://localhost:3000/restaurant' style={{marginRight:'5px'}}>
                    {/* <BsShare className='fs-5' style={{color: share ? 'white' : '#EF5023'}}/> Share */}
                    <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>
                <TwitterShareButton url='http://localhost:3000/restaurant'>
                    {/* <BsShare className='fs-5' style={{color: share ? 'white' : '#EF5023'}}/> Share */}
                    <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
                <Row className='py-4' style={{}}>
                        <Col xl={8} lg={8} md={8} sm={12} xs={12}>
                        <Image src={coke} className='' alt='res-img' style={{width:'100%', borderRadius:'10px'}}/>
                        </Col>
                        <Col className='bg-light p-3' xl={4} lg={4} md={4} sm={12} xs={12} style={{borderRadius:'10px'}}>
                        <h4>Direction</h4>
                        <Image src={map} className='' alt='res-map' style={{width:'100%', borderRadius:'10px'}}/>
                        </Col>
                </Row>
                <div className='d-flex'>
                <div className={!overview ? 'res-tab' : 'res-tab-active'} onClick={() => {setOverview(true); setMenu(false); setGallery(false); setReviews(false); setOrderOnline(false); setBook(false);}} style={{marginRight:'10px', cursor:'pointer'}}>
                    Overview
                </div>
                <div className={!menu ? 'res-tab' : 'res-tab-active'} onClick={() => {setOverview(false); setMenu(true); setGallery(false); setReviews(false); setOrderOnline(false); setBook(false);}} style={{marginRight:'10px', cursor:'pointer'}}>
                    Menu
                </div>
                <div className={!gallery ? 'res-tab' : 'res-tab-active'}onClick={() => {setOverview(false); setMenu(false); setGallery(true); setReviews(false); setOrderOnline(false); setBook(false);}} style={{marginRight:'10px', cursor:'pointer'}}>
                   Gallery
                </div>
                <div className={!reviews ? 'res-tab' : 'res-tab-active'} onClick={() => {setOverview(false); setMenu(false); setGallery(false); setReviews(true); setOrderOnline(false); setBook(false);}}  style={{marginRight:'10px', cursor:'pointer'}}>
                    Reviews
                </div>
                <div className={!orderOnline ? 'res-tab' : 'res-tab-active'} onClick={() => {setOverview(false); setMenu(false); setGallery(false); setReviews(false); setOrderOnline(true); setBook(false);}} style={{marginRight:'10px', cursor:'pointer'}}>
                    Order Online
                </div>
                <div className={!book ? 'res-tab' : 'res-tab-active'} onClick={() => {setOverview(false); setMenu(false); setGallery(false); setReviews(false); setOrderOnline(false); setBook(true);}} style={{cursor:'pointer'}}>
                    Book A Table
                </div>
                </div>
               {overview && 
                    <div className='py-5'>
                        <h5>Known For</h5>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nulla iste maiores optio, vero odit ab aliquid, voluptate necessitatibus similique perferendis. Iste delectus suscipit repudiandae!
                        </p>
                   </div>}
                   {menu && 
                    <div className='py-5'>
                        {restaurant?.products.map((r) => 
                            <PopUpDetail key={r._id} id={r._id} image={r.image} name={r.name} price={r.price} discount={r.discount} category={r.category} setPId={setPId} setIsEditP={setIsEditP}/>
                        )}
                   </div>}
                   {gallery && 
                    <div className='py-5'>
                        <Container>
                        <Row style={{}}>
                        <p>2 photos</p>
                        <Image src={coke} className='' alt='res-img' style={{width:'50%', objectFit:'cover'}}/>
                        <Image src={cookies} className='' alt='res-img' style={{width:'50%', objectFit:'cover' }}/>
                        </Row>
                        </Container>
                   </div>}
                   {reviews && 
                    <div className='py-5'>
                        <Reviews name='Anonymous' stars='5' desc='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur praesentium sequi eum sed, doloribus nesciunt illum? Nisi omnis odio nobis corrupti ducimus aut corporis soluta dolor sit amet consectetur adipisicing elit. Obcaecati, consequatur?' />
                        <Reviews name='Anonymous' stars='4' desc='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur praesentium sequi eum sed, doloribus nesciunt illum? Nisi omnis odio nobis corrupti ducimus Obcaecati, consequatur?' />
                   </div>}
                   {orderOnline && 
                    <div className='py-5'>
                        {restaurant?.products.map((r) => 
                            <PopUpDetail key={r._id} id={r._id} image={r.image} name={r.name} price={r.price} discount={r.discount} category={r.category} setPId={setPId} setIsEditP={setIsEditP}/>
                        )}                   </div>}
                   {book && 
                    <div className='py-5'>
                        <BookTableForm />
                   </div>}
                </div>
                </Col>
            </Row>
        </div>
    )
}
export default Restaurant

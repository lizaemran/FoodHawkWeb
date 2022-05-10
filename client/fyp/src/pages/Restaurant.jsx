import React, {useState} from 'react'
import { Breadcrumb, Button, Col, Container, Image, Row, Modal, Form, } from 'react-bootstrap'
import {AiOutlineStar, AiOutlineClose} from 'react-icons/ai';
import {MdOutlineDirections} from 'react-icons/md';
import {BsBookmarkPlus, BsShare, BsCheckCircle} from 'react-icons/bs'
import {ImCancelCircle} from 'react-icons/im';
import {MdOutlineLocationOn} from 'react-icons/md';
import {IoIosRestaurant} from 'react-icons/io';	
import SideNav from '../components/SideNav/SideNav'
import coke from '../img/BurgerS.jpeg';
import cookies from '../img/log-in.jpg';
import map from '../img/googlemaps.jfif';
import BookTableForm from '../components/BookTableForm';
import PopUpDetail from '../components/PopUpDetail';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Nav from '../components/Nav';
import Reviews from '../components/Reviews';
import { Link } from 'react-router-dom';
import {WhatsappShareButton, WhatsappIcon, TwitterShareButton, TwitterIcon} from 'react-share';
import NavBar from '../UserSide/components/common/nav/NavBar';
import Footer from '../UserSide/components/common/Footer/Footer';
import FormLoginSub from './SignIn/FormLoginSub';
import { getUserAsync } from '../redux/auth';
import { useEffect } from 'react';
import FormSignup from './SignUp/FormSignup';
import { addRatingAsync, getRatingAsync, getRestaurantByUsernameAsync, getRestaurantsAsync, getOrdersRatingAsync } from '../redux/Slice';
import ReviewForm from '../components/ReviewForm';
import GoogleMapReact from 'google-map-react';
import { addBookingItems, clearBooking, deleteBooking } from '../redux/BookingSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Restaurant = ({pId, setPId, isEditP, setIsEditP, search, setSearch}) => {
    const [bookingModalShow, setBookingModalShow] = useState(false);
    const {bookingItems, totalB} = useSelector((state)=> state?.booking);
    const restaurants = useSelector((state)=> state?.restaurants);
    const [review, setReview] = useState(false);
    const [direction, setDirection] = useState(false);
    const [bookmark, setBookmark] = useState(false);
    const [share, setShare] = useState(false);
    const [overview, setOverview] = useState(true);
    const [menu, setMenu] = useState(false);
    const [gallery, setGallery] = useState(false);
    const [reviews, setReviews] = useState(false); 
    const [orderOnline, setOrderOnline] = useState(false);
    const [latValue, setLatValue] = useState('');
    const [lngValue, setLngValue] = useState('');
    const [book, setBook] = useState(false);
    const [booking, setBooking] = useState(false);
    const token = useSelector(state => state.auth.token);
    const firstName = useSelector((state) => state.auth.username);
    const restaurant = useSelector((state) => state.restaurants.restaurant);
    const ratingArray = useSelector((state) => state.restaurants.restaurant?.ratingArray);
    const user = useSelector((state) => state.auth.user);
    const u_id = useSelector((state) => state.auth?.id);
    const ratingOArray = useSelector((state) => state.restaurants.restaurant?.ratingOArray);
    const noRedirection = true;
    const dispatch = useDispatch();
    const selectBookingMenu = (r) => {
        // console.log(r._id);
            // if(total > 0){
                    dispatch(addBookingItems({
                        id: r._id,
                        restaurant_id: restaurant._id,
                        user_id: u_id,
                        countItems: 1,
                        name: r.name,
                        price: r.price,
                        image: r.image,
                        description: r.description,
                        discount: r.discount,
                        category: r.category,
                        
                    }))
                    toast.success('Item added to booking!', {	
                        position: "top-right",
                        autoClose: 5000,
                        });
                // }
            // else{
            // dispatch(addBookingItems({
            //     id: r.id,
            //     restaurant_id: restaurant._id,
            //     countItems: 1,
            //     name: r.name,
            //     price: r.price,
            //     image: r.image,
            //     description: r.description,
            //     discount: r.discount,
            //     category: r.category,
            //     restaurant: newrId._id,
            // }));
            // toast.success('Item added to booking!', {	
            //     position: "top-right",
            //     autoClose: 5000,
            //     });
            //     }
     
        };
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

    var location = useLocation();
    location = location.pathname.split('/')[2];
    useEffect (() => {
        dispatch(getUserAsync());
       
    }, [token])
    // const getRatingHandler = (id) => {
    //             alert('a');
    //             dispatch(getRatingAsync(
    //                 {
    //                     id: id
    //                 }
    //             ));
    // }
    useEffect(() => {
        dispatch(getRestaurantsAsync());
        dispatch(getRestaurantByUsernameAsync({username: location}));
        navigator.geolocation.getCurrentPosition(function(position) {
            setLatValue(position.coords.latitude);
            setLngValue(position.coords.longitude);
          });
    }, [])
    // useEffect (() => {
    //     if(restaurant?.ratingOArray !== undefined){
    //         for(let i=0; i < restaurant?.ratingOArray.length ; i++){
    //             alert('hh'); 
    //             dispatch(getOrdersRatingAsync({
    //                 id: restaurant?.ratingOArray[i]
    //             }))
    //         }
    //     }
    // }, [restaurant])
    // const AnyReactComponent = ({ text }) => <div>{text}</div>;
    const defaultProps = {
        center: {
            lat : restaurant?.lat,
            lng : restaurant?.lng
        },
        zoom: 16
      };

    function BookingModal(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header >
              <Modal.Title id="contained-modal-title-vcenter">
                Please Choose Your Order
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
               You have entered the details. Now its time to select your order. 
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button style={{border: 'none', backgroundColor:'#ef5023'}} onClick={() => {setBooking(true); setBookingModalShow(false);}}>Open Menu</Button>
            </Modal.Footer>
          </Modal>
        );
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
             <ReviewForm setModalShow={setModalShow} />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={()=> setModalShow(false)} style={{backgroundColor:'#ef5023', border:'none'}}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }
      const [modalShowLogin, setModalShowLogin] = useState(false);
      const [modalShowSignUp, setModalShowSignUp] = useState(false);
      function MyVerticallyCenteredModal2(props) {
          return (
            <Modal
              {...props}
              size="md"
              className=''
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                  {/* <h4>{modalShowLogin ? 'Login to Continue' : 'Register to Continue'}</h4> */}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className='bg-secondary'>
                {modalShowSignUp ?
                <FormSignup noRedirection={noRedirection} setModalShowLogin={setModalShowLogin} setModalShowSignUp={setModalShowSignUp} />
             :
                <FormLoginSub noRedirection={noRedirection} setModalShowLogin={setModalShowLogin} setModalShowSignUp={setModalShowSignUp} />
                }
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => {setModalShowLogin(false); setBook(false); setReview(false); setReviews(false); setOverview(true);}} style={{backgroundColor:'#ef5023', border:'none'}}>Close</Button>
              </Modal.Footer>
            </Modal>
          );
        }
    return (
        <div>
            <ToastContainer />
            {token === null && <NavBar />}
            <Row>
                {token !== null &&
                <Col xl={1} lg={1} md={1} sm={12} xs={12}>
                <SideNav />
                </Col>}
                <Col className='px-5 pt-4'>
                {token !== null &&
                <Nav search={search} setSearch={setSearch} />
                }
                <div className='px-4'>
                <Breadcrumb >
                <Breadcrumb.Item href={`${token !== null ? '/dashboard' : '/'}`} style={{fontSize:'14px'}}>Home</Breadcrumb.Item>
                <Breadcrumb.Item href={`${token !== null ? '/dashboard' : '/'}`} style={{fontSize:'14px'}}>
                    Restaurants
                </Breadcrumb.Item>
                <Breadcrumb.Item active style={{fontSize:'14px'}}>{restaurant?.name}</Breadcrumb.Item>
                </Breadcrumb>
                <Row className=''>
                    <Col className='my-auto'>
                    <div className='d-flex justify-content-start align-items-center'>
                    <h4 className='my-auto text-capitalize'>{restaurant?.name}</h4>
                    <p className='' style={{marginBottom: '0px' , fontSize:'10px'}}>
                        {restaurant?.status ? <span className='text-white rounded-3 mx-1 p-1' style={{backgroundColor:'#25D366'}}>Open Now</span>
                     : 
                     <span className=' text-white rounded-3 mx-1 p-1 ' style={{backgroundColor:'#E33800'}}>Closed</span>}</p>
                    </div>
                    {/* <p className='' style={{margin: '0px' , fontSize:'15px'}}>Fast Food</p> */}
                    </Col>
                    <Col className='d-flex justify-content-end'>
                    <div id="" className='fs-6 ' style={{marginRight:'20px'}}>
                        {renderStars(restaurant?.ratingR)} {restaurant?.ratingR}
                        <p className='' style={{fontSize:'12px'}}>{restaurant?.ratingArray?.length} Dining Reviews</p>
                    </div>
                    <div id="" className='fs-6 '>
                        {renderStars(restaurant?.ratingO)} {restaurant?.ratingO}
                        <p className='' style={{fontSize:'12px'}}>{restaurant?.ratingOArray?.length} Delivery Reviews</p>
                    </div>
                    </Col>
                </Row>

                <section className='d-flex justify-content-start align-items-center'>
                <Button className={!review ? 'res-but' : 'res-but-active'} onClick={()=> {setModalShowLogin(true); setReview(true); setDirection(false); setBookmark(false); setShare(false); setModalShow(true);}} style={{marginRight:'10px'}}>
                    <AiOutlineStar className='fs-5' style={{color: review ? 'white' : '#EF5023'}} /> Add a review
                </Button>
                {token !== null  &&
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />}
                {token === null && 
                 <MyVerticallyCenteredModal2
                    show={modalShowLogin}
                    onHide={() => setModalShowLogin(false)}
                />
                }
                <a href={`https://www.google.com/maps/dir/?api=1&origin=${latValue},${lngValue}&destination=${restaurant?.lat},${restaurant?.lng}&travelmode=driving`} target='_blank' rel="noopener noreferrer" className=''>
                <Button className={!direction ? 'res-but' : 'res-but-active'} onClick={()=> {setReview(false); setDirection(true); setBookmark(false); setShare(false);}} style={{marginRight:'10px'}}>
                    <MdOutlineDirections className='fs-5' style={{color: direction ? 'white' : '#EF5023'}} /> Direction
                </Button>
                </a>
                {/* <p>{user?.allOrders[0].filter((o) => o?.restaurant_id === restaurant?._id) && 'plllll'}</p> */}
                {/* <Button className={!bookmark ? 'res-but' : 'res-but-active'} onClick={()=> {setReview(false); setDirection(false); setBookmark(true); setShare(false);}} style={{marginRight:'10px'}}>
                    <BsBookmarkPlus className='fs-5' style={{color: bookmark ? 'white' : '#EF5023'}}/> Bookmark
                </Button> */}
                <WhatsappShareButton className='mb-2' url={`http://localhost:3000/restaurant/${restaurant?.username}`} separator=" "  title={'Place order from your favourite restaurant! ' + restaurant?.name}  style={{marginRight:'5px'}}>
                    {/* <BsShare className='fs-5' style={{color: share ? 'white' : '#EF5023'}}/> Share */}
                    <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>
                <TwitterShareButton className='mb-2' url={`http://localhost:3000/restaurant/${restaurant?.username}`} hashtags={['FoodHawk','Food', 'OnlineOrder', 'BookTable']} title={'Place order from your favourite restaurant! ' + restaurant?.name}>
                    {/* <BsShare className='fs-5' style={{color: share ? 'white' : '#EF5023'}}/> Share */}
                    <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
                </section>
                {/* <div className='position-relative '> */}
                    {/* <div className='position-absolute res__img__map__div' style={{width:'100%', height:'300px', zIndex:'-1'}}>

                    </div> */}
                <Row className='py-1 align-items-center' style={{}}>
                        <Col xl={7} lg={7} md={7} sm={12} xs={12} style={{height:'fit-content'}}>
                        {restaurant?.gallery.length === 0 ? 
                        <div className='d-flex justify-content-center align-items-center' style={{backgroundColor:'#e5e5e5',height:'37.5vh', width:'100%', borderRadius:'10px'}}>
                            <IoIosRestaurant className='' style={{fontSize:'10rem', }} />
                        </div>
                        // <Image src={coke} className='' alt='res-img' style={{height:'37.5vh', width:'100%', borderRadius:'10px', objectFit:'cover'}}/> 
                        : 
                        <Image src={restaurant?.gallery[0]} className='' alt='res-img' style={{height:'44vh', width:'100%', borderRadius:'10px', objectFit:'cover'}}/>}
                        </Col>
                        <Col className=' p-3' xl={5} lg={5} md={5} sm={12} xs={12} style={{borderRadius:'5px', height:'fit-content', backgroundColor:'rgba(0,0,0,0.5)', backdropFilter:'blur(10px)'}}>
                        <p className='mb-2 text-white' style={{margin: '0px' , fontSize:'15px'}}><MdOutlineLocationOn className='fs-4'/> {restaurant?.location}</p>
                        {/* <Image src={map} className='' alt='res-map' style={{height:'37.5vh', width:'100%', borderRadius:'10px', objectFit:'cover'}}/> */}
                        {(restaurant?.lat && restaurant?.lng) && 
                                  <div style={{ height: '200px', width: '100%', }}>
                                  <GoogleMapReact
                                      bootstrapURLKeys={{ key: "AIzaSyAOWEsA7XNwmoFasiw9hlAewldBeEJB8-o" }}
                                      defaultCenter={defaultProps.center}
                                      defaultZoom={defaultProps.zoom}
                                  >
                                      <MdOutlineLocationOn className='fs-4'
                                      lat={restaurant?.lat}
                                      lng={restaurant?.lng}
                                      text="My Marker"
                                      />
                                  </GoogleMapReact>
                                  </div>
                        }
              
                        </Col>
                </Row>
                {/* </div> */}
                <div className='d-flex res-tab-menu mt-4'>
                <div className={!overview ? 'res-tab' : 'res-tab-active'} onClick={() => {setOverview(true); setMenu(false); setGallery(false); setReviews(false); setOrderOnline(false); setBook(false);}} style={{marginRight:'10px', cursor:'pointer'}}>
                    Overview
                </div>
                <div className={!menu ? 'res-tab' : 'res-tab-active'} onClick={() => {setOverview(false); setMenu(true); setGallery(false); setReviews(false); setOrderOnline(false); setBook(false);}} style={{marginRight:'10px', cursor:'pointer'}}>
                    Menu
                </div>
                <div className={!gallery ? 'res-tab' : 'res-tab-active'}onClick={() => {setOverview(false); setMenu(false); setGallery(true); setReviews(false); setOrderOnline(false); setBook(false);}} style={{marginRight:'10px', cursor:'pointer'}}>
                   Gallery
                </div>
                <div className={!reviews ? 'res-tab' : 'res-tab-active'} onClick={() => { setOverview(false); setMenu(false); setGallery(false); setReviews(true); setOrderOnline(false); setBook(false);}}  style={{marginRight:'10px', cursor:'pointer'}}>
                    Reviews
                </div>
                <div className={!orderOnline ? 'res-tab' : 'res-tab-active'} onClick={() => {setOverview(false); setMenu(false); setGallery(false); setReviews(false); setOrderOnline(true); setBook(false);}} style={{marginRight:'10px', cursor:'pointer'}}>
                    Order Online
                </div>
                <div className={!book ? 'res-tab' : 'res-tab-active'} onClick={() => {setModalShowLogin(true); setOverview(false); setMenu(false); setGallery(false); setReviews(false); setOrderOnline(false); setBook(true);}} style={{cursor:'pointer'}}>
                    Book A Table
                </div>
                </div>
               {overview && 
                    <div className='py-3'>
                        {restaurant?.overview ? (<>
                        {restaurant?.overview}
                        </>) : (
                            <p className='text-muted fs-6 text-center my-3'><i>No overview to show</i></p>
                            // <><h6>Known For</h6>
                            // <p className='' style={{fontSize:'14px'}}>
                            //     Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nulla iste maiores optio, vero odit ab aliquid, voluptate necessitatibus similique perferendis. Iste delectus suscipit repudiandae!
                            // </p>
                            // <p style={{fontSize:'14px'}}>
                            //     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero itaque, <b>molestias officiis fugit</b> modi facere.
                            // </p>
                            // <p style={{fontSize:'14px'}}>
                            //     Lorem ipsum dolor sit amet consectetur adipisicing elit. In qui esse sint cupiditate quos quod libero perferendis, magnam quis quasi delectus atque, officia nisi beatae aliquam corrupti voluptates, consectetur neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus est tempore nobis nostrum officiis sed natus sit perspiciatis aut alias.
                            // </p></>
                        )}
                        
                   </div>}
                   {menu && 
                    <div className='py-3'>
                            <Row className='flex-wrap'> 
                                    {restaurant?.products.map((r) =>
                                    <Col key={r._id} xl={3} lg={4} md={3} sm={12} xs={12}>
                                        <Col className='bg-light p-2 d-flex flex-column justify-content-between align-items-center w-100 mb-3' style={{borderRadius:'15px'}} xl={4} lg={4} md={4} sm={12} xs={12}>
                                            <Row>
                                                <Col  xl={6} lg={6} md={6} sm={12} xs={12}>
                                                    <Image  src={r.image} style={{height:'px',  objectFit:'cover' }} />
                                                </Col>
                                                <Col  xl={6} lg={6} md={6} sm={12} xs={12} className='d-flex flex-column justify-content-center align-items-center'>
                                                    <p className=''>{r.name}</p>
                                                    <p style={{fontSize:'14px'}}>{r.category}</p>
                                                    <p style={{fontSize:'14px'}}><b>PKR {r.price}</b></p>
                                                </Col>
                                            </Row>
                                        </Col>
                                        
                                    </Col>
                                    )}
                            </Row>
                   </div>}
                   {gallery && <>
                   {restaurant?.gallery.length === 0 ? <p className='text-muted fs-6 text-center my-3'><i>No images to show</i></p> :  <div className='py-3'>
                        {/* <Container> */}
                        <p className='fs-6 poppins'>Total Images: {restaurant?.gallery.length}</p>
                        <Row className='flex-wrap' style={{}}>
                        {restaurant?.gallery?.map((g, index) => 
                        (<Col xl={4} lg={4} md={6} sm={12} xs={12} key={index}>
                        <Image src={g} className='mb-4' alt='res-img' style={{height:'300px', width:'100%', objectFit:'cover'}}/>
                        </Col>
                        ))}
                        
                        </Row>
                        {/* </Container> */}
                   </div>
                }</>
                }
                   { reviews && 
                    <div className='py-3'>
                        {restaurant?.ratingArray.length > 0 ? 
                        (<>
                           {restaurant?.ratingArray.map((r) =>
                            <div key={r._id} className=''>
                                <Reviews name={r?.user_name} stars={r.stars} desc={r.description} />
                            </div>
                        )}</>) 
                    : 
                    (<>
                       {restaurant?.ratingOArray.length > 0 ? 
                        (<>
                           {restaurant?.ratingOArray.map((r) =>
                            <div key={r._id} className=''>
                                <Reviews name={r?.user_name} stars={r.stars} desc={r.description} />
                            </div>
                        )}</>) 
                    : 
                    (<p className='fs-6 poppins text-center'>No reviews yet</p>)
                    }
                    </>)
                    }
                  
                     
                   </div>}
                   {orderOnline && 
                    <div className='p-4 mt-2' style={{background:'radial-gradient(circle, rgba(177,174,182,1) 0%, rgba(217,190,147,1) 47%, rgba(236,231,187,1) 100%)'}}>
                        {token !== null ? (<>
                             {restaurant?.products.map((r) => 
                                <PopUpDetail key={r._id} id={r._id} image={r.image} name={r.name} price={r.price} discount={r.discount} category={r.category} setPId={setPId} setIsEditP={setIsEditP}/>
                            )}  
                            </>) : (<>
                            {restaurant?.products.length > 0 ? (<Row className='flex-wrap'> 
                                    {restaurant?.products.map((r) =>
                                    <Col key={r._id} xl={3} lg={4} md={3} sm={12} xs={12}>
                                        <Col className='bg-light p-2 d-flex flex-column justify-content-between align-items-center w-100 mb-3' style={{borderRadius:'5px'}} xl={4} lg={4} md={4} sm={12} xs={12}>
                                        <Image src={r.image} style={{height:'20vh', width:'10vw', objectFit:'cover' }} />
                                        <div className='d-flex flex-column justify-content-center align-items-center'>
                                        <p className='fs-5 fw-bold'>{r.name}</p>
                                        {/* <p className='text-center' style={{fontSize:'11px'}}>{r?.description}</p> */}
                                        <p>PKR {r.price}</p>
                                        <p>{r.category}</p>
                                        </div>
                                        <Button disabled={restaurant?.status ? false : true} onClick={() => setModalShowLogin(true)} className='w-100' style={{backgroundColor:'#ef5023',color:'white', textDecoration:'none', border:'none'}}>
                                            Order
                                        </Button>
                                        </Col>
                                    </Col>
                                    )}
                                </Row>) : (<div>
                                    <p className='fs-6 poppins text-center text-white'>No products yet</p>
                                </div>)}
                                
                                </>

                        )}
                                        
                    </div>}
                   {(token !== null && token !== '' && book) && 
                    <div className='py-3' >
                        {booking ? (
                            <>
                            <Row>
                             <Col>
                                 <Row className='flex-wrap'> 
                                 {restaurant?.products.map((r) =>
                                 <Col key={r._id} xl={4} lg={4} md={6} sm={12} xs={12}>
                                     <Col className='bg-light p-2 d-flex flex-column justify-content-between align-items-center w-100 mb-3' style={{borderRadius:'5px'}} xl={4} lg={4} md={4} sm={12} xs={12}>
                                     <Image src={r.image} style={{height:'15vh', width:'8vw', objectFit:'cover' }} />
                                     <div className='my-2 d-flex flex-column justify-content-center align-items-center'>
                                     <p className='fs-6' style={{marginBottom:'0px'}}>{r.name}</p>
                                     <p style={{marginBottom:'0px', fontSize:'13px'}}>{r.category}</p>
                                     <p style={{marginBottom:'0px', fontSize:'13px'}}>PKR {r.price}</p>
                                     </div>
                                     <Button onClick={() => selectBookingMenu(r)} className='w-100' style={{backgroundColor:'#ef5023',color:'white', textDecoration:'none', border:'none'}}>
                                         Select
                                     </Button>
                                     </Col>
                                 </Col>
                                 )}
                             </Row>
                             </Col>
                             <Col className='bg-light p-3'>
                            <div className='d-flex justify-content-end align-items-start mb-1 '>
                            <Button className='w-10 h-10 ' style={{marginRight:'5px',backgroundColor:'#25d366',color:'white', textDecoration:'none', border:'none'}}>
                                    <BsCheckCircle className='text-white' /> Confirm
                             </Button>
                             <Button onClick={() => {setBooking(false); dispatch(clearBooking());}} className='w-10 h-10' style={{backgroundColor:'red',color:'white', textDecoration:'none', border:'none'}}>
                                    <ImCancelCircle className='text-white' /> Cancel
                             </Button>
                             </div>
                             <div className='d-flex flex-column justify-content-center align-items-center'>
                                 {!totalB > 0 && <p>No Items Selected Yet</p>}
                                 {bookingItems.map((r,i) =>
                                 <Row className='py-3 my-1 d-flex justify-content-center align-items-center w-100 bg-white rounded-3 shadow-sm px-3 py-2'>
                                 <Col>
                                 {i+1}
                                 </Col>
                                 <Col>
                                 <Image src={r.image} alt='product' width={75} height={50} style={{objectFit:'contain'}} />
                                 </Col>
                                 <Col className='d-flex justify-content-center align-items-center'>
                                 <p className='fs-6 ' style={{marginBottom:'0px'}}>{r.name}</p>
                                 </Col>
                                 <Col className='d-flex justify-content-center align-items-center'>
                                 <p className='fs-6 ' style={{marginBottom:'0px'}}>{r.countItems}</p>
                                 </Col>
                                 <Col className='d-flex justify-content-center align-items-center'>
                                 <p style={{marginBottom:'0px'}}>{r?.category}</p>
                                 </Col>
                                 <Col className='d-flex justify-content-center align-items-center'>
                                 <p style={{marginBottom:'0px'}}>PKR {r?.price}</p>
                                 </Col>
                                 <Col className='d-flex justify-content-center align-items-center'>
                                 <AiOutlineClose style={{cursor:'pointer'}} onClick={() => {dispatch(deleteBooking({id : r.id})); toast.success('Item Removed from booking');}} />
                                 </Col>
                                 
                               </Row>
                                 )}
                                
                                 
                             </div>
                             {totalB > 0 && 
                             <div className='mt-3 d-flex justify-content-end align-items-center'>
                                 <p className='fs-6'>Items: {totalB}</p>   
                            </div>}
                             {totalB > 0 && 
                             <div className='d-flex justify-content-end align-items-center'>
                                <p className='fs-6'>Total: PKR {bookingItems?.reduce((acc, cur) => (Number(acc) + Number(cur.countItems * cur.price)), Number(0))}</p>                                     
                            </div>}
                             </Col>
                             </Row>
                             </>

                        ) : (
                            <BookTableForm setOrderOnline={setOrderOnline} setBook={setBook} setBookingModalShow={setBookingModalShow} />
                        )}
                   </div>}
                </div>
                </Col>
            </Row>
            {token === null && <Footer />}
            <BookingModal
                    show={bookingModalShow}
                    onHide={() => setBookingModalShow(false)}
                />
        </div>
    )
}
export default Restaurant

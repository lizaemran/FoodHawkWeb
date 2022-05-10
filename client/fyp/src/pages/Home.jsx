import React, { useEffect, useState, useContext } from "react";
// import pizza from '../img/pizza.svg';
// import burger from '../img/burger.svg';
// import fries from '../img/fries.svg';
// import soda from '../img/soda.svg';
import Nav from "../components/Nav";
import Card from "../components/Card";
import { useSelector, useDispatch } from "react-redux";
import { getRestaurantsAsync } from "../redux/Slice";
import AddRestaurant from "../components/AddRestaurant";
import UpdateRestaurant from "../components/UpdateRestaurant";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct";
import UpdateStatus from "../components/UpdateStatus";
import FormPopUp from "../components/FormPopUp";
import { setCart } from "../redux/CartSlice";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import SideNav from "../components/SideNav/SideNav";
import {
  getUserAsync,
  getAdminAsync,
  resendVerifyUserAsync,
} from "../redux/auth";
import jwt_decode from "jwt-decode";
import Cart from "./Cart";
import CartHome from "../components/CartHome";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllOrdersForUserAsync } from "../redux/user";
import ReviewForm from "../components/ReviewForm";
import { AiOutlineWarning } from "react-icons/ai";
import Recommendationsystem from "./Recommendationsystem";
const Home = ({ pId, setPId, isEditP, setIsEditP, search, setSearch }) => {
  const { cartItems, total } = useSelector((state) => state.cart);
  const cart = useSelector((state) => state.cart);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isAddR, setIsAddR] = useState(false);
  const [isEditStatus, setIsEditStatus] = useState(false);
  const dispatch = useDispatch();
  const restaurants = useSelector((state) => state.restaurants.restaurants);
  const id = useSelector((state) => state.auth.id);
  const email = useSelector((state) => state.auth.email);
  const token = useSelector((state) => state.auth.token);
  const [searched, setSearched] = useState(false);
  const [rId, setRId] = useState();
  const userType = useSelector((state) => state.auth?.user_type);
  const firstname = useSelector((state) => state.auth?.firstname);
  const isConfirmed = useSelector((state) => state.auth?.isConfirmed);
  const allOrders = useSelector((state) => state.user?.allOrders[0]);
  const [modalShow, setModalShow] = useState(false);
  const [orderToReview, setOrderToReview] = useState("");
  // var today = new Date();
  // time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  // const [time, setTime] = useState(time);
  useEffect(() => {
    if (total === 0) {
      localStorage.setItem("cart", []);
    }
    if (cartItems.length > 0) {
      console.log("local storage");
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cartItems]);
  useEffect(() => {
    if (localStorage.getItem("cart")) {
      dispatch(setCart(JSON.parse(localStorage.getItem("cart"))));
    }
    dispatch(getRestaurantsAsync());
    var decoded = jwt_decode(token);
    // console.log(decoded);
    if (decoded.isAdmin === true) {
      dispatch(getAdminAsync());
    } else if (decoded.isUser === true) {
      dispatch(getUserAsync());
    } else {
      window.location.href = "/";
    }
    dispatch(getAllOrdersForUserAsync(id));
    if (allOrders?.length > 0) {
      for (let i = 0; i < allOrders.length; i++) {
        if (
          allOrders[i].status === "delivered" &&
          allOrders[i].ratingOrder === undefined
        ) {
          alert("You have orders to review");
          setOrderToReview(allOrders[i]);
          setModalShow(true);
        }
      }
    }
  }, []);
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Please rate your Order
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Review by {firstname} </h5>
          <ReviewForm
            setModalShow={setModalShow}
            orderToReview={orderToReview}
          />
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={()=> setModalShow(false)} style={{backgroundColor:'#ef5023', border:'none'}}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    );
  }
  var decoded = jwt_decode(token);
  useEffect(() => {
    if (search !== null && search.length > 1 && search !== "") {
      setSearched(
        restaurants.filter((r) =>
          r.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else if (search === "") {
      setSearched(restaurants);
    }
  }, [search.length > 1]);

  return (
    <>
      <ToastContainer />
      {token !== null && (
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      )}
      <Row className="">
        <Col xl={1} lg={1} md={1} sm={12} xs={12}>
          <SideNav />
        </Col>
        <Col style={{ paddingLeft: "40px" }}>
          <Nav search={search} setSearch={setSearch} />
          {userType === "admin" && (
            <i
              onClick={() => {
                setIsAddR(true);
              }}
              id="addRestaurant"
              className="fas fa-plus"
            ></i>
          )}
          {/* <img id="pizza"src={pizza} alt="pizza"/>
            <img id="burger" src={burger} alt="burger"/>
            <img id="fries" src={fries} alt="fries"/>
            <img id="soda" src={soda} alt="soda"/> */}
          {isConfirmed === false && userType === "user" && (
            <div className="alert alert-danger mb-1 text-center" role="alert">
              <AiOutlineWarning className="fs-5" /> Confirm Your Email to Place
              Order{" "}
              <a
                className="border border-1 border-danger text-decoration-none text-danger rounded-3 p-1 shadow-sm"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  dispatch(resendVerifyUserAsync({ email: email }))
                }
              >
                Resend
              </a>
            </div>
          )}

          <Recommendationsystem userType={userType} />
          <Container className="home-container">
            {/* <Swiper className="mySwiper " slidesPerView={3} spaceBetween={10}  breakpoints = {{ 300 : {slidesPerView : 1} ,499 : {slidesPerView : 1} , 800 : {slidesPerView : 2}, 1024: {slidesPerView : 3}}}> */}

            {searched !== "" ? (
              <>
                {restaurants?.map((restaurant) => (
                  <div key={restaurant._id} className="pt-3">
                    {/* <SwiperSlide  style={{width: "426px", height:"410px"}}> */}
                    <Card
                      key={restaurant._id}
                      id={restaurant._id}
                      name={restaurant.name}
                      image={restaurant.image}
                      stars={restaurant.rating}
                      isOnline={restaurant.status}
                      location={restaurant.location}
                      username={restaurant.username}
                      setRId={setRId}
                      setPId={setPId}
                      setIsAdd={setIsAdd}
                      setIsEdit={setIsEdit}
                      setIsEditP={setIsEditP}
                      setIsEditStatus={setIsEditStatus}
                    />
                    {/* </SwiperSlide> */}
                  </div>
                ))}
              </>
            ) : (
              <>
                {searched?.map((restaurant) => (
                  <div key={restaurant._id} className="mt-2">
                    {/* <SwiperSlide  style={{width: "426px", height:"410px"}}> */}
                    <Card
                      key={restaurant._id}
                      id={restaurant._id}
                      name={restaurant.name}
                      image={restaurant.image}
                      stars={restaurant.rating}
                      isOnline={restaurant.status}
                      location={restaurant.location}
                      username={restaurant.username}
                      setRId={setRId}
                      setPId={setPId}
                      setIsAdd={setIsAdd}
                      setIsEdit={setIsEdit}
                      setIsEditP={setIsEditP}
                      setIsEditStatus={setIsEditStatus}
                    />
                    {/* </SwiperSlide> */}
                  </div>
                ))}
              </>
            )}
            {/* </Swiper> */}
          </Container>
        </Col>
        {total > 0 && (
          <Col
            xl={2}
            lg={2}
            md={2}
            sm={12}
            xs={12}
            className="bg-light"
            style={{ marginLeft: "0px" }}
          >
            <CartHome />
          </Col>
        )}
        {isAddR && (
          <FormPopUp title="Add Restaurant" setIsOpen={setIsAddR}>
            <AddRestaurant />
          </FormPopUp>
        )}
        {isEdit && (
          <FormPopUp title="Update Restaurant" setIsOpen={setIsEdit}>
            <UpdateRestaurant rId={rId} />
          </FormPopUp>
        )}
        {isAdd && (
          <FormPopUp title="Add Product" setIsOpen={setIsAdd}>
            <AddProduct rId={rId} />
          </FormPopUp>
        )}
        {isEditP && (
          <FormPopUp title="UpdateProduct" setIsOpen={setIsEditP}>
            <UpdateProduct pId={pId} setPId={setPId} />
          </FormPopUp>
        )}
        {isEditStatus && (
          <FormPopUp title="Update Status" setIsOpen={setIsEditStatus}>
            <UpdateStatus rId={rId} status={restaurants.status} />
          </FormPopUp>
        )}
      </Row>
    </>
  );
};

export default Home;

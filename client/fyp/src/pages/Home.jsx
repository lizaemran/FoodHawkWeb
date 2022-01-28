import React, {useEffect, useState, useContext} from 'react'
import pizza from '../img/pizza.svg';
import burger from '../img/burger.svg';
import fries from '../img/fries.svg';
import soda from '../img/soda.svg';
import Nav from '../components/Nav';
import Card from '../components/Card';
import { useSelector , useDispatch} from 'react-redux';
import {getRestaurantsAsync} from '../redux/Slice';
import AddRestaurant from '../components/AddRestaurant';
import UpdateRestaurant from '../components/UpdateRestaurant';
import AddProduct from '../components/AddProduct';
import UpdateProduct from '../components/UpdateProduct';
import UpdateStatus from '../components/UpdateStatus';
import FormPopUp from '../components/FormPopUp';
import {setCart} from '../redux/CartSlice';
import { Col, Container, Row } from 'react-bootstrap';
import SideNav from '../components/SideNav/SideNav';
import { getUserAsync, getAdminAsync } from '../redux/auth';
import jwt_decode from "jwt-decode";
import Cart from './Cart';
import CartHome from '../components/CartHome';
const Home = ({pId, setPId, isEditP, setIsEditP, search, setSearch}) => {
    const {cartItems, total} = useSelector((state)=> state.cart);
    const cart = useSelector((state)=> state.cart);
    const [isEdit, setIsEdit] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    
    const [isAddR, setIsAddR] = useState(false);    
    const [isEditStatus, setIsEditStatus] = useState(false);
    const dispatch = useDispatch();
	const restaurants = useSelector((state)=> state.restaurants);
	const token = useSelector((state)=> state.auth.token);
    const [searched, setSearched] = useState([]);
    const [rId, setRId] = useState(searched[0]);
    
    useEffect(()=> {
		dispatch(getRestaurantsAsync());
        var decoded = jwt_decode(token);
        // console.log(decoded);
        if(decoded.isAdmin === true){
            dispatch(getAdminAsync());
        }
        else if(decoded.isUser === true){
            dispatch(getUserAsync());
        }
        else{
            window.location.href='/';
        }
        
	},[dispatch]);
   
    useEffect(() => {
        if(total === 0){
            localStorage.setItem("cart",[]);
        }
        if(cartItems.length > 0){
            console.log("local storage");
            localStorage.setItem("cart",JSON.stringify(cart));
        }
        
    }, [cartItems])
    useEffect(() => {
        if(localStorage.getItem("cart")){
            dispatch(setCart(
                JSON.parse(localStorage.getItem("cart")),
            ))
        }
   
        
    }, []);
    useEffect(()=>{
        if(search!= null && search.length>2){
        setSearched(restaurants.filter((r)=> {
            return r.name.toLowerCase().includes(search.toLowerCase());
        }
        ))
    }
    else{
        setSearched(restaurants);
    }
    },[search, restaurants])

    useEffect(()=> {
        setSearched(restaurants);
    },[restaurants])
   const userType = useSelector((state)=> state.auth?.user_type)
    return (
        <>
            <Row>
            <Col xl={1} lg={1} md={1} sm={12} xs={12} >
            <SideNav />
            </Col>
            <Col >
            <Nav search={search} setSearch={setSearch} />
            {userType === 'admin' && <i onClick={()=>{setIsAddR(true)}} id="addRestaurant"className="fas fa-plus"></i>}
            {/* <img id="pizza"src={pizza} alt="pizza"/>
            <img id="burger" src={burger} alt="burger"/>
            <img id="fries" src={fries} alt="fries"/>
            <img id="soda" src={soda} alt="soda"/> */}
            <Container  className="home-container">
            <Row>
            {searched?.map((restaurant) => (
                <Col xl={6} lg={6} md={6} sm={12} xs={12} key={restaurant._id}>
				<Card  
                key={restaurant._id} 
                id={restaurant._id} 
                name={restaurant.name} 
                image={restaurant.image} 
                stars={restaurant.rating}
                isOnline={restaurant.status}
                location={restaurant.location}
                setRId={setRId}
                setPId={setPId}
                setIsAdd={setIsAdd}
                setIsEdit={setIsEdit}
                setIsEditP={setIsEditP}
                setIsEditStatus={setIsEditStatus}
                />
                </Col>
			))}
            </Row>
            </Container>
                {isAddR && <FormPopUp title="Add Restaurant" setIsOpen={setIsAddR}><AddRestaurant /></FormPopUp>}
                {isEdit && <FormPopUp title="Update Restaurant" setIsOpen={setIsEdit}><UpdateRestaurant rId={rId} /></FormPopUp>}
                {isAdd && <FormPopUp title="Add Product" setIsOpen={setIsAdd}><AddProduct rId={rId}/></FormPopUp> }
                {isEditP && <FormPopUp title="UpdateProduct" setIsOpen={setIsEditP}><UpdateProduct pId={pId} setPId={setPId}/></FormPopUp>}
                {isEditStatus && <FormPopUp title="Update Status" setIsOpen={setIsEditStatus}><UpdateStatus rId={rId} status={restaurants.status}/></FormPopUp>}
        
            </Col>
            {total > 0 && 
            <Col  xl={2} lg={2} md={2} sm={12} xs={12} className='bg-light'>
                <CartHome />
            </Col>}
            </Row>
          </>
    )
}


export default Home

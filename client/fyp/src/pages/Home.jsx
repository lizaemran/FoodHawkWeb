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
import FormPopUp from '../components/FormPopUp';
const Home = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [isEditP, setIsEditP] = useState(false);
    const [isAddR, setIsAddR] = useState(false);    
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
	const restaurants = useSelector((state)=> state.restaurants);
    const [searched, setSearched] = useState([]);
    const [rId, setRId] = useState(searched[0]);
    const [pId, setPId] = useState("");
    useEffect(()=> {
		dispatch(getRestaurantsAsync());


	},[dispatch]);
     
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
   

    return (
        <>
            <Nav search={search} setSearch={setSearch} />
            <i onClick={()=>{setIsAddR(true)}} id="addRestaurant"className="fas fa-plus"></i>
            <img id="pizza"src={pizza} alt="pizza"/>
            <img id="burger" src={burger} alt="burger"/>
            <img id="fries" src={fries} alt="fries"/>
            <img id="soda" src={soda} alt="soda"/>
            <div  className="container home-container">
            {searched?.map((restaurant) => (
				<Card  
                key={restaurant._id} 
                id={restaurant._id} 
                name={restaurant.name} 
                image={restaurant.image} 
                stars={restaurant.rating}
                location={restaurant.location}
                setRId={setRId}
                setPId={setPId}
                setIsAdd={setIsAdd}
                setIsEdit={setIsEdit}
                setIsEditP={setIsEditP}
                />
			))}
            </div>
                {isAddR && <FormPopUp title="Add Restaurant" setIsOpen={setIsAddR}><AddRestaurant /></FormPopUp>}
                {isEdit && <FormPopUp title="Update Restaurant" setIsOpen={setIsEdit}><UpdateRestaurant rId={rId} /></FormPopUp>}
                {isAdd && <FormPopUp title="Add Product" setIsOpen={setIsAdd}><AddProduct rId={rId}/></FormPopUp> }
                {isEditP && <FormPopUp title="UpdateProduct" setIsOpen={setIsEditP}><UpdateProduct pId={pId} setPId={setPId}/></FormPopUp>}
        </>
    )
}


export default Home

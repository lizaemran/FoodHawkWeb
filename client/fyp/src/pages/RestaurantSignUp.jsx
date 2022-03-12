import React, {useState} from 'react';
import RestaurantSignUpForm from '../components/RestaurantSignUpForm';
import Footer from '../UserSide/components/common/Footer/Footer';
import NavBar from '../UserSide/components/common/nav/NavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RestaurantSignUp = ({name, stars, desc}) => {
    return ( 
    <div>
        <NavBar />
        <div className='restaurant__register__bg text-white  p-5' >
            <div className='restaurant__register__form__bg  d-flex flex-column justify-content-center align-items-center py-5'>
                <h3>Restaurant</h3>
                <h5>Registeration...</h5>
                <RestaurantSignUpForm />
                <ToastContainer />
            </div>
        </div>
        <Footer />
    </div>
    )
}
export default RestaurantSignUp
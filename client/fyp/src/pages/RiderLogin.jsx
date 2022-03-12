import React from 'react'
import Footer from '../UserSide/components/common/Footer/Footer';
import NavBar from '../UserSide/components/common/nav/NavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RiderLoginForm from '../components/RiderLoginForm';
const RiderLogin = () => {
    return (
        <div>
        <ToastContainer />
        <NavBar />
        <div className='rider__register__bg text-white p-5' >
            <div className='restaurant__register__form__bg  d-flex flex-column justify-content-center align-items-center py-5'>
                <h3>Rider</h3>
                <h5>Login...</h5>
                <RiderLoginForm />
                
            </div>
        </div>
        <Footer />
        </div>
    )
}
export default RiderLogin
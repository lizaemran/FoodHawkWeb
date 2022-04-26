import React, {useState, useEffect} from "react";
import { Container, Image } from "react-bootstrap";
import Footer from "../UserSide/components/common/Footer/Footer";
import NavBar from "../UserSide/components/common/nav/NavBar";
import verifyemail from "../img/verifyemail.svg";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPasswordRestaurantAsync, resetPasswordRiderAsync, resetPasswordUserAsync, verifyRestaurantAsync, verifyRiderAsync, verifyUserAsync } from "../redux/auth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ResetPassword = () => {
    var location = useLocation();
    var user_type = location.pathname.split("/")[1];
    var otp = location.pathname.split("/")[3];
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const resetPasswordHandler = (e) => {
        e.preventDefault();
        if(user_type === "user"){
            if(password === confirmPassword){
        dispatch(resetPasswordUserAsync({otp: otp, password: password}));
        }
        else{
            alert("Passwords do not match");
        }
    }
        else if(user_type === "rider"){
            if(password === confirmPassword){
                dispatch(resetPasswordRiderAsync({otp: otp, password: password}));
                }
                else{
                    alert("Passwords do not match");
                }        }
        else if(user_type === "restaurant"){
            if(password === confirmPassword){
                dispatch(resetPasswordRestaurantAsync({otp: otp, password: password}));
                }
                else{
                    alert("Passwords do not match");
                }        
            }
    }

    return (
        <div className="">
            <ToastContainer />
            <NavBar />
                <Container className="p-5 bg-light ">
                <div className='d-flex flex-column mt-2'>
                <label className='text-dark' style={{fontSize:'14px'}}>Password*</label>
                <input
                    className='input2 w-50 mb-1 py-3 rounded-3 mt-0  text-muted bg-light'
                    type={'password'}
                    required
                    name='password'
                    style={{fontSize:'14px'}}
                    placeholder='Enter your password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className='d-flex flex-column mt-2'>
                    <label className='text-dark' style={{fontSize:'14px'}}>Confirm Password*</label>
                    <input
                    className='input2 w-50 mb-1 py-3 rounded-3 mt-0  text-muted bg-light'
                    type={'password'}
                    required
                    name='password'
                    style={{fontSize:'14px'}}
                    placeholder='Enter your password'
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                    </div>
                    <button onClick={resetPasswordHandler} className='btn btn-primary w-50 mb-1 py-1 rounded-3 mt-0  text-white' style={{backgroundColor:'#ef5023', border:'1px solid #ef5023'}}>Submit</button>
                </Container>
            <Footer />
        </div>
    )
}
export default ResetPassword;
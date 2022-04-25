import React, {useState, useEffect} from "react";
import { Container, Image } from "react-bootstrap";
import Footer from "../UserSide/components/common/Footer/Footer";
import NavBar from "../UserSide/components/common/nav/NavBar";
import verifyemail from "../img/verifyemail.svg";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyRestaurantAsync, verifyRiderAsync, verifyUserAsync } from "../redux/auth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const VerifyEmail = () => {
    var location = useLocation();
    var user_type = location.pathname.split("/")[1];
    var otp = location.pathname.split("/")[3];
    const dispatch = useDispatch();

    useEffect(() => {
        if(user_type === "user"){
        dispatch(verifyUserAsync({otp: otp}));
        }
        else if(user_type === "rider"){
            dispatch(verifyRiderAsync({otp: otp}));
        }
        else if(user_type === "restaurant"){
            dispatch(verifyRestaurantAsync({otp: otp}));
        }
    }, []);
    return (
        <div>
            <ToastContainer />
            <NavBar />
                <Container className="p-5 text-center bg-light">
                    <Image src={verifyemail} alt='confirm-email' width={50} height={100} />
                    <h4>Congratulations!</h4>
                    <p>Your email has been verified.</p>
                    <p>You can login to your account.</p>
                    <a href="/SignIn">Click here to login</a>
                </Container>
            <Footer />
        </div>
    )
}
export default VerifyEmail;
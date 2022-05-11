import React from 'react';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement, 
    useStripe, 
    useElements
  } from "@stripe/react-stripe-js";
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
// import Stripe from 'react-stripe-checkout';
import { useDispatch } from 'react-redux';
import { placeBookingAsync } from '../redux/user';
import { clearBooking } from '../redux/BookingSlice';
const StripPayment = ({total_price, name,setName,contact,setContact,time,persons, setPersons,dateOfBooking,setDateOfBooking, r_id, u_id, products }) => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const handlePayment= async(event) =>{
        event.preventDefault();
        const response = await axios.post(
                `http://localhost:7000/api/stripe/payment-intent`,
                {
                  amount: total_price,
                },
              );
        if (response.status === 200){
        const secret = response.data;
        dispatch(placeBookingAsync({
            name : name,
            contact : contact,
            time : time,
            persons : persons,
            dateOfBooking : dateOfBooking,
            r_id : r_id,
            u_id : u_id,
            products : products,
            total_price : total_price,
        }))
        dispatch(clearBooking());
        // window.location.href = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_F9QZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQZQ&scope=read_write&redirect_uri=http://localhost:3000/payment-success`;
        window.location.href = '/account'
        const confirmPayment = await stripe.confirmCardPayment(
                  secret,
                  {
                    payment_method: {
                      card: elements.getElement(CardNumberElement),
                    },
                  }
                );
        console.log(confirmPayment)
        if(confirmPayment.paymentIntent?.status === "succeeded"){
         console.log('payment confirmed');
        }
        }}
    // const handleToken = (totalAmount, token) => {
    //     try {
    //         axios.post('http://localhost:7000/api/stripe/pay', {
    //             token : token.id,
    //             amount : totalAmount
    //     });
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }
    // }
    // const tokenHandler = (token) => {
    //     handleToken(100,token);
    // }
return (
    <div className='border border-1 border-muted p-3 rounded-3 w-100' style={{backgroundColor:'#e5e5e5'}}>
        <h6 className='text-center'>Make payment online</h6>
        {/* <Stripe
            stripeKey='pk_test_51KajdHH2gfWAYqRr4hu7kV8ReG7mWZysOuBZnhP2srhZPz7srE3YZQALfltCI6lRDuxjOwadW4OTnLsulz9kEhJd003DAk82Z6'
            token={tokenHandler}
        /> */}
        <Form className=''>
            <Form.Label style={{fontSize:'14px'}}>Card Number*</Form.Label>
            <div style={{borderBottom:'1px solid #25D366'}}>
            <CardNumberElement value='4242 4242 4242 4242' />
            </div>
            <Form.Label style={{fontSize:'14px'}}>Expiry*</Form.Label>
            <div style={{borderBottom:'1px solid #25D366'}}>
            <CardExpiryElement />
            </div>
            <Form.Label style={{fontSize:'14px'}}>CVC*</Form.Label>
            <div className='mb-2' style={{borderBottom:'1px solid #25D366'}}>
            <CardCvcElement />    
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                <Button onClick={handlePayment} className='fs-6 shadow' style={{backgroundColor:'#25D366', border:'1px solid #25D366'}}>Confirm Payment</Button>
            </div>

        </Form>
    </div>
)
}
export default StripPayment;

import React, {useState} from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import * as yup from 'yup';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TimePicker from 'react-time-picker';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {AiFillWarning} from 'react-icons/ai'
const BookTableForm = ({name,setName,contact,setContact,time, onChange,persons, setPersons,dateOfBooking,setDateOfBooking, setOrderOnline, setBook, setBookingModalShow}) => {
    const openTime = useSelector((state)=> state.restaurants?.restaurant?.openTime);
    const closeTime = useSelector((state)=> state.restaurants?.restaurant?.closeTime);
    const [minTimee, setMinTimee] = useState(openTime || '11:00'); //min time should be 1 hour after restaurant opens
    const [maxTimee, setMaxTimee] = useState(closeTime || '20:00'); //max time should be 1 hour before restaurant closes
    var schemaUserInfo = yup.object().shape({
        name: yup.string().required('Please enter name').matches(/^[a-zA-Z\s]+$/),
        contact: yup.string().required('Please enter contact').label('Contact').matches(/^[0-9]+$/).length(11),
        time: yup.string().required('Please enter time').label('Time'),
        persons: yup.string().required('Please enter persons').label('Persons').matches(/^[0-9]+$/),
      });
      const d = new Date().toISOString().split('T')[0]; //current date
      var cT, newT, cT_h, newT_h;
      useEffect(()=> {
        if(dateOfBooking === d){
            //get current time
            cT = new Date().toLocaleTimeString('en-US', { hour12: false, format: 'HH:mm' });
            function addHoursToDate(date, hours) {
                return new Date(new Date(date).setHours(date.getHours() + hours));
              }
              let myDate = new Date();
               newT = addHoursToDate(myDate,1).toTimeString().split(' ')[0];
              //get only hours and min
                cT_h = cT.split(':')[0] + ':' + cT.split(':')[1];
                newT_h = newT.split(':')[0] + ':' + newT.split(':')[1]; //minimum 1 hour later the current time
                setMinTimee(newT_h);
        }
        else{
            setMinTimee(openTime || '11:00');
        }
      },[dateOfBooking])
    return (
        <div className=' d-flex flex-column justify-content-center align-items-center py-5 bg__booking__form' >
            <Form className='d-flex flex-column p-2'  style={{backgroundColor:'rgba(255, 255, 255, 0.7)', border:'2px solid gray', borderRadius:'10px'}} >
                <Form.Label className=''>*Name</Form.Label>
                <Form.Control type='text' className='book-form' value={name} onChange={(e) => setName(e.target.value)} placeholder='John Doe'/>
                <Form.Label>*Contact</Form.Label>
                <Form.Control type='text' className='book-form' value={contact} onChange={(e) => setContact(e.target.value)} placeholder='+92-XXX-XXXXXX-X'/>
                {/* <span>{newT_h}</span> */}
                <Form.Label className=''>*Date</Form.Label>
                <Form.Control type='date' className='book-form'  min={new Date().toISOString().split('T')[0]} max={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+6).toISOString().split('T')[0]} value={dateOfBooking} onChange={(e) => setDateOfBooking(e.target.value)} placeholder='12-05-2022'/>
                <Form.Label>*Time</Form.Label>
                {/* <Form.Control type='text' className='book-form' value={time} onChange={(e) => setTime(e.target.value)} placeholder='12 '/> */}
                <TimePicker maxTime={maxTimee} minTime={minTimee} onChange={onChange} value={time} />
                <span className='text-primary' style={{fontSize:'12px'}}>Opening Hours : {openTime || '9:00'} to {closeTime || '20:00'}</span>
                <Form.Label>*No. of persons</Form.Label>
                <Form.Control type='text' className='book-form' value={persons} onChange={(e) => setPersons(e.target.value)} placeholder='4'/>
                <Button onClick={() => {
                    schemaUserInfo
                    .validate({ name: name, contact: contact,  time: time, persons: persons })
                    .then(function (valid) {
                        setBookingModalShow(true); 
                    }).catch((e) => {
                        toast.error(e.errors[0].toString());
                      });
                    }} className=' my-1 py-2 px-3 text-white' style={{backgroundColor:'#ef5023', borderRadius:'5px', border:'none', }}>Book</Button>
            </Form>
            <span className='text-warning text-center' style={{fontSize:'13px'}}><AiFillWarning className='fs-3 text-warning' /> Calcellation Policy: If you cancel at least 1 hour before booking time. You will get full refund.<br /> Otherwise, no refund will be entertained.</span>

        </div>
    )
}
export default BookTableForm
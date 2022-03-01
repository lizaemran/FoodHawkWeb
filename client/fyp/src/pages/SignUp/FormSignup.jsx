import React, {useState} from 'react';
import './Form.css';
import {useDispatch, useSelector} from 'react-redux';
import { Button, Container, Form } from 'react-bootstrap';
import { registerUserAsync } from '../../redux/auth';

const FormSignup = ({noRedirection, setModalShowLogin, setModalShowSignUp}) => {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
	const onSubmit = (event) => {
		event.preventDefault();
		dispatch(registerUserAsync({
            username: userName,
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password,
            contact: contact,
            address: address
		}));
		    setUserName("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setContact("");
        setAddress("");
	};
  return (
    <Container className='p-5 '>
      <Form  className='' noValidate onSubmit={onSubmit}>
        <h3 className='text-white'>
          Create Account
        </h3>
        <div className='d-flex flex-column'>
          <label className='text-white' style={{fontSize:'14px'}}>Username</label>
          <input
            className='w-75 mb-1 input1 fs-6 rounded-3 mt-0 border-0 text-muted'
            type='text'
            style={{fontSize:'14px'}}
            name='username'
            placeholder='Enter your username'
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <div className='d-flex flex-column'>
          <label className='text-white' style={{fontSize:'14px'}}>First Name</label>
          <input
            className='w-75 mb-1 input1 fs-6 rounded-3 mt-0 border-0 text-muted'
            type='text'
            name='username'
            style={{fontSize:'14px'}}
            placeholder='Enter your first Name'
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div className='d-flex flex-column'>
          <label className='text-white' style={{fontSize:'14px'}}>Last Name</label>
          <input
            className='w-75 mb-1 input1 fs-6 rounded-3 mt-0 border-0 text-muted'
            type='text'
            name='username'
            style={{fontSize:'14px'}}
            placeholder='Enter your last name'
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
        <div className='d-flex flex-column'>
          <label className='text-white' style={{fontSize:'14px'}}>Email</label>
          <input
            className='input1 w-75 mb-1 fs-6 p-3 rounded-3 mt-0 border-0 text-muted'
            type='email'
            name='email'
            style={{fontSize:'14px'}}
            placeholder='Enter your email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className='d-flex flex-column'>
          <label className='text-white' style={{fontSize:'14px'}}>Password</label>
          <input
            className='input1 w-75 mb-1 fs-6 p-3 rounded-3 mt-0 border-0 text-muted'
            type='password'
            name='password'
            style={{fontSize:'14px'}}
            placeholder='Enter your password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {/* <div className='d-flex flex-column'>
          <label className='text-white'>Confirm Password</label>
          <input
            className='input1 w-75 mb-1 fs-6 p-3 rounded-3 mt-0 border-0 text-muted'
            type='password'
            name='password2'
            placeholder='Confirm your password'
          />
        </div> */}
        <div className='d-flex flex-column'>
          <label className='text-white' style={{fontSize:'14px'}}>Phone Number</label>
          <input
            className='input1 w-75 mb-1 fs-6 p-3 rounded-3 mt-0 border-0 text-muted'
            type='phone'
            name='phone'
            style={{fontSize:'14px'}}
            placeholder='Enter Phone Number'
            value={contact}
            onChange={(event) => setContact(event.target.value)}
          />
        </div>
        <div className='d-flex flex-column'>
          <label className='text-white' style={{fontSize:'14px'}}>Address</label>
          <input
            className='input1 w-75 mb-1 fs-6 rounded-3 mt-0 border-0 text-muted'
            type='text'
            name='address'
            style={{fontSize:'14px'}}
            placeholder='Enter Address'
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        
        <Button type="submit" className='py-2 my-2 px-5 fs-6 form-btn' style={{background:"#EF5023", border:"none"}}>
          Sign up
        </Button>
        {noRedirection ? (
           <span className='text-white' style={{fontSize:'12px', cursor:'pointer'}}>
           <br />Already have an account? <u onClick={() => {setModalShowLogin(true); setModalShowSignUp(false);}}>Login</u>
         </span>
        ) : (
          <span className='text-white' style={{fontSize:'12px'}}>
          <br />Already have an account? <a href='/SignIn'>Login</a>
        </span>
        )}
       
      </Form>
    </Container>
  );
};

export default FormSignup;
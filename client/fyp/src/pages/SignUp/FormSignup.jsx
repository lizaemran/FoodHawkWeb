import React, {useState} from 'react';
import './Form.css';
import {useDispatch} from 'react-redux';
import { Button, Container, Form } from 'react-bootstrap';
import { registerUserAsync } from '../../redux/auth';

const FormSignup = () => {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
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
        <h1 className='text-white'>
          Create Account
        </h1>
        <div className='d-flex flex-column'>
          <label className='text-white'>Username</label>
          <input
            className='w-75 mb-3 input1 fs-6 rounded-3 mt-0 border-0 text-muted'
            type='text'
            name='username'
            placeholder='Enter your username'
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <div className='d-flex flex-column'>
          <label className='text-white'>First Name</label>
          <input
            className='w-75 mb-3 input1 fs-6 rounded-3 mt-0 border-0 text-muted'
            type='text'
            name='username'
            placeholder='Enter your first Name'
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div className='d-flex flex-column'>
          <label className='text-white'>Last Name</label>
          <input
            className='w-75 mb-3 input1 fs-6 rounded-3 mt-0 border-0 text-muted'
            type='text'
            name='username'
            placeholder='Enter your last name'
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
        <div className='d-flex flex-column'>
          <label className='text-white'>Email</label>
          <input
            className='input1 w-75 mb-3 fs-6 p-3 rounded-3 mt-0 border-0 text-muted'
            type='email'
            name='email'
            placeholder='Enter your email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className='d-flex flex-column'>
          <label className='text-white'>Password</label>
          <input
            className='input1 w-75 mb-3 fs-6 p-3 rounded-3 mt-0 border-0 text-muted'
            type='password'
            name='password'
            placeholder='Enter your password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {/* <div className='d-flex flex-column'>
          <label className='text-white'>Confirm Password</label>
          <input
            className='input1 w-75 mb-3 fs-6 p-3 rounded-3 mt-0 border-0 text-muted'
            type='password'
            name='password2'
            placeholder='Confirm your password'
          />
        </div> */}
        <div className='d-flex flex-column'>
          <label className='text-white'>Phone Number</label>
          <input
            className='input1 w-75 mb-3 fs-6 p-3 rounded-3 mt-0 border-0 text-muted'
            type='phone'
            name='phone'
            placeholder='Enter Phone Number'
            value={contact}
            onChange={(event) => setContact(event.target.value)}
          />
        </div>
        <div className='d-flex flex-column'>
          <label className='text-white'>Address</label>
          <input
            className='input1 w-75 mb-3 fs-6 rounded-3 mt-0 border-0 text-muted'
            type='text'
            name='address'
            placeholder='Enter Address'
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        
        <Button type="submit" className='py-2 px-5 fs-6 form-btn' style={{background:"#EF5023", border:"none"}}>
          Sign up
        </Button>
        <span className='text-white' style={{fontSize:'12px'}}>
          <br />Already have an account? <a href='/SignIn'>Login</a>
        </span>
      </Form>
    </Container>
  );
};

export default FormSignup;
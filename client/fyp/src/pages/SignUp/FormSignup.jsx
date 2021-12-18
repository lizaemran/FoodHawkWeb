import React from 'react';
import './Form.css';
import { Button, Container, Form } from 'react-bootstrap';

const FormSignup = () => {
  return (
    <Container className='p-5 '>
      <Form  className='' noValidate>
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
          />
        </div>
        <div className='d-flex flex-column'>
          <label className='text-white'>Email</label>
          <input
            className='input1 w-75 mb-3 fs-6 p-3 rounded-3 mt-0 border-0 text-muted'
            type='email'
            name='email'
            placeholder='Enter your email'
          />
        </div>
        <div className='d-flex flex-column'>
          <label className='text-white'>Password</label>
          <input
            className='input1 w-75 mb-3 fs-6 p-3 rounded-3 mt-0 border-0 text-muted'
            type='password'
            name='password'
            placeholder='Enter your password'
          />
        </div>
        <div className='d-flex flex-column'>
          <label className='text-white'>Confirm Password</label>
          <input
            className='input1 w-75 mb-3 fs-6 p-3 rounded-3 mt-0 border-0 text-muted'
            type='password'
            name='password2'
            placeholder='Confirm your password'
          />
        </div>
        <div className='d-flex flex-column'>
          <label className='text-white'>Phone Number</label>
          <input
            className='input1 w-75 mb-3 fs-6 p-3 rounded-3 mt-0 border-0 text-muted'
            type='phone'
            name='phone'
            placeholder='Enter Phone Number'
          />
        </div>
        <div className='d-flex flex-column'>
          <label className='text-white'>Address</label>
          <input
            className='input1 w-75 mb-3 fs-6 rounded-3 mt-0 border-0 text-muted'
            type='text'
            name='address'
            placeholder='Enter Address'
          />
        </div>
        
        <Button className='py-2 px-5 fs-6' style={{background:"#EF5023", border:"none"}} type='submit'>
          Sign up
        </Button>
        <span className='text-white fs-6'>
          <br />Already have an account? Login <a href='/SignIn'>here</a>
        </span>
      </Form>
    </Container>
  );
};

export default FormSignup;
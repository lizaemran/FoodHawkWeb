import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FormLoginSub = () => {
    return (
        <Container className='p-5 '>
        <Form  className='' noValidate>
          <h1 className='text-white'>
            Log In
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
            <label className='text-white'>Password</label>
            <input
              className='input1 w-75 mb-3 fs-6 p-3 rounded-3 mt-0 border-0 text-muted'
              type='password'
              name='password'
              placeholder='Enter your password'
            />
          </div>
         
          <Link to="/">
          <Button className='py-2 px-5 fs-6' style={{background:"#EF5023", border:"none"}} type='submit'>
            Login
          </Button>
          </Link>
          <span className='text-white '>
            <br />Don't Have An Account Yet? Register <a href='/SignUp'>here</a>
          </span>
        </Form>
      </Container>
    )
}

export default FormLoginSub

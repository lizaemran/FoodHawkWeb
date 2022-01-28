import React, {useState} from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { loginUserAsync } from '../../redux/auth';

const FormLoginSub = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
	const onSubmit = (event) => {
		event.preventDefault();
		dispatch(loginUserAsync({
            username: userName,
            password: password,
		}));
		    setUserName("");
        setPassword("");
	};
    return (
        <Container className='p-5 '>
        <Form  className='' noValidate onSubmit={onSubmit}>
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
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
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
         
          <Button type="submit" className='py-2 px-5 fs-6 form-btn' style={{background:"#EF5023", border:"none"}} type='submit'>
            Login
          </Button>
          <span className='text-white' style={{fontSize:'12px'}}>
            <br />Don't Have An Account Yet? <a href='/SignUp'>Register</a>
          </span>
        </Form>
      </Container>
    )
}

export default FormLoginSub

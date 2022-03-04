import React, {useState} from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { loginUserAsync } from '../../redux/auth';

const FormLoginSub = ({noRedirection, setModalShowLogin, setModalShowSignUp}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
	const onSubmit = (event) => {
		event.preventDefault();
		dispatch(loginUserAsync({
            username: userName,
            password: password,
            noRedirection: noRedirection,

		}));
    if(noRedirection){
      setModalShowLogin(false);
    }
		    setUserName("");
        setPassword("");
	};
    return (
        <Container className='p-5 '>
        <Form  className='' noValidate onSubmit={onSubmit}>
          <h3 className='text-white'>
            Log In
          </h3>
          <div className='d-flex flex-column'>
            <label className='text-white' style={{fontSize:'14px'}}>Username</label>
            <input
              className='w-75 mb-1 input1 rounded-3 mt-0 border-0 text-muted bg-light'
              type='text'
              name='username'
              placeholder='Enter your username'
              style={{fontSize:'14px'}}
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
          </div>
          <div className='d-flex flex-column'>
            <label className='text-white' style={{fontSize:'14px'}}>Password</label>
            <input
              className='input1 w-75 mb-1 p-3 rounded-3 mt-0 border-0 text-muted bg-light'
              type='password'
              name='password'
              style={{fontSize:'14px'}}
              placeholder='Enter your password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
         
          <Button type="submit" className='py-2 px-5 fs-6 form-btn my-2' style={{background:"#EF5023", border:"none"}}>
            Login
          </Button>
          {noRedirection  ? (
            <span className='text-white' style={{fontSize:'12px', cursor:'pointer'}}>
            <br />Don't Have An Account Yet? <u onClick={() => {setModalShowSignUp(true); setModalShowLogin(false);}}>Register</u>
          </span>
          ) : (
            <span className='text-white' style={{fontSize:'12px'}}>
            <br />Don't Have An Account Yet? <a href='/SignUp'>Register</a>
          </span>
          )}
          
        </Form>
      </Container>
    )
}

export default FormLoginSub

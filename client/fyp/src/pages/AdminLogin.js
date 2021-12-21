import React, {useState} from 'react'
import { Container, Form, Row, Button } from 'react-bootstrap'
import { loginAdminAsync } from '../redux/auth'
import Footer from '../UserSide/components/common/Footer/Footer'
import NavBar from '../UserSide/components/common/nav/NavBar'
import { useDispatch } from 'react-redux';
const AdminLogin = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
	const onSubmit = (event) => {
		event.preventDefault();
		dispatch(loginAdminAsync({
            username: userName,
            password: password,
		}));
		setUserName("");
        setPassword("");
	};
    return (
        <>
           <NavBar />
           <Container className='p-5 d-flex justify-content-center align-items-center bg-dark '>
           <Form  className='p-3' noValidate onSubmit={onSubmit}>
          <h1 className='text-white'>
            Log In
          </h1>
          <div className='d-flex flex-column'>
            <label className='text-white'>Username</label>
            <input
              className='w-100 mb-3 input1 fs-6 rounded-3 mt-0 border-0 text-muted'
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
              className='w-100 mb-3 p-3 input1 fs-6 rounded-3 mt-0 border-0 text-muted'
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
          {/* <span className='text-white '>
            <br />Don't Have An Account Yet? Register <a href='/SignUp'>here</a>
          </span> */}
        </Form>
           </Container>
           <Footer /> 
        </>
    )
}

export default AdminLogin

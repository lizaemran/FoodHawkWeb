import React, {useState, useEffect} from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import {toast} from 'react-toastify';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { forgetPasswordUserAsync, loginUserAsync } from '../../redux/auth';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
const FormLoginSub = ({noRedirection, setModalShowLogin, setModalShowSignUp}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  let schemaSignIn = yup.object().shape({
    username: yup.string().required('Please enter username'),
    password: yup.string().required('Please enter password').min(5).label('Password')
  });
	const onSubmit = (event) => {
		event.preventDefault();
    schemaSignIn
    .validate({ username: userName, password: password })
    .then(function (valid) {
		dispatch(loginUserAsync({
            username: userName,
            password: password,
            noRedirection: noRedirection,

		}));
    localStorage.setItem('rememberMe', rememberMe); //for remember me functionality
    localStorage.setItem('buyer-username', rememberMe ? userName : '');
    localStorage.setItem('buyer-password', rememberMe ? password : '');
        // setUserName("");
        // setPassword("");
    }).catch((e) => {
      toast.error(e.errors[0].toString());
    });
    if(noRedirection){
      setModalShowLogin(false);
    }
		    // setUserName("");
        // setPassword("");
	};
  useEffect(() => {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    let usernameLocal, passLocal, rememberMeLocal;
    // if (isbuyer) {
      usernameLocal = rememberMe ? localStorage.getItem('buyer-username') : '';
      passLocal = rememberMe ? localStorage.getItem('buyer-password') : '';
      rememberMeLocal = localStorage.getItem('rememberMe');
      if (rememberMeLocal && usernameLocal.length !== 0 && passLocal.length !== 0) {
        setRememberMe(true);
      }
      setUserName(usernameLocal);
      setPassword(passLocal);
    // }
    // if (isphotographer) {
    //   mailPLocal = rememberMe ? localStorage.getItem('photographer-email') : '';
    //   passPLocal = rememberMe ? localStorage.getItem('photographer-password') : '';
    //   rememberMePLocal = localStorage.getItem('rememberMe');
    //   if (rememberMePLocal && mailPLocal.length !== 0 && passPLocal.length !== 0) {
    //     setRememberMe(true);
    //   }
    //   setEmail(mailPLocal);
    //   setPassword(passPLocal);
    // }

  }, [])

const forgetPasswordHandler = (e) => {
  e.preventDefault();
  dispatch(forgetPasswordUserAsync({
    email: email,
  }))
  setModalShow(false);
}

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Forgot Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex flex-column justify-content-center align-items-center'>
          <h5 className=''>Enter Your Email</h5>
          <input
              className='w-50 mb-1 input2 py-3 rounded-3  text-muted bg-light  '
              type='text'
              name='email'
              placeholder='Enter your email'
              style={{fontSize:'14px'}}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={forgetPasswordHandler} style={{backgroundColor:'#ef5023', border:'1px solid #ef5023'}}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }
    return (
        <Container className='p-5 ' style={{backgroundColor:'#e9e9e1'}}>
        <Form  className='' noValidate onSubmit={onSubmit}>
          <h3 className='text-dark'>
            Sign In...
          </h3>
          <div className='d-flex flex-column'>
            <label className='text-dark' style={{fontSize:'14px'}}>Username</label>
            <input
              className='w-75 mb-1 input2 py-3 rounded-3  text-muted bg-light'
              type='text'
              name='username'
              placeholder='Enter your username'
              style={{fontSize:'14px'}}
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
          </div>
          <div className='d-flex flex-column mt-2'>
            <label className='text-dark' style={{fontSize:'14px'}}>Password</label>
            <div className='pwd-container'>
            <input
              className='input2 w-75 mb-1 py-5 rounded-3 mt-0  text-muted bg-light'
              type={showPass ? 'text' : 'password'}
              required
              name='password'
              style={{fontSize:'14px'}}
              placeholder='Enter your password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {showPass ? (<AiFillEye onClick={(e) => setShowPass(false)} className="pass-show" />) : (<AiFillEyeInvisible onClick={(e) => setShowPass(true)} className="pass-show" />)}
            </div>
            <a className='' onClick={() => setModalShow(true)} style={{fontSize:'12px', cursor:'pointer'}}>Forgot Password?</a>
            <Form.Group className="d-flex align-items-center mt-2"><input aria-label="Checkbox for following text input" type="Checkbox" className="form-check-input fs-6" style={{}} onClick={() => setRememberMe(!rememberMe)} value={rememberMe} checked={rememberMe} />
            <Form.Label className="my-auto mx-1 text-dark " style={{fontSize:'12px'}}>Remember Me</Form.Label></Form.Group>
          </div>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <Button type="submit" className='py-2 px-5 fs-6 form-btn my-2' style={{background:"#EF5023", border:"none"}}>
            Login
          </Button>
          {noRedirection  ? (
            <span className='text-dark' style={{fontSize:'12px', cursor:'pointer'}}>
            <br />Don't Have An Account Yet? <u onClick={() => {setModalShowSignUp(true); setModalShowLogin(false);}}>Register</u>
          </span>
          ) : (
            <span className='text-dark' style={{fontSize:'12px'}}>
            <br />Don't Have An Account Yet? <a href='/SignUp'>Register</a>
          </span>
          )}
          
        </Form>
      </Container>
    )
}

export default FormLoginSub

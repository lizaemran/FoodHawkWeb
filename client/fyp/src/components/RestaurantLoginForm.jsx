import React, {useState} from 'react'
import { Form } from 'react-bootstrap'
import * as yup from 'yup';
import {toast} from 'react-toastify';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { loginRestaurantAsync } from '../redux/auth';
const RestaurantLoginForm = () => {
    const [username, setUserName] = useState('');
    const [passwordd, setPasswordd] = useState('');
    const dispatch = useDispatch();
    let schemaSignIn = yup.object().shape({
        username: yup.string().required('Please enter username'),
        password: yup.string().required('Please enter password').min(5).label('Password')
      });
      const submitForm = (e) => {
        e.preventDefault();
          schemaSignIn
            .validate({ username: username, password: passwordd })
            .then(function (valid) {
               dispatch(loginRestaurantAsync({
                   username: username,
                   password: passwordd
               }))
                setUserName("");
                setPasswordd("");
            }).catch((e) => {
              toast.error(e.errors[0].toString());
            });
      }

    return (
        <div>
            <Form  className='d-flex flex-column'>
            <Form.Label className='pt-1'>Username*
                <Form.Control type='text' className='' 
                 required
                 value={username}
                 placeholder="abc123"
                 onChange={(e) => setUserName(e.target.value)}
                style={{border:'none', borderRadius:'5px'}}/>
                </Form.Label>
                <Form.Label className='pt-1'>Password*
                <Form.Control type='password' 
                 required
                 value={passwordd}
                 placeholder="•••••"
                 onChange={(e) => setPasswordd(e.target.value)} />
                </Form.Label>
                <a onClick={submitForm} className='mt-2 text-center text-white text-decoration-none py-2 px-3' style={{backgroundColor:'#ef5023', borderRadius:'5px', cursor:'pointer'}}>Login</a>
            </Form>
        </div>
    )
}
export default RestaurantLoginForm
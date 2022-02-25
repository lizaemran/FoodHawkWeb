import React, {useState} from 'react';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from 'react-redux';
import { registerRiderAsync } from '../redux/auth';
const RiderSignUpForm = () => {
    const dispatch = useDispatch();
    const [username, setUserName] = useState('');
    const [passwordd, setPasswordd] = useState('');
    const [emaill, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    let schemaSignUpP = yup.object().shape({
        username: yup.string().required('Please enter username'),
        password: yup.string().required('Please enter password').min(5).label('Password'),
        email: yup.string().required().email().label('Email'),
        name: yup.string().required('Please enter name'),
        phone: yup.string().required().matches(/^[0-9]+$/).length(11),
      });
      const submitForm = (e) => {
        e.preventDefault();
          schemaSignUpP
            .validate({ username: username, password: passwordd, email: emaill, name: name, phone: phone })
            .then(function (valid) {
                dispatch(registerRiderAsync({
                    username: username,
                    password: passwordd,
                    email: emaill,
                    name: name,
                    phone: phone,
                }));
                setUserName("");
                setPasswordd("");
                setEmail("");
                setName("");
                setPhone("");
            }).catch((e) => {
              toast.error(e.errors[0].toString());
            });
      }

    return (
        <div>
            <Form className='d-flex flex-column'>
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
                <Form.Label className='pt-1'>Email*
                <Form.Control type='email'
                 required
                 value={emaill}
                 placeholder="abc123@gmail.com"
                 onChange={(e) => setEmail(e.target.value)} />
                </Form.Label>
                <Form.Label className='pt-1'>Name*
                <Form.Control type='text' 
                 required
                 value={name}
                 placeholder="abc"
                 onChange={(e) => setName(e.target.value)}
                 style={{border:'none', borderRadius:'5px'}}/>
                </Form.Label>
                <Form.Label className='pt-1'>Phone Number*
                <Form.Control type='text' 
                 required
                 value={phone}
                 placeholder="+92-XXX-XXXXXXX"
                 onChange={(e) => setPhone(e.target.value)}
                 style={{border:'none', borderRadius:'5px'}}/>
                </Form.Label>
                <a onClick={submitForm} className='mt-2 text-center text-white text-decoration-none py-2 px-3' style={{backgroundColor:'#ef5023', borderRadius:'5px', cursor:'pointer'}}>Register</a>
            </Form>
        </div>
    )
}
export default RiderSignUpForm;
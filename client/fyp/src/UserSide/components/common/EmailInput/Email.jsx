import { colors } from '@material-ui/core';
import React from 'react'
import {Form} from 'react-bootstrap'
import "../EmailInput/Email.css";
function Email() {
    return (
        <div>
           <Form >
              <Form.Control  style={{border:"none"}}className="input1" type="email" placeholder="Example@email.com"/>
         </Form> 
        </div>
    )
}

export default Email

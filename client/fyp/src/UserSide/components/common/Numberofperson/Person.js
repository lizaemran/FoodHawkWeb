import React, { Component } from 'react';
import "../Numberofperson/Person.css";
import PersonIcon from '@material-ui/icons/Person';
import { Form } from 'react-bootstrap';
class Person extends Component {
 constructor() {
 super();
 this.state = {
  number: ''
};
 this.handleChange = this.handleChange.bind(this);
 this.handleSubmit = this.handleSubmit.bind(this);
}

    handleChange(event) {
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      this.setState({number: event.target.value})
    }
}
 handleSubmit(event) {
     console.log(this.state);
     event.preventDefault();
}
   render() {
    return (
      <div>
       <form   onSubmit={this.handleSubmit}>
        <Form.Control type="text"
        className="input1"
        style={{border:"none"}}
            value={this.state.number} 
            onChange={this.handleChange}
            placeholder='Person' />
            {/* <PersonIcon className='icon'/> */}
        </form>
     
       </div>
    );

  }

}
export default Person
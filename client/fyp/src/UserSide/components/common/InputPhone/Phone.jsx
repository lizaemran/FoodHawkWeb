import React, { Component } from 'react';
import "../InputPhone/Phone.css";
import { Form } from 'react-bootstrap';
class Phone extends Component {
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
       
            {/* <PhoneIphoneIcon className='icon'/> */}
        </form>
     
       </div>
    );

  }

}


export default Phone
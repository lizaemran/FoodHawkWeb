import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap'

const BookTableForm = () => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [time, setTime] = useState('');
    const [persons, setPersons] = useState('');
    return (
        <div className=' d-flex flex-column justify-content-center align-items-center py-5 bg__booking__form' >
            <Form className='d-flex flex-column p-4'  style={{backgroundColor:'rgba(255, 255, 255, 0.7)', border:'2px solid gray', borderRadius:'10px'}} >
                <Form.Label className=''>*Name</Form.Label>
                <Form.Control type='text' className='book-form' value={name} onChange={(e) => setName(e.target.value)} placeholder='John Doe'/>
                <Form.Label>*Contact</Form.Label>
                <Form.Control type='text' className='book-form' value={contact} onChange={(e) => setContact(e.target.value)} placeholder='+92-XXX-XXXXXX-X'/>
                <Form.Label>*Time</Form.Label>
                <Form.Control type='text' className='book-form' value={time} onChange={(e) => setTime(e.target.value)} placeholder='12:00 - 13:00'/>
                <Form.Label>*No. of persons</Form.Label>
                <Form.Control type='text' className='book-form' value={persons} onChange={(e) => setPersons(e.target.value)} placeholder='4'/>
                <Button className=' my-1 py-2 px-3 text-white' style={{backgroundColor:'#ef5023', borderRadius:'5px', border:'none', }}>Book</Button>
            </Form>
        </div>
    )
}
export default BookTableForm
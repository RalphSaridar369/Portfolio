import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Contact.scss'
import { InputGroup } from 'react-bootstrap';
import { useState } from 'react';

function Contact() {

    const [mailData,setMailData] = useState({
        email:"",
        message:"",
    })

    const onChange =(key,value)=>{
        setMailData({
            ...mailData,
            [key]:value
        })    
    }

  return (
    <Form className='form-container'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label><h4>Contact Us</h4></Form.Label>
        <Form.Control type="email" placeholder="Email" value={mailData.email} onChange={(e)=>onChange('email',e.currentTarget.value)}/>
      </Form.Group>

      <InputGroup className="mb-3">
        <Form.Control as="textarea" aria-label="With textarea" placeholder='Message' value={mailData.message} onChange={(e)=>onChange('message',e.currentTarget.value)}/>
      </InputGroup>
      <Button type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Contact;
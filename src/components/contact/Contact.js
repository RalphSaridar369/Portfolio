import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Contact.scss";
import { InputGroup } from "react-bootstrap";
import { useState } from "react";
import MailCanvas from "./canvas/Mail";

function Contact(props) {
  const [mailData, setMailData] = useState({
    subject: "",
    message: "",
  });

  const onChange = (key, value) => {
    setMailData({
      ...mailData,
      [key]: value,
    });
  };

  const onEmailSend = (e) => {
    if (!mailData.subject || !mailData.message) {
      alert("Please fill the input fields before sending an email");
    } else {
      window.location.href = `mailto:ralphsaridar@hotmail.com?subject=${mailData.subject}&body=${mailData.message}`;
    }
    e.preventDefault();
  };

  return (
    <div id="#contact" className="contact-wrapper">
      <div className="contact-container">
        <Form className={`form-container ${props.className}`}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <h5>Send me an email</h5>
            <Form.Control
              type="text"
              placeholder="Subject"
              value={mailData.subject}
              onChange={(e) => onChange("subject", e.currentTarget.value)}
            />
          </Form.Group>

          <InputGroup className="mb-3">
            <Form.Control
              as="textarea"
              aria-label="With textarea"
              placeholder="Message"
              value={mailData.message}
              onChange={(e) => onChange("message", e.currentTarget.value)}
            />
          </InputGroup>
          <Button type="submit" onClick={(e) => onEmailSend(e)}>
            Submit
          </Button>
        </Form>
        <MailCanvas />
      </div>
    </div>
  );
}

export default Contact;

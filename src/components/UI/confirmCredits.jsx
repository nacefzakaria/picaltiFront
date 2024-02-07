// ConfirmCredits.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Input } from 'reactstrap';

const socialLinks = [
  {
    url: '#',
    icon: 'ri-facebook-line',
  },
  {
    url: '#',
    icon: 'ri-instagram-line',
  },
  {
    url: '#',
    icon: 'ri-linkedin-line',
  },
  {
    url: '#',
    icon: 'ri-twitter-line',
  },
];

const ConfirmCredits = () => {
  const [confirmationNumber, setConfirmationNumber] = useState('');
  const [success, setSuccess] = useState(null); // Define success state variable and its setter function
  const [error, setError] = useState(null); // Define error state variable and its setter function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('your_verification_endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ confirmationNumber }),
      });
      
      if (response.ok) {
        // Backend verification successful
        const data = await response.json();
        // Extract the amount from the response data
        const { amount } = data;
        // Show success message with the received amount
        setSuccess(`Credits added successfully. Your new balance is: ${amount}`);
      } else {
        // Backend verification failed
        // Show error message to the user
        setError('Verification failed. Please try again.');
      }
    } catch (error) {
      // Error while sending the request
      console.error('Error verifying confirmation number:', error);
      // Set an error message to be displayed to the user
      setError('Error verifying confirmation number. Please try again.');
    }
  };
  

  const handleChange = (e) => {
    setConfirmationNumber(e.target.value);
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="7" md="7">
            <h6 className="fw-bold mb-4">Confirm Credits</h6>
            <span>a message has sent to your mail with confirmation credits can you Conferme with the code you receive</span>

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Input
                  className="shadow-sm form-control"
                  type="text"
                  name="confirmationNumber"
                  placeholder="Confirmation Number"
                  value={confirmationNumber}
                  onChange={handleChange}
                />
              </FormGroup>

              <button className="contact__btn shadow" type="submit">
                Confirm
              </button>
            </Form>
          </Col>
           {/* eslint-disable-next-line */}
      {error && <div className="error-message text-danger">{error}</div>}
      {/* eslint-disable-next-line */}
      {success && <div className="success-message text-success">{success} <a href='/dashboard'>Go to the dashboard</a></div>}
          <Col lg="5" md="5">
            <div className="contact__info">
              <h6 className="fw-bold mt-4">Follow Us</h6>

              <div className="d-flex align-items-center gap-4 mt-3">
                {socialLinks.map((item, index) => (
                  <a href={item.url} key={index} className="social__link-icon">
                    <i className={item.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ConfirmCredits;

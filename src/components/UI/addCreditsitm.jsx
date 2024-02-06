import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Helmet from '../Helmet/Helmet';
import CommonSection from './CommonSection';
import contactImage from '../../assets/all-images/cars-img/nissan-offer.png';

import '../../styles/contact.css';

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

const AddCredits = ({ onFormSuccess }) => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    amount: '',
  });
  const [addCreditsSuccess, setAddCreditsSuccess] = useState('');
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('your_verification_endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });
      
      if (response.ok) {
        // Backend verification successful
        const data = await response.json();
        // Extract the amount from the response data
        onFormSuccess();
       
      } else {
        // Backend verification failed
        // Show error message to the user
        setError('Verification failed. Please try again.');
      }
    } catch (error) {
      // Error while sending the request
      console.error('Error verifying confirmation number:', error);
      // Set an error message to be displayed to the user
      setError('something is wrong try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Helmet title="Add Credits">
      <CommonSection title="Add Credits" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Add Credits</h6>
              {error && <div className="error-message text-danger">{error}</div>}
              <Form onSubmit={handleSubmit}>
                <FormGroup className="contact__form">
                  <Input
                    className="shadow-sm form-control"
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    onChange={handleChange}
                    value={formData.cardNumber}
                  />
                </FormGroup>

                <Row>
                  <Col md="6">
                    <FormGroup className="contact__form">
                      <Input
                        className="shadow-sm form-control"
                        type="text"
                        name="expiryDate"
                        placeholder="Expiry Date"
                        onChange={handleChange}
                        value={formData.expiryDate}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup className="contact__form">
                      <Input
                        className="shadow-sm form-control"
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        onChange={handleChange}
                        value={formData.cvv}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup className="contact__form">
                  <Input
                    className="shadow-sm form-control"
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    onChange={handleChange}
                    value={formData.amount}
                  />
                </FormGroup>

                <button className="contact__btn shadow" type="submit">
                  Add Credits
                </button>
              </Form>
              {addCreditsSuccess && <p className="mt-3 text-success">{addCreditsSuccess}</p>}
            </Col>

            <Col lg="5" md="5">
              <div className="contact__info">
                <img src={contactImage} alt="Contact Image" className="img-fluid" />

                <h6 className="fw-bold mt-4">Follow Us</h6>

                <div className="d-flex align-items-center gap-4 mt-3">
                  {socialLinks.map((item, index) => (
                    <Link to={item.url} key={index} className="social__link-icon">
                      <i className={item.icon}></i>
                    </Link>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AddCredits;

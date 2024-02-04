import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import contactImage from '../assets/all-images/cars-img/nissan-offer.png';
import '../styles/contact.css';

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

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('your_login_api_endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Redirect to the dashboard or desired page after successful login
        navigate('/dashboard');
      } else {
        // Handle login errors or show error message
        setLoginError('Login failed. Please check your email and password.');
      }
    } catch (error) {
      console.error('Error logging in', error);
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
    <Helmet title="Login">
      <CommonSection title="Login Now" />
      <section>
        <Container>
          <Row className="justify-content-center">
            <Col lg="5" md="8">
              <h6 className="fw-bold mb-4">Login</h6>
              {loginError && <p className="error-message text-danger">{loginError}</p>}
              {registerSuccess && <p className="success-message text-success">{registerSuccess}</p>}
              <Form onSubmit={handleSubmit}>
                <FormGroup className="Contact__form">
                  <Input
                    className="shadow-sm form-control"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="Contact__form">
                  <Input
                    className="shadow-sm form-control"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </FormGroup>

                <button className="contact__btn shadow" type="submit">
                  Login
                </button>
              </Form>

              <p className="mt-3">
                Don't have an account? <Link to="/register" className='text-success'>Register here</Link>
              </p>
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

export default Login;

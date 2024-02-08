import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';

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

const AddBike = () => {
  const navigate = useNavigate(); // Create a history object to handle navigation
  const [formData, setFormData] = useState({
    bikeName: '',
    brand: '',
    type: '',
    price: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission, including image upload
    console.log('Form Data:', formData);
    navigate("/admin-dash"); // Redirect to admin dashboard after successful submission
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    // Handle image upload
    const imageFile = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: imageFile,
    }));
    // Display image preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <Helmet title="Add Bike">
      <CommonSection title="Add a Bike" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Add a New Bike</h6>

              <Form onSubmit={handleSubmit}>
                <FormGroup className="contact__form">
                  <Input
                    className="shadow-sm form-control"
                    type="text"
                    name="model"
                    placeholder="Model"
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="contact__form">
                  <Input
                    className="shadow-sm form-control"
                    type="text"
                    name="state"
                    placeholder="State"
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="contact__form">
                  <Input
                    className="shadow-sm form-control"
                    type="number"
                    name="hourlyPrice"
                    placeholder="Hourly Price"
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="contact__form">
                  <Input
                    className="shadow-sm form-control"
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="contact__form">
                  <Input
                    className="shadow-sm form-control"
                    type="text"
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="contact__form">
                  <Input
                    className="form-control"
                    type="file"
                    name="imagePath"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </FormGroup>

                <FormGroup className="contact__form">
                  <Input
                    className="shadow-sm form-control"
                    type="text"
                    name="ownerId"
                    placeholder="Owner ID"
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="contact__form">
                  <Input
                    className="shadow-sm form-control"
                    type="text"
                    name="type"
                    placeholder="Type"
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="contact__form">
                  <Input
                    className="shadow-sm form-control"
                    type="text"
                    name="speed"
                    placeholder="Speed"
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="contact__form">
                  <Input
                    className="shadow-sm form-control"
                    type="text"
                    name="station"
                    placeholder="Station"
                    onChange={handleChange}
                  />
                </FormGroup>

                <button className="contact__btn shadow" type="submit">
                  Submit
                </button>
              </Form>

            </Col>

            <Col lg="5" md="5">
              <div className="contact__info">
                {/* Display uploaded image preview */}
                {imagePreview && (
                  <img src={imagePreview} alt="Uploaded Bike" className="img-fluid" />
                )}
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

export default AddBike;

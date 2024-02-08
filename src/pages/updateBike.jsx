import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import carData from "../assets/data/carData";

const UpdateBikeDetails = () => {
    const navigate = useNavigate();
  const { slug } = useParams();
  const [bikeDetails, setBikeDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});

  useEffect(() => {
    const foundBike = carData.find((item) => item.carName === slug);
    setBikeDetails(foundBike);
    // Initialize updated details with the existing bike details
    setUpdatedDetails(foundBike);
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the updatedDetails state with the changed value
    setUpdatedDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle updating bike details here
    console.log("Updated Bike Details:", updatedDetails);
    navigate("/admin-dash"); 
  };

  return (
    <Helmet title={`Update ${bikeDetails.carName} Details`}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={bikeDetails.imgUrl} alt="" className="w-100" />
            </Col>

            <Col lg="6">
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Input
                    type="text"
                    name="model"
                    placeholder="Model"
                    value={updatedDetails.model || ""}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={updatedDetails.state || ""}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Input
                    type="number"
                    name="hourlyPrice"
                    placeholder="Hourly Price"
                    value={updatedDetails.price || ""}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={updatedDetails.brand || ""}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={updatedDetails.description || ""}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Input
                    type="text"
                    name="imagePath"
                    placeholder="Image Path"
                    value={updatedDetails.imagePath || ""}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Input
                    type="text"
                    name="type"
                    placeholder="Type"
                    value={updatedDetails.type || ""}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Input
                    type="text"
                    name="speed"
                    placeholder="Speed"
                    value={updatedDetails.speed || ""}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Input
                    type="text"
                    name="station"
                    placeholder="Station"
                    value={updatedDetails.station || ""}
                    onChange={handleChange}
                  />
                </FormGroup>

                <button className="contact__btn shadow" type="submit">Update Bike </button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default UpdateBikeDetails;

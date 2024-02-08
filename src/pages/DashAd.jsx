import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import carData from "../assets/data/carData";
import CarItem from "../components/UI/CarItemm";
import contactImage from '../assets/all-images/cars-img/nissan-offer.png';
import userData from "../assets/data/userData";
import fetchReservationHistory from "../assets/data/ReservationHistory";

import '../styles/contact.css';
const Dashboard = () => {
    const [userProfileData, setUserProfileData] = useState([]);
    const [reservationHistory, setReservationHistory] = useState([]);
    const [solde, setSolde] = useState(0);
    useEffect(() => {
        // Access the fetched user data here
        setUserProfileData(userData);

        // Fetch reservation history using sessionToken and userType
        const sessionToken = localStorage.getItem('sessionToken');
        const userType = localStorage.getItem('userType');
        
        if (sessionToken && userType) {
        fetchReservationHistory(sessionToken, userType)
            .then((history) => setReservationHistory(history))
            .catch((error) => console.error('Error fetching reservation history:', error));
            const soldeFromUserData = userData[0]?.solde || 0;
            setSolde(soldeFromUserData);
        }
    }, []);
    return (

        <Helmet title="Dashboard">
            
            <section>
            <Container>
                <Row>
                <Row>
                <Col lg="6" className="text-center mb-5">
                    <h6 className="section__subtitle">Welcome admin</h6>
                   
                       
                    <h2 className="section__title">Mr. Zakaria</h2>
                    
                </Col>
                
                <Col lg="6" className="text-center mb-5">
                {/* Solde Section */}
                <div className="solde-section">
                    <h2>Bikes: 8</h2>
                    <div className="buttons-container">
                    <Button
                        className="car__item-btn car__btn-rent"
                        
                        onClick={() => window.location.href = '/add-bike'}
                        style={{ marginRight: '10px' }}
                    >
                        Add Bike
                    </Button>

                   

                    <Button
                        className="car__item-btn car__btn-details"
                        color="success"
                        onClick={() => window.location.href = '/add-admin'}
                    >
                        Add admin
                    </Button>
                    </div>
                    <div >
                    <Button
                        className="submit-button"
                        onClick={() => window.location.href = '/add-owner'}
                        style={{ marginRight: '10px' }}
                    >
                        Add Owner
                    </Button>
                    </div>
                </div>
                </Col>
                </Row>
                <Container>
                <Row>
                    <Col lg="12" className="text-center mb-5">
                    <h6 className="section__subtitle">All bikes</h6>
                    </Col>

                    {carData.slice(0, 9).map((item) => (
                    <CarItem item={item} key={item.id} />
                    ))}
                </Row>
                {/* Reservation History Section */}
                
                </Container>
                </Row>
            </Container>
            </section>
        </Helmet>
        );
  };
  
  export default Dashboard;
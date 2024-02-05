import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import carData from "../assets/data/carData";
import CarItem from "../components/UI/CarItem";
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
                    <h6 className="section__subtitle">Welcome</h6>
                    {userData.map((item) => (
                       
                    <h2 className="section__title">{item.sexe === 'female' ? 'Ms' : 'Mr'} {item.username}</h2>
                    ))}
                </Col>
                
                <Col lg="6" className="text-center mb-5">
                {/* Solde Section */}
                <div className="solde-section">
                    <h2>Solde: ${solde}</h2>
                    <div className="buttons-container">
                    <Button
                        className="car__item-btn car__btn-rent"
                        
                        onClick={() => window.location.href = '/add-credits'}
                        style={{ marginRight: '10px' }}
                    >
                        Add Credits
                    </Button>

                   

                    <Button
                        className="car__item-btn car__btn-details"
                        color="success"
                        onClick={() => window.location.href = '/view-transactions'}
                    >
                        View Transactions
                    </Button>
                    </div>
                </div>
                </Col>
                </Row>
                <Container>
                <Row>
                    <Col lg="12" className="text-center mb-5">
                    <h6 className="section__subtitle">For you</h6>
                    <h2 className="section__title">Available bikes</h2>
                    </Col>

                    {carData.slice(0, 3).map((item) => (
                    <CarItem item={item} key={item.id} />
                    ))}
                </Row>
                {/* Reservation History Section */}
                <Row>
                    
                    
                    <div className="reservation-history">
                        <h2>Reservation History</h2>
                        {reservationHistory.length > 0 ? (
                        <ul>
                            {reservationHistory.map((reservation) => (
                            <li key={reservation.id}>
                                <p>Car: {reservation.carName}</p>
                                <p>Date: {reservation.date}</p>
                                {/* Add more details as needed */}
                            </li>
                            ))}
                        </ul>
                        ) : (
                        <p>No reservation history available.</p>
                        )}
                    </div>
                </Row>
                </Container>
                </Row>
            </Container>
            </section>
        </Helmet>
        );
  };
  
  export default Dashboard;
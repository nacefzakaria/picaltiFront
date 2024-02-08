import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Helmet from '../components/Helmet/Helmet';
import CarItem from "../components/UI/CarItem";
import carData from "../assets/data/carData";
import userData from "../assets/data/userData";
import fetchReservationHistory from "../assets/data/ReservationHistory";

const Dashboardowner = () => {
    const [userProfileData, setUserProfileData] = useState([]);
    const [reservationHistory, setReservationHistory] = useState([]);
    const [solde, setSolde] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // Access the fetched user data here
        setUserProfileData(userData);

        // Fetch reservation history using sessionToken and userType
        const sessionToken = localStorage.getItem('sessionToken');
        const userType = localStorage.getItem('userType');
        
        if (sessionToken && userType) {
            fetchReservationHistory(sessionToken, userType)
                .then((history) => {
                    setReservationHistory(history);
                    const soldeFromUserData = userData[0]?.solde || 0;
                    setSolde(soldeFromUserData);
                })
                .catch((error) => console.error('Error fetching reservation history:', error));
        }
    }, []);

    return (
        <Helmet title="Dashboard">
            <section>
                <Container>
                    <Row>
                        <Col lg="6" className="text-center mb-5">
                            <h6 className="section__subtitle">Welcome</h6>
                           
                                <h2 className="section__title">Mr yassine</h2>
                            
                        </Col>
                        <Col lg="6" className="text-center mb-5">
                            <div className="solde-section">
                                <h2>Solde: 100DH</h2>
                                <div className="buttons-container">
                                    <Button
                                        className="car__item-btn car__btn-rent"
                                        onClick={() => navigate('/withdraw')}
                                        style={{ marginRight: '10px' }}
                                    >
                                        Withdraw
                                    </Button>
                                    <Button
                                        className="car__item-btn car__btn-details"
                                        color="success"
                                        onClick={() => navigate('/view-transactions')}
                                    >
                                        View Transactions
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    
                    
                </Container>
            </section>
        </Helmet>
    );
};

export default Dashboardowner;

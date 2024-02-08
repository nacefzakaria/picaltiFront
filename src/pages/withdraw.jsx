import React, { useState } from 'react';
import { Button, Container, Row, Col, Form, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import Helmet from '../components/Helmet/Helmet';

const Withdraw = () => {
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [rib, setRib] = useState('');
    const [withdrawnSuccessfully, setWithdrawnSuccessfully] = useState(false);

    const handleWithdraw = () => {
        // Perform withdrawal logic here
        console.log('Withdraw amount:', withdrawAmount);
        console.log('RIB:', rib);
        // After withdrawal, set success state to true
        setWithdrawnSuccessfully(true);
    };

    return (
        <Helmet title="Withdraw">
            <section>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg="6">
                            <h2 className="text-center mb-4">Withdraw Credits</h2>
                            {!withdrawnSuccessfully ? (
                                <Form>
                                    <FormGroup>
                                        <Input
                                            type="number"
                                            placeholder="Enter amount to withdraw"
                                            value={withdrawAmount}
                                            onChange={(e) => setWithdrawAmount(e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input
                                            type="text"
                                            placeholder="Enter your RIB"
                                            value={rib}
                                            onChange={(e) => setRib(e.target.value)}
                                        />
                                    </FormGroup>
                                    <Button
                                        color="primary"
                                        block
                                        onClick={handleWithdraw}
                                        disabled={!withdrawAmount || !rib}
                                    >
                                        Withdraw
                                    </Button>
                                </Form>
                            ) : (
                                <div className="text-center">
                                    <p style={{ color: 'green' }}>Withdrawal successful!</p>
                                    <Link to="/ownerDash">Go back to dashboard</Link>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Withdraw;

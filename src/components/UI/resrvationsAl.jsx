import React, { useState } from 'react';
import { Table, Button } from 'reactstrap';

const ActiveReservationTable = ({ reservations }) => {
    const [lockCodes, setLockCodes] = useState({});
    const [statuses, setStatuses] = useState({});

    const generateLockCode = (reservationId) => {
        // Generate lock code logic here (e.g., random code generation)
        const newLockCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        setLockCodes({ ...lockCodes, [reservationId]: newLockCode });
    };

    const isTimePassed = (reservation) => {
        // Check if reservation time has passed
        const reservationDateTime = new Date(`${reservation.date}T${reservation.startTime}`);
        const currentTime = new Date();
        return reservationDateTime <= currentTime;
    };

    const updateStatus = (reservationId) => {
        if (isTimePassed(reservations.find(res => res.id === reservationId))) {
            setStatuses({ ...statuses, [reservationId]: 'Taken' });
        }
    };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Car Name</th>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {reservations.map((reservation, index) => (
                    <tr key={index}>
                        <td>{reservation.carName}</td>
                        <td>{reservation.date}</td>
                        <td>{reservation.startTime}</td>
                        <td>{statuses[reservation.id] || 'Active'}</td>
                        <td>
                            {statuses[reservation.id] !== 'Taken' && !isTimePassed(reservation) && (
                                <Button color="primary" onClick={() => generateLockCode(reservation.id)}>Generate Lock Code</Button>
                            )}
                            {statuses[reservation.id] !== 'Taken' && isTimePassed(reservation) && (
                                <Button color="primary" onClick={() => updateStatus(reservation.id)}>take bike</Button>
                            )}
                            {lockCodes[reservation.id] && <p>Lock Code: {lockCodes[reservation.id]}</p>}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ActiveReservationTable;

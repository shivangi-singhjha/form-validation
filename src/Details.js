import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Details.css';

const Details = () => {
  const location = useLocation();
  const { values } = location.state || {};

  if (!values) {
    return (
      <div className="details-container">
        <p>No details to display. Please submit the form first.</p>
        <Link to="/">Go back to form</Link>
      </div>
    );
  }

  return (
    <div className="details-container">
      <h2>Submitted Details</h2>
      <ul>
        <li><strong>First Name:</strong> {values.firstName}</li>
        <li><strong>Last Name:</strong> {values.lastName}</li>
        <li><strong>Username:</strong> {values.username}</li>
        <li><strong>E-mail:</strong> {values.email}</li>
        <li><strong>Phone No.:</strong> {values.phone}</li>
        <li><strong>Country:</strong> {values.country}</li>
        <li><strong>City:</strong> {values.city}</li>
        <li><strong>PAN No.:</strong> {values.pan}</li>
        <li><strong>Aadhar No.:</strong> {values.aadhar}</li>
      </ul>
      <Link to="/">Go back to form</Link>
    </div>
  );
};

export default Details;

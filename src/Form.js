import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const Form = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    showPassword: false,
    phone: '',
    country: '',
    city: '',
    pan: '',
    aadhar: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const countries = {
    India: ['Delhi', 'Mumbai', 'Bangalore'],
    USA: ['New York', 'Los Angeles', 'Chicago']
  };

  const validate = () => {
    let errors = {};

    const nameRegex = /^[a-zA-Z]+$/;
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const aadharRegex = /^\d{12}$/;

    if (!values.firstName || !nameRegex.test(values.firstName)) {
      errors.firstName = 'First Name is required and should contain only letters';
    }
    if (!values.lastName || !nameRegex.test(values.lastName)) {
      errors.lastName = 'Last Name is required and should contain only letters';
    }
    if (!values.username || !usernameRegex.test(values.username)) {
      errors.username = 'Username is required and should contain only alphanumeric characters';
    }
    if (!values.email || !emailRegex.test(values.email)) {
      errors.email = 'E-mail is required and should be a valid email address';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }
    if (!values.phone || !phoneRegex.test(values.phone)) {
      errors.phone = 'Phone Number is required and should be in the format +CCC-NNNNNNNNNN';
    }
    if (!values.country) {
      errors.country = 'Country is required';
    }
    if (!values.city) {
      errors.city = 'City is required';
    }
    if (!values.pan || !panRegex.test(values.pan)) {
      errors.pan = 'PAN Number is required and should be in the format ABCDE1234F';
    }
    if (!values.aadhar || !aadharRegex.test(values.aadhar)) {
      errors.aadhar = 'Aadhar Number is required and should be a 12-digit number';
    }

    return errors;
  };


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      setIsSubmitted(true);
      navigate('/details', { state: { values } });
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-item">
          <label>First Name:</label>
          <input type="text" name="firstName" value={values.firstName} onChange={handleChange} />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>
        
        <div className="form-item">
          <label>Last Name:</label>
          <input type="text" name="lastName" value={values.lastName} onChange={handleChange} />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>
        
        <div className="form-item">
          <label>Username:</label>
          <input type="text" name="username" value={values.username} onChange={handleChange} />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        
        <div className="form-item">
          <label>E-mail:</label>
          <input type="email" name="email" value={values.email} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        
        <div className="form-item">
          <label>Password:</label>
          <input type={values.showPassword ? 'text' : 'password'} name="password" value={values.password} onChange={handleChange} />
          <button type="button" onClick={() => setValues({ ...values, showPassword: !values.showPassword })}>
            {values.showPassword ? 'Hide' : 'Show'}
          </button>
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        
        <div className="form-item">
          <label>Phone No.:</label>
          <input type="text" name="phone" value={values.phone} onChange={handleChange} />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        
        <div className="form-item">
          <label>Country:</label>
          <select name="country" value={values.country} onChange={handleChange}>
            <option value="">Select Country</option>
            {Object.keys(countries).map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          {errors.country && <p className="error">{errors.country}</p>}
        </div>
        
        <div className="form-item">
          <label>City:</label>
          <select name="city" value={values.city} onChange={handleChange} disabled={!values.country}>
            <option value="">Select City</option>
            {values.country && countries[values.country].map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          {errors.city && <p className="error">{errors.city}</p>}
        </div>
        
        <div className="form-item">
          <label>PAN No.:</label>
          <input type="text" name="pan" value={values.pan} onChange={handleChange} />
          {errors.pan && <p className="error">{errors.pan}</p>}
        </div>
        
        <div className="form-item">
          <label>Aadhar No.:</label>
          <input type="text" name="aadhar" value={values.aadhar} onChange={handleChange} />
          {errors.aadhar && <p className="error">{errors.aadhar}</p>}
        </div>
        
        <button type="submit" disabled={isSubmitted}>Submit</button>
      </form>
    </div>
  );
};

export default Form;

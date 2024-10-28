import React, { useState } from 'react';
import '../css/Registration.css';
import axios, { AxiosResponse } from 'axios';

const UserRegistration = () => {
    const [formData, setFormData] = useState({
        userID: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        password:"1234",
        role: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async(e: { preventDefault: () => void; }) => {
        e.preventDefault();
        e.preventDefault();
        try {
          console.log("inside the hadle submit")
    
            const response: AxiosResponse<Response> = await axios.post('http://localhost:5000/auth/register',formData);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        setErrorMessage('unable to add the user');
        setSuccessMessage('User added');

        // Basic validation
        if (Object.values(formData).some(field => !field)) {
            setErrorMessage('All fields are required!');
            return;
        }

        // Simulate a successful registration
        console.log('User Data Submitted:', formData);
        setSuccessMessage('Registration Successful!');
    };

    return (
        <div className="registration-wrapper">
            <form className="registration-form" onSubmit={handleSubmit}>
                <h2 className="registration-title">User Registration</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <div className="form-group">
                    <label htmlFor="userID">User ID:</label>
                    <input
                        type="text"
                        id="userID"
                        name="userID"
                        value={formData.userID}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Chit Creator">Chit Creator</option>
                        <option value="Participant">Participant</option>
                    </select>
                </div>

                <button type="submit" className="submit-button">Register</button>
            </form>
        </div>
    );
};

export default UserRegistration;
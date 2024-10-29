import React, { useState } from 'react';
import '../css/Registration.css'; // Keep your custom styles if needed
import axios, { AxiosResponse } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


interface FormData {
    userID: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    password: string;
    role: string;
}

const UserRegistration: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        userID: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '', // Initially empty password field
        role: ''
    });

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        // Basic validation
        if (Object.values(formData).some(field => !field)) {
            setErrorMessage('All fields are required!');
            return;
        }

        try {
            const response: AxiosResponse<{ message: string }> = await axios.post('http://localhost:5000/auth/register', formData);
            console.log(response.data);
            setSuccessMessage('Registration Successful!');
            setFormData({ userID: '', name: '', email: '', phone: '', address: '', password: '', role: '' });
        } catch (error) {
            console.error('Error during registration:', error);
            setErrorMessage('Unable to add the user. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form className="registration-form p-4 border rounded bg-light shadow" onSubmit={handleSubmit}>
                        <h2 className="registration-title text-center">User Registration</h2>
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}

                        <div className="form-group">
                            <label htmlFor="userID">User ID:</label>
                            <input
                                type="text"
                                id="userID"
                                name="userID"
                                className="form-control"
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
                                className="form-control"
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
                                className="form-control"
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
                                className="form-control"
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
                                className="form-control"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="role">Role:</label>
                            <select
                                id="role"
                                name="role"
                                className="form-control"
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

                        <button type="submit" className="btn btn-primary btn-block">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserRegistration;

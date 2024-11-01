import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is included
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

function UserRegistration() {
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        phone: '', // Added phone field
        password: '',
        confirmPassword: '',
        role: '',
        termsAccepted: false,
    });

    const [error, setErrorMessage] = useState<string>('');
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
            setFormData({ name: '', email: '', phone: '', address: '', password: '',confirmPassword:'' ,role: '' ,termsAccepted: true});
        } catch (error) {
            console.error('Error during registration:', error);
            setErrorMessage('Unable to add the user. Please try again.');
        }
        setTimeout(() => {
            navigate('/'); // Change to your desired path
        }, 2000); // Change to 3000 for 3 seconds


    };


    return (
        <section className="vh-100" style={{ backgroundColor: '#eee' }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: '25px' }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        
                                     

                                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        className="form-control"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <label className="form-label" htmlFor="name">Your Name</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        className="form-control"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <label className="form-label" htmlFor="email">Your Email</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-address-card fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="text"
                                                        id="address"
                                                        name="address"
                                                        className="form-control"
                                                        value={formData.address}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <label className="form-label" htmlFor="address">Address</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-phone fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        name="phone"
                                                        className="form-control"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <label className="form-label" htmlFor="phone">Phone Number</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        className="form-control"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <label className="form-label" htmlFor="password">Password</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input
                                                        type="password"
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        className="form-control"
                                                        value={formData.confirmPassword}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <label className="form-label" htmlFor="confirmPassword">Repeat your password</label>
                                                </div>
                                            </div>

                                            <div className="form-group mb-4">
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

                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <input
                                                    className="form-check-input me-2"
                                                    type="checkbox"
                                                    name="termsAccepted"
                                                    id="termsAccepted"
                                                    checked={formData.termsAccepted}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label className="form-check-label" htmlFor="termsAccepted">
                                                    I agree to all statements in <a href="#!">Terms of service</a>
                                                </label>
                                            </div>
                                            {successMessage && <div className="alert alert-success">{successMessage}</div>}

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" className="btn btn-primary btn-lg">Register</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid" alt="Sample"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UserRegistration;

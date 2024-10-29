import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is included

function UserRegistration() {
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

    const [error, setError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
    
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate that passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Validate terms accepted
        if (!formData.termsAccepted) {
            setError('You must accept the terms of service.');
            return;
        }

        // Handle form submission logic here
        console.log('Form submitted:', formData);
        setError(''); // Clear error on successful submission
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

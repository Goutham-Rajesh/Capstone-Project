import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is included
import loginImage from '../assets/loginImage.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const navigate = useNavigate(); // Initialize the navigate function

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [role, setRole] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

 ;
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            console.log("inside the hadle submit")
      
              const response= await axios.post('http://localhost:5000/auth/login',{email,password});
             // console.log(response.data.token);
              localStorage.setItem('token',response.data.token)
              localStorage.setItem('userId',response.data.userId)
              const token=response.data.token;
              console.log(response.data.token)

              console.log(localStorage.getItem('token'))
              const res= await axios.get(`http://localhost:5000/auth/user/${localStorage.getItem('userId')}`,{headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type':'application/json'
              }  
             
              });
              console.log(res.data)
              if(res.data.role==='Chit Creator')
              {
                console.log(res.data.role)
                navigate('/ChitCreator')

              }
              else{
                console.log(res.data.role)
                navigate('/ChitFund')

              }
              
              

          } catch (error) {
              console.error('Error fetching data:', error);
          }
        setError('');
        setSuccessMessage('');

        // Basic validation
        if (!email || !password || !role) {
            setError('All fields are required!');
            return;
        }

  
    };

    return (
        <section className="vh-100">
            <div className="container-fluid h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-9 col-lg-6 col-xl-5">
    <img 
        src={loginImage} // Use the imported image
        className="img-fluid" 
        alt="Sample" 
    />
</div>

                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={handleSubmit}>
                            
                            {/* Email input */}
                            <div className="form-outline mb-4">
                                <input
                                    type="email"
                                    id="form3Example3"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label className="form-label" htmlFor="form3Example3">Email address</label>
                            </div>

                            {/* Password input */}
                            <div className="form-outline mb-3">
                                <input
                                    type="password"
                                    id="form3Example4"
                                    className="form-control form-control-lg"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label className="form-label" htmlFor="form3Example4">Password</label>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mb-4">
                                {/* Checkbox */}
                                <div className="form-check mb-0">
                                    <input
                                        className="form-check-input me-2"
                                        type="checkbox"
                                        id="form2Example3"
                                        checked={rememberMe}
                                        onChange={() => setRememberMe(!rememberMe)}
                                    />
                                    <label className="form-check-label" htmlFor="form2Example3">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#!" className="text-body">Forgot password?</a>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg"
                                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                                >
                                    Login
                                </button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">
                                    Don't have an account? <a href="/register" className="link-danger">Register</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                {/* Copyright */}
                <div className="text-white mb-3 mb-md-0">
                    Copyright © 2020. All rights reserved.
                </div>
                {/* Right */}
                <div>
                    <a href="#!" className="text-white me-4">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#!" className="text-white me-4">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#!" className="text-white me-4">
                        <i className="fab fa-google"></i>
                    </a>
                    <a href="#!" className="text-white">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
                {/* Right */}
            </div>
        </section>
    );
}

export default Login;

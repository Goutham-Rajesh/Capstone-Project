import React, { useState } from 'react';
import '../css/login.css';
import axios, { AxiosResponse } from 'axios';


interface UserAttributes {
    userId?: number;
    name: string;
    email: string;
    phone: string;
    address?: string;
    password: string;
    role: 'Admin' | 'Chit Creator' | 'Participant';
  }

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
   

    const handleSubmit = async  (event: { preventDefault: () => void; }) => {
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
              const res= await axios.get('http://localhost:5000/auth/users',{headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type':'application/json'
              }  
             
              });
              console.log(res.data)
              
              

          } catch (error) {
              console.error('Error fetching data:', error);
          }
        setError('');
        setSuccessMessage('Login successfull');

        // Basic validation
        if (!email || !password || !role) {
            setError('All fields are required!');
            return;
        }

        // Simulate a successful login
        console.log('Login attempted with:', { email, password, role });
        setSuccessMessage('Login Successful!');
    };

    return (
        <div className="login-wrapper">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Login</h2>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Chit Creator">Chit Creator</option>
                        <option value="Participant">Participant</option>
                    </select>
                </div>

                <button type="submit" className="submit-button">Login</button>
            </form>
           
        </div>
    );
};

export default Login;
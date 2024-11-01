import React, { useState } from 'react';
import '../css/login.css'; // Keep your custom styles if needed
import axios from 'axios';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

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
        setSuccessMessage('');

        // Basic validation
        if (!email || !password || !role) {
            setError('All fields are required!');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post<{ token: string }>('http://localhost:5000/auth/login', { email, password });
            const token = response.data.token;
            const userId=response.data.userId;
            localStorage.setItem('token', token);
            localStorage.setItem('userId',userId)

            const res = await axios.get(`http://localhost:5000/auth/user/${localStorage.getItem()}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log(res.data);
            setSuccessMessage('Login Successful!');
            setEmail('');
            setPassword('');
            setRole('');
        } catch (error) {
            console.error('Error during login:', error);
            setError('Login failed! Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <form className="login-form p-4 border rounded bg-light shadow" onSubmit={handleSubmit}>
                        <h2 className="login-title text-center">Login</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                className="form-control"
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
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="role">Role:</label>
                            <select
                                className="form-control"
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

                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Ensure these components exist
import Login from './pages/Login'; // Ensure these components exist
import UserLoggedIn from './pages/UserLoggedIn';
import UserRegistration from './pages/UserRegistration';
import CreatorDashboard from './pages/CreatorDashboard';
import axios from 'axios';
import CreateChit from './pages/CreateChitPage';
import AboutUs from './pages/About';
import CreatorBidPage from './pages/CreatorBidPage';
import UserBidPage from './pages/UserBidPage';
//import BidCreation from './pages/BidCreation';

const App: React.FC = () => {
    const [role, setRole] = React.useState('');

    const getUser = async () => {
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');
        if (token && userId) {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/user/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setRole(response.data.role);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const renderHome = () => {
        if (role === '') {
            return <Home pages={["Home", "Login", "Register", "About"]} />;
        } else if (role === 'Chit Creator') {
            return <Home pages={["Home", "Create Chit", "Active Chit", "About"]} />;
        } else {
            return <Home pages={["Home", "Chit Group", "About"]} />;
        }
    };

    function renderAbout() {
        if (role === '') {
            return <AboutUs pages={["Home", "Login", "Register", "About"]} />;
        } else if (role === 'Chit Creator') {
            return <AboutUs pages={["Home", "Create Chit", "Active Chit", "About"]} />;
        } else if(role=== 'Participant'){
            return <AboutUs pages={["Home", "Chit Group", "About"]} />;
        }
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={renderHome()} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<UserRegistration />} />
                <Route path="/ChitCreator" element={<CreatorDashboard />} />
                <Route path="/createChitfund" element={<CreateChit />} />
                <Route path="/ChitFund" element={<UserLoggedIn />} />
                <Route path="/CreatorBidPage" element={<CreatorBidPage/>} />
                <Route path="/UserBidPage" element={<UserBidPage />} />
                <Route path="/About" element={renderAbout()}/>
            </Routes>
        </Router>
    );
};
  // <Route path="/BidCreation" element={<BidCreation />} />
export default App;

import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // Ensure these components exist
import Login from './components/Login'; // Ensure these components exist
import ChitCreation from './components/ChitCreation';
import UserLoggedIn from './pages/UserLoggedIn';
import UserRegistration from './pages/UserRegistration';
import CreatorDashboard from './pages/CreatorDashboard';

const App: React.FC = () => {
    return (
        <Router>
            {/* <Navbar /> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<UserRegistration />} />
                <Route path="/ChitCreator" element={<CreatorDashboard/>} />
                <Route path="/createChitfund" element={<ChitCreation/>} />
                <Route path="/ChitFund" element={<UserLoggedIn/>} />
            </Routes>
        </Router>
    );
};

export default App;

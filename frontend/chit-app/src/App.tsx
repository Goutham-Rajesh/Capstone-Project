import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbardemo';
import Home from './components/Home'; // Ensure these components exist
import Login from './components/Login'; // Ensure these components exist
import Register from './components/Registration'; // Ensure these components exist
import ChitCreation from './components/ChitCreation';
import UserLoggedIn from './pages/UserLoggedIn';
 // Ensure these components exist
import Navbar2 from './components/NavBar';

const App: React.FC = () => {
    return (
        <Router>
            <Navbar2 />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/createChitfund" element={<ChitCreation/>} />
                <Route path="/ChitFund" element={<UserLoggedIn/>} />
            </Routes>
        </Router>
    );
};

export default App;

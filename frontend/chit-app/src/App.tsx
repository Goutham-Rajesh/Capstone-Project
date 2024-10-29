// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbardemo';
import Home from './components/Home'; // Ensure these components exist
import Login from './components/Login'; // Ensure these components exist
import Register from './components/Registration'; // Ensure these components exist
import ChitCreation from './components/ChitCreation';

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/createChitfund" element={<ChitCreation/>} />
            </Routes>
        </Router>
    );
};

export default App;
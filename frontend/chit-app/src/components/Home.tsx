import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home: React.FC = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="hero text-center" style={{
                backgroundImage: 'url(your-background-image.jpg)', // Replace with your image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                color: 'white'
            }}>
                <div className="container">
                    <h1>Welcome to chitLink</h1>
                    <p>Your gateway to seamless connections.</p>
                    <a href="#services" className="btn btn-primary btn-lg">Get Started</a>
                </div>
            </div>

            {/* Content Section */}
            <div className="container content-section" id="services" style={{ padding: '60px 0' }}>
                <h2 className="text-center">Our Services</h2>
                <div className="row">
                    <div className="col-md-4 text-center">
                        <h3>Service 1</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div className="col-md-4 text-center">
                        <h3>Service 2</h3>
                        <p>Quisque euismod purus sit amet elit fringilla, non fermentum eros vestibulum.</p>
                    </div>
                    <div className="col-md-4 text-center">
                        <h3>Service 3</h3>
                        <p>Vestibulum euismod velit at magna venenatis, nec convallis sapien consectetur.</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="text-center py-4">
                <p>&copy; 2024 chitLink. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;

import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import { Link } from 'react-router-dom';
import AnimatedCounter from '../components/AnimatedCount';
import '../css/home.css';

interface HomeProps {
  pages: string[];
}

const Home: React.FC<HomeProps> = ({ pages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const heroTexts = [
    {
      image: 'https://www.msilchits.com/img/slides/slide-2.png',
      title: 'Welcome to ChitLink',
      subtitle: 'Make Your Dream Come True',
      color: 'black' // First text color
    },
    {
      image: 'https://muthootchits.com/images/hres3.jpg',
      title: 'Simpler, Faster, Friendlier',
      subtitle: 'Where your money comes back to YOU. We are committed to your SUCCESS.',
      color: 'white' // Second text color
    },
    {
      image: 'https://www.msilchits.com/img/slides/slide-3.jpg',
      title: 'Your Financial Partner',
      subtitle: 'Together we achieve more!',
      color: 'white' // Third text color
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroTexts.length);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar pages={pages} isLoggedIn={false} />
      <div className="hero text-center">
        {heroTexts.map((text, index) => (
          <img
            key={index}
            src={text.image}
            alt={text.title}
            className={currentIndex === index ? 'active' : ''}
          />
        ))}
        <div className="container">
          <h1 style={{ color: heroTexts[currentIndex].color }}>{heroTexts[currentIndex].title}</h1>
          <p style={{ color: heroTexts[currentIndex].color }}>{heroTexts[currentIndex].subtitle}</p>
          <a href="#services" className="btn btn-primary btn-lg">Get Started</a>
          <br />
          <br />
          <br />
          <br/>
          
          {currentIndex === 0 && <AnimatedCounter end={1000} duration={5} />}
        </div>

      </div>

      {/* Content Section */}
      <div className="container content-section" id="services" style={{ padding: '60px 0' }}>
        <h2 className="text-center mb-5">Our Services</h2>
        <div className="row">
          <div className="col-md-4 text-center">
            <Link to="/Register">
              <img
                src="https://fastercapital.com/images/blog/technical-development-solutions-for-non-technical-entrepreneurs.jpg?t=1"
                alt="Chit Fund Management"
                className="img-fluid mb-3"
                style={{ height: '200px', objectFit: 'cover', width: '100%' }}
              />
            </Link>
            <h3>Chit Fund Management</h3>
            <p>We provide robust management solutions to streamline your chit fund operations efficiently.</p>
          </div>
          <div className="col-md-4 text-center">
            <Link to="/Register">
              <img
                src="https://images.businessnewsdaily.com/app/uploads/2022/04/04074404/GettyImages-1133767597.jpg"
                alt="Investment Planning"
                className="img-fluid mb-3"
                style={{ height: '200px', objectFit: 'cover', width: '100%' }}
              />
            </Link>
            <h3>Investment Planning</h3>
            <p>Our experts assist you in planning your investments wisely to maximize returns through chit funds.</p>
          </div>
          <div className="col-md-4 text-center">
            <Link to="/Register">
              <img
                src="https://recipe.de/wp-content/uploads/AdobeStock_170263847_Support-scaled.jpg"
                alt="Member Support"
                className="img-fluid mb-3"
                style={{ height: '200px', objectFit: 'cover', width: '100%' }}
              />
            </Link>
            <h3>Member Support</h3>
            <p>We offer dedicated support for all members to address queries and ensure smooth transactions.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4">
        <p>&copy; 2024 chitLink. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Home;

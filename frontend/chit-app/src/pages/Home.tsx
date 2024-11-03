import React from 'react'
import Navbar from '../components/NavBar'
import { Link } from 'react-router-dom';



interface HomeProps {
  pages: string[];
}

const Home: React.FC<HomeProps> = ({ pages }) => {
  return (
    <>
      <Navbar pages={pages} isLoggedIn={false} />
      <div>
        {/* Hero Section */}
        <div className="hero text-center" style={{
          backgroundImage: 'url(https://www.msilchits.com/img/slides/slide-2.png)', // Replace with your image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          color: 'black'
        }}>
          <div className="container">
            <h1>Welcome to ChitLink</h1>
            <p>Make Your Dream Come True</p>
            <a href="#services" className="btn btn-primary btn-lg">Get Started</a>
          </div>
        </div>

        {/* Content Section */}
        {/* Content Section */}
        <div className="container content-section" id="services" style={{ padding: '60px 0' }}>
    <h2 className="text-center mb-5">Our Services</h2> {/* Added margin-bottom for gap */}
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
      </div>
    </>
  );
};

export default Home;
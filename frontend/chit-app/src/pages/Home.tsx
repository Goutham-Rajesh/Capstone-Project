import React from 'react'
import Navbar from '../components/NavBar'



interface HomeProps {
    pages: string[];
  }
  
const Home: React.FC<HomeProps> = ({ pages }) => {
    return (
      <>
        <Navbar pages={pages} />
        <h1>Welcome to home page</h1>
      </>
    );
};
  
  export default Home;
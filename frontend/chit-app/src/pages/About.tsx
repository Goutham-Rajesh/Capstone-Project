import React from 'react'
import Navbar from '../components/NavBar'
import About from '../components/About';



interface HomeProps {
  pages: string[];
}

const AboutUs: React.FC<HomeProps> = ({ pages }) => {
  return (
    <>
      <Navbar pages={pages} isLoggedIn={false} />
      <About/>
    </>
  )
}

export default AboutUs
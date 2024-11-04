import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ResponsiveAppBar from '../components/NavBar';

// Define the type for a member
interface Member {
    name: string;
    email: string;
    phone: string;
    address?: string;
  }

// MembersInfo component
const MembersInfo: React.FC = () => {
    const[members,setMembers]=useState([])
    const location=useLocation()

    const fetchMembers = async () => {
        const members = await axios.get(`http://localhost:5001/chitFund/AllparticipantsInfo/672705b29adcb314c4fc7e02`)
        setMembers(members.data);
    }
 
  useEffect(() => {
    fetchMembers()



  
  }, []);

  const isCreator = sessionStorage.getItem('role') === 'Chit Creator';



  return (
    <>
    <ResponsiveAppBar pages={isCreator ? ['Creator Bid Info', 'Member Info'] : ['Bid Info', 'Member Info']} isLoggedIn={true} />
    <div className="container my-4">
    <h1 
    className="text-center mb-4"
    style={{
      fontWeight: 'bold',      // Makes the text bold
      color: '#4B0082',        // Indigo color for a rich look
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',  // Adds a slight shadow for depth
      letterSpacing: '1px',    // Adds spacing between letters
      fontSize: '2.5rem'       // Increases font size for impact
    }}
  >
    Members Info
  </h1> {/* Centered and spaced heading */}
  
  <div className="row justify-content-center">
    <div className="col-lg-10 col-md-10"> {/* Adjust column width here */}
      <div className="table-responsive">
        <table className="table table-success table-striped text-center">
          <thead>
            <tr className="table-primary">
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member: Member, index) => (
              <tr key={index} className="table-secondary">
                <td>{index + 1}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{`${member.phone.slice(0, 2)}+ ${member.phone.slice(2)}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>



    </>
  );
};

export default MembersInfo;

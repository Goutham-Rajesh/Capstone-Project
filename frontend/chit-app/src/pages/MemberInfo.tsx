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
        const members = await axios.get(`http://localhost:5001/chitFund/participantInfo/${location.state.id}`)
        setMembers(members.data);
    }
 
  useEffect(() => {
    fetchMembers()



  
  }, []);

  const isCreator = sessionStorage.getItem('role') === 'Chit Creator';



  return (
    <>
    <ResponsiveAppBar pages={isCreator ? ['Creator Bid Info', 'Member Info'] : ['Bid Info', 'Member Info']} isLoggedIn={true} />
    <h1>Members Info</h1>
    <table className="table table-success table-striped">
      <thead>
        <tr className="table-primary">
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        {members.map((member:Member,index) => (
          <tr key={index} className="table-secondary">
            <td>{index+1}</td>
            <td>{member.name}</td>
            <td>{member.email}</td>
            <td>{member.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

export default MembersInfo;

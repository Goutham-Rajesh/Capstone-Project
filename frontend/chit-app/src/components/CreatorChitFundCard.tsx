import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/UserChitFund.css'; // Ensure this file contains the CSS for hover effects
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { env } from 'process';
import { useNavigate } from 'react-router-dom';

interface ChitFund {
  _id: string; // Change this to string if needed
  name: string;
  totalAmount: number;
  maxParticipants: number;
  duration: string;
  startDate: Date; // Or string, depending on your API response
  endDate: Date; // Or string, depending on your API response
  creatorID: number;
  participants: number[];
  chitType: string;
}

const CreatorChitFundCard = () => {
  const [availableChitFunds, setAvailableChitFunds] = useState<ChitFund[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch available chit funds

    const fetchChitFunds = async () => {
      try {
        const response = await axios.get<ChitFund[]>(`http://127.0.0.1:5001/getChitfundByCreatorId/${sessionStorage.getItem('userId')}`);
        setAvailableChitFunds(response.data);
      } catch (error) {
        console.error("Error fetching chit funds:", error);
      }
    };

    fetchChitFunds();
  }, []); // Make sure to add an empty dependency array to run this effect only once

  function handleClick(chit: ChitFund): void {

    const deleteChitGroup = async () => {
      try {
        const response = await axios.delete(`http://127.0.0.1:5001/deleteChitFundById/${chit._id}`);
        console.log(response.data);
        const updatedchit = await axios.get<ChitFund[]>(`http://127.0.0.1:5001/getChitFundByCreatorId/${sessionStorage.getItem("userId")}`);
        setAvailableChitFunds(updatedchit.data);
      }
      catch (error) {
        console.error("Error updating participants:", error);
      }
    }

    deleteChitGroup();

  }

  function handleInfo(chit: ChitFund): void {
    navigate('/CreatorBidPage', { state: { id: chit._id} });
    throw new Error('Function not implemented.');
  }

  return (
    <div className="container mt-5">
      <h2>Created Chit Funds</h2>
      <div className="row">
        {availableChitFunds.map(chit => (
          <div className="col-md-4 mb-4" key={chit._id}>
            <div className="card chit-card">
              <div className="card-body">
                <h5 className="card-title">{chit.name}</h5>
                <p className="card-text">
                  Amount: ₹{chit.totalAmount}<br />
                  Duration: {chit.duration}<br />
                  Participants: {chit.maxParticipants}<br />
                  Start Date: {new Date(chit.startDate).toLocaleDateString()}<br />
                </p>
                <button className="btn btn-danger me-2" onClick={() => handleClick(chit)}>Delete</button>
                <button className="btn btn-danger" onClick={() => handleInfo(chit)}>Bid Info</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatorChitFundCard;

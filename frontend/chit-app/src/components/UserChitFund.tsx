import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/UserChitFund.css'; // Ensure this file contains the CSS for hover effects
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { env } from 'process';

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

const ChitFundComponent = () => {
  const [availableChitFunds, setAvailableChitFunds] = useState<ChitFund[]>([]);
  const [joinedChitFunds, setJoinedChitFunds] = useState<ChitFund[]>([]);

  useEffect(() => {
    // Fetch available chit funds
    const fetchAvailableChitFunds = async () => {
      try {
        const response = await axios.get<ChitFund[]>(`http://127.0.0.1:5001/getChitFundByParticipantId/${sessionStorage.getItem("userId")}`);
        setJoinedChitFunds(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching available chit funds:", error);
      }
    };

    const fetchChitFunds = async () => {
      try {
        const response = await axios.get<ChitFund[]>('http://127.0.0.1:5001/getChitFunds');
        setAvailableChitFunds(response.data);
      } catch (error) {
        console.error("Error fetching chit funds:", error);
      }
    };

    fetchChitFunds();
    fetchAvailableChitFunds();
  }, []); // Make sure to add an empty dependency array to run this effect only once

  function handleClick(chit:ChitFund): void {

    const updateParticipants = async () => {
      try {
        const response = await axios.post(`http://127.0.0.1:5001/updateChitFundById/${chit._id}`, {
          participantId: sessionStorage.getItem("userId")
        });
        console.log(response.data);
        const joinedChit = await axios.get<ChitFund[]>(`http://127.0.0.1:5001/getChitFundByParticipantId/${sessionStorage.getItem("userId")}`);
        setJoinedChitFunds(joinedChit.data);
      }
      catch (error) {
        console.error("Error updating participants:", error);
      }
    }

    updateParticipants();
    
  }

  const hadleLeave = async(chit:ChitFund)=>{
    try{
      const response = await axios.put(`http://127.0.0.1:5001/removeParticipantFromChitfund/${chit._id}`,
        {participantId : sessionStorage.getItem('userId')})
      setJoinedChitFunds(response.data)
    }
    catch(error){
      console.error("Error updating participants:", error);
    }
  }

  return (
    <div className="container mt-5">
      <h2>Available Chit Funds</h2>
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
                  End Date: {new Date(chit.endDate).toLocaleDateString()}<br />
                </p>
                <button className="btn btn-primary" onClick={()=>handleClick(chit)}>Join</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-5">Joined Chit Funds</h2>
      <div className="row">
        {joinedChitFunds.length > 0 ? (
          joinedChitFunds.map(chit => (
            <div className="col-md-4 mb-4" key={chit._id}>
              <div className="card chit-card"> {/* Added class for hover effect */}
                <div className="card-body">
                  <h5 className="card-title">{chit.name}</h5>
                  <p className="card-text">
                    Amount: ₹{chit.totalAmount}<br />
                    Duration: {chit.duration}<br />
                    Participants: {chit.maxParticipants}<br />
                    Start Date: {new Date(chit.startDate).toLocaleDateString()}<br />
                    End Date: {new Date(chit.endDate).toLocaleDateString()}<br />
                  </p>
                  <button className="btn btn-danger" onClick={()=>hadleLeave(chit)}>Leave</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No joined chit funds</p>
        )}
      </div>
    </div>
  );
};

export default ChitFundComponent;

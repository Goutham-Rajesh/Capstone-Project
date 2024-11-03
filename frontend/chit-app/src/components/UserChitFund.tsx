import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/UserChitFund.css'; // Ensure this file contains the CSS for hover effects
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ChitFund {
  _id: string;
  name: string;
  totalAmount: number;
  maxParticipants: number;
  duration: string;
  startDate: Date;
  endDate: Date;
  creatorID: number;
  participants: number[];
  chitType: string;
}

interface User {
  userId?: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  password: string;
  role: 'Admin' | 'Chit Creator' | 'Participant';
}

const ChitFundComponent = () => {
  const [availableChitFunds, setAvailableChitFunds] = useState<ChitFund[]>([]);
  const [joinedChitFunds, setJoinedChitFunds] = useState<ChitFund[]>([]);
  const [user, setUser] = useState<User | null>(null);


  const fetchUser = async () => {
    const token = sessionStorage.getItem('token');
    const response = await axios.get(`http://127.0.0.1:5000/user/${sessionStorage.getItem('userId')}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    setUser(response.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchAvailableChitFunds = async () => {
      try {
        const response = await axios.get<ChitFund[]>(`http://127.0.0.1:5001/getChitFundByParticipantId/${sessionStorage.getItem("userId")}`);
        setJoinedChitFunds(response.data);
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
  }, []);

  function handleClick(chit: ChitFund): void {
    // Use optional chaining and default to an empty array
    const currentParticipants = chit.participants || [];
    
    if (currentParticipants.length >= chit.maxParticipants) {
      alert("Maximum participants reached for this chit fund.");
      return;
    }
  
    const updateParticipants = async () => {
      try {
        const response = await axios.post(`http://127.0.0.1:5001/updateChitFundById/${chit._id}`, {
          participantId: sessionStorage.getItem("userId"),
        });
        console.log(response.data);
  
        // Remove the chit from availableChitFunds
        setAvailableChitFunds((prev) => prev.filter((c) => c._id !== chit._id));
  
        // Fetch the updated list of joined chit funds
        const joinedChit = await axios.get<ChitFund[]>(`http://127.0.0.1:5001/getChitFundByParticipantId/${sessionStorage.getItem("userId")}`);
        setJoinedChitFunds(joinedChit.data);
      } catch (error) {
        console.error("Error updating participants:", error);
      }
    };
  
    updateParticipants();
  }
  

  const handleLeave = async (chit: ChitFund) => {
    try {
      await axios.put(`http://127.0.0.1:5001/removeParticipantFromChitfund/${chit._id}`, {
        participantId: sessionStorage.getItem('userId'),
      });

      // Re-fetch the updated list of joined chit funds
      const joinedChit = await axios.get<ChitFund[]>(`http://127.0.0.1:5001/getChitFundByParticipantId/${sessionStorage.getItem("userId")}`);
      setJoinedChitFunds(joinedChit.data);

      // Add the left chit back to available chit funds
      setAvailableChitFunds((prev) => {
        if (!prev.find(c => c._id === chit._id)) {
          return [...prev, chit];
        }
        return prev;
      });
    } catch (error) {
      console.error("Error updating participants:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Welcome {user?.name}</h1>
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
                <button className="btn btn-primary" onClick={() => handleClick(chit)}>Join</button>
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
                  <button className="btn btn-danger" onClick={() => handleLeave(chit)}>Leave</button>
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

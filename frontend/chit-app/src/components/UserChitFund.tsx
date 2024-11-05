import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/UserChitFund.css'; // Ensure this file contains the CSS for hover effects
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();
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
  const fetchChitFundsData = async () => {
    try {
      // Fetch both joined and all available chit funds in parallel
      const [joinedResponse, availableResponse] = await Promise.all([
        axios.get<ChitFund[]>(`http://127.0.0.1:5001/getChitFundByParticipantId/${sessionStorage.getItem("userId")}`),
        axios.get<ChitFund[]>('http://127.0.0.1:5001/getChitFunds')
      ]);
  
      const joinedChitFunds = joinedResponse.data;
      const allChitFunds = availableResponse.data;
  
      // Filter out joined chit funds from all available chit funds
      const filteredAvailableChitFunds = allChitFunds.filter(
        (chitFund) => !joinedChitFunds.some((joined) => joined._id === chitFund._id)
      );
  
      // Set state with filtered results
      setJoinedChitFunds(joinedChitFunds);
      setAvailableChitFunds(filteredAvailableChitFunds);
  
    } catch (error) {
      console.error("Error fetching chit funds:", error);
    }
  };
  
  // Call the function inside useEffect
  useEffect(() => {
    fetchChitFundsData();
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

  function handleInfo(chit: ChitFund): void {
    navigate('/UserBidPage', { state: { id: chit._id } });
    throw new Error('Function not implemented.');
  }

  return (
    <div className="container mt-5">
      {user ? (
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
                    Welcome {user.name}
                </h1>
            ) : (
                <h1 className="text-center">Loading...</h1>
            )}
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
                  </p>
                  <button className="btn btn-danger me-2" onClick={() => handleLeave(chit)}>Leave</button>
                  <button className="btn btn-danger" onClick={() => handleInfo(chit)}>Bid Info</button>

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
}

export default ChitFundComponent;

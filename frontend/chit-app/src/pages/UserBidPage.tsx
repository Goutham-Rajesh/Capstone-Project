import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Session } from 'inspector/promises';
import ResponsiveAppBar from '../components/NavBar';
interface BidData {
  id: number;
  BidDate: string;
  UserID: number;
  BidAmount: number;
}

interface ChitInfo{
  name: string;
  totalAmount:number;
  maxParticipants:number,
  duration:number,
  startDate:Date,
  EndDate:Date,
  CreatorID:number,
  Participants:[number],
  chitType:string
  
}

const UserBidPage = () => {
  const [bids, setBids] = useState<BidData[]>([]);

  const [amount, setAmount] = useState(0);
  const [userNames, setUserNames] = useState<{ [key: number]: string }>({});
  const [totalShare, setTotalShare] = useState(0);
  const [chitInfo, setChitInfo] = useState<ChitInfo | null>(null);
  const [maxChitAllowed, setMaxChitAllowed] = useState(0);
  const [BidWon, setBidWon] = useState(0)
  
  const location = useLocation();
  
  const fetchUserName = async (userID: number) => {
    if (userNames[userID]) return;
    try {
      const res = await axios.get(`http://localhost:5000/user/${userID}`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      setUserNames(prevUserNames => ({
        ...prevUserNames,
        [userID]: res.data.name
      }));
    } catch (err) {
      console.error("Error fetching user from server:", err);
    }
  };

  const fetchBids = async () => {
    const id = location.state?.id;
    if (id) {
      try {
        const response = await axios.get(`http://localhost:5002/getBidByChitFundId/${id}`);
        const bidsData = response.data;
        setBids(bidsData);
        bidsData.forEach((bid: BidData) => fetchUserName(bid.UserID));
      } catch (error) {
        console.error("Error fetching bids:", error);
      }
    }

    


  };

  useEffect(() => {
    fetchBids(); // Initial fetch

    // Set up interval to refetch bids every 10 seconds
    const intervalId = setInterval(fetchBids, 3000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [location.state]);

  const fetchChitFundInfo = async (id: number) => {
    try {
        const res = await axios.get(`http://localhost:5001/getChitFundById/${id}`);
        setChitInfo(res.data)
        
        setAmount(res.data.totalAmount);
        setMaxChitAllowed(res.data.maxParticipants);
      //  setMinBidDate(res.data.startDate);
        console.log(res.data);
    } catch (error) {
        console.error("Error fetching chit fund info:", error);
    }
};

  useEffect(() => {
    const id = location.state?.id;
    fetchChitFundInfo(id)
    const total = bids.reduce((acc, each) => {
      if (each.UserID == Number(sessionStorage.getItem('userId'))) {
        setBidWon(each.BidAmount)
        console.log(each.BidAmount)
        return acc; // Skip this bid and return the accumulator as-is
      }
      const computedValue = ((amount - each.BidAmount) - (each.BidAmount * 0.05)) / (maxChitAllowed - 1);
      return acc + computedValue; // Accumulate the computed value
    }, 0);
    
    
    setTotalShare(total);
  
  }, [bids]);

  return (
    <>
      <ResponsiveAppBar pages={['Bid Info','Member Info']} isLoggedIn={true} />
      <div><h2>UserBidPage</h2></div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Date</th>
            <th scope="col">Bid Winner</th>
            <th scope="col">Bid Amount</th>
            <th scope="col">Creator's Commission</th>
            <th scope="col">Remaining</th>
            <th scope="col">Share Received</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {bids.map((bid, index) => (
            <tr key={bid.id}>
              <th scope="row">{index + 1}</th>
              <td>{bid.BidDate}</td>
              <td>
  {bid.UserID == Number(sessionStorage.getItem('userId')) ? (
    <span style={{ fontWeight: 'bold', color: 'red' }}>
      {userNames[bid.UserID] || 'Loading...'}
    </span>
  ) : (
    <span>
      {userNames[bid.UserID] || 'Loading...'}
    </span>
  )}
</td>

              <td>{bid.BidAmount}</td>
              <td>{(bid.BidAmount * 0.05).toFixed(2)}</td>
              <td>{((amount - bid.BidAmount) - (bid.BidAmount * 0.05)).toFixed(2)}</td>
              <td>
  {bid.UserID == Number(sessionStorage.getItem('userId'))
    ? 0
    :(((amount - bid.BidAmount) - (bid.BidAmount * 0.05)) / (maxChitAllowed - 1)).toFixed(2)}
</td>

            </tr>
          ))}
        </tbody>
      </table>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 g-4 mt-5">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Share Received:</h5>
                <p className="card-text">{totalShare.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Bid Won</h5>
                <p className="card-text">{BidWon}</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Number of Bids remaining:</h5>
                <p className="card-text">{maxChitAllowed - bids.length}</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Amount Paid</h5>
                <p className="card-text">{(amount/maxChitAllowed)*bids.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserBidPage;

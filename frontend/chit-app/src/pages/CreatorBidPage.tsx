import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../css/Table.css'
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

const CreatorBidPage = () => {
    const [bids, setBids] = useState<BidData[]>([]);
    const [amount, setAmount] = useState(0);
    const [userNames, setUserNames] = useState<{ [key: number]: string }>({});
    const [totalCommission, setTotalCommission] = useState(0);
    const [maxChitAllowed, setMaxChitAllowed] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [bidDate, setBidDate] = useState('');
    const [email, setEmail] = useState('');
    const [bidAmount, setBidAmount] = useState(0);
    const [emails, setEmails] = useState<string[]>([]);
    const location = useLocation();
    const [chitInfo, setChitInfo] = useState<ChitInfo | null>(null);
    const [minBidDate, setMinBidDate] = useState('');

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

  
        const fetchEmails = async () => {
           
            try {
                const id = location.state?.id
                // Fetch all participant emails
                const allEmailsResponse = await axios.get(`http://localhost:5001/chitFund/participants/email/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                const allEmails = allEmailsResponse.data.emails;
                console.log("allemails",allEmails);
                console.log(chitInfo?.Participants.length,allEmails.length)
                
              
                    
               // Fetch winner emails
                const winnerEmailsResponse = await axios.get(`http://localhost:5002/bid/winners/email/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                const winnerEmails = winnerEmailsResponse.data.emails|| [];
                console.log(winnerEmails)


                // Filter out winner emails from allEmails
                const availableEmails = allEmails.filter((email:string) => !winnerEmails.includes(email));
                console.log("available",availableEmails);

               // Set the filtered emails in state
                setEmails(availableEmails);

                }

             catch (error) {
                console.error("Error fetching emails:", error);
            }
        };

    const fetchChitFundInfo = async (id: number) => {
        try {
            const res = await axios.get(`http://localhost:5001/getChitFundById/${id}`);
            setChitInfo(res.data)
            
            setAmount(res.data.totalAmount);
            setMaxChitAllowed(res.data.maxParticipants);
            setMinBidDate(res.data.startDate);
            console.log(res.data);
        } catch (error) {
            console.error("Error fetching chit fund info:", error);
        }
    };

    useEffect(() => {
        const id = location.state?.id;
        fetchChitFundInfo(id)
       
        if (id) {
            axios.get(`http://localhost:5002/getBidByChitFundId/${id}`)
                .then(response => {
                    const bidsData = response.data;
                    console.log(bidsData,"bids data")
                   
                        setBids(bidsData);
                        bidsData.forEach((bid: BidData) => fetchUserName(bid.UserID));
                        if (bidsData.length > 0) {
                            const lastBidDate = new Date(bidsData[bidsData.length - 1].BidDate);
                            const nextMonth = new Date(lastBidDate.getFullYear(), lastBidDate.getMonth() + 1, 1);
                            setMinBidDate(nextMonth.toISOString().split("T")[0]);
                        }

                    }
                   
                )                .catch(error => {
                    console.error("Error fetching bids:", error);
                });
                fetchChitFundInfo(id);
        }
        fetchEmails();
    }, [location.state]);

    useEffect(() => {
      //  fetchEmails()
        const total = bids.reduce((acc, each) => acc + (0.05 * each.BidAmount), 0);
        setTotalCommission(total);
        const amount = location.state?.totalAmount;
        const maxChitAllowed = location.state?.max;
     

        if (amount) setAmount(amount);
        if (maxChitAllowed) setMaxChitAllowed(maxChitAllowed);
    }, [bids]);

    const setBidAmountAndWait = (value: React.SetStateAction<number>) => {
        return new Promise<void>((resolve) => {
            setBidAmount(value);
            resolve(); // Resolve the promise immediately after calling setBidAmount
        });
    };

  

  

    const handleAddBid = async () => {
  
        if (emails.length === 1) {
            const calculatedBidAmount = Number(amount - (amount * 0.05));
            try {
                setBidAmountAndWait(calculatedBidAmount);
                // Wait for the update
                 // Then update the state
            } catch (error) {
                console.error("Error updating bid amount:", error);
            }
         }

        if(!(bidAmount >=( amount * 0.5) && bidAmount <= (amount -(amount * 0.05)))){
            alert(`Bid amount should be greater than  ${amount * 0.5} and less than ${(amount -(amount * 0.05))}`);
            return;
        }

        const newBid = { BidDate: bidDate, email, BidAmount: bidAmount };
        const user = await axios.get(`http://localhost:5000/user/email/${newBid.email}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });

        const id = location.state?.id;
        console.log(bidAmount)
      
        const response = await axios.post('http://localhost:5002/createBid', {
            ChitFundID: id,
            UserID: user.data.userId,
            BidAmount: newBid.BidAmount,
            BidDate: newBid.BidDate
        });

        const createdBid = {
            id: response.data.id,
            BidDate: newBid.BidDate,
            UserID: response.data.UserID,
            BidAmount: response.data.BidAmount
        };

        setBids((prevBids) => [...prevBids, createdBid]);
        if (!userNames[response.data.UserID]) fetchUserName(response.data.UserID);
        fetchEmails()

        setBidDate('');
        setEmail('');
        setBidAmount(0);
        setShowModal(false);
             
       
        // console.log(bidAmount)
     
    };

    return (
        <>
            <ResponsiveAppBar pages={['Creator Bid Info','Member Info']} isLoggedIn={true} />
            <div><h2>{chitInfo?.name}</h2></div>
            <table className="table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Date</th>
                        <th>Bid Winner</th>
                        <th>Bid Amount</th>
                        <th>Commission Received</th>
                        <th>Remaining</th>
                    </tr>
                </thead>
                <tbody>
                    {bids.map((bid, index) => (
                        <tr key={bid.id}>
                            <td>{index + 1}</td>
                            <td>{bid.BidDate}</td>
                            <td>{userNames[bid.UserID] || 'Loading...'}</td>
                            <td>{bid.BidAmount}</td>
                            <td>{(bid.BidAmount * 0.05).toFixed(2)}</td>
                            <td>{(amount - bid.BidAmount - (bid.BidAmount * 0.05)).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
           {/* <div className="container">
  <h2>Bid Details <small>Responsive Table</small></h2>
  <ul className="responsive-table">
    <li className="table-header">
      <div className="col col-1">No.</div>
      <div className="col col-2">Date</div>
      <div className="col col-3">Bid Winner</div>
      <div className="col col-4">Bid Amount</div>
      <div className="col col-5">Commission Received</div>
      <div className="col col-6">Remaining</div>
    </li>
    {bids.map((bid, index) => (
      <li className="table-row" key={bid.id}>
        <div className="col col-1" data-label="No.">{index + 1}</div>
        <div className="col col-2" data-label="Date">{new Date(bid.BidDate).toLocaleDateString()}</div>
        <div className="col col-3" data-label="Bid Winner">{userNames[bid.UserID] || 'Loading...'}</div>
        <div className="col col-4" data-label="Bid Amount">{bid.BidAmount}</div>
        <div className="col col-5" data-label="Commission Received">{(bid.BidAmount * 0.05).toFixed(2)}</div>
        <div className="col col-6" data-label="Remaining">{(amount - bid.BidAmount - (bid.BidAmount * 0.05)).toFixed(2)}</div>
      </li>
    ))}
  </ul>
</div> */}




{ chitInfo && emails.length <= chitInfo.maxParticipants && chitInfo.Participants.length >= chitInfo.maxParticipants && !(emails.length==0) ?
            <button  className="btn btn-primary position-fixed" 
            style={{ right: '20px' }}  onClick={() => setShowModal(true)}>Add Bid</button> : <p></p>}
         
            <div className="container">
           
             <br style={{ display: 'none' }} />
            
             { chitInfo && chitInfo.Participants.length < chitInfo.maxParticipants ?
             <div className="card">
             <div className="card-body">
             Still {chitInfo.maxParticipants-chitInfo.Participants.length} needs to join to start the  chit  
             </div>
           </div>
             :<p></p>}
   <div></div>

        
            <div className="row row-cols-1 row-cols-md-2 g-4 mt-5">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Total Commission Received:</h5>
                                <p className="card-text">{totalCommission.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Number of bids remaining:</h5>
                                <p className="card-text">{maxChitAllowed - bids.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} aria-hidden="false">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Bid</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-4">
                                        <input type="date" className="form-control" value={bidDate}  min={minBidDate}
                                             onChange={(e) => setBidDate(e.target.value)} />
                                        <label>Date</label>
                                    </div>
                                    <div className="mb-4">
                                        <select className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}>
                                            <option value="">Select Email</option>
                                            {emails.map((email) => (
                                                <option key={email} value={email}>{email}</option>
                                            ))}
                                        </select>
                                        <label>Email address</label>
                                    </div>
                                    
                                    {emails.length === 1 ? (
    <div className="mb-4">
        <input
            type="number"
            className="form-control"
            value={amount - (amount * 0.05)} 
           // onChange={(e) => setBidAmount(Number(e.target.value))}// Display the static value
            readOnly // Prevent modification
        />
    </div>
) : (
    <div className="mb-4">
        <input
            type="number"
            className="form-control"
            value={bidAmount}
            onChange={(e) => setBidAmount(Number(e.target.value))}
        />
        <label>
            Bid Amount (less than {amount - (amount * 0.05)} and greater than {(amount * 0.5)})
        </label>
    </div>
)}

                                    
                                    <button type="button" className="btn btn-primary" onClick={handleAddBid}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
//https://codepen.io/faaezahmd/pen/dJeRex
//https://devdevout.com/css/css-cards
export default CreatorBidPage;



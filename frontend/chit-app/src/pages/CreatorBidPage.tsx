import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

interface BidData {
    id: number;
    BidDate: string;
    UserID: number;
    BidAmount: number;
    commissionReceived: number;
    remaining: number;
}

const CreatorBidPage = () => {
    const [bids, setBids] = useState<BidData[]>([]);
    const [amount, setAmount] = useState(0);
    const [userNames, setUserNames] = useState<{ [key: number]: string }>({});
    const [totalCommission, setTotalCommission] = useState(0);
    const [maxChitAllowed ,setMaxChitAllowed]=useState(0)

    const location = useLocation();

    // Function to fetch and cache user name by user ID
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

    useEffect(() => {
        const id = location.state?.id;
       
        
        if (id) {
            axios.get(`http://localhost:5002/getBidByChitFundId/${id}`)
                .then(response => {
                    const bidsData = response.data;
                    setBids(bidsData);

                    // Fetch user names for each unique UserID in bidsData
                    bidsData.forEach((bid: BidData) => fetchUserName(bid.UserID));
                })
                .catch(error => {
                    console.error("Error fetching bids:", error);
                });
        }
    }, [location.state]);

    useEffect(() => {
        const total = bids.reduce((acc, each) => {
            return acc + (0.025 * each.BidAmount);
        }, 0);
        setTotalCommission(total);
        const amount = location.state?.totalAmount;
        console.log(amount)
        const maxChitAllowed=location.state?.max;
        if (amount) {
            setAmount(amount);
        }
        console.log(maxChitAllowed)
        if (maxChitAllowed) {
            setMaxChitAllowed(maxChitAllowed)
        }
    }, [bids]);

    return (
        <>
            <div>CreatorBidPage</div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Date</th>
                        <th scope="col">Bid Winner</th>
                        <th scope="col">Bid Amount</th>
                        <th scope="col">Commission Received</th>
                        <th scope="col">Remaining</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {bids.map((bid, index) => (
                        <tr key={bid.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{bid.BidDate}</td>
                            <td>{userNames[bid.UserID] || 'Loading...'}</td>
                            <td>{bid.BidAmount}</td>
                            <td>{(bid.BidAmount * 0.025).toFixed(2)}</td>
                            <td>{(amount - bid.BidAmount - (bid.BidAmount * 0.025)).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
     
            <div className="container">
            <div className="row">
                <div className="col text-right">
                    <button className="btn btn-primary position-fixed" style={{ right: '20px' }}>
                        Add Bid
                    </button>
                </div>
            </div>

            {/* Add margin to the top of the card section */}
            <div className="row row-cols-1 row-cols-md-2 g-4 mt-5"> {/* mt-5 adds margin-top */}
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
                            <h5 className="card-title">Number of chits remaining:</h5>
                            <p className="card-text">{maxChitAllowed - bids.length}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
        </>
    );
};

export default CreatorBidPage;

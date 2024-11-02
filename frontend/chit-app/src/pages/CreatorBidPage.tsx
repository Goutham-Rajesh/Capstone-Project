import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

interface BidData {
    id: number,
    BidDate: string,
    UserID: number,
    BidAmount: number,
    commissionReceived: number,
    remaining: number
}

const CreatorBidPage = () => {
    const [bids, setBids] = useState<BidData[]>([]);
    const [userNames, setUserNames] = useState<{ [key: number]: string }>({});
    const location = useLocation();

    // Function to fetch and cache user name by user ID
    const fetchUserName = async (userID: number) => {
        // Avoid fetching if already in cache
        if (userNames[userID]) return;

        try {
            const res = await axios.get(`http://localhost:5000/user/${userID}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            // Update user names state with fetched name
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
                            <td>{bid.BidAmount * 0.25}</td>
                            <td>{bid.BidAmount - bid.BidAmount * 0.25}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default CreatorBidPage;


import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Label } from 'recharts';
import { Container, Row, Col, Card, Spinner, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

interface ChitFund {
  _id: string;
  name: string,
  totalAmount:number,
  maxParticipants:number,
  duration:number,
  startDate:Date,
  CreatorID:number,
  Participants:[number]
}

interface Bid {
  ChitFundID: string;
  UserID: string;
  BidAmount: number;
  BidDate: Date;
}
 type  info={
  name:string,
  shareReceived:number,
  bidwon:number,
  bidremaining:number,
  amountpaid:number
}

interface User {
  userId: number;
  name: string;
  email: string;
  phone: string;
  profilePic?: string;
  joinedChitFunds: ChitFund[];
  availableChitFunds: ChitFund[];
}

const UserProfileComponent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [totalProfit, setTotalProfit] = useState<number>(0);
  const [totalShareReceived, setTotalShareReceived] = useState<number>(0);
  const [chitFundBidData, setChitFundBidData] = useState<Map<string, { chitFund: ChitFund; bids: Bid[] }>>(new Map());
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [details, setDetails] = useState<info[]>([])

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      const userId = sessionStorage.getItem('userId');
      const token = sessionStorage.getItem('token');

      try {
        // Fetch chit funds the user has joined
        const joinedChitResponse = await axios.get<ChitFund[]>(`http://127.0.0.1:5001/getChitFundByParticipantId/${userId}`, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });

        const joinedChitFundsData = joinedChitResponse.data;
        setTotalInvestment(joinedChitFundsData.reduce((sum, chit) => sum + chit.totalAmount, 0));

        // Fetch bid data for each chit fund
        const bidDataMap = new Map();
        let totalShareReceived = 0;

       const detail:info[]=[]
        for (const chit of joinedChitFundsData) {
          const bidsResponse = await axios.get<Bid[]>(`http://localhost:5002/getBidByChitFundId/${chit._id}`, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          });
          const bids = bidsResponse.data;
          
        //declate the variabel of info
        const singledetail:info={name:'',shareReceived:0,bidwon:0,bidremaining:0}
       
          // Calculate user-paid and share-received values
          
          let shareReceived = 0;

          bids.forEach(bid => {
            if (bid.UserID !== sessionStorage.getItem('userId')) {
              shareReceived += ((chit.totalAmount - bid.BidAmount) - (bid.BidAmount * 0.05)) / (chit.maxParticipants-1);
            }
            else{
              singledetail.bidwon=bid.BidAmount;
              
            }
          });
          singledetail.name=chit.name;
          singledetail.bidremaining=chit.maxParticipants - bids.length;
          singledetail.shareReceived=shareReceived
          const userPaid = (chit.totalAmount / chit.maxParticipants) * bids.length;
          singledetail.amountpaid=userPaid

          // Update the total share received
          totalShareReceived += shareReceived;
          detail.push(singledetail);

          // Store chit fund and bid data in map
          bidDataMap.set(chit._id, { chitFund: chit, bids, userPaid, shareReceived });
        }

        setDetails(detail);
        console.log(detail);

        setTotalShareReceived(totalShareReceived);
        setChitFundBidData(bidDataMap);

        // Fetch user data
        const userResponse = await axios.get<User>(`http://127.0.0.1:5000/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        setUser(userResponse.data);

      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const renderPieChartData = () => {
    return [
      { name: 'Investment', value: totalInvestment },
      { name: 'Profit', value: totalProfit },
      { name: 'Share Received', value: totalShareReceived },
    ];
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setImageFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'new_preset');

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dwabgca1d/image/upload', formData);
        const profilePicUrl = response.data.secure_url;
        await axios.patch(`http://127.0.0.1:5000/userProfile/${user?.userId}`, { profilePic: profilePicUrl });
        setUser(prevUser => (prevUser ? { ...prevUser, profilePic: profilePicUrl } : prevUser));
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setShowModal(false);
      }
    }
  };

  return (
    <Container className="mt-5">
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        user && (
          <>
            <Card className="mb-4 text-center">
              <Card.Body>
                <Card.Title>User Profile: {user.name}</Card.Title>
                {user.profilePic && (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', marginBottom: '10px' }}
                  />
                )}
                <Card.Text>Email: {user.email}</Card.Text>
                <Card.Text>Phone: {user.phone}</Card.Text>
                <Button variant="primary" onClick={() => setShowModal(true)}>Upload Profile</Button>
              </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Upload Profile Picture</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group controlId="formFile">
                  <Form.Label>Choose a file</Form.Label>
                  <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                <Button variant="primary" onClick={handleUpload}>Upload</Button>
              </Modal.Footer>
            </Modal>

            <div className="chit-fund-list mt-4">
      {details.map((detail, index) => (
        <Card key={index} className="mb-3 shadow-sm">
          <Card.Body>
            <Card.Title className="text-center text-primary">
              {detail.name}
            </Card.Title>
            <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
                <strong>Bid Won</strong>
                <p className="h5 text-success">{detail.bidwon}</p>
              </div>
              <div className="d-flex flex-column">
                <strong>Share Received</strong>
                <p className="h5">₹{detail.shareReceived.toFixed(2)}</p>
              </div>
             
              <div className="d-flex flex-column">
                <strong>Bids Remaining</strong>
                <p className="h5">{detail.bidremaining}</p>
              </div>
              <div className="d-flex flex-column">
                <strong>Amount Paid</strong>
                <p className="h5">{detail.amountpaid}</p>
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>

            {/* <Row>
              <Col md={6}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Investment Overview</Card.Title>
                    <Card.Text>Total Investment: ₹{totalInvestment}</Card.Text>
                    <Card.Text>Total Profit: ₹{totalProfit}</Card.Text>
                    <Card.Text>Total Share Received: ₹{totalShareReceived.toString(2)}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Investment Breakdown</Card.Title>
                    <PieChart width={400} height={400}>
                      <Pie
                        data={renderPieChartData()}
                        cx={200}
                        cy={200}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        <Label value={`Total: ₹${totalInvestment + totalProfit + totalShareReceived}`} position="center" style={{ fontSize: '16px', fontWeight: 'bold', fill: '#333' }} />
                        {renderPieChartData().map((_, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#ff7300' : index === 1 ? '#82ca9d' : '#8884d8'} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </Card.Body>
                </Card>
              </Col>
            </Row> */}

        

  
          </>
        )
      )}
    </Container>
  );
};

export default UserProfileComponent;

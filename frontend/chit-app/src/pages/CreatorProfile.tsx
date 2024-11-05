import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Label, ResponsiveContainer } from 'recharts';
import { Container, Row, Col, Card, Spinner, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import ResponsiveAppBar from '../components/NavBar';

interface Chit {
  _id: String;
  name: String;
  totalAmount: Number;
  maxParticipants: Number;
  duration: Number;
  startDate: Date;
  CreatorID: Number;
  Participants: [Number]; // New field for commission
}

interface Creator {
  creatorId: number;
  name: string;
  email: string;
  phone: string;
  profilePic?: string; // Optional field for profile picture
  createdChits: Chit[];
}

interface Bid {
  BidID: string;
  ChitFundID: string;
  UserID: string;
  BidAmount: number;
  BidDate: Date;
}

type ChitFundBidAmount = {
  [chitFundID: string]: number; // Key: ChitFundID, Value: Total 5% commission for that ChitFundID
};

const ChitCreatorProfileComponent: React.FC = () => {
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalChitsCreated, setTotalChitsCreated] = useState<number>(0);
  const [totalCommission, setTotalCommission] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [toChits, setToChits] = useState<Chit[]>([]); // State for modal visibility
  const [chitFundBidAmount, setChitFundBidAmount] = useState<ChitFundBidAmount>({});

  useEffect(() => {
    const fetchCreatorProfile = async () => {
      setLoading(true);

      const creatorId = sessionStorage.getItem('userId');
      const token = sessionStorage.getItem('token');

      try {
        const creatorResponse = await axios.get<Creator>(`http://127.0.0.1:5000/user/${creatorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setCreator(creatorResponse.data);

        const totalChitResponse = await axios.get(
          `http://127.0.0.1:5001/getChitFundByCreatorId/${creatorId}`
        );

        const totalChitsCreated = totalChitResponse.data.length;

        setTotalChitsCreated(totalChitsCreated);
        setToChits(totalChitResponse.data);
        const chitList: Chit[] = totalChitResponse.data;

        // Step 2: Process each chit fund and fetch bids
        let updatedChitFundBidAmount: ChitFundBidAmount = {};
        let overallCommission = 0;

        for (let chit of chitList) {
          const chitId = chit._id;
          const chitName = chit.name;
          // Fetch bids for the current Chit Fund
          const bidResponse = await axios.get(
            `http://localhost:5002/getBidByChitFundId/${chitId}`
          );
          const bids: Bid[] = bidResponse.data; // Assuming response is an array of Bid objects

          // Step 3: Calculate 5% commission for each bid
          let totalBidCommission = 0;
          for (let bid of bids) {
            // Calculate 5% of BidAmount
            totalBidCommission += bid.BidAmount * 0.05;
          }

          // Step 4: Update commission by ChitFundID in the state
          if (!updatedChitFundBidAmount[chitName]) {
            updatedChitFundBidAmount[chitName] = 0;
          }
          updatedChitFundBidAmount[chitName] += totalBidCommission;
          overallCommission += totalBidCommission;
        }

        // Step 5: Set the new state with the updated commissions
        setChitFundBidAmount(updatedChitFundBidAmount);
        setTotalCommission(overallCommission);
      } catch (error) {
        console.error('Error fetching creator profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreatorProfile();
  }, []);

  const renderPieChartData = () => {
    return Object.entries(chitFundBidAmount).map(([chitFundName, commission], index) => ({
      name: chitFundName,
      value: commission,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random color for each segment
      commission: commission.toFixed(2), // Add commission as a label
    }));
  };

  const totalAmount =  totalCommission;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'new_preset');

      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dwabgca1d/image/upload',
          formData
        );
        const profilePicUrl = response.data.secure_url;

        // Uncomment the following code to update the profile picture in the API
        /*
        await axios.patch(`http://127.0.0.1:5000/creatorProfile/${creator?.creatorId}`, { profilePic: profilePicUrl });
        */

        setCreator((prevCreator) =>
          prevCreator ? { ...prevCreator, profilePic: profilePicUrl } : prevCreator
        );
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setShowModal(false); // Close modal after upload
      }
    }
  };

  return (
    <>
      <ResponsiveAppBar pages={['Active Chit', 'Create Chit', 'Creator Profile', 'About']} isLoggedIn={true} />
      <Container className="mt-5">
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          creator && (
            <>
              <Card className="mb-4">
                <Card.Body style={{ textAlign: 'center' }}>
                  <Card.Title>Chit Creator Profile: {creator.name}</Card.Title>
                  {creator.profilePic && (
                    <img
                      src={creator.profilePic}
                      alt="Profile"
                      style={{
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        objectPosition: 'top',
                        marginBottom: '10px',
                      }}
                    />
                  )}
                  <Card.Text>Email: {creator.email}</Card.Text>
                  <Card.Text>Phone: {creator.phone.slice(2)}</Card.Text>
                  <Button variant="primary" onClick={() => setShowModal(true)}>
                    Upload Profile
                  </Button>
                </Card.Body>
              </Card>

              {/* Modal for Upload */}
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
                  <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleUpload}>
                    Upload
                  </Button>
                </Modal.Footer>
              </Modal>

              {/* Chit Fund Overview */}
              <Row>
                <Col md={6}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>Chit Overview</Card.Title>
                      <Card.Text>Total Chits Created: {totalChitsCreated}</Card.Text>
                      <Card.Text>Total Commission Earned: ₹{totalCommission}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>Commission Breakdown</Card.Title>
                      <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                          <Pie
                            data={renderPieChartData()}
                            cx={200}
                            cy={200}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name }) => name} // Show chit fund name as label
                          >
                            <Label
                          value={`Total: ₹${totalAmount}`}
                          position="center"
                          style={{ fontSize: '16px', fontWeight: 'bold', fill: '#333' }}
                        />
                            {renderPieChartData().map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          {/* Add total commission in center */}
                          <Label
                            value={`Total: ₹${totalCommission.toFixed(2)}`}
                            position="center"
                            style={{
                              fontSize: '20px',
                              fontWeight: 'bold',
                              fill: '#000',
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Created Chits */}
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Created Chits</Card.Title>
                  <ul>
                    {toChits.map((chit, index) => (
                      <li key={index + 1}>
                        {chit.name} -- ₹{chit.totalAmount.toString()}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>

              {/* Commission Details Section */}
              <div className="chit-fund-list mt-4">
                {Object.entries(chitFundBidAmount).map(([chitFundID, commission]) => (
                  <Card key={chitFundID} className="mb-3 shadow-sm">
                    <Card.Body>
                      <Card.Title className="text-center text-primary">
                        Chit Fund: {chitFundID}
                      </Card.Title>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-column">
                          <strong>Total Commission</strong>
                          <p className="h4 text-success">₹{commission.toFixed(2)}</p>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </>
          )
        )}
      </Container>
    </>
  );
};

export default ChitCreatorProfileComponent;

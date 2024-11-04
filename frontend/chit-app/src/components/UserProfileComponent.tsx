import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Label } from 'recharts';
import { Container, Row, Col, Card, Spinner, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

interface ChitFund {
  _id: string;
  name: string;
  totalAmount: number;
  participants: number;
  creatorID: number;
}

interface User {
  userId: number;
  name: string;
  email: string;
  phone: string;
  profilePic?: string; // Optional field for profile picture
  joinedChitFunds: ChitFund[];
  availableChitFunds: ChitFund[];
}

const UserProfileComponent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [totalProfit, setTotalProfit] = useState<number>(0);
  const [joinedChitFunds, setJoinedChitFunds] = useState<ChitFund[]>([]);
  const [availableChitFunds, setAvailableChitFunds] = useState<ChitFund[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false); // State for modal visibility

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      const userId = sessionStorage.getItem('userId');
      const token = sessionStorage.getItem('token');

      try {
        const joinedChitResponse = await axios.get<ChitFund[]>(`http://127.0.0.1:5001/getChitFundByParticipantId/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const joinedChitFundsData = joinedChitResponse.data;
        setJoinedChitFunds(joinedChitFundsData);

        const totalInvestment = joinedChitFundsData.reduce((sum, chit) => sum + chit.totalAmount, 0);
        setTotalInvestment(totalInvestment);

         // Fetch bid details to calculate total profit (currently commented out)
        /*
        const bidDetailsResponse = await axios.get<{ amountWon: number; totalInterest: number }[]>(`http://127.0.0.1:5001/getBiddetailsByParticipantId/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        */

        const hardcodedTotalProfit = 5000; // Replace with actual logic if needed
        setTotalProfit(hardcodedTotalProfit);

        const availableChitResponse = await axios.get<ChitFund[]>(`http://127.0.0.1:5001/getChitFunds`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const allChitFunds = availableChitResponse.data;
        const availableChits = allChitFunds.filter(chit => !joinedChitFundsData.some(joined => joined._id === chit._id));
        setAvailableChitFunds(availableChits);

        const userResponse = await axios.get<User>(`http://127.0.0.1:5000/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
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
    ];
  };

  const totalAmount = totalInvestment + totalProfit;

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
        const response = await axios.post('https://api.cloudinary.com/v1_1/dwabgca1d/image/upload', formData);
        const profilePicUrl = response.data.secure_url;

        await axios.patch(`http://127.0.0.1:5000/userProfile/${user?.userId}`, { profilePic: profilePicUrl });

        setUser(prevUser => (prevUser ? { ...prevUser, profilePic: profilePicUrl } : prevUser));
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setShowModal(false); // Close modal after upload
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
            <Card className="mb-4">
              <Card.Body style={{ textAlign: 'center' }}>
                <Card.Title>User Profile: {user.name}</Card.Title>
                {user.profilePic && (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    style={{
                      width: '150px',
                      height: '150px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      objectPosition: 'top',
                      marginBottom: '10px'
                    }}
                  />
                )}
                <Card.Text>Email: {user.email}</Card.Text>
                <Card.Text>Phone: {user.phone}</Card.Text>
                <Button variant="primary" onClick={() => setShowModal(true)}>Upload Profile</Button>
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

            <Row>
              <Col md={6}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Investment Overview</Card.Title>
                    <Card.Text>Total Investment: ₹{totalInvestment}</Card.Text>
                    <Card.Text>Total Profit: ₹{totalProfit}</Card.Text>
                    <Card.Text>Total Chits Joined: {joinedChitFunds.length}</Card.Text>
                    <Card.Text>Available Chits to Join: {availableChitFunds.length}</Card.Text>
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
                        <Label
                          value={`Total: ₹${totalAmount}`}
                          position="center"
                          style={{ fontSize: '16px', fontWeight: 'bold', fill: '#333' }}
                        />
                        {renderPieChartData().map((_, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#ff7300' : '#82ca9d'} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>

                    <div className="d-flex justify-content-between mt-3">
                      <div style={{ color: '#ff7300' }}>
                        <strong>Investment:</strong> ₹{totalInvestment}
                      </div>
                      <div style={{ color: '#82ca9d' }}>
                        <strong>Profit:</strong> ₹{totalProfit}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Joined Chit Funds</Card.Title>
                <ul>
                  {joinedChitFunds.map(chit => (
                    <li key={chit._id}>
                      {chit.name} - ₹{chit.totalAmount}
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <Card.Title>Available Chit Funds</Card.Title>
                <ul>
                  {availableChitFunds.map(chit => (
                    <li key={chit._id}>
                      {chit.name} - ₹{chit.totalAmount}
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </>
        )
      )}
    </Container>
  );
};

export default UserProfileComponent;

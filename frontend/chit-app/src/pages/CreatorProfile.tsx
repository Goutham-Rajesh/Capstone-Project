import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Label } from 'recharts';
import { Container, Row, Col, Card, Spinner, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import ResponsiveAppBar from '../components/NavBar';

interface Chit {
  _id: string;
  name: string;
  totalAmount: number;
  participants: number;
  commissionEarned: number; // New field for commission
}

interface Creator {
  creatorId: number;
  name: string;
  email: string;
  phone: string;
  profilePic?: string; // Optional field for profile picture
  createdChits: Chit[];
}

const ChitCreatorProfileComponent: React.FC = () => {
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalChitsCreated, setTotalChitsCreated] = useState<number>(0);
  const [totalCommission, setTotalCommission] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false); // State for modal visibility

  useEffect(() => {
    const fetchCreatorProfile = async () => {
      setLoading(true);
      
      // Hardcoded creator data
      const hardcodedCreator: Creator = {
        creatorId: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        profilePic: 'https://via.placeholder.com/150', // Placeholder profile picture
        createdChits: [
          { _id: '1', name: 'Chit Fund A', totalAmount: 10000, participants: 10, commissionEarned: 1000 },
          { _id: '2', name: 'Chit Fund B', totalAmount: 15000, participants: 15, commissionEarned: 1500 },
          { _id: '3', name: 'Chit Fund C', totalAmount: 20000, participants: 20, commissionEarned: 2000 },
        ],
      };

      // Simulate API response delay
      setTimeout(() => {
        setCreator(hardcodedCreator);
        setTotalChitsCreated(hardcodedCreator.createdChits.length);
        const totalCommission = hardcodedCreator.createdChits.reduce((sum, chit) => sum + chit.commissionEarned, 0);
        setTotalCommission(totalCommission);
        setLoading(false);
      }, 1000);

      // Uncomment the following code to fetch data from an API
      /*
      const creatorId = sessionStorage.getItem('creatorId');
      const token = sessionStorage.getItem('token');

      try {
        const creatorResponse = await axios.get<Creator>(`http://127.0.0.1:5000/creator/${creatorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setCreator(creatorResponse.data);

        const totalChitsCreated = creatorResponse.data.createdChits.length;
        setTotalChitsCreated(totalChitsCreated);

        const totalCommission = creatorResponse.data.createdChits.reduce((sum, chit) => sum + chit.commissionEarned, 0);
        setTotalCommission(totalCommission);
      } catch (error) {
        console.error("Error fetching creator profile:", error);
      } finally {
        setLoading(false);
      }
      */
    };

    fetchCreatorProfile();
  }, []);

  const renderPieChartData = () => {
    return [
      { name: 'Total Chits Created', value: totalChitsCreated },
      { name: 'Total Commission Earned', value: totalCommission },
    ];
  };

  const totalAmount = totalChitsCreated + totalCommission;

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

        // Uncomment the following code to update the profile picture in the API
        /*
        await axios.patch(`http://127.0.0.1:5000/creatorProfile/${creator?.creatorId}`, { profilePic: profilePicUrl });
        */

        setCreator(prevCreator => (prevCreator ? { ...prevCreator, profilePic: profilePicUrl } : prevCreator));
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setShowModal(false); // Close modal after upload
      }
    }
  };

  return (
    <> <ResponsiveAppBar pages={['Active Chit','Create Chit','Creator Profile','About']} isLoggedIn={true} />
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
                      marginBottom: '10px'
                    }}
                  />
                )}
                <Card.Text>Email: {creator.email}</Card.Text>
                <Card.Text>Phone: {creator.phone}</Card.Text>
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
                    <Card.Title>Chit Overview</Card.Title>
                    <Card.Text>Total Chits Created: {totalChitsCreated}</Card.Text>
                    <Card.Text>Total Commission Earned: ₹{totalCommission}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Chit Breakdown</Card.Title>
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
                        <strong>Chits Created:</strong> {totalChitsCreated}
                      </div>
                      <div style={{ color: '#82ca9d' }}>
                        <strong>Commission:</strong> ₹{totalCommission}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Created Chits</Card.Title>
                <ul>
                  {creator.createdChits.map(chit => (
                    <li key={chit._id}>
                      {chit.name} - ₹{chit.totalAmount} (Commission: ₹{chit.commissionEarned})
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </>
        )
      )}
    </Container>
    </>
  );
};

export default ChitCreatorProfileComponent;

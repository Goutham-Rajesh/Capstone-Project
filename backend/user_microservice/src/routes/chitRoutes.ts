import express from 'express';

import { authenticateToken, authorizeRole } from '../middleware/auth';
import User from '../models/User';
import axios from 'axios';

const chitRouter = express.Router();
//, authenticateToken, authorizeRole(['Admin', 'Chit Creator', 'Participant']),
chitRouter.post('/addChitfund', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:3000/createChitfund', req.body);
        console.log('Chit Fund created successfully:', response.data);
        res.status(201).send("chit fund created successfully")
      } catch (error) {
        console.error('Error creating Chit Fund:', error);
      }
});


chitRouter.post('/updateChitfund/:id', async (req, res) => {
    try {
        const id=req.params.id
        console.log(id)
        const response = await axios.post(`http://localhost:3000/updatechitfundbyid/${id}`,req.body);
        console.log('Chit Fund updated  successfully:', response.data);
        res.status(201).send("chit fund created successfully")
      } catch (error) {
        console.error('Error creating Chit Fund:', error);
      }
});

chitRouter.get('/getChitfundsByCreator/:id', async (req, res) => {
    try {
       // console.log("inside the getchitfundsParticpant")
        const id=req.params.id
        const response = await axios.get(`http://127.0.0.1:3000/getchitfundbyCreatorid/${id}`);
        console.log('Chit Funds =', response.data);
        res.status(201).json(response.data)
      } catch (error) {
        console.error('Error getting Chit Fund:', error);
      }
});

chitRouter.get('/getChitfundsByParticipant/:id', async (req, res) => {
    try {
        console.log("inside the getchitfundsParticpant")
        const id=req.params.id
        const response = await axios.get(`http://127.0.1:3000/getchitfundbyparticipantid/${id}`);
        console.log('Chit Funds =', response.data);
        res.status(201).json(response.data)
      } catch (error) {
        console.error('Error getting Chit Fund:', error);
      }
});






chitRouter.get('/getchitfunds', async (req, res) => {
    try {
        console.log("inside the getchitfunds")
        const response = await axios.get('http://127.0.1:3000/getchitfunds');
        console.log('Chit Funds =', response.data);
        res.status(201).json(response.data)
      } catch (error) {
        console.error('Error getting Chit Fund:', error);
      }
});

export default chitRouter;



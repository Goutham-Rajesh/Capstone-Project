import mongoose from "mongoose";
import { Bid } from "../models/Bid";
import { Request, Response } from "express";
import axios from "axios";

const getBids = async (req: Request, res: Response) => {
  try {
    const Bids = await Bid.find();
    res.status(200).json(Bids);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getBidById = async (req: Request, res: Response) => {
  try {
    const bid = await Bid.findById(req.params.id);
    res.status(200).json(bid);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const createBid = async (req: Request, res: Response) => {
  const bid = new Bid({
   
    ChitFundID: req.body.ChitFundID,
    UserID: req.body.UserID,
    BidAmount: req.body.BidAmount,
    BidDate: req.body.BidDate,
  });

  try {
    console.log(bid)
    const newBid = await bid.save();
    res.status(201).json(newBid);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const updateBidById = async (req: Request, res: Response) => {
  try {
    const bid = await Bid.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(bid);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const deleteBidById = async (req: Request, res: Response) => {
  try {
    const bid = await Bid.findByIdAndDelete(req.params.id);
    res.status(200).json(bid);
  } catch (err) {
    res.status(500).json({ message: err });
  } 
};


const getBidByChitFundId = async (req: Request, res:Response)=>{

    try {
      const chitFundId = req.params.chitFundId; // Retrieve ChitFundID from URL parameters
      
  
      // Find bids with the specified ChitFundID
      const bids = await Bid.find({ ChitFundID: chitFundId });
  
      // If no bids found, return a 404 response
      
      if (!bids || bids.length === 0) {
        const bids=new Bid({
   
          ChitFundID: null,
          UserID: null,
          BidAmount: null,
          BidDate:null,
        })
        res.status(200).json([]);
        return ;
      }
  
      // Return the found bids
      res.status(200).json(bids);
    } 
  catch(err)
  {
    res.status(500).json({ message: err });
  }

}

const getEmailsOfChitWinners = async (req: Request, res: Response) => {
  try {
      const chitFundId = req.params.id; // Retrieve ChitFundID from URL parameters

      // Find bids with the specified ChitFundID
      const bids = await Bid.find({ ChitFundID:chitFundId });

      // If no bids found, return a 404 response
      if (!bids || bids.length === 0) {
        const bids=new Bid({
   
          ChitFundID: null,
          UserID: null,
          BidAmount: null,
          BidDate:null,
        })
        res.status(200).json([bids]);
        return ;
      }

      // Extract UserIDs from the bids
      const userIds = bids.map(bid => bid.UserID);
      const uniqueUserIds = [...new Set(userIds)]; // Get unique UserIDs to avoid duplicate API calls

      const emails: string[] = []; // Specify that emails is an array of strings

      // Loop through each unique UserID to fetch the email
      for (const id of uniqueUserIds) {
          try {
              const response = await axios.get(`http://localhost:5000/user/getemail/${id}`);
              emails.push(response.data.email); // Assuming the response contains an 'email' field
          } catch (err) {
              console.error(`Error fetching email for user ID ${id}:`, err);
          }
      }

      // Send the list of emails as response
      res.status(200).json({ emails });
  } catch (err) {
      console.error("Error fetching emails:", err);
      res.status(500).json({ message: 'Internal server error' });
  }
};

export { getBids, getBidById, createBid, updateBidById, deleteBidById,  getBidByChitFundId,getEmailsOfChitWinners};

import mongoose from "mongoose";
import { Bid } from "../models/Bid";
import { Request, Response } from "express";

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
    res.status(200).json(Bid);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const createBid = async (req: Request, res: Response) => {
  const bid = new Bid({
    BidID: req.body.BidID,
    ChitFundID: req.body.ChitFundID,
    UserID: req.body.UserID,
    BidAmount: req.body.BidAmount,
    BidDate: req.body.BidDate,
  });

  try {
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
export { getBids, getBidById, createBid, updateBidById, deleteBidById };

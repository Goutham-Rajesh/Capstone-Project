import mongoose from "mongoose";
import { Chitfunds } from "../Model/ChitfundsModel";
import { Request, Response } from "express";

const getChitfunds = async (req: Request, res: Response) => {
  try {
    const Chitfund = await Chitfunds.find();
    res.status(200).json(Chitfund);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getChitfundById = async(req:Request,res:Response)=>{
    try{
        const Chitfund = await Chitfunds.findById(req.params.id);
        res.status(200).json(Chitfund);
    }catch(err){
        res.status(500).json({message:err});
    }
}

const  createChitfund = async(req:Request, res:Response)=>{
    try{
        const Chitfund = new Chitfunds(req.body);
        const savedChitfund = await Chitfund.save();
        res.status(201).json(savedChitfund);
    }
    catch(err){
        res.status(500).json({message:err});
    }
}

export {getChitfunds, getChitfundById, createChitfund};

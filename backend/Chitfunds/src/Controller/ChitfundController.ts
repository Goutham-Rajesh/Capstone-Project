import mongoose from "mongoose";
import { Chitfunds } from "../Model/ChitfundsModel";
import { Request, Response } from "express";
import axios from 'axios'


interface User {
    name: string;
    email: string;
    phone: string;
    address?: string;
  }

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

const updateChitfundById = async(req:Request, res:Response)=>{
    const {participantId} = req.body;
    try{
        const updatedChitfund = await Chitfunds.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { Participants: participantId } },
            { new: true }
        );
        res.status(200).json(updatedChitfund);
    }catch(err){
        res.status(500).json({message:err});
    }
}

const getchitfundByParticipantId = async(req:Request, res:Response)=>{
    try{
        const Chitfund = await Chitfunds.find({Participants:req.params.id});
        res.status(200).json(Chitfund);
    }catch(err){
        res.status(500).json({message:err});
    }
}


const getchitfundByCreatorId = async(req:Request, res:Response)=>{
  try{
    console.log("inside the creator")
    console.log(req.params.id)
      const Chitfund = await Chitfunds.find({CreatorID:req.params.id});
      res.status(200).json(Chitfund);
  }catch(err){
      res.status(500).json({message:err});
  }
}

const deleteChitfundById = async(req:Request, res:Response)=>{
    try{
        const deletedChitfund = await Chitfunds.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedChitfund);
    }catch(err){
        res.status(500).json({message:err});
    }
}

const removeParticipantFromChitfund = async(req:Request, res:Response)=>{
    const {participantId} = req.body;
    try{
        const updatedChitfund = await Chitfunds.findByIdAndUpdate(
            req.params.id,
            { $pull: { Participants: participantId } },
            { new: true }
        );
        res.status(200).json(updatedChitfund);
    }catch(err){
        res.status(500).json({message:err});
    }
}


//chitFund/participants/email/


const getParticipantEmails = async (req:Request, res:Response)=> {
    try {
        const chitFund = await Chitfunds.findById(req.params.id);
        
        

      let participants:number[]=[]
      if(!chitFund)
      {
        res.status(404).json({});

      }
      else{
        participants=chitFund.Participants;
      }

        // Initialize an array to store emails
        const emails: string[] = []; // Specify that emails is an array of strings

        // Loop through each participant ID to fetch the email
        for (const id of participants) {
            try {
                const response = await axios.get(`http://localhost:5000/user/getemail/${id}`);
                emails.push(response.data.email);
            } catch (err) {
                console.error(`Error fetching email for user ID ${id}:`, err);
            }
        }

        // Send the list of emails as response
        res.status(200).json({ emails:emails }); // Use return here for consistency

    } catch (err) {
         res.status(500).json({ message: "Error fetching chit fund data" });
    }
};




async function getParticipantsDetails(participants: number[]): Promise<User[]> {
    const users: User[] = [];

    for (const id of participants) {
        try {
            const response = await axios.get<User>(`http://localhost:5000/user/${id}`);
            console.log(response.data);
            users.push(response.data);
        } catch (err) {
            console.error(`Error fetching details for user ID ${id}:`, err);
        }
    }
    return users;
}

const getListOfParticipantsByChitfundId = async (req: Request, res: Response) => {
    try {
        const chitFund = await Chitfunds.findById(req.params.id);

        if (!chitFund) {
            res.status(404).json({ message: 'ChitFund not found' });
        }
        let participants:number[]=[]
      if(!chitFund)
      {
        res.status(404).json({});

      }
      else{
        participants=chitFund.Participants;
      }

        const users = await getParticipantsDetails(participants);
        
         res.status(200).json(users);
    } catch (error) {
        console.error("Error in getListOfParticipantsByChitfundId:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const getParticipantDetail = async (req:Request, res:Response)=> {
    try {
        const chitFund = await Chitfunds.findById(req.params.id);
        
        

      let participants:number[]=[]
      if(!chitFund)
      {
        res.status(404).json({});

      }
      else{
        participants=chitFund.Participants;
      }

      

        // Initialize an array to store emails
        const users: User[] = []; // Specify that emails is an array of strings

        // Loop through each participant ID to fetch the email
        for (const id of participants) {
            try {
                const response = await axios.get(`http://localhost:5000/user/${id}`);
                console.log(response.data);
                users.push(response.data);
            } catch (err) {
                console.error(`Error fetching email for user ID ${id}:`, err);
            }
        }

        // Send the list of emails as response
        res.status(200).json(users); // Use return here for consistency

    } catch (err) {
         res.status(500).json({ message: "Error fetching chit fund data" });
    }
};

    
   
    

    








export {getChitfunds, getChitfundById, createChitfund,getchitfundByParticipantId,updateChitfundById,getchitfundByCreatorId,deleteChitfundById,removeParticipantFromChitfund,getParticipantEmails,getParticipantDetail,getListOfParticipantsByChitfundId};

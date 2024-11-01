import express from "express";
import mongoose from "mongoose";
import router from "./Routes/ChitfundRoutes";
import cors from "cors"
const PORT = 5001;

const app = express();

app.use(cors())

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/Chitfunds').then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error connecting to MongoDB", err);
});



app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



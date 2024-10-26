import { getChitfunds, getChitfundById , createChitfund } from "../Controller/ChitfundController";
import express from "express";

const router = express.Router();

router.get("/getchitfunds", getChitfunds);
router.get("/getchitfundbyid/:id", getChitfundById);
router.post("/createChitfund", createChitfund);

export default router;

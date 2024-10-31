import { getChitfunds, getChitfundById , createChitfund, getchitfundByParticipantId, updateChitfundById, getchitfundByCreatorId, deleteChitfundById, removeParticipantFromChitfund } from "../Controller/ChitfundController";
import express from "express";

const router = express.Router();

router.get("/getChitFunds", getChitfunds);
router.get("/getChitFundById/:id", getChitfundById);
router.post("/createChitFund", createChitfund);
router.get("/getChitFundByParticipantId/:id", getchitfundByParticipantId);
router.get("/getChitFundByCreatorId/:id", getchitfundByCreatorId);
router.post("/updateChitFundById/:id", updateChitfundById);
router.delete("/deleteChitFundById/:id", deleteChitfundById);
router.put("/removeParticipantFromChitfund/:id", removeParticipantFromChitfund);

export default router;

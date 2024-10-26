import { getChitfunds, getChitfundById , createChitfund, getchitfundByParticipantId, updateChitfundById, getchitfundByCreatorId } from "../Controller/ChitfundController";
import express from "express";

const router = express.Router();

router.get("/getchitfunds", getChitfunds);
router.get("/getchitfundbyid/:id", getChitfundById);
router.post("/createChitfund", createChitfund);
router.get("/getchitfundbyparticipantid/:id", getchitfundByParticipantId);
router.get("/getchitfundbyCreatorid/:id", getchitfundByCreatorId);
router.post("/updatechitfundbyid/:id", updateChitfundById);

export default router;

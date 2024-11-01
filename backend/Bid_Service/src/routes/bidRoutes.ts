import { Router } from 'express';
import { createBid, deleteBidById, getBidByChitFundId, getBidById, getBids, updateBidById } from '../Controller/BidController';


const router = Router();

router.get('/getBids',getBids);
router.get('/getBidById/:id', getBidById);
router.get('/getBidByChitFundId/:chitFundId',getBidByChitFundId);
router.post('/createBid', createBid);
router.put('/updateBidById/:id', updateBidById);
router.delete('/deleteBidById/:id', deleteBidById);


export default router;

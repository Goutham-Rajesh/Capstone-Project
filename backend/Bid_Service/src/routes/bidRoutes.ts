import { Router } from 'express';
import { createBid, deleteBidById, getBidById, getBids, updateBidById } from '../Controller/BidController';


const router = Router();

router.get('/getBids',getBids);
router.get('/getBidById/:id', getBidById);
router.post('/createBid', createBid);
router.put('/updateBidById/:id', updateBidById);
router.delete('/deleteBidById/:id', deleteBidById);


export default router;

import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { authenticateJWT } from '../middleware/authMiddleware';
//import { config } from '../config/config';

const router = express.Router();

router.use(express.json());

// Protect these routes with JWT authentication
router.use('/auth', authenticateJWT, createProxyMiddleware({
  target: 'http://localhost:3001' ,
  changeOrigin: true,

}));

router.use('/chit', authenticateJWT, createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
 
}));

export default router;

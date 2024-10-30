import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { authenticateJWT } from '../middleware/authMiddleware';
//import { config } from '../config/config';

const router = express.Router();

router.use(express.json());

// Protect these routes with JWT authentication
router.use('/service-a', authenticateJWT, createProxyMiddleware({
  target: config.serviceAUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/api/service-a': '', // Remove base path when forwarding
  },
}));

router.use('/service-b', authenticateJWT, createProxyMiddleware({
  target: config.serviceBUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/api/service-b': '',
  },
}));

export default router;

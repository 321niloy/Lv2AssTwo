import express, { Request, Response } from 'express';
import { orderController } from './order.controller';
const router = express.Router();

router.post('', orderController.postOrder);
router.get('', orderController.getOrder);

router.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route Not Found',
  });
});

export const OrderRoute = router;

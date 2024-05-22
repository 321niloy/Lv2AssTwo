import express, { Request, Response } from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

router.get('', ProductController.getProducts);
router.post('', ProductController.createProduct);
router.get('/:productId', ProductController.getSingleProduct);
router.put('/:productId', ProductController.updateSingelProduct);
router.delete('/:productId', ProductController.DeleteSingelProduct);

router.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route Not Found',
  });
});

export const productRoute = router;

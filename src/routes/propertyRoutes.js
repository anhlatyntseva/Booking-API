import express from 'express';
import * as propertyController from '../controllers/propertyController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', propertyController.getAllProperties);
router.post('/', authMiddleware, propertyController.createProperty);
router.get('/:id', propertyController.getPropertyById);
router.put('/:id', authMiddleware, propertyController.updateProperty);
router.delete('/:id', authMiddleware, propertyController.deleteProperty);

export default router;
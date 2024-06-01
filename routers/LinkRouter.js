import express from 'express';
import LinksController from '../controllers/LinksController.js';
import authenticateJWT from '../jwt.js';

const router = express.Router();

router.get('/', authenticateJWT, LinksController.getAll);
router.get('/:id', authenticateJWT, LinksController.getById);
router.post('/', authenticateJWT, LinksController.create);
router.put('/:id', authenticateJWT, LinksController.update);
router.delete('/:id', authenticateJWT, LinksController.delete);

router.get('/redirect/:id', LinksController.redirect);
router.get('/stats/:id',authenticateJWT, LinksController.getClickStats);

export default router;
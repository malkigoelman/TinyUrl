import express from 'express';
import LinksController from '../controllers/LinksController.js';

const router = express.Router();

router.get('/', LinksController.getAll);
router.get('/:id', LinksController.getById);
router.post('/', LinksController.create);
router.put('/:id', LinksController.update);
router.delete('/:id', LinksController.delete);

router.get('/redirect/:id',LinksController.redirect);
router.get('/stats/:id', LinksController.getClickStats);

export default router;
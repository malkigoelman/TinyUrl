import express from 'express';
import UsersController from '../controllers/UsersController.js';

const router = express.Router();

router.get('/', UsersController.getAll);
router.get('/:id', UsersController.getById);
router.post('/', UsersController.create);
router.put('/:id', UsersController.update);
router.delete('/:id', UsersController.delete);

export default router;
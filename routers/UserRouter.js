import express from 'express';
import UsersController from '../controllers/UsersController.js';
import authenticateJWT from '../jwt.js';

const router = express.Router();

router.get('/',authenticateJWT, UsersController.getAll);
router.get('/:id',authenticateJWT, UsersController.getById);
router.post('/',authenticateJWT, UsersController.create);
router.put('/:id',authenticateJWT, UsersController.update);
router.delete('/:id',authenticateJWT, UsersController.delete);

router.post('/register', UsersController.register);
router.post('/login', UsersController.login);

export default router;
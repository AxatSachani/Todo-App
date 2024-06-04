import express from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo, markUnComplateTodo, markComplateTodo } from '../controllers/todoController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/:tododate?', authenticate, getTodos);
router.post('/', authenticate, createTodo);
router.patch('/:id', authenticate, updateTodo);
router.delete('/:id', authenticate, deleteTodo);
router.patch('/complate/:id', authenticate, markComplateTodo);
router.patch('/uncomplate/:id', authenticate, markUnComplateTodo);

export default router;

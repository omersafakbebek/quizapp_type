import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';
import userRoutes from './routes/user.routes';
import quizRoutes from './routes/quiz.routes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);
router.use('/users',userRoutes);
router.use('/quizzes',quizRoutes);
export default router;

import {Router,Response,Request, NextFunction} from 'express';
import { AnyZodObject, ZodError } from 'zod';
const router=Router();
import {Quiz,QuizWithId,Quizzes} from '../models/quiz.model';
import * as QuizHandlers from '../handlers/quiz.handlers';  
import {validateRequest} from '../../middlewares' 
import { ParamsWithId } from '../../interfaces/ParamsWithId';
router.get('/',QuizHandlers.findAll);
router.post('/',validateRequest({
    body:Quiz,
}),
QuizHandlers.createOne);
router.get('/:id',
    validateRequest({
        params:ParamsWithId,
    }),
    QuizHandlers.findOne
);
router.put('/:id',
    validateRequest({
        params:ParamsWithId,
        body:Quiz
    }),
    QuizHandlers.updateOne
);
router.delete('/:id',
    validateRequest({
        params:ParamsWithId
    }),
    QuizHandlers.deleteOne
);


export default router;



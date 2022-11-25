import { WithId } from 'mongodb';
import * as z from 'zod';
import {db} from '../../db';
//validator

const Answer=z.object({
    answer:z.string()
});
export const Quiz=z.object({
    question:z.string({required_error:"Question is required."}).min(3),
    answers:z.array(Answer)    
});

export type Quiz=z.infer<typeof Quiz>;
export type QuizWithId=WithId<Quiz>;
export const Quizzes=db.collection<Quiz>('user');
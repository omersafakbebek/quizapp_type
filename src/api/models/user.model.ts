import { WithId } from 'mongodb';
import * as z from 'zod';
import {db} from '../../db';
//validator
export const User=z.object({
    username:z.string({required_error:"Username is required."}).min(3),
    password:z.string({required_error:"Password is required."}).min(3),
    name:z.string().nullable(),
    surname:z.string().nullable(),
    email:z.string().email(),
    role:z.string()
});

export type User=z.infer<typeof User>;
export type UserWithId=WithId<User>;
export const Users=db.collection<User>('user');
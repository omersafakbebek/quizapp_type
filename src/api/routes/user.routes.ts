import {Router,Response,Request, NextFunction} from 'express';
import { AnyZodObject, ZodError } from 'zod';
const router=Router();
import {User,UserWithId,Users} from '../models/user.model';
import * as UserHandlers from '../handlers/user.handlers';  
import {validateRequest} from '../../middlewares' 
import { ParamsWithId } from '../../interfaces/ParamsWithId';
router.get('/',UserHandlers.findAll);
router.post('/',validateRequest({
    body:User,
}),
UserHandlers.createOne);
router.get('/:id',
    validateRequest({
        params:ParamsWithId,

    }),
    UserHandlers.findOne
);
router.put('/:id',
    validateRequest({
        params:ParamsWithId,
        body:User
    }),
    UserHandlers.updateOne
);
router.delete('/:id',
    validateRequest({
        params:ParamsWithId
    }),
    UserHandlers.deleteOne
);


export default router;



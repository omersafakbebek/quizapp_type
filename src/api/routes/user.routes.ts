import {Router,Response,Request, NextFunction} from 'express';
import { AnyZodObject, ZodError } from 'zod';
const router=Router();
import {User} from '../models/user.model';
import { UserValidator } from '../../interfaces/user.interface';
import * as UserHandlers from '../handlers/user.handlers';  
import {validateRequest} from '../../middlewares' 
import { ParamsWithId } from '../../interfaces/ParamsWithId';
router.get('/',UserHandlers.findAll);
router.post('/',validateRequest({
    body:UserValidator,
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
        body:UserValidator
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



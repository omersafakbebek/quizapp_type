import { Response,Request, NextFunction } from "express";
import { InsertOneResult, ObjectId } from "mongodb";
import { ParamsWithId } from "../../interfaces/ParamsWithId";
import { User} from "../models/user.model";

export async function findAll(req:Request,res:Response,next:NextFunction){
    try{
        const result= await User.find();
        res.json(result);
    }catch(err){
        next(err);
    }
}

export async function createOne(req: Request  , res: Response,next:NextFunction) {
    try {
        const user = new User({
            ...req.body
        });
        res.json(await user.save());        
        
    } catch (error) {
        next(error);
    }
};
export async function findOne(req:Request<ParamsWithId,{},{}>,res:Response,next:NextFunction) {
    try {
        const result=await User.findOne({
            _id:new ObjectId(req.params.id)
        });
        if(!result){
            res.status(404);
            throw new Error(`User with id "${req.params.id}" not found`);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
    
}
export async function updateOne(req:Request<ParamsWithId>,res:Response,next:NextFunction) {
    try {
        const result=await User.findOneAndUpdate({
            _id:new ObjectId(req.params.id),
        },{
            $set:req.body,
        },{
            returnDocument:'after'
        });
        if(!result){
            res.status(404);
            throw new Error(`User with id "${req.params.id}" not found`);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}
export async function deleteOne(req:Request<ParamsWithId,{},{}>,res:Response<{}>,next:NextFunction) {
    try {
        const result = await User.findOneAndDelete({
            _id:new ObjectId(req.params.id)
        });
        console.log(result);
        if(result){
            res.status(204).json(result);
        }
        res.status(404);
        throw new Error(`User with id "${req.params.id}" not found`);
    } catch (error) {
        next(error);
    }
}

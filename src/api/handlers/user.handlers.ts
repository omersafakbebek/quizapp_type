import { Response,Request, NextFunction } from "express";
import { InsertOneResult, ObjectId } from "mongodb";
import { ParamsWithId } from "../../interfaces/ParamsWithId";
import { User, Users, UserWithId } from "../models/user.model";

export async function findAll(req:Request,res:Response<UserWithId[]>,next:NextFunction){
    try{
        const result= Users.find();
        res.json(await result.toArray());
    }catch(err){
        next(err);
    }
}

export async function createOne(req: Request<{},UserWithId,User>  , res: Response<UserWithId>,next:NextFunction) {
    try {
        const insertResult=await Users.insertOne(req.body);
        res.json({_id:insertResult.insertedId,
        ...req.body});     
        
    } catch (error) {
        next(error);
    }
};
export async function findOne(req:Request<ParamsWithId,UserWithId,{}>,res:Response<UserWithId>,next:NextFunction) {
    try {
        const result=await Users.findOne({
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
export async function updateOne(req:Request<ParamsWithId,UserWithId,User>,res:Response<UserWithId>,next:NextFunction) {
    try {
        const result=await Users.findOneAndUpdate({
            _id:new ObjectId(req.params.id),
        },{
            $set:req.body,
        },{
            returnDocument:'after'
        });
        if(!result.value){
            res.status(404);
            throw new Error(`User with id "${req.params.id}" not found`);
        }
        res.json(result.value);
    } catch (error) {
        next(error);
    }
}
export async function deleteOne(req:Request<ParamsWithId,{},{}>,res:Response<{}>,next:NextFunction) {
    try {
        const result = await Users.findOneAndDelete({
            _id:new ObjectId(req.params.id)
        });
        if(!result.value){
            res.status(404);
            throw new Error(`User with id "${req.params.id}" not found`);
        }
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

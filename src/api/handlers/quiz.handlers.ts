import { Response,Request, NextFunction } from "express";
import { InsertOneResult, ObjectId } from "mongodb";
import { ParamsWithId } from "../../interfaces/ParamsWithId";
import { Quiz, Quizzes, QuizWithId } from "../models/quiz.model";

export async function findAll(req:Request,res:Response<QuizWithId[]>,next:NextFunction){
    try{
        const result= Quizzes.find();
        res.json(await result.toArray());
    }catch(err){
        next(err);
    }
}

export async function createOne(req: Request<{},QuizWithId,Quiz>  , res: Response<QuizWithId>,next:NextFunction) {
    try {
        const insertResult=await Quizzes.insertOne(req.body);
        res.json({_id:insertResult.insertedId,
        ...req.body});     
        
    } catch (error) {
        next(error);
    }
};
export async function findOne(req:Request<ParamsWithId,QuizWithId,{}>,res:Response<QuizWithId>,next:NextFunction) {
    try {
        const result=await Quizzes.findOne({
            _id:new ObjectId(req.params.id)
        });
        if(!result){
            res.status(404);
            throw new Error(`Quiz with id "${req.params.id}" not found`);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
    
}
export async function updateOne(req:Request<ParamsWithId,QuizWithId,Quiz>,res:Response<QuizWithId>,next:NextFunction) {
    try {
        const result=await Quizzes.findOneAndUpdate({
            _id:new ObjectId(req.params.id),
        },{
            $set:req.body,
        },{
            returnDocument:'after'
        });
        if(!result.value){
            res.status(404);
            throw new Error(`Quiz with id "${req.params.id}" not found`);
        }
        res.json(result.value);
    } catch (error) {
        next(error);
    }
}
export async function deleteOne(req:Request<ParamsWithId,{},{}>,res:Response<{}>,next:NextFunction) {
    try {
        const result = await Quizzes.findOneAndDelete({
            _id:new ObjectId(req.params.id)
        });
        if(!result.value){
            res.status(404);
            throw new Error(`Quiz with id "${req.params.id}" not found`);
        }
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

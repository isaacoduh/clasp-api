import { AppDataSource } from './../database/data-source';
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from '../database/entities/User';

declare global {
    namespace Express {
        interface Request {
            currentUser?: AuthPayload
        }
    }
}

interface AuthPayload {
    id: string
}

export class AuthMiddleware {
    static async authenticate(req: Request, res: Response, next: NextFunction) {
        const {authorization: tokenHeader} = req.headers;
        if(!tokenHeader) {
            return res.status(401).json({message: 'Token not found'});
        }
        const token = tokenHeader.split(' ')[1];
        try {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET || "x!GH#EEOE@");
            // @ts-ignore
            const {userId: id} = decoded;
            const repo = AppDataSource.getRepository(User);
            const user = await repo.findOneByOrFail({id});

            // @ts-ignore
            req?.user = user;
            req.currentUser = { id: user.id};
        } catch (error) {
            console.log(error);
            return res.status(401).json({message: 'Invalid Token'});
        }
        next();
    }
}
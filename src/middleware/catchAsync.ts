import { NextFunction, Request, Response } from "express"

const catchAsync = (fn: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

export {catchAsync};
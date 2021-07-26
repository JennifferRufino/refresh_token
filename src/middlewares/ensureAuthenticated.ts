import {Request, Response, NextFunction} from "express";
import {verify} from "jsonwebtoken";

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if(!authToken) {
        return response.status(401).json({message: "Token is missing!"});
    }

    //Bearer afafafdsfds1fs6g46f5g46fa65
    const [, token] = authToken.split(" ");

    try{
        verify(token, "3d21bd65-a093-4528-9a8a-92501ca3e546");

        return next();
    }catch(err) {
        return response.status(401).json({message: "Token invalid!"})
    }

    verify(token, "3d21bd65-a093-4528-9a8a-92501ca3e546");

}
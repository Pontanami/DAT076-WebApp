import express, { Request, Response } from "express";
import { userService } from "../service/user";
import { IUserService } from "../service/IUserService";

const UserService : IUserService= new userService()
export const userRouter = express.Router();

interface SignUpRequest extends Request {
    body: { username: string, password: string }
}

userRouter.post("/signup", async(
    req: SignUpRequest,
    res: Response<[number,string] | string>
    ) => {
        try {
            const username = req.body.username;
            const password = req.body.password;
            if (typeof(username) !== "string" || typeof(password) !== "string") {
                res.status(400).send(`Bad PUT call to ${req.originalUrl} --- playerName has type ${typeof(username)} and playerPassword has type ${typeof(password)}`);
                return;
            }

            let isUsernameTaken = await UserService.isUsernameTaken(username)
            if(isUsernameTaken){
                res.status(409).send(`Username is taken`);
                return;
            }

            let user = await UserService.createUser(username, password); 
            res.status(201).send(user);
        
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    });


interface LoginRequest extends Request {
    body: {username : string, password : string}
}

userRouter.post("/login", async (
    req: LoginRequest,
    res: Response<[number,string] | string>
) => {
    try {
        const uname = req.body.username;
        const password = req.body.password;

        if(!uname || !password){
            res.status(400).send(`Bad Get call to ${req.originalUrl} --- missing username or password param`);
            return;
        }

        const user = await UserService.login(uname, password);
        if(!user)
            res.status(404).send(`Player with name ${uname} not found`);
        else{
            res.status(200).json(user)
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
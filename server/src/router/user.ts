import express, { Request, Response } from "express";
import { userService } from "../service/user";
import { IUserService } from "../service/IUserService";

const UserService : IUserService= new userService()
export const userRouter = express.Router();

userRouter.post("/", async(
    req: Request<{}, {}, {username: string, password: string}>,
    res: Response<number | string>
    ) => {
        try {
            const username = req.body.username;
            const password = req.body.password;
            if (typeof(username) !== "string" || typeof(password) !== "number") {
                res.status(400).send(`Bad PUT call to ${req.originalUrl} --- playerId has type ${typeof(username)} and gameId has type ${typeof(password)}`);
                return;
            }

            let userId = await UserService.createUser(username, password); 
            res.status(200).send(userId);
        
        } catch (e: any) {
            console.log(e)
            res.status(500).send(e.message);
        }
    });



userRouter.get("/", async (
    req: Request<{username : string, password : string}, {}, {}>,
    res: Response<number | string>
) => {
    try {
        let username = req.params.username;
        let password = req.params.password
        if (username == null || password == null) {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- missing id param`);
            return;
        }

        const userId = await UserService.login(username, password);
        if(!userId)
            res.status(404).send(`Player with name ${name} not found`);
        else{
        res.status(200).send(userId);
        }
    } catch (e: any) {
        //console.log("Det är knas")
        res.status(500).send(e.message);
    }
});
import express, { Request, Response } from "express";
import { userService } from "../service/user";
import { IUserService } from "../service/IUserService";

const UserService : IUserService= new userService()
export const userRouter = express.Router();

interface RegisterRequest extends Request{
    body : {username : string, password : string}
}

userRouter.post("/", async(req : RegisterRequest, res) =>{
    try{
        //TODO: Logik för router user....
        //409 om man inte kunde logga in...
    }catch(e : any){
        res.status(500).send(e.message)
    }
})

userRouter.post("/signup", async(
    req: Request<{}, {}, {username: string, password: string}>,
    res: Response<[number,string] | string>
    ) => {
        try {
            const username = req.body.username;
            const password = req.body.password;
            if (typeof(username) !== "string" || typeof(password) !== "string") {
                res.status(400).send(`Bad PUT call to ${req.originalUrl} --- playerName has type ${typeof(username)} and playerPassword has type ${typeof(password)}`);
                return;
            }

            let user = await UserService.createUser(username, password); 
            res.status(200).send(user);
        
        } catch (e: any) {
            console.log(e)
            res.status(500).send(e.message);
        }
    });


//TODO: Ändra till en POST för den ändrar servern
userRouter.get("/login", async (
    req: Request<{username : string, password : string}, {}, {}>,
    res: Response<[number,string] | string>
) => {
    try {
        console.log("hello")
        const uname = req.query.username?.toString();
        const password = req.query.password?.toString();

        if(!uname || !password){
            res.status(400).send(`Bad Get call to ${req.originalUrl} --- missing id param`);
            return;
        }
        /*
        if (uname === null || password === null) {
            res.status(400).send(`Bad Get call to ${req.originalUrl} --- missing id param`);
            return;
        }*/

        const user = await UserService.login(uname, password);
        if(!user)
            res.status(404).send(`Player with name ${uname} not found`);
        else{
            res.status(200).json(user)
        }
    } catch (e: any) {
        //console.log("Det är knas")
        res.status(500).send(e.message);
    }
});
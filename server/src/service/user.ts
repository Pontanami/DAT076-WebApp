import { user } from "../model/user"
import { IUserService } from "./IUserService";


export class userService implements IUserService{

    private users : user[] = []

    async createUser(username : string, password : string) : Promise<number>{

        let UsernameTaken = await this.isUsernameTaken(username);

        if(UsernameTaken)
            throw new Error("Username is already taken");

        let createdUser = {
            id: Date.now(),
            username: username,
            password: password
        }

        this.users.push(createdUser)

        return createdUser.id

    }

    private async isUsernameTaken(username: string) : Promise<boolean>{
        let user = this.users.find(user => user.username === username)
        if(!user)
            return false
        return true
    }
    
    async login(username : string, password : string) : Promise<number>{
        let user = this.users.find(user => user.username === username)

        if(!user)
            throw new Error("Username doesn't exist");
        
        else if(user.password !== password)
            throw new Error("Password doesn't match");
        
        return user.id
    }
}
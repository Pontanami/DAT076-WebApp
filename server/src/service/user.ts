import { Model } from "mongoose";
import { userModel } from "../db/user.db";
import { user } from "../model/user";
import { IUserService } from "./IUserService";

export class userService implements IUserService {

  async createUser(username: string, password: string): Promise<[number, string]> {
    const um: Model<user> = await userModel;

    let UsernameTaken = await this.isUsernameTaken(username);

    if (UsernameTaken) throw new Error("Username is already taken");

    let createdUser = await um.create({
      id: new Date().valueOf(),

      username: username,

      password: password,
    });

    return [createdUser.id, createdUser.username];
  }
  private async isUsernameTaken(uname: string): Promise<boolean> {
    const um: Model<user> = await userModel;
    const result = await um.find({ username: uname });

    //Atleast one user was found with the same username
    return result.length === 1;
  }

  async login(uname: string, password: string): Promise<[number, string]> {
    const um: Model<user> = await userModel;
    const user = await um.findOne({ username: uname });
    if (!user) throw new Error("User doesn't exist");
    else if (user.password !== password)
      throw new Error("Username or Password doesn't match");

    return [user.id, user.username];
  }
}

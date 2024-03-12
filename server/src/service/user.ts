import { Model } from "mongoose";
import { userModel } from "../db/user.db";
import { user } from "../model/user";
import { IUserService } from "./IUserService";

export class userService implements IUserService {

   /** @inheritdoc */
  async createUser(username: string, password: string): Promise<[number, string]> {
    const um: Model<user> = await userModel;

    let createdUser = await um.create({
      id: new Date().valueOf(),

      username: username,

      password: password,
    });

    return [createdUser.id, createdUser.username];
  }

  /** @inheritdoc */
  async isUsernameTaken(uname: string): Promise<boolean> {
    const um: Model<user> = await userModel;
    const result = await um.find({ username: uname });
    return result.length === 1;
  }

  /** @inheritdoc */
  async login(uname: string, password: string): Promise<[number, string]> {
    const um: Model<user> = await userModel;
    const user = await um.findOne({ username: uname });
    if (!user || user.password !== password) throw new Error("Username or password is incorrect");

    return [user.id, user.username];
  }
}

import { Model } from "mongoose";
import { userModel } from "../db/user.db";
import { user } from "../model/user";
import { IUserService } from "./IUserService";

export class userService implements IUserService {

   /** @inheritdoc */
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

  /**
  * Asynchronously checks if a username is already taken.
  * 
  * @param {string} uname - The username to check.
  * @returns {Promise<boolean>} - Returns true if the username is taken, otherwise false.
   */
  private async isUsernameTaken(uname: string): Promise<boolean> {
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

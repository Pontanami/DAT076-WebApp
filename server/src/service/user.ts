import { Model } from "mongoose";
import { userModel } from "../db/user.db";
import { user } from "../model/user";
import { IUserService } from "./IUserService";

export class userService implements IUserService {

  /**
 * Asynchronously creates a new user with the provided username and password.
 * 
 * @param {string} username - The username of the new user.
 * @param {string} password - The password of the new user.
 * @returns {Promise<[number, string]>} - returns the id and name of the created user.
 * @throws {Error} - Throws an error if the provided username is already taken.
 */
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

  /**
   * Asynchronously logs in a user with the provided username and password.
   * 
   * @param {string} uname - The username of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<[number, string]>} - Returns the id and name of the logged in user.
   * @throws {Error} - Throws an error if the user doesn't exist or if the username or password doesn't match.
    */ 
  async login(uname: string, password: string): Promise<[number, string]> {
    const um: Model<user> = await userModel;
    const user = await um.findOne({ username: uname });
    if (!user) throw new Error("User doesn't exist");
    else if (user.password !== password)
      throw new Error("Username or Password doesn't match");

    return [user.id, user.username];
  }
}

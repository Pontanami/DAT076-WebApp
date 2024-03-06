export interface IUserService {

    /**
   * Asynchronously creates a new user with the provided username and password.
   * 
   * @param {string} username - The username of the new user.
   * @param {string} password - The password of the new user.
   * @returns {Promise<[number, string]>} - returns the id and name of the created user.
   * @throws {Error} - Throws an error if the provided username is already taken.
   */
    createUser(username: string, password: string): Promise<[number, string]>

/**
   * Asynchronously logs in a user with the provided username and password.
   * 
   * @param {string} uname - The username of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<[number, string]>} - Returns the id and name of the logged in user.
   * @throws {Error} - Throws an error if the user doesn't exist or if the username or password doesn't match.
    */
    login(username: string, password: string): Promise<[number, string]>

}
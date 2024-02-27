export interface IUserService {

    // createUser creates a new user with the given username and password
    // returns a tuple with the id and username of the created user
    createUser(username: string, password: string): Promise<[number, string]>

    // login checks if the given username and password match
    // returns a tuple with the id and username of the user
    login(username: string, password: string): Promise<[number, string]>

}
export interface IUserService{

    createUser(username : string, password: string) : Promise<[number, string]>

    login(username : string, password: string) : Promise<[number, string]>

}
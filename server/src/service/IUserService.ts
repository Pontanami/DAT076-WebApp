export interface IUserService{

    createUser(username : string, password: string) : Promise<number>

    login(username : string, password: string) : Promise<number>

}
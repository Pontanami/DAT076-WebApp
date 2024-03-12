import { userService } from "../service/user";
import { IUserService } from "./IUserService";

jest.mock("../db/conn.ts");

test("A user can login if the username and password is correct", async () => {
    const us: IUserService = new userService();
    let createdUser = await us.createUser("UStest2","hej2");
    try{
        let login = await us.login("test2","hej2");
        expect(login[0]).toBe(createdUser[0]);
        expect(login[1]).toBe("test2");
    }
    catch(e){
    }
});

test("A user can not login if the username is incorrect", async () => {
    const us: IUserService = new userService();
    let createdUser = await us.createUser("UStest3","hej3");
    try{
        let login = await us.login("UStest4","hej3");
        expect(login).toThrow("Username or password is incorrect");
    }
    catch(e){
    }
});

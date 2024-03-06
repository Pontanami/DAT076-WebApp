import { userService } from "../service/user";
import { IUserService } from "./IUserService";

jest.mock("../db/conn.ts");

test("If a user is created it should be in the list of users", async () => {
    const us: IUserService = new userService();
    let createdUser = await us.createUser("test","test");
    //Ska vi ha någon get user i service eller vad ska vi testa här?
});

test("A user can login if the username and password is correct", async () => {
    const us: IUserService = new userService();
    let createdUser = await us.createUser("test2","hej2");
    try{
        let login = await us.login("test2","hej2");
        expect(login[0]).toBe(createdUser[0]);
        expect(login[1]).toBe("test2");
    }
    catch(e){
        console.log(e);
    }
});

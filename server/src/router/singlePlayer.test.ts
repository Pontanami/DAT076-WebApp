import exp from "constants";
import * as SuperTest from "supertest";
import { Game } from "../model/game";
import { PlayerService } from "../service/player";
import { singlePlayerService } from "../service/singlePlayer";
import { app } from "../start";


const request = SuperTest.default(app);


test("Check post session test", async () => {

  //TODO
});
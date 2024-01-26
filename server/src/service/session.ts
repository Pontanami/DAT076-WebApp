import {Session} from "../model/session";

export class PlayerService{
    //private currentPlayer : Player;

    async createSession(): Promise<Session>{
        let newSession : Session = {
            id : Date.now(),
            players : []
        }

        return { ... newSession};
    }

}
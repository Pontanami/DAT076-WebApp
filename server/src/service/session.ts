import { Player } from "../model/player";
import {Session} from "../model/session";

export class SessionService{
    players : Player[] = [];

    async createSession(): Promise<Session>{
        let newSession : Session = {
            id : Date.now(),
            players : []
        }

        return { ... newSession};
    }

    async addPlayerToSession(sessionId: number, player: Player): Promise<Session>{
        this.players.push(player);
        let newSession : Session = {
            id : sessionId,
            players : this.players
        }

        return { ... newSession};
    }

    async getSessionPlayers(sessionId: number): Promise<Player[]> {
          return JSON.parse(JSON.stringify(this.players));
    }

}
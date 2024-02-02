import { Player } from "../model/player";
import {Session} from "../model/session";

export class SessionService{
    sessions : Session[] = [];

    async createSession(): Promise<Session>{
        let newSession : Session = {
            id : Date.now(),
            players : []
        }

        return JSON.parse(JSON.stringify(newSession));
    }
/*
    async addPlayerToSession(sessionId: number, pId: number, pName: string , pScore: number): Promise<Session | undefined>{
         = this.getSession(sessionId)

        if (!session)
            return undefined;

        let player : Player = {
            id : pId,
            name : pName,
            score : pScore
        }
        
        

        return { ... newSession};
    }
*/
    async getSessionPlayers(sessionId: number): Promise<Player[] | undefined> {
        let session = this.sessions.find(session => session.id = sessionId);

        if(!session)
            return undefined;

        return JSON.parse(JSON.stringify(session));
    }

    private async getSession(sessionId: number): Promise<Session | undefined> {
        let session = this.sessions.find(session => session.id = sessionId);
        

        if(!session)
            return undefined;

        return session;
    }



}
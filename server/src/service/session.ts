import { Player } from "../model/player";
import {Session} from "../model/session";
import { PlayerService } from "./player";

export class SessionService{
    sessions : Session[] = [];
    private playerService = new PlayerService();

    async createSession(): Promise<Session>{
        let newSession : Session = {
            id : Date.now(),
            players : []
        }
        this.sessions.push(newSession);
        return JSON.parse(JSON.stringify(newSession));
    }

    async addPlayerToSession(sessionId: number, playerId: number): Promise<Session | undefined>{
        let session = await this.getSession(sessionId);
        let player = await this.playerService.getPlayer(playerId)
        console.log(`Added player ${player}`)
        if (!session || !player)
            return undefined;
        
        session.players.push(player);
        console.log(`Session players: ${session.players}`)
        return session;
    }

    async getSessionPlayers(sessionId: number): Promise<Player[] | undefined> {
        let session = this.sessions.find(session => session.id = sessionId);

        if(!session)
            return undefined;

        return JSON.parse(JSON.stringify(session));
    }

    async getSession(sessionId: number): Promise<Session | undefined> {
        let session = this.sessions.find(session => session.id = sessionId);
        if(!session)
            return undefined;

        return session;
    }

    async getAllSessions(): Promise<Session[]> {
        return JSON.parse(JSON.stringify(this.sessions));
    }
}
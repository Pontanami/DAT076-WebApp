import { Course } from "../model/course";
import { Player } from "../model/player";
import {Session} from "../model/session";
import { CourseService } from "./course";
import { PlayerService } from "./player";

export class SessionService{
    sessions : Session[] = [];

    playerService = PlayerService.getInstance();
    courseService = CourseService.getInstance();

    async createSession(): Promise<Session>{
        let newSession : Session = {
            id : Date.now(),
            players : [],
            questions : [],
            qIndex : 0
        }
        this.sessions.push(newSession);
        return JSON.parse(JSON.stringify(newSession));
    }

    async addPlayerToSession(sessionId: number, playerId: number): Promise<Session | undefined>{
        let session = await this.getSession(sessionId);
        let player = await this.playerService.getPlayer(playerId)
        if (!session || !player)
            return undefined;
        
        session.players.push(player);

        return session;
    }

    async getSessionPlayers(sessionId: number): Promise<Player[] | undefined> {
        let session = this.sessions.find(session => session.id === sessionId);

        if(!session)
            return undefined;

        return JSON.parse(JSON.stringify(session.players));
    }

    async getSession(sessionId: number): Promise<Session | undefined> {
        let session = this.sessions.find(session => session.id === sessionId);
        if(!session)
            return undefined;

        return session;
    }

    async getAllSessions(): Promise<Session[]> {
        return JSON.parse(JSON.stringify(this.sessions));
    }

    async addQuestion(sessionId: number, code: string) : Promise<Session | undefined>{
        let session = await this.getSession(sessionId)
        let course = await this.courseService.getCourse(code)
        console.log(JSON.stringify(session))
        console.log(JSON.stringify(course))
        if(!session || !course)
            return undefined;
        
        session.questions.push(course);
        console.log(` Session Questions: ${JSON.stringify(session.questions)}`);
        
        return session;
    }

    async getSessionQuestions(sessionId : number) : Promise<Course[] | undefined>{
        let session = await this.getSession(sessionId)
        if(!session)
            return undefined;

        return JSON.parse(JSON.stringify(session.questions))
    }

    async hello(sessionId: number) : Promise<number | undefined>{
        let session = await this.getSession(sessionId)
        if(!session)
            return undefined;
        let qIndex = session.qIndex;
        let course1 = session.questions[qIndex]
        let course2 = session.questions[qIndex]
    }
}
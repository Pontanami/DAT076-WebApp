import { Course } from "../model/course";
import { Player } from "../model/player";
import {Session} from "../model/game";
import { CourseService } from "./course";
import { PlayerService } from "./player";

export class SessionService{
    sessions : Session[] = [];

    playerService = PlayerService.getInstance();
    courseService = CourseService.getInstance();
    //vara kvar
    async createSession(): Promise<Session>{
        let newSession : Session = {
            id : Date.now(),
            questions : [],
        }
        this.sessions.push(newSession);
        return JSON.parse(JSON.stringify(newSession));
    }
    //Multi
    
    //Multi
    
    //vara kvar/ta bort
    async getSession(sessionId: number): Promise<Session | undefined> {
        let session = this.sessions.find(session => session.id === sessionId);
        if(!session)
            return undefined;

        return session;
    }
    //vara kvar/bort
    async getAllSessions(): Promise<Session[]> {
        return JSON.parse(JSON.stringify(this.sessions));
    }
    //vara kvar
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
    //vara kvar
    async getSessionQuestions(sessionId : number) : Promise<Course[] | undefined>{
        let session = await this.getSession(sessionId)
        if(!session)
            return undefined;

        return JSON.parse(JSON.stringify(session.questions))
    }

    async checkAnswer(courseClickedId: string, course2Id: string, playerId : number){
        let courseService = CourseService.getInstance();
        let isCorrect = await courseService.checkAnswer(courseClickedId, course2Id)

        if(isCorrect){
            let player =  await this.playerService.getPlayer(playerId)
            if(player)
                await this.playerService.updatePlayerScore(player.id)
        }
        else
            console.log("Game over")
            //Quit game
    }

}
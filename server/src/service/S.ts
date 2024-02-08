import { Course } from "../model/course";
import { S } from "../model/S";
import { CourseService } from "./course";
import { PlayerService } from "./player";

export abstract class SService{
    currentSession ?: S 

    playerService = PlayerService.getInstance();
    courseService = CourseService.getInstance();
    //vara kvar
    async createSession(): Promise<S>{
        let newSession : S = {
            id : Date.now(),
            questions : [],
        }
        this.currentSession = newSession;
        return JSON.parse(JSON.stringify(newSession));
    }

    //vara kvar/ta bort
    async getSession(): Promise<S | undefined> {
        return JSON.parse(JSON.stringify(this.currentSession));
    }
    //vara kvar
    async addQuestion(sessionId: number, code: string) : Promise<S | undefined>{
        let course = await this.courseService.getCourse(code)
        if(!this.currentSession||!course)
            return undefined;
        
        this.currentSession.questions.push(course);
        
        return this.currentSession;
    }
    //vara kvar
    async getSessionQuestions() : Promise<Course[] | undefined>{
        if(!this.currentSession)
            return undefined
        return JSON.parse(JSON.stringify(this.currentSession.questions))
    }

    async checkAnswer(courseClickedId: string, course2Id: string, playerId : number){
        let courseService = CourseService.getInstance();
        let isCorrect = await courseService.checkAnswer(courseClickedId, course2Id)

        if(isCorrect){
            //Ska metoden ens ta in en score? Det blir lite sus
            let player =  await this.playerService.getPlayer(playerId)

            if(player)
                this.playerService.updatePlayerScore(player.id, player.score)
        }
        else
            this.wrongAnswer();
    }

    abstract wrongAnswer() :  Promise<void>
}
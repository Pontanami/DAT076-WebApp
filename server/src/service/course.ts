import {Course} from "../model/course";

export class CourseService{

    async createCourse(name: string, code: string, passrate: number): Promise<Course>{
        let newCourse : Course = {
            code: code, 
            name: name,
            failrate : 100 - passrate
        }

        return { ... newCourse};
    }

}
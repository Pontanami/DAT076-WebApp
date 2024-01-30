import {Course} from "../model/course";

export class CourseService{
    courses: Course[] = [];

    async createCourse(name: string, code: string, passrate: number): Promise<Course>{
        const newCourse : Course = {
            code: code, 
            name: name,
            failrate : 100 - passrate
        }
        this.courses.push(newCourse)
        return { ... newCourse};
    }

    async getCourse(code: string): Promise<Course|undefined>{
        const course = this.courses.find(course => course.code === code);
        if(course){
            return { ... course};
        }
        return undefined;
        
    }

    async updateCourse(code: string, name: string, passrate: number): Promise<Course|undefined>{
        const course = this.courses.find(course => course.code === code);
        if(course){
            course.name = name;
            course.failrate = 100 - passrate;
            return { ... course};
        }
        return undefined;
    }

    async getListOfCourses(): Promise<Course[]> {
        return JSON.parse(JSON.stringify(this.courses));
    }

}
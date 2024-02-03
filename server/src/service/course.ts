import {Course} from "../model/course";

export class CourseService{
    courses: Course[] = [];

    private static instance : CourseService;

    public static getInstance() : CourseService{
        if (!CourseService.instance) {
            CourseService.instance = new CourseService();
        }
        return CourseService.instance;
    }

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
        if(!course){
            return undefined;
        }
        return course;
        
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
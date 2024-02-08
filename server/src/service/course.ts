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

    async createCourse(code: string, name: string, passrate: number): Promise<Course>{
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
        return { ... course};
    }

    async getListOfCourses(): Promise<Course[]> {
        return JSON.parse(JSON.stringify(this.courses));
    }

    async checkAnswer(courseClickedId: string, course2Id: string): Promise<boolean | undefined>{

        let courseClicked = await this.getCourse(courseClickedId);
        let course2 = await this.getCourse(courseClickedId);

        if(!courseClicked || !course2)
            return undefined

        else if(courseClicked.failrate >= course2.failrate){
            return true;
        }
        return false;
    }
}
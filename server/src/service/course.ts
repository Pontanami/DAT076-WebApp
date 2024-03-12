import { Course } from "../model/course";

export class CourseService {
    courses: Course[] = [];

    private static instance: CourseService;

    /**
     * Method for getting the course service singleton
     * @returns {CourseService} - Returns the course service singleton
     */
    public static getInstance(): CourseService {
        if (!CourseService.instance) {
            CourseService.instance = new CourseService();
        }
        return CourseService.instance;
    }

    /** @inheritdoc */
    async createCourse(code: string, name: string, program:string, failrate: number): Promise<Course> {
        const newCourse: Course = {
            code: code,
            name: name,
            program: program,
            failrate: failrate,
            bgnumber: 1
        };
        this.courses.push(newCourse);
        return { ...newCourse };
    }

    /** @inheritdoc */
    async getCourse(code: string): Promise<Course> {
        const course = this.courses.find((course) => course.code === code);
        if (!course) {
            throw new Error("Course doesn't exist.");
        }
        return { ...course };
    }

    /** @inheritdoc */
    async getListOfCourses(): Promise<Course[]> {
        return JSON.parse(JSON.stringify(this.courses));
    }

    /** @inheritdoc */
    async checkAnswer(courseClickedId: string, course2Id: string): Promise<boolean> {
        let courseClicked = await this.getCourse(courseClickedId);
        let course2 = await this.getCourse(course2Id);

        if (courseClicked.failrate >= course2.failrate) {
            return true;
        }
        return false;
    }
}

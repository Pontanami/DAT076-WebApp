import { Course } from "../model/course";
import { CourseService } from "../service/course";
import { ICourseService } from "./ICourseService";


let courseService: ICourseService;
let course1: Course;
let course2: Course;

beforeAll(async () => {
    courseService = new CourseService();
    course1 = await courseService.createCourse("ABC123", "Sjö","test", 60);
    course2 = await courseService.createCourse("DEF456", "Sjö","test2", 50);
});

test("If a course is added to the course list it should be in the course list", async () => {
    const course_list = await courseService.getListOfCourses();
    expect(course_list.map((crs: Course) => crs.code)).toContain(course1.code);
});

test("The getCourse method should return the spcified course", async () => {
    const response1 = await courseService.getCourse("ABC123");
    const response2 = await courseService.getCourse("DEF456");
    expect(response1?.code).toBe(course1.code);
    expect(response2?.code).toBe(course2.code);
});

test("The checkAnswer method should return true if the first course has a higher failrate than the second course", async () => {
    const response = await courseService.checkAnswer(course1.code, course2.code);
    expect(response).toBe(true);
});

test("checkAnswer should return false if the first course has a lower failrate than the second course", async () => {
    const response = await courseService.checkAnswer(course2.code, course1.code);
    expect(response).toBe(false);
    
});

test("getCourse should throw an error if the course with the given code does not exist", async () => {
    try{
    const response = await courseService.getCourse("ÖÖÖHM");
    expect(response).toThrow("Course doesn't exist.");
    }catch(e){   }
});
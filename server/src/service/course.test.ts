import { Course } from "../model/course";
import { CourseService } from "../service/course";

test("If a course is added to the course list it should be in the course list", async () => {
    const courseService = new CourseService();
    const course: Course = await courseService.createCourse("ABC123", "test", 50);
    const course_list = await courseService.getListOfCourses();
    expect(course_list.map((crs: Course) => crs.code)).toContain(course.code);
});

test("The getCourse method should return the spcified course", async () => {
    const courseService = new CourseService();

    const course1: Course = await courseService.createCourse("ABC123", "test", 50);
    const course2: Course = await courseService.createCourse("DEF456", "test2", 60);
    const response1 = await courseService.getCourse("ABC123");
    const response2 = await courseService.getCourse("DEF456");
    expect(response1?.code).toBe(course1.code);
    expect(response2?.code).toBe(course2.code);
});

test("The checkAnswer method should return true if the first course has a higher failrate than the second course", async () => {
    const courseService = new CourseService();
    const course1: Course = await courseService.createCourse("ABC123", "test", 60);
    const course2: Course = await courseService.createCourse("DEF456", "test2", 50);
    const response = await courseService.checkAnswer(course1.code, course2.code);
    expect(response).toBe(true);
});

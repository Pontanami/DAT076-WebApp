import { Course } from "../model/course";

export interface ICourseService {

    /**
    * Asynchronously creates a new course with the provided code, name and failrate.
    * 
    * @param code - The 3 letter, 3 number code of the new course.
    * @param name - The name of the new course.
    * @param failrate - The failrate of the new course.
    * @returns 
    */
    createCourse(code: string, name: string, failrate: number): Promise<Course>;

    /**
     * Asynchronously gets the course with the provided code.
     * 
     * @param code - The code of the course.
     * @returns {Promise<Course>} - Returns the course with the provided code, otherwise undefined.
     * @throws {Error} - Throws an error if the course doesn't exist.
     */
    getCourse(code: string): Promise<Course>;

    /**
     * Asynchronously gets a list of all courses.
     * 
     * @returns {Promise<Course[]>} - Returns a list of all courses.
     */
    getListOfCourses(): Promise<Course[]>;

    /**
     * Asynchronously checks if the answer provided is correct for the given courses
     * 
     * @param courseClickedId - The id of the course that was clicked.
     * @param course2Id - The id of the course that was not clicked.
     * @returns {Promise<boolean>} - Returns true if the answer is correct, otherwise false. Returns undefined if the courses don't exist.
     * @throws {Error} - Throws an error if one of the courses don't exist.
     */
    checkAnswer(courseClickedId: string, course2Id: string): Promise<boolean>;

}
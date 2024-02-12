import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Course {
    code: string;
    name: string;
    failrate: number;
}



function Singleplayer() {

    const [courseList, setCourseList] = useState<Course[]>([]);

    async function updateCourses() {
            try {
                const response = await axios.get<Course[]>("http://localhost:8080/session/getquestion");
                const newCourse: Course[] = response.data;
                // TODO Check that courses is a list of Courses
                setCourseList(newCourse);
            } catch (error: any) {
                console.log(error)
            }
    }

    useEffect(() => {
        updateCourses();
    }, []);

    return (
        <div>
            <div className="container-fluid h-100">
                <div className="row justify-content-center fitContent">
                    <DisplayCourses courses={courseList} newCourse={async() => await updateCourses()} />
                </div>
            </div>
            <div className="align-center">
                <h2>10s</h2>
            </div>
        </div>
    )
}

function DisplayCourses({ courses, newCourse }: { courses: Course[], newCourse: () => void }) {
    return (
        <div>
            {
                courses.map((course: Course) =>
                    createButton(course)
                )
            }
        </div>

    )

    function createButton(course: Course) {
        return <button className="col-md-6 noPadding" style={{ backgroundColor: "aqua" }} onSubmit={
            async (e) => {
                postAnswer(e);
            } }>
            <div className="col-8 mx-auto">
                <p className="course-code">
                    <strong>{course.code}</strong>
                </p>
                <p>{course.name}</p>
                <p>{course.failrate}</p>
            </div>
        </button>;

        function postAnswer(e: React.FormEvent<HTMLButtonElement>) {
            e.preventDefault();
            //Fix post
            axios.post('http://localhost:8080/course:jfj', {
                courseCode: course.code
            }); //TODO: Handle error
            newCourse();
        }
    }
}



export default Singleplayer
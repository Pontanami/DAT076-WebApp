import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Course {
    code: string;
    name: string;
    failrate: number;
}



function Play() {

    const [courseList, setCourseList] = useState<Course[]>([]);

    async function updateCourses() {
        setTimeout(async () => {
            try {
                const response = await axios.get<Course[]>("http://localhost:8080/session/getquestion");
                const newCourse: Course[] = response.data;
                // TODO Check that courses is a list of Courses
                setCourseList(newCourse);
            } catch (error: any) {
                console.log(error)
            }
        }, 1000);
    }

    useEffect(() => {
        updateCourses();
    }, []);

    return (
        <div>
            <div className="container-fluid h-100">
                <div className="row justify-content-center fitContent">
                    {/*
                <button className="col-md-6 noPadding" style="background-color: aqua;">
                    <div className="col-8 mx-auto">
                        <p className="course-code">
                        <strong>MVE655</strong> 
                        </p> 
                        <p>Mathematical modelling and problem solvingkekjfekjhjkehkfhkehfkjhekfhk kjhejkhfjkehfjk </p>
                        <p>7000 U</p>
                    </div>
                </button>
                
                <button className="col-md-6 noPadding" style="background-color: rebeccapurple;">
                    <div className="col-8 mx-auto">
                        <p className="course-code">
                        <strong>MVE655</strong> 
                        </p> 
                        <p>Mathematical modelling and problem solving</p>
                        <p>Hidden U</p>
                    </div>
                 </button>*/}
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
                    <button className="col-md-6 noPadding" style={{ backgroundColor: "aqua" }} onSubmit={
                        async e => {
                            e.preventDefault()
                            //Fix post
                            axios.post('http://localhost:8080/course:jfj', {
                                courseCode: course.code
                            }) //TODO: Handle error
                            newCourse();
                        }

                    }>
                        <div className="col-8 mx-auto">
                            <p className="course-code">
                                <strong>{course.code}</strong>
                            </p>
                            <p>{course.name}</p>
                            <p>{course.failrate}</p>
                        </div>
                    </button>
                )
            }
        </div>

    )
}



export default Play
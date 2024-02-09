import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Course{
    code: string;
    name: string;
    failrate: number;
}



function Play() {

    const [courseList, setCourseList] = useState<Course[]>([]);

    async function updatePlayers() {
        setTimeout(async () => {
            try {
              const response = await axios.get<Course[]>("http://localhost:8080/session/getquestion");
              const newCourse : Course[] = response.data;
              // TODO Check that courses is a list of Courses
              setCourseList(newCourse);
            } catch (error : any) {
              console.log(error)
            }
          }, 1000);
    }
    
    useEffect(() => {
        updatePlayers();
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
                <DisplayCourses courses = {courseList}/>
            </div>
        </div>
        <div className="align-center">
            <h2>10s</h2>
        </div>
    </div>
    )
}

function DisplayCourses( {courses} : {courses : Course[]}){
    return (
        <div>
            {
                courses.map((course : Course) =>
                <button className="col-md-6 noPadding" style={{backgroundColor: "aqua"}}>
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
import axios from 'axios';
import Course from '../ICourse';
import React, { useEffect, useState } from 'react';
import CurrentUser from '../CurrentUser';
import { hostPort } from '../hostPort';



function DisplayCourses({ courses, nextRound, errorHandler, handleGameOver, stopTimer }
    : { courses: [Course, Course], nextRound: () => void, errorHandler: (error: any) => void, handleGameOver: () => void, stopTimer: () =>void }) {

    const [course2Failrate, setcourse2Failrate] = useState<number | string>("?")

    useEffect(() => {
        setcourse2Failrate("?")
    }, [courses]);

    async function showResults() {
        setcourse2Failrate(courses[1].failrate)
    }

    return (
        <div className="row justify-content-center fitContent">
            <CreateButton 
                course={courses[0]}
                courseFailrate={courses[0].failrate}
                showResult={() => showResults()}/>
            <CreateButton 
                course={courses[1]}
                courseFailrate={course2Failrate}
                showResult={() => showResults()}/>
        </div>
    )

    

    function CreateButton({course, courseFailrate, showResult} : {course : Course, courseFailrate : number | string, showResult : () => void}) {

        return (
            <button className="col-md-6 noPadding fitContent buttonPlay" style={{ 
                background: `linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(${course.bgnumber})`,  
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat', }} onClick={
                async (e) => {
                    postAnswer(e);
                }}>
                <div className="col-8 mx-auto">
                    <p className="course-code pPlay">
                        <strong style={{color: 'white'}}>{course.name}</strong>
                    </p>
                    <p className='pPlay' style={{color: 'white', fontSize: '20px'}}>{course.program}</p>
                    <p className='pPlay' style={{color: 'white', fontSize: '20px'}}>{course.code}</p>
                    <p className='pPlay' style={{color: 'white', fontSize: '40px', fontWeight: 'bold'}}>{courseFailrate}%</p>
                </div>
            </button>
        )



        async function postAnswer(e: React.FormEvent<HTMLButtonElement>) {
            e.preventDefault();
            stopTimer();
            showResult()
                try {
                    const answer = await checkAnswer();
                    if (answer.data === true) {
                        nextRound();
                    }
                    else {
                        handleGameOver();
                    }
                } catch (e: any) {
                    errorHandler(e)
                }
        }

        async function checkAnswer() {
            let otherCourse = courses[0].code === course.code ? courses[1].code : courses[0].code;
            const answer = await axios.post<boolean>(`http://${hostPort}:8080/course/answer`, {
                codeClicked: course.code,
                otherCode: otherCourse, 
                playerId: CurrentUser.getId()
            });
            return answer;
        }
    }
}

export default DisplayCourses;
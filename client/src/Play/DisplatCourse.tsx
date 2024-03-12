import axios from 'axios';
import Course from '../ICourse';
import React, { useEffect, useState } from 'react';
import CurrentUser from '../CurrentUser';
import { hostPort } from '../hostPort';

/**
 * Component for creating the courses displayed on the screen and handling the users guess
 * @param courses - tuple of the courses we want to display
 * @param handleCorrectGuess - function called to notify parent of starting a new round when user have guessed correctly
 * @param errorHandler - function that takes an error and displays it correctly
 * @param handleIncorrectGuess - function telling the parent to handle a incorrect guess
 * @param stopTimer - function telling the parent to stop the timer
 * @returns two displayable courses
 */
function DisplayCourses({ courses, handleCorrectGuess, errorHandler, handleIncorrectGuess, stopTimer }
    : { courses: [Course, Course], handleCorrectGuess: () => void, errorHandler: (error: any) => void, handleIncorrectGuess: () => void, stopTimer: () =>void }) {

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

    
    /**
     * Component responsible for displaying one course
     * @param course - the course we want to display
     * @param courseFailrate - the failrate of the course we want to display
     * @param showresult - function telling the parent that we want to display the failrate for the course with a hidden failrate
     * @returns a displayable course
     */
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


        /**
         * Handles what to do when a course has been clicked
         * @param e the event we fired
         */
        async function postAnswer(e: React.FormEvent<HTMLButtonElement>) {
            e.preventDefault();
            stopTimer();
            showResult()
                try {
                    const answer = await checkAnswer();
                    if (answer.data === true) {
                        handleCorrectGuess();
                    }
                    else {
                        handleIncorrectGuess();
                    }
                } catch (e: any) {
                    errorHandler(e)
                }
        }

        /**
         * Function for checking if the clicked course is the correct one.
         * @returns a bool, representing if our choice was correct or not
         */
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
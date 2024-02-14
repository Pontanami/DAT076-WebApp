import React, { useEffect, useState } from 'react';
import './singleplayer.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

interface Course {
    code: string;
    name: string;
    failrate: number;
}

enum PlayScreens {
    PLAYING,
    GAMEOVER,
    ERROR
}

//Ta bort sen
let gameId = 0;
let playerId = 1;

function handleError(error: any, displayErrorMessage: (errorMessage: string) => void) {
    if (error.response) {
        displayErrorMessage(error.response.status)
    }
    else if (error.request) {
        displayErrorMessage("No response provided from the server")
    }
    else {
        displayErrorMessage("Error occured while processing request")
    }
}

function Singleplayer() {

    const [courseList, setCourseList] = useState<[Course, Course]>([{ code: "Abc", name: "placeholder", failrate: 1 }, { code: "Abc", name: "placeholder", failrate: 2 }]);
    const [playState, setPlayState] = useState<PlayScreens>(PlayScreens.PLAYING);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [score, setScore] = useState<number>(0);

    const incrementScore = () => {
        console.log("Incrementing score")
        setScore(score + 1);
    }

    async function newRound() {
        try {
            const response = await axios.get<[Course, Course]>("http://localhost:8080/singlePlayer/" + gameId)
            const newCourse: [Course, Course] = response.data;
            // TODO Check that courses is a list of Courses
            setCourseList(newCourse);
        } catch (error: any) {
            handleError(error, displayErrorMessage);
        }
    }

    async function updateScore() {
        incrementScore();
    }

    function displayErrorMessage(errorMessage: string) {
        setErrorMessage(errorMessage)
        setPlayState(PlayScreens.ERROR)
    }

    async function initGame() {
        try {

            const response1 = await axios.post<number>('http://localhost:8080/singleplayer', {
                playerId: playerId
            });

            gameId = response1.data
            console.log(gameId)

            newRound();

        } catch (error: any) {
            handleError(error, displayErrorMessage);
        }
    }

    useEffect(() => {
        console.log("Setting up game")
        initGame();
    }, []);

    switch (playState) {
        case PlayScreens.PLAYING:
            return createPlayScreen()

        case PlayScreens.GAMEOVER:
            return createGameOverScreen()

        case PlayScreens.ERROR:
            return createErrorScreen()
    }



    function createErrorScreen() {
        return <div>
            <h1>Error</h1>
            <p>{errorMessage}</p>
        </div>;
    }

    function createGameOverScreen() {
        return <div>
            <p>Du är sämst</p>
        </div>;
    }

    function createPlayScreen() {
        return (
            <div>
                <div className="container-fluid h-100">
                    <DisplayCourses
                        courses={courseList}
                        nextRound={async () => await newRound()}
                        updateScore={async () => await updateScore()}
                        error={(e: any) => displayErrorMessage(e)}
                        changePlayState={(state: PlayScreens) => setPlayState(state)} />
                </div>
                <div className="align-center">
                    <h2>10s</h2>
                </div>
                <div>
                    <h2 className='score-counter'>
                        Score: {score}
                    </h2>
                </div>
            </div>
        )
    }
}

function DisplayCourses({ courses, nextRound, updateScore, error, changePlayState }
    : { courses: [Course, Course], nextRound: () => void, updateScore: () => void, error: (e: any) => void, changePlayState: (playState: PlayScreens) => void }) {
    return (
        <div className="row justify-content-center fitContent">
            {
                createButton(courses[0])
            }
            {
                createButton(courses[1])
            }
        </div>

    )

    function createButton(course: Course) {
        return <button className="col-md-6 noPadding fitContent buttonPlay" style={{ backgroundColor: "aqua" }} onClick={
            async (e) => {
                postAnswer(e);
            }}>
            <div className="col-8 mx-auto">
                <p className="course-code pPlay">
                    <strong>{course.code}</strong>
                </p>
                <p className='pPlay'>{course.name}</p>
                <p className='pPlay'>{course.failrate}</p>
            </div>
        </button>;

        async function postAnswer(e: React.FormEvent<HTMLButtonElement>) {
            e.preventDefault();
            
            //TODO: Handle error
            try {
                let otherCourse = courses[0].code === course.code ? courses[1].code : courses[0].code;
            console.log("Other course: " + otherCourse)
                const answer = await axios.post('http://localhost:8080/course/answer', {
                    codeClicked: course.code,
                    otherCode: otherCourse
                }); 
                if (answer.data === true) {
                    console.log("Updating")
                    await axios.post('http://localhost:8080/singlePlayer/update', {
                        playerId: playerId,
                        gameId: gameId,
                    });
                    updateScore()
                    nextRound();
                }
                else {

                    changePlayState(PlayScreens.GAMEOVER)
                    console.log("Wrong answer")
                }
                console.log("Answer posted " + answer.data)
            } catch (e: any) {
                error(e)
            }
        }
    }
}



export default Singleplayer

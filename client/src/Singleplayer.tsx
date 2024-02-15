import React, { useEffect, useState } from 'react';
import './singleplayer.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import DisplayCourses from './DisplatCourse';
import Course from './ICourse';
import PlayScreens from './PlayScreens';
import CurrentUser from './CurrentUser';
import {Link} from "react-router-dom";
import getErrorMessage from './ErrorHandling';


//Ta bort sen
let gameId = 0;
//let playerId = 1;

function Singleplayer({errorHandler} : {errorHandler: (error : any) => void}) {

    const [courseList, setCourseList] = useState<[Course, Course]>([{ code: "Abc", name: "placeholder", failrate: 1 }, { code: "Abc", name: "placeholder", failrate: 2 }]);
    const [playState, setPlayState] = useState<PlayScreens>(PlayScreens.PLAYING);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [score, setScore] = useState<number>(0);
    const [timer, setTimer] = useState<number>(10);

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
            setTimer(10);
        } catch (error: any) {
            errorHandler(error)
            //Borde nog döpa om handle error
            //displayErrorMessage(error)
        }
    }

    async function updateScore() {
        incrementScore();
    }
    /*
    function displayErrorMessage(errorMessage: string) {
        setErrorMessage(handleError(errorMessage))
        setPlayState(PlayScreens.ERROR)
    }*/

    async function handleGameOver() {
        try{
        //TODO: fix error handling and post/put beroende på om personen redan finns
        console.log(CurrentUser.getId())
        const response = await axios.post('http://localhost:8080/leaderboard', {
             id: CurrentUser.getId()
            })
        console.log("Player added to leaderboard")
        setTimer(0);
        setPlayState(PlayScreens.GAMEOVER);
        console.log("Wrong answer")
        }
        catch(error: any){
            errorHandler(error)
        }
    }

    async function initGame() {
        try {
            const response1 = await axios.post<number>('http://localhost:8080/singleplayer', {
                playerId: CurrentUser.getId()
            });

            gameId = response1.data
            console.log(gameId)

            newRound();

        } catch (error: any) {
            errorHandler(error)
        }
    }

    useEffect(() => {
        console.log("Setting up game")
        initGame();
    }, []);

    useEffect(() => {
        const timerId = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        if (timer === 0) {
            clearInterval(timerId);
            setPlayState(PlayScreens.GAMEOVER);
        }

        return () => {
            clearInterval(timerId);
        };
    }, [timer]);

    switch (playState) {
        case PlayScreens.PLAYING:
            return createPlayScreen()

        case PlayScreens.GAMEOVER:
            return createGameOverScreen()
    }



    function createErrorScreen() {
        return <div>
            <h1>Error</h1>
            <p>{errorMessage}</p>
        </div>;
    }

    function createGameOverScreen() {
        const rndInt = Math.floor(Math.random() * 6) + 1;
        const dynamicFile = require('./Image/gifs/end' + rndInt + '.gif');
        return <div className='endScreen'>
            <h2>Game Over</h2>
            <img className='gif' src={dynamicFile}/>
            <div className='endButtons'>
                <Link to="/"><button className="homeButton" type="button">Home</button></Link>
                <Link to="/leaderboard"><button className="homeButton" type="button">Leaderboard</button></Link>
            </div>
        </div>;
    }

    function createPlayScreen() {
        return (
            
            <div>
                {/*TODO: Kolla på alla imports till DisplayCourse*/}
                <div className="container-fluid h-100">
                    <DisplayCourses
                        courses={courseList}
                        gameId = {gameId}
                        nextRound={async () => await newRound()}
                        updateScore={async () => await updateScore()}
                        errorHandler={(errorMsg: string) => errorHandler(errorMsg)}
                        handleGameOver={async () => await handleGameOver()} />
                </div>
                <div className="align-center">
                    <h2>{timer}</h2>
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

export default Singleplayer

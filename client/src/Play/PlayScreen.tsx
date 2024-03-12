import React, { useEffect, useState } from 'react';
import Course from '../ICourse';
import DisplayCourses from './DisplatCourse';
import axios from 'axios';
import CurrentUser from '../CurrentUser';
import { hostPort } from '../hostPort';
import Player from '../IPlayer';


function PlayScreen({ courseList, handleCorrectGuess, errorHandler, handleWrongGuess }
    : { courseList: [Course, Course], handleCorrectGuess: () => void, errorHandler: (error: any) => void, handleWrongGuess: () => void }) {
    
    const [score, setScore] = useState<number>(0);
    const [timer, setTimer] = useState<number>(15);
    const [isPlaying, setIsPlaying] = useState<boolean>(true)

    async function incrementScore() {
        setScore((score + 1));
    }

    async function getScore(){
        try {
            const response = await axios.get<Player>(`http://${hostPort}:8080/player/` + CurrentUser.getId())
            setScore(response.data.score);
        }catch(error : any){
            errorHandler(error)
        }
    }

    //TODO: Kanske borde kolla på hur vi stoppar timer

    useEffect(() => {
        const timerId = setInterval(() => {
            if (isPlaying) {
                setTimer((prevTimer) => prevTimer - 1);
            }
        }, 1000);

        if (timer === 0 && isPlaying) {
            clearInterval(timerId);
            handleGameOver()
        }

        return () => {
            clearInterval(timerId);
        };
    }, [timer]);

    useEffect(() => {
        setTimer(15)
    }, [courseList])

    useEffect(() =>{
        getScore()
    }, [])

    async function handleGameOver() {
        setTimer(0);
        handleWrongGuess();
    }

    async function startNextRound() {
        await incrementScore();
        setTimeout(async function () {
            setIsPlaying(true)
            handleCorrectGuess()
        }, 1000);
    }

    async function stopTimer() {
        setIsPlaying(false)
    }

    return (
        <div>
            {/*TODO: Kolla på alla imports till DisplayCourse*/}
            <div className="container-fluid h-100">
                <DisplayCourses
                    courses={courseList}
                    nextRound={async () => await startNextRound()}
                    errorHandler={errorHandler}
                    handleGameOver={async () => await handleGameOver()}
                    stopTimer={async () => await stopTimer()} />
            </div>
            <div className="align-center">
                <h2>{timer}</h2>
            </div>
            <div>
                <h2 className='score-counter' style={{color: 'white'}}>
                    Score: {score}
                </h2>
            </div>
        </div>
    )
}

export default PlayScreen;
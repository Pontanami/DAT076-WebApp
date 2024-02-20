import React, { useEffect, useState } from 'react';
import Course from '../ICourse';
import DisplayCourses from './DisplatCourse';
import axios from 'axios';
import CurrentUser from '../CurrentUser';


function PlayScreen({courseList, gameId, nextRound, errorHandler, setGameOver} 
    : {courseList: [Course, Course], gameId : number,nextRound: () => void, errorHandler: (error : any) => void, setGameOver : () => void}) {
    const [score, setScore] = useState<number>(0);
    const [timer, setTimer] = useState<number>(10);
    const [isPlaying, setIsPlaying] = useState<boolean>(true)

    async function updateScore() {
        try{
            await axios.post('http://localhost:8080/singlePlayer/update', {
                    playerId: CurrentUser.getId(),
                    gameId: gameId,
                });
        }catch(error : any){
            errorHandler(error);
        }
        
        incrementScore();
    }

    const incrementScore = () => {
        console.log("Incrementing score")
        setScore(score + 1);
    }

    //TODO: Kanske borde kolla på hur vi stoppar timer

    useEffect(() => {
            const timerId = setInterval(() => {
                if(isPlaying){
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

    async function handleGameOver() {
        setTimer(0);
        setGameOver();
    }

    async function startNextRound(){
        await updateScore();
        setTimer(10)
        setIsPlaying(true)
        nextRound()
        
    }

    async function stopTimer(){
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
                    stopTimer = {async () => await stopTimer()} />
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

export default PlayScreen;
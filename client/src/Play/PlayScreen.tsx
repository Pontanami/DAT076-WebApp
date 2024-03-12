import { useEffect, useState } from 'react';
import Course from '../ICourse';
import DisplayCourses from './DisplatCourse';
import axios from 'axios';
import CurrentUser from '../CurrentUser';
import { hostPort } from '../hostPort';
import Player from '../IPlayer';

/**
 * Component responsible for handling core game logic. Calls subcomponents to create the playScreen
 * @param courseList - a list of the courses we want to display
 * @param handleCorrectGuess - function used to tell the parent to handle a correct guess accordingly
 * @param errorHandler - function that takes an error and displays it correctly
 * @param handleWrongGuess - function used to tell the parent to handle an incorrect guess
 * @returns a displayable playscreen
 */
function PlayScreen({ courseList, handleCorrectGuess, errorHandler, handleWrongGuess }
    : { courseList: [Course, Course], handleCorrectGuess: () => void, errorHandler: (error: any) => void, handleWrongGuess: () => void }) {
    
    const [score, setScore] = useState<number>(0);
    const [timer, setTimer] = useState<number>(15);
    const [isPlaying, setIsPlaying] = useState<boolean>(true)

    
    async function incrementScore() {
        setScore((score + 1));
    }

    /**
     * Function that fetches a users correct score
     */
    async function getScore(){
        try {
            const response = await axios.get<Player>(`http://${hostPort}:8080/player/` + CurrentUser.getId())
            setScore(response.data.score);
        }catch(error : any){
            errorHandler(error)
        }
    }

    /**
     * useEffect for reducing the timer by 1 each second 
     */
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
            {}
            <div className="container-fluid h-100">
                <DisplayCourses
                    courses={courseList}
                    handleCorrectGuess={async () => await startNextRound()}
                    errorHandler={errorHandler}
                    handleIncorrectGuess={async () => await handleGameOver()}
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
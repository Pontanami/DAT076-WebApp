import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CurrentUser from "../CurrentUser";
import { hostPort } from "../hostPort";
import Course from "../ICourse";
import { socket } from "../socket";
import Gameover from "./Gameover";
import PlayScreen from "./PlayScreen";

enum PlayScreens {
    PLAYING,
    CORRECTANSWER,
    WRONGANSWER,
    GAMEOVER
}

function MultiPlayer({errorHandler} : {errorHandler: (error : any) => void}){
    const [courseList, setCourseList] = useState<[Course, Course]>([{ code: "Abc", name: "placeholder", failrate: 1 }, { code: "Abc", name: "placeholder", failrate: 2 }]);
    const [playState, setPlayState] = useState<PlayScreens>(PlayScreens.PLAYING);
    const { state } = useLocation();

    /*
    async function startNextRound(){
        try{
            const response = await axios.post('http://localhost:8080/game/update', {
                    gameId: gameId,
                });
            updateDisplayedCourses(response)
        }catch (error: any) {
            errorHandler(error)
        }

    }*/

    async function updateDisplayedCourses(response: { data: [Course, Course]; }){
        const newCourse: [Course, Course] = response.data;
        // TODO Check that courses is a list of Courses
        console.log("Updating displayed Courses")
        console.log(newCourse)
        setCourseList(newCourse);
    }

    async function setGameOver(){
        try{
            //TODO: fix error handling and post/put beroende på om personen redan finns
            console.log(CurrentUser.getId())
            const response = await axios.post(`http://${hostPort}:8080/leaderboard`, {
                 id: CurrentUser.getId()
                })
            console.log("Player added to leaderboard")
            setPlayState(PlayScreens.GAMEOVER);
            }
            catch(error: any){
                errorHandler(error)
            }
    }

    async function fetchCurrentQuestions(gameId : number) {
        try {
            setPlayState(PlayScreens.PLAYING)
            console.log("Client gameID is: " + gameId)
            const response = await axios.get<[Course, Course]>(`http://${hostPort}:8080/game/` + gameId)
            updateDisplayedCourses(response)

        } catch (error: any) {
            errorHandler(error)
        }
    }

    async function displayCorrectAnswer(){
        socket.emit('correct_answer',{ id: CurrentUser.getId(), gameId: state});
        setPlayState(PlayScreens.CORRECTANSWER);
    }

    //We need to check if we are on the "CorrectAnswerScreen" otherwise if the timer is 0 
    async function displayWrongAnswer(){
        if(playState !== PlayScreens.CORRECTANSWER){
            setPlayState(PlayScreens.WRONGANSWER);
        }
    }
    
    useEffect(() => {
        fetchCurrentQuestions(state)
    }, [])

    useEffect(() => {
        socket.on('new_round_started', (gameId) => {
            console.log("Updating displayed Questions, id: " + gameId)
            fetchCurrentQuestions(gameId)
            console.log(courseList)
          });

          socket.on('game_over', () =>{
              setGameOver()
              console.log("Calling MPGameOver")
          })
    }, [socket])

    switch (playState) {
        case PlayScreens.PLAYING:
            return <PlayScreen
                courseList={courseList}
                handleCorrectGuess = {async () => await displayCorrectAnswer()}
                errorHandler = {(error : any) => errorHandler(error)}
                handleWrongGuess = {async () => await displayWrongAnswer()}
            />

        case PlayScreens.CORRECTANSWER:
            return (
                <div>
                    <p>Answer is correct</p>
                    <p>Waiting for host to start the next round</p>
                </div>
            )

            case PlayScreens.WRONGANSWER:
                return (
                    <div>
                        <p>Answer is incorrect</p>
                        <p>Waiting for host to start the next round</p>
                    </div>
                )

        case PlayScreens.GAMEOVER:
            return <Gameover/>
    }

}

export default MultiPlayer
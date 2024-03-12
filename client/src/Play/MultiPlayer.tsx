import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CurrentUser from "../CurrentUser";
import { hostPort } from "../hostPort";
import Course from "../ICourse";
import Player from "../IPlayer";
import { socket } from "../socket";
import Gameover from "./Gameover";
import './multiplayer.css';
import PlayScreen from "./PlayScreen";
import check from "../Image/check.png";
import x from "../Image/x.png";
import { getDifferentBg} from "./ImageBackground";

enum PlayScreens {
    PLAYING,
    CORRECTANSWER,
    WRONGANSWER,
    GAMEOVER
}

/**
 * Component for handling how the game works when we are in multiplayer-mode
 * @param errorHandler - function that takes an error and displays it correctly
 * @returns different playscreens depending on which state we are in currently
 */
function MultiPlayer({errorHandler} : {errorHandler: (error : any) => void}){
    const [courseList, setCourseList] = useState<[Course, Course]>([{ code: "Abc", name: "placeholder", program:"placeholder", failrate: 1, bgnumber: 1}, { code: "Abc", name: "placeholder", program:"placeholder", failrate: 2, bgnumber: 2}]);
    const [playState, setPlayState] = useState<PlayScreens>(PlayScreens.PLAYING);
    const { state } = useLocation();

    /**
     * Function that updates the courses we want to display with their correct background
     * @param response a tuple of the courses we want to display
     */
    async function updateDisplayedCourses(response: { data: [Course, Course]; }){
        try{
        const newCourse: [Course, Course] = response.data;
        const bgnumbers: number[] = getDifferentBg();
        newCourse[0].bgnumber = bgnumbers[0];
        newCourse[1].bgnumber = bgnumbers[1];
        setCourseList(newCourse);
        }catch(error: any){
            errorHandler(error)
        }
    }

    /**
     * Posts a players result to the leaderboard and changes to gameover 
     */
    async function setGameOver(){
        try{
            const response = await axios.post<Player[]>(`http://${hostPort}:8080/leaderboard`, {
                 id: CurrentUser.getId()
                })
            setPlayState(PlayScreens.GAMEOVER);
            }
            catch(error: any){
                errorHandler(error)
            }
    }

    /**
     * Function that fetches the current questions
     * @param gameId - the id of the game we want to fetch courses from
     */
    async function fetchCurrentQuestions(gameId : number) {
        try {
            setPlayState(PlayScreens.PLAYING)
            const response = await axios.get<[Course, Course]>(`http://${hostPort}:8080/game/` + gameId)
            updateDisplayedCourses(response)

        } catch (error: any) {
            errorHandler(error)
        }
    }

    /**
     * Function responsible for displaying a correct guess
     */
    async function displayCorrectAnswer(){
        socket.emit('correct_answer',{ id: CurrentUser.getId(), gameId: state});
        setPlayState(PlayScreens.CORRECTANSWER);
    }

    /**
     * Function responsible for displaying an incorrect guess
     */
    async function displayWrongAnswer(){
        if(playState !== PlayScreens.CORRECTANSWER){
            setPlayState(PlayScreens.WRONGANSWER);
        }
    }
    
    useEffect(() => {
        fetchCurrentQuestions(state)

        socket.on('new_round_started', () => {
            fetchCurrentQuestions(state)
          });

          socket.on('game_over', () =>{
              setGameOver()
          })
    }, [])

    switch (playState) {
        case PlayScreens.PLAYING:
            return <PlayScreen
                courseList={courseList}
                handleCorrectGuess = {async () => await displayCorrectAnswer()}
                errorHandler = {(error : any) => errorHandler(error)}
                handleWrongGuess = {async () => await displayWrongAnswer()}
            />

        case PlayScreens.CORRECTANSWER:
            //Could not get the css to apply on the enum in multiplayer.css, so wrote it here
            return (
                <div className="correct">
                    <img src={check}/>
                    <h2>Correct</h2>
                    <p>Waiting for host to start the next round</p>
                </div>
            )

            case PlayScreens.WRONGANSWER:
                return (
                    <div className="incorrect">
                    <img src={x}/>
                    <h2>Incorrect</h2>
                    <p>Waiting for host to start the next round</p>
                </div>
                )

        case PlayScreens.GAMEOVER:
            return <Gameover/>
    }

}

export default MultiPlayer
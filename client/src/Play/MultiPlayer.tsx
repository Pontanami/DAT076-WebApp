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

enum PlayScreens {
    PLAYING,
    CORRECTANSWER,
    WRONGANSWER,
    GAMEOVER
}

function MultiPlayer({errorHandler} : {errorHandler: (error : any) => void}){
    const [courseList, setCourseList] = useState<[Course, Course]>([{ code: "Abc", name: "placeholder", program:"placeholder", failrate: 1, bgnumber: 1}, { code: "Abc", name: "placeholder", program:"placeholder", failrate: 2, bgnumber: 2}]);
    const [playState, setPlayState] = useState<PlayScreens>(PlayScreens.PLAYING);
    const { state } = useLocation();

    useEffect(() => {
        const images = ['path_to_your_image1.jpg', 'path_to_your_image2.jpg', 'path_to_your_image3.jpg'];
        const randomIndex = Math.floor(Math.random() * images.length);
        const randomImageSrc = images[randomIndex];
    
        const img = new Image();
        img.src = randomImageSrc;
      }, []);

    function getRandomBg() {
        const rndInt = Math.floor(Math.random() * 5) + 1;
        const dynamicFile = require('../Image/coursesbg/bg' + rndInt + '.jpg');
        return dynamicFile;
    }

    function getDifferentBg(): number[]{
        let bg1 = getRandomBg();
        let bg2 = getRandomBg();

        while (bg1 === bg2){
            bg2 = getRandomBg();
        }
        return [bg1, bg2];
    }

    async function updateDisplayedCourses(response: { data: [Course, Course]; }){
        const newCourse: [Course, Course] = response.data;
        const bgnumbers: number[] = getDifferentBg();
        newCourse[0].bgnumber = bgnumbers[0];
        newCourse[1].bgnumber = bgnumbers[1];
        setCourseList(newCourse);
    }

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

    async function fetchCurrentQuestions(gameId : number) {
        try {
            setPlayState(PlayScreens.PLAYING)
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
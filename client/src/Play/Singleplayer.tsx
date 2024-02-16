import React, { useEffect, useState } from 'react';
import './singleplayer.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import DisplayCourses from './DisplatCourse';
import Course from '../ICourse';
import CurrentUser from '../CurrentUser';

import Gameover from './Gameover';
import PlayScreen from './PlayScreen';

enum PlayScreens {
    PLAYING,
    GAMEOVER
}

//Ta bort sen
let gameId = 0;
//let playerId = 1;

function Singleplayer({errorHandler} : {errorHandler: (error : any) => void}) {

    const [courseList, setCourseList] = useState<[Course, Course]>([{ code: "Abc", name: "placeholder", failrate: 1 }, { code: "Abc", name: "placeholder", failrate: 2 }]);
    const [playState, setPlayState] = useState<PlayScreens>(PlayScreens.PLAYING);

    

    async function newRound() {
        try {
            const response = await axios.get<[Course, Course]>("http://localhost:8080/singlePlayer/" + gameId)
            const newCourse: [Course, Course] = response.data;
            // TODO Check that courses is a list of Courses
            console.log("next round started")
            console.log(newCourse)
            setCourseList(newCourse);
        } catch (error: any) {
            errorHandler(error)
        }
    }

    async function setGameOver(){
        try{
            //TODO: fix error handling and post/put beroende på om personen redan finns
            console.log(CurrentUser.getId())
            const response = await axios.post('http://localhost:8080/leaderboard', {
                 id: CurrentUser.getId()
                })
            console.log("Player added to leaderboard")
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

    switch (playState) {
        case PlayScreens.PLAYING:
            return <PlayScreen
                courseList={courseList}
                gameId = {gameId}
                nextRound = {async () => await newRound()}
                errorHandler = {(error : any) => errorHandler(error)}
                setGameOver = {async () => await setGameOver()}
            />

        case PlayScreens.GAMEOVER:
            return <Gameover/>
    }
}

export default Singleplayer

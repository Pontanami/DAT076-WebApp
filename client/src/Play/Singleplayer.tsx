import React, { useEffect, useState } from 'react';
import './singleplayer.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import DisplayCourses from './DisplatCourse';
import Course from '../ICourse';
import CurrentUser from '../CurrentUser';

import Gameover from './Gameover';
import PlayScreen from './PlayScreen';
import { hostPort } from '../hostPort';
import Player from '../IPlayer';

enum PlayScreens {
    PLAYING,
    GAMEOVER
}

let gameId = 0;

function Singleplayer({errorHandler} : {errorHandler: (error : any) => void}){

    const [courseList, setCourseList] = useState<[Course, Course]>([{ code: "Abc", name: "placeholder", program:"placeholder", failrate: 1, bgnumber: 1}, { code: "Abc", name: "placeholder", program:"placeholder", failrate: 2, bgnumber: 2}]);
    const [playState, setPlayState] = useState<PlayScreens>(PlayScreens.PLAYING);

    async function startNextRound(){
        try{
            const response = await axios.post<[Course, Course]>(`http://${hostPort}:8080/game/update`, {
                    gameId: gameId,
                });
            updateDisplayedCourses(response)
        }catch (error: any) {
            errorHandler(error)
        }

    }

    

    function getRandomBg() {
        const rndInt = Math.floor(Math.random() * 6) + 1;
        const dynamicFile = require('../Image/coursesbg/bg' + rndInt + '.jpg');
        return dynamicFile;
    }

    function getDifferentBg(): number[]{
        const bg1 = getRandomBg();
        const bg2 = getRandomBg();

        if (bg1 == bg2){
            getDifferentBg();
        }
        return [bg1, bg2];
    }

    async function updateDisplayedCourses(response: { data: [Course, Course]; }){
        const newCourse: [Course, Course] = response.data;
        const bgnumbers: number[] = getDifferentBg();
        newCourse[0].bgnumber = bgnumbers[0];
        newCourse[1].bgnumber = bgnumbers[1];
        console.log("Updating displayed Courses")
        console.log(newCourse)
        setCourseList(newCourse);
    }

    async function setGameOver(){
        try{
            //TODO: fix error handling and post/put beroende på om personen redan finns
            console.log(CurrentUser.getId())
            const response = await axios.post<Player[]>(`http://${hostPort}:8080/leaderboard`, {
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
            const response1 = await axios.post<number>(`http://${hostPort}:8080/singleplayer`, {
                playerId: CurrentUser.getId()
            });

            gameId = response1.data
            console.log(gameId)

            const response = await axios.get<[Course, Course]>(`http://${hostPort}:8080/game/` + gameId)
            updateDisplayedCourses(response)

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
                handleCorrectGuess = {async () => await startNextRound()}
                errorHandler = {(error : any) => errorHandler(error)}
                handleWrongGuess = {async () => await setGameOver()}
            />

        case PlayScreens.GAMEOVER:
            return <Gameover/>
    }
}

export default Singleplayer

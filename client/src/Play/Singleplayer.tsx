import { useEffect, useState } from 'react';
import './singleplayer.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import Course from '../ICourse';
import CurrentUser from '../CurrentUser';
import Gameover from './Gameover';
import PlayScreen from './PlayScreen';
import { hostPort } from '../hostPort';
import Player from '../IPlayer';
import { getDifferentBg } from './ImageBackground';

enum PlayScreens {
    PLAYING,
    GAMEOVER
}

function Singleplayer({errorHandler} : {errorHandler: (error : any) => void}){

    const [courseList, setCourseList] = useState<[Course, Course]>([{ code: "Abc", name: "placeholder", program:"placeholder", failrate: 1, bgnumber: 1}, { code: "Abc", name: "placeholder", program:"placeholder", failrate: 2, bgnumber: 2}]);
    const [playState, setPlayState] = useState<PlayScreens>(PlayScreens.PLAYING);
    const [gameId, setGameId] = useState<number>()

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

    async function initGame() {
        try {
            const response1 = await axios.post<number>(`http://${hostPort}:8080/singleplayer`, {
                playerId: CurrentUser.getId()
            });
            setGameId(response1.data)

            const response = await axios.get<[Course, Course]>(`http://${hostPort}:8080/game/` + response1.data)
            updateDisplayedCourses(response)

        } catch (error: any) {
            errorHandler(error)
        }
    }

    useEffect(() => {
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

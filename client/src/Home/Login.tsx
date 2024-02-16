import React, { useEffect, useState } from 'react';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios, { AxiosResponse } from 'axios';
import Player from '../IPlayer';
import CurrentUser from '../CurrentUser';


enum DisplayLogin {
    BUTTON,
    LOGINSCREEN
}

function Login({errorHandler} : {errorHandler: (error : any) => void}) {
    const [displayScreen, setDisplayScreen] = useState<DisplayLogin>(DisplayLogin.BUTTON)

    useEffect(() => {
        setDisplayScreen(DisplayLogin.BUTTON)
    }, []);

    async function createPlayer(name: string, password : string) {
        try{
            const response = await axios.post<Player>('http://localhost:8080/player', {
                name : name
            });
            console.log("Success Create")
            setCurrentPlayer(response);
        }catch(error : any){
            errorHandler(error)
        }
    }

    async function loginPlayer(name: string, password : string){
        try{
            const response = await axios.get<Player>("http://localhost:8080/player/name/" + name)
            console.log("Success Login")
            setCurrentPlayer(response);
        }catch(error : any){
            errorHandler(error)
        }
    }

    function setCurrentPlayer(response: AxiosResponse<Player, any>) {
        let playerId = response.data.id;
        let playerName = response.data.name;
        CurrentUser.setActivePlayer(playerId, playerName);
        console.log(`Active user's name is ${CurrentUser.getName()}`)
    }

    
    const profile = require("../Image/profile.png");
    switch (displayScreen) {
        case DisplayLogin.BUTTON:
            return (
                <button className='login' onClick={async () =>
                    setDisplayScreen(DisplayLogin.LOGINSCREEN)
                }><img src={profile} alt='' style={{width: "3rem"}}/></button>
            )
        case DisplayLogin.LOGINSCREEN:
            return (
                <div className="container login-popup">
                    <button className="" onClick={async () =>
                        setDisplayScreen(DisplayLogin.BUTTON)
                    }>Close</button>
                    <input id="nameBox" type="text" placeholder='Enter name' />
                    <input id="passwordBox" type="text" placeholder='Enter password' />
                    <button onClick={
                        async () => {
                            AccountAction(async (name : string, password : string) => await loginPlayer(name, password));
                        }}>Login</button>
                    <button onClick={
                        async () => {
                            AccountAction(async (name : string, password : string) => await createPlayer(name, password));
                        }}>CreatePlayer</button>
                </div>
            )
    }

    function AccountAction(action: (name : string, password : string) => void) {
        const userName = (document.getElementById('nameBox') as HTMLInputElement).value;
        const userPassWord = (document.getElementById('passwordBox') as HTMLInputElement).value;
        action(userName, userPassWord);
    }
}

export default Login;


import React, { useEffect, useState } from 'react';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios, { AxiosResponse } from 'axios';
import Player from '../IPlayer';
import CurrentUser from '../CurrentUser';




function Login({ errorHandler, closeLogin }: { errorHandler: (error: any) => void, closeLogin: () => void}) {
    async function createUser(name: string, password: string) {
        try {
            const response = await axios.post<[number, string]>('http://localhost:8080/user/signup', {
                username: name,
                password: password
            });
            console.log("Success Create")
            setCurrentUser(response);
        } catch (error: any) {
            errorHandler(error)
        }
    }

    async function loginUser(name: string, password: string) {
        try {
            const response = await axios.post<[number, string]>("http://localhost:8080/user/login/", {
                username : name,
                password : password
            })
            console.log("Success Login")
            setCurrentUser(response);
        } catch (error: any) {
            errorHandler(error)
        }
    }

    function setCurrentUser(response: AxiosResponse<[number, string], any>) {
        let playerId = response.data[0];
        let playerName = response.data[1];
        CurrentUser.setActiveUser(playerId, playerName);
        console.log(`Active user's name is ${CurrentUser.getName()}`)
    }


    const profile = require("../Image/profile.png");
        return (
            <div className="login-popup">
                <h2>Login</h2>
                <div className='inputs'>
                    <input id="nameBox" type="text" placeholder='Enter name' />
                    <input id="passwordBox" type="text" placeholder='Enter password' />
                    <button onClick={
                        async () => {
                            AccountAction(async (name: string, password: string) => await loginUser(name, password));
                            closeLogin();
                        }}>Login</button>
                    <button onClick={
                        async () => {
                            AccountAction(async (name: string, password: string) => await createUser(name, password));
                            closeLogin();
                        }}>CreatePlayer</button>
                </div>
            </div>
        )
    }

    function AccountAction(action: (name: string, password: string) => void) {
        const userName = (document.getElementById('nameBox') as HTMLInputElement).value;
        const userPassWord = (document.getElementById('passwordBox') as HTMLInputElement).value;
        action(userName, userPassWord);
    }

export default Login;


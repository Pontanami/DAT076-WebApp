import { useEffect, useState } from 'react';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios, { AxiosResponse } from 'axios';
import CurrentUser from '../CurrentUser';
import { hostPort } from '../hostPort';
import { useNavigate } from 'react-router-dom';

enum DisplayScreen {
    NOTABLETOLOGIN,
    LOGIN
}

function Login() {
    const [loginScreen, setLoginScreen] = useState<DisplayScreen>(DisplayScreen.LOGIN)
    const [errorMsg, setErrorMsg] = useState<string>("")
    const navigate = useNavigate();

    useEffect(() => {
        setLoginScreen(DisplayScreen.LOGIN)
    }, [])

    async function createUser(name: string, password: string) {
        try {
            const response = await axios.post<[number, string]>(`http://${hostPort}:8080/user/signup`, {
                username: name,
                password: password
            });
            onSuccessLogin(response);
        } catch (error: any) {
            onError(error)
        }
    }

    async function loginUser(name: string, password: string) {
        try {
            const response = await axios.post<[number, string]>(`http://${hostPort}:8080/user/login/`, {
                username: name,
                password: password
            })
            onSuccessLogin(response);
        } catch (error: any) {
            onError(error)
        }
    }

    async function onSuccessLogin(response: AxiosResponse<[number, string]>) {
        console.log("Success");
        setCurrentUser(response);
        navigate("/home");
    }

    async function onError(error:any){
        setErrorMsg(error.response.data);
        setLoginScreen(DisplayScreen.NOTABLETOLOGIN)
    }

    function setCurrentUser(response: AxiosResponse<[number, string], any>) {
        let playerId = response.data[0];
        let playerName = response.data[1];
        CurrentUser.setActiveUser(playerId, playerName);
        console.log(`Active user's name is ${CurrentUser.getName()}`)
    }

    switch (loginScreen) {
        case DisplayScreen.LOGIN:
            return (
                <div className="login-popup">
                    <h2>Login</h2>
                    <LoginFields />
                </div>
            )

        case DisplayScreen.NOTABLETOLOGIN:
            return (
                <div className="login-popup">
                    <h2>Login</h2>
                    <p className='errorMsg'>{errorMsg}</p>
                    <LoginFields />
                </div>
            )
    }

    function LoginFields() {
        return <div className='inputs'>
            <input id="nameBox" type="text" placeholder='Enter name' />
            <input id="passwordBox" type="password" placeholder='Enter password' />
            <button onClick={
                async () => {
                    AccountAction(async (name: string, password: string) => await loginUser(name, password));
                }}>Login</button>
            <button onClick={
                async () => {
                    AccountAction(async (name: string, password: string) => await createUser(name, password));
                }}>CreatePlayer</button>
        </div>;
    }

    function AccountAction(action: (name: string, password: string) => void) {
        const userName = (document.getElementById('nameBox') as HTMLInputElement).value;
        const userPassWord = (document.getElementById('passwordBox') as HTMLInputElement).value;
        action(userName, userPassWord);
    }
}



export default Login;


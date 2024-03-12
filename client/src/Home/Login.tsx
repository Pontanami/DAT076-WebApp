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

/**
 * Component for displaying and handling the login/signup page
 * @returns a displayable login page
 */
function Login() {
    const [loginScreen, setLoginScreen] = useState<DisplayScreen>(DisplayScreen.LOGIN)
    const [errorMsg, setErrorMsg] = useState<string>("")
    const navigate = useNavigate();

    useEffect(() => {
        setLoginScreen(DisplayScreen.LOGIN)
    }, [])

    /**
     * Function for creating a new user
     * @param name - username of the player we want to create
     * @param password - password of the user we want to create
     */
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

    /**
     * Function for logging in a user
     * @param name - username we want to login with
     * @param password - password of the user
     */

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

    /**
     * Changes the active user and redirects the user to the home-page
     * @param response - The axios response contaning a userId and a username
     */
    async function onSuccessLogin(response: AxiosResponse<[number, string]>) {
        let playerId = response.data[0];
        let playerName = response.data[1];
        CurrentUser.setActiveUser(playerId, playerName);
        navigate("/home");
    }

    async function onError(error:any){
        setErrorMsg(error.response.data);
        setLoginScreen(DisplayScreen.NOTABLETOLOGIN)
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

    /**
     * Function passing user's input to either login or create account
     * @param action - the action we want to do, login or createUser
     */
    function AccountAction(action: (name: string, password: string) => void) {
        const userName = (document.getElementById('nameBox') as HTMLInputElement).value;
        const userPassWord = (document.getElementById('passwordBox') as HTMLInputElement).value;
        action(userName, userPassWord);
    }
}



export default Login;


import Home from './Home/Home';
import { Routes, Route } from 'react-router-dom';
import Leaderboard from "./Leaderboard/Leaderboard";
import Host from "./Host";
import Join from "./Join";
import Singleplayer from "./Play/Singleplayer";
import JoinScreen from './JoinScreen';
import React, { useEffect, useState } from 'react';
import CreateErrorScreen from './Error/ErrorScreen';
import getErrorMessage from './Error/ErrorHandling';
import { io, Socket } from "socket.io-client";
import {SocketIO} from "./socket"

enum Screens{
  NOERROR,
  ERROR
}

function App() {
  const [screenState, setScreenState] = useState<Screens>(Screens.NOERROR);
  const [errorMessage, setErrorMessage] = useState<string>("");

  switch(screenState){
    case Screens.NOERROR:
      return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home errorHandler={async (error : string) => await setErrorScreen(error)} />} />
                <Route path="/leaderboard" element={<Leaderboard errorHandler={async (error : string) => await setErrorScreen(error)}/>} />
                <Route path="/host" element={<Host />} />
                <Route path="/join" element={<Join />} />
                <Route path="/singleplayer" element={<Singleplayer errorHandler={async (error : any) => await setErrorScreen(error)}/>} />
                <Route path="/joinscreen" element={<JoinScreen />} />
            </Routes>
        </div>
      );
      case Screens.ERROR:
        return <CreateErrorScreen 
                  error={errorMessage}
                  setNoErrorScreen={async () => setNoErrorScreen()}
                  />

  }

  async function setErrorScreen(error : any){
    setErrorMessage(getErrorMessage(error))
    setScreenState(Screens.ERROR)
  }

  async function setNoErrorScreen(){
    setScreenState(Screens.NOERROR)
  }
  
}

export default App;

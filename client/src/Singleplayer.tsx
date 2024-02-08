import React from 'react';
import './singleplayer.css';
import { Link } from 'react-router-dom';
import back from './Image/back.svg';

function Singleplayer() {
  return (
    <div className="Singleplayer">
        <Link to="/"><img alt=''src={back} style={{width: "3rem"}}/></Link>
    </div>
  );
}

export default Singleplayer;
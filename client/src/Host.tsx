import React from 'react';
import './host.css';
import { Link } from 'react-router-dom';
import back from './Image/back.svg';

function Host() {
  return (
    <div className="Host">
        <Link to="/"><img alt=''src={back} style={{width: "3rem"}}/></Link>
    </div>
  );
}

export default Host;
import React from 'react';
import './leaderboard.css';
import { Link } from 'react-router-dom';
import back from './Image/back.svg';

function Leaderboard() {
  return (
    <div className="Leaderboard">
        <Link to="/"><img alt=''src={back} style={{width: "3rem"}}/></Link>
        <section className="text-center">
            <h1 style={{color: "whitesmoke"}}>Leaderboard</h1>
            <div className="container text-center" id="leaderboard">
            <section className="row">
                <i className=" col-2 bi bi-person-fill icon" style={{color: "black"}}></i>
                <div className="col-5 colTitle">
                <strong>Player Name</strong>
                </div>
                <div className="col-5 colTitle">
                <strong>Score</strong>
                </div>
                <hr className="hr-thick" style={{opacity: 1}}></hr>
            </section>
            <section className="row">
                <strong className="col-1 colTitle">1:</strong>
                <i className=" col-1 bi bi-person-fill icon" style={{color: "black"}}></i>
                <div className="col-5 colTitle">
                <strong>John</strong>
                </div>
                <div className="col-5 colTitle">
                <strong>21</strong>
                </div>
                <hr></hr>
            </section>
            <section className="row">
                <strong className="col-1 colTitle">2:</strong>
                <i className=" col-1 bi bi-person-fill icon" style={{color: "black"}}></i>
                <div className="col-5 colTitle">
                <strong>Person</strong>
                </div>
                <div className="col-5 colTitle">
                <strong>10</strong>
                </div>
                <hr></hr>
            </section>
            <section className="row">
                <strong className="col-1 colTitle">3:</strong>
                <i className=" col-1 bi bi-person-fill icon" style={{color: "black"}}></i>
                <div className="col-5 colTitle">
                <strong>Person2</strong>
                </div>
                <div className="col-5 colTitle">
                <strong>3</strong>
                </div>
                <hr></hr>
            </section>
            
            </div>
        </section>
    </div>
  );
}

export default Leaderboard;
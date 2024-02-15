import { Link } from "react-router-dom";
import "./errorScreen.css"

function CreateErrorScreen({ error, setNoErrorScreen }: { error: string, setNoErrorScreen: () => void }) {
    const filePath = require('./Image/gifs/angry-panda.gif');
    return (
        <div className='endScreen error-background'>
            <h2 className="marginTop">Ohh no, something went wrong :(</h2>
            <img className='errorImg spacing' src={filePath} />
            <h2>{error}</h2>
            <div className='endButtons spacing'>
                <Link to="/"><button className="homeButton" onClick={
                    async (e) => {
                        setNoErrorScreen();
                    }
                }>Go back Home</button></Link>

                <button className="homeButton" onClick={
                    async (e) => {
                        setNoErrorScreen();
                    }
                }>Return to last screen</button>
            </div>
        </div>
    )
}

export default CreateErrorScreen;
/*<div>
        <h1>Ohh no, something went wrong :(</h1>
        <br></br>
        <p>{error}</p>
        <Link to="/"><button onClick={
            async (e) => {
                setNoErrorScreen();
            }
        }>Go back to HomeScreen</button></Link>
        <button onClick={
            async (e) => {
                setNoErrorScreen();
            }
        }>Return to last screen</button>
    </div>*/
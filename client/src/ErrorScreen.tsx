import {Link} from "react-router-dom";

function CreateErrorScreen({error, setNoErrorScreen} : {error : string, setNoErrorScreen : () => void}) {
    return <div>
        <h1>Error</h1>
        <p>{error}</p>
        <Link to="/"><button onClick={
            async (e) => {
                setNoErrorScreen();
            }
        }>Go back to HomeScreen</button></Link>
        
    </div>;
}

export default CreateErrorScreen;
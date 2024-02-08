import { Link } from 'react-router-dom';
import back from './Image/back.svg';

function BackButton () {
    return (
        <Link to="/"><img src={back} style={{width: "3rem"}}/></Link>
    )
}

export default BackButton
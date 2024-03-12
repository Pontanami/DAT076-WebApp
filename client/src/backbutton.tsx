import { Link } from 'react-router-dom';
import back from './Image/back.svg';

/**
 * Creates a button used to return to the home screen
 * @returns a displayable button
 */
function BackButton () {
    return (
        <Link to="/home"><img src={back} style={{width: "3rem"}}/></Link>
    )
}

export default BackButton
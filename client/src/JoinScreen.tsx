import './join.css'

/**
 * Component displaying waiting screen
 * @returns a displayable waiting screen when a user has joined a multiplayer game
 */
function JoinScreen(){
    return (
        <div className="Join">
          <section className='contents'>
            <h1>Waiting for host to start game...</h1>
          </section>
        </div>
      );
}

export default JoinScreen;
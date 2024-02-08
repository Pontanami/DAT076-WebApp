import React, { useState } from 'react';
import './join.css';
import { Link } from 'react-router-dom';
import back from './Image/back.svg';

function Join() {
  // State variable to store the entered PIN
  const [pin, setPin] = useState('');

  // Function to handle PIN submission
  const handleSubmit = () => {
    // Save the PIN in a variable (for demonstration purposes)
    const enteredPin = pin;
    console.log('Submitted PIN:', enteredPin);
    // Clear the input field
    setPin('');
    // TODO send PIN to server instead
  };

  return (
    <div className="Join">
      <Link to="/"><img alt=''src={back} style={{width: "3rem"}}/></Link>
      <section className='contents'>
        <h2>Enter game PIN:</h2>
        <input
          type="text"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          style={{ fontSize: '20px'}}
        />
        <button onClick={handleSubmit}>Submit</button>
      </section>
    </div>
  );
}

export default Join;

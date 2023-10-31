import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function StartForm( ) {
    
    const history = useHistory();

    const handleBack = () => {
        // Navigate back to the previous step
        window.location.href ='/order'; // Replace 'previous-step-url' with the actual URL for the previous step
      };
    
    return (
        <div>
          <h1>It sounds like you're ready to start building custom nail sets!</h1>
          <p>Click the button below to start the form:</p>
          <Link to="/order-set/tier">
            <button>Start Form</button>
          </Link>
          <div>
          <button onClick={handleBack}>Back</button>
          </div>
        </div>
      );
    
}

export default StartForm;


import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function StartForm( ) {
        
  const [showResetWarning, setShowResetWarning] = useState(false);

    const handleBack = () => {
      if (showResetWarning) {

        // Navigate back to the previous step
        window.location.href ='/order'; // Replace 'previous-step-url' with the actual URL for the previous step
      } else {
        setShowResetWarning(true);
      };
    }

    const handleCancelReset = () => {
      setShowResetWarning(false);
    };

    return (
        <div>
          <h1>It sounds like you're ready to start building custom nail sets!</h1>
          <p>Click the button below to start the form:</p>
          <Link to="/order-set/tier">
            <button>Start Form</button>
          </Link>
          <div>
        {showResetWarning ? (
          <div>
            <p style={{ color: 'red' }}>
              Going back will reset your form. Are you sure you want to proceed?
            </p>
            <div>
            <button onClick={handleBack}>Yes, I want to proceed</button>

            </div>
            <button onClick={handleCancelReset}>No, I don't want to proceed</button>
          </div>
        ) : (
          <button onClick={handleBack}>Back</button>
        )}
      </div>
        </div>
      );
}

export default StartForm;


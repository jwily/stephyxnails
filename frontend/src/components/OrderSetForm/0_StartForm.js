import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';

function StartForm( ) {
        
  const [showResetWarning, setShowResetWarning] = useState(false);
  const { state } = useOrderContext();
  const isOrderDetailsComplete = state.name && state.email && state.instagram;


  const handleBack = () => {
      if (showResetWarning) {
        // Navigate back to the previous step
        window.location.href ='/order'; // Replace 'previous-step-url' with the actual URL for the previous step
      } else {
        setShowResetWarning(true);
      };
  }

  const redirectToOrderDetails = () => {
    window.location.href ='/order'
  }

  const handleCancelReset = () => {
    setShowResetWarning(false);
  };

  return (
    <div>
      
      <div>
        <h1>It sounds like you're ready to start building custom nail sets!</h1>
      </div>
{/* 
      <div>
        <h2>Click the button below to start the form:</h2>
          <Link to="/order-set/tier">
            <button>Start Form</button>
          </Link>
      </div> */}

      <div>
        <h2>Click the button below to start the form:</h2>
        {isOrderDetailsComplete ? (
          <Link to="/order-set/tier">
            <button>Start Form</button>
          </Link>
        ) : (
          <div>
            <p>Please complete your order details before proceeding.</p>
            <button onClick={redirectToOrderDetails}>Complete Order Details</button>
          </div>
        )}
      </div>

      <div>
        {showResetWarning ? (
            <div>
              <p style={{ color: 'red' }}>
                Going back will reset your form. Are you sure you want to proceed?
              </p>

              <div>
                <button onClick={handleBack}>Yes, I want to proceed</button>
              </div>

              <div>
                <button onClick={handleCancelReset}>No, I don't want to proceed</button>
              </div>
          </div>
        ) : (
          <div>
            <button onClick={handleBack}>Back</button>
          </div>
        )}
      </div>

    </div>
  );
}

export default StartForm;


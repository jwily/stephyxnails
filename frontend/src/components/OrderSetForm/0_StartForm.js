import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';

function StartForm( ) {

  // State to manage whether the reset warning is shown
  const [showResetWarning, setShowResetWarning] = useState(false);
  // Access the state from the order context
  const { state } = useOrderContext();
  const isOrderDetailsComplete = state.name && state.email  // Check if order details are complete
  const [isLoading, setIsLoading] = useState(true); // Initialize the loading state
  
  useEffect(() => {
    // Simulate loading for 100 milliseconds (0.1 seconds) and then set loading to false
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after the delay
    }, 100);  
    // Add dependencies as needed
  }, []);

  // Function to handle going back
  const handleBack = () => {
    if (showResetWarning) {
      // Navigate back to the previous step, resetting the form
      window.location.href ='/order';
    } else {
      // Show the reset warning
      setShowResetWarning(true);
    };
  }

  const redirectToOrderDetails = () => {
    window.location.href ='/order'
  }

  // Function to cancel the reset and hide the warning
  const handleCancelReset = () => {
    setShowResetWarning(false);
  };

  return (
    <>
    {isLoading ? ( // Display loading indicator while isLoading is true
      <div>Loading...</div>
    ) : (
      <>
        <div>
          <h1>It sounds like you're ready to start building custom nail sets!</h1>
        </div>

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
      </>
    )}
  </>

  );
}

export default StartForm;


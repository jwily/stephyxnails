import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';
import LoadingPage from '../LoadingPage';

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
    <div className='p-8 shadow-lg rounded-2xl bg-primary m-4 flex flex-col gap-5'>
    {isLoading ? ( // Display loading indicator while isLoading is true
      <LoadingPage />
    ) : (
      <>
        <div>
          <h1 className='text-center'>It sounds like you're ready to start building custom nail sets!</h1>
        </div>

        <div>
          <h2 className='mb-3'>Click the button below to start the form:</h2>
          {isOrderDetailsComplete ? (
            <Link to="/order-set/tier">
              <button className="rounded-lg btn btn-primary btn-block bg-primary_blue text-black">Start Form</button>
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
              <p className='text-red-600 mb-3'>
                Going back will reset your form. Are you sure you want to proceed?
              </p>
              <div className='flex gap-3'>
                <button className='rounded-lg btn btn-primary btn-block bg-red-300 text-black' onClick={handleBack}>Reset</button>
                <button className="rounded-lg btn btn-primary btn-block bg-primary_blue text-black" onClick={handleCancelReset}>Cancel</button>
              </div>
            </div>

          ) : (
            <div>
              <button className='rounded-lg btn btn-primary btn-block bg-primary_blue text-black' onClick={handleBack}>←</button>
            </div>
          )}
        </div>
      </>
    )}
  </div>

  );
}

export default StartForm;

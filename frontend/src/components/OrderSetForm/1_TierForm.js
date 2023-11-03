import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';

function TierForm() {

  // Initialize the history object and retrieve state, dispatch, and dataResult from the order context
  const history = useHistory()
  const { state, dispatch, dataResult } = useOrderContext();

  // Reference for the tier input and local state to manage the selected tier
  const tierInputRef = useRef(null);
  // Initialize tier state with the value from local storage (if available)
  const [tier, setTier] = useState(() => localStorage.getItem('selectedTier') || '');
  const [isLoading, setIsLoading] = useState(true); // Initialize the loading state
  const isOrderDetailsComplete = state.name && state.email

  useEffect(() => {
    // Simulate loading for 100 milliseconds (0.1 seconds) and then set loading to false
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after the delay
    }, 100);
    // Add dependencies as needed
  }, []);

  const redirectToOrderDetails = () => {
    window.location.href = '/order'
  }

  const handleNext = (e) => {
    e.preventDefault()

    if (tier) {
      // Dispatch an action to update the tier in the context state
      dispatch({ type: 'UPDATE_FORM_DATA', payload: { tier } });

      // Save the selected 'tier' to local storage
      localStorage.setItem('selectedTier', tier);

      history.push('/order-set/shape');
    } else {
      // Display an error message using the ref
      tierInputRef.current.setCustomValidity('Please select a Nail Tier before proceeding.');
      // Trigger form validation
      tierInputRef.current.reportValidity();
    }
  };

  const handleBack = () => {
    // Navigate back to the previous step
    window.location.href = '/order-set/start';
  };

  if (dataResult === null) {
    // Display a loading indicator while data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {isOrderDetailsComplete ? (
            <section>
              <h1>1.Choose a Nail Tier</h1>
              <p>disclaimer</p>
              <div>
                <form onSubmit={handleNext}>
                  <div>
                    {dataResult.map((tierOption) => (
                      <div key={tierOption.id}>
                        <label>
                          <input
                            type="radio"
                            name="tier"
                            value={tierOption.id}
                            checked={tier === tierOption.id}
                            onChange={() => setTier(tierOption.id)}
                            required
                          />
                          {tierOption.name}
                          <span> ${tierOption.price} </span>
                          <p>{tierOption.description}</p>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div>
                    <button onClick={handleBack}>Back</button>
                    <button type="submit">Next</button>
                  </div>
                </form>
              </div>
            </section>
          ) : (
            <div>
              <p>Please complete your order details before proceeding.</p>
              <button onClick={redirectToOrderDetails}>Complete Order Details</button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default TierForm;

import React, {useState, useEffect} from 'react';
import { useOrderContext } from '../../context/OrderContext';
import { useHistory } from 'react-router-dom';

function SubmissionSetForm() {
  // Initialize the history object and retrieve state and dispatch from the order context
  const history = useHistory();
  const { state, dispatch } = useOrderContext();
  const { formData, setCount } = state;  // Destructure values from the state
  const isOrderDetailsComplete = state.name && state.email// Check if order details are complete
  const [isLoading, setIsLoading] = useState(true); // Initialize the loading state
  
  useEffect(() => {
    // Simulate loading for 100 milliseconds (0.1 seconds) and then set loading to false
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after the delay
    }, 100);  
    // Add dependencies as needed
  }, []);

  const redirectToOrderDetails = () => {
    // Redirect the user to the '/order' page
    window.location.href ='/order'
  }

  const handleSubmit = () => {
    // Dispatch an action to save the form data and navigate to the '/review-order' page

    const updatedSets = [...state.sets];

    updatedSets[setCount] = formData;

    dispatch({ type: 'UPDATE_SETS', payload: updatedSets });


  // Dispatch an action to save the form data
  dispatch({ type: 'SAVE_FORM_DATA' });
    history.push('/review-order');
  };

  const handleAddAnotherSet = () => {
      // Dispatch actions to add the current set's data, clear the form, and navigate to '/order-set/tier'
      dispatch({ type: 'ADD_SET', payload: formData });
      dispatch({ type: 'CLEAR_FORM' });
      history.push('/order-set/tier');
  };

  const handleBack = () => { 
    // Navigate back to the previous step, in this case, '/order-set/extra'
    history.push('/order-set/extra'); 
  };

  return (
    <>
    {isLoading ? ( // Display loading indicator while isLoading is true
       <div>Loading...</div>
    ) : (
       <>
      {isOrderDetailsComplete ? (
        <>
        <div>

          <h2>Sets</h2>
          <p>Number of sets made: {setCount + 1}</p> {/* Display the set count */}

          <div>
            <p> your current set</p>
            <p>Tier: {formData.tier}</p>
            <p>shape: {formData.shape}</p>
            <p>photo: {formData.photo}</p>
            <p>description: {formData.description}</p>
            <p>extra: {formData.extra}</p>
          </div>
          
          <div>
            <div>
              <button onClick={handleBack}>Back</button>
            </div>
            <div>
              <button type="submit" onClick={handleAddAnotherSet}>Add Another Set  </button>
            </div>
            <div>
              <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
          </div>

        </div>
        </>           
       ) : (
        <div>
            <p>Please complete your order details before proceeding.</p>
            <button onClick={redirectToOrderDetails}>Complete Order Details</button>
        </div>
      )}  
      </>
    )
    }
    </>
  );
}

export default SubmissionSetForm;

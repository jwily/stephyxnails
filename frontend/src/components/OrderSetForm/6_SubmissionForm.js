import React, {useState} from 'react';
import { useOrderContext } from '../../context/OrderContext';
import { useHistory } from 'react-router-dom';

function SubmissionSetForm() {

  const history = useHistory();
  const { state, dispatch } = useOrderContext();

  const { sets } = state;

  console.log(sets, "set")

  const handleSubmit = () => {
  

    dispatch({ type: 'SAVE_FORM_DATA' });

    history.push('/review-order');
    // window.location.href = '/review-order'; // Replace 'previous-step-url' with the actual URL for the previous step;
  };

  const handleAddAnotherSet = () => {
  
    history.push('/order-set/tier');

  };

  const handleBack = () => {
      
    // Navigate back to the previous step
    history.push('/order-set/extra'); // Replace 'previous-step-url' with the actual URL for the previous step
  };





  return (
    <div>
         <h2>Review Your Order</h2>

      <div>
        <h3>Order Sets</h3>
        {sets.map((formData, index) => {
          return(
          <li key={index}>
            <h4>Set {index + 1}</h4>
            <p>Tier: {formData.tier}</p>
            <p>Shape: {formData.shape}</p>
            <p>Description: {formData.description}</p>
            <p>Extra: {formData.extra}</p>
          </li>
          )}
        )}
      </div> 
   
    
      
    {sets.length === 0 && (
      <p>No sets made.</p>
    )}
      <div>
        <button onClick={handleBack}>Back</button>
        <button type="submit" onClick={handleAddAnotherSet}>Add Another Set  </button>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
      </div>

  );
  
}

export default SubmissionSetForm;

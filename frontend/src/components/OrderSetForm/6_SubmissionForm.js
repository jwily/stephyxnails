import React from 'react';
import { useOrderContext } from '../../context/OrderContext';
import { useHistory } from 'react-router-dom';

function SubmissionSetForm() {

  const history = useHistory();
  const { state, dispatch } = useOrderContext();

  const { sets, formData, setCount, isCurrentSetAdded } = state;
  const isOrderDetailsComplete = state.name && state.email && state.instagram;

    
  const redirectToOrderDetails = () => {
    window.location.href ='/order'
  }

  console.log(sets, "set")

  const handleSubmit = () => {

    dispatch({ type: 'SAVE_FORM_DATA' });
    history.push('/review-order');
  };

  const handleAddAnotherSet = () => {
  
      dispatch({ type: 'ADD_SET', payload: formData });
      dispatch({ type: 'CLEAR_FORM' });

      history.push('/order-set/tier');
  };

  const handleBack = () => {
      
    // Navigate back to the previous step
    history.push('/order-set/extra'); // Replace 'previous-step-url' with the actual URL for the previous step
  };





  return (
    <>
      {isOrderDetailsComplete ? (
        <>
         
         <h2>Sets</h2>

         <p>Number of Sets Made: {setCount}</p> {/* Display the set count */}

      <div>
        {/* <h3>Order Sets</h3>
        {sets.map((formData, index) => {
          return(
          <li key={index}>
            <h4>Set {index + 1}</h4>
            <p>Tier: {formData.tier}</p>
            <p>Shape: {formData.shape}</p>
            <p>photo: {formData.photo}</p>
            <p>Description: {formData.description}</p>
            <p>Extra: {formData.extra}</p>
          </li>
          )}
        )} */}
        <div>
          <p> current set</p>
          <p>Tier: {formData.tier}</p>
          <p>shape: {formData.shape}</p>
          <p>photo: {formData.photo}</p>
          <p>description: {formData.description}</p>
          <p>extra: {formData.extra}</p>


        </div>
      </div> 
  
      
    {/* {sets.length === 0 && (
      <p>No sets made.</p>
    )} */}
      <div>
        <button onClick={handleBack}>Back</button>
        <button type="submit" onClick={handleAddAnotherSet}>Add Another Set  </button>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
      </>
        
        ) : (
          <div>
            <p>Please complete your order details before proceeding.</p>
            <button onClick={redirectToOrderDetails}>Complete Order Details</button>
          </div>
        )}
     
      </>

  );
  
}

export default SubmissionSetForm;

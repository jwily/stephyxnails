import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';

function TierForm() {

  const history = useHistory()
  const { state, dispatch, dataResult } = useOrderContext();
  const tierInputRef = useRef(null);
  const [tier, setTier] = useState(state.formData.tier)
  const isOrderDetailsComplete = state.name && state.email && state.instagram;

  // console.log(dataResult) // array of 2

  const redirectToOrderDetails = () => {
    window.location.href ='/order'
  }


  const handleNext = (e) => {
    e.preventDefault()

    if (tier) {
      // Dispatch an action to update the tier in the context state
      dispatch({ type: 'UPDATE_FORM_DATA', payload: { tier } });

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
                  value={tierOption.name}
                  checked={tier === tierOption.name}
                  onChange={() => setTier(tierOption.name)}
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
  );
}

export default TierForm;

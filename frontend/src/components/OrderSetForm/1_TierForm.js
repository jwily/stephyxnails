import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';

function TierForm() {

  const history = useHistory()
  const { state, dispatch, dataResult } = useOrderContext();
  const tierInputRef = useRef(null);
  const [tier, setTier] = useState(state.formData.tier)

  console.log(dataResult) // array of 2

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
    window.location.href = '/order-set/tier'; // Replace 'previous-step-url' with the actual URL for the previous step;
  };

  if (dataResult === null) {
    // Display a loading indicator while data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <>
      <section>
        <h1>1.Choose a Nail Tier</h1>
        <p>disclaimer</p>
        <div>
          <div>
            {dataResult.map(tier => {
              return (
                <div key={tier.id}>
                  <div>

                    name: {tier.name}
                  </div>
                  <div>

                    price: {tier.price}
                  </div>
                  <div>
                    discription: {tier.description}

                  </div>
                </div>
              )
            })}
          </div>

          <div>
            <button onClick={handleBack}>Back</button>
            <button type="submit" onClick={handleNext}>Next</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default TierForm;

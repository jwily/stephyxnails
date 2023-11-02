import React , {useRef, useState} from 'react';
import {  useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';

function TierForm() {
  
  const history = useHistory( ) 
  const { state, dispatch }= useOrderContext();
  const tierInputRef = useRef(null);
  const [tier, setTier] = useState(state.formData.tier)
  
  const handleNext = (e) => {
    e.preventDefault()

    if (tier) {
      // Dispatch an action to update the tier in the context state
      dispatch({ type: 'UPDATE_FORM_DATA', payload: { tier} });

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

  return (
  <>
    <section>
      <h1>1.Choose a Nail Tier</h1>
      <p>disclaimer</p>
        <div>
          <div>
          <label>
            <input
              type="radio"
              name="tier"
              value="Budding Tier"
              // checked={tier === 'Budding Tier'}
              onChange={(e) => setTier( e.target.value )}
              ref={tierInputRef} // Assign the ref to the input element
              required
            />
              Budding Tier
              <span> $35 </span>
              <p> Solid colors (including solid chrome or glitter nails), a few gems/stickers</p>
          </label>
          </div>
          <div>
          <label>
            <input
              type="radio"
              name="tier"
              value="Petal Tier"
              // checked={tier === 'Petal Tier'}
              onChange={(e) => setTier( e.target.value )}
              required
            />
              Petal Tier
              <span> $50 </span>
              <p>Ombre, airbrush, French tips, simple painted designs, 1-2 simple characters, some gems/stickers, 1-2 3D charms</p>
          </label>
          </div>
          <div>
          <label>
            <input
              type="radio"
              name="tier"
              value="Sakura Tier"
              // checked={tier === 'Sakura Tier'}
              onChange={(e) => setTier(e.target.value )}
              required
            />
              Sakura Tier
              <span> $65 </span>
              <p>Intricate/detailed nail art, 1-2 detailed portraits OR hand sculpted charms, more/charms</p>
          </label>
          </div>
          <div>
          <label>
            <input
              type="radio"
              name="tier"
              value="Blossom Tier"
              // checked={tier === 'Blossom Tier'}
              onChange={(e) => setTier( e.target.value )}
              required
            />
              Blossom Tier
              <span> $80 </span>
              <p>Intricate designs across all nails, up to 5 hand sculpted charms, large and complex charm arrangements</p>
          </label>
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


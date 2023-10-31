import React , {useRef} from 'react';
import {  useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';

function TierForm( ) {
  
  const history = useHistory() 
  const { formData, updateFormData }= useOrderContext();
  const tierInputRef = useRef(null);
  
  const handleNext = (e) => {

    e.preventDefault()

    if (formData.tier) {
  
      // Update the formData context with the tier data
      updateFormData({tier: formData.tier});
      
      console.log('update', formData)
  
      history.push('/order-set/shape');

    } else {

      // Display an error message using the ref
      tierInputRef.current.setCustomValidity('Please select a Nail Tier before proceeding.');

      // Trigger form validation
      tierInputRef.current.reportValidity();

    }
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
              checked={formData.tier === 'Budding Tier'}
              onChange={(e) => updateFormData({ tier: e.target.value })}
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
              checked={formData.tier === 'Petal Tier'}
              onChange={(e) => updateFormData({ tier: e.target.value })}
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
              checked={formData.tier === 'Sakura Tier'}
              onChange={(e) => updateFormData({ tier: e.target.value })}
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
              checked={formData.tier === 'Blossom Tier'}
              onChange={(e) => updateFormData({ tier: e.target.value })}
              required
            />
              Blossom Tier
              <span> $80 </span>
              <p>Intricate designs across all nails, up to 5 hand sculpted charms, large and complex charm arrangements</p>
          </label>
          </div>

          <div>
            <button type="button" onClick={handleNext}>Next</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default TierForm;


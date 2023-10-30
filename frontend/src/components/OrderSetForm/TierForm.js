import React from 'react';
import {  useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';

function TierForm( {history}) {

    const { formData, updateFormData }= useOrderContext();
   
    const handleNext = () => {
      // Add the data to the current data set
      updateFormData(formData.tier);
      history.push('/order-set/shape');
    };
  

  return (
    <>
    <section>
        <h1>1.Choose a Nail Tier</h1>
          <p>disclaimer</p>
            <div>
            <form>
        <label htmlFor="tier">Tier:</label>
        <input
          type="text"
          id="tier"
          name="tier"
          value={formData.tier}
          onChange={(e) => updateFormData({ tier: e.target.value })}
          required
        />
        <button type="button" onClick={handleNext}>Next</button>
      </form>
            </div>

    </section>


    </>

  );
}

export default TierForm;


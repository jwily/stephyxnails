import React, { useState } from 'react';
import {  useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';

function TierForm() {

    const { tier, setTier } = useOrderContext();
    const history = useHistory();
    const allTiers = ['Budding Tier', 'Petal Tier', 'Sakura Tier', 'Blossom Tier']

    const handleSubmit = () => {
    // Navigate to the next step
    history.push('/order-set/shape');
  };

  return (
    <>
    <section>
        <h1>1.Choose a Nail Tier</h1>
          <p>disclaimer</p>
            <div>
              {allTiers.map((nail_tier) => {
                // Mapping through the allTiers array
                return (
                  <div className="#"  key={nail_tier}>
                    <input
                      className="#"
                      name="tier"
                      type="radio"
                      id={nail_tier}
                      value={nail_tier}
                      onChange={ () => {setTier(nail_tier)}}
                      required
                    />
                    <label htmlFor={nail_tier}> {nail_tier}</label>
                  </div>
                  )
              })}
            </div>



            <div>
              <button onClick={handleSubmit}>Next</button>
            </div>
    </section>


    </>

  );
}

export default TierForm;


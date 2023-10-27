import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


function TierForm() {
    
  const [tier, setTier] = useState('');
  const history = useHistory();

  const allTiers = ['Budding Tier', 'Petal Tier', 'Sakura Tier', 'Blossom Tier']

  const handleNext = () => {
    // Save the "Tier Form" value and navigate to the next step
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
                  <div className="#"> 
                    <input 
                      className="#"
                      name={tier}
                      type="radio"
                      id={nail_tier}
                      checked= {tier === nail_tier} 
                      value={tier}
                      onChange={() => { setTier(nail_tier) }}
                      required
                    />
                    <label htmlFor={nail_tier}> {nail_tier}</label>
                  </div>
                  )
              })}
            </div>
            
            <div>
              <button onClick={handleNext}>Next</button>
            </div>
    </section>
    </>

  );
}

export default TierForm;

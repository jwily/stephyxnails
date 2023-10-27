import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


function TierForm() {
    
  const [tier, setTier] = useState('');
  const history = useHistory();

  const allTiers = ['Budding Tier', 'Petal Tier', 'Sakura Tier', 'Blossom Tier']

  const handleNext = () => {
    // Save the "Tier Form" value and navigate to the next step
    history.push('/set/shape');
  };

  return (
    <>
    <div> 
        <h2></h2>
            <p></p>
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
                    
                                 {/* <label for={nail_tier === "Budding Tier"}>{"Description of budding tier"}</label> */}
                                <label htmlFor={nail_tier}> {nail_tier}</label>
                                </div>
                            )
                        })}
        <div>
            <button onClick={handleNext}>Next</button>
        </div>
    </div>
    </>

  );
}

export default TierForm;

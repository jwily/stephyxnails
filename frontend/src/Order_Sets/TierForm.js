import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function TierForm() {

  const [tier, setTier] = useState('');
  const history = useHistory();

  const allTiers = ['Budding Tier', 'Petal Tier', 'Sakura Tier', 'Blossom Tier']


  const handleSubmit = () => {
    e.preventDefault()

    history.push('/shape');
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className="#">
            <h2>1. Pick a Nail Tier</h2>
                <div className="#"> 
                    <label>Please choose the Nail Tier that best fits your custom needs</label>
                    <p>insert disclaimer</p>
                    <div className="#"> 
                        {allTiers.map((nail_tier) => {
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
                    </div>
                </div>
        </div>
    </form>
  );
}

export default TierForm;

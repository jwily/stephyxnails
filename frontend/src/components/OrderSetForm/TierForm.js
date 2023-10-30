import React, { useState, useEffect } from 'react';
import {  useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';


function TierForm() {

    const [submissions, setSubmissions] = useState([]);
    const { tier, setTier } = useOrderContext();
    const history = useHistory();

  const allTiers = ['Budding Tier', 'Petal Tier', 'Sakura Tier', 'Blossom Tier']

  const handleSubmit = () => {
    // Store the data in the submissions array
    console.log('Before update:', submissions);


    console.log('Updated tier:', tier);

    setSubmissions([...submissions, tier]);

    console.log('after update:', submissions);

     // Clear the form input

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


// <input type='radio' value='BuddingTier'/>
// <lable for='BuddingTier'>Budding Tier</lable>
// <input type='radio' value='PetalTier'/>
// <lable for='PetalTier'>Petal Tier</lable>
// <input type='radio' value='SakuraTier'/>
// <lable for='SakuraTier'>Sakura Tier</lable>
// <input type='radio' value='Blossom ier'/>
// <lable for='BlossomTuer'>Blossom Tier</lable>

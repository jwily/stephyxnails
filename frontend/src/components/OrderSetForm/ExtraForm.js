import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function ExtraForm() {
    const [extra, setExtra] = useState('');
    const history = useHistory();
  
    const handleNext = () => {
        // Save the "Tier Form" value and navigate to the next step
        history.push('/order-set/all');
      };
  
    return (
        <>
        <div> 
            <h2></h2>
                <p></p>
                <input
                 >
              </input>
           
            <div>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
        </>
    );
  }
  
  export default ExtraForm;
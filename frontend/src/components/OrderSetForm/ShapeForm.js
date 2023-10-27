import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';



function ShapeForm() {
    const [shape, setShape] = useState('');
  
    const handleNext = () => {
      // Save the "Shape Form" value and navigate to the next step
      history.push('/set/photo');
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
  
  export default ShapeForm;
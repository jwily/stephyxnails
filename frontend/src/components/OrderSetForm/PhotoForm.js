import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';



function PhotoForm() {

    const [shape, setShape] = useState('');
    const history = useHistory();


    const handleNext = () => {
      // Save the "Photo Form" value and navigate to the next step
      history.push('/order-set/description');
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
  
  export default PhotoForm;
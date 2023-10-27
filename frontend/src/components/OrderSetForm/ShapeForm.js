import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';



function ShapeForm() {
  const history = useHistory();

    const [shape, setShape] = useState('');
  
    const handleNext = () => {
      // Save the "Shape Form" value and navigate to the next step
      history.push('/order-set/photo');
    };
  
    return (
      <>
      <section> 
        <h2></h2>
            <p></p>
              <input
              >
              </input>
        <div>
        <button onClick={() => history.goBack()}>Go Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </section>
      </>
    );
  }
  
  export default ShapeForm;
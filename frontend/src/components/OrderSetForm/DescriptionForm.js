import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';



function DescriptionFrom() {

    const {description, setDescription} = useOrderContext();

    const history = useHistory();

    const handleSubmit = () => {
      history.push('/order-set/extra'); 
    };

    const handleBack = () => {
      // Navigate back to the previous step
      history.push('/order-set/photo'); // Replace 'previous-step-url' with the actual URL for the previous step
    };
  
  
    return (
      <>
      <section> 
        <h2>4. Nail Description</h2>
          <p>disclaimer insert</p>
            <div>
              <textarea
                className="#"
                type="text"
                placeholder="#"
                value={description}
                onChange={ (e) => { setDescription(e.target.value)}}
                maxLength={5000}
              >
              </textarea>
          </div>

          <div>
            <button onClick={handleBack}>Back</button>
            <button onClick={handleSubmit}>Next</button>
          </div>
      </section>
      </>
    );
  }
  
  export default DescriptionFrom;
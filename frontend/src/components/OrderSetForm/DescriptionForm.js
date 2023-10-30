import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';



function DescriptionFrom({history}) {


    const { formData, updateFormData } = useOrderContext();

    const handleNext = (e) => {
      e.preventDefault()
      // Add the data to the current data set
      updateFormData({ description: formData.description});
      console.log('update', formData)

      history.push('/order-set/extra'); // Navigate to the next form question
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
                value={formData.description}
                onChange={ (e) => updateFormData({ description: e.target.value })}
                maxLength={5000}
              >
              </textarea>
          </div>

          <div>
            <button onClick={handleBack}>Back</button>
            <button onClick={handleNext}>Next</button>
          </div>
      </section>
      </>
    );
  }
  
  export default DescriptionFrom;
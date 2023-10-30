import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';



function PhotoForm() {
  const history = useHistory() 

    const { formData, updateFormData } = useOrderContext();

    const handleNext = (e) => {
      e.preventDefault()
      // Add the data to the current data set
      updateFormData({photo : formData.photo});
      console.log('update', formData)

      history.push('/order-set/description'); // Navigate to the next form question
    };


    const handleBack = () => {
      // Navigate back to the previous step
      history.push('/order-set/shape'); // Replace 'previous-step-url' with the actual URL for the previous step
    };
  
  
    return (
      <>
      <section> 
        <h2>3.Photo Upload</h2>
          <p>disclaimer insert</p>
            <div>
              <input
               type="text"
               value={formData.photo}
               onChange={(e) => updateFormData({ photo: e.target.value })}
              >
              </input>
            </div>

            <div>
              <button onClick={handleBack}>Back</button>
               <button onClick={handleNext}>Next</button>
            </div>
      </section>
      </>
    );
  }
  
  export default PhotoForm;
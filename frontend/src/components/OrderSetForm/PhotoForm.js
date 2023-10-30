import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';



function PhotoForm({history}) {

    // const {photo, setPhoto, addData} = useOrderContext();
    // const history = useHistory();

    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   addData(); // Add the current data to the array
    //   history.push('/order-set/description'); 
    // };

    const { formData, updateFormData } = useOrderContext();

    const handleNext = () => {
      // Add the data to the current data set
      updateFormData(formData.photo);
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
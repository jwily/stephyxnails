import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';


function ExtraForm({history}) {

    // const {extra, setExtra, addData} = useOrderContext();
    // const history = useHistory();

    // const handleSubmit = (e) => {  
    //     e.preventDefault();
    //     addData(); // Add the current data to the array    
      
    //     // Navigate to the next step 
    //     history.push('/order-set/all'); 
    // };

    const { formData, updateFormData } = useOrderContext();

    const handleNext = () => {
      // Add the data to the current data set\
      updateFormData(formData.extra);

      history.push('/order-set/all'); // Navigate to the next form question
    };


      const handleBack = () => {
        // Navigate back to the previous step
        history.push('/order-set/description'); // Replace 'previous-step-url' with the actual URL for the previous step
      };
    
  
    return (
        <>
        <section> 
            <h2>5.Charms</h2>
                <p>disclaimer insert</p>
                    <div>
                        <textarea
                            className="#"
                            type="text"
                            placeholder=""
                            value={formData.extra}
                            onChange={ (e) =>  updateFormData({ extra: e.target.value })}>     
                        </textarea>
                    </div> 
                <div>
                    {/* <button onClick={() => history.goBack()}>Go Back</button> */}
                    <button onClick={handleBack}>Back</button>
                    <button onClick={handleNext}>Next</button>
                </div>
        </section>
        </>
    );
  }
  
  export default ExtraForm;
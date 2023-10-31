import React, {useRef} from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';

function ShapeForm( ) {

  const history = useHistory() 
   const { formData, updateFormData } = useOrderContext();
   const shapeSelectRef = useRef(null);


    const handleNext = (e) => {
      e.preventDefault()
      if(formData.shape !== 'Select A Nail Shape'){
      // Add the data to the current data set
      updateFormData({shape: formData.shape});
      console.log('update', formData)
      history.push('/order-set/photo');
      } else {
         // No valid shape selected; show an error message
      shapeSelectRef.current.setCustomValidity('Please select a Nail Shape before proceeding.');
      shapeSelectRef.current.reportValidity();
      }
    };
    const handleBack = () => {
      // Navigate back to the previous step
      history.push('/order-set/tier'); // Replace 'previous-step-url' with the actual URL for the previous step
    };

    return (
      <>
      <section>
        <h2>2. Choose your perferred nail shape and length</h2>
            <p>disclaimer insert</p>
              <div>
                <select
                  value={formData.shape}
                  onChange={(e) => updateFormData({ shape: e.target.value })}
                  ref={shapeSelectRef} // Assign the ref to the select element
                >
                  <option>Select A Nail Shape</option>
                  <option>Extra-Short Square</option>
                  <option>Short Square</option>
                  <option>Medium Square</option>
                  <option>Short Coffin</option>
                  <option>Medium Coffin</option>
                  <option>Short Almond</option>
                  <option>Medium Round</option>
                  <option>Short Round</option>
                  <option>Medium Round</option>
                  <option>Short Almond</option>
                  <option>'Medium Almond</option>
                  <option>Medium Stiletto</option>
                </select>
              </div>

              <div>
                <button onClick={handleBack}>Back</button>
                <button type="button" onClick={handleNext}>Next</button>
              </div>
      </section>
      </>
    );
  }

  export default ShapeForm;

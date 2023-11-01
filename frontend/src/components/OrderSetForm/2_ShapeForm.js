import React, {useRef} from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';

function ShapeForm() {
  
  const history = useHistory() 
  const { formData, updateFormData, dispatch} = useOrderContext();
  const selectRef = useRef(null); // Create a ref for the select element


  const handleNext = (e) => {

    e.preventDefault()

    if(formData.shape === ''){
      
      // Show an error message or take appropriate action to inform the user about the missing selection
      alert('Please select a Nail Shape before proceeding.');

    } else {

       // A valid shape is selected
      //  updateFormData({ shape: selectRef.current.value });
      dispatch({ type: 'UPDATE_FORM_DATA', payload: { shape: formData.shape } });
      // dispatch({ type: 'SAVE_FORM_DATA', payload: formData }); // Save other step data

       history.push('/order-set/photo');
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
                  ref={selectRef} // Assign the ref to the select element
                  required
                >
                <option value="" disabled>
                        Select A Nail Shape
                  </option>   
                  <option value="Extra-Short Square" >Extra-Short Square</option>
                  <option value="Short Square">Short Square</option>
                  <option value="Medium Square">Medium Square</option>
                  <option value="Short Coffin">Short Coffin</option>
                  <option value="Medium Coffin">Medium Coffin</option>
                  <option value="Short Almond">Short Almond</option>
                  <option value="Medium Round">Medium Round</option>
                  <option value="Short Round">Short Round</option>
                  <option value="Medium Round">Medium Round</option>
                  <option value="Short Almond">Short Almond</option>
                  <option value="Medium Almond">'Medium Almond</option>
                  <option value="Medium Stiletto">Medium Stiletto</option>
                </select>
              </div>

              <div>
                <button onClick={handleBack}>Back</button>
                <button type="submit" onClick={handleNext}>Next</button>
              </div>
      </section>
      </>
    );
}

  export default ShapeForm;

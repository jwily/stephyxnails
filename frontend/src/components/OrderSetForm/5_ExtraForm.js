import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';


function ExtraForm() {

    const history = useHistory() 
    const { state, dispatch }= useOrderContext();

    const [calculatedValue, setCalculatedValue] = useState(0);
    const [extra, setExtra] = useState(state.formData.extra);
    // const [inputValue, setInputValue] = useState(extra);



    const handleNext = (e) => {
        e.preventDefault();

 
        dispatch({ type: 'UPDATE_FORM_DATA', payload: { extra } });
        // dispatch({ type: 'SAVE_FORM_DATA' });


        history.push('/order-set/all'); // Navigate to the next form question
      };
    
      const handleBack = () => {
        // Navigate back to the previous step
        history.push('/order-set/description');
      };
    
      const handleInputChange = (e) => {
        const newValue = parseInt(e.target.value);
        if (!isNaN(newValue)) {
          // Ensure the input is a valid integer
          setExtra(newValue);
          // Calculate the new value and update the calculatedValue
          setCalculatedValue(newValue * 5);
        }
      };


  
    return (
        <>
        <section> 
        <h2>5. Charms</h2>
        <p>disclaimer insert</p>
        <div>
          <input
            type="number"
            placeholder=""
            value={extra}
            onChange={handleInputChange}
          />
          <p>Calculated: {calculatedValue}</p>
        </div>
        <div>
          <button onClick={handleBack}>Back</button>
          <button type="submit" onClick={handleNext}>Next</button>
        </div>
        </section>
        </>
    );
  }
  
  export default ExtraForm;
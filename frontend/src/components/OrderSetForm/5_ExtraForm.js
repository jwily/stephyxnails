import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';


function ExtraForm() {

    const history = useHistory() 
    const { formData, updateFormData } = useOrderContext();
    const [inputValue, setInputValue] = useState(formData.extra);
    const [calculatedValue, setCalculatedValue] = useState(0);


    const handleNext = (e) => {
        e.preventDefault();
        // Calculate the value as number * 3
        const calculated = inputValue * 5;
        // Update the form data with the input value
        updateFormData({ extra: inputValue });
        setCalculatedValue(calculated); // Update the calculated value
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
          setInputValue(newValue);
          // Calculate the new value and update the calculatedValue
          setCalculatedValue(newValue * 5);
        }
      };

      useEffect(() => {
        console.log('update', formData);
      }, [formData]);
      
    
  
    return (
        <>
        <section> 
        <h2>5. Charms</h2>
        <p>disclaimer insert</p>
        <div>
          <input
            type="number"
            placeholder=""
            value={inputValue}
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
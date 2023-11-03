import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';

function ExtraForm() {

    const history = useHistory() 
    const { state, dispatch }= useOrderContext();
    const [calculatedValue, setCalculatedValue] = useState(0);
    const [extra, setExtra] = useState(state.formData.extra);
    const [isLoading, setIsLoading] = useState(true); // Initialize the loading state
    const isOrderDetailsComplete = state.name && state.email 
 
    const redirectToOrderDetails = () => {
    window.location.href ='/order'
    }

    useEffect(() => {
      // Simulate loading for 100 milliseconds (0.1 seconds) and then set loading to false
      setTimeout(() => {
        setIsLoading(false); // Set loading to false after the delay
      }, 100);  
      // Add dependencies as needed
    }, []);

    const handleNext = (e) => {
        e.preventDefault();

        dispatch({ type: 'UPDATE_FORM_DATA', payload: { extra } });

        history.push('/order-set/currentset'); // Navigate to the next form question
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
           {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
        {isOrderDetailsComplete ? (
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
        
        ) : (
          <div>
            <p>Please complete your order details before proceeding.</p>
            <button onClick={redirectToOrderDetails}>Complete Order Details</button>
          </div>
        )}
      </>
    )}
  </>
    );
  }
  
  export default ExtraForm;
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';

function ExtraForm() {

    const history = useHistory() 
    const { state, dispatch }= useOrderContext();
    const [calculatedValue, setCalculatedValue] = useState(0); // State for the calculated value
    const [extra, setExtra] = useState(state.formData.extra);
    const [isLoading, setIsLoading] = useState(true); // Initialize the loading state
    const isOrderDetailsComplete = state.name && state.email 
    const [error, setError] = useState(''); // State to hold error message

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

    useEffect(() => {
      // Retrieve the calculatedValue from localStorage when the component loads
      const savedCalculatedValue = localStorage.getItem('calculatedValue');
      if (savedCalculatedValue) {
        setCalculatedValue(parseInt(savedCalculatedValue, 10));
      }
    }, []);
  
    useEffect(() => {
      // Calculate the new value and update the calculatedValue
      setCalculatedValue(extra * 5);
      // Save the updated calculatedValue to localStorage whenever it changes
      localStorage.setItem('calculatedValue', calculatedValue.toString());
    }, [extra, calculatedValue]);

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
      const newValue = parseInt(e.target.value, 10);

    if (!isNaN(newValue)) {
      // Ensure the input is a valid integer

      // Prevent negative numbers
      if (newValue < 0) {
        // If the input is negative, set it to 0
        setExtra(0);
        setError('Extra cannot be negative.');
      } else if (newValue > 25) {
        // Limit the input to a maximum of 25
        setExtra(25);
        setError('Extra cannot exceed 25.');
      } else {
        setExtra(newValue);
        setError(''); // Clear any previous error message
      }
    } else {
      // If the input is not a valid number, show an error message
      setError('Please enter a valid number.');

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
                     {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

                  <p>$5 per charm = ${calculatedValue}</p>
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
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';

function ExtraForm() {

    const history = useHistory() 
    const { state, dispatch }= useOrderContext();
    const [calculatedValue, setCalculatedValue] = useState(0);
    const [calculatedValue2, setCalculatedValue2] = useState(0);
    const [extra, setExtra] = useState(state.formData.extra || '');
    const [extra2, setExtra2] = useState(state.formData.extra2 || '');
    const [isLoading, setIsLoading] = useState(true); // Initialize the loading state
    const isOrderDetailsComplete = state.name && state.email 
    const [error, setError] = useState(''); // State to hold error message
    const [error2, setError2] = useState(''); // State to hold error message


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

    // Load 'extra' data from localStorage when the component mounts
    useEffect(() => {
      const savedExtra = localStorage.getItem('extra');
      if (savedExtra) {
        setExtra(parseInt(savedExtra, 10));
      }
    }, []);

    useEffect(() => {
      const savedExtra2 = localStorage.getItem('extra2');
      if (savedExtra2) {
        setExtra2(parseInt(savedExtra2, 10));
      }
    }, []);

    // Save 'extra' data to localStorage when 'extra' changes
    useEffect(() => {
      localStorage.setItem('extra', extra.toString());
    }, [extra]);

    useEffect(() => {
      localStorage.setItem('extra2', extra2.toString());
    }, [extra2]);


    // Load 'calculatedValue' from localStorage when the component mounts
    useEffect(() => {
      const savedCalculatedValue = localStorage.getItem('calculatedValue');
      if (savedCalculatedValue) {
        setCalculatedValue(parseInt(savedCalculatedValue, 10));
      }
    }, []);
    useEffect(() => {
      const savedCalculatedValue2 = localStorage.getItem('calculatedValue2');
      if (savedCalculatedValue2) {
        setCalculatedValue2(parseInt(savedCalculatedValue2, 10));
      }
    }, []);

    // Calculate the new value and update 'calculatedValue'
    useEffect(() => {
      setCalculatedValue(extra * 5);

      // Save the updated 'calculatedValue' to localStorage whenever it changes
      localStorage.setItem('calculatedValue', calculatedValue.toString());
    }, [extra, calculatedValue]);

    useEffect(() => {
      setCalculatedValue2(extra2 * 10);

      // Save the updated 'calculatedValue' to localStorage whenever it changes
      localStorage.setItem('calculatedValue', calculatedValue2.toString());
    }, [extra2, calculatedValue2]);

    const handleNext = (e) => {
      e.preventDefault();
      dispatch({ type: 'UPDATE_FORM_DATA', payload: { extra, extra2 } });
      history.push('/order-set/currentset'); // Navigate to the next form question
    };
    
    const handleBack = () => {
      // Navigate back to the previous step
      history.push('/order-set/description');
    };
  
    const handleInputChange = (e) => {
      const newValue = parseInt(e.target.value, 10);
  
      if (!isNaN(newValue)) {
        if (newValue < 0) {
          setExtra(0);
          setError('charm cannot be negative.');
        } else if (newValue > 25) {
          setExtra(25);
          setError('charm cannot exceed 25.');
        } else {
          setExtra(newValue);
          setError('');
        }
      } else {
        setError('Please enter a valid number.');
      }
    };

      
    const handleInputChange2 = (e) => {
      const newValue2 = parseInt(e.target.value, 10);
  
      if (!isNaN(newValue2)) {
        if (newValue2 < 0) {
          setExtra2(0);
          setError2('character cannot be negative.');
        } else if (newValue2 > 25) {
          setExtra2(25);
          setError2('character cannot exceed 25.');
        } else {
          setExtra2(newValue2);
          setError2('');
        }
      } else {
        setError2('Please enter a valid number.');
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

                <h2>Characters</h2>
                <p>disclaimer insert</p>
                <div>
                  <input
                    type="number"
                    placeholder=""
                    value={extra2}
                    onChange={handleInputChange2}
                    
                  />
                     {error2 && <p style={{ color: 'red' }}>{error2}</p>} {/* Display error message */}

                     <p>$5 per charm = ${calculatedValue2}</p>
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
import React, { useState , useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';


function SizesForm() {

  const history = useHistory()
  const { state, dispatch } = useOrderContext();

  const [leftDisplay, setLeftDisplay] = useState(['', '', '', '', '']);
  const [rightDisplay, setRightDisplay] = useState(['', '', '', '', '']);
  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');
  const [errorLeftHand, setErrorLeftHand] = useState('');
  const [errorRightHand, setErrorRightHand] = useState('');
  const [error, setError] = useState('');

  const [leftHandIndexCompletion, setLeftHandIndexCompletion] = useState([false, false, false, false, false]);
  const [rightHandIndexCompletion, setRightHandIndexCompletion] = useState([false, false, false, false, false]);



  const isOrderDetailsComplete = state.name && state.email 
  const [isLoading, setIsLoading] = useState(true); // Initialize the loading state

  useEffect(() => {
    // Simulate loading for 100 milliseconds (0.1 seconds) and then set loading to false
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after the delay
    }, 100);  
    // Add dependencies as needed
  }, []);


  const redirectToOrderDetails = () => {
    window.location.href ='/order'
  }

  const handleNext = (e) => {
    e.preventDefault();

    const isLeftHandValid = validateHand(leftDisplay);
    const isRightHandValid = validateHand(rightDisplay);
    const isBothHandsValid = isLeftHandValid && isRightHandValid;
  
    if (!isBothHandsValid) {
      setError("Please provide input for all finger display indices in both hands.");
    } else {
      setError(""); // Clear the error message if both hands are valid
      dispatch({ type: 'UPDATE_FORM_DATA', payload: { leftDisplay, rightDisplay } });
      history.push('/order-set/photo'); // Navigate to the next form question
    }
  }

  const validateHand = (handDisplay) => {
    const pattern = /^\d{5}$/;
    return pattern.test(handDisplay.join(''));
  };

  const handleBack = () => {
    // Navigate back to the previous step
    history.push('/order-set/shape');
  };

  const FingerDisplay = ({ hand, name, value }) => {
    const valuesArray = hand === 'Left' ? leftDisplay : rightDisplay;

    return (
      <div>
        {`${hand} ${name}: ${value ? value : ''}`}
        
      </div>
    )
  }

  const textToDisplay = (e, setText, setDisplay) => {

    const value = e.target.value;

    const sanitizedValue = value.replace(/[^0-9 ,\-]/g, '');

      // Check if the input contains invalid characters
  if (sanitizedValue !== value) {
    setError("Invalid characters detected. Only numbers, spaces, commas, and hyphens are allowed.");
  } else {
    setError(""); // Reset the error message if input is valid
  }

    // Allows input to function correctly
    setText(sanitizedValue);

   

    // Code below parses through the text
    // and picks out valid numbers.

    // This allows for variety of input:
    // 2, 7, 6, 7, 9
    // 2,7,6,7,9
    // 2 7 6 7 9
    // 2-7-5-7-9

    const string = value + '_';

    const allowed = '0123456789.';
    let stack = []
    const newDisplay = []

    for (let char of string) {
      if (allowed.includes(char)) {
        stack.push(char)
      } else {
        if (stack.length > 0) {
          newDisplay.push(stack.join(''));
          stack = [];
        }
      }
    }

    setDisplay(newDisplay);
  }

  // HTML and CSS here are just a rough draft,
  // wanted to text out functionality

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
        {isOrderDetailsComplete ? (
      <section>
        <h2>X. Sizes</h2>
        <p>disclaimer insert</p>
        <div>
          <p className='flex flex-row space-x-5'>
          <FingerDisplay hand='Left' name='Pinky' value={leftDisplay[4]} />
  <FingerDisplay hand='Left' name='Ring' value={leftDisplay[3]} />
  <FingerDisplay hand='Left' name='Middle' value={leftDisplay[2]} />
  <FingerDisplay hand='Left' name='Index' value={leftDisplay[1]} />
  <FingerDisplay hand='Left' name='Thumb' value={leftDisplay[0]} />
          </p>
          <p className='flex flex-row space-x-5'>
          <FingerDisplay hand='Right' name='Thumb' value={rightDisplay[0]} />
  <FingerDisplay hand='Right' name='Middle' value={rightDisplay[2]} />
  <FingerDisplay hand='Right' name='Index' value={rightDisplay[1]} />
  <FingerDisplay hand='Right' name='Ring' value={rightDisplay[3]} />
  <FingerDisplay hand='Right' name='Pinky' value={rightDisplay[4]} />
          </p>
        </div>
        <div>
          <p>
            Left Hand
          </p>
          <input
            type='text'
            value={leftText}
            onChange={(e) => textToDisplay(e, setLeftText, setLeftDisplay)}

          />
          <p>
          {error && <div className="error-message">{error}</div>}
          {errorLeftHand && <div className="error-message">{errorLeftHand}</div>}


            Right Hand
          </p>
          <input
            type='text'
            value={rightText}
            onChange={(e) => textToDisplay(e, setRightText, setRightDisplay)}

          />
          {error && <div className="error-message">{error}</div>}
          {errorRightHand && <div className="error-message">{errorRightHand}</div>}


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

export default SizesForm;

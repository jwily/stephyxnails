import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';

function SizesForm() {

  const history = useHistory()
  const { state, dispatch } = useOrderContext();
  const [leftDisplay, setLeftDisplay] = useState(state.formData.leftDisplay ? state.formData.leftDisplay : ['', '', '', '', '']);
  const [rightDisplay, setRightDisplay] = useState(state.formData.rightDisplay ? state.formData.rightDisplay : ['', '', '', '', '']);
  const [leftText, setLeftText] = useState(state.formData.leftDisplay ? state.formData.leftDisplay.join(', ') : '');
  const [rightText, setRightText] = useState(state.formData.rightDisplay ? state.formData.rightDisplay.join(', ') : '');
  const [error, setError] = useState('');
  // const [errorRightHand, setErrorRightHand] = useState('');
  // const [errorLeftHand2, setErrorLeftHand2] = useState('');
  // const [errorRightHand2, setErrorRightHand2] = useState('');

  const isOrderDetailsComplete = state.name && state.email
  const [isLoading, setIsLoading] = useState(false); // Initialize the loading state

  // useEffect(() => {
  //   // Simulate loading for 100 milliseconds (0.1 seconds) and then set loading to false
  //   setTimeout(() => {
  //     setIsLoading(false); // Set loading to false after the delay
  //   }, 100);
  //   // Add dependencies as needed
  // }, []);

  const redirectToOrderDetails = () => {
    window.location.href = '/order'
  }

  console.log('state--->',state)

  const handleNext = (e) => {
    e.preventDefault();
    if (!validateDisplays()) return;


    dispatch({ type: 'UPDATE_FORM_DATA', payload: { leftDisplay, rightDisplay } });
    history.push('/order-set/photo'); // Navigate to the next form question
  }

  const handleBack = () => {
    // Navigate back to the previous step
    history.push('/order-set/shape');
  };

  const FingerDisplay = ({ hand, name, value }) => {
    return (
      <div>
        {`${hand}-${name}: ${value ? value : ''}`}
      </div>
    );
  };

  const textToDisplay = (e, setText, display, setDisplay) => {
    
    const value = e.target.value;
    // Check if the input contains invalid characters
    // Allows input to function correctly
    setError('');

    if (/[^0-9,.\s]/.test(value)) {
      setError('Input can only contain numeric characters (0-9), commas, and periods.');
      setText(value);
      return; // Stop processing the input
    }
  
    setText(value);

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

  const validateDisplays = () => {
    if([...leftDisplay, ...rightDisplay].length !== 10) {
      setError('Each finger needs a valid size from 00 to 9.')
      return false;
    }
    for (let val of [...leftDisplay, ...rightDisplay]) {
      if (val === '' || parseInt(val) < 0 || parseInt(val) > 9) {
        setError('Each finger needs a valid size from 00 to 9.')
        return false;
      }
    }

    return true;
  }

  // HTML and CSS here are just a rough draft,
  // wanted to text out functionality

  return (
    <div className='p-8 shadow-lg rounded-2xl bg-primary m-4 flex flex-col gap-5'>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {isOrderDetailsComplete ? (
            <section>
              <h2>X. Sizes</h2>
              <p>disclaimer insert</p>
              <div>
                <div className='flex flex-row space-x-5'>
                  <FingerDisplay hand='L' name='Thumb' value={leftDisplay[0]} />
                  <FingerDisplay hand='L' name='Index' value={leftDisplay[1]} />
                  <FingerDisplay hand='L' name='Middle' value={leftDisplay[2]} />
                  <FingerDisplay hand='L' name='Ring' value={leftDisplay[3]} />
                  <FingerDisplay hand='L' name='Pinky' value={leftDisplay[4]} />
                </div>
                <div className='flex flex-row space-x-5'>
                  <FingerDisplay hand='R' name='Thumb' value={rightDisplay[0]} />
                  <FingerDisplay hand='R' name='Index' value={rightDisplay[1]} />
                  <FingerDisplay hand='R' name='Middle' value={rightDisplay[2]} />
                  <FingerDisplay hand='R' name='Ring' value={rightDisplay[3]} />
                  <FingerDisplay hand='R' name='Pinky' value={rightDisplay[4]} />
                </div>
              </div>
              <div>
                <p>Please list your nail sizes from thumb to pinky for each hand.</p>
                <p>If you are unsure of your nail sizes, please reach out to me!</p>
                {!!error && (
                  <p className='text-error'>{error}</p>
                )}
              </div>
              <div>
                <p>Left Hand</p>
                <input
                  type='text'
                  value={leftText}
                  placeholder='ex. 2, 7, 6, 7, 9'
                  onChange={(e) => textToDisplay(e, setLeftText, leftDisplay, setLeftDisplay)}
                />


                <p>Right Hand</p>
                <input
                  type='text'
                  value={rightText}
                  placeholder='ex. 2, 7, 6, 7, 9'
                  onChange={(e) => textToDisplay(e, setRightText, rightDisplay, setRightDisplay)}
                />

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
    </div>
  );
}

export default SizesForm;

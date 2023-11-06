import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';
import LoadingPage from '../LoadingPage';

function SizesForm() {

  const history = useHistory()
  const { state, dispatch } = useOrderContext();
  const [leftDisplay, setLeftDisplay] = useState(['', '', '', '', '']);
  const [rightDisplay, setRightDisplay] = useState(['', '', '', '', '']);
  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');
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
        <span className='font-extrabold font-xl' >
          {`${hand} ${name}: `}
        </span>
        <span>
          {`${value ? value : ''}`}
        </span>
      </div>
    );
  };

  const FingerDisplayRight = ({ hand, name, value }) => {
    return (
      <div>
        <span>
          {`${value ? value : ''} : `}
        </span>
        <span className='font-extrabold font-xl' >
          {`${hand} ${name}`}
        </span>
      </div>
    );
  };



  const textToDisplay = (e, setText, display, setDisplay) => {

    const value = e.target.value;

    // Check if the input contains invalid characters

    // Allows input to function correctly
    setError('');
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
        <LoadingPage />
      ) : (
        <>
          {isOrderDetailsComplete ? (
            <section className="bg-primary rounded-xl m-4">
              <h2 className="font-extrabold text-xl text-center mb-4">3. Sizes</h2>
              {/* <p>disclaimer insert????</p> */}
              <div>
                <div className='flex flex-row justify-between'>
                  <FingerDisplay hand='Left' name='Thumb' value={leftDisplay[0]} />
                  <FingerDisplayRight hand='Right' name='Thumb' value={rightDisplay[0]} />
                </div>
                <div className='flex flex-row justify-between'>
                  <FingerDisplay hand='Left' name='Index' value={leftDisplay[1]} />
                  <FingerDisplayRight hand='Right' name='Index' value={rightDisplay[1]} />
                </div>
                <div className='flex flex-row justify-between'>
                  <FingerDisplay hand='Left' name='Middle' value={leftDisplay[2]} />
                  <FingerDisplayRight hand='Right' name='Middle' value={rightDisplay[2]} />
                </div>
                <div className='flex flex-row justify-between'>
                  <FingerDisplay hand='Left' name='Ring' value={leftDisplay[3]} />
                  <FingerDisplayRight hand='Right' name='Ring' value={rightDisplay[3]} />
                </div>
                <div className='flex flex-row justify-between'>
                  <FingerDisplay hand='Left' name='Pinky' value={leftDisplay[4]} />
                  <FingerDisplayRight hand='Right' name='Pinky' value={rightDisplay[4]} />
                </div>
              </div>
              <div>
                {!!error && (
                  <p className='text-error'>{error}</p>
                )}
              </div>
              <div>
                <form className="space-y-4 pt-10">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <p className='font-extrabold text-xl text-center mb-4'>Please list your nail sizes from thumb to pinky.</p>
                      <p className='font-extrabold text-xl text-center mb-4'>If you are unsure of your nail sizes, please reach out!</p>
                      <label className="sr-only" htmlFor="email">Left Hand</label>
                      <div>Left</div>
                      <input
                        className="input input-solid bg-white"
                        placeholder='ex. 2, 7, 6, 7, 9'
                        onChange={(e) => textToDisplay(e, setLeftText, leftDisplay, setLeftDisplay)}
                        type="text"
                        value={leftText}

                        id="email" />
                    </div>
                    <div>
                      <label className="sr-only" htmlFor="phone">Right Hand</label>
                      <div>Right</div>
                      <input
                        className="input input-solid bg-white"
                        placeholder='ex. 2, 7, 6, 7, 9'
                        type="text"
                        value={rightText}
                        onChange={(e) => textToDisplay(e, setRightText, rightDisplay, setRightDisplay)}

                        id="phone" />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <button type="button" className="rounded-lg btn btn-primary w-5/12 bg-primary_blue text-black" onClick={handleBack}>←</button>
                    <button className="rounded-lg btn btn-primary w-5/12 bg-primary_blue text-black" type="submit" onClick={handleNext}>→</button>
                  </div>
                </form>
                {/* <p>
                  {errorRightHand && <div className="error-message">{errorRightHand}</div>}
                  {errorRightHand2 && <div className="error-message">{errorRightHand2}</div>}
                </p> */}
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

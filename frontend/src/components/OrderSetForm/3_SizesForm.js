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

    const left_sizes = leftDisplay.slice(0, 4).join('');
    const right_sizes = rightDisplay.slice(0, 4).join('');

    dispatch('ACTION_HERE');

    history.push('/order-set/photo') // Navigate to the next form question
  };

  const handleBack = () => {
    // Navigate back to the previous step
    history.push('/order-set/shape');
  };

  const FingerDisplay = ({ hand, name, idx }) => {

    const valuesArray = hand === 'Left' ? leftDisplay : rightDisplay;

    const value = valuesArray[parseInt(idx)];

    return (
      <div>
        {`${hand} ${name}: ${value ? value : ''}`}
      </div>
    )
  }

  const textToDisplay = (e, setText, setDisplay) => {

    const value = e.target.value;

    // Allows input to function correctly
    setText(value);

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
            <FingerDisplay hand='Left' name='Pinky' idx='4' />
            <FingerDisplay hand='Left' name='Ring' idx='3' />
            <FingerDisplay hand='Left' name='Middle' idx='2' />
            <FingerDisplay hand='Left' name='Index' idx='1' />
            <FingerDisplay hand='Left' name='Thumb' idx='0' />
          </p>
          <p className='flex flex-row space-x-5'>
            <FingerDisplay hand='Right' name='Thumb' idx='0' />
            <FingerDisplay hand='Right' name='Middle' idx='2' />
            <FingerDisplay hand='Right' name='Index' idx='1' />
            <FingerDisplay hand='Right' name='Ring' idx='3' />
            <FingerDisplay hand='Right' name='Pinky' idx='4' />
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
            Right Hand
          </p>
          <input
            type='text'
            value={rightText}
            onChange={(e) => textToDisplay(e, setRightText, setRightDisplay)}
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

    </>
  );
}

export default SizesForm;

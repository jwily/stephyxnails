import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';

function DescriptionFrom2() {

  const history = useHistory()
  const { state, dispatch } = useOrderContext();
  const errorRef = useRef(null);

  console.log(state);

  // Local state to manage the description
  const [description, setDescription] = useState(state.formData.description);

  const handleNext = (e) => {
    e.preventDefault()
    if (description && description.length <= 5000) {
      dispatch({ type: 'UPDATE_FORM_DATA', payload: { description } });

      history.push('/order-set/extra'); // Navigate to the next form question
      errorRef.current.innerText = ''; // Clear any previous error message

    } else {
      // Description is empty or too long; show an error message
      errorRef.current.innerText =
        'Please provide a description (up to 5000 characters) before proceeding.';
    }
  };

  const handleBack = () => {
    // Navigate back to the previous step
    history.push('/order-set/photo'); // Replace 'previous-step-url' with the actual URL for the previous step
  };


  return (
    <>
      <section>
        <h2>4. Nail Description</h2>
        <p>disclaimer insert</p>
        <div>
          <textarea
            className="#"
            type="text"
            placeholder="#"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={5000}
          >
          </textarea>
        </div>

        <div>
          <div ref={errorRef} style={{ color: 'red' }}></div>

          <button onClick={handleBack}>Back</button>
          <button type="submit" onClick={handleNext}>Next</button>
        </div>
      </section>
    </>
  );
}

export default DescriptionFrom2;

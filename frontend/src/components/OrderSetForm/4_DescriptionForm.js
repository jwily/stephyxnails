import React , {useRef, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';

function DescriptionFrom() {

  const history = useHistory() 
  const { state, dispatch }= useOrderContext();
  
  // Create a ref to display error messages
  const errorRef = useRef(null);
  // Check if order details are complete
  const isOrderDetailsComplete = state.name && state.email 

  const redirectToOrderDetails = () => {
    window.location.href ='/order'
  }

  // Local state to manage the description
  const [description, setDescription] = useState(state.formData.description);

   // Handle the "Next" button click
  const handleNext = (e) => {
    e.preventDefault()

    if (description && description.length <= 5000) {
      // Update the form data in the context with the description
      dispatch({ type: 'UPDATE_FORM_DATA', payload: { description } });

      history.push('/order-set/extra'); // Navigate to the next form question
      errorRef.current.innerText = ''; // Clear any previous error message

    }  else {
      // Description is empty or too long; show an error message
      errorRef.current.innerText =
        'Please provide a description (up to 5000 characters) before proceeding.';
    }
  };

  const handleBack = () => {
    // Navigate back to the previous step
    history.push('/order-set/photo');
  };
  
  
  return (
      <>
      {isOrderDetailsComplete ? (
        <section> 
        <h2>4. Nail Description</h2>
          <p>disclaimer insert</p>
            <div>
              <textarea
                className="#"
                type="text"
                placeholder="#"
                value={description}
                onChange={ (e) => setDescription(e.target.value )}
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
        
        ) : (
          <div>
            <p>Please complete your order details before proceeding.</p>
            <button onClick={redirectToOrderDetails}>Complete Order Details</button>
          </div>
        )}
      
      </>
    );
}
  
  export default DescriptionFrom;
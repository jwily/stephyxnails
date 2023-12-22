import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';
import LoadingPage from '../LoadingPage';

function DescriptionFrom() {

  const history = useHistory()
  const { state, dispatch } = useOrderContext();
  const [isLoading, setIsLoading] = useState(true); // Initialize the loading state
  // Create a ref to display error messages
  const errorRef = useRef(null);
  const [description, setDescription] = useState(() => {
    // Initialize 'description' with the value from localStorage, or an empty string if not found.
    return localStorage.getItem('selectedDescription') || '';
  });

  // Check if order details are complete
  const isOrderDetailsComplete = state.name && state.email

  useEffect(() => {
    // Simulate loading for 100 milliseconds (0.1 seconds) and then set loading to false
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after the delay
    }, 100);
    // Add dependencies as needed
  }, []);

  const redirectToOrderDetails = () => {
    window.location.href = '/order'
  }


  // Handle the "Next" button click
  const handleNext = (e) => {
    e.preventDefault()

    if (description && description.length <= 5000) {
      // Update the form data in the context with the description
      dispatch({ type: 'UPDATE_FORM_DATA', payload: { description } });

      history.push('/order-set/extra'); // Navigate to the next form question
      errorRef.current.innerText = ''; // Clear any previous error message

      // Save the entered description to local storage
      localStorage.setItem('selectedDescription', description);

    } else {
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
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className='flex justify-center'>
          {isOrderDetailsComplete ? (
            <section className="bg-primary rounded-xl m-4 md:w-1/2">
              <div className="p-8 shadow-lg">
                <form className="space-y-4">
                  <div className="w-full">
                    <div className='font-extrabold text-xl text-center mb-4'>5. Provide a description of your desired set</div>
                    <p className='mb-4'>It's important to be as detailed as you can! The more details/description, the smoother the process will be. Or request a surprise design!</p>
                    <label className="sr-only" htmlFor="message">Message</label>
                    <textarea style={{resize:"none"}} className="textarea textarea-solid max-w-full bg-white text-black" placeholder="" rows="8" id="message" value={description} onChange={ (e) => setDescription(e.target.value )} maxLength={5000} ></textarea>
                    <div ref={errorRef} style={{ color: 'red' }}></div>
                  </div>

                  <div className="flex gap-3 mt-7">
                    <button type="button" className="rounded-lg btn btn-primary btn-block bg-primary_blue text-black" onClick={handleBack}>←</button>
                    <button className="rounded-lg btn btn-primary btn-block bg-primary_blue text-black" type="submit" onClick={handleNext}>→</button>
                  </div>
                </form>
              </div>
            </section>
            //   <section>
            //   <h2>4. Nail Description</h2>
            //     <p>disclaimer insert</p>
            //       <div>
            //         <textarea
            //           className="#"
            //           type="text"
            //           placeholder="#"
            //           value={description}
            //           onChange={ (e) => setDescription(e.target.value )}
            //           maxLength={5000}
            //         >
            //         </textarea>
            //     </div>

            //     <div>
            //     <div ref={errorRef} style={{ color: 'red' }}></div>

            //       <button onClick={handleBack}>Back</button>
            //       <button type="submit" onClick={handleNext}>Next</button>
            //     </div>
            // </section>

          ) : (
            <div>
              <p>Please complete your order details before proceeding.</p>
              <button onClick={redirectToOrderDetails}>Complete Order Details</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default DescriptionFrom;

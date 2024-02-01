import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';
import { useTotalPrice } from './TotalPriceContext';
import LoadingPage from '../LoadingPage';

function ShapeForm() {

  const history = useHistory()
  const { state, dispatch } = useOrderContext();
  const selectRef = useRef(null); // Create a ref for the select element
  const [shape, setShape] = useState(() => {
    // Initialize 'shape' with the value from localStorage, or an empty string if not found.
    return localStorage.getItem('selectedShape') || '';
  });
  const isOrderDetailsComplete = state.name && state.email
  const [isLoading, setIsLoading] = useState(true); // Initialize the loading state
  const { totalPrice } = useTotalPrice();


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

  const handleNext = (e) => {
    e.preventDefault()

    if (shape === '') {
      // Show an error message or take appropriate action to inform the user about the missing selection
      alert('Please select a Nail Shape before proceeding.');
    } else {
      dispatch({ type: 'UPDATE_FORM_DATA', payload: { shape } });
      // Save the selected 'shape' to local storage
      localStorage.setItem('selectedShape', shape);
      history.push('/order-set/sizes');
    }
  };

  const handleBack = () => {
    // Navigate back to the previous step
    history.push('/order-set/tier');
  };

  return (
      <div className='p-8 shadow-lg rounded-2xl bg-primary m-4 flex flex-col gap-5'>
       {isLoading ? (
        <LoadingPage />
      ) : (
        <>
        {isOrderDetailsComplete ? (
           <section>
           <h2 className="font-extrabold text-xl text-center mb-4">2. Choose your preferred nail shape and length</h2>
                 <div>
                   <select
                     value={shape}
                     onChange={(e) => setShape(e.target.value )}
                     ref={selectRef} // Assign the ref to the select element
                     required
                     className='bg-white select text-black'
                   >
                   <option value="" disabled>
                           Select A Nail Shape
                    </option>
                    <option value="xs-square">Extra-Short Square</option>
                    <option value="s-square">Short Square</option>
                    <option value="m-square">Medium Square</option>
                    <option value="s-coffin">Short Coffin</option>
                    <option value="m-coffin">Medium Coffin</option>
                    <option value="s-almond">Short Almond</option>
                    <option value="m-round">Medium Round</option>
                    <option value="s-round">Short Round</option>
                    <option value="m-round">Medium Round</option>
                    <option value="s-almond">Short Almond</option>
                    <option value="m-almond">Medium Almond</option>
                    <option value="m-stiletto">Medium Stiletto</option>
                   </select>
                 </div>

                 <div className="flex gap-3 mt-7">
                <p className="font-bold text-xl">Total Price: ${totalPrice}</p>
              </div>


                 <div className="flex gap-3 mt-7">
                   <button className="rounded-lg btn btn-primary btn-block bg-primary_blue text-black" onClick={handleBack}>←</button>
                   <button className="rounded-lg btn btn-primary btn-block bg-primary_blue text-black" type="submit" onClick={handleNext}>→</button>
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

export default ShapeForm;

import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useOrderContext } from "../../context/OrderContext";
import LoadingPage from "../LoadingPage";

function TierForm() {
  // Initialize the history object and retrieve state, dispatch, and dataResult from the order context
  const history = useHistory();
  const { state, dispatch, dataResult } = useOrderContext();
  // Initialize the running total state
  const [totalPrice, setTotalPrice] = useState(0);


  // Reference for the tier input and local state to manage the selected tier
  const tierInputRef = useRef(null);
  // Initialize tier state with the value from local storage (if available)
  const [tier, setTier] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Initialize the loading state
  const isOrderDetailsComplete = state.name && state.email;

    // Define a function to save data to local storage
    const saveToLocalStorage = (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    }
  
    // Define a function to get data from local storage
    const getFromLocalStorage = (key) => {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    }
  
    useEffect(() => {
      // Simulate loading for 100 milliseconds (0.1 seconds) and then set loading to false
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
  
      // Get data from local storage for any previously persisted data
      const storedTier = getFromLocalStorage("selectedTier");
      if (storedTier) {
        setTier(storedTier);
      }
    }, []);

  // Update the running total whenever the selected tier changes
  useEffect(() => {
    // Find the selected tier based on the ID
    const selectedTier = dataResult.find((tierOption) => tierOption.id === tier);

    // Update the total price
    if (selectedTier) {
      setTotalPrice(selectedTier.price);
    }
  }, [tier, dataResult]);


  const redirectToOrderDetails = () => {
    window.location.href = "/order";
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (tier) {
      // Dispatch an action to update the tier in the context state
      dispatch({ type: "UPDATE_FORM_DATA", payload: { tier } });
      // Save the selected 'tier' to local storage
      saveToLocalStorage("selectedTier", tier);

      history.push("/order-set/shape");
    } else {
      // Display an error message using the ref
      tierInputRef.current.setCustomValidity("Please select a Nail Tier before proceeding.");
      // Trigger form validation
      tierInputRef.current.reportValidity();
    }
  };

  const handleBack = () => {
    // Navigate back to the previous step
    window.location.href = "/order-set/start";
  };

  if (dataResult === null) {
    // Display a loading indicator while data is being fetched
    return <LoadingPage />
  }

  return (
    <div className="p-8 shadow-lg rounded-2xl bg-primary m-4 flex flex-col gap-5">
      {isLoading ? (
        <LoadingPage />
        ) : (
          <>
          {isOrderDetailsComplete ? (
            <section>
              <h1 className="font-extrabold text-xl text-center mb-4">1. Choose a Nail Tier</h1>
              <div>
                <form onSubmit={handleNext}>
                  <div className="flex flex-col gap-7">
                    {dataResult.map((tierOption) => (
                      <div key={tierOption.id}>
                        <label>
                          <div className="flex">
                            <input
                              className="radio-solid-error radio mr-2 mt-1"
                              type="radio"
                              name="tier"
                              value={tierOption.id}
                              checked={tier === tierOption.id}
                              onChange={() => setTier(tierOption.id)}
                              required
                            />
                            <span className="font-bold text-xl">{tierOption.name}:</span>
                            <span className="font-bold text-xl ml-1"> ${tierOption.price} </span>
                          </div>
                          <p>{tierOption.description}</p>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5">
                      <p className="font-bold text-xl">Total Price: ${totalPrice}</p>
                   </div>

                  <div className="flex gap-3 mt-7">
                    <button
                      className="rounded-lg btn btn-primary btn-block bg-primary_blue text-black"
                      onClick={handleBack}
                    >
                      ←
                    </button>
                    <button
                      className="rounded-lg btn btn-primary btn-block bg-primary_blue text-black"
                      type="submit"
                    >
                      →
                    </button>
                  </div>
                </form>
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

export default TierForm;

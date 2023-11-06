import React, { useState, useEffect } from "react";
import { useOrderContext } from "../../context/OrderContext";
import { useHistory } from "react-router-dom";
import LoadingPage from "../LoadingPage";

function SubmissionSetForm() {
  // Initialize the history object and retrieve state and dispatch from the order context
  const history = useHistory();
  const { state, dispatch } = useOrderContext();
  const { formData } = state; // Destructure values from the state
  const isOrderDetailsComplete = state.name && state.email; // Check if order details are complete
  const [isLoading, setIsLoading] = useState(true); // Initialize the loading state

  useEffect(() => {
    // Simulate loading for 100 milliseconds (0.1 seconds) and then set loading to false
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after the delay
    }, 100);
    // Add dependencies as needed
  }, []);

  const redirectToOrderDetails = () => {
    // Redirect the user to the '/order' page
    window.location.href = "/order";
  };

  const handleSubmit = () => {
    // Ensure setCount is within bounds
    // const newSetCount = Math.min(setCount, state.sets.length - 1);

    // Create a copy of the current sets array in the state
    const updatedSets = [...state.sets];
    // updatedSets[newSetCount] = formData;

    // Dispatch an action to update the sets array in the state
    dispatch({ type: "UPDATE_SETS", payload: updatedSets });

    // Dispatch an action to save the form data
    dispatch({ type: "SAVE_FORM_DATA" });

    // Dispatch an action to save the form data
    history.push("/review-order");
  };

  // const handleAddAnotherSet = () => {
  //   // Dispatch actions to add the current set's data, clear the form, and navigate to '/order-set/tier'

  //   dispatch({ type: 'ADD_SET', payload: formData });
  //   dispatch({ type: 'CLEAR_FORM' });

  //   // Clear the local storage
  //   localStorage.clear();

  //   history.push('/order-set/tier');
  // };

  const handleBack = () => {
    // Navigate back to the previous step, in this case, '/order-set/extra'
    history.push("/order-set/extra");
  };

  const imageStyle = {
    // maxWidth: '200px', // Maximum width
    // maxHeight: '200px', // Maximum height
    // width: 'auto',      // Maintain aspect ratio
    // height: 'auto',     // Maintain aspect ratio
    width: '200px',    // Fixed width
    height: '200px',   // Fixed height
    objectFit: 'cover', // Maintain aspect ratio and cover the container

  };

  return (
    <div className="p-8 shadow-lg rounded-2xl bg-primary m-4 flex flex-col gap-5">
      {isLoading ? ( // Display loading indicator while isLoading is true
        <LoadingPage />
      ) : (
        <>
          {isOrderDetailsComplete ? (
            <>
              <div>
                <div className="card card-image-cover bg-primary">
                  <div className="card-body bg-primary">
                    <div className="flex justify-center">
                      <h1 className="font-extrabold text-xl mb-4 card-header">My Set</h1>
                    </div>
                    {/* <h2 className="card-header">Number of sets made: {setCount + 1}</h2> */}
                    <p className="text-black font-semibold">Tier: {formData.tier}</p>
                    <p className="text-black font-semibold">Shape: {formData.shape}</p>
                    <p className="text-black font-semibold">Left Sizes: {formData.leftDisplay.join(", ")}</p>
                    <p className="text-black font-semibold">
                      Right Sizes: {formData.rightDisplay.join(", ")}
                    </p>
                    {/* <p>photo: {formData.photos}</p>*/}
                    <p className="text-black font-semibold">Photos:</p>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2,1fr)",
                        gap: "10px",
                        marginTop: "10px",
                      }}
                    >
                      {formData.photos.map((photo, index) => (
                        <div key={index}>
                          <img
                            src={URL.createObjectURL(photo)}
                            alt={`Inspiration ${index}`}
                            style={imageStyle}
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-black font-semibold">Description: {formData.description}</p>
                    <p className="text-black font-semibold">
                      Charm(s): {!formData.extra ? "None" : formData.extra}
                    </p>
                    <p className="text-black font-semibold">
                      Character(s): {!formData.extra2 ? "None" : formData.extra2}
                    </p>
                    <div className="card-footer flex gap-3 mt-7">
                      <button
                        className="rounded-lg btn btn-primary btn-block bg-primary_blue text-black"
                        onClick={handleBack}
                      >
                        ←
                      </button>
                      {/* <button className="rounded-lg btn btn-primary btn-block bg-primary_blue text-black" type="submit" onClick={handleAddAnotherSet}>
                        Add Set
                      </button> */}
                    </div>
                    <button
                      className="rounded-lg btn btn-primary btn-block bg-primary_blue text-black"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Submit Set
                    </button>
                    <p>you will be able to edit sets on the next page before finalizing your order.</p>
                  </div>
                  <img src={formData.photo} alt="" />
                </div>
              </div>
            </>
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

export default SubmissionSetForm;

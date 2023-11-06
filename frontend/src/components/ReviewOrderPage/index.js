import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useOrderContext } from "../../context/OrderContext";
import ReCAPTCHA from "react-google-recaptcha";
import Cookies from "js-cookie";

import { prepareState, shapeValToLabel, tierLabel } from "../../utilities";

const ReviewOrderPage = () => {
  // Access the history object for navigation, order state, and dispatch function from the order context
  const history = useHistory();
  const { state, dispatch, dataResult } = useOrderContext();
  const { formData } = state; // Destructure values from the state
  const { name, email, instagram, sets } = state;
  const isOrderDetailsComplete = state.name && state.email;
  const [isLoading, setIsLoading] = useState(true); // Initialize the loading state

  // Define state variables for edited user information
  const [editedName, setEditedName] = useState(state.name);
  const [editedEmail, setEditedEmail] = useState(state.email);
  const [editedInstagram, setEditedInstagram] = useState(state.instagram);

  // Define edit mode flags for each field
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingInstagram, setIsEditingInstagram] = useState(false);
  const [error, setError] = useState(null);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const recaptchaRef = React.createRef();
  // const csrfToken = Cookie.get('csrftoken');
  // console.log('CSRF TOKEN ----->',csrfToken);

  const handleCaptchaChange = () => {
    setIsCaptchaVerified(true);
  }
  // Function to redirect to the order details page
  const redirectToOrderDetails = () => {
    window.location.href = "/order";
  };

  // Function to save edited user information
  const handleSaveUserInformation = () => {
    // Create an object with the edited user information
    const updatedUserInformation = {
      name: editedName,
      email: editedEmail,
      instagram: editedInstagram,
    };
    // Update the user information in your state
    dispatch({ type: "UPDATE_USER_INFORMATION", payload: updatedUserInformation });
    // When isEditingName is true, an input field is displayed for editing the name.
    // The onChange event handler captures the input changes and updates the editedName stat
    // When isEditingName is false, the name is displayed as plain text, and a "Edit" button allows users to switch to edit mode.
    setIsEditingName(false);
    setIsEditingEmail(false);
    setIsEditingInstagram(false);
  };

  // Function to handle editing a set
  const handleEditSet = (index) => {
    const setToEdit = sets[index]; // Get the set data to pass
    history.push(`/order-set/edit/${index}`, { set: setToEdit });
  };

  const csrfToken = Cookies.get("csrftoken");

  // const handleBack = () => {
  //   // Navigate back to the previous step
  //   history.push("/order-set/currentset");
  // };


  const handleAddAnotherSet = () => {
    // Dispatch actions to add the current set's data, clear the form, and navigate to '/order-set/tier'

    // dispatch({ type: 'SAVE_FORM_DATA' });
    dispatch({ type: 'CLEAR_FORM' });

    // Clear the local storage
    localStorage.clear();

    history.push('/order-set/tier');
  };


  // Function to handle deleting a set, but prevent deleting the first set
  const handleDeleteSet = (index) => {


    dispatch({ type: "DELETE_SET", payload: index });

  };

  // Function to handle submitting the order
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isCaptchaVerified) {
    const recaptchaValue = recaptchaRef.current.getValue()
    // Check if there are sets in the state
      if (state && state.sets && state.sets.length > 0) {
        setError(null);

        const formData = prepareState(state, recaptchaValue);
        const res = await fetch('/api/orders/', {
          method: 'POST',
          headers: {
            'X-CSRFToken': csrfToken
          },
          body: formData
        });

        if (res.ok) {
          // Successfully submitted the order, navigate to the confirmation page
          history.push('/orderconfirmation');
        } else {

        }

      } else {
        setError("You can't submit without a set");
      }
    } else {
      alert('Please complete the ReCAPTCHA verification to submit your order.')
    }
  };


  return (
    <>
      {isOrderDetailsComplete ? (
        <>
          <div>
            <h2 className="font-extrabold text-xl text-center mb-4">Review Your Entire Order</h2>
          </div>
          <div className="card-body p-8 shadow-lg rounded-2xl bg-primary m-4">
            <h3 className="text-center font-bold">User Information</h3>
            <section>
              {isEditingName ? (
                <div>
                  <label className="font-bold">Name: </label>
                  <input
                    className="bg-white"
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)} // Handle input change
                  />
                  <div className="flex gap-3 mt-3 ">
                    <button
                      className="rounded-lg btn btn-primary btn-block bg-primary_blue text-black"
                      onClick={() => setIsEditingName(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="rounded-lg btn btn-primary btn-block bg-primary_blue text-black"
                      onClick={handleSaveUserInformation}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="font-bold">
                    Name: <span className="font-normal">{state.name}</span>
                  </p>
                  <button
                    className="rounded-lg btn btn-primary btn-block bg-primary_blue text-black"
                    onClick={() => setIsEditingName(true)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </section>
            <section>
              {isEditingEmail ? (
                <div>
                  <label className="font-bold">Email: </label>
                  <input
                    className="bg-white"
                    type="text"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)} // Handle input change
                  />
                  <div className="flex gap-3 mt-3">
                    <button
                      className="rounded-lg btn btn-primary btn-block bg-primary_blue text-black"
                      onClick={() => setIsEditingEmail(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="rounded-lg btn btn-primary btn-block bg-primary_blue text-black"
                      onClick={handleSaveUserInformation}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="font-bold">
                    Email: <span className="font-normal">{state.email}</span>
                  </p>
                  <button
                    className="rounded-lg btn btn-primary btn-block bg-primary_blue text-black"
                    onClick={() => setIsEditingEmail(true)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </section>
            <section>
              {isEditingInstagram ? (
                <div>
                  <label className="font-bold">Instagram: </label>
                  <input
                    className="bg-white"
                    type="text"
                    value={editedInstagram}
                    onChange={(e) => setEditedInstagram(e.target.value)} // Handle input change
                  />
                  <div className="flex gap-3 mt-3">
                    <button
                      className="rounded-lg btn btn-primary btn-block bg-primary_blue text-black"
                      onClick={() => setIsEditingInstagram(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="rounded-lg btn btn-primary btn-block bg-primary_blue text-black"
                      onClick={handleSaveUserInformation}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="font-bold">
                    Instagram: <span className="font-normal">{state.instagram}</span>
                  </p>
                  <button
                    className="rounded-lg btn btn-primary btn-block bg-primary_blue text-black"
                    onClick={() => setIsEditingInstagram(true)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </section>
          </div>

          <div>
            <section className="accordion-group">
              {sets.map((formData, index) => (
                <li className="accordion" key={index}>
                  <input type="checkbox" id={`accordion-${index}`} className="accordion-toggle" />
                  <label htmlFor={`accordion-${index}`} className="accordion-title bg-inherit">
                    Set {index + 1}
                  </label>
                  <span class="accordion-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
                    </svg>
                  </span>
                  <div className="accordion-content">
                    <div className="min-h-0 flex flex-col gap-8 pl-2">
                      <div className="flex justify-between mr-12">
                        <p className="font-bold">
                          Tier: <span className="font-normal">{tierLabel(formData.tier, dataResult)}</span>
                        </p>
                        <p className="font-bold">
                          Shape: <span className="font-normal">{shapeValToLabel[formData.shape]}</span>
                        </p>
                      </div>
                      <div className="flex justify-between mr-6">
                        <p className="font-bold">
                          Left Sizes: <span className="font-normal">{formData.leftDisplay.join(", ")}</span>
                        </p>
                        <p className="font-bold">
                          Right Sizes: <span className="font-normal">{formData.rightDisplay.join(", ")}</span>
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">Photos:</p>
                        <div style={{ display: 'grid', gridTemplateColumns: "repeat(2,1fr)", gap: '10px', margin: '10px 0 0 30px' }}>
                          {formData.photos.map((photo, index) => (
                            <div key={index}>
                              <img
                                src={URL.createObjectURL(photo)}
                                alt={`Inspiration ${index}`}
                                style={{ maxWidth: "100px", maxHeight: "100px" }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <p className="font-bold">
                        Description: <span className="font-normal">{formData.description}</span>
                      </p>
                      <div className="flex justify-between mr-12">
                        <p className="font-bold">
                          Charm(s): <span className="font-normal">{formData.extra}</span>
                        </p>
                        <p className="font-bold">
                          Character(s): <span className="font-normal">{formData.extra2}</span>
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          className="rounded-lg btn btn-primary btn-block bg-red-300 text-black"
                          onClick={() => handleDeleteSet(index)}
                        >
                          Delete Set
                        </button>
                        <button
                          className="rounded-lg btn btn-primary btn-block bg-primary_blue text-black"
                          onClick={() => handleEditSet(index)}
                        >
                          Edit Set
                        </button>
                      </div>
                    </div>

                  </div>
                </li>
              ))}
            </section>
          </div>
          <div className="flex gap-3 mt-7 justify-center">
            <ReCAPTCHA ref={recaptchaRef} sitekey="6Ld2fOEoAAAAABOW9mr23wNIcTakNByHf5ArjqdW" onChange={handleCaptchaChange} />
          </div>
          <div className="flex gap-3 mt-7">
            <button className='rounded-lg btn btn-primary btn-block bg-primary_blue text-black' onClick={handleAddAnotherSet}>Add Set</button>
            <button className="rounded-lg btn btn-primary btn-block bg-sky-300 text-black" onClick={handleSubmit} disabled={!state.sets || state.sets.length === 0}>Submit Order</button>

          </div>

        </>
      ) : (
        <div>
          <p>Please complete your order details before proceeding.</p>
          <button onClick={redirectToOrderDetails}>Complete Order Details</button>
        </div>
      )}
    </>

    // {/* {info.sets.map(set =>
    //     <div key={set.description.length}>
    //         <div>
    //             {set.description}
    //         </div>
    //         <div>
    //             {set.shape}
    //         </div>
    //         <div>
    //             {set.size}
    //         </div>
    //         <div>
    //             {set.tier}
    //         </div>
    //     </div>)} */}

    //     {/* <button onClick={handleSubmit}>Submit</button> */}
  );
  // return (
  //     <div>
  //         {/* {info.sets.map(set =>
  //             <div key={set.description.length}>
  //                 <div>
  //                     {set.description}
  //                 </div>
  //                 <div>
  //                     {set.shape}
  //                 </div>
  //                 <div>
  //                     {set.size}
  //                 </div>
  //                 <div>
  //                     {set.tier}
  //                 </div>
  //             </div>)} */}
          {/* <div className="g-recaptcha" data-sitekey="6Ld2fOEoAAAAABOW9mr23wNIcTakNByHf5ArjqdW"></div> */}
          // <ReCAPTCHA ref={recaptchaRef} sitekey="6Ld2fOEoAAAAABOW9mr23wNIcTakNByHf5ArjqdW" onChange={handleSubmit} />
  //         <button onClick={handleSubmit}>Submit</button>
  //     </div>
  // )
};

export default ReviewOrderPage;

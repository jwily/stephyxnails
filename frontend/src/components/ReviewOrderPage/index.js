import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from "../../context/OrderContext";
import ReCAPTCHA from "react-google-recaptcha"
import Cookie from 'js-cookie'

const ReviewOrderPage = () => {
  // Access the history object for navigation, order state, and dispatch function from the order context
  const history = useHistory();
  const { state, dispatch } = useOrderContext();
  const { name, email, instagram, sets } = state;
  const isOrderDetailsComplete = state.name && state.email
  const [isLoading, setIsLoading] = useState(true); // Initialize the loading state

  // Define state variables for edited user information
  const [editedName, setEditedName] = useState(state.name);
  const [editedEmail, setEditedEmail] = useState(state.email);
  const [editedInstagram, setEditedInstagram] = useState(state.instagram);

  // Define edit mode flags for each field
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingInstagram, setIsEditingInstagram] = useState(false);

  // Function to redirect to the order details page
  const redirectToOrderDetails = () => {
    window.location.href = '/order'
  }

  // Function to save edited user information
  const handleSaveUserInformation = () => {
    // Create an object with the edited user information
    const updatedUserInformation = {
      name: editedName,
      email: editedEmail,
      instagram: editedInstagram,
    };
    // Update the user information in your state
    dispatch({ type: 'UPDATE_USER_INFORMATION', payload: updatedUserInformation });
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

  const csrfToken = Cookie.get('csrftoken');
  console.log(csrfToken, '<====== csrf token')

  const handleBack = () => {
    // Navigate back to the previous step
    history.push('/order-set/currentset');
  };

  // Function to handle deleting a set, but prevent deleting the first set
  const handleDeleteSet = (index) => {
    // Edgecase
    if (index > 0) {
      // Dispatch an action to delete the set at the specified index
      dispatch({ type: 'DELETE_SET', payload: index });
    } else {
      // Display a message or provide some feedback that the first set cannot be deleted
      alert("The first set cannot be deleted only edited");
    }
  };

  // Function to handle submitting the order
  const handleSubmit = async (e) => {
    e.preventDefault()
    // const recaptchaValue = recaptchaRef.current.getValue();
    // this.props.handleSubmit(recaptchaValue);

    const formData = new FormData();

    console.log(state);

    const data = prepareState(state);

    formData.append('json',
      new Blob([JSON.stringify(data)],
        { type: 'application/json' }))

    for (let [key, value] of formData.entries()) {
      console.log(key, value); // 'json', Blob { ... }
    }

    const res = await fetch('/api/orders/',
      {
        method: 'POST',
        body: formData
      })

    if (res.ok) {
      console.log('it worked')
    } else {
      console.log('it borke')
    }
  }

  const prepareState = (state) => {

    const newState = {}
    newState.name = state.name;
    newState.email = state.email;
    newState.instagram = state.instagram;
    newState.sets = []

    for (let set of state.sets) {

      const newSet = {}
      newSet.description = set.description;
      newSet.charms = set.extra;
      newSet.characters = set.extra2;
      newSet.left_sizes = set.leftDisplay.join(', ');
      newSet.right_sizes = set.rightDisplay.join(', ');
      newSet.shape = set.shape;
      newSet.tier = set.tier;

      newSet.images = [];
      newState.sets.push(newSet);
    }

    return newState;
  }

  const recaptchaRef = React.createRef();

  return (
    <>
      {isOrderDetailsComplete ? (
        <>
          <div>
            <h2>Review Your Entire Order</h2>
          </div>
          <div>
            <h3>User Information</h3>
            <section>
              {isEditingName ? (
                <div>
                  <label>Name: </label>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)} // Handle input change
                  />
                  <div>
                    <div>
                      <button onClick={() => setIsEditingName(false)}>Cancel</button>
                    </div>
                    <div>
                      <button onClick={handleSaveUserInformation}>Save</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <p>Name: {state.name}</p>
                  <button onClick={() => setIsEditingName(true)}>Edit</button>
                </div>
              )}
            </section>
            <section>
              {isEditingEmail ? (
                <div>
                  <label>Email: </label>
                  <input
                    type="text"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)} // Handle input change
                  />
                  <div>
                    <div>
                      <button onClick={() => setIsEditingEmail(false)}>Cancel</button>
                    </div>
                    <div>
                      <button onClick={handleSaveUserInformation}>Save</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <p>Email: {state.email}</p>
                  <button onClick={() => setIsEditingEmail(true)}>Edit</button>
                </div>
              )}
            </section>
            <section>
              {isEditingInstagram ? (
                <div>
                  <label>Instagram: </label>
                  <input
                    type="text"
                    value={editedInstagram}
                    onChange={(e) => setEditedInstagram(e.target.value)} // Handle input change
                  />
                  <div>
                    <button onClick={() => setIsEditingInstagram(false)}>Cancel</button>
                    <div></div>
                    <button onClick={handleSaveUserInformation}>Save</button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>Instagram: {state.instagram}</p>
                  <button onClick={() => setIsEditingInstagram(true)}>Edit</button>
                </div>
              )}
            </section>
          </div>

          <div>
            <section>
              {sets.map((formData, index) => {
                return (
                  <li key={index}>
                    <h4>Set {index + 1}</h4>
                    <p>Tier: {formData.tier}</p>
                    <p>Shape: {formData.shape}</p>
                    <p>Left Display: {formData.leftDisplay}</p>
                    <p>Right Display: {formData.rightDisplay}</p>
                    {/* <p>photo: {formData.photo}</p> */}
                    <div>
                      <p>Photos:</p>
                      {formData.photo.map((photo, index) => (
                        <div key={index}>
                          <img src={photo} alt={`Photo ${index + 1}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                        </div>
                      ))}
                    </div>
                    <p>Description: {formData.description}</p>
                    <p>charm: {formData.extra}</p>
                    <p>character: {formData.extra2}</p>
                    <button onClick={() => handleDeleteSet(index)}>Delete Set</button>
                    <div></div>
                    <button onClick={() => handleEditSet(index)}>Edit Set</button>

                  </li>
                )
              }
              )}
            </section>
          </div>
          <div>
            <div>
              <button onClick={handleBack}>Back</button>
            </div>
            <div>
              <button onClick={handleSubmit}>Submit Order</button>
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
  //         {/* <div className="g-recaptcha" data-sitekey="6Ld2fOEoAAAAABOW9mr23wNIcTakNByHf5ArjqdW"></div> */}
  //         <ReCAPTCHA ref={recaptchaRef} sitekey="6Ld2fOEoAAAAABOW9mr23wNIcTakNByHf5ArjqdW" onChange={handleSubmit} />
  //         <button onClick={handleSubmit}>Submit</button>
  //     </div>
  // )
}


export default ReviewOrderPage

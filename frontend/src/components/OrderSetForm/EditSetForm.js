import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useOrderContext } from "../../context/OrderContext";
import LoadingPage from "../LoadingPage";

const EditSetForm = () => {
  const history = useHistory();
  const { state, dispatch, dataResult } = useOrderContext();
  const { sets } = state;
  const { index } = useParams();
  const setIndex = parseInt(index, 10);
  const [isLoading, setIsLoading] = useState(true); // Initialize the loading state
  const isOrderDetailsComplete = state.name && state.email;

  const [editedTier, setEditedTier] = useState("");
  const [editedShape, setEditedShape] = useState("");
  const [editedLeftDisplay, setEditedLeftDisplay] = useState("");
  const [editedRightDisplay, setEditedRightDisplay] = useState("");
  const [editedPhotos, setEditedPhotos] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedExtra, setEditedExtra] = useState(0);
  const [editedExtra2, setEditedExtra2] = useState(0);
  const [editedLeftText, setEditedLeftText] = useState('');
  const [editedRightText, setEditedRightText] = useState('');
  const [sizesError, setSizesError] = useState('')

  const redirectToOrderDetails = () => {
    window.location.href = "/order";
  };

  useEffect(() => {
    // Simulate loading for 100 milliseconds (0.1 seconds) and then set loading to false
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after the delay
    }, 100);
    // Add dependencies as needed
  }, []);

  // Load existing set data from state when the component mounts
  useEffect(() => {
    setEditedTier(sets[setIndex]?.tier);
    setEditedShape(sets[setIndex]?.shape);
    setEditedLeftDisplay(sets[setIndex]?.leftDisplay);
    setEditedRightDisplay(sets[setIndex]?.rightDisplay);
    setEditedPhotos(sets[setIndex]?.photos);
    setEditedDescription(sets[setIndex]?.description);
    setEditedExtra(sets[setIndex]?.extra);
    setEditedExtra2(sets[setIndex]?.extra2);
    setEditedLeftText(sets[setIndex]?.leftDisplay.join(','));
    setEditedRightText(sets[setIndex]?.rightDisplay.join(','));
  }, [setIndex, sets]);



  const handleSaveSet = () => {
    if (!validateDisplays()) return;

    const updatedSet = {
      tier: editedTier,
      shape: editedShape,
      leftDisplay: editedLeftDisplay,
      rightDisplay: editedRightDisplay,
      photos: editedPhotos,
      description: editedDescription,
      extra: editedExtra,
      extra2: editedExtra2,
    };

    const updatedSets = [...sets];
    updatedSets[setIndex] = updatedSet;

    dispatch({ type: "UPDATE_SETS", payload: updatedSets });

    history.push("/review-order");
  };

  if (!dataResult) {
    return <LoadingPage />;
  }
  const handleRemovePhoto = (file) => {
    // Filter out the selected photo URL from the array
    const updatedPhotos = editedPhotos.filter((photo) => photo !== file);
    setEditedPhotos(updatedPhotos)
  };
  const imageStyle = {
    width: '150px', // Adjust the width to your desired size
    height: '150px', // Adjust the height to your desired size
  };




  const handleFileChange = (e) => {
    const files = e.target.files;
    const uploadedPhotos = [];

    if (files.length > 0) {
      // Check the current count of photos and the limit (adjust the limit as needed)
      const photoCount = editedPhotos.length;
      const photoLimit = 4;

      if (photoCount + files.length <= photoLimit) {
        // Loop through the selected files and add them to the uploadedPhotos array
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          // Create a URL for the selected file
          uploadedPhotos.push(file);
        }

        // Update the local state to trigger re-render
        // setLocalPhotos(uploadedPhotos);

        const combinedPhotos = [...editedPhotos, ...uploadedPhotos];
        setEditedPhotos(combinedPhotos);

        // Dispatch an action to add the uploaded photos to the state
        // dispatch({ type: 'ADD_PHOTO', payload: uploadedPhotos });
      } else {
        alert("You can only upload 4 photos");
      }
    }
  };

  const openFileInput = () => {
    document.getElementById('fileInput').click();
  };
  console.log(sets, 'set state')

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

  const validateDisplays = () => {
    if ([...editedLeftDisplay, ...editedRightDisplay].length !== 10) {
      setSizesError('Each finger needs a valid size from 00 to 9.')
      return false;
    }

    for (let val of [...editedLeftDisplay, ...editedRightDisplay]) {

      if (val === '' || parseInt(val) < 0 || parseInt(val) > 9) {
        setSizesError('Each finger needs a valid size from 00 to 9.')
        return false;
      }
    }
    return true;
  }

  const textToDisplay = (e, setText, display, setDisplay) => {

    const value = e.target.value;
    // Check if the input contains invalid characters
    // Allows input to function correctly
    setSizesError('');
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

  const numericalOptions = (max) => {
    const options = [];
    for (let i = 0; i <= max; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          {isOrderDetailsComplete ? (
            <div>
              <div className="accordion-group">
                <div className="accordion">
                  <input type="checkbox" id="accordion-2" className="accordion-toggle" />
                  <label htmlFor="accordion-2" className="accordion-title bg-red-100">
                    Tier
                  </label>
                  <span class="accordion-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
                  </span>
                  <div className="accordion-content">
                    <div className="min-h-0">
                      {dataResult.map((tierOption) => (
                        <div key={tierOption.id}>
                          <div className="flex">
                            <input
                              className="radio-solid-error radio mr-2 mt-1"
                              type="radio"
                              name="tier"
                              value={tierOption.name}
                              checked={editedTier === tierOption.name} // Use editedTier for checked state
                              onChange={() => setEditedTier(tierOption.name)} // Set editedTier on change
                              required
                            />
                            <span className="font-bold text-lg ml-1">{tierOption.name}: </span>
                            <span className="font-bold text-lg ml-1"> ${tierOption.price} </span>
                          </div>
                          <p>{tierOption.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="accordion">
                    <input type="checkbox" id="accordion-1" className="accordion-toggle" />
                    <label htmlFor="accordion-1" className="accordion-title bg-red-100">
                      Shape
                    </label>
                    <span class="accordion-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
                    </span>
                    <div className="accordion-content">
                      <div className="min-h-0">
                        <select
                          className="bg-white select text-black"
                          value={editedShape}
                          onChange={(e) => setEditedShape(e.target.value)}
                        >
                          <option value="Extra-Short Square">Extra-Short Square</option>
                          <option value="Short Square">Short Square</option>
                          <option value="Medium Square">Medium Square</option>
                          <option value="Short Coffin">Short Coffin</option>
                          <option value="Medium Coffin">Medium Coffin</option>
                          <option value="Short Almond">Short Almond</option>
                          <option value="Medium Round">Medium Round</option>
                          <option value="Short Round">Short Round</option>
                          <option value="Medium Round">Medium Round</option>
                          <option value="Short Almond">Short Almond</option>
                          <option value="Medium Almond">Medium Almond</option>
                          <option value="Medium Stiletto">Medium Stiletto</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="accordion">
                    <input type="checkbox" id="accordion-3" className="accordion-toggle" />
                    <label htmlFor="accordion-3" className="accordion-title bg-red-100">
                      Sizes
                    </label>
                    <span class="accordion-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
                    </span>
                    <div className="accordion-content">
                      <div className="min-h-0">
                        {/* <input
                          type="text"
                          value={editedLeftDisplay}
                          onChange={(e) => setEditedLeftDisplay(e.target.value)}
                          className="bg-white input text-black"
                          placeholder="Ex. 2,6,7,9,6"
                        /> */}
                        <div>
                          <div className='flex flex-row justify-between'>
                            <FingerDisplay hand='Left' name='Thumb' value={editedLeftDisplay[0]} />
                            <FingerDisplayRight hand='Right' name='Thumb' value={editedRightDisplay[0]} />
                          </div>
                          <div className='flex flex-row justify-between'>
                            <FingerDisplay hand='Left' name='Index' value={editedLeftDisplay[1]} />
                            <FingerDisplayRight hand='Right' name='Index' value={editedRightDisplay[1]} />
                          </div>
                          <div className='flex flex-row justify-between'>
                            <FingerDisplay hand='Left' name='Middle' value={editedLeftDisplay[2]} />
                            <FingerDisplayRight hand='Right' name='Middle' value={editedRightDisplay[2]} />
                          </div>
                          <div className='flex flex-row justify-between'>
                            <FingerDisplay hand='Left' name='Ring' value={editedLeftDisplay[3]} />
                            <FingerDisplayRight hand='Right' name='Ring' value={editedRightDisplay[3]} />
                          </div>
                          <div className='flex flex-row justify-between'>
                            <FingerDisplay hand='Left' name='Pinky' value={editedLeftDisplay[4]} />
                            <FingerDisplayRight hand='Right' name='Pinky' value={editedRightDisplay[4]} />
                          </div>
                        </div>
                        <div>
                          <p>Please list your nail sizes from thumb to pinky for each hand.</p>
                          <p>If you are unsure of your nail sizes, please reach out to me!</p>
                          {!!sizesError && (
                            <p className='text-error'>{sizesError}</p>
                          )}
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <p className='font-extrabold text-xl text-center mb-4'>Please list your nail sizes from thumb to pinky.</p>
                            <p className='font-extrabold text-xl text-center mb-4'>If you are unsure of your nail sizes, please reach out!</p>
                            <label className="sr-only" htmlFor="email">Left Hand</label>
                            <div>Left</div>
                            <input
                              className="input input-solid bg-white text-black"
                              placeholder='ex. 2, 7, 6, 7, 9'
                              onChange={(e) => textToDisplay(e, setEditedLeftText, editedLeftDisplay, setEditedLeftDisplay)}
                              type="text"
                              value={editedLeftText}
                              id="email" />
                          </div>
                          <div>
                            <label className="sr-only" htmlFor="phone">Right Hand</label>
                            <div>Right</div>
                            <input
                              className="input input-solid bg-white text-black"
                              placeholder='ex. 2, 7, 6, 7, 9'
                              type="text"
                              value={editedRightText}
                              onChange={(e) => textToDisplay(e, setEditedRightText, editedRightDisplay, setEditedRightDisplay)}

                              id="phone" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="accordion">
                    <input type="checkbox" id="accordion-4" className="accordion-toggle" />
                    <label htmlFor="accordion-4" className="accordion-title bg-red-100">
                      Right Display
                    </label>
                    <span class="accordion-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
                    </span>
                    <div className="accordion-content">
                      <div className="min-h-0">
                        <input
                          type="text"
                          value={editedRightDisplay}
                          onChange={(e) => setEditedRightDisplay(e.target.value)}
                          className="bg-white input text-black"
                          placeholder="Ex. 2,6,7,9,6"
                        />
                      </div>
                    </div>
                  </div> */}
                  <div className="accordion">
                    <input type="checkbox" id="accordion-5" className="accordion-toggle" />
                    <label htmlFor="accordion-5" className="accordion-title bg-red-100">
                      Photo
                    </label>
                    <span class="accordion-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
                    </span>
                    <div className="accordion-content">
                      <div className="min-h-0">
                        <label>Photos:</label>

                        {/* <input
                          type="file"
                          accept="image/*"
                          id="fileInput"
                          style={{ display: 'none' }}
                          value={editedPhotos}
                          onChange={(e) => setEditedPhotos(e.target.value)}
                          multiple
                        /> */}

                        <div>
                          {Array.isArray(editedPhotos)
                            && editedPhotos.length < 4 && (
                              <div>
                                <input
                                  type="file"
                                  accept="image/*"
                                  id="fileInput"
                                  style={{ display: 'none' }}
                                  onChange={handleFileChange}
                                  multiple // Allow multiple file selection
                                />
                                <button onClick={openFileInput}>Upload Photo</button>
                              </div>
                            )}
                          {Array.isArray(editedPhotos)
                            && editedPhotos.map((photo, index) => (
                              <div key={index}>
                                <img src={URL.createObjectURL(photo)} alt={`Inspiration ${index}`} style={imageStyle} />
                                <button onClick={() => handleRemovePhoto(photo)}>Remove</button>
                              </div>
                            ))}
                        </div>

                      </div>
                    </div>
                  </div>
                  <div className="accordion">
                    <input type="checkbox" id="accordion-6" className="accordion-toggle" />
                    <label htmlFor="accordion-6" className="accordion-title bg-red-100">
                      Description
                    </label>
                    <span class="accordion-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
                    </span>
                    <div className="accordion-content">
                      <div className="min-h-0">
                        <textarea
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                          className="bg-white textarea textarea-block textarea-solid text-black"
                          style={{ resize: "none", height: "100px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="accordion">
                    <input type="checkbox" id="accordion-7" className="accordion-toggle" />
                    <label htmlFor="accordion-7" className="accordion-title bg-red-100">
                      Charm(s)
                    </label>
                    <span class="accordion-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
                    </span>
                    <div className="accordion-content">
                      <div className="min-h-0">
                        <label>Charm count: </label>
                        {/* <input
                          type="number"
                          value={editedExtra}
                          onChange={(e) => {
                            if (e.target.value <= 25 && e.target.value >= 0) {
                              setEditedExtra(e.target.value);
                            }
                          }}
                          className="input bg-white text-black"
                          max='25'
                          min='0'
                        /> */}
                        <select
                          className="input input-solid max-w-full bg-white text-black"
                          placeholder=""
                          type="number"
                          id="number"
                          value={editedExtra}
                          onChange={(e) => setEditedExtra(e.target.value)}
                        >
                          {numericalOptions(20)}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="accordion">
                    <input type="checkbox" id="accordion-8" className="accordion-toggle" />
                    <label htmlFor="accordion-8" className="accordion-title bg-red-100">
                      Character(s)
                    </label>
                    <span class="accordion-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
                    </span>
                    <div className="accordion-content">
                      <div className="min-h-0">
                        <label>Character count: </label>
                        <select
                          className="input input-solid bg-white text-black"
                          placeholder=""
                          type="number"
                          id="number"
                          value={editedExtra2}
                          onChange={(e) => setEditedExtra2(e.target.value)}
                        >
                          {numericalOptions(10)}
                        </select>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 m-7">
                <button className='rounded-lg btn btn-primary btn-block bg-primary_blue text-black' onClick={() => history.push("/review-order")}>Cancel</button>
                <button className='mb-7 rounded-lg btn btn-primary btn-block bg-primary_blue text-black' onClick={handleSaveSet}>Save</button>
              </div>
            </div>
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
};

export default EditSetForm;

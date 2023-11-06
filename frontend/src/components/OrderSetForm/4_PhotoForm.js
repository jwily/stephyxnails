
import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';

function PhotoForm() {

  const history = useHistory();
  const { state, dispatch } = useOrderContext();
  // const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true); // Initialize the loading state
  const isOrderDetailsComplete = state.name && state.email
  // const [localPhotos, setLocalPhotos] = useState([]); // Local state for photos
  const [photoURLs, setPhotoURLs] = useState([])

  useEffect(() => {
    // Simulate loading for 100 milliseconds (0.1 seconds) and then set loading to false
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after the delay
    }, 100);
    // Add dependencies as needed
  }, []);

  useEffect(() => {
    // Access the input element here
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.addEventListener('click', () => {
        fileInput.click();
      });
    }
  }, []); // Empty dependency array to run the effect once after the initial render

  const redirectToOrderDetails = () => {
    window.location.href = '/order'
  }

  const handleNext = (e) => {
    e.preventDefault();
    // Dispatch an action to update the photos in the context state
    // dispatch({ type: 'UPDATE_FORM_DATA', payload: { photo } });

    history.push('/order-set/description');
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const uploadedPhotos = [];

    if (files.length > 0) {
      // Check the current count of photos and the limit (adjust the limit as needed)
      const photoCount = state.formData.photos.length;
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

        // Dispatch an action to add the uploaded photos to the state
        dispatch({ type: 'ADD_PHOTO', payload: uploadedPhotos });
      } else {
        alert("You can only upload 4 photos");
      }
    }
  };

  const handleRemovePhoto = (file) => {
    // Filter out the selected photo URL from the array
    const updatedPhotos = state.formData.photos.filter((photo) => photo !== file);
    dispatch({ type: 'REMOVE_PHOTO', payload: updatedPhotos });
  };

  const handleBack = () => {
    // Navigate back to the previous step
    history.push('/order-set/sizes');
  };

  const openFileInput = () => {
    document.getElementById('fileInput').click();
  };

  // Style for the displayed image
  const imageStyle = {
    width: '150px', // Adjust the width to your desired size
    height: '150px', // Adjust the height to your desired size
  };


  return (
    <div className='p-8 shadow-lg rounded-2xl bg-primary m-4 flex flex-col gap-5'>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {isOrderDetailsComplete ? (
            <section>
              <div>
                <h2>Photo Upload</h2>
                <p>Seems like we can't use local storage here!</p>
                <div>

                  <div>
                    {Array.isArray(state.formData.photos)
                      && state.formData.photos.length < 4 && (
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
                    {Array.isArray(state.formData.photos)
                      && state.formData.photos.map((photo, index) => (
                        <div key={index}>
                          <img src={URL.createObjectURL(photo)} alt={`Inspiration ${index}`} style={imageStyle} />
                          <button onClick={() => handleRemovePhoto(photo)}>Remove</button>
                        </div>
                      ))}
                  </div>
                </div>
                <div>
                  <button onClick={handleBack}>Back</button>
                  <button type="submit" onClick={handleNext}>Next</button>
                </div>
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

export default PhotoForm;

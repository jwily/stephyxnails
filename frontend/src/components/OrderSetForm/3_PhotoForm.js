import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';

function PhotoForm() {

  const history = useHistory();
  const { state, dispatch}= useOrderContext();
  const fileInputRef = useRef(null);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [photo, setPhoto] = useState(state.formData.photo);

  const handleNext = (e) => {
    e.preventDefault();
    // Dispatch an action to update the photos in the context state
    dispatch({ type: 'UPDATE_FORM_DATA', payload: { photo } });
    history.push('/order-set/description');
  };

  const handleBack = () => {
    // Navigate back to the previous step
    history.push('/order-set/shape'); // Replace 'previous-step-url' with the actual URL for the previous step
  };

  
  const handleFileChange = () => {
    const file = fileInputRef.current.files[0]; // Get the selected file
    
    if (file) {
      // Check if the maximum limit of three photos is reached
      if (selectedPhotos.length < 3) {
        // You can process the selected file here or store it in your form data
        setSelectedPhotos([...selectedPhotos, file]);
        setPhoto({ photo: selectedPhotos }); // Store all selected photos
      } else {
        alert("You've reached the maximum limit of three photos.");
      }
    }
  };

  const openFileInput = () => {
    // Trigger the file input dialog
    fileInputRef.current.click();
  };

    // Style for the displayed image
    const imageStyle = {
      width: '150px', // Adjust the width to your desired size
      height: '150px', // Adjust the height to your desired size
    };
  
  
  return (
    
       <section>
        <div>
        <h2>3. Photo Upload</h2>
        <p>disclaimer insert</p>
        <div>
          <input
            type="file"
            accept="image/*" // Specify the accepted file types (e.g., images)
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          <button onClick={openFileInput}>Upload Photo</button>
        </div>
      <div>
      {selectedPhotos.map((photo, index) => (
          <div key={index}>
            <img 
            src={URL.createObjectURL(photo)} 
            alt={`Selected Image ${index + 1}`}
            style={imageStyle} 
            />
          </div>
       ) )}
      </div>
    

        <div>
          <button onClick={handleBack}>Back</button>
          <button type="submit" onClick={handleNext}>Next</button>
        </div>
        </div>
      </section>
  
  );
}
  
  export default PhotoForm;
import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useOrderContext } from '../../context/OrderContext';

function PhotoForm() {

  const history = useHistory() 
  const { formData, updateFormData } = useOrderContext();
  const fileInputRef = useRef(null);

  const handleNext = (e) => {
    e.preventDefault();
    // Navigate to the next form question
    history.push('/order-set/description');
  };

  const handleBack = () => {
    // Navigate back to the previous step
    history.push('/order-set/shape'); // Replace 'previous-step-url' with the actual URL for the previous step
  };

  
  const handleFileChange = () => {
    const file = fileInputRef.current.files[0]; // Get the selected file
    if (file) {
      // You can process the selected file here or store it in your form data
      updateFormData({ photo: file });
    }
  };

  const openFileInput = () => {
    // Trigger the file input dialog
    fileInputRef.current.click();
  };
  
  return (
      <>
     
 <section>
        <h2>3. Photo Upload</h2>
        <p>disclaimer insert</p>
        <div>
          {/* Input for image upload */}
          <input
            type="file"
            accept="image/*" // Specify the accepted file types (e.g., images)
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          <button onClick={openFileInput}>Upload Photo</button>
        </div>

        {/* Display the selected image if available */}
        {formData.photo && (
          <div>
            <img src={URL.createObjectURL(formData.photo)} alt="Selected Image" />
          </div>
        )}

        <div>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </section>

      </>
    );
}
  
  export default PhotoForm;
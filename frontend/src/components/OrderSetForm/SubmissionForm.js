import React from 'react';
import { useOrderContext } from '../../context/OrderContext';
import { useHistory } from 'react-router-dom';

function SubmissionSetForm() {

  const history = useHistory();
  const { saveCurrentDataSet, formDataSets, clearForm, formData } = useOrderContext();
  
  


  const handleSubmit = () => {
    // Add the data to the current set

    saveCurrentDataSet();
    
    history.push('/');

  };

  const handleAddAnotherSet = () => {
    // Save the current data set
    saveCurrentDataSet();

    // Clear the form fields to start a new set
    clearForm();

    // Optionally, you can navigate to the first form question or any other desired route
    history.push('/order-set/tier');

  };


  return (
    <div>
      <div>
        <h2>Review and Submit</h2>
        <div>
          {formDataSets.map((data, index) => (
            <div key={index}>
              <h3>Set {index + 1}</h3>
              <p>Tier: {data.tier}</p>
              <p>Shape: {data.shape}</p>
              {data.photo && data.photos?.length > 0 && (
                <div>
                  <p>Photos:</p>
                  {data.photo.map((photo, photoIndex) => (
                    <img
                      key={photoIndex}
                      src={URL.createObjectURL(photo)}
                      alt={`Selected Image Set ${index + 1}, Photo ${photoIndex + 1}`}
                      style={{ maxWidth: '200px', maxHeight: '200px' }}
                    />
                  ))}
                </div>
              )}
              <p>Description: {data.description}</p>
              <p>Extra: {data.extra}</p>
            </div>
          ))}
          <h3>Set {formDataSets.length + 1}</h3>
          <p>Tier: {formData.tier}</p>
          <p>Shape: {formData.shape}</p>
          {formData.photo && formData.photo.length > 0 && (
            <div>
              <p>Photos:</p>
              {formData.photo.map((photos, photoIndex) => (
                <img
                  key={photoIndex}
                  src={URL.createObjectURL(photos)}
                  alt={`Selected Image Set ${formDataSets?.length + 1}, Photo ${photoIndex + 1}`}
                  style={{ maxWidth: '200px', maxHeight: '200px' }}
                />
              ))}
            </div>
          )}
          <p>Description: {formData.description}</p>
          <p>Extra: {formData.extra}</p>
        </div>
      </div>
      <div>
        <button type="button" onClick={handleAddAnotherSet}>Add Another Set</button>
        <button type="button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default SubmissionSetForm;

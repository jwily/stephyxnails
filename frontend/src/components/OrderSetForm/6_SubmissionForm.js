import React from 'react';
import { useOrderContext } from '../../context/OrderContext';
import { useHistory } from 'react-router-dom';

function SubmissionSetForm() {

  const history = useHistory();
  const { saveCurrentDataSet, clearForm, dispatch , mergedData, } = useOrderContext();
    

  const handleSubmit = () => {
    dispatch({ type: 'SAVE_FORM_DATA' });
    saveCurrentDataSet();

    // Update mergedData with the new merged data
    // const newMergedData = [...formDataSets, formData];
    // updateMergedData(newMergedData);

    history.push('/review-order');
    // window.location.href = '/review-order'; // Replace 'previous-step-url' with the actual URL for the previous step;
  };

  const handleAddAnotherSet = () => {
    // Save the current data set
    saveCurrentDataSet();

    // Clear the form fields to start a new set
    clearForm();

    // Optionally, you can navigate to the first form question or any other desired route
    history.push('/order-set/tier');

  };

  const handleBack = () => {
      
    // Navigate back to the previous step
    history.push('/order-set/extra'); // Replace 'previous-step-url' with the actual URL for the previous step
  };


  // const mergedData = [...formDataSets, formData]; // Merge the most recent step's data with the accumulated data



  return (
    <div>
      <h2>Review and Submit</h2>
      <div>
        
    {mergedData.map((data, index) => (
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
    
        
    {mergedData.length === 0 && (
      <p>No sets made.</p>
    )}
  </div>
      <div>
        <button onClick={handleBack}>Back</button>
        <button type="submit" onClick={handleAddAnotherSet}>Add Another Set  </button>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
  
}

export default SubmissionSetForm;

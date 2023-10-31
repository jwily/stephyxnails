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
              {data.photo && (
                <div>
                  <p>Photo:</p>
                  <img
                    src={URL.createObjectURL(data.photo)}
                    alt="Selected Image"
                    style={{ maxWidth: '200px', maxHeight: '200px' }} // Set your desired maximum dimensions
                  />
                </div>
              )}
              <p>Description: {data.description}</p>
              <p>Extra: {data.extra}</p>
            </div>
          ))}
          <h3>Set {formDataSets.length + 1}</h3>
          <p>Tier: {formData.tier}</p>
          <p>Shape: {formData.shape}</p>
          {formData.photo && (
            <div>
              <p>Photo:</p>
              <img
                src={URL.createObjectURL(formData.photo)}
                alt="Selected Image"
                style={{ maxWidth: '200px', maxHeight: '200px' }} // Set your desired maximum dimensions
              />
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

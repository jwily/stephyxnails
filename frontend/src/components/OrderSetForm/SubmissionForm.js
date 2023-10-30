import React from 'react';
import { useHistory } from 'react-router-dom';

import { useOrderContext } from '../../context/OrderContext';


function StepExtra({ history }) 
{
  const {currentDataSet, saveCurrentDataSet, formDataSets, clearForm} = useOrderContext();


  // const handleSubmit = () => {
  //   // Save the current data set
  //   saveCurrentDataSet();
  //   // Optionally clear form fields or perform other actions

  //   // Navigate to a thank you page or any desired route
  //   history.push('/');
  // };
  
  const handleSubmit = () => {
     // Add the data to the current set
    saveCurrentDataSet(); // Start a new set of data
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
<>
<div>
      <h2>Review and Submit</h2>
      <div>
      {formDataSets.map((data, index) => (
        <div key={index}>
          <h3>Set {index + 1}</h3>
          <p>Tier: {data.tier}</p>
          <p>Shape: {data.shape}</p>
          <p>Photo: {data.photo}</p>
          <p>Description: {data.description}</p>
          <p>Extra: {data.extra}</p>
          </div>
      ))};
      </div>

      <button type="button" onClick={handleAddAnotherSet}>Add Another Set</button>
      <button type="button" onClick={handleSubmit}>Submit</button>
    </div>

</>
    
    
  );

}

export default StepExtra;





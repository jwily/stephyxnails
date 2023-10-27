import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


function DescriptionFrom() {

    const [description, setDescription] = useState('');
    const history = useHistory();
  
    const handleNext = () => {
      history.push('/set/extra');
    };
  
    return (
      <>
      <div> 
        <h2></h2>
          <p></p>
              <input
              >
              </input>
        <div>
            <button onClick={handleNext}>Next</button>
        </div>
      </div>
      </>
    );
  }
  
  export default DescriptionFrom;
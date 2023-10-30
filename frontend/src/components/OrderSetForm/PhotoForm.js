import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';



function PhotoForm() {

    const [photo, setPhoto] = useState('');
    const [submissions, setSubmissions] = useState([]);
    const history = useHistory();


    const handleSubmit = () => {
      // Store the data in the submissions array
      setSubmissions([...submissions, photo]); 
      setPhoto('');
      history.push('/order-set/description'); 
    };


    const handleBack = () => {
      // Navigate back to the previous step
      history.push('/order-set/shape'); // Replace 'previous-step-url' with the actual URL for the previous step
    };
  
  
    return (
      <>
      <section> 
        <h2>3.Photo Upload</h2>
          <p>disclaimer insert</p>
            <div>
              <input
               type="text"
               value={photo}
               onChange={(e) => setPhoto(e.target.value)}
              >
              </input>
            </div>

            <div>
              <button onClick={handleBack}>Back</button>
               <button onClick={handleSubmit}>Next</button>
            </div>
      </section>
      </>
    );
  }
  
  export default PhotoForm;
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function ExtraForm() {

    const [extra, setExtra] = useState('');
    const [submissions, setSubmissions] = useState([]);
    const history = useHistory();
  
    const handleSubmit = () => {
        // Store the data in the submissions array
        setSubmissions([...submissions, extra]); 
        setExtra('');
        history.push('/order-set/all'); 
      };

      const handleBack = () => {
        // Navigate back to the previous step
        history.push('/order-set/description'); // Replace 'previous-step-url' with the actual URL for the previous step
      };
    
  
    return (
        <>
        <section> 
            <h2>5.Charms</h2>
                <p>disclaimer insert</p>
                    <div>
                        <textarea
                            className="#"
                            type="text"
                            placeholder=""
                            value={extra}
                            onChange={ (e) => { setExtra(e.target.value); }}>     
                        </textarea>
                    </div> 
                <div>
                    {/* <button onClick={() => history.goBack()}>Go Back</button> */}
                    <button onClick={handleBack}>Back</button>
                    <button onClick={handleSubmit}>Next</button>
                </div>
        </section>
        </>
    );
  }
  
  export default ExtraForm;
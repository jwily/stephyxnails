import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function ShapeForm() {
    
    const [submissions, setSubmissions] = useState([]);
    const [shape, setShape] = useState('');
    const history = useHistory();



    const handleSubmit = () => {
      // Store the data in the submissions array
      console.log('Before update:', submissions);

      setSubmissions([...submissions, shape]); 

      console.log('after update:', submissions);

      setShape('');
      history.push('/order-set/photo'); 
    };
  

    const handleBack = () => {
      // Navigate back to the previous step
      history.push('/order-set/tier'); // Replace 'previous-step-url' with the actual URL for the previous step
    };
  
    return (
      <>
      <section> 
        <h2>2. Choose your perferred nail shape and length</h2>
            <p>disclaimer insert</p>
              <div>
                <select
                  value={shape}
                  onChange={(e) => { setShape(e.target.value) }}
                >
                  <option>Select A Nail Shape</option>
                  <option>Extra-Short Square</option>
                  <option>Short Square</option>
                  <option>Medium Square</option>
                  <option>Short Coffin</option>
                  <option>Medium Coffin</option>
                  <option>Short Almond</option>
                  <option>Medium Round</option>
                  <option>Short Round</option>
                  <option>Medium Round</option>
                  <option>Short Almond</option>
                  <option>'Medium Almond</option>
                  <option>Medium Stiletto</option>
                </select>
              </div>

              <div>
                <button onClick={handleBack}>Back</button>
                <button onClick={handleSubmit}>Next</button>
              </div>
      </section>
      </>
    );
  }
  
  export default ShapeForm;
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function ExtraForm() {
    const [extra, setExtra] = useState('');
    const history = useHistory();
  
    const handleSubmit = () => {
      
      history.push('/submission');
    };
  
    return (
        <form onSubmit={handleSubmit}>

            <textarea
                className="#"
                type="text"
                placeholder=""
                value={extra}
                onChange={ (e) => { setExtra(e.target.value); }}>
                        
            </textarea>

        </form>
    );
  }
  
  export default ExtraForm;
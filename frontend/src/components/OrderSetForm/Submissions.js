import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


function Submissions() {
    const [shape, setShape] = useState('');
    const history = useHistory();
  
    const handleSubmit = () => {

      history.push('/set/all');
    };
  
    return (
        <form onSubmit={handleSubmit}>

        </form>
    );
  }
  
  export default Submissions;
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


function PhotoForm() {
    const [shape, setShape] = useState('');
    const history = useHistory();
  
    const handleSubmit = () => {
      
      history.push('/description');
    };
  
    return (
        <form onSubmit={handleSubmit}>

        </form>
    );
  }
  
  export default PhotoForm;
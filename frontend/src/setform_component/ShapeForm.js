import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


function ShapeForm() {
    const [shape, setShape] = useState('');
    const history = useHistory();
  
    const handleSubmit = () => {
      
      history.push('/photo');
    };
  
    return (
        <form onSubmit={handleSubmit}>

        </form>
    );
  }
  
  export default ShapeForm;
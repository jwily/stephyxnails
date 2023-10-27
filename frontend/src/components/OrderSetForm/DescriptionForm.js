import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


function DescriptionFrom() {

    const [description, setDescription] = useState('');
    const history = useHistory();
  
    const handleSubmit = () => {
      
      history.push('/extra');
    };
  
    return (
        <form onSubmit={handleSubmit}>

          

        </form>
    );
  }
  
  export default DescriptionFrom;
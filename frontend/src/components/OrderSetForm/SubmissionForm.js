import React from 'react';
import AllSubmissions from './Submissions';

function StepExtra({ submissions }) {
  return (
    <div>
      <h2>Review and Submit</h2>
      {/* Render the AllSubmissions component to show the submitted data */}
      <AllSubmissions submissions={submissions} />
      {/* Add a submit button or any other finalization logic */}
    </div>
  );
}

export default StepExtra;




